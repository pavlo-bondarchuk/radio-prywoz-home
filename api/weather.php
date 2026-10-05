<?php
declare(strict_types=1);

const GIOS_BASE = 'https://api.gios.gov.pl/pjp-api/v1/rest';
const LODZ_LAT = 51.7592;
const LODZ_LON = 19.4560;

function request_json(string $url): array {
    $context = stream_context_create(['http' => ['timeout' => 5, 'header' => "Accept: application/ld+json, application/json, */*\r\n"]]);
    $body = @file_get_contents($url, false, $context);
    if ($body === false) throw new RuntimeException('Upstream request failed');
    $data = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($data)) throw new RuntimeException('Invalid upstream data');
    return $data;
}

// Private filesystem cache outside the document root. Locks prevent request stampedes.
function weather_cached(string $dir, string $key, int $ttl, callable $load, ?int $now = null): array {
    $now = $now ?? time();
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('Cache unavailable');
    $path = $dir . '/' . hash('sha256', $key);
    $read = static function () use ($path): ?array {
        $raw = @file_get_contents($path . '.json');
        $value = $raw === false ? null : json_decode($raw, true);
        return is_array($value) && isset($value['data'], $value['at']) ? $value : null;
    };
    $hit = $read();
    if ($hit && $now - $hit['at'] < $ttl) return ['data' => $hit['data'], 'stale' => false, 'cached' => true];
    $failure = (int)@file_get_contents($path . '.retry');
    if ($failure > $now) {
        if ($hit) return ['data' => $hit['data'], 'stale' => true, 'cached' => true];
        throw new RuntimeException('Upstream cooldown');
    }
    $lock = @fopen($path . '.lock', 'c');
    if (!$lock) throw new RuntimeException('Cache lock unavailable');
    if (!flock($lock, LOCK_EX | LOCK_NB)) {
        fclose($lock);
        if ($hit) return ['data' => $hit['data'], 'stale' => true, 'cached' => true];
        throw new RuntimeException('Cache refresh in progress');
    }
    try {
        // Another worker may have completed between the first read and the lock.
        $hit = $read();
        if ($hit && $now - $hit['at'] < $ttl) return ['data' => $hit['data'], 'stale' => false, 'cached' => true];
        try {
            $data = $load();
            if (!empty($data['stale'])) return ['data' => $data, 'stale' => true, 'cached' => false];
            $encoded = json_encode(['at' => $now, 'data' => $data], JSON_THROW_ON_ERROR | JSON_PRESERVE_ZERO_FRACTION);
            $tmp = tempnam($dir, 'weather-');
            if ($tmp === false || file_put_contents($tmp, $encoded) === false || !rename($tmp, $path . '.json')) throw new RuntimeException('Cache write failed');
            @unlink($path . '.retry');
            return ['data' => $data, 'stale' => false, 'cached' => false];
        } catch (Throwable $error) {
            file_put_contents($path . '.retry', (string)($now + 60), LOCK_EX);
            if ($hit) return ['data' => $hit['data'], 'stale' => true, 'cached' => true];
            throw $error;
        }
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function air_status_code(string $status): string {
    return ['Bardzo dobry'=>'very-good','Dobry'=>'good','Umiarkowany'=>'moderate','Dostateczny'=>'sufficient','Zły'=>'bad','Bardzo zły'=>'very-bad'][$status] ?? 'unknown';
}

function air_response(string $dir, ?callable $get = null, ?int $now = null): array {
    $get = $get ?? 'request_json';
    $result = weather_cached($dir, 'air-v3', 600, static function () use ($dir, $get, $now): array {
        $stationCache = weather_cached($dir, 'station-v3', 86400, static function () use ($get): array {
            $response = $get(GIOS_BASE . '/station/findAll?size=500');
            $stations = $response['Lista stacji pomiarowych'] ?? [];
            $stations = array_values(array_filter($stations, static fn($s) => is_array($s) && is_numeric($s['WGS84 φ N'] ?? $s['gegrLat'] ?? null) && is_numeric($s['WGS84 λ E'] ?? $s['gegrLon'] ?? null)));
            $distance = static fn($s) => ((float)($s['WGS84 φ N'] ?? $s['gegrLat']) - LODZ_LAT) ** 2 + ((float)($s['WGS84 λ E'] ?? $s['gegrLon']) - LODZ_LON) ** 2;
            usort($stations, static fn($a, $b) => $distance($a) <=> $distance($b));
            $s = $stations[0] ?? throw new RuntimeException('No station');
            $id = (int)($s['Identyfikator stacji'] ?? $s['id'] ?? 0);
            if (!$id) throw new RuntimeException('Invalid station');
            return ['id'=>$id,'name'=>$s['Nazwa stacji'] ?? $s['stationName'] ?? 'Łódź','latitude'=>(float)($s['WGS84 φ N'] ?? $s['gegrLat']),'longitude'=>(float)($s['WGS84 λ E'] ?? $s['gegrLon'])];
        }, $now);
        $station = $stationCache['data'];
        $sensorCache = weather_cached($dir, 'sensors-v3-' . $station['id'], 86400, static function () use ($get, $station): array {
            $response = $get(GIOS_BASE . '/station/sensors/' . $station['id']);
            $sensors = $response['Lista stanowisk pomiarowych dla podanej stacji'] ?? [];
            $mapping = [];
            foreach ($sensors as $sensor) {
                $code = $sensor['Wskaźnik - kod'] ?? $sensor['param']['paramCode'] ?? '';
                $id = (int)($sensor['Identyfikator stanowiska'] ?? $sensor['id'] ?? 0);
                if ($id && in_array($code, ['PM2.5','PM10','NO2','O3'], true)) $mapping[$code] = $id;
            }
            if (!$mapping) throw new RuntimeException('No sensors');
            return $mapping;
        }, $now);
        $pollutants = [];
        foreach ($sensorCache['data'] as $code => $id) {
            $response = $get(GIOS_BASE . '/data/getData/' . $id);
            $values = $response['Lista danych pomiarowych'] ?? $response['values'] ?? null;
            if (!is_array($values)) throw new RuntimeException('Invalid readings');
            // ISO local measurement dates sort lexicographically; do not reinterpret their timezone.
            usort($values, static fn($a,$b)=>strcmp($b['Data'] ?? $b['date'] ?? '', $a['Data'] ?? $a['date'] ?? ''));
            $latest = null;
            foreach ($values as $value) {
                $candidate = $value['Wartość'] ?? $value['value'] ?? null;
                if (is_numeric($candidate)) { $latest = (float)$candidate; break; }
            }
            $pollutants[$code] = ['value'=>$latest];
        }
        $response = $get(GIOS_BASE . '/aqindex/getIndex/' . $station['id']);
        $index = $response['AqIndex'] ?? null;
        if (!is_array($index)) throw new RuntimeException('Invalid AQ index');
        $sourceStatus = (string)($index['Nazwa kategorii indeksu'] ?? $index['stIndexLevel']['indexLevelName'] ?? '');
        return [
            'station'=>$station['name'], 'stationId'=>$station['id'],
            'coordinates'=>['latitude'=>$station['latitude'],'longitude'=>$station['longitude']],
            'status'=>$sourceStatus, 'statusCode'=>air_status_code($sourceStatus),
            'pollutants'=>$pollutants, 'updatedAt'=>gmdate(DATE_ATOM, $now ?? time()),
            'stale'=>$stationCache['stale'] || $sensorCache['stale'],
        ];
    }, $now);
    return array_merge($result['data'], ['stale'=>$result['stale'] || !empty($result['data']['stale'])]);
}

if (defined('WEATHER_LIBRARY_ONLY')) return;
header('Content-Type: application/json; charset=utf-8');
if (($_GET['source'] ?? '') !== 'air') {
    http_response_code(400);
    header('Cache-Control: no-store');
    echo json_encode(['error'=>'Unsupported source']);
    exit;
}
try {
    $dir = sys_get_temp_dir() . '/prywoz-weather-' . substr(hash('sha256', __DIR__), 0, 16);
    $data = air_response($dir);
    header($data['stale'] ? 'Cache-Control: no-store' : 'Cache-Control: public, max-age=60');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    http_response_code(503);
    header('Cache-Control: no-store');
    header('Retry-After: 60');
    echo json_encode(['error'=>'Air quality data unavailable']);
}
