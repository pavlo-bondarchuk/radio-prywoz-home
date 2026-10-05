<?php
define('NEWS_LIBRARY_ONLY',true);
require __DIR__.'/../api/news.php';
function news_check(bool $condition,string $message):void{if(!$condition)throw new RuntimeException($message);}

$now=strtotime('2026-10-05T12:00:00+00:00');
$states=['feed-a'=>['body'=>'','overflow'=>false],'feed-b'=>['body'=>'','overflow'=>false]];
news_capture_http_chunk($states,'feed-a','unique-a');news_capture_http_chunk($states,'feed-b','unique-b');news_capture_http_chunk($states,'feed-a','-tail');
news_check($states['feed-a']['body']==='unique-a-tail'&&$states['feed-b']['body']==='unique-b','Parallel source buffers remain isolated by source ID');
$source=['id'=>'test-a','name'=>'Test Feed','domain'=>'news.example','feedUrl'=>'https://news.example/rss.xml','region'=>'poland','category'=>'society','language'=>'pl','priority'=>5,'enabled'=>true,'reuseAllowed'=>true];
$rss='<?xml version="1.0"?><rss version="2.0"><channel><item><title>Nowy program miejski w Łodzi</title><description><![CDATA[<p>Krótki <b>opis</b> wydarzenia.</p>]]></description><link>https://news.example/article/1?utm_source=rss&amp;id=1</link><pubDate>Mon, 05 Oct 2026 11:00:00 GMT</pubDate><enclosure url="https://cdn.example/photo.jpg" type="image/jpeg"/></item><item><title>To jest tylko feed</title><link>https://news.example/rss.xml</link><pubDate>Mon, 05 Oct 2026 11:00:00 GMT</pubDate></item><item><title>Brak daty</title><link>https://news.example/article/2</link></item></channel></rss>';
$items=news_parse_feed($rss,$source,$now);
news_check(count($items)===1,'Only article with valid date/link is accepted');
news_check($items[0]['originalUrl']==='https://news.example/article/1?id=1','Tracking URL is canonicalized');
news_check($items[0]['region']==='lodz','Łódź region is inferred');
news_check($items[0]['excerpt']==='Krótki opis wydarzenia.','RSS HTML is converted to short plain excerpt');
news_check($items[0]['image']===null,'RSS image is not retained under the source reuse rules');
news_check($items[0]['kind']==='aggregated'&&strlen($items[0]['hash'])===64,'Normalized schema contains aggregate kind and title hash');

$atom='<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Zmiany w komunikacji</title><summary>Ważne informacje dla mieszkańców.</summary><link rel="alternate" href="https://news.example/story/atom"/><updated>2026-10-05T10:30:00Z</updated></entry></feed>';
news_check(count(news_parse_feed($atom,$source,$now))===1,'Atom entries are parsed');
$unsafe='<!DOCTYPE rss [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><rss><channel><item><title>&xxe;</title></item></channel></rss>';
try{news_parse_feed($unsafe,$source,$now);throw new RuntimeException('DOCTYPE must be rejected');}catch(RuntimeException $error){news_check($error->getMessage()==='Unsafe or oversized XML','DOCTYPE is rejected safely');}
news_check(news_article_url('https://news.example/feed.xml','https://news.example/feed.xml')===null,'Feed endpoint cannot become an article link');
news_check(news_article_url('javascript:alert(1)','https://news.example/feed.xml')===null,'Non-http article links are rejected');
news_check(news_detect_category('легалізація документів')==='documents','Ukrainian legalization stems map to documents');
news_check(news_detect_category('оренда житла у Польщі')==='documents','Housing terms map to documents only in a practical context');
news_check(news_detect_category('профіль довіри для заяви')==='documents','Ukrainian trust-profile terms map to documents');
news_check(news_detect_category('67-й Краківський кінофестиваль оголосив прийом заявок')==='culture','Film festival applications are not documents guidance');
news_check(news_detect_category('Доходи Росії від нафти падають через експорт')!=='sport','Export is not misclassified as sport');
$worldSource=$source;$worldSource['region']='ukraine';
$worldXml='<rss><channel><item><title>Ситуація у світі</title><description>Події за межами України.</description><link>https://news.example/rubric-world/story/1</link><pubDate>Mon, 05 Oct 2026 11:00:00 GMT</pubDate></item></channel></rss>';
news_check(news_parse_feed($worldXml,$worldSource,$now)[0]['region']==='world','World rubric URLs override the source default region');

$itemA=$items[0];$itemA['_authority']=2;$itemA['_priority']=1;
$itemB=$itemA;$itemB['source']='Official';$itemB['originalUrl']='https://other.example/repost';$itemB['id']='duplicate';$itemB['title']='Nowy projekt miejski dla mieszkańców Łodzi zmieni trasy tramwajów od początku przyszłego roku szkolnego dzięki nowym rozwiązaniom transportowym';$itemA['title']='Nowy program miejski dla mieszkańców Łodzi zmieni trasy tramwajów od początku przyszłego roku szkolnego dzięki nowym rozwiązaniom transportowym';$itemB['hash']=hash('sha256',news_canonical_title($itemB['title']));$itemA['hash']=hash('sha256',news_canonical_title($itemA['title']));$itemB['_authority']=1;
$near=news_dedupe([$itemA,$itemB]);news_check(count($near)===1&&$near[0]['source']==='Official','Near title duplicate keeps the higher authority source');
$different=$itemA;$different['title']='Zespół wygrał ligowy mecz';$different['originalUrl']='https://news.example/other';$different['hash']=hash('sha256',news_canonical_title($different['title']));
news_check(count(news_dedupe([$itemA,$different]))===2,'Unrelated same-language stories are not deduplicated');
$sameUrl=$itemA;$sameUrl['title']='Inny nagłówek pod tym samym adresem';$sameUrl['hash']=hash('sha256',news_canonical_title($sameUrl['title']));
news_check(count(news_dedupe([$itemA,$sameUrl]))===1,'Exact canonical article URL duplicate is removed');

$sources=[
    $source,
    ['id'=>'test-b','name'=>'Second Feed','domain'=>'second.example','feedUrl'=>'https://second.example/feed.xml','region'=>'ukraine','category'=>'society','language'=>'uk','priority'=>1,'enabled'=>true,'reuseAllowed'=>true],
];
$rssB=str_replace(['news.example','Nowy program miejski w Łodzi','Krótki <b>opis</b> wydarzenia.','/article/1?utm_source=rss&amp;id=1'],['second.example','Нові соціальні зміни','Короткий опис змін.','/story/2'], $rss);
$rssB=str_replace('<enclosure url="https://cdn.example/photo.jpg" type="image/jpeg"/>','',$rssB);
$dir=sys_get_temp_dir().'/prywoz-news-test-'.bin2hex(random_bytes(6));
$fetchCount=0;$mode='all-ok';
$fetch=function(array $configured)use(&$fetchCount,&$mode,$rss,$rssB){$fetchCount++;$out=[];foreach($configured as $s){if($mode==='all-fail'||($mode==='partial'&&$s['id']==='test-b'))$out[$s['id']]=['ok'=>false,'body'=>'','status'=>503,'error'=>'Fixture outage'];else$out[$s['id']]=['ok'=>true,'body'=>$s['id']==='test-a'?$rss:$rssB,'status'=>200,'error'=>''];}return $out;};
try{
    $first=news_response($dir,$sources,$fetch,$now);news_check($first['status']===200&&count($first['data']['items'])===2,'Cold update returns normalized records');news_check($first['data']['available_count']===2,'Source health counts successful feeds');$firstUpdated=$first['data']['updated_at'];
    $same=news_response($dir,$sources,$fetch,$now+60);news_check($same['data']['updated_at']===$firstUpdated&&$fetchCount===1,'15 minute cache TTL avoids another upstream fetch');
    $mode='partial';$partial=news_response($dir,$sources,$fetch,$now+901);news_check($partial['status']===200&&$partial['data']['stale']===false,'Partial refresh remains usable');news_check(count($partial['data']['items'])===2,'Failed source keeps its last valid items');news_check($partial['data']['sources'][1]['status']==='stale','Failed source health is marked stale');$partialUpdated=$partial['data']['updated_at'];
    $mode='all-fail';$stale=news_response($dir,$sources,$fetch,$now+1802);news_check($stale['status']===200&&$stale['data']['stale']===true,'All-feed failure serves the last valid snapshot');news_check($stale['data']['updated_at']===$partialUpdated,'Stale response retains actual successful update timestamp');
    $emptyDir=$dir.'-empty';$error=news_response($emptyDir,$sources,$fetch,$now+1802);news_check($error['status']===503&&$error['data']['items']===[]&&$error['data']['updated_at']===null,'Cold all-feed failure is an empty 503 without fake records');
    echo "News RSS/Atom parsing, safety, URL validation, normalization, dedupe, TTL, partial stale, full stale and no-cache error: PASS\n";
}finally{
    foreach([$dir,$dir.'-empty'] as $target)if(is_dir($target)){foreach(new DirectoryIterator($target)as$file)if($file->isFile())@unlink($file->getPathname());@rmdir($target);}
}
