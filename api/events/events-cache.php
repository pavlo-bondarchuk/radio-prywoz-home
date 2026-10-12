<?php
declare(strict_types=1);

const EVENTS_CACHE_TTL = 86400;
const EVENTS_CACHE_RETRY = 60;

/** A provider-scoped JSON cache with atomic writes and stale-if-error behavior. */
function events_cached(string $dir, string $key, callable $loader, callable $valid, ?int $now = null): array {
    $now = $now ?? time();
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('Events cache unavailable');
    $path = $dir . '/' . hash('sha256', $key);
    $read = static function () use ($path, $valid): ?array {
        $raw = @file_get_contents($path . '.json');
        if ($raw === false) return null;
        try { $value = json_decode($raw, true, 512, JSON_THROW_ON_ERROR); } catch (Throwable) { return null; }
        if (!is_array($value) || !is_int($value['at'] ?? null) || !is_array($value['data'] ?? null) || !$valid($value['data'])) return null;
        return $value;
    };
    $hit = $read();
    if ($hit && $now >= $hit['at'] && $now - $hit['at'] < EVENTS_CACHE_TTL) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>false];
    $retryRaw = @file_get_contents($path . '.retry');
    $retry = $retryRaw !== false && preg_match('/^\d+$/', trim($retryRaw)) ? (int)trim($retryRaw) : 0;
    if ($retry > $now) {
        if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>true];
        throw new RuntimeException('Events provider cooldown');
    }
    $lock = @fopen($path . '.lock', 'c');
    if (!$lock) {
        if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>true];
        throw new RuntimeException('Events cache lock unavailable');
    }
    if (!flock($lock, LOCK_EX | LOCK_NB)) {
        fclose($lock);
        if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>true];
        throw new RuntimeException('Events cache refresh in progress');
    }
    try {
        $hit = $read();
        if ($hit && $now >= $hit['at'] && $now - $hit['at'] < EVENTS_CACHE_TTL) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>false];
        try {
            $data = $loader();
            if (!$valid($data)) throw new RuntimeException('Invalid normalized events data');
            $fetchedAt = time();
            $tmp = tempnam($dir, 'events-');
            if ($tmp === false) throw new RuntimeException('Events cache temp file unavailable');
            $encoded = json_encode(['at'=>$fetchedAt,'data'=>$data], JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            if (file_put_contents($tmp, $encoded, LOCK_EX) === false || !@rename($tmp, $path . '.json')) {
                @unlink($tmp);
                throw new RuntimeException('Events cache write failed');
            }
            @unlink($path . '.retry');
            return ['data'=>$data,'at'=>$fetchedAt,'cached'=>false,'stale'=>false];
        } catch (Throwable $error) {
            @file_put_contents($path . '.retry', (string)($now + EVENTS_CACHE_RETRY), LOCK_EX);
            if ($hit) return ['data'=>$hit['data'],'at'=>$hit['at'],'cached'=>true,'stale'=>true];
            throw $error;
        }
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function events_valid_cache(mixed $data): bool {
    if (!is_array($data) || !is_array($data['events'] ?? null)) return false;
    foreach ($data['events'] as $event) {
        if (!is_array($event) || !is_string($event['id'] ?? null) || !is_string($event['title'] ?? null) || !is_string($event['startAt'] ?? null)) return false;
    }
    return true;
}
