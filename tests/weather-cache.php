<?php
define('WEATHER_LIBRARY_ONLY', true);
require __DIR__ . '/../api/weather.php';
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
$dir = sys_get_temp_dir() . '/prywoz-weather-test-' . bin2hex(random_bytes(6));
$calls = [];
$fail = false;
$get = function ($url) use (&$calls, &$fail) {
    $calls[] = $url;
    if ($fail) throw new RuntimeException('Simulated 429/outage');
    if (str_contains($url,'findAll')) return ['Lista stacji pomiarowych'=>[['id'=>1,'stationName'=>'Łódź','gegrLat'=>51.7592,'gegrLon'=>19.456]]];
    if (str_contains($url,'sensors')) return ['Lista stanowisk pomiarowych dla podanej stacji'=>[['id'=>12,'param'=>['paramCode'=>'PM10']]]];
    if (str_contains($url,'getData')) return ['values'=>[['date'=>'2026-10-04 19:00:00','value'=>12]]];
    return ['AqIndex'=>['Nazwa kategorii indeksu'=>'Zły']];
};
try {
    $first=air_response($dir,$get,100000);check($first['statusCode']==='bad','bad status');check(count($calls)===4,'initial upstream requests');
    $second=air_response($dir,$get,100001);check($first===$second,'cached response unchanged');check(count($calls)===4,'no repeat requests');
    air_response($dir,$get,100601);check(count($calls)===6,'only measurements and AQ refreshed');
    $fail=true;$stale=air_response($dir,$get,101202);check($stale['stale']===true,'stale fallback');
    $count=count($calls);air_response($dir,$get,101203);check(count($calls)===$count,'failure cooldown');
    check(air_status_code('Bardzo zły')==='very-bad','very bad');check(air_status_code('')==='unknown','unknown');
    $lock=fopen($dir.'/'.hash('sha256','air-v3').'.lock','c');flock($lock,LOCK_EX);
    $locked=air_response($dir,$get,101300);check($locked['stale']===true,'concurrent request uses stale');
    flock($lock,LOCK_UN);fclose($lock);
    $fail=false;$count=count($calls);air_response($dir,$get,186401);
    check(count($calls)===$count+4,'metadata refreshes after 24 hours');
    echo "GIOS metadata TTL, final response cache, status, stale, cooldown and lock: PASS\n";
} finally {
    // Remove only this test's random, explicitly created cache directory.
    if (is_dir($dir)) { foreach (new DirectoryIterator($dir) as $file) if ($file->isFile()) unlink($file->getPathname()); rmdir($dir); }
}
