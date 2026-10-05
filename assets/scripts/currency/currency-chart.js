import { formatDate, formatRate } from "./currency-format.js?v=20261005-currency2";
export function calculateStats(points) {
  const values = points.map(point => Number(point.rate)).filter(Number.isFinite);
  if (!values.length) return null;
  const first = values[0], last = values.at(-1), change = last - first;
  return { current: last, change, percent: first === 0 ? null : change / first * 100, min: Math.min(...values), max: Math.max(...values) };
}
export function makeSeries(history, pair) { return (history?.data || []).filter(point => /^\d{4}-\d{2}-\d{2}$/.test(point.date) && Number.isFinite(Number(point.rate))).map(point => ({ date: point.date, rate: Number(point.rate) })); }
export function renderChart(root, points, pair, locale, labels) {
  if (!points.length) { root.innerHTML = `<p class="currency-error">${labels.empty}</p>`; return; }
  const mobile = typeof matchMedia === "function" && matchMedia("(max-width: 760px)").matches;
  const width = mobile ? 400 : 760, height = mobile ? 230 : 250, fontSize = mobile ? 16 : 12, pad = { l: mobile ? 66 : 58, r: 12, t: 20, b: 38 }, vals = points.map(p => p.rate), min = Math.min(...vals), max = Math.max(...vals), span = max - min || Math.max(max * .02, .01);
  const x = i => pad.l + i * (width - pad.l - pad.r) / Math.max(1, points.length - 1), y = v => height - pad.b - (v - min) / span * (height - pad.t - pad.b);
  const path = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.rate)}`).join(" ");
  const grid = Array.from({ length: 4 }, (_, i) => { const v = min + span * i / 3, yy = y(v); return `<line class="currency-grid" x1="${pad.l}" x2="${width-pad.r}" y1="${yy}" y2="${yy}"/><text x="${pad.l-8}" y="${yy+4}" text-anchor="end">${formatRate(v, locale)}</text>`; }).join("");
  const step = Math.max(1, Math.ceil(points.length / (mobile ? 4 : 12)));
  const pointText = rate => `1 ${labels.from} = ${formatRate(rate, locale)} ${labels.to}`;
  const dots = points.map((p, i) => `<circle class="currency-point" cx="${x(i)}" cy="${y(p.rate)}" r="${points.length < 60 ? 3.5 : 2.5}" role="button" tabindex="${i===0?0:-1}" data-index="${i}" aria-label="${formatDate(p.date, locale)} · ${pointText(p.rate)}"/>`).join("");
  const dates = points.map((p,i) => i % step === 0 || i === points.length-1 ? `<text x="${x(i)}" y="${height-8}" text-anchor="middle">${formatDate(p.date, locale, { day: "numeric", month: "short" })}</text>` : "").join("");
  root.innerHTML = `<svg class="currency-chart" style="font-size:${fontSize}px" viewBox="0 0 ${width} ${height}" role="group" aria-label="${labels.chart}">${grid}<path class="currency-line" d="${path}"/>${dots}${dates}</svg><output class="currency-tooltip" aria-live="polite">${labels.hover}</output><details class="currency-data-table"><summary>${labels.table}</summary><div><table><caption>${labels.table}</caption><thead><tr><th scope="col">${labels.date}</th><th scope="col">${labels.rate}</th></tr></thead><tbody>${points.map(p => `<tr><td>${formatDate(p.date, locale)}</td><td>${pointText(p.rate)}</td></tr>`).join("")}</tbody></table></div></details>`;
  const output = root.querySelector("output");
  const show = i => { const point = points[i]; if (point) output.textContent = `${formatDate(point.date, locale)} · ${pointText(point.rate)}`; };
  const pointElements = [...root.querySelectorAll(".currency-point")];
  const svg = root.querySelector(".currency-chart");
  const pointFromPointer = event => {
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !points.length) return;
    const chartX = (event.clientX - rect.left) / rect.width * width;
    const fraction = Math.max(0,Math.min(1,(chartX-pad.l)/(width-pad.l-pad.r)));
    show(Math.round(fraction * (points.length - 1)));
  };
  svg.addEventListener("pointermove", event => { if (event.pointerType !== "touch") pointFromPointer(event); });
  svg.addEventListener("pointerdown", pointFromPointer);
  pointElements.forEach((dot, index) => {
    const idx = Number(dot.dataset.index);
    dot.addEventListener("mouseenter", () => show(idx)); dot.addEventListener("focus", () => show(idx)); dot.addEventListener("click", () => show(idx)); dot.addEventListener("touchstart", () => show(idx), { passive: true });
    dot.addEventListener("keydown", event => { const next = event.key === "ArrowRight" || event.key === "ArrowUp" ? index + 1 : event.key === "ArrowLeft" || event.key === "ArrowDown" ? index - 1 : -1; if (next >= 0 && next < pointElements.length) { event.preventDefault(); dot.tabIndex = -1; pointElements[next].tabIndex = 0; pointElements[next].focus(); } });
  });
}
