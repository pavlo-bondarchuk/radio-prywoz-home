#!/usr/bin/env bash

set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/benchmark-prompt.txt"
RESULTS_ROOT="$SCRIPT_DIR/codex-bench"
RUNS="${RUNS:-1}"
PARALLEL="${PARALLEL:-0}"

die() {
  printf 'benchmark: %s\n' "$*" >&2
  exit 1
}

for dependency in codex jq python3 git; do
  command -v "$dependency" >/dev/null 2>&1 || die "required command not found: $dependency"
done

[[ -f "$PROMPT_FILE" ]] || die "prompt file not found: $PROMPT_FILE"
git -C "$SCRIPT_DIR" rev-parse --show-toplevel >/dev/null 2>&1 || die "run this script from a Git project directory"
[[ "$RUNS" =~ ^[1-9][0-9]*$ ]] || die "RUNS must be a positive integer (got: $RUNS)"
[[ "$PARALLEL" == "0" || "$PARALLEL" == "1" ]] || die "PARALLEL must be 0 or 1"
(( $# > 0 )) || die "usage: ./benchmark.sh MODEL_A MODEL_B [MODEL_C ...]"

declare -a model_names=()
safe_names=""
for model in "$@"; do
  [[ -n "$model" ]] || die "model IDs cannot be empty"
  safe_name="$(printf '%s' "$model" | sed 's/[^A-Za-z0-9_.-]/_/g')"
  [[ -n "$safe_name" ]] || die "invalid model ID: $model"
  case " $safe_names " in
    *" $safe_name "*) die "model IDs collide after filename sanitizing: $model" ;;
  esac
  safe_names="$safe_names $safe_name"
  model_names+=("$model")
done

timestamp="$(date '+%Y%m%d-%H%M%S')"
run_dir="$RESULTS_ROOT/$timestamp"
mkdir -p "$RESULTS_ROOT"
suffix=1
while ! mkdir "$run_dir" 2>/dev/null; do
  run_dir="$RESULTS_ROOT/$timestamp-$suffix"
  suffix=$((suffix + 1))
done

printf 'MODEL\tRUN\tQUALITY\tNOTES\n' > "$run_dir/quality-template.tsv"

printf 'Starting %s run(s) for %s model(s) (%s mode).\n' "$RUNS" "$#" "$([[ "$PARALLEL" == "1" ]] && printf parallel || printf sequential)"
printf 'Results: %s\n' "$run_dir"

run_one() {
  local model="$1"
  local run_number="$2"
  local safe_name stem
  safe_name="$(printf '%s' "$model" | sed 's/[^A-Za-z0-9_.-]/_/g')"
  stem="$run_dir/$safe_name-run$run_number"
  printf 'Running %s (run %s)...\n' "$model" "$run_number"

  python3 - "$SCRIPT_DIR" "$PROMPT_FILE" "$model" "$run_number" "$stem" <<'PY'
import json
import os
import re
import subprocess
import sys
import time

root, prompt_path, model, run_number, stem = sys.argv[1:]
jsonl_path = stem + ".jsonl"
answer_path = stem + ".txt"
stderr_path = stem + ".stderr"
metrics_path = stem + ".metrics.tsv"

with open(prompt_path, encoding="utf-8") as handle:
    prompt = handle.read()

command = [
    "codex", "--ask-for-approval", "never", "exec", "--model", model,
    "--sandbox", "read-only",
    "--config", "model_reasoning_effort=medium",
    "--ephemeral", "--json", "--cd", root,
    "--output-last-message", answer_path,
    prompt,
]

started = time.monotonic()
try:
    with open(jsonl_path, "w", encoding="utf-8") as stdout, open(stderr_path, "w", encoding="utf-8") as stderr:
        completed = subprocess.run(command, cwd=root, stdout=stdout, stderr=stderr, check=False)
    seconds = time.monotonic() - started
    exit_code = completed.returncode
except OSError as error:
    seconds = time.monotonic() - started
    exit_code = 127
    with open(stderr_path, "a", encoding="utf-8") as stderr:
        stderr.write(f"Unable to start Codex CLI: {error}\n")

events = []
try:
    with open(jsonl_path, encoding="utf-8") as handle:
        for line in handle:
            try:
                value = json.loads(line)
                if isinstance(value, dict):
                    events.append(value)
            except json.JSONDecodeError:
                continue
except OSError:
    pass

jsonl_check = subprocess.run(["jq", "-s", "empty", jsonl_path], capture_output=True, text=True, check=False)
if jsonl_check.returncode != 0:
    with open(stderr_path, "a", encoding="utf-8") as stderr:
        stderr.write("\nJSONL validation failed: " + jsonl_check.stderr.strip() + "\n")

def usage_numbers(usage):
    if not isinstance(usage, dict):
        return None
    details_in = usage.get("input_tokens_details") or {}
    details_out = usage.get("output_tokens_details") or {}
    if not isinstance(details_in, dict):
        details_in = {}
    if not isinstance(details_out, dict):
        details_out = {}
    def first_number(*values):
        for value in values:
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                return int(value)
        return None
    return {
        "input": first_number(usage.get("input_tokens")),
        "cached": first_number(usage.get("cached_input_tokens"), details_in.get("cached_tokens"), details_in.get("cached_input_tokens")),
        "cache_write": first_number(usage.get("cache_write_input_tokens"), details_in.get("cache_write_tokens"), details_in.get("cache_creation_input_tokens")),
        "output": first_number(usage.get("output_tokens")),
        "reasoning": first_number(usage.get("reasoning_output_tokens"), details_out.get("reasoning_tokens")),
    }

def merge_usage(target, source):
    for key, value in source.items():
        if value is not None:
            target[key] = (target.get(key) or 0) + value

# Prefer cumulative totals when this CLI version emits them. Otherwise add the
# usage from each completed turn; older/alternate JSONL formats are also read.
cumulative = None
turn_usages = []
fallback_usages = []
for event in events:
    for key in ("total_token_usage", "total_usage"):
        if key in event:
            parsed = usage_numbers(event.get(key))
            if parsed:
                cumulative = parsed
    kind = event.get("type") or event.get("event")
    if kind in ("turn.completed", "response.completed"):
        parsed = usage_numbers(event.get("usage"))
        if parsed:
            (turn_usages if kind == "turn.completed" else fallback_usages).append(parsed)
    if "usage" in event and kind not in ("turn.completed", "response.completed"):
        parsed = usage_numbers(event.get("usage"))
        if parsed:
            fallback_usages.append(parsed)

usage = {"input": 0, "cached": 0, "cache_write": 0, "output": 0, "reasoning": 0}
if cumulative is not None:
    usage.update({key: value or 0 for key, value in cumulative.items()})
else:
    for item in turn_usages or fallback_usages:
        merge_usage(usage, item)

stderr_text = ""
try:
    with open(stderr_path, encoding="utf-8", errors="replace") as handle:
        stderr_text = handle.read()
except OSError:
    pass
event_text = "\n".join(json.dumps(event, ensure_ascii=False) for event in events)
combined = (stderr_text + "\n" + event_text).lower()

if exit_code == 0:
    status = "OK" if jsonl_check.returncode == 0 else "ERROR"
elif re.search(r"model.{0,40}at capacity|capacity.{0,40}(full|available|limit)|overloaded", combined):
    status = "CAPACITY"
elif re.search(r"rate.?limit|too many requests|\b429\b|quota exceeded", combined):
    status = "RATE_LIMIT"
else:
    status = "ERROR"

input_tokens = usage.get("input") or 0
cached_tokens = usage.get("cached") or 0
uncached = max(0, input_tokens - cached_tokens)
cache_pct = f"{cached_tokens * 100 / input_tokens:.2f}" if input_tokens else "N/A"
output_tokens = usage.get("output") or 0
reasoning_tokens = usage.get("reasoning") or 0
total_tokens = input_tokens + output_tokens

if not os.path.exists(answer_path) or os.path.getsize(answer_path) == 0:
    messages = []
    for event in events:
        item = event.get("item")
        if event.get("type") == "item.completed" and isinstance(item, dict) and item.get("type") == "agent_message":
            if isinstance(item.get("text"), str):
                messages.append(item["text"])
    if messages:
        with open(answer_path, "w", encoding="utf-8") as handle:
            handle.write(messages[-1].rstrip() + "\n")
    else:
        with open(answer_path, "w", encoding="utf-8") as handle:
            handle.write(f"No final answer was produced (status: {status}).\n")

with open(metrics_path, "w", encoding="utf-8") as handle:
    handle.write("MODEL\tRUN\tSTATUS\tSECONDS\tINPUT\tCACHED\tCACHE_WRITE\tUNCACHED_INPUT\tCACHE_PCT\tOUTPUT\tREASONING\tTOTAL\n")
    handle.write(f"{model}\t{run_number}\t{status}\t{seconds:.2f}\t{input_tokens}\t{cached_tokens}\t{usage.get('cache_write') or 0}\t{uncached}\t{cache_pct}\t{output_tokens}\t{reasoning_tokens}\t{total_tokens}\n")
print(f"{model} run {run_number}: {status}, {seconds:.2f} sec")
PY
}

pids=()
if [[ "$PARALLEL" == "1" ]]; then
  for ((run_number=1; run_number<=RUNS; run_number++)); do
    for model in "${model_names[@]}"; do
      run_one "$model" "$run_number" &
      pids+=("$!")
    done
  done
  for pid in "${pids[@]}"; do
    wait "$pid" || true
  done
else
  for ((run_number=1; run_number<=RUNS; run_number++)); do
    for model in "${model_names[@]}"; do
      run_one "$model" "$run_number"
    done
  done
fi

python3 - "$run_dir" "$RUNS" <<'PY'
import csv
import glob
import os
import sys

run_dir, runs = sys.argv[1], int(sys.argv[2])
summary_path = os.path.join(run_dir, "summary.tsv")
average_path = os.path.join(run_dir, "summary-average.tsv")
rows = []
for path in sorted(glob.glob(os.path.join(run_dir, "*-run*.metrics.tsv"))):
    with open(path, encoding="utf-8", newline="") as handle:
        rows.extend(list(csv.DictReader(handle, delimiter="\t")))

fields = ["MODEL", "RUN", "STATUS", "SECONDS", "INPUT", "CACHED", "UNCACHED_INPUT", "CACHE_PCT", "OUTPUT", "REASONING", "TOTAL"]
with open(summary_path, "w", encoding="utf-8", newline="") as handle:
    writer = csv.DictWriter(handle, fieldnames=fields, delimiter="\t", extrasaction="ignore")
    writer.writeheader()
    writer.writerows(rows)

if runs > 1:
    numeric = {"SECONDS": "avg seconds", "INPUT": "avg input", "CACHED": "avg cached", "UNCACHED_INPUT": "avg uncached", "OUTPUT": "avg output", "REASONING": "avg reasoning", "TOTAL": "avg total"}
    grouped = {}
    for row in rows:
        grouped.setdefault(row["MODEL"], []).append(row)
    average_fields = ["MODEL", "AVG_SECONDS", "AVG_INPUT", "AVG_CACHED", "AVG_UNCACHED_INPUT", "AVG_OUTPUT", "AVG_REASONING", "AVG_TOTAL", "SUCCESSFUL_RUNS", "FAILED_RUNS"]
    with open(average_path, "w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=average_fields, delimiter="\t")
        writer.writeheader()
        for model, model_rows in grouped.items():
            successful = [row for row in model_rows if row["STATUS"] == "OK"]
            failed = len(model_rows) - len(successful)
            out = {"MODEL": model, "SUCCESSFUL_RUNS": len(successful), "FAILED_RUNS": failed}
            for key, label in numeric.items():
                values = [float(row[key]) for row in successful if row[key] not in ("", "N/A")]
                column = {"SECONDS":"AVG_SECONDS", "INPUT":"AVG_INPUT", "CACHED":"AVG_CACHED", "UNCACHED_INPUT":"AVG_UNCACHED_INPUT", "OUTPUT":"AVG_OUTPUT", "REASONING":"AVG_REASONING", "TOTAL":"AVG_TOTAL"}[key]
                out[column] = f"{sum(values) / len(values):.2f}" if values else "N/A"
            writer.writerow(out)

print("\nMODEL\tRUN\tSTATUS\tSECONDS\tINPUT\tCACHED\tUNCACHED_INPUT\tCACHE_PCT\tOUTPUT\tREASONING\tTOTAL")
for row in rows:
    print("\t".join(row.get(field, "") for field in fields))
print(f"\nSummary: {summary_path}")
if runs > 1:
    print(f"Averages (successful runs only): {average_path}")
PY

failure_count="$(awk -F '\t' 'NR > 1 && $3 != "OK" { count++ } END { print count + 0 }' "$run_dir/summary.tsv")"
printf '\nFull final answers: %s/*-run*.txt\n' "$run_dir"
if (( failure_count > 0 )); then
  printf 'Benchmark finished with %s failed run(s).\n' "$failure_count" >&2
  exit 1
fi
