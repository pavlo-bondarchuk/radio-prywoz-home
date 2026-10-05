# Weather polish pass

Run regression checks:

```sh
node tests/weather.test.mjs
php tests/weather-cache.php
php -l api/weather.php
```

Verified on 2026-10-05:

- Browser timezone overrides Europe/Warsaw and Europe/Kyiv produced identical current data, hourly slots, metrics, daily forecast and sunrise/sunset from the same cached forecast.
- Unit tests cover Warsaw midnight, spring/fall DST, Unix daily offsets, UV categories, real day/night icons and exact IMGW TERYT 1061.
- Native SVG tested at a 360px viewport (document width 360px, no overflow) and desktop; focus updates the value readout. A table provides the same data.
- UA/PL/RU weather content and light/dark themes checked; external IMGW text and official station name remain explicitly Polish.
- Bad air-quality fixture rendered the bad class and red RGB(213,46,66), not green. Reload restored real GIOS data.
- Mocked source failures reject independently, malformed IMGW is not interpreted as no warnings.
- Cache tests verify no repeated upstream calls during TTL, metadata reuse when measurements refresh, 24h metadata refresh, stale fallback, failure cooldown and concurrent stale reads.
- No JavaScript console errors during normal local checks; no NaN/undefined/Invalid Date in weather content.

Server cache is private under PHP's temporary directory, namespaced by the API directory. Metadata TTL is 86400 seconds; normalized readings/index TTL is 600 seconds. Nonblocking file locks and a 60-second failure cooldown prevent upstream request storms. Stale data is marked and not stored as a fresh browser response.

Radio, header, footer, schedule and SEO are outside this change. Confirmed radio hours remain 10:00–20:00 Europe/Warsaw.
