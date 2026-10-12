<?php
declare(strict_types=1);

function events_lower(string $value): string {
    return function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
}

function events_slice(string $value, int $length): string {
    return function_exists('mb_substr') ? mb_substr($value, 0, $length, 'UTF-8') : substr($value, 0, $length);
}

function events_text(mixed $value, int $max = 500): ?string {
    if (!is_string($value) && !is_numeric($value)) return null;
    $value = trim(preg_replace('/\s+/u', ' ', strip_tags((string)$value)) ?? '');
    if ($value === '' || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', $value)) return null;
    return events_slice($value, $max);
}

function events_safe_url(mixed $value, ?array $allowedHosts = null): ?string {
    if (!is_string($value) || strlen($value) > 2048) return null;
    $parts = parse_url(trim($value));
    if (!is_array($parts) || strtolower((string)($parts['scheme'] ?? '')) !== 'https' || empty($parts['host'])) return null;
    if (isset($parts['user']) || isset($parts['pass'])) return null;
    $host = strtolower((string)$parts['host']);
    if ($allowedHosts !== null && !in_array($host, $allowedHosts, true)) return null;
    return filter_var($value, FILTER_VALIDATE_URL) ? $value : null;
}

function events_ticketmaster_url(mixed $value): ?string {
    $url = events_safe_url($value);
    if ($url === null) return null;
    $host = strtolower((string)parse_url($url, PHP_URL_HOST));
    return preg_match('/^(?:www\.)?ticketmaster\.(?:com|pl|de|nl|fr|es|it|ie|be|at|fi|se|no|dk|ch|cz|hu|sk|ro|pt|gr|lt|lv|ee|co\.uk)$/', $host) ? $url : null;
}

function events_city_slug(string $name): string {
    $name = trim($name);
    $name = strtr($name, ['Ł'=>'L','Ą'=>'A','Ę'=>'E','Ó'=>'O','Ś'=>'S','Ć'=>'C','Ń'=>'N','Ż'=>'Z','Ź'=>'Z','ł'=>'l','ą'=>'a','ę'=>'e','ó'=>'o','ś'=>'s','ć'=>'c','ń'=>'n','ż'=>'z','ź'=>'z']);
    $name = events_lower($name);
    $normalized = $name;
    $normalized = preg_replace('/[^a-z0-9]+/', '-', $normalized) ?? '';
    $normalized = trim($normalized, '-');
    $aliases = [
        'lodz'=>'lodz', 'warsaw'=>'warszawa', 'warszawa'=>'warszawa', 'krakow'=>'krakow', 'wroclaw'=>'wroclaw',
        'poznan'=>'poznan', 'gdansk'=>'gdansk',
    ];
    return $aliases[$normalized] ?? ($normalized !== '' ? $normalized : 'other');
}

function events_city_name(string $slug, string $fallback = ''): string {
    $names = ['lodz'=>'Łódź','warszawa'=>'Warszawa','krakow'=>'Kraków','wroclaw'=>'Wrocław','poznan'=>'Poznań','gdansk'=>'Gdańsk'];
    return $names[$slug] ?? (events_text($fallback, 120) ?? 'Інше місто');
}

function events_category(array $classifications, string $title = ''): string {
    $parts = [events_lower($title)];
    foreach ($classifications as $classification) {
        if (!is_array($classification)) continue;
        foreach (['segment','genre','subGenre','type','subType'] as $field) {
            if (isset($classification[$field]['name'])) $parts[] = events_lower((string)$classification[$field]['name']);
        }
    }
    $text = implode(' ', $parts);
    if (preg_match('/festival|festyn|festiwal/u', $text)) return 'festivals';
    if (preg_match('/comedy|comedian|stand[\s-]?up|kabaret/u', $text)) return 'comedy';
    if (preg_match('/family|dzieci|kids|children/u', $text)) return 'family';
    if (preg_match('/music|concert|muzyk|koncert/u', $text)) return 'music';
    if (preg_match('/arts|theatre|theater|show|spektakl|teatr|kultura/u', $text)) return 'shows';
    return 'other';
}

function events_parse_datetime(mixed $value, ?string $timeZone = null, mixed $date = null, mixed $time = null): ?DateTimeImmutable {
    try {
        if (is_string($value) && trim($value) !== '') {
            $value = trim($value);
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value) && is_string($time) && trim($time) !== '') $value .= ' ' . trim($time);
            $parsed = new DateTimeImmutable($value, new DateTimeZone($timeZone ?: 'Europe/Warsaw'));
            return $parsed->setTimezone(new DateTimeZone('Europe/Warsaw'));
        }
        if (is_string($date) && trim($date) !== '') {
            $local = trim($date) . (is_string($time) && trim($time) !== '' ? ' ' . trim($time) : ' 00:00:00');
            return (new DateTimeImmutable($local, new DateTimeZone($timeZone ?: 'Europe/Warsaw')))->setTimezone(new DateTimeZone('Europe/Warsaw'));
        }
    } catch (Throwable) { return null; }
    return null;
}

function events_event_record(array $values): ?array {
    $title = events_text($values['title'] ?? null, 300);
    $start = $values['start'] ?? null;
    if ($title === null || !$start instanceof DateTimeImmutable) return null;
    $cityRaw = events_text($values['city'] ?? null, 120) ?? '';
    $city = events_city_slug($cityRaw);
    $venue = events_text($values['venue'] ?? null, 200);
    $address = events_text($values['address'] ?? null, 250);
    $externalId = events_text($values['externalId'] ?? null, 160);
    $provider = $values['provider'] ?? '';
    if (!in_array($provider, ['ticketmaster','poznan'], true)) return null;
    $sourceName = $provider === 'ticketmaster' ? 'Ticketmaster' : 'Poznań.pl';
    $sourceType = $provider === 'ticketmaster' ? 'official-ticketing-api' : 'official-city-feed';
    $sourceUrl = $provider === 'poznan'
        ? events_safe_url($values['sourceUrl'] ?? null, ['www.poznan.pl','poznan.pl'])
        : events_ticketmaster_url($values['sourceUrl'] ?? null);
    $ticketUrl = $provider === 'ticketmaster' ? events_ticketmaster_url($values['ticketUrl'] ?? null) : null;
    $imageUrl = events_safe_url($values['imageUrl'] ?? null);
    $idSeed = $externalId ?? hash('sha256', events_lower($title) . '|' . $start->format('Y-m-d') . '|' . $city . '|' . events_lower((string)$venue));
    $id = $provider . ':' . $idSeed;
    $source = ['provider'=>$provider,'sourceName'=>$sourceName,'sourceType'=>$sourceType,'sourceUrl'=>$sourceUrl];
    return [
        'id'=>$id,'externalId'=>$externalId,'title'=>$title,'category'=>$values['category'] ?? 'other',
        'startAt'=>$start->format(DATE_ATOM),'endAt'=>($values['end'] ?? null) instanceof DateTimeImmutable ? $values['end']->format(DATE_ATOM) : null,
        'timeKnown'=>($values['timeKnown'] ?? true) === true,
        'city'=>$city,'cityName'=>events_city_name($city,$cityRaw),'venue'=>$venue,'address'=>$address,
        'imageUrl'=>$imageUrl,'ticketUrl'=>$ticketUrl,'sourceUrl'=>$sourceUrl,'sourceName'=>$sourceName,
        'sourceType'=>$sourceType,'provider'=>$provider,'status'=>'upcoming','fetchedAt'=>gmdate(DATE_ATOM),
        'sources'=>[$source],
    ];
}

function events_normalize_ticketmaster(array $event): ?array {
    $title = events_text($event['name'] ?? null, 300);
    $dates = is_array($event['dates'] ?? null) ? $event['dates'] : [];
    $startData = is_array($dates['start'] ?? null) ? $dates['start'] : [];
    $tz = is_string($dates['timezone'] ?? null) ? $dates['timezone'] : 'Europe/Warsaw';
    $start = events_parse_datetime($startData['dateTime'] ?? null, $tz, $startData['localDate'] ?? null, $startData['localTime'] ?? null);
    if ($title === null || $start === null) return null;
    $endData = is_array($dates['end'] ?? null) ? $dates['end'] : [];
    $end = events_parse_datetime($endData['dateTime'] ?? null, $tz, $endData['localDate'] ?? null, $endData['localTime'] ?? null);
    $venue = null; $city = null; $address = null;
    $embedded = is_array($event['_embedded'] ?? null) ? $event['_embedded'] : [];
    foreach (($embedded['venues'] ?? []) as $candidate) {
        if (!is_array($candidate)) continue;
        $venue = events_text($candidate['name'] ?? null, 200);
        $city = events_text($candidate['city']['name'] ?? null, 120);
        $address = events_text($candidate['address']['line1'] ?? null, 250);
        if ($address === null && isset($candidate['location']['latitude'], $candidate['location']['longitude'])) $address = null;
        break;
    }
    $classifications = is_array($event['classifications'] ?? null) ? $event['classifications'] : [];
    $images = is_array($event['images'] ?? null) ? $event['images'] : [];
    usort($images, static fn($a,$b)=>(int)($b['width'] ?? 0) <=> (int)($a['width'] ?? 0));
    $image = null;
    foreach ($images as $candidate) {
        $image = events_safe_url($candidate['url'] ?? null);
        if ($image !== null) break;
    }
    $externalId = events_text($event['id'] ?? null, 160);
    if ($externalId === null) return null;
    return events_event_record([
        'provider'=>'ticketmaster','externalId'=>$externalId,'title'=>$title,'start'=>$start,'end'=>$end,
        'city'=>$city,'venue'=>$venue,'address'=>$address,'category'=>events_category($classifications,$title),
        'timeKnown'=>preg_match('/T\d{2}:\d{2}/', (string)($startData['dateTime'] ?? '')) === 1 || (is_string($startData['localTime'] ?? null) && preg_match('/^\d{2}:\d{2}/', $startData['localTime']) === 1),
        'ticketUrl'=>$event['url'] ?? null,'sourceUrl'=>$event['url'] ?? null,'imageUrl'=>$image,
    ]);
}

/** Parse the verified official Poznań "Wydarzenia w Poznaniu" RSS 2.0 feed. */
function events_parse_poznan_rss(string $xml): array {
    if ($xml === '' || strlen($xml) > 4 * 1024 * 1024 || preg_match('/<!DOCTYPE|<!ENTITY/i', $xml)) throw new RuntimeException('Unsafe or oversized Poznań RSS');
    $previous = libxml_use_internal_errors(true);
    try {
        $doc = new DOMDocument();
        if (!$doc->loadXML($xml, LIBXML_NONET | LIBXML_NOBLANKS | LIBXML_COMPACT)) throw new RuntimeException('Invalid Poznań RSS');
        if (strtolower($doc->documentElement?->localName ?? '') !== 'rss') throw new RuntimeException('Unexpected Poznań feed format');
        $xpath = new DOMXPath($doc);
        $nodes = $xpath->query('//*[translate(local-name(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")="item"]');
        if (!$nodes) return [];
        $events=[];
        foreach ($nodes as $node) {
            if (!$node instanceof DOMElement) continue;
            $fields=[];
            foreach ($node->childNodes as $child) {
                if (!$child instanceof DOMElement) continue;
                $name=events_lower($child->localName);
                if (in_array($name,['title','link','guid','pubdate'],true)) $fields[$name]=events_text($child->textContent,2048);
            }
            $title=$fields['title'] ?? null;
            $link=events_safe_url($fields['link'] ?? null,['www.poznan.pl','poznan.pl']);
            $eventDate=$fields['pubdate'] ?? null;
            $start=events_parse_datetime($eventDate,'Europe/Warsaw');
            if ($title===null || $link===null || $start===null) continue;
            $externalId=$fields['guid'] ?? null;
            if ($externalId===null) $externalId=hash('sha256',events_lower($title).'|'.$start->format('Y-m-d').'|poznan');
            $event=events_event_record([
                'provider'=>'poznan','externalId'=>$externalId,'title'=>$title,'start'=>$start,
                'city'=>'Poznań','category'=>events_category([], $title),'sourceUrl'=>$link,'timeKnown'=>false,
            ]);
            if ($event!==null) $events[]=$event;
        }
        return $events;
    } finally {
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
    }
}

function events_dedupe(array $events): array {
    usort($events, static fn($a,$b)=>strcmp($a['startAt'],$b['startAt']));
    $result = [];
    foreach ($events as $event) {
        $eventDay = substr($event['startAt'],0,10);
        $title = events_lower(preg_replace('/[^\pL\pN]+/u',' ',(string)$event['title']) ?? '');
        $city = $event['city'] ?? '';
        $duplicateIndex = null;
        foreach ($result as $index => $existing) {
            if (substr($existing['startAt'],0,10) !== $eventDay || ($existing['city'] ?? '') !== $city) continue;
            $otherTitle = events_lower(preg_replace('/[^\pL\pN]+/u',' ',(string)$existing['title']) ?? '');
            similar_text($title, $otherTitle, $similarity);
            if ($title === $otherTitle || $similarity >= 84.0) { $duplicateIndex = $index; break; }
        }
        if ($duplicateIndex === null) { $result[] = $event; continue; }
        $existing = $result[$duplicateIndex];
        $sources = array_merge($existing['sources'] ?? [], $event['sources'] ?? []);
        $seen=[]; $sources=array_values(array_filter($sources,static function($source)use(&$seen){$key=($source['provider']??'').'|'.($source['sourceUrl']??'');if(isset($seen[$key]))return false;$seen[$key]=true;return true;}));
        // Ticketmaster is the preferred ticket CTA when two providers describe one event.
        if ($event['provider'] === 'ticketmaster' && $existing['provider'] !== 'ticketmaster') $existing = $event;
        $existing['sources'] = $sources;
        $result[$duplicateIndex] = $existing;
    }
    usort($result, static fn($a,$b)=>strcmp($a['startAt'],$b['startAt']));
    return $result;
}
