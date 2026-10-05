# News RSS source audit

Direct feed checks were run on 2026-10-05. The four configured feeds were all returning HTTP 200 and parseable RSS/XML with article links. This confirms technical availability at the time of the check, not a guarantee of uptime or a blanket content licence.

| Source | Feed URL | Region / category | Existing use | Live check and item fields |
| --- | --- | --- | --- | --- |
| Укрінформ (`ukrinform.ua`) | <https://www.ukrinform.ua/rss/block-lastnews> | Ukraine / society | `home.js` and `inner.js` | 200, RSS, 30 entries; article URLs, dates, descriptions and RSS images present. |
| Радіо Свобода (`radiosvoboda.org`) | <https://www.radiosvoboda.org/api/zrqiteuuir> | Ukraine / society | `home.js` and `inner.js` | 200, XML, 20 entries; article URLs, dates, descriptions and RSS images present. |
| UOKiK (`uokik.gov.pl`) | <https://uokik.gov.pl/feed> | Poland / documents | `home.js` and `inner.js` | 200, XML, 20 entries; article URLs, dates, descriptions and RSS images present. |
| GUS (`stat.gov.pl`) | <https://stat.gov.pl/rss/pl/5438/8.xml> | Poland / society | `home.js` and `inner.js` | 200, XML, 10 entries; article URLs and dates present, no description or image. The newest observed entry was dated 2026-10-01, older than 72 hours at audit time. |

The current source policy keeps the existing four feeds and uses only the original title, a short RSS excerpt, source/date attribution, and the original article URL. It does not authorize full-article storage or RSS-image republication. The `reuseAllowed` field records this configured, limited workflow; it is not a blanket license. UOKiK requires the exact source link and acquisition date for public-sector information. GUS additionally requires identifying the time information was produced and disclosing processing. Radio Svoboda requires an excerpt to be identified as a fragment and its direct link to appear before the excerpt; third-party content needs separate rights clearance. See [Ukrinform editorial code](https://www.ukrinform.ua/info/code.html), [Radio Svoboda rights](https://www.radiosvoboda.org/copyright), [UOKiK reuse terms](https://uokik.gov.pl/public/index.php/bip/wnioskowanie-o-dostep-do-informacji-sektora-publicznego-w-celu-jej-ponownego-wykorzystywania), and [GUS reuse terms](https://bip.stat.gov.pl/kontakt/ponowne-wykorzystywanie-informacji-sektora-publicznego/).

## Other candidate feeds checked

These were not added after the instruction to keep the existing source set. A valid XML response proves only technical feed availability; for publisher-owned feeds below, the checked pages did not establish permission for PRYWOZ's aggregation use.

| Candidate | Probe result | Decision |
| --- | --- | --- |
| Українська правда — <https://www.pravda.com.ua/rss/> | 200, RSS, 20 current entries | Not added. Its published rules prohibit commercial use and require visible attribution and a direct link. |
| BBC News Україна — <https://feeds.bbci.co.uk/ukrainian/rss.xml> | 200, RSS, 18 entries with dates and excerpts | Not added. BBC terms require permission/licensing for business RSS use. |
| УНІАН — <https://rss.unian.net/site/news_ukr.rss> | 200, XML, 100 entries | Not added; no relevant republication permission confirmed. |
| NV — <https://nv.ua/rss/all.xml> | 200, XML, 40 entries | Not added; no relevant republication permission confirmed. |
| 24 Канал — <https://24tv.ua/rss/all.xml> | 200, XML, 50 entries | Not added; no relevant republication permission confirmed. |
| RMF24 — <https://www.rmf24.pl/feed> | 200, RSS, 50 entries | Not added. Feed is published for RSS readers; RMF's PAP notice says third-party PAP material is protected and further dissemination is prohibited. |
| RMF24 Łódź — <https://www.rmf24.pl/regiony/lodz/feed> | 200, RSS, 50 entries | Not added; same reuse limitation as RMF24. |
| Polsat News — <https://www.polsatnews.pl/rss/> | 200, XML content despite `text/html` content type; 50 entries | Not added; no relevant republication permission confirmed. |
| TVN24 — <https://tvn24.pl/najnowsze.xml> | 200, XML, 27 entries | Not added; no relevant republication permission confirmed. |
| Interia — <https://wydarzenia.interia.pl/feed> | 200, XML, 50 entries | Not added; no relevant republication permission confirmed. |
| Gazeta.pl — <https://wiadomosci.gazeta.pl/pub/rss/wiadomosci.htm> | 200, XML, 30 entries | Not added; no relevant republication permission confirmed. |
| Onet — <https://wiadomosci.onet.pl/.feed> | 200, XML, 20 entries | Not added; no relevant republication permission confirmed. |
| ZUS — <https://www.zus.pl/o-zus/aktualnosci/-/asset_publisher/aktualnosci/rss> | 200, XML, 10 entries | Not added. The published reuse policy checked applies to information in the ZUS BIP/central repository, not this `zus.pl` RSS endpoint. |
| Urząd Statystyczny w Łodzi — <https://lodz.stat.gov.pl/rss/pl/780/1.xml> | 200, XML, 10 entries with dates | Not added to avoid treating a second regional GUS feed as another publisher. It shares GUS's public-sector reuse rules. |

Other probes that failed as usable RSS: Espreso returned 403 HTML; the tested RBC-Ukraine URL and `https://lodz.pl/rss` returned 404 HTML; `https://money.pl/rss.xml` returned 404 HTML. The queried `lodz.stat.gov.pl/rss/` URL is an HTML directory, not a feed. An official City of Łódź page links an RSS route, but the direct command-line response during this check was HTML and its parsed view showed only August items, so it was not treated as a working fresh feed.
