<?php
declare(strict_types=1);

const CURRENCY_NBU_CURRENT = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
const CURRENCY_NBU_HISTORY = 'https://bank.gov.ua/NBU_Exchange/exchange_site';
const CURRENCY_SOURCE = 'bank.gov.ua';
const CURRENCY_TTL_RATES = 3600;
const CURRENCY_TTL_HISTORY = 21600;

/** Fetch a JSON array from NBU and reject transport, HTTP, and malformed responses. */
function currency_request_json(string $url): array {
    $context = stream_context_create(['http' => [
        'method' => 'GET',
        'timeout' => 8,
        'ignore_errors' => true,
        'header' => "Accept: application/json\r\nUser-Agent: PRYWOZ-FM-Currency/1.0\r\n",
    ]]);
    $body = @file_get_contents($url, false, $context);
    if ($body === false) throw new RuntimeException('NBU request failed');
    $status = 0;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d{3})/', $header, $match)) $status = (int)$match[1];
    }
    if ($status < 200 || $status >= 300) throw new RuntimeException('NBU returned an unsuccessful status');
    $data = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($data)) throw new RuntimeException('Invalid NBU response');
    return $data;
}

function currency_iso_date(string $value, string $format): ?string {
    $date = DateTimeImmutable::createFromFormat('!' . $format, $value, new DateTimeZone('Europe/Kyiv'));
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || ($errors !== false && ($errors['warning_count'] || $errors['error_count'])) || $date->format($format) !== $value) return null;
    return $date->format('Y-m-d');
}

function currency_local_now(int $timestamp): DateTimeImmutable {
    return (new DateTimeImmutable('@' . $timestamp))->setTimezone(new DateTimeZone('Europe/Kyiv'));
}

/** Private, per-key filesystem cache with atomic writes, stale fallback, locks, and cooldown. */
function currency_cached(string $dir, string $key, int $ttl, callable $load, callable $valid, ?int $now = null): array {
    $useTestClock = $now !== null;
    $now = $now ?? time();
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('Cache unavailable');
    $path = $dir . '/' . hash('sha256', $key);
    $read = static function () use ($path, $valid): ?array {
        $raw = @file_get_contents($path . '.json');
        if ($raw === false) return null;
        try { $value = json_decode($raw, true, 512, JSON_THROW_ON_ERROR); } catch (Throwable) { return null; }
        if (!is_array($value) || !isset($value['at'], $value['data']) || !is_int($value['at']) || !$valid($value['data'])) return null;
        return $value;
    };
    $hit = $read();
    if ($hit && $now >= $hit['at'] && $now - $hit['at'] < $ttl) return ['data'=>$hit['data'],'at'=>$hit['at'],'stale'=>false,'cached'=>true];
    $retryRaw = @file_get_contents($path . '.retry');
    $failureUntil = $retryRaw !== false && preg_match('/^\d+$/', trim($retryRaw)) ? (int)trim($retryRaw) : 0;
    if ($failureUntil > $now) {
        if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'stale'=>true,'cached'=>true];
        throw new RuntimeException('NBU retry cooldown');
    }
    $lock = @fopen($path . '.lock', 'c');
    if (!$lock) throw new RuntimeException('Cache lock unavailable');
    if (!flock($lock, LOCK_EX | LOCK_NB)) {
        fclose($lock);
        if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'stale'=>true,'cached'=>true];
        throw new RuntimeException('Cache refresh in progress');
    }
    try {
        $hit = $read();
        if ($hit && $now >= $hit['at'] && $now - $hit['at'] < $ttl) return ['data'=>$hit['data'],'at'=>$hit['at'],'stale'=>false,'cached'=>true];
        try {
            $data = $load();
            if (!$valid($data)) throw new RuntimeException('Invalid normalized currency data');
            // Stamp only after the upstream load and validation have succeeded.
            $fetchedAt = $useTestClock ? $now : time();
            $encoded = json_encode(['at'=>$fetchedAt,'data'=>$data], JSON_THROW_ON_ERROR | JSON_PRESERVE_ZERO_FRACTION);
            $tmp = tempnam($dir, 'currency-');
            if ($tmp === false) throw new RuntimeException('Cache temp file unavailable');
            if (file_put_contents($tmp, $encoded, LOCK_EX) === false || !@rename($tmp, $path . '.json')) {
                @unlink($tmp);
                throw new RuntimeException('Cache write failed');
            }
            @unlink($path . '.retry');
            return ['data'=>$data,'at'=>$fetchedAt,'stale'=>false,'cached'=>false];
        } catch (Throwable $error) {
            @file_put_contents($path . '.retry', (string)($now + 60), LOCK_EX);
            if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'stale'=>true,'cached'=>true];
            throw $error;
        }
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function currency_valid_rates(mixed $data): bool {
    if (!is_array($data) || ($data['source'] ?? null) !== CURRENCY_SOURCE || ($data['base'] ?? null) !== 'UAH') return false;
    if (!is_string($data['date'] ?? null) || currency_iso_date($data['date'], 'Y-m-d') !== $data['date']) return false;
    if (!isset($data['units']['UAH']) || !is_numeric($data['units']['UAH']) || (float)$data['units']['UAH'] !== 1.0) return false;
    foreach (['PLN','USD'] as $code) if (!isset($data['units'][$code]) || !is_numeric($data['units'][$code]) || !is_finite((float)$data['units'][$code]) || (float)$data['units'][$code] <= 0) return false;
    foreach (['PLN_UAH','USD_UAH','PLN_USD','USD_PLN','UAH_PLN','UAH_USD'] as $key) if (!isset($data['rates'][$key]) || !is_numeric($data['rates'][$key]) || !is_finite((float)$data['rates'][$key]) || (float)$data['rates'][$key] <= 0) return false;
    $pln = (float)$data['units']['PLN']; $usd = (float)$data['units']['USD']; $rates = $data['rates'];
    foreach (['PLN_UAH'=>$pln,'USD_UAH'=>$usd,'PLN_USD'=>$pln/$usd,'USD_PLN'=>$usd/$pln,'UAH_PLN'=>1/$pln,'UAH_USD'=>1/$usd] as $key=>$expected) {
        if (abs((float)$rates[$key] - $expected) > max(1e-12, abs($expected)*1e-12)) return false;
    }
    return is_string($data['updated_at'] ?? null) && strtotime($data['updated_at']) !== false;
}

function currency_current_record(array $records, string $code, string $requestedDate): array {
    foreach ($records as $record) {
        if (!is_array($record) || strtoupper((string)($record['cc'] ?? '')) !== $code) continue;
        $effective = currency_iso_date((string)($record['exchangedate'] ?? ''), 'd.m.Y');
        $rate = $record['rate'] ?? null;
        if ($effective !== $requestedDate || !is_numeric($rate) || !is_finite((float)$rate) || (float)$rate <= 0) continue;
        return ['rate'=>(float)$rate,'date'=>$effective];
    }
    throw new RuntimeException('NBU rate missing or dates do not match');
}

function currency_rates_response(string $cacheDir, ?callable $getJson = null, ?int $now = null): array {
    $getJson = $getJson ?? 'currency_request_json';
    $clockNow = $now ?? time();
    $requestedDate = currency_local_now($clockNow)->format('Y-m-d');
    $valid = static fn($data): bool => currency_valid_rates($data);
    $loader = static function () use ($getJson, $requestedDate, $clockNow): array {
        $dateParam = str_replace('-', '', $requestedDate);
        $plnRecords = $getJson(CURRENCY_NBU_CURRENT . '?json&valcode=PLN&date=' . $dateParam);
        $usdRecords = $getJson(CURRENCY_NBU_CURRENT . '?json&valcode=USD&date=' . $dateParam);
        $pln = currency_current_record($plnRecords, 'PLN', $requestedDate);
        $usd = currency_current_record($usdRecords, 'USD', $requestedDate);
        $plnUah = $pln['rate'];
        $usdUah = $usd['rate'];
        $instant = currency_local_now($clockNow)->format(DATE_ATOM);
        return [
            'source'=>CURRENCY_SOURCE,'updated_at'=>$instant,'date'=>$requestedDate,'base'=>'UAH',
            'units'=>['UAH'=>1.0,'PLN'=>$plnUah,'USD'=>$usdUah],
            'rates'=>[
                'PLN_UAH'=>$plnUah,'USD_UAH'=>$usdUah,
                'PLN_USD'=>$plnUah/$usdUah,'USD_PLN'=>$usdUah/$plnUah,
                'UAH_PLN'=>1.0/$plnUah,'UAH_USD'=>1.0/$usdUah,
            ],
        ];
    };
    $cached = currency_cached($cacheDir, 'currency-rates-v1', CURRENCY_TTL_RATES, $loader, $valid, $now);
    // A still-fresh cache from a previous Kyiv date must not mask today's rates.
    if (($cached['data']['date'] ?? null) !== $requestedDate) {
        // TTL zero forces a refresh while preserving the prior record for outage fallback.
        $cached = currency_cached($cacheDir, 'currency-rates-v1', 0, $loader, $valid, $now);
    }
    $data = $cached['data'];
    // Updated_at is the cache's successful fetch time, independent of the NBU effective date.
    $data['updated_at'] = currency_local_now($cached['at'])->format(DATE_ATOM);
    $data['stale'] = $cached['stale'];
    return $data;
}

function currency_valid_history(mixed $data): bool {
    if (!is_array($data) || ($data['source'] ?? null) !== CURRENCY_SOURCE || !is_array($data['series'] ?? null)) return false;
    if (!is_string($data['start'] ?? null) || !is_string($data['end'] ?? null) || currency_iso_date($data['start'],'Y-m-d') !== $data['start'] || currency_iso_date($data['end'],'Y-m-d') !== $data['end'] || $data['start'] > $data['end']) return false;
    foreach (['PLN','USD'] as $code) {
        if (!isset($data['series'][$code]) || !is_array($data['series'][$code]) || count($data['series'][$code]) < 1) return false;
        $previous = '';
        foreach ($data['series'][$code] as $point) {
            if (!is_array($point) || !is_string($point['date'] ?? null) || currency_iso_date($point['date'],'Y-m-d') !== $point['date'] || $point['date'] < $data['start'] || $point['date'] > $data['end'] || $point['date'] <= $previous || !isset($point['rate']) || !is_numeric($point['rate']) || !is_finite((float)$point['rate']) || (float)$point['rate'] <= 0) return false;
            $previous = $point['date'];
        }
    }
    return is_string($data['updated_at'] ?? null) && strtotime($data['updated_at']) !== false;
}

function currency_historical_rows(array $rows, string $code): array {
    $byDate = [];
    foreach ($rows as $row) {
        if (!is_array($row) || strtoupper((string)($row['cc'] ?? '')) !== $code) continue;
        $date = currency_iso_date((string)($row['exchangedate'] ?? ''), 'd.m.Y');
        $value = $row['rate_per_unit'] ?? null;
        if (!is_numeric($value) || !is_finite((float)$value) || (float)$value <= 0) {
            $rate = $row['rate'] ?? null; $units = $row['units'] ?? null;
            $value = is_numeric($rate) && is_numeric($units) && (float)$units > 0 ? (float)$rate/(float)$units : null;
        }
        if ($date !== null && is_numeric($value) && is_finite((float)$value) && (float)$value > 0) $byDate[$date] = (float)$value;
    }
    return $byDate;
}

function currency_history_response(string $cacheDir, string $pair, string $period, ?callable $getJson = null, ?int $now = null): array {
    $pair = strtoupper($pair);
    $period = strtolower($period);
    $pairMap = ['PLN-UAH'=>['PLN'],'USD-UAH'=>['USD'],'USD-PLN'=>['USD','PLN']];
    $periodDays = ['7d'=>7,'30d'=>30,'90d'=>90,'180d'=>180,'365d'=>365];
    if (!isset($pairMap[$pair])) throw new InvalidArgumentException('Unsupported pair');
    if (!isset($periodDays[$period])) throw new InvalidArgumentException('Unsupported period');
    $getJson = $getJson ?? 'currency_request_json';
    $clockNow = $now ?? time();
    $endDate = currency_local_now($clockNow)->format('Y-m-d');
    $startDate = currency_local_now($clockNow)->modify('-' . ($periodDays[$period]-1) . ' days')->format('Y-m-d');
    $key = 'currency-history-v1-' . $period;
    $load = static function () use ($getJson,$period,$startDate,$endDate,$clockNow): array {
        $startParam = str_replace('-','',$startDate); $endParam = str_replace('-','',$endDate);
        $series = [];
        foreach (['PLN','USD'] as $symbol) {
            $url = CURRENCY_NBU_HISTORY . '?start=' . $startParam . '&end=' . $endParam . '&valcode=' . strtolower($symbol) . '&sort=exchangedate&order=asc&json';
            $rows = currency_historical_rows($getJson($url), $symbol);
            ksort($rows, SORT_STRING);
            $series[$symbol] = array_map(static fn($date,$rate)=>['date'=>$date,'rate'=>$rate], array_keys($rows), array_values($rows));
        }
        if (!$series['PLN'] || !$series['USD']) throw new RuntimeException('No valid NBU history');
        return ['source'=>CURRENCY_SOURCE,'period'=>$period,'updated_at'=>currency_local_now($clockNow)->format(DATE_ATOM),'start'=>$startDate,'end'=>$endDate,'series'=>$series];
    };
    $valid = static fn($data): bool => currency_valid_history($data) && ($data['period'] ?? null) === $period;
    $cached = currency_cached($cacheDir,$key,CURRENCY_TTL_HISTORY,$load,$valid,$now);
    $model = $cached['data'];
    $pln = []; foreach ($model['series']['PLN'] as $point) $pln[$point['date']] = $point['rate'];
    $usd = []; foreach ($model['series']['USD'] as $point) $usd[$point['date']] = $point['rate'];
    if ($pair === 'PLN-UAH') $points = array_map(static fn($point)=>['date'=>$point['date'],'rate'=>$point['rate']],$model['series']['PLN']);
    elseif ($pair === 'USD-UAH') $points = array_map(static fn($point)=>['date'=>$point['date'],'rate'=>$point['rate']],$model['series']['USD']);
    else {
        $points = [];
        foreach ($pln as $date=>$rate) if (isset($usd[$date])) $points[] = ['date'=>$date,'rate'=>$usd[$date]/$rate];
    }
    if (!$points) throw new RuntimeException('No common NBU history for requested pair');
    return ['source'=>CURRENCY_SOURCE,'pair'=>$pair,'period'=>$period,'updated_at'=>currency_local_now($cached['at'])->format(DATE_ATOM),'start'=>$model['start'],'end'=>$model['end'],'data'=>$points,'stale'=>$cached['stale'] || $model['end'] !== $endDate];
}

if (defined('CURRENCY_LIBRARY_ONLY')) return;
header('Content-Type: application/json; charset=utf-8');
$action = (string)($_GET['action'] ?? '');
$cacheDir = sys_get_temp_dir() . '/prywoz-currency-' . substr(hash('sha256', __DIR__), 0, 16);
try {
    if ($action === 'rates') {
        $data = currency_rates_response($cacheDir);
        header('Cache-Control: no-store');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR | JSON_PRESERVE_ZERO_FRACTION);
        exit;
    }
    if ($action === 'history') {
        $pair = (string)($_GET['pair'] ?? ''); $period = (string)($_GET['period'] ?? '30d');
        if (!in_array(strtoupper($pair), ['PLN-UAH','USD-UAH','USD-PLN'], true) || !in_array(strtolower($period), ['7d','30d','90d','180d','365d'], true)) {
            http_response_code(400); header('Cache-Control: no-store'); echo json_encode(['error'=>'Unsupported currency history parameters']); exit;
        }
        $data = currency_history_response($cacheDir,$pair,$period);
        header($data['stale'] ? 'Cache-Control: no-store' : 'Cache-Control: public, max-age=300');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR | JSON_PRESERVE_ZERO_FRACTION);
        exit;
    }
    http_response_code(400); header('Cache-Control: no-store'); echo json_encode(['error'=>'Unsupported action']);
} catch (InvalidArgumentException $error) {
    http_response_code(400); header('Cache-Control: no-store'); echo json_encode(['error'=>'Unsupported currency history parameters']);
} catch (Throwable $error) {
    http_response_code(503); header('Cache-Control: no-store'); header('Retry-After: 60'); echo json_encode(['error'=>'Currency data unavailable']);
}
