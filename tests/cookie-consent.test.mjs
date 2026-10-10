import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../assets/scripts/cookie-consent.js", import.meta.url), "utf8");

const boot = (storedChoice, gtag) => {
  const values = new Map(storedChoice ? [["prywoz-analytics-consent", storedChoice]] : []);
  const calls = [];
  const banner = {
    hidden: true,
    listener: null,
    addEventListener(name, callback) {
      assert.equal(name, "click");
      this.listener = callback;
    }
  };
  const context = {
    document: { querySelector: () => banner },
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value)
    },
    window: {
      ...(gtag ? { gtag: (...args) => { calls.push(args); gtag(...args); } } : {})
    }
  };
  vm.runInNewContext(source, context);
  return {
    banner,
    values,
    calls,
    click(choice) {
      const button = { dataset: { consentChoice: choice } };
      banner.listener({ target: { closest: (selector) => selector === "[data-consent-choice]" ? button : null } });
    }
  };
};

for (const choice of ["accepted", "declined"]) {
  const page = boot(null);
  assert.equal(page.banner.hidden, false, "an undecided visitor sees the banner");
  page.click(choice);
  assert.equal(page.values.get("prywoz-analytics-consent"), choice, "choice is persisted");
  assert.equal(page.banner.hidden, true, "choice closes the banner even when gtag is unavailable");
  assert.equal(boot(page.values.get("prywoz-analytics-consent")).banner.hidden, true, "saved choice keeps the banner closed after reload");
}

const brokenAnalytics = boot(null, () => { throw new Error("gtag unavailable"); });
brokenAnalytics.click("accepted");
assert.equal(brokenAnalytics.values.get("prywoz-analytics-consent"), "accepted");
assert.equal(brokenAnalytics.banner.hidden, true, "analytics errors cannot prevent the banner from closing");
assert.equal(brokenAnalytics.calls.length, 1, "consent update is attempted when gtag exists");

const invalidChoice = boot(null);
invalidChoice.click("unknown");
assert.equal(invalidChoice.values.size, 0, "unknown choices are ignored");
assert.equal(invalidChoice.banner.hidden, false);

console.log("Cookie consent choice persistence, close behavior, and safe analytics update: PASS");
