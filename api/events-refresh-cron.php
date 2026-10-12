<?php
declare(strict_types=1);

// Run only from the hosting provider's scheduler, never as a public web endpoint.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

if (!function_exists('curl_init')) {
    fwrite(STDERR, "Events refresh requires cURL.\n");
    exit(1);
}

$curl = curl_init('https://prywoz.fm/api/events.php?limit=100');
if ($curl === false) {
    fwrite(STDERR, "Cannot initialize events refresh request.\n");
    exit(1);
}

curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
]);

$body = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
curl_close($curl);

if (!is_string($body) || $status < 200 || $status >= 300) {
    fwrite(STDERR, "Events API refresh failed (HTTP {$status}).\n");
    exit(1);
}

try {
    $payload = json_decode($body, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    fwrite(STDERR, "Events API returned invalid JSON.\n");
    exit(1);
}

if (!is_array($payload) || !is_string($payload['updatedAt'] ?? null) || !is_array($payload['events'] ?? null)) {
    fwrite(STDERR, "Events API response is incomplete.\n");
    exit(1);
}

$providers = $payload['providers'] ?? [];
$healthyProviders = 0;
foreach (['ticketmaster', 'poznan'] as $providerName) {
    $provider = $providers[$providerName] ?? null;
    if (is_array($provider) && ($provider['connected'] ?? false) === true && in_array($provider['status'] ?? '', ['ok', 'stale'], true)) {
        $healthyProviders++;
    }
}

if ($healthyProviders === 0) {
    fwrite(STDERR, "No events provider returned usable data.\n");
    exit(1);
}

fwrite(STDOUT, 'Events cache refreshed: ' . count($payload['events']) . ' events; ' . $healthyProviders . " provider(s) available.\n");
