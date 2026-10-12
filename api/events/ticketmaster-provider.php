<?php
declare(strict_types=1);

const EVENTS_TICKETMASTER_ROOT = 'https://app.ticketmaster.com/discovery/v2';

function events_http_get(string $url, string $accept, int $maxBytes = 4_194_304): array {
    $parts = parse_url($url);
    $host = strtolower((string)($parts['host'] ?? ''));
    if (($parts['scheme'] ?? '') !== 'https' || !in_array($host, ['app.ticketmaster.com','www.poznan.pl'], true)) throw new RuntimeException('Invalid upstream host');
    if (!function_exists('curl_init')) throw new RuntimeException('Secure HTTP client unavailable');
    $body = '';
    $overflow = false;
    $curl = curl_init($url);
    if ($curl === false) throw new RuntimeException('Upstream request unavailable');
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER=>false,
        CURLOPT_FOLLOWLOCATION=>false,
        CURLOPT_CONNECTTIMEOUT=>5,
        CURLOPT_TIMEOUT=>12,
        CURLOPT_SSL_VERIFYPEER=>true,
        CURLOPT_SSL_VERIFYHOST=>2,
        CURLOPT_HTTPHEADER=>['Accept: '.$accept,'User-Agent: PRYWOZ-Events/1.0'],
        CURLOPT_WRITEFUNCTION=>static function($handle, string $chunk) use (&$body,&$overflow,$maxBytes): int {
            if (strlen($body) + strlen($chunk) > $maxBytes) { $overflow = true; return 0; }
            $body .= $chunk;
            return strlen($chunk);
        },
    ]);
    $ok = curl_exec($curl);
    $status = (int)curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $contentType = (string)curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
    curl_close($curl);
    if ($overflow) throw new RuntimeException('Upstream response too large');
    if ($ok === false || $status < 200 || $status >= 300) throw new RuntimeException('Upstream request failed');
    if (str_contains($accept, 'application/json') && !preg_match('~\bapplication/json\b~i', $contentType)) throw new RuntimeException('Unexpected upstream content type');
    if (str_contains($accept, 'application/rss+xml') && !preg_match('~\b(?:application/rss\+xml|application/xml|text/xml)\b~i', $contentType)) throw new RuntimeException('Unexpected upstream content type');
    return ['body'=>$body,'status'=>$status,'contentType'=>$contentType];
}

function events_ticketmaster_fetch(string $apiKey, string $from, string $to): array {
    $query = http_build_query([
        'apikey'=>$apiKey,'countryCode'=>'PL','startDateTime'=>$from,'endDateTime'=>$to,
        'sort'=>'date,asc','size'=>200,'page'=>0,
    ], '', '&', PHP_QUERY_RFC3986);
    $response = events_http_get(EVENTS_TICKETMASTER_ROOT . '/events.json?' . $query, 'application/json');
    $payload = json_decode($response['body'], true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($payload)) throw new RuntimeException('Invalid Ticketmaster response');
    $records = $payload['_embedded']['events'] ?? [];
    if (!is_array($records)) throw new RuntimeException('Invalid Ticketmaster event list');
    $events=[];
    foreach ($records as $record) {
        if (!is_array($record)) continue;
        $event=events_normalize_ticketmaster($record);
        if ($event !== null) $events[]=$event;
    }
    return ['events'=>$events];
}
