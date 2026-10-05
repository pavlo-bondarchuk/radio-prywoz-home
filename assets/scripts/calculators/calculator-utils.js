const LOCALES = Object.freeze({ uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" });
const WARSAW_TIME_ZONE = "Europe/Warsaw";

/** Parse a non-negative decimal entered with either a comma or a dot. */
export function parseDecimal(value) {
  let text = String(value ?? "").trim().replace(/[\s\u00a0\u202f'’]/g, "");
  if (!text || /[eE]|[-+]|[^\d,.]/.test(text)) return null;

  const comma = text.lastIndexOf(",");
  const dot = text.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) {
    const decimalAt = Math.max(comma, dot);
    text = `${text.slice(0, decimalAt).replace(/[,.]/g, "")}.${text.slice(decimalAt + 1).replace(/[,.]/g, "")}`;
  } else if (comma >= 0 || dot >= 0) {
    const separator = comma >= 0 ? "," : ".";
    const pieces = text.split(separator);
    if (pieces.length > 2) {
      const last = pieces.at(-1);
      text = last.length === 3 ? pieces.join("") : `${pieces.slice(0, -1).join("")}.${last}`;
    } else if (pieces[1].length === 3 && pieces[0].length > 0 && pieces[0].length <= 3) {
      text = pieces.join("");
    } else {
      text = `${pieces[0] || "0"}.${pieces[1]}`;
    }
  }

  if (!/^\d+(?:\.\d*)?$/.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 && number <= 1e15 ? number : null;
}

/** Format a finite number without ever leaking NaN or scientific notation. */
export function formatNumber(value, language = "uk", options = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  const locale = LOCALES[language] || LOCALES.uk;
  const digits = Number.isInteger(number) ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: options.minimumFractionDigits ?? (options.maximumFractionDigits === undefined ? 0 : Math.min(digits, options.maximumFractionDigits)),
    maximumFractionDigits: options.maximumFractionDigits ?? Math.max(2, digits),
    ...options
  }).format(number);
}

/** Format a PLN amount with locale-aware digits and a PLN currency marker. */
export function formatPLN(value, language = "uk", options = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return new Intl.NumberFormat(LOCALES[language] || LOCALES.uk, {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  }).format(number);
}

/** Return numeric Warsaw calendar fields, independent of the device timezone. */
export function getWarsawDateParts(date = new Date()) {
  const parsed = date instanceof Date ? date : new Date(date);
  if (!Number.isFinite(parsed.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: WARSAW_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(parsed);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return { year: Number(values.year), month: Number(values.month), day: Number(values.day) };
}

/** Format a date in the Warsaw timezone for a supported site language. */
export function formatWarsawDate(date, language = "uk") {
  const parsed = date instanceof Date ? date : new Date(date);
  if (!Number.isFinite(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALES[language] || LOCALES.uk, {
    timeZone: WARSAW_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

/** Send a value-free calculator event through the site's consent-aware analytics bridge. */
export function trackCalculatorEvent(name) {
  if (typeof name !== "string" || !/^[a-z][a-z0-9_]{1,63}$/.test(name)) return;
  try {
    globalThis.prywozAnalytics?.push(name);
  } catch {
    // Analytics must never interrupt a local calculation.
  }
}
