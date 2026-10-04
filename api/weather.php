<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=600');

if (($_GET['source'] ?? '') !== 'air') {
    http_response_code(400);
    echo json_encode(['error' => 'Unsupported source']);
    exit;
}

const GIOS_BASE = 'https://api.gios.gov.pl/pjp-api/v1/rest';
const LODZ_LAT = 51.7592;
const LODZ_LON = 19.4560;

function request_json(string $url): array {
    $context = stream_context_create(['http' => ['timeout' => 8]]);
    $body = @file_get_contents($url, false, $context);
    if ($body === false) throw new RuntimeException('Upstream request failed');
    $data = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    return is_array($data) ? $data : [];
}

function distance(array $station): float {
    $lat = (float)($station['WGS84 φ N'] ?? $station['gegrLat'] ?? 0);
    $lon = (float)($station['WGS84 λ E'] ?? $station['gegrLon'] ?? 0);
    return ($lat - LODZ_LAT) ** 2 + ($lon - LODZ_LON) ** 2;
}

try {
    $stationsResponse = request_json(GIOS_BASE . '/station/findAll?size=500');
    $stations = $stationsResponse['Lista stacji pomiarowych'] ?? $stationsResponse;
    usort($stations, fn(array $a, array $b): int => distance($a) <=> distance($b));
    $station = $stations[0] ?? throw new RuntimeException('No station');
    $stationId = (int)($station['Identyfikator stacji'] ?? $station['id'] ?? 0);
    $sensorsResponse = request_json(GIOS_BASE . '/station/sensors/' . $stationId);
    $sensors = $sensorsResponse['Lista stanowisk pomiarowych dla podanej stacji'] ?? $sensorsResponse;
    $wanted = ['PM2.5', 'PM10', 'NO2', 'O3'];
    $pollutants = [];
    foreach ($sensors as $sensor) {
        $code = (string)($sensor['Wskaźnik - kod'] ?? $sensor['param']['paramCode'] ?? '');
        if (!in_array($code, $wanted, true)) continue;
        $sensorId = (int)($sensor['Identyfikator stanowiska'] ?? $sensor['id'] ?? 0);
        $reading = request_json(GIOS_BASE . '/data/getData/' . $sensorId);
        $values = $reading['Lista danych pomiarowych'] ?? $reading['values'] ?? [];
        $latest = null;
        foreach ($values as $value) {
            $candidate = $value['Wartość'] ?? $value['value'] ?? null;
            if ($candidate !== null) { $latest = (float)$candidate; break; }
        }
        $pollutants[$code] = ['value' => $latest];
    }
    $indexResponse = request_json(GIOS_BASE . '/aqindex/getIndex/' . $stationId);
    $index = $indexResponse['AqIndex'] ?? $indexResponse;
    $sourceStatus = (string)($index['Nazwa kategorii indeksu'] ?? $index['stIndexLevel']['indexLevelName'] ?? '');
    $statusMap = ['Bardzo dobry' => 'Дуже добре', 'Dobry' => 'Добре', 'Umiarkowany' => 'Помірно', 'Dostateczny' => 'Задовільно', 'Zły' => 'Погано', 'Bardzo zły' => 'Дуже погано'];
    $status = $statusMap[$sourceStatus] ?? ($sourceStatus ?: 'Дані доступні');
    $good = in_array($sourceStatus, ['Bardzo dobry', 'Dobry'], true);
    echo json_encode([
        'station' => $station['Nazwa stacji'] ?? $station['stationName'] ?? 'Лодзь',
        'status' => $status,
        'recommendation' => $good ? 'Повітря добре. Обмеження для прогулянок не потрібні.' : 'Перевірте рекомендації GIOŚ перед тривалими прогулянками.',
        'pollutants' => $pollutants,
        'updatedAt' => gmdate(DATE_ATOM),
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $error) {
    http_response_code(502);
    echo json_encode(['error' => 'Air quality data unavailable'], JSON_UNESCAPED_UNICODE);
}
