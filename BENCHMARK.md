# Codex CLI benchmark

The benchmark sends the same read-only PIT review prompt to every model. Each
model runs sequentially by default so model comparisons are not distorted by
parallel load. Results are written under `codex-bench/YYYYMMDD-HHMMSS/`, which
is ignored by Git.

```bash
chmod +x benchmark.sh
./benchmark.sh MODEL_A MODEL_B MODEL_C
RUNS=3 ./benchmark.sh MODEL_A MODEL_B MODEL_C
PARALLEL=1 ./benchmark.sh MODEL_A MODEL_B MODEL_C
```

Use sequential mode for normal comparisons. `PARALLEL=1` is only for testing
capacity and rate-limit behavior. Model IDs can be found with `/model` in the
Codex CLI. `RUNS` defaults to `1`; the parallel mode runs every model/run pair
concurrently.

Each run stores raw JSONL, the final answer, stderr, and token/time metrics.
`summary.tsv` contains all runs. With multiple runs,
`summary-average.tsv` averages successful runs and reports successful and
failed counts. `quality-template.tsv` is provided for manual quality scoring;
fill `QUALITY` manually on a 0–10 scale. The benchmark does not ask another
model to judge the answers.

The installed Codex CLI JSONL usage event currently exposes
`input_tokens`, `cached_input_tokens`, `cache_write_input_tokens`,
`output_tokens`, and `reasoning_output_tokens`. The script tolerates missing
fields in other CLI versions.

The script requires `codex`, `jq`, `python3`, and `git`. Codex token usage is
not a direct measurement of the percentage of a ChatGPT/Codex daily or weekly
limit. The benchmark compares token efficiency, caching, response size,
execution time, and run stability; it does not claim subscription-limit
percentages.
