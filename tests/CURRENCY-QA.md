# Currency page QA

Run the currency and weather regressions from `radio-privoz-home`:

```sh
node tests/currency.test.mjs
php tests/currency-cache.php
php -l api/currency.php
node tests/weather.test.mjs
php tests/weather-cache.php
php -l api/weather.php
```

The JavaScript checks cover triplet conversion from each base currency, safe decimal/grouped input parsing, zero and empty input, display precision, Warsaw-local timestamp formatting, range statistics, same-page API request deduplication, invalid response rejection, sorted history and Ukrainian/Polish/Russian translation keys.

The PHP checks use deterministic official-shaped NBU fixtures and isolated temporary cache directories. They cover PLN/USD official values, cross-rate math, effective date validation, history normalization and same-date USD/PLN joins, shared history-cache timestamps, invalid pair/period rejection, current and historical cache hits, stale fallback, retained last-success timestamp, retry cooldown, next-day refresh and failure without a cache. They do not call NBU from test runs.

For endpoint smoke checks, start a local PHP server:

```sh
php -S 127.0.0.1:4173 -t .
```

Then request `/api/currency.php?action=rates`, `/api/currency.php?action=history&pair=PLN-UAH&period=7d`, and `/api/currency.php?action=history&pair=USD-PLN&period=30d`. Confirm JSON includes `source: bank.gov.ua`, a valid `updated_at`, and no non-finite values. An unsupported pair or period should return HTTP 400; unavailable data without a valid cache should return HTTP 503 and no numeric placeholder.

Current rates use the NBU `NBUStatService/v1/statdirectory/exchange` endpoint for `PLN` and `USD`; history uses `NBU_Exchange/exchange_site`. The server cache lives under PHP's temporary directory, separated by API directory hash. Its timestamp is stamped after a successful upstream fetch and validation. On upstream errors, valid cached values retain their original timestamp and return `stale: true`. Cross-rates are computed from normalized per-unit UAH rates; USD/PLN historical points use only dates present in both NBU series.

Production PHP was confirmed on 2026-10-05 with an HTTP 200 response from `https://prywoz.fm/api/weather.php?source=air`; the production domain serves Apache/PHP even though the code repository is published from a GitHub Pages-oriented static project. The currency endpoint still needs a production smoke check after it is deployed.

Browser QA completed locally on 2026-10-05: direct page load/reload, all three currency inputs and quick amounts, all three historical pairs across all five periods, chart interaction, rates/header agreement, error/retry and stale-cache states, language/theme switching, and desktop plus responsive viewport checks. In the isolated error/stale run, the stale response kept its original update time (`13:11`) and showed the stale notice. No browser console errors were observed. The test harness on port 4174 used only real captured bank.gov.ua rates for its stale response; the error response was HTTP 503.

Remaining manual checks: real-device mobile accessibility/screen-reader behavior and production endpoint behavior after the PHP API is deployed. Production PHP availability was confirmed via the existing weather API, but that does not establish that the new currency endpoint has been deployed. Automated browser tooling is not installed in the repository.
