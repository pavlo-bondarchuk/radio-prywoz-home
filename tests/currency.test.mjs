import assert from 'node:assert/strict';
import { convertAmount, formatAmount, formatRate, formatUpdatedAt, parseAmount } from '../assets/scripts/currency/currency-format.js';
import { convertTriplet } from '../assets/scripts/currency/currency-converter.js';
import { calculateStats, makeSeries } from '../assets/scripts/currency/currency-chart.js';
import { translations, t } from '../assets/scripts/currency/currency-i18n.js';
import { clearCurrencyRequestsForTests, fetchHistory, fetchRates } from '../assets/scripts/currency/currency-api.js';

const units = { UAH: 1, PLN: 10.9123, USD: 39.91 };
assert.deepEqual(convertTriplet(1000, 'PLN', units), {
  PLN: 1000,
  USD: 1000 * units.PLN / units.USD,
  UAH: 1000 * units.PLN,
});
const fromUsd = convertTriplet(100, 'USD', units);
assert.equal(fromUsd.USD, 100);
assert.ok(Math.abs(fromUsd.UAH - 3991) < 1e-9);
assert.ok(Math.abs(fromUsd.PLN - 100 * units.USD / units.PLN) < 1e-10);
assert.equal(convertTriplet(0, 'UAH', units).PLN, 0);
assert.equal(convertTriplet(null, 'UAH', units).PLN, null);
assert.equal(convertAmount(1, 'UAH', 'PLN', units), 1 / units.PLN);
assert.equal(convertAmount(Infinity, 'PLN', 'UAH', units), null);

for (const [input, expected] of [
  ['1 000,50', 1000.5], ['1\u00a0000,50', 1000.5], ['1,000.50', 1000.5],
  ['1000', 1000], ['0', 0], ['', null], ['   ', null], ['1,', 1], ['1.234,56 PLN', 1234.56],
  ['1e3', null], ['-1', null], ['Infinity', null], ['1,2,3', 12.3],
]) assert.equal(parseAmount(input), expected, `parseAmount(${JSON.stringify(input)})`);
assert.match(formatAmount(1000, 'PLN', 'uk'), /1\s?000,00/);
assert.equal(formatAmount(NaN), '—');
assert.equal(formatRate(10.91234, 'uk'), '10,9123');
assert.equal(formatUpdatedAt('invalid', 'uk'), '—');
assert.equal(formatUpdatedAt('2026-10-05T09:40:00Z', 'uk'), '11:40');

const points = [{ date: '2026-09-01', rate: 10 }, { date: '2026-09-02', rate: 11 }, { date: '2026-09-03', rate: 10.5 }];
assert.deepEqual(calculateStats(points), { current: 10.5, change: 0.5, percent: 5, min: 10, max: 11 });
assert.equal(calculateStats([]), null);
assert.equal(calculateStats([{ rate: 0 }, { rate: 0 }]).percent, null);
assert.deepEqual(makeSeries({ data: [...points, { date: 'bad', rate: 4 }, { date: '2026-09-04', rate: 'NaN' }] }, 'USD-PLN'), points);

const requiredKeys = ['breadcrumbs','title','intro','updated','sourceText','error','historyError','retry','converter','quick','currentRates','history','popular','period','pair','p7','p30','p90','p180','p365','historyEmpty','chart','hover','table','dateCol','rateCol','now','change','minimum','maximum','disclaimer'];
for (const lang of ['uk', 'pl', 'ru']) {
  assert.ok(translations[lang], `translation set ${lang}`);
  for (const key of requiredKeys) assert.notEqual(t(key, lang), key, `${lang} translation ${key}`);
}

// Endpoint client contract: request deduplication, normalized timestamp and invalid-response rejection.
globalThis.document = { dispatchEvent() {} };
let responses = [];
let requestCount = 0;
globalThis.fetch = async url => {
  requestCount++;
  const response = responses.shift();
  return { ok: true, json: async () => typeof response === 'function' ? response(String(url)) : response };
};
const rates = { source: 'bank.gov.ua', updated_at: '2026-10-05T12:40:00+03:00', date: '2026-10-05', units, rates: { PLN_UAH: units.PLN, USD_UAH: units.USD, PLN_USD: units.PLN / units.USD, USD_PLN: units.USD / units.PLN, UAH_PLN: 1 / units.PLN, UAH_USD: 1 / units.USD }, stale: false };
clearCurrencyRequestsForTests(); responses = [rates];
const [r1, r2] = await Promise.all([fetchRates(), fetchRates()]);
assert.equal(requestCount, 1);
assert.equal(r1, r2);
assert.equal(r1.updated_at, rates.updated_at);
assert.equal(r1.rates.PLN_USD, rates.units.PLN / rates.units.USD);

clearCurrencyRequestsForTests(); requestCount = 0; responses = [() => ({ ...rates, updated_at: '12:40' })];
await assert.rejects(fetchRates(), /Invalid currency rates/);
assert.equal(requestCount, 1);

clearCurrencyRequestsForTests(); requestCount = 0;
const history = { source: 'bank.gov.ua', pair: 'PLN-UAH', period: '7d', updated_at: rates.updated_at, start: '2026-08-28', end: '2026-09-03', data: points };
responses = [history];
const [h1, h2] = await Promise.all([fetchHistory('PLN-UAH', '7d'), fetchHistory('PLN-UAH', '7d')]);
assert.equal(requestCount, 1);
assert.equal(h1, h2);
assert.equal(h1.data.length, 3);

clearCurrencyRequestsForTests(); requestCount = 0;
responses = [{ ...history, data: [{ date: '2026-09-02', rate: 10 }, { date: '2026-09-01', rate: 11 }] }];
await assert.rejects(fetchHistory('PLN-UAH', '7d'), /Invalid currency history/);
assert.equal(requestCount, 1);

console.log('Currency math, parsing, formatting, period statistics, translations and API contracts: PASS');
