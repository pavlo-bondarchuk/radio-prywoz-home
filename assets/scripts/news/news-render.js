import { getNews } from "./news-api.js?v=20261005-news6";
import { getNewsLanguage, newsText } from "./news-i18n.js?v=20261010-hot-carousel1";
import { externalNewsLink, filterNews, newsDate, newsTimestamp, normalizeNewsItems, rankTodayNews } from "./news-utils.js?v=20261005-news6";
import { renderHotNews, renderHotNewsLoading } from "./news-hot.js?v=20261010-hot-carousel1";

const byId = (id) => document.getElementById(id);
const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};
const safeLink = (url, text, className, ariaLabel) => {
  const attributes = externalNewsLink(url);
  if (!attributes) return node("span", className, text);
  const link = node("a", className, text);
  link.href = attributes.href;
  link.target = attributes.target;
  link.rel = attributes.rel;
  if (ariaLabel) link.setAttribute("aria-label", ariaLabel);
  return link;
};
const languageCode = (language) => ({ uk: "UA", pl: "PL", en: "EN", ru: "RU" }[language] || String(language || "").toUpperCase());
const categoryText = (item, language) => newsText(item.category || "other", language);
const regionText = (item, language) => newsText(item.region || "other", language);

const setHealth = (target, data, language, error = false) => {
  if (!target) return;
  target.replaceChildren();
  target.classList.toggle("news-health--error", error);
  if (!data?.updated_at) {
    target.textContent = error ? newsText("apiError", language) : data ? newsText("noUpdate", language) : newsText("loading", language);
    return;
  }
  const enabled = Number.isFinite(Number(data.enabled_count))
    ? Number(data.enabled_count)
    : (data.sources || []).filter((source) => source.enabled).length;
  const available = Number.isFinite(Number(data.available_count))
    ? Number(data.available_count)
    : (data.sources || []).filter((source) => source.enabled && source.status === "ok").length;
  target.append(document.createTextNode(newsText("updated", language) + " " + newsTimestamp(data.updated_at, language)));
  if (enabled) {
    target.append(document.createTextNode(" · " + newsText("available", language, { available, total: enabled })));
    if (available < enabled) target.append(node("span", "news-health__stale", " · " + newsText("partial", language)));
  }
  if (data.stale) {
    const stale = node("span", "news-health__stale", " · " + newsText("stale", language));
    target.append(stale);
  }
};

const addMeta = (item, language, compact = false) => {
  const meta = node("div", "news-item__meta");
  const tags = node("span", "news-item__tags");
  tags.append(node("span", "news-item__region", regionText(item, language)));
  tags.append(node("span", "news-item__category", categoryText(item, language)));
  if (item.language) tags.append(node("span", "news-item__language", languageCode(item.language)));
  const time = node("time", "news-item__date", newsDate(item.publishedAt, language, compact ? { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" } : undefined));
  time.setAttribute("aria-label", newsText("published", language) + " " + time.textContent);
  time.dateTime = item.publishedAt || "";
  meta.append(tags, time);
  if (item.fetchedAt) {
    const fetched = node("span", "news-item__fetched", newsText("fetched", language) + " " + newsDate(item.fetchedAt, language, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }));
    meta.append(fetched);
  }
  return meta;
};

const imagePlaceholder = (className) => {
  const placeholder = node("span", className + " news-image-placeholder");
  placeholder.setAttribute("aria-hidden", "true");
  const icon = node("svg", "icon news-image-placeholder__icon");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.append(node("use"));
  icon.firstChild.setAttribute("href", "./assets/icons/lucide-sprite.svg#newspaper");
  placeholder.append(icon);
  return placeholder;
};

const addImage = (item, className) => {
  if (!item.image) return null;
  const image = node("img", className);
  image.src = item.image;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 640;
  image.height = 360;
  image.addEventListener("error", () => {
    if (image.isConnected) {
      const parent = image.parentElement;
      image.replaceWith(imagePlaceholder(className));
      if (parent?.classList.contains("portal-featured-news__visual")) {
        parent.classList.add("portal-featured-news__visual--placeholder");
        parent.parentElement?.classList.add("portal-featured-news--no-image");
      }
    }
  }, { once: true });
  return image;
};

const addExcerpt = (container, item, language, className = "news-item__excerpt") => {
  container.append(node("span", "news-item__excerpt-label", newsText("rssExcerpt", language)));
  container.append(node("p", className, item.excerpt || newsText("noExcerpt", language)));
};

const addActions = (container, item, language) => {
  const actions = node("div", "news-item__actions");
  const source = item.sourceUrl
    ? safeLink(item.sourceUrl, item.source || item.sourceUrl, "news-item__source", newsText("sourceDetails", language))
    : node("span", "news-item__source", item.source || newsText("source", language));
  actions.append(source);
  actions.append(safeLink(item.originalUrl, newsText("readOriginal", language) + " →", "news-item__original"));
  container.append(actions);
};

const renderFeatured = (container, item, language, errorText = "") => {
  container.replaceChildren();
  container.setAttribute("aria-busy", "false");
  if (!item) {
    const copy = node("div", "portal-featured-news__copy news-state");
    if (errorText) copy.setAttribute("role", "alert");
    copy.append(node("h3", "", errorText || newsText("homeEmpty", language)));
    if (errorText) {
      const retry = node("button", "news-retry", newsText("retry", language));
      retry.type = "button";
      retry.dataset.newsRetry = "";
      copy.append(retry);
    }
    container.append(copy);
    return;
  }
  container.classList.add("portal-featured-news--loaded");
  container.classList.toggle("portal-featured-news--no-image", !item.image);
  const copy = node("div", "portal-featured-news__copy");
  copy.append(addMeta(item, language));
  const title = node("h3", "");
  title.append(safeLink(item.originalUrl, item.title, "news-item__title-link"));
  copy.append(title);
  addExcerpt(copy, item, language, "news-item__excerpt");
  addActions(copy, item, language);
  container.append(copy);

  const visual = node("div", "portal-featured-news__visual");
  const image = addImage(item, "portal-featured-news__image");
  if (image) visual.append(image);
  else {
    visual.classList.add("portal-featured-news__visual--placeholder");
    visual.append(imagePlaceholder("portal-featured-news__image"));
  }
  container.append(visual);
};

const renderHomeRow = (item, language) => {
  const article = node("article", "portal-news-row");
  const time = node("time", "news-item__date", newsDate(item.publishedAt, language, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }));
  time.dateTime = item.publishedAt || "";
  time.setAttribute("aria-label", newsText("published", language) + " " + time.textContent);
  const body = node("div", "portal-news-row__body");
  body.append(addMeta(item, language, true));
  const image = addImage(item, "portal-news-row__image");
  if (image) body.append(image);
  const title = node("h3", "");
  title.append(safeLink(item.originalUrl, item.title, "news-item__title-link"));
  body.append(title);
  addExcerpt(body, item, language, "news-item__excerpt");
  addActions(body, item, language);
  article.append(time, body);
  return article;
};

const renderArchiveCard = (item, language) => {
  const article = node("article", "news-feed-card");
  const image = addImage(item, "news-feed-card__image");
  if (image) article.append(image);
  article.append(addMeta(item, language));
  const title = node("h2", "news-feed-card__title");
  title.append(safeLink(item.originalUrl, item.title, "news-item__title-link"));
  article.append(title);
  addExcerpt(article, item, language, "news-item__excerpt");
  addActions(article, item, language);
  return article;
};

const renderState = (target, text, { error = false, retry = false, language = getNewsLanguage() } = {}) => {
  target.replaceChildren();
  target.setAttribute("aria-busy", "false");
  target.classList.add("news-state");
  target.setAttribute("role", error ? "alert" : "status");
  target.append(node("p", "", text));
  if (retry) {
    const button = node("button", "news-retry", newsText("retry", language));
    button.type = "button";
    button.dataset.newsRetry = "";
    target.append(button);
  }
};

const renderLoadingStories = (target) => {
  if (!target) return;
  target.replaceChildren();
  target.setAttribute("aria-busy", "true");
  const skeletons = Array.from({ length: 4 }, () => {
    const card = node("article", "news-feed-card news-feed-card--skeleton");
    card.setAttribute("aria-hidden", "true");
    card.append(node("span", "news-skeleton news-skeleton--meta"));
    card.append(node("span", "news-skeleton news-skeleton--title"));
    card.append(node("span", "news-skeleton news-skeleton--excerpt"));
    card.append(node("span", "news-skeleton news-skeleton--excerpt news-skeleton--short"));
    card.append(node("span", "news-skeleton news-skeleton--actions"));
    return card;
  });
  target.append(...skeletons);
};

const sourceIsOfficial = (source) => source.official === true || source.isOfficial === true || source.type === "official" || /(^|\.)gov\.pl$|uokik\.gov\.pl$|stat\.gov\.pl$/i.test(source.domain || "");
const sourceGroup = (source) => sourceIsOfficial(source) ? "official" : (source.region || "other");
const sourceGroups = ["lodz", "poland", "ukraine", "world", "official", "other"];

const renderSourceCards = (target, sources, language) => {
  target.replaceChildren();
  target.setAttribute("aria-busy", "false");
  target.classList.remove("news-state");
  const groups = new Map(sourceGroups.map((key) => [key, []]));
  sources.forEach((source) => (groups.get(sourceGroup(source)) || groups.get("other")).push(source));
  const fragment = document.createDocumentFragment();
  sourceGroups.forEach((group) => {
    const groupSources = groups.get(group) || [];
    if (!groupSources.length) return;
    const section = node("section", "news-sources-group");
    section.append(node("h2", "news-sources-group__title", newsText(group, language)));
    const list = node("div", "news-sources-list");
    groupSources.forEach((source) => {
      const card = node("article", "news-source-card");
      const header = node("div", "news-source-card__head");
      const title = node("h3", "");
      const domainUrl = source.sourceUrl || (source.domain ? "https://" + source.domain : "");
      title.append(safeLink(domainUrl, source.name || source.domain || "", "news-source-card__name", newsText("sourceDetails", language)));
      const statusKey = !source.enabled ? "statusDisabled" : source.status === "ok" ? "statusOk" : source.status === "stale" ? "statusStale" : source.status === "error" ? "statusError" : "noSourcesHealth";
      const status = node("span", "news-source-status news-source-status--" + (source.enabled ? source.status || "unknown" : "disabled"), newsText(statusKey, language));
      header.append(title, status);
      card.append(header);
      card.append(node("p", "news-source-card__domain", source.domain || ""));
      const metadata = node("dl", "news-source-card__meta");
      [["country", newsText(source.region || "other", language)], ["type", source.type === "official" ? newsText("sourceKindOfficial", language) : newsText(source.type || "publisher", language)], ["language", languageCode(source.language)], ["category", newsText(source.category || "other", language)], ["newsCount", source.itemsCount ?? 0]].forEach(([key, value]) => {
        const row = node("div", "news-source-card__meta-row");
        row.append(node("dt", "", newsText(key, language)), node("dd", "", String(value)));
        metadata.append(row);
      });
      if (source.lastSuccessAt) {
        const row = node("div", "news-source-card__meta-row");
        row.append(node("dt", "", newsText("lastSuccess", language)), node("dd", "", newsTimestamp(source.lastSuccessAt, language)));
        metadata.append(row);
      }
      card.append(metadata);
      list.append(card);
    });
    section.append(list);
    fragment.append(section);
  });
  target.append(fragment);
};

const updateCopy = (language) => {
  document.querySelectorAll("[data-news-copy]").forEach((element) => {
    element.textContent = newsText(element.dataset.newsCopy, language);
  });
  document.querySelectorAll("[data-news-filter-button]").forEach((button) => {
    const key = button.dataset.newsFilterButton;
    button.textContent = newsText(key, language);
  });
  document.querySelectorAll("[data-news-filters]").forEach((group) => group.setAttribute("aria-label", newsText("filters", language)));
  document.querySelectorAll("[data-news-archive-label]").forEach((region) => region.setAttribute("aria-label", newsText("archiveLabel", language)));
};

const startFeedPage = (home) => {
  const feature = byId("news-feature");
  const list = byId("news-list");
  const archive = byId("news-feed");
  const todayStories = byId("news-today-stories");
  const hotRoot = document.querySelector("[data-news-hot]");
  const hotRail = document.querySelector("[data-news-hot-stories]");
  const more = byId("news-more");
  const health = byId("news-health");
  const filterButtons = [...document.querySelectorAll("[data-news-filter-button]")];
  let language = getNewsLanguage();
  let filter = "all";
  let items = [];
  let responseData = null;
  let pageSize = home ? 4 : 12;
  let failure = null;
  let loading = true;

  const orderedItems = () => {
    const filtered = filterNews(items, filter);
    if (home || todayStories) {
      const priority = rankTodayNews(filtered).slice(0, 4);
      const chosen = new Set(priority.map((item) => item.id || item.originalUrl));
      const recent = filtered.filter((item) => !chosen.has(item.id || item.originalUrl));
      return { priority, remaining: recent };
    }
    return { priority: [], remaining: filtered };
  };

  const render = () => {
    language = getNewsLanguage();
    updateCopy(language);
    filterButtons.forEach((button) => {
      const active = button.dataset.newsFilterButton === filter;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("news-filter__button--active", active);
      button.classList.toggle("is-active", active);
    });
    setHealth(health, responseData, language, Boolean(failure && !items.length));
    if (loading && !responseData) {
      if (home) {
        feature.setAttribute("aria-busy", "true");
        const title = feature.querySelector("h3");
        const lead = feature.querySelector("p");
        if (title) title.textContent = newsText("loading", language);
        if (lead) lead.textContent = newsText("loadingLead", language);
      } else {
        renderState(archive, newsText("loading", language), { language });
        renderLoadingStories(todayStories);
        renderHotNewsLoading(hotRoot, hotRail, language);
      }
      if (list) list.replaceChildren();
      if (more) more.hidden = true;
      return;
    }
    if (failure && !items.length) {
      if (home) renderFeatured(feature, null, language, newsText("apiError", language));
      else {
        renderState(archive, newsText("apiError", language), { error: true, retry: true, language });
        todayStories?.replaceChildren();
      }
      if (hotRoot) hotRoot.hidden = true;
      if (list) list.replaceChildren();
      if (more) more.hidden = true;
      return;
    }
    const { priority, remaining } = orderedItems();
    if (!home && hotRoot && hotRail) renderHotNews(hotRoot, hotRail, items, priority, language, rankTodayNews, Boolean(responseData?.stale || failure));
    if (home) {
      renderFeatured(feature, priority[0], language);
      list.replaceChildren(...[...priority.slice(1), ...remaining.slice(0, Math.max(0, pageSize - priority.length))].map((item) => renderHomeRow(item, language)));
      more.hidden = pageSize >= priority.length + remaining.length;
      more.textContent = newsText("loadMore", language);
    } else {
      archive.setAttribute("aria-busy", "false");
      archive.classList.remove("news-state");
      if (todayStories) {
        todayStories.setAttribute("aria-busy", "false");
        const topCards = priority.map((item) => renderArchiveCard(item, language));
        todayStories.replaceChildren(...topCards);
        if (!topCards.length) renderState(todayStories, newsText("noNews", language), { language });
      }
      const cards = remaining.slice(0, pageSize).map((item) => renderArchiveCard(item, language));
      archive.replaceChildren(...cards);
      if (!remaining.length && !priority.length) renderState(archive, newsText("noNews", language), { language });
      more.hidden = pageSize >= remaining.length;
      more.textContent = newsText("loadMore", language);
    }
  };

  const load = async (refresh = false) => {
    language = getNewsLanguage();
    failure = null;
    more.disabled = true;
    more.setAttribute("aria-busy", "true");
    try {
      const data = await getNews({ refresh });
      loading = false;
      responseData = data;
      items = normalizeNewsItems(data.items || []);
      failure = null;
      render();
    } catch (error) {
      loading = false;
      responseData = error.data || responseData;
      items = normalizeNewsItems(responseData?.items || []);
      failure = error;
      render();
    } finally {
      more.disabled = false;
      more.removeAttribute("aria-busy");
    }
  };

  filterButtons.forEach((button) => button.addEventListener("click", () => {
    filter = button.dataset.newsFilterButton || "all";
    pageSize = home ? 4 : 12;
    render();
  }));
  more.addEventListener("click", () => {
    pageSize += 12;
    render();
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-news-retry]")) load(true);
  });
  document.addEventListener("prywoz:languagechange", render);
  load();
};

const startSourcesPage = () => {
  const root = byId("news-sources");
  const health = byId("news-health");
  let data = null;
  let error = false;
  const render = () => {
    const language = getNewsLanguage();
    updateCopy(language);
    setHealth(health, data, language, error);
    if (data?.sources?.length) renderSourceCards(root, data.sources, language);
    else renderState(root, error ? newsText("noSources", language) : newsText("loadingSources", language), { error, retry: error, language });
  };
  const load = async (refresh = false) => {
    try {
      data = await getNews({ refresh });
      error = false;
    } catch (failure) {
      data = failure.data || data;
      error = true;
    }
    render();
  };
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-news-retry]")) load(true);
  });
  document.addEventListener("prywoz:languagechange", render);
  load();
};

const language = getNewsLanguage();
updateCopy(language);
if (document.querySelector("[data-news-home]")) startFeedPage(true);
if (document.querySelector("[data-news-archive]")) startFeedPage(false);
if (document.querySelector("[data-news-sources-page]")) startSourcesPage();
