import { getNewsLanguage, newsLocale, newsText } from "./news-i18n.js?v=20261005-news6";

export const safeNewsUrl = (value, { allowFeed = false } = {}) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    if (!allowFeed && (/\.(?:rss|xml|atom)$/i.test(url.pathname) || /(^|\/)(?:rss|feed|atom)(?:\/|$)/i.test(url.pathname) || /\/api\/zrqiteuuir$/i.test(url.pathname))) return "";
    return url.href;
  } catch {
    return "";
  }
};

export const normalizeNewsItems = (items = []) => {
  const ordered = (Array.isArray(items) ? items : [])
    .filter((item) => item && typeof item === "object")
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  const seenUrls = new Set();
  const seenTitles = new Set();
  const seenHashes = new Set();
  return ordered.filter((item) => {
    if (!item || item.kind === "own" || item.kind === "editorial") return false;
    const title = String(item.title || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const url = safeNewsUrl(item.originalUrl);
    if (!title || !url) return false;
    const canonicalUrl = new URL(url);
    canonicalUrl.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid", "mc_cid", "mc_eid", "ref"].forEach((key) => canonicalUrl.searchParams.delete(key));
    canonicalUrl.searchParams.sort();
    const canonical = canonicalUrl.href;
    const key = title.normalize("NFKD").toLocaleLowerCase("uk-UA").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const hash = String(item.hash || "");
    if (seenUrls.has(canonical) || seenTitles.has(key) || (hash && seenHashes.has(hash))) return false;
    seenUrls.add(canonical);
    seenTitles.add(key);
    if (hash) seenHashes.add(hash);
    return true;
  }).slice(0, 300).map((item) => ({
    ...item,
    title: String(item.title).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    excerpt: String(item.excerpt || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    originalUrl: safeNewsUrl(item.originalUrl),
    sourceUrl: safeNewsUrl(item.sourceUrl, { allowFeed: true }),
    image: safeNewsUrl(item.image, { allowFeed: true }),
    source: String(item.source || ""),
    region: String(item.region || "other").toLowerCase(),
    category: String(item.category || "other").toLowerCase(),
    language: String(item.language || "").toLowerCase(),
  }));
};

export const newsDate = (value, language = getNewsLanguage(), options = {}) => {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return "";
  const format = Object.keys(options).length
    ? options
    : { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Intl.DateTimeFormat(newsLocale(language), { ...format, timeZone: "Europe/Warsaw" }).format(date);
};

export const newsTimestamp = (value, language = getNewsLanguage()) => {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return newsText("noUpdate", language);
  return new Intl.DateTimeFormat(newsLocale(language), { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Warsaw" }).format(date);
};

export const matchesNewsFilter = (item, filter) => {
  if (filter === "all") return true;
  if (["poland", "ukraine", "world"].includes(filter)) return item.region === filter;
  return item.category === filter;
};

export const filterNews = (items, filter) => items.filter((item) => matchesNewsFilter(item, filter));

export const rankTodayNews = (items) => [...items].sort((a, b) => {
  const priority = (item) => item.category === "documents" ? 0 : ({ poland: 1, ukraine: 2, world: 3 }[item.region] ?? 4);
  const difference = priority(a) - priority(b);
  return difference || (new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
});

export const externalNewsLink = (url) => {
  const href = safeNewsUrl(url);
  return href ? { href, target: "_blank", rel: "noopener noreferrer" } : null;
};
