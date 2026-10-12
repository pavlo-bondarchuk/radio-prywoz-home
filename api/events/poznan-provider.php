<?php
declare(strict_types=1);

// The Poznań feeds page links to /mim/public/feeds/rss.xml?name=events; that
// URL redirects to this canonical endpoint, which was verified as RSS 2.0.
const EVENTS_POZNAN_RSS_ENDPOINT = 'https://www.poznan.pl/mim/feeds/rss.xml?name=events';

function events_poznan_fetch(string $from, string $to): array {
    // This official feed is not date-range parameterized. The caller applies
    // its validated local date range to normalized events.
    $response = events_http_get(EVENTS_POZNAN_RSS_ENDPOINT, 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8');
    return ['events'=>events_parse_poznan_rss($response['body'])];
}
