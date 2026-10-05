import assert from "node:assert/strict";

import {
  externalNewsLink,
  filterNews,
  newsTimestamp,
  normalizeNewsItems,
  rankTodayNews,
  safeNewsUrl,
} from "../assets/scripts/news/news-utils.js?v=20261005-news5";
import { getNewsLanguage, newsText } from "../assets/scripts/news/news-i18n.js?v=20261005-news5";

const article = (overrides = {}) => ({
  id: "a", title: "Оригінальний заголовок", excerpt: "Короткий опис", source: "Source",
  originalUrl: "https://example.org/story", sourceUrl: "https://example.org",
  publishedAt: "2026-10-05T10:00:00Z", fetchedAt: "2026-10-05T10:05:00Z",
  region: "poland", category: "society", language: "uk", kind: "aggregated", ...overrides,
});

assert.equal(safeNewsUrl("javascript:alert(1)"), "");
assert.equal(safeNewsUrl("/relative/story"), "");
assert.equal(safeNewsUrl("https://example.org/rss/pl/5438/8.xml"), "");
assert.ok(safeNewsUrl("https://example.org/story?id=1"));
assert.deepEqual(externalNewsLink("https://example.org/story"), { href: "https://example.org/story", target: "_blank", rel: "noopener noreferrer" });
assert.equal(externalNewsLink("https://example.org/feed"), null);

const normalized = normalizeNewsItems([
  null,
  article({ id: "one", originalUrl: "https://Example.org/Story?id=1&utm_source=mail#top", title: "<b>First</b> original title", excerpt: "<script>alert(1)</script>Details" }),
  article({ id: "tracking-copy", originalUrl: "https://example.org/Story?utm_source=other&id=1", title: "Different title for canonical duplicate" }),
  article({ id: "meaningful-query", originalUrl: "https://example.org/Story?id=2", title: "Second original title" }),
  article({ id: "path-case", originalUrl: "https://example.org/story?id=1", title: "Third original title" }),
  article({ id: "hash-copy", originalUrl: "https://example.org/other", title: "Hash duplicate", hash: "same-hash" }),
  article({ id: "hash-source-copy", originalUrl: "https://example.org/another", title: "Another title", hash: "same-hash" }),
  article({ id: "rss", originalUrl: "https://example.org/rss.xml" }),
  article({ id: "relative", originalUrl: "/story" }),
]);
assert.deepEqual(normalized.map((item) => item.id), ["one", "meaningful-query", "path-case", "hash-copy"]);
assert.equal(normalized[0].title, "First original title");
assert.equal(normalized[0].excerpt, "alert(1) Details");
assert.equal(normalized[1].title, "Second original title", "original titles are preserved, not translated");
assert.doesNotMatch(normalized[0].excerpt, /<script|>/);
assert.doesNotThrow(() => normalizeNewsItems([null, undefined, 4, article({ publishedAt: "invalid" })]));

const docsUkraine = article({ id: "doc", region: "ukraine", category: "documents", publishedAt: "2026-10-01T10:00:00Z" });
const polandNews = article({ id: "poland", region: "poland", category: "society", publishedAt: "2026-10-05T11:00:00Z" });
const lodzNews = article({ id: "lodz", region: "lodz", category: "culture", publishedAt: "2026-10-04T10:00:00Z" });
assert.deepEqual(rankTodayNews([polandNews, docsUkraine, lodzNews]).map((item) => item.id), ["lodz", "doc", "poland"]);
const categories = ["all", "lodz", "poland", "ukraine", "world", "documents", "society", "culture", "sport"];
assert.deepEqual(categories.map((key) => newsText(key, "uk")), ["Усі", "Лодзь", "Польща", "Україна", "Світ", "Документи", "Суспільство", "Культура", "Спорт"]);
assert.deepEqual(filterNews([docsUkraine, polandNews, lodzNews], "documents"), [docsUkraine]);

const savedLanguage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
const savedDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
for (const language of ["uk", "pl", "ru"]) {
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => language } });
  assert.equal(getNewsLanguage(), language);
  assert.notEqual(newsText("apiError", language), "apiError");
}
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => "xx" } });
assert.equal(getNewsLanguage(), "uk");
const timestamps = [];
for (const zone of ["Europe/Warsaw", "Europe/Kyiv", "America/Los_Angeles"]) {
  process.env.TZ = zone;
  timestamps.push(newsTimestamp("2026-10-05T12:40:00Z", "uk"));
}
assert.equal(new Set(timestamps).size, 1, "update time uses Warsaw regardless of browser timezone");
assert.match(timestamps[0], /14:40/);
if (savedLanguage) Object.defineProperty(globalThis, "localStorage", savedLanguage);
else delete globalThis.localStorage;
if (savedDocument) Object.defineProperty(globalThis, "document", savedDocument);
else delete globalThis.document;

globalThis.document = { cookie: "" };
const api = await import("../assets/scripts/news/news-api.js?v=20261005-news5");
let requestCount = 0;
let resolveRequest;
globalThis.fetch = () => {
  requestCount++;
  return new Promise((resolve) => { resolveRequest = resolve; });
};
const first = api.getNews();
const second = api.getNews({ refresh: true });
assert.equal(requestCount, 1, "parallel page consumers share one request");
const success = { source: "PRYWOZ RSS", updated_at: "2026-10-05T12:40:00+02:00", stale: false, items: [article()] };
resolveRequest({ ok: true, json: async () => success });
assert.equal(await first, await second);

globalThis.fetch = async () => ({
  ok: false, status: 503,
  json: async () => ({ error: "News temporarily unavailable", updated_at: success.updated_at, stale: true, items: success.items, sources: [] }),
});
await assert.rejects(api.getNews({ refresh: true }), (error) => {
  assert.equal(error.data.updated_at, success.updated_at);
  assert.equal(error.data.stale, true);
  assert.equal(error.data.items.length, 1);
  return true;
});

globalThis.fetch = (_url, options) => new Promise((_resolve, reject) => {
  options.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")), { once: true });
});
await assert.rejects(api.getNews({ refresh: true, timeoutMs: 10 }), { name: "AbortError" });

console.log("News normalization, safe links, deduplication, ranking, localization and API contract: PASS");
