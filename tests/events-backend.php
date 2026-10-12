<?php
declare(strict_types=1);

define('EVENTS_LIBRARY_ONLY', true);
require __DIR__ . '/../api/events.php';

function events_test_check(bool $condition, string $message): void {
    if (!$condition) throw new RuntimeException($message);
}

$now = time();
$tomorrow = (new DateTimeImmutable('@' . $now))->setTimezone(new DateTimeZone('Europe/Warsaw'))->modify('+1 day')->setTime(19,0);
$ticket = events_normalize_ticketmaster([
    'id'=>'tm-1','name'=>'Український концерт у Лодзі','url'=>'https://www.ticketmaster.pl/event/tm-1',
    'dates'=>['timezone'=>'Europe/Warsaw','start'=>['dateTime'=>$tomorrow->format(DATE_ATOM)]],
    'classifications'=>[['segment'=>['name'=>'Music']]],
    'images'=>[['url'=>'https://s1.ticketm.net/dam/a/b/c.jpg','width'=>1200]],
    '_embedded'=>['venues'=>[['name'=>'Atlas Arena','city'=>['name'=>'Łódź'],'address'=>['line1'=>'al. Bandurskiego 7']]]],
]);
events_test_check(is_array($ticket),'Ticketmaster event normalizes');
events_test_check($ticket['id']==='ticketmaster:tm-1' && $ticket['city']==='lodz' && $ticket['category']==='music','Ticketmaster ID, city and category are normalized');
events_test_check($ticket['ticketUrl']==='https://www.ticketmaster.pl/event/tm-1','Only official Ticketmaster ticket URL is retained');
events_test_check($ticket['startAt']===$tomorrow->format(DATE_ATOM),'Ticketmaster time is normalized to Europe/Warsaw');

$todayWarsaw = (new DateTimeImmutable('@' . $now))->setTimezone(new DateTimeZone('Europe/Warsaw'))->setTime(0,0);
$rss = '<?xml version="1.0"?><rss version="2.0"><channel><title>Wydarzenia w Poznaniu</title><item><title>Stand-up nad Wartą (Kino Rialto)</title><link>https://www.poznan.pl/mim/events/event.html</link><guid isPermaLink="false">tag:poznan.pl,2026:events.1</guid><pubDate>' . $todayWarsaw->format(DATE_ATOM) . '</pubDate><description><![CDATA[Official event description.]]></description></item></channel></rss>';
$poznan = events_parse_poznan_rss($rss);
events_test_check(count($poznan)===1,'Verified Poznań official RSS fixture parses');
events_test_check($poznan[0]['id']==='poznan:tag:poznan.pl,2026:events.1' && $poznan[0]['city']==='poznan' && $poznan[0]['category']==='comedy','Poznań stable GUID, city and category normalize');
events_test_check($poznan[0]['timeKnown']===false,'Poznań date-only feed does not invent an event time');
events_test_check($poznan[0]['sourceType']==='official-city-feed' && $poznan[0]['sourceUrl']==='https://www.poznan.pl/mim/events/event.html','Poznań attribution and official URL are retained');
try { events_parse_poznan_rss('<!DOCTYPE rss [<!ENTITY e SYSTEM "file:///etc/passwd">]><rss/>'); throw new RuntimeException('Poznań DTD must be rejected'); }
catch (RuntimeException $error) { events_test_check($error->getMessage()==='Unsafe or oversized Poznań RSS','Poznań RSS rejects entities'); }

$deduped = events_dedupe([$ticket, array_merge($ticket,['id'=>'poznan:x','provider'=>'poznan','sourceName'=>'Poznań.pl','sourceType'=>'official-city-feed','ticketUrl'=>null,'sources'=>[['provider'=>'poznan','sourceName'=>'Poznań.pl','sourceType'=>'official-city-feed','sourceUrl'=>'https://www.poznan.pl/']]])]);
events_test_check(count($deduped)===1 && count($deduped[0]['sources'])===2,'Same-day same-city cross-provider duplicates merge and retain both sources');

$options = events_query_options(['city'=>'lodz','category'=>'music','limit'=>'20'],$now);
events_test_check($options['city']==='lodz' && $options['limit']===20,'Supported filters validate');
foreach ([['city'=>'warsaw'],['category'=>'unknown'],['limit'=>'0'],['from'=>'not-a-date']] as $bad) {
    try { events_query_options($bad,$now); throw new RuntimeException('Invalid filters must be rejected'); }
    catch (InvalidArgumentException) {}
}

$dir = sys_get_temp_dir() . '/prywoz-events-test-' . bin2hex(random_bytes(5));
$tmFetch = static fn($key,$from,$to)=>['events'=>[$ticket]];
$pozFetch = static fn($from,$to)=>['events'=>$poznan];
$duplicatePoznan = array_merge($ticket,['id'=>'poznan:tm-1','provider'=>'poznan','sourceName'=>'Poznań.pl','sourceType'=>'official-city-feed','ticketUrl'=>null,'sourceUrl'=>'https://www.poznan.pl/mim/events/event.html','sources'=>[['provider'=>'poznan','sourceName'=>'Poznań.pl','sourceType'=>'official-city-feed','sourceUrl'=>'https://www.poznan.pl/mim/events/event.html']]]);
try {
    $response = events_merge_response($dir . '-no-key',['city'=>'lodz'],null,$tmFetch,$pozFetch,$now);
    events_test_check($response['status']===200 && $response['data']['providers']['ticketmaster']['status']==='not_configured','Missing API key is explicitly reported');
    events_test_check($response['data']['providers']['poznan']['status']==='ok','Poznań provider can run without Ticketmaster key');
    events_test_check($response['data']['sources']===['poznan'],'Only active provider is listed as response source');
    events_test_check($response['data']['events']===[],'City filter excludes events outside the requested city');
    $todayOnly=events_merge_response($dir . '-today',['city'=>'poznan'],null,static fn()=>['events'=>[]],static fn()=>['events'=>$poznan],$now);
    events_test_check(count($todayOnly['data']['events'])===1 && $todayOnly['data']['events'][0]['timeKnown']===false,'Date-only event scheduled for today remains visible after midnight');
    $response = events_merge_response($dir,['city'=>'all'], 'test-key',$tmFetch,static fn()=>['events'=>[$duplicatePoznan]],$now);
    events_test_check($response['status']===200 && count($response['data']['events'])===1,'Valid future event is returned and cross-provider duplicate is removed');
    $fixture = array_merge($ticket,['startAt'=>$tomorrow->format(DATE_ATOM)]);
    $tmFetch2 = static fn($key,$from,$to)=>['events'=>[$fixture]];
    $response = events_merge_response($dir,['city'=>'lodz','category'=>'music'],'test-key',$tmFetch2,static fn()=>['events'=>[]],$now);
    events_test_check($response['status']===200 && count($response['data']['events'])===1,'Future event survives date and city/category filters');
    $again = events_merge_response($dir,['city'=>'lodz','category'=>'music'],'test-key',$tmFetch2,static fn()=>['events'=>[]],$now);
    events_test_check($again['data']['cached']===true,'Provider cache prevents repeat upstream calls');
    events_cached($dir,'stale-fixture',static fn()=>['events'=>[$ticket]],'events_valid_cache',$now);
    $stale = events_cached($dir,'stale-fixture',static function(){throw new RuntimeException('fixture outage');},'events_valid_cache',$now + EVENTS_CACHE_TTL + 1);
    events_test_check($stale['stale']===true && count($stale['data']['events'])===1,'Expired provider cache is served when refresh fails');
    echo "Events backend normalization, XML safety, filters, cache and provider isolation: PASS\n";
} finally {
    foreach ([$dir,$dir . '-no-key',$dir . '-today'] as $target) {
        if (is_dir($target)) foreach (new DirectoryIterator($target) as $file) if ($file->isFile()) @unlink($file->getPathname());
        @rmdir($target);
    }
}
