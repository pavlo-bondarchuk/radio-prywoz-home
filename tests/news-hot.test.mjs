import assert from "node:assert/strict";

import { rankTodayNews } from "../assets/scripts/news/news-utils.js?v=20261005-news5";
import { selectHotNews, renderHotNews } from "../assets/scripts/news/news-hot.js?v=20261010-hot-carousel1";

const article = (id, minutesAgo, overrides = {}) => ({
  id,
  title: `Новина ${id}`,
  originalUrl: `https://example.org/story/${id}`,
  source: "PAP",
  region: "poland",
  category: "society",
  publishedAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
  ...overrides,
});

// Freshness wins; importance from the existing today ranking is only a tie-break.
const newest = article("newest", 2, { category: "society" });
const tiedImportant = article("important", 5, { category: "documents" });
const tiedOther = article("other", 5, { category: "society" });
assert.deepEqual(selectHotNews([tiedOther, newest, tiedImportant], [], rankTodayNews).map((item) => item.id), ["newest", "important", "other"]);

// Clamp the rail to five while leaving the input array and article objects untouched.
const many = Array.from({ length: 8 }, (_, index) => article(`many-${index}`, index));
const before = structuredClone(many);
const selected = selectHotNews(many, [], rankTodayNews);
assert.equal(selected.length, 5);
assert.deepEqual(many, before);
assert.ok(selected.every((item) => many.includes(item)));

// Adjacent main-feed items are excluded by any stable identity, without mutation.
const candidate = article("candidate", 1, { originalUrl: "https://example.org/path?utm_source=feed#top" });
const sameCanonical = article("canonical-copy", 2, { originalUrl: "https://example.org/path#other" });
const sameTitle = article("title-copy", 3, { title: candidate.title.toUpperCase() });
const sameHash = article("hash-copy", 4, { hash: "duplicate-hash" });
const excludedHash = article("excluded", 30, { hash: "duplicate-hash" });
const unique = article("unique", 5);
const input = [candidate, sameCanonical, sameTitle, sameHash, unique];
const excludedSnapshot = structuredClone([excludedHash]);
assert.deepEqual(selectHotNews(input, [excludedHash]).map((item) => item.id), ["candidate", "unique"]);
assert.deepEqual(input.map((item) => item.id), ["candidate", "canonical-copy", "title-copy", "hash-copy", "unique"]);
assert.deepEqual([excludedHash], excludedSnapshot);

// Invalid, incomplete, unsafe, and duplicate cards never enter the hot rail.
assert.deepEqual(selectHotNews([
  null,
  article("missing", 1, { title: null }),
  article("bad-date", 1, { publishedAt: "not-a-date" }),
  article("no-date", 1, { publishedAt: undefined }),
  article("unsafe", 1, { originalUrl: "javascript:alert(1)" }),
  article("feed", 1, { originalUrl: "https://example.org/rss.xml" }),
  article("valid", 2),
], []).map((item) => item.id), ["valid"]);
const safeInput = article("safe-after-null", 1);
assert.deepEqual(selectHotNews([null, undefined, safeInput], [null], rankTodayNews), [safeInput]);
assert.deepEqual(selectHotNews(null, [null], rankTodayNews), [], "non-array inputs safely return an empty selection");

// Canonical URL removes fragments and tracking parameters; URL/title/hash duplicates collapse.
const canonicalA = article("canonical-a", 1, { originalUrl: "https://Example.org/news?id=2&utm_campaign=x#part" });
const canonicalB = article("canonical-b", 2, { originalUrl: "https://example.org/news?utm_campaign=y&id=2" });
const hashA = article("hash-a", 3, { hash: "same" });
const hashB = article("hash-b", 4, { hash: "same", originalUrl: "https://example.org/other" });
const titleA = article("title-a", 5, { title: "Спільна новина" });
const titleB = article("title-b", 6, { title: "Спільна новина!", originalUrl: "https://example.org/third" });
assert.deepEqual(selectHotNews([canonicalA, canonicalB, hashA, hashB, titleA, titleB]).map((item) => item.id), ["canonical-a", "hash-a", "title-a"]);

// Small DOM shim lets the production renderer exercise source/time/link formatting.
class Element {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.hidden = false;
    this.className = "";
    this.textContent = "";
  }
  replaceChildren(...children) { this.children = children; children.forEach((child) => { child.parentElement = this; }); }
  append(child) { this.children.push(child); child.parentElement = this; }
  get firstElementChild() { return this.children[0]; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener() {}
  querySelector(selector) { return selector === "[data-news-hot-hint]" ? this.hint || null : null; }
  querySelectorAll(selector) {
    if (selector !== "[data-news-hot-link]") return [];
    return this.children.flatMap((child) => [child, ...(child.querySelectorAll?.(selector) || [])]).filter((child) => child.dataset.newsHotLink !== undefined);
  }
  closest(selector) { return selector === "[data-news-hot-link]" && this.dataset.newsHotLink !== undefined ? this : null; }
  contains(child) { return this.children.includes(child) || this.children.some((item) => item.contains?.(child)); }
  focus() { document.activeElement = this; }
  get childNodes() { return this.children; }
}
globalThis.document = { activeElement: null, createElement: (tag) => new Element(tag) };
globalThis.window = {};

const root = new Element("section");
root.dataset = {};
root.hint = new Element("span");
const rail = new Element("div");
const fallbackSource = article("fallback", 7, { source: undefined });
renderHotNews(root, rail, [fallbackSource], [], "uk", rankTodayNews);
assert.equal(root.hidden, false);
assert.equal(rail.children.length, 1);
const fallbackLink = rail.children[0].children[0];
assert.equal(fallbackLink.href, "https://example.org/story/fallback");
assert.equal(fallbackLink.target, "_blank");
assert.equal(fallbackLink.rel, "noopener noreferrer");
assert.equal(fallbackLink.children[1].tagName, "h3");
assert.equal(fallbackLink.children[1].className, "news-hot__headline");
assert.equal(fallbackLink.children[2].tagName, "footer");
assert.equal(fallbackLink.children[2].children[0].textContent, "Джерело");
assert.ok(fallbackLink.children[0].textContent, "valid dates render a publication time");

document.activeElement = fallbackLink;
rail.scrollLeft = 24;
renderHotNews(root, rail, [article("fallback", 4, { title: "Оновлений заголовок", source: "PAP" })], [], "uk", rankTodayNews);
assert.equal(document.activeElement.dataset.newsHotKey, "https://example.org/story/fallback");
assert.equal(document.activeElement.children[1].textContent, "Оновлений заголовок");
assert.equal(rail.scrollLeft, 24, "rerender preserves the active card and horizontal scroll position");

// Warsaw absolute-time formatting is stable regardless of the host timezone.
const oldNow = Date.now;
const fixedNow = Date.parse("2026-10-09T12:00:00Z");
Date.now = () => fixedNow;
const oldStory = article("old", 0, { publishedAt: "2026-10-08T12:00:00Z" });
const formatted = [];
for (const zone of ["Europe/Warsaw", "America/Los_Angeles"]) {
  process.env.TZ = zone;
  const localRoot = new Element("section");
  localRoot.dataset = {};
  const localRail = new Element("div");
  renderHotNews(localRoot, localRail, [oldStory], [], "uk", rankTodayNews);
  formatted.push(localRail.children[0].children[0].children[0].textContent);
}
assert.equal(formatted[0], formatted[1], "old story dates use Warsaw timezone");
assert.match(formatted[0], /8 жовт/i);

for (const language of ["uk", "pl", "ru"]) {
  const localizedRoot = new Element("section");
  localizedRoot.dataset = {};
  const localizedRail = new Element("div");
  renderHotNews(localizedRoot, localizedRail, [article(`localized-${language}`, 7, { source: undefined })], [], language, rankTodayNews);
  const [time, , footer] = localizedRail.children[0].children[0].children;
  assert.ok(time.textContent, `${language} publication time is localized`);
  assert.notEqual(footer.children[0].textContent, "hotSourceFallback", `${language} source fallback is translated`);
}

// A slightly future timestamp should not be described as a negative age in the past.
const future = article("future", 0, { publishedAt: new Date(fixedNow + 3 * 60_000).toISOString() });
const futureRoot = new Element("section");
futureRoot.dataset = {};
const futureRail = new Element("div");
renderHotNews(futureRoot, futureRail, [future], [], "uk", rankTodayNews);
assert.doesNotMatch(futureRail.children[0].children[0].children[0].textContent, /тому|ago|temu/i);
Date.now = oldNow;

console.log("Fresh news selection, deduplication, safe rendering, localization dates and fallback source: PASS");
