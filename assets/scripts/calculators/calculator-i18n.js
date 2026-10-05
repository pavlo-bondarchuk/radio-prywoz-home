const SUPPORTED_LANGUAGES = new Set(["uk", "pl", "ru"]);
const LOCALES = Object.freeze({ uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" });
const subscribers = new Set();
let languageListenerAttached = false;

export function getLanguage() {
  try {
    const saved = globalThis.localStorage?.getItem("prywoz-language");
    if (SUPPORTED_LANGUAGES.has(saved)) return saved;
  } catch {
    // Storage may be unavailable in private or restricted browsing contexts.
  }
  const pageLanguage = globalThis.document?.documentElement?.lang?.slice(0, 2);
  return SUPPORTED_LANGUAGES.has(pageLanguage) ? pageLanguage : "uk";
}

export function getLocale(language = getLanguage()) {
  return LOCALES[language] || LOCALES.uk;
}

/** Resolve a key from either a locale-indexed dictionary or a flat dictionary. */
export function t(dictionary, key, language = getLanguage()) {
  if (!dictionary || typeof dictionary !== "object") return key;
  const localized = dictionary[language] || dictionary.uk || dictionary;
  const value = localized?.[key];
  return typeof value === "string" ? value : key;
}

/** Apply shared data-calculator-i18n attributes inside a page or component root. */
export function applyTranslations(root, dictionary, language = getLanguage()) {
  if (!root?.querySelectorAll) return;
  const nodes = [];
  if (root.matches?.("[data-calculator-i18n], [data-calculator-i18n-aria], [data-calculator-i18n-title], [data-calculator-i18n-placeholder]")) nodes.push(root);
  nodes.push(...root.querySelectorAll("[data-calculator-i18n], [data-calculator-i18n-aria], [data-calculator-i18n-title], [data-calculator-i18n-placeholder]"));

  nodes.forEach(node => {
    const textKey = node.dataset.calculatorI18n;
    const ariaKey = node.dataset.calculatorI18nAria;
    const titleKey = node.dataset.calculatorI18nTitle;
    const placeholderKey = node.dataset.calculatorI18nPlaceholder;
    if (textKey) node.textContent = t(dictionary, textKey, language);
    if (ariaKey) node.setAttribute("aria-label", t(dictionary, ariaKey, language));
    if (titleKey) node.setAttribute("title", t(dictionary, titleKey, language));
    if (placeholderKey) node.setAttribute("placeholder", t(dictionary, placeholderKey, language));
  });
}

/** Subscribe to the site's language-change event; only one DOM listener is installed. */
export function bindLanguageChange(callback) {
  if (typeof callback !== "function") return () => {};
  subscribers.add(callback);
  if (!languageListenerAttached && globalThis.document?.addEventListener) {
    document.addEventListener("prywoz:language-change", event => {
      const language = SUPPORTED_LANGUAGES.has(event.detail?.language) ? event.detail.language : getLanguage();
      subscribers.forEach(listener => listener(language, event));
    });
    languageListenerAttached = true;
  }
  return () => subscribers.delete(callback);
}
