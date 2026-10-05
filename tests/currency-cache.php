<?php
declare(strict_types=1);

define('CURRENCY_LIBRARY_ONLY', true);
require __DIR__ . '/../api/currency.php';

function currency_check(bool $condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}

function currency_clean_test_dir(string $dir): void {
    if (!is_dir($dir)) return;
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($iterator as $file) $file->isDir() ? rmdir($file->getPathname()) : unlink($file->getPathname());
    rmdir($dir);
}

$dir = sys_get_temp_dir() . '/prywoz-currency-test-' . bin2hex(random_bytes(6));
$calls = [];
$baseTime = (new DateTimeImmutable('2026-10-05 12:40:00', new DateTimeZone('Europe/Kyiv')))->getTimestamp();
$fail = false;
$get = static function (string $url) use (&$calls, &$fail): array {
    $calls[] = $url;
    if ($fail) throw new RuntimeException('Simulated NBU outage');
    if (str_contains($url, 'NBUStatService')) {
        parse_str((string)parse_url($url, PHP_URL_QUERY), $query);
        $code = strtoupper((string)($query['valcode'] ?? ''));
        $date = DateTimeImmutable::createFromFormat('!Ymd', (string)($query['date'] ?? ''), new DateTimeZone('Europe/Kyiv'));
        if (!$date || !in_array($code, ['PLN', 'USD'], true)) return [];
        return [['cc' => $code, 'rate' => $code === 'PLN' ? 10.9123 : 39.91, 'exchangedate' => $date->format('d.m.Y')]];
    }
    if (str_contains($url, 'NBU_Exchange')) {
        parse_str((string)parse_url($url, PHP_URL_QUERY), $query);
        $code = strtoupper((string)($query['valcode'] ?? ''));
        $start = DateTimeImmutable::createFromFormat('!Ymd', (string)($query['start'] ?? ''), new DateTimeZone('Europe/Kyiv'));
        $end = DateTimeImmutable::createFromFormat('!Ymd', (string)($query['end'] ?? ''), new DateTimeZone('Europe/Kyiv'));
        if (!$start || !$end || !in_array($code, ['PLN', 'USD'], true)) return [];
        $rows = [];
        for ($day = $start; $day <= $end; $day = $day->modify('+1 day')) {
            // Emulate non-business days absent from NBU data; cross-rate must use date intersection.
            if ($day->format('N') >= 6) continue;
            $rate = ($code === 'PLN' ? 10 : 40) + (int)$day->format('j') / 100;
            $rows[] = ['cc' => $code, 'rate' => $rate * 100, 'units' => 100, 'exchangedate' => $day->format('d.m.Y')];
        }
        return $rows;
    }
    return [];
};

try {
    $rates = currency_rates_response($dir, $get, $baseTime);
    currency_check($rates['source'] === 'bank.gov.ua', 'official source');
    currency_check($rates['date'] === '2026-10-05', 'effective NBU date');
    currency_check($rates['units']['UAH'] === 1.0, 'UAH base unit');
    currency_check(abs($rates['rates']['PLN_UAH'] - 10.9123) < 1e-12, 'PLN official rate');
    currency_check(abs($rates['rates']['USD_UAH'] - 39.91) < 1e-12, 'USD official rate');
    currency_check(abs($rates['rates']['PLN_USD'] - 10.9123 / 39.91) < 1e-12, 'PLN/USD cross rate');
    currency_check($rates['updated_at'] === (new DateTimeImmutable('@' . $baseTime))->setTimezone(new DateTimeZone('Europe/Kyiv'))->format(DATE_ATOM), 'updated_at from successful fetch clock');
    currency_check($rates['stale'] === false && count($calls) === 2, 'initial current rates loads both official values');

    $cachedRates = currency_rates_response($dir, $get, $baseTime + 1);
    currency_check($cachedRates === $rates, 'cache hit preserves normalized response and timestamp');
    currency_check(count($calls) === 2, 'current cache avoids duplicate upstream requests');

    $plnHistory = currency_history_response($dir, 'PLN-UAH', '7d', $get, $baseTime);
    currency_check($plnHistory['pair'] === 'PLN-UAH' && count($plnHistory['data']) > 0, 'PLN history');
    $usdHistory = currency_history_response($dir, 'USD-UAH', '7d', $get, $baseTime);
    $crossHistory = currency_history_response($dir, 'USD-PLN', '7d', $get, $baseTime);
    currency_check(count($calls) === 4, 'history loads both series once and shares normalized cache across pairs');
    currency_check($plnHistory['updated_at'] === $usdHistory['updated_at'] && $usdHistory['updated_at'] === $crossHistory['updated_at'], 'all pair histories share cache timestamp');
    $plnByDate = array_column($plnHistory['data'], 'rate', 'date');
    $usdByDate = array_column($usdHistory['data'], 'rate', 'date');
    $crossByDate = array_column($crossHistory['data'], 'rate', 'date');
    currency_check(array_keys($plnByDate) === array_keys($usdByDate) && array_keys($usdByDate) === array_keys($crossByDate), 'cross-rate contains only same-date points');
    foreach ($crossByDate as $date => $rate) currency_check(abs($rate - $usdByDate[$date] / $plnByDate[$date]) < 1e-12, 'cross-rate derived from same-date official values');

    try { currency_history_response($dir, 'UAH-PLN', '7d', $get, $baseTime); throw new RuntimeException('unsupported pair accepted'); }
    catch (InvalidArgumentException) {}
    try { currency_history_response($dir, 'PLN-UAH', '2d', $get, $baseTime); throw new RuntimeException('unsupported period accepted'); }
    catch (InvalidArgumentException) {}

    $freshCalls = count($calls);
    $freshHistory = currency_history_response($dir, 'USD-PLN', '7d', $get, $baseTime + 1);
    currency_check(count($calls) === $freshCalls && $freshHistory['updated_at'] === $crossHistory['updated_at'], 'history cache hit preserves successful update timestamp');

    $fail = true;
    $staleHistory = currency_history_response($dir, 'USD-PLN', '7d', $get, $baseTime + 21601);
    currency_check($staleHistory['stale'] === true, 'expired history is marked stale after upstream failure');
    currency_check($staleHistory['updated_at'] === $crossHistory['updated_at'], 'stale history retains last successful timestamp');
    $afterHistoryFailureCalls = count($calls);
    currency_check(currency_history_response($dir, 'PLN-UAH', '7d', $get, $baseTime + 21602)['stale'] === true, 'shared stale history available to another pair');
    currency_check(count($calls) === $afterHistoryFailureCalls, 'history failure cooldown prevents duplicate upstream calls');

    // Expire the current-rate TTL on the next day, then ensure an outage returns the old timestamp and marks data stale.
    $nextDay = $baseTime + 86400;
    $fail = true;
    $staleRates = currency_rates_response($dir, $get, $nextDay);
    currency_check($staleRates['stale'] === true, 'stale rates marked after failed refresh');
    currency_check($staleRates['updated_at'] === $rates['updated_at'], 'stale rates retain last successful timestamp');
    $afterFailureCalls = count($calls);
    currency_check(currency_rates_response($dir, $get, $nextDay + 1) === $staleRates, 'failure cooldown serves stale rates without repeated upstream calls');
    currency_check(count($calls) === $afterFailureCalls, 'current failure cooldown prevents request storm');

    $fail = false;
    $reloaded = currency_rates_response($dir, $get, $nextDay + 61);
    currency_check($reloaded['stale'] === false && $reloaded['date'] === '2026-10-06', 'rates reload after cooldown for new NBU effective date');

    $slowDir = $dir . '/production-clock';
    $slowCalls = 0;
    $slowGet = static function (string $url) use (&$slowCalls, $get): array {
        if ($slowCalls++ === 0) usleep(1100000);
        return $get($url);
    };
    $startedAt = time();
    $productionClockRates = currency_rates_response($slowDir, $slowGet);
    currency_check(strtotime($productionClockRates['updated_at']) >= $startedAt + 1, 'production updated_at is stamped after successful upstream completion');

    $withoutCache = $dir . '/no-cache';
    try { currency_rates_response($withoutCache, static fn() => throw new RuntimeException('offline'), $baseTime); throw new RuntimeException('empty-cache outage returned rates'); }
    catch (RuntimeException $error) { currency_check($error->getMessage() !== 'empty-cache outage returned rates', 'empty cache outage propagates'); }

    echo "Currency official rates, PLN/USD math, shared date-aligned history, cache timestamps, stale fallback, cooldown and validation: PASS\n";
} finally {
    currency_clean_test_dir($dir);
}
