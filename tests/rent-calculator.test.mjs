import test from "node:test";
import assert from "node:assert/strict";
import { calculateRent, RENT_DICTIONARY, serializeRentQuery, hydrateRentQuery } from "../assets/scripts/calculators/rent-calculator.js";
import { parseDecimal, formatPLN } from "../assets/scripts/calculators/calculator-utils.js";

const base = {
  rent: "2500", admin: "650", electricity: "180", gas: "0", water: "100", heating: "0",
  internet: "70", parking: "150", otherMonthly: "0", deposit: "2500", agency: "100",
  agencyMode: "percent", moving: "300", equipment: "200", otherOneTime: "50", people: "2", income: "6000"
};

test("parses Polish-style and dot decimal values without accepting negatives or exponents", () => {
  assert.equal(parseDecimal("6000"), 6000);
  assert.equal(parseDecimal("6000,50"), 6000.5);
  assert.equal(parseDecimal("6000.50"), 6000.5);
  assert.equal(parseDecimal("1 000,00"), 1000);
  assert.equal(parseDecimal("-2"), null);
  assert.equal(parseDecimal("1e3"), null);
  assert.equal(parseDecimal(""), null);
  assert.match(formatPLN(1000, "pl"), /1\s?000/);
  assert.equal(formatPLN(Number.NaN), "—");
});

test("monthly total and per-person cost include each recurring expense", () => {
  const result = calculateRent(base);
  assert.equal(result.monthly, 3650);
  assert.equal(result.perPerson, 1825);
  assert.deepEqual(result.breakdown, { rent: 2500, admin: 650, utilities: 280, internet: 70, parking: 150, other: 0 });
  assert.equal(result.incomeShare, 3650 / 6000 * 100);
});

test("move-in, annual cost and first-year cash keep refundable deposit distinct", () => {
  const result = calculateRent(base);
  assert.equal(result.agencyFee, 2500);
  assert.equal(result.moveIn, 9200);
  assert.equal(result.annual, 46850);
  assert.equal(result.firstYearCash, 49350);
  assert.equal(result.annual - result.firstYearCash, -result.deposit);
});

test("fixed agency commission, zeros, and blank income are handled", () => {
  const values = { ...base, agencyMode: "fixed", agency: "300", income: "", deposit: "0", moving: "0", equipment: "0", otherOneTime: "0" };
  const result = calculateRent(values);
  assert.equal(result.agencyFee, 300);
  assert.equal(result.incomeShare, null);
  assert.equal(result.moveIn, result.monthly + 300);
  assert.equal(result.annual, result.monthly * 12 + 300);
  assert.equal(result.firstYearCash, result.annual);
});

test("invalid inputs and invalid household size fail safely", () => {
  assert.equal(calculateRent({ ...base, water: "-1" }), null);
  assert.equal(calculateRent({ ...base, gas: "" }), null);
  assert.equal(calculateRent({ ...base, people: "0" }), null);
  assert.equal(calculateRent({ ...base, people: "1.5" }), null);
  assert.equal(calculateRent({ ...base, income: "not money" }), null);
  assert.equal(calculateRent({ ...base, agencyMode: "percent", agency: "10001" }), null);
});

test("UI dictionaries provide a complete set of keys in Ukrainian, Polish, and Russian", () => {
  const languages = Object.keys(RENT_DICTIONARY);
  assert.deepEqual(languages.sort(), ["pl", "ru", "uk"]);
  const keys = Object.keys(RENT_DICTIONARY.uk).sort();
  for (const language of languages) {
    assert.deepEqual(Object.keys(RENT_DICTIONARY[language]).sort(), keys);
    for (const [key, value] of Object.entries(RENT_DICTIONARY[language])) {
      assert.equal(typeof value, "string", `${language}.${key} is localized text`);
      assert.notEqual(value, key, `${language}.${key} should not expose a raw key`);
    }
  }
});

test("shared URL omits household income on both serialization and hydration", () => {
  const params = serializeRentQuery({ ...base, income: "6000" });
  assert.equal(params.has("income"), false);
  assert.equal(params.get("rent"), "2500");
  const fields = { rent: { value: "0" }, income: { value: "" }, people: { value: "1" } };
  hydrateRentQuery(new URLSearchParams("rent=3500&income=99999&people=2"), fields);
  assert.equal(fields.rent.value, "3500");
  assert.equal(fields.people.value, "2");
  assert.equal(fields.income.value, "");
});
