import { newsDate, safeNewsUrl } from "./news-utils.js?v=20261005-news6";
import { newsLocale, newsText } from "./news-i18n.js?v=20261009-hot1";

const canonicalUrl = (value) => {
  const safe = safeNewsUrl(value);
  if (!safe) return "";
  try {
    const url = new URL(safe);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid", "mc_cid", "mc_eid", "ref"].forEach((key) => url.searchParams.delete(key));
    url.searchParams.sort();
    return url.href;
  } catch {
    return "";
  }
};

const titleKey = (value) => String(value || "").normalize("NFKD").toLocaleLowerCase("uk-UA").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const identityKeys = (item) => [
  item.id ? `id:${item.id}` : "",
  canonicalUrl(item.originalUrl) ? `url:${canonicalUrl(item.originalUrl)}` : "",
  titleKey(item.title) ? `title:${titleKey(item.title)}` : "",
  item.hash ? `hash:${item.hash}` : "",
].filter(Boolean);

export const selectHotNews = (items = [], excludedItems = [], rankTodayNews = (value) => value) => {
  const candidates = (Array.isArray(items) ? items : []).filter((item) => item && typeof item === "object" && typeof item.title === "string" && item.title.trim() && safeNewsUrl(item.originalUrl) && Number.isFinite(Date.parse(item.publishedAt || "")));
  const excluded = new Set((Array.isArray(excludedItems) ? excludedItems : []).filter((item) => item && typeof item === "object").flatMap(identityKeys));
  const ranked = new Map(rankTodayNews(candidates).map((item, index) => [item, index]));
  const seen = new Set(excluded);
  return [...candidates]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || (ranked.get(a) ?? Number.MAX_SAFE_INTEGER) - (ranked.get(b) ?? Number.MAX_SAFE_INTEGER))
    .filter((item) => {
      const keys = identityKeys(item);
      if (keys.some((key) => seen.has(key))) return false;
      keys.forEach((key) => seen.add(key));
      return true;
    })
    .slice(0, 5);
};

const relativePublished = (value, language) => {
  const timestamp = Date.parse(value || "");
  if (!Number.isFinite(timestamp)) return "";
  const ageMinutes = Math.round((timestamp - Date.now()) / 60_000);
  if (ageMinutes > 0) return newsDate(value, language, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  if (Math.abs(ageMinutes) >= 24 * 60) return newsDate(value, language, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const unit = Math.abs(ageMinutes) < 60 ? "minute" : "hour";
  const amount = unit === "minute" ? ageMinutes : Math.round(ageMinutes / 60);
  return new Intl.RelativeTimeFormat(newsLocale(language), { numeric: "auto" }).format(amount, unit);
};

const element = (tag, className, text) => {
  const result = document.createElement(tag);
  result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
};

const renderCard = (item, language, position) => {
  const card = element("li", "news-hot__item");
  const link = element("a", "news-hot__link");
  link.href = safeNewsUrl(item.originalUrl);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.dataset.newsHotLink = "";
  link.dataset.newsHotKey = canonicalUrl(item.originalUrl) || `title:${titleKey(item.title)}`;
  link.dataset.newsHotSource = item.source || "unknown";
  link.dataset.newsHotRegion = item.region || "other";
  link.dataset.newsHotPosition = String(position);

  const published = element("time", "news-hot__time", relativePublished(item.publishedAt, language));
  published.dateTime = new Date(item.publishedAt).toISOString();
  published.setAttribute("aria-label", `${newsText("published", language)} ${newsDate(item.publishedAt, language)}`);
  const title = element("h3", "news-hot__headline", item.title);
  title.dataset.noAutoI18n = "";
  const source = element("span", "news-hot__source", String(item.source || "").trim() || newsText("hotSourceFallback", language));
  const arrow = element("span", "news-hot__arrow", "→");
  arrow.setAttribute("aria-hidden", "true");
  const footer = element("footer", "news-hot__footer");
  footer.append(source, arrow);
  link.replaceChildren(published, title, footer);
  card.append(link);
  return card;
};

export const renderHotNews = (root, rail, items, excludedItems, language, rankTodayNews, stale = false) => {
  if (!root || !rail) return;
  const focusedLink = rail.contains(document.activeElement) ? document.activeElement.closest("[data-news-hot-link]") : null;
  const focusedKey = focusedLink?.dataset.newsHotKey || "";
  const savedScrollLeft = rail.scrollLeft;
  const stories = selectHotNews(items, excludedItems, rankTodayNews);
  const existing = new Map([...rail.querySelectorAll("[data-news-hot-link]")].map((link) => [link.dataset.newsHotKey, link]));
  const cards = stories.map((item, index) => {
    const freshCard = renderCard(item, language, index + 1);
    const fresh = freshCard.firstElementChild;
    const previous = existing.get(fresh.dataset.newsHotKey);
    if (!previous) return freshCard;
    previous.href = fresh.href;
    previous.target = fresh.target;
    previous.rel = fresh.rel;
    previous.dataset.newsHotSource = fresh.dataset.newsHotSource;
    previous.dataset.newsHotRegion = fresh.dataset.newsHotRegion;
    previous.dataset.newsHotPosition = fresh.dataset.newsHotPosition;
    previous.replaceChildren(...fresh.childNodes);
    const wrapper = previous.closest(".news-hot__item") || element("li", "news-hot__item");
    if (!wrapper.contains(previous)) wrapper.append(previous);
    return wrapper;
  });
  root.hidden = stories.length === 0;
  rail.setAttribute("aria-busy", "false");
  rail.setAttribute("aria-label", newsText("hotTitle", language));
  if (!stories.length) {
    rail.replaceChildren();
    return;
  }
  rail.replaceChildren(...cards);
  rail.scrollLeft = savedScrollLeft;
  if (focusedKey) {
    const replacement = [...rail.querySelectorAll("[data-news-hot-link]")].find((link) => link.dataset.newsHotKey === focusedKey);
    replacement?.focus({ preventScroll: true });
  }
  rail.scrollLeft = savedScrollLeft;
  root.dataset.stale = String(Boolean(stale));
  const hint = root.querySelector("[data-news-hot-hint]");
  if (hint) hint.textContent = stale ? newsText("hotStale", language) : newsText("hotScrollHint", language);
  if (!root.dataset.analyticsBound) {
    root.dataset.analyticsBound = "true";
    rail.addEventListener("click", (event) => {
      const link = event.target.closest("[data-news-hot-link]");
      if (!link || !window.prywozAnalytics?.push) return;
      try {
        if (localStorage.getItem("prywoz-analytics-consent") !== "accepted") return;
      } catch {
        return;
      }
      window.prywozAnalytics.push("news_hot_open", {
        source: link.dataset.newsHotSource || "unknown",
        region: link.dataset.newsHotRegion || "other",
        position: Number(link.dataset.newsHotPosition) || 0,
      });
    });
  }
};

export const renderHotNewsLoading = (root, rail, language) => {
  if (!root || !rail) return;
  root.hidden = false;
  rail.setAttribute("aria-busy", "true");
  rail.setAttribute("aria-label", newsText("hotTitle", language));
  const status = element("li", "news-hot__item news-hot__item--loading", newsText("hotLoading", language));
  status.setAttribute("role", "status");
  rail.replaceChildren(status);
};
