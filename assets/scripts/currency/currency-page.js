import { fetchRates, fetchHistory } from "./currency-api.js?v=20261005-currency2";
import { initConverter } from "./currency-converter.js?v=20261005-currency2";
import { formatAmount, formatRate, formatUpdatedAt, formatDate, formatLocalDate, convertAmount } from "./currency-format.js?v=20261005-currency2";
import { calculateStats, makeSeries, renderChart } from "./currency-chart.js?v=20261005-currency2";
import { translations, t } from "./currency-i18n.js?v=20261005-currency2";

const q = selector => document.querySelector(selector);
let lang = ["uk", "pl", "ru"].includes(localStorage.getItem("prywoz-language")) ? localStorage.getItem("prywoz-language") : "uk";
let rates = null, converter = null, pair = "PLN-UAH", period = "30d", historyGeneration = 0;
let ratesState = "loading";
function showRatesError() {
  q("[data-c-error]").hidden = false;
  q("[data-c-error]").innerHTML = `${t("error",lang)} <button type="button" data-rates-retry>${t("retry",lang)}</button>`;
  q("[data-c-error] button").addEventListener("click", () => load(true));
}
function localize() {
  const strings = translations[lang] || translations.uk;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-c-i18n]").forEach(node => { node.textContent = t(node.dataset.cI18n, lang); });
  document.querySelectorAll("[data-c-i18n-aria]").forEach(node => { node.setAttribute("aria-label", t(node.dataset.cI18nAria, lang)); });
  document.querySelectorAll("[data-c-label]").forEach(node => { node.textContent = strings.labels[node.dataset.cLabel]; });
  document.querySelectorAll("[data-period]").forEach(button => { button.textContent = ({ "7d": lang === "pl" ? "7D" : "7Д", "30d": lang === "pl" ? "1M" : "1М", "90d": lang === "pl" ? "3M" : "3М", "180d": lang === "pl" ? "6M" : "6М", "365d": lang === "pl" ? "1R" : lang === "ru" ? "1Г" : "1Р" })[button.dataset.period]; button.setAttribute("aria-pressed", String(button.dataset.period === period)); button.setAttribute("aria-label", t(({"7d":"p7","30d":"p30","90d":"p90","180d":"p180","365d":"p365"})[button.dataset.period],lang)); });
  q("[data-c-pair]").setAttribute("aria-label", t("pair", lang));
  document.title = strings.metaTitle;
  q('meta[name="description"]').content = strings.metaDescription;
  if (ratesState === "loading") q("[data-c-updated]").textContent = t("updating",lang);
  else if (ratesState === "error") { q("[data-c-updated]").textContent = `${t("ratesError",lang)} · bank.gov.ua`; showRatesError(); }
  else if (rates) { renderRates(); if (converter) converter.setLocale(lang); renderPopular(); }
}
function renderRates() {
  const units = rates.units, locale = lang;
  q("[data-c-updated]").textContent = t("updated", lang, { time: formatUpdatedAt(rates.updated_at, lang) });
  q("[data-c-date]").textContent = t("fetchedOn", lang, { date: formatLocalDate(rates.updated_at,lang), rateDate: formatDate(rates.date, lang) });
  q("[data-c-stale]").hidden = !rates.stale;
  q("[data-c-stale]").textContent = rates.stale ? t("stale", lang) : "";
  const entries = [["PLN", "UAH", units.PLN], ["USD", "UAH", units.USD], ["USD", "PLN", units.USD / units.PLN]];
  q("[data-c-rates]").innerHTML = entries.map(([from,to,rate]) => `<div><dt>1 ${from}</dt><dd>${formatRate(rate, locale)} ${to}</dd></div>`).join("");
  renderPopular();
}
function renderPopular() {
  if (!rates) return;
  const amounts = { "PLN-UAH": [100,500,1000,2000,5000,10000], "UAH-PLN": [1000,5000,10000,20000,50000], "USD-UAH": [10,50,100,500,1000] };
  Object.entries(amounts).forEach(([key, list]) => {
    const [from,to] = key.split("-"), root = document.querySelector(`[data-popular="${key}"]`);
    root.innerHTML = list.map(amount => `<div><dt>${formatAmount(amount, from, lang)} ${from}</dt><dd>${formatAmount(convertAmount(amount, from, to, rates.units), to, lang)} ${to}</dd></div>`).join("");
  });
}
function labels() { const [from,to]=pair.split("-"); return { empty: t("historyEmpty",lang), from, to, chart: t("chart",lang), hover: t("hover",lang), table: t("table",lang), date: t("dateCol",lang), rate: t("rateCol",lang) }; }
function renderStats(points, selectedPair) {
  const stats = calculateStats(points), root = q("[data-c-stats]");
  if (!stats) { root.innerHTML = ""; return; }
  const [, to] = selectedPair.split("-"), sign = stats.change > 0 ? "+" : stats.change < 0 ? "−" : "";
  const change = stats.change === 0 ? t("zeroChange",lang) : `${sign}${formatRate(Math.abs(stats.change),lang)} ${to} · ${stats.percent === null ? "—" : `${sign}${formatAmount(Math.abs(stats.percent),"UAH",lang)}%`}`;
  const values = [[t("now",lang), `${formatRate(stats.current,lang)} ${to}`], [t("change",lang),change], [t("minimum",lang),`${formatRate(stats.min,lang)} ${to}`], [t("maximum",lang),`${formatRate(stats.max,lang)} ${to}`]];
  root.innerHTML = values.map(([name,value],i) => `<div class="${i===1 && stats.change>0 ? "is-positive" : i===1 && stats.change<0 ? "is-negative" : ""}"><dt>${name}</dt><dd>${value}</dd></div>`).join("");
}
async function loadHistory(force = false) {
  const generation = ++historyGeneration, root = q("[data-c-chart]"), status = q("[data-c-history-updated]");
  root.innerHTML = `<p class="currency-skeleton">${t("loadingHistory",lang)}</p>`; status.textContent = ""; q("[data-c-stats]").innerHTML = "";
  try {
    const result = await fetchHistory(pair, period, { force });
    if (generation !== historyGeneration) return;
    const points = makeSeries(result, pair);
    renderChart(root, points, pair, lang, labels()); renderStats(points, pair);
    status.textContent = `${t("fetchedOn",lang,{date:formatLocalDate(result.updated_at,lang),rateDate:result.end ? formatDate(result.end,lang) : ""})} · ${formatUpdatedAt(result.updated_at,lang)}${result.stale ? ` · ${t("staleHistory",lang)}` : ""}`;
  } catch {
    if (generation !== historyGeneration) return;
    root.innerHTML = `<div class="currency-error">${t("historyError",lang)} <button type="button" data-history-retry>${t("retry",lang)}</button></div>`;
    q("[data-c-stats]").innerHTML = "";
    root.querySelector("[data-history-retry]").addEventListener("click", () => loadHistory(true));
  }
}
function wireSelectors() {
  q("[data-c-pair]").addEventListener("change", event => { pair = event.target.value; loadHistory(); });
  document.querySelectorAll("[data-period]").forEach(button => button.addEventListener("click", () => { period = button.dataset.period; document.querySelectorAll("[data-period]").forEach(item => { item.classList.toggle("is-active",item===button); item.setAttribute("aria-pressed",String(item===button)); }); loadHistory(); }));
}
async function load(force = false) {
  ratesState = "loading";
  const preserveHistory = !q("[data-c-content]").hidden;
  q("[data-c-error]").hidden = true; q("[data-c-loading]").hidden = preserveHistory; q("[data-c-content]").hidden = !preserveHistory;
  q("[data-c-updated]").textContent = t("updating",lang);
  try {
    rates = await fetchRates({ force });
    ratesState = "ready";
    q("[data-c-loading]").hidden = true; q("[data-c-content]").hidden = false;
    q("[data-c-current-section]").hidden = false; q("[data-c-popular]").hidden = false;
    renderRates(); if (converter) converter.setUnits(rates.units); else converter = initConverter({ units: rates.units, locale: lang, onChange: () => {} });
    localize();
  } catch {
    ratesState = "error";
    q("[data-c-loading]").hidden = true;
    q("[data-c-updated]").textContent = `${t("ratesError",lang)} · bank.gov.ua`;
    q("[data-c-content]").hidden = false;
    q("[data-c-current-section]").hidden = true;
    q("[data-c-popular]").hidden = true;
    showRatesError();
  }
}
wireSelectors(); localize(); loadHistory(); load();
document.addEventListener("prywoz:language-change", event => { lang = event.detail?.language || lang; localize(); loadHistory(); });
