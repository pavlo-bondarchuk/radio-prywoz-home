const locales = { uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" };
const digits = { PLN: 2, USD: 2, UAH: 2 };
export const localeTag = lang => locales[lang] || locales.uk;
export function parseAmount(value) {
  let text = String(value ?? "").trim().replace(/(?:PLN|UAH|USD|zł|грн|₴|\$)/gi, "");
  if (!text) return null;
  if (/[eE]|[-+]|[^\d\s\u00a0\u202f'’,.]/.test(text)) return null;
  text = text.replace(/[\s\u00a0\u202f'’]/g, "");
  const comma = text.lastIndexOf(","), dot = text.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) { const decimal = Math.max(comma, dot); text = text.slice(0, decimal).replace(/[,.]/g, "") + "." + text.slice(decimal + 1).replace(/[,.]/g, ""); }
  else if (comma >= 0 || dot >= 0) {
    const separator = comma >= 0 ? "," : ".", pieces = text.split(separator);
    if (pieces.length > 2) {
      const decimalLike = pieces.at(-1).length !== 3;
      text = decimalLike ? pieces.slice(0,-1).join("") + "." + pieces.at(-1) : pieces.join("");
    } else if (pieces[1].length === 3 && pieces[0].length <= 3) text = pieces.join("");
    else text = pieces.join(".");
  }
  if (!/^\d*(?:\.\d*)?$/.test(text) || text === ".") return null;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 && number <= 1e15 ? number : null;
}
export function formatAmount(value, currency = "UAH", locale = "uk") {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return "—";
  return new Intl.NumberFormat(localeTag(locale), { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true }).format(Number(value));
}
export function formatRate(value, locale = "uk") {
  if (!Number.isFinite(Number(value))) return "—";
  return new Intl.NumberFormat(localeTag(locale), { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(Number(value));
}
export function formatUpdatedAt(timestamp, locale = "uk") {
  const date = new Date(timestamp);
  if (!timestamp || !Number.isFinite(date.getTime())) return "—";
  return new Intl.DateTimeFormat(localeTag(locale), { timeZone: "Europe/Warsaw", hour: "2-digit", minute: "2-digit" }).format(date);
}
export function formatLocalDate(timestamp, locale = "uk") {
  const date = new Date(timestamp);
  if (!timestamp || !Number.isFinite(date.getTime())) return "—";
  return new Intl.DateTimeFormat(localeTag(locale), { timeZone: "Europe/Warsaw", day: "numeric", month: "long", year: "numeric" }).format(date);
}
export function formatDate(date, locale = "uk", options = { day: "numeric", month: "long", year: "numeric" }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return "—";
  return new Intl.DateTimeFormat(localeTag(locale), { ...options, timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
export function convertAmount(value, from, to, units) {
  if (!Number.isFinite(value) || value < 0 || !units || !Number.isFinite(Number(units[from])) || !Number.isFinite(Number(units[to]))) return null;
  const result = value * Number(units[from]) / Number(units[to]);
  return Number.isFinite(result) && result <= 1e15 ? result : null;
}
export function currencyName(code, locale = "uk") {
  return ({ uk: { PLN: "польський злотий", USD: "долар США", UAH: "українська гривня" }, pl: { PLN: "polski złoty", USD: "dolar amerykański", UAH: "hrywna ukraińska" }, ru: { PLN: "польский злотый", USD: "доллар США", UAH: "украинская гривна" } }[locale] || { PLN: "польський злотий", USD: "долар США", UAH: "українська гривня" })[code];
}
