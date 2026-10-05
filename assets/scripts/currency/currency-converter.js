import { convertAmount, formatAmount, parseAmount, currencyName } from "./currency-format.js?v=20261005-currency2";
const codes = ["PLN", "USD", "UAH"];
export function convertTriplet(amount, active, units) {
  const result = {};
  for (const code of codes) result[code] = code === active ? amount : amount === null ? null : convertAmount(amount, active, code, units);
  return result;
}
export function initConverter({ units, locale = "uk", onChange = () => {} }) {
  const root = document.querySelector("[data-converter]");
  let active = "PLN", values = convertTriplet(1000, active, units), editing = false, dirty = false;
  const render = (format = true) => {
    root.querySelectorAll("[data-currency-input]").forEach(input => {
      const code = input.dataset.currencyInput, isActive = code === active;
      input.readOnly = !isActive; input.setAttribute("aria-label", `${currencyName(code, locale)} (${code})`);
      if (isActive) { if (!editing || format) input.value = values[code] === null ? "" : (format ? formatAmount(values[code], code, locale) : input.value); }
      else input.value = values[code] === null ? "" : formatAmount(values[code], code, locale);
      input.classList.toggle("is-active", isActive);
    });
    root.querySelectorAll("[data-currency-row]").forEach(row => { row.classList.toggle("is-active", row.dataset.currencyRow === active); });
    document.querySelectorAll(".currency-converter-card [data-quick-value]").forEach(button => { button.textContent = new Intl.NumberFormat(locale === "pl" ? "pl-PL" : locale === "ru" ? "ru-RU" : "uk-UA").format(Number(button.dataset.quickValue)); });
    onChange({ active, values });
  };
  root.querySelectorAll("[data-currency-input]").forEach(input => {
    input.addEventListener("focus", () => { active = input.dataset.currencyInput; editing = true; dirty = false; render(false); input.select(); });
    input.addEventListener("input", () => { active = input.dataset.currencyInput; values = convertTriplet(parseAmount(input.value), active, units); editing = true; dirty = true; render(false); });
    input.addEventListener("blur", () => { if (dirty) values = convertTriplet(parseAmount(input.value), input.dataset.currencyInput, units); editing = false; dirty = false; render(true); });
  });
  document.querySelectorAll(".currency-converter-card [data-quick-value]").forEach(button => button.addEventListener("click", () => { values = convertTriplet(Number(button.dataset.quickValue), active, units); editing = false; render(true); }));
  render(true);
  return { setUnits(next) { units = next; values = convertTriplet(values[active], active, units); render(!editing); }, setLocale(next) { locale = next; render(!editing); }, getState: () => ({ active, values }) };
}
