import { fetchRates } from "./currency-api.js?v=20261005-currency2";
import { convertAmount, formatLocalDate } from "./currency-format.js?v=20261005-currency2";

const labels = { uk: ["Останнє оновлення", "Курси НБУ · bank.gov.ua", "Курси валют", "дані з кешу"], pl: ["Ostatnia aktualizacja", "Kurs NBU · bank.gov.ua", "Kursy walut", "dane z pamięci podręcznej"], ru: ["Последнее обновление", "Курсы НБУ · bank.gov.ua", "Курсы валют", "данные из кеша"] };
let latest = null;
function render(data) {
  const localeKey = localStorage.getItem("prywoz-language"), locale = ({ uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" })[localeKey] || "uk-UA", words = labels[localeKey] || labels.uk;
  const rate = convertAmount(1, "UAH", "PLN", data.units);
  const value = Number.isFinite(rate) ? `1 UAH = ${new Intl.NumberFormat(locale,{minimumFractionDigits:4,maximumFractionDigits:4}).format(rate)} PLN` : "—";
  document.querySelectorAll("[data-header-currency], [data-currency-title]").forEach(node => { node.textContent = value; const link = node.closest("a"); if (link) { link.setAttribute("aria-label", words[2]); const time = new Intl.DateTimeFormat(locale,{timeZone:"Europe/Warsaw",hour:"2-digit",minute:"2-digit"}).format(new Date(data.updated_at)); link.setAttribute("title", `${words[0]} ${formatLocalDate(data.updated_at,localeKey)} ${time} · bank.gov.ua${data.stale ? ` · ${words[3]}` : ""}`); } });
  document.querySelectorAll("[data-currency-meta]").forEach(node => { node.textContent = words[1]; });
}
export async function loadHeaderCurrency() {
  if (!document.querySelector("[data-header-currency], [data-currency-title]")) return;
  try {
    latest = await fetchRates(); render(latest);
  } catch { document.querySelectorAll("[data-header-currency], [data-currency-title]").forEach(node => { node.textContent = "—"; }); }
}
document.addEventListener("prywoz:currency-rates", event => { latest = event.detail?.rates || latest; if (latest) render(latest); });
document.addEventListener("prywoz:language-change", () => { if (latest) render(latest); });
