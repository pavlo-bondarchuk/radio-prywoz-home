const endpoint = "./api/currency.php";
const isDate = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10) === value;
const isTimestamp = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
let ratesPromise;
let ratesReceivedAt = 0;
const historyPromises = new Map();
async function request(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(url.includes("action=history") ? 45000 : 20000) });
  if (!response.ok) throw new Error(`Currency API ${response.status}`);
  return response.json();
}
function validateRates(data) {
  const dateOk = isDate(data?.date), timestampOk = isTimestamp(data?.updated_at);
  if (!data || data.source !== "bank.gov.ua" || !timestampOk || !dateOk || !data.units || Number(data.units.UAH) !== 1 || !["PLN", "USD"].every(code => Number.isFinite(Number(data.units[code])) && Number(data.units[code]) > 0) || !data.rates || !["PLN_UAH", "USD_UAH", "PLN_USD", "USD_PLN", "UAH_PLN", "UAH_USD"].every(key => Number.isFinite(Number(data.rates[key])) && Number(data.rates[key]) > 0)) throw new Error("Invalid currency rates");
  const expected = { PLN_UAH: data.units.PLN, USD_UAH: data.units.USD, PLN_USD: data.units.PLN / data.units.USD, USD_PLN: data.units.USD / data.units.PLN, UAH_PLN: 1 / data.units.PLN, UAH_USD: 1 / data.units.USD };
  if (Object.entries(expected).some(([key,value]) => Math.abs(Number(data.rates[key]) - value) > Math.max(1e-7, value * 1e-5))) throw new Error("Inconsistent currency units");
  return data;
}
export function fetchRates({ force = false } = {}) {
  const pending = ratesPromise && ratesPromise.__pending;
  if (pending) return ratesPromise;
  if (ratesPromise && !force && Date.now() - ratesReceivedAt < 5 * 60 * 1000) return ratesPromise;
  const promise = request(`${endpoint}?action=rates`).then(validateRates).then(data => {
    ratesReceivedAt = Date.now();
    if (typeof document !== "undefined") document.dispatchEvent(new CustomEvent("prywoz:currency-rates", { detail: { rates: data } }));
    return data;
  }).catch(error => { if (ratesPromise === promise) ratesPromise = null; throw error; });
  promise.__pending = true;
  ratesPromise = promise;
  promise.then(() => { promise.__pending = false; }, () => { promise.__pending = false; });
  return ratesPromise;
}
export function fetchHistory(pair, period, { force = false } = {}) {
  if (!["PLN-UAH","USD-UAH","USD-PLN"].includes(pair) || !["7d","30d","90d","180d","365d"].includes(period)) return Promise.reject(new Error("Invalid history selection"));
  const key = `${pair}:${period}`;
  const existing = historyPromises.get(key);
  if (existing?.__pending) return existing;
  if (!existing || force) {
    const url = `${endpoint}?action=history&pair=${encodeURIComponent(pair)}&period=${encodeURIComponent(period)}`;
    const promise = request(url).then(data => {
      if (!data || data.source !== "bank.gov.ua" || data.pair !== pair || data.period !== period || !isTimestamp(data.updated_at) || !isDate(data.start) || !isDate(data.end) || !Array.isArray(data.data) || data.data.some((point,index) => !isDate(point?.date) || !Number.isFinite(Number(point.rate)) || Number(point.rate) <= 0 || point.date < data.start || point.date > data.end || index > 0 && data.data[index-1].date >= point.date)) throw new Error("Invalid currency history");
      return data;
    }).catch(error => { if(historyPromises.get(key)===promise) historyPromises.delete(key); throw error; });
    promise.__pending = true;
    historyPromises.set(key, promise);
    promise.then(() => { promise.__pending = false; }, () => { promise.__pending = false; });
  }
  return historyPromises.get(key);
}
export function clearCurrencyRequestsForTests() { ratesPromise = null; ratesReceivedAt = 0; historyPromises.clear(); }
