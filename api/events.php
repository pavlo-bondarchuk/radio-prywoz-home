<?php
declare(strict_types=1);

require_once __DIR__ . '/events/events-normalizer.php';
require_once __DIR__ . '/events/events-cache.php';
require_once __DIR__ . '/events/ticketmaster-provider.php';
require_once __DIR__ . '/events/poznan-provider.php';

const EVENTS_CITIES = ['all','lodz','warszawa','krakow','wroclaw','poznan','gdansk'];
const EVENTS_CATEGORIES = ['all','music','comedy','festivals','shows','family','other'];

function events_iso_date(string $value): ?DateTimeImmutable {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) return null;
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value, new DateTimeZone('Europe/Warsaw'));
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || ($errors !== false && ($errors['warning_count'] || $errors['error_count'])) || $date->format('Y-m-d') !== $value) return null;
    return $date;
}

function events_query_options(array $query, ?int $now = null): array {
    $zone = new DateTimeZone('Europe/Warsaw');
    $localNow = (new DateTimeImmutable('@' . ($now ?? time())))->setTimezone($zone);
    $today = $localNow->setTime(0,0,0);
    $fromText = $query['from'] ?? $today->format('Y-m-d');
    $toText = $query['to'] ?? $today->modify('+6 months')->format('Y-m-d');
    if (!is_string($fromText) || !is_string($toText)) throw new InvalidArgumentException('Invalid date range');
    $from = events_iso_date($fromText);
    $to = events_iso_date($toText);
    $maxDate = $today->modify('+6 months');
    if ($from === null || $to === null || $from < $today || $to < $from || $from > $maxDate || $to > $maxDate) throw new InvalidArgumentException('Invalid date range');
    $city = $query['city'] ?? 'all';
    $category = $query['category'] ?? 'all';
    if (!is_string($city) || !in_array($city, EVENTS_CITIES, true)) throw new InvalidArgumentException('Invalid city');
    if (!is_string($category) || !in_array($category, EVENTS_CATEGORIES, true)) throw new InvalidArgumentException('Invalid category');
    $limitText = $query['limit'] ?? '50';
    if (!is_string($limitText) || !preg_match('/^\d{1,3}$/', $limitText)) throw new InvalidArgumentException('Invalid limit');
    $limit = (int)$limitText;
    if ($limit < 1 || $limit > 100) throw new InvalidArgumentException('Invalid limit');
    return ['from'=>$from,'to'=>$to,'city'=>$city,'category'=>$category,'limit'=>$limit,'now'=>$localNow];
}

function events_utc_bounds(DateTimeImmutable $from, DateTimeImmutable $to): array {
    $zone = new DateTimeZone('Europe/Warsaw');
    $start = $from->setTimezone($zone)->setTime(0,0,0)->setTimezone(new DateTimeZone('UTC'));
    $end = $to->setTimezone($zone)->modify('+1 day')->setTime(0,0,0)->modify('-1 second')->setTimezone(new DateTimeZone('UTC'));
    return [$start->format('Y-m-d\TH:i:s\Z'),$end->format('Y-m-d\TH:i:s\Z')];
}

function events_merge_response(string $cacheDir, array $query, ?string $ticketmasterKey = null, ?callable $ticketmasterFetch = null, ?callable $poznanFetch = null, ?int $now = null): array {
    $options = events_query_options($query, $now);
    [$utcFrom,$utcTo] = events_utc_bounds($options['from'],$options['to']);
    $dateFrom = $options['from']->format('Y-m-d');
    $dateTo = $options['to']->format('Y-m-d');
    $ticketmasterFetch = $ticketmasterFetch ?? 'events_ticketmaster_fetch';
    $poznanFetch = $poznanFetch ?? 'events_poznan_fetch';
    $providerData = [];
    $providerStatus = [
        'ticketmaster'=>['connected'=>false,'status'=>'not_configured'],
        'poznan'=>['connected'=>false,'status'=>'unavailable'],
    ];
    $cacheUsed = false;
    $updated = [];
    if (is_string($ticketmasterKey) && trim($ticketmasterKey) !== '') {
        $providerStatus['ticketmaster'] = ['connected'=>true,'status'=>'unavailable'];
        try {
            $result = events_cached($cacheDir, 'ticketmaster-v1-' . $dateFrom . '-' . $dateTo, static fn() => $ticketmasterFetch(trim($ticketmasterKey),$utcFrom,$utcTo), 'events_valid_cache', $now);
            $providerData = array_merge($providerData,$result['data']['events']);
            $cacheUsed = $cacheUsed || $result['cached'];
            $updated[] = $result['at'];
            $providerStatus['ticketmaster']['status'] = $result['stale'] ? 'stale' : 'ok';
        } catch (Throwable) {
            $providerStatus['ticketmaster']['status'] = 'unavailable';
        }
    }
    $providerStatus['poznan'] = ['connected'=>false,'status'=>'unavailable'];
    try {
        $result = events_cached($cacheDir, 'poznan-rss-v1', static fn() => $poznanFetch($dateFrom,$dateTo), 'events_valid_cache', $now);
        $providerData = array_merge($providerData,$result['data']['events']);
        $cacheUsed = $cacheUsed || $result['cached'];
        $updated[] = $result['at'];
        $providerStatus['poznan'] = ['connected'=>true,'status'=>$result['stale'] ? 'stale' : 'ok'];
    } catch (Throwable) {
        $providerStatus['poznan'] = ['connected'=>false,'status'=>'unavailable'];
    }
    if (!$updated) return ['status'=>503,'data'=>[
        'updatedAt'=>null,'cached'=>false,'sources'=>[],'events'=>[],
        'attribution'=>['poznan'=>'poznan.pl — Wydarzenia w Poznaniu (RSS), Urząd Miasta Poznania'],
        'providers'=>$providerStatus,'error'=>'Events are temporarily unavailable',
    ]];
    $rangeStart = $options['now']->getTimestamp();
    $firstLocal = max($options['from']->format('Y-m-d'),$options['now']->format('Y-m-d'));
    $lastLocal = $options['to']->format('Y-m-d');
    $events = array_values(array_filter(events_dedupe($providerData), static function(array $event) use ($rangeStart,$firstLocal,$lastLocal,$options): bool {
        try { $eventDate = (new DateTimeImmutable((string)$event['startAt']))->setTimezone(new DateTimeZone('Europe/Warsaw'))->format('Y-m-d'); }
        catch (Throwable) { return false; }
        if ($eventDate < $firstLocal || $eventDate > $lastLocal) return false;
        if (!empty($event['timeKnown'])) {
            $instant = strtotime((string)$event['startAt']);
            if ($instant === false || $instant < $rangeStart) return false;
        }
        if ($options['city'] !== 'all' && ($event['city'] ?? '') !== $options['city']) return false;
        if ($options['category'] !== 'all' && ($event['category'] ?? 'other') !== $options['category']) return false;
        return true;
    }));
    $sources = [];
    foreach ($providerStatus as $provider=>$state) if (in_array($state['status'],['ok','stale'],true)) $sources[]=$provider;
    return ['status'=>200,'data'=>[
        'updatedAt'=>gmdate(DATE_ATOM,max($updated)),'cached'=>$cacheUsed,
        'sources'=>$sources,'events'=>array_slice($events,0,$options['limit']),
        'attribution'=>['poznan'=>'poznan.pl — Wydarzenia w Poznaniu (RSS), Urząd Miasta Poznania'],
        'providers'=>$providerStatus,
    ]];
}

if (defined('EVENTS_LIBRARY_ONLY')) return;
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['error'=>'Method not allowed']);
    exit;
}
try {
    $cacheDir = sys_get_temp_dir() . '/prywoz-events-' . substr(hash('sha256', __DIR__),0,16);
    $key = getenv('TICKETMASTER_API_KEY');
    if ($key === false && isset($_SERVER['TICKETMASTER_API_KEY']) && is_string($_SERVER['TICKETMASTER_API_KEY'])) $key = $_SERVER['TICKETMASTER_API_KEY'];
    $result = events_merge_response($cacheDir,$_GET,is_string($key) ? $key : null);
    http_response_code($result['status']);
    if ($result['status'] === 200) header('Cache-Control: public, max-age=60');
    else header('Retry-After: 60');
    echo json_encode($result['data'],JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
} catch (InvalidArgumentException) {
    http_response_code(400);
    echo json_encode(['error'=>'Invalid events query']);
} catch (Throwable) {
    http_response_code(503);
    header('Retry-After: 60');
    echo json_encode(['error'=>'Events are temporarily unavailable']);
}
