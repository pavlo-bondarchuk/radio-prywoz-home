<?php
declare(strict_types=1);

const NEWS_SOURCE_CONFIG = __DIR__ . '/../assets/data/news-sources.json';
const NEWS_STATIC_SNAPSHOT = __DIR__ . '/../assets/data/news-cache.json';
const NEWS_CACHE_TTL = 900;
const NEWS_MAX_ITEMS = 300;
const NEWS_MAX_BODY = 2097152;
const NEWS_MAX_AGE = 72 * 3600;
const NEWS_DOC_MAX_AGE = 30 * 86400;

function news_read_json(string $path): ?array {
    $raw = @file_get_contents($path);
    if ($raw === false) return null;
    try { $value = json_decode($raw, true, 512, JSON_THROW_ON_ERROR); }
    catch (Throwable) { return null; }
    return is_array($value) ? $value : null;
}

function news_sources(?string $path = null): array {
    $data = news_read_json($path ?? NEWS_SOURCE_CONFIG);
    if (!$data) return [];
    $sources = array_is_list($data) ? $data : ($data['sources'] ?? []);
    return array_values(array_filter($sources, static function ($s) {
        return is_array($s) && !empty($s['id']) && !empty($s['name']) && !empty($s['feedUrl'])
            && filter_var($s['feedUrl'], FILTER_VALIDATE_URL) && in_array(strtolower((string)parse_url($s['feedUrl'], PHP_URL_SCHEME)), ['http','https'], true);
    }));
}

function news_normalize_space(string $value): string {
    return trim((string)preg_replace('/\s+/u', ' ', $value));
}

function news_plain_text(string $value, int $limit = 240): string {
    $value = html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $value = strip_tags($value);
    $value = news_normalize_space($value);
    if (function_exists('mb_substr')) return mb_substr($value, 0, $limit, 'UTF-8');
    return (string)preg_replace('/^(.{0,' . $limit . '}).*$/us', '$1', $value);
}

function news_child_text(DOMElement $node, array $names): string {
    foreach ($node->childNodes as $child) {
        if ($child instanceof DOMElement && in_array(strtolower($child->localName), $names, true)) {
            return trim((string)$child->textContent);
        }
    }
    return '';
}

function news_article_url(string $candidate, string $feedUrl): ?string {
    $candidate = trim(html_entity_decode($candidate, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    if (!$candidate || !filter_var($candidate, FILTER_VALIDATE_URL)) return null;
    $parts = parse_url($candidate);
    $scheme = strtolower((string)($parts['scheme'] ?? ''));
    if (!in_array($scheme, ['http','https'], true) || empty($parts['host']) || isset($parts['user']) || isset($parts['pass'])) return null;
    $feed = parse_url($feedUrl);
    if (strtolower((string)($parts['host'] ?? '')) === strtolower((string)($feed['host'] ?? ''))
        && rtrim((string)($parts['path'] ?? ''), '/') === rtrim((string)($feed['path'] ?? ''), '/')) return null;
    $path = (string)($parts['path'] ?? '/');
    if (preg_match('~(?:^|/)(?:rss|feed)(?:/|\.|$)|\.(?:xml|rss|atom)$~i', $path)) return null;
    parse_str((string)($parts['query'] ?? ''), $query);
    foreach (array_keys($query) as $key) if (preg_match('/^(utm_.+|fbclid|gclid|yclid|ref|source)$/i', (string)$key)) unset($query[$key]);
    $url = $scheme . '://' . strtolower((string)$parts['host']);
    if (isset($parts['port']) && !in_array((int)$parts['port'], [80,443], true)) $url .= ':' . (int)$parts['port'];
    $url .= $path ?: '/';
    if ($query) $url .= '?' . http_build_query($query);
    return $url;
}

function news_canonical_title(string $title): string {
    $value = function_exists('mb_strtolower') ? mb_strtolower($title, 'UTF-8') : strtolower($title);
    return trim((string)preg_replace('/[^\p{L}\p{N}]+/u', ' ', $value));
}

function news_detect_category(string $text, string $fallback = 'society'): string {
    $text = function_exists('mb_strtolower') ? mb_strtolower($text, 'UTF-8') : strtolower($text);
    if (preg_match('/(?:pesel|cukr|karta pobytu|zezwolenie na pobyt|legalizac\p{L}*|zus|pit|800\s*\+|profil zaufany|umowa o prac\p{L}*|wynajem mieszkan\p{L}*|(?:praca|prac[ayę])\s+(?:w\s+polsce|dla\s+cudzoziemc\p{L}*)|карта побиту|легалізац\p{L}*|песель|оренд\p{L}* житл\p{L}*|житл\p{L}* (?:в польщ|для українц)|дозвіл на проживання|дозвіл на роботу|робот\p{L}* в польщ\p{L}*|профіл\p{L}* довір\p{L}*|800\s*плюс)/u', $text)) return 'documents';
    $rules = [
        'politics' => '/(політик|политик|політик|wybor|wybory|sejm|senat|rząd|уряд|парламент|президент|minister|министр)/u',
        'sport' => '/(?<!\p{L})(?:sport|спорт|футбол|piłk|mecz|liga|турнір|матч|теніс)\p{L}*/u',
        'culture' => '/(kultur|культур|театр|kino|кіно|музей|wystaw|вистав|концерт|фестиваль)/u',
        'society' => '/(społecz|суспіль|громад|edukac|освіт|zdrow|здоров|miasto|міст|mieszkań|жител)/u',
    ];
    foreach ($rules as $category => $pattern) if (preg_match($pattern, $text)) return $category;
    return in_array($fallback, ['politics','society','culture','sport','documents','world','lodz'], true) ? $fallback : 'society';
}

function news_guess_language(string $text, string $configured = ''): string {
    if (in_array($configured, ['uk','pl','ru','en'], true)) return $configured;
    if (preg_match('/[а-яёіїєґ]/iu', $text)) return preg_match('/[іїєґ]/iu', $text) ? 'uk' : 'ru';
    if (preg_match('/[ąćęłńóśźż]/iu', $text)) return 'pl';
    return 'en';
}

function news_capture_http_chunk(array &$states, string $sourceId, string $chunk): int {
    if (!isset($states[$sourceId])) return 0;
    if (strlen($states[$sourceId]['body']) + strlen($chunk) > NEWS_MAX_BODY) {
        $states[$sourceId]['overflow'] = true;
        return 0;
    }
    $states[$sourceId]['body'] .= $chunk;
    return strlen($chunk);
}

function news_parse_feed(string $body, array $source, ?int $now = null): array {
    $now ??= time();
    if (strlen($body) > NEWS_MAX_BODY || stripos($body, '<!DOCTYPE') !== false || stripos($body, '<!ENTITY') !== false) throw new RuntimeException('Unsafe or oversized XML');
    $previous = libxml_use_internal_errors(true);
    $xml = new DOMDocument();
    $ok = $xml->loadXML($body, LIBXML_NONET | LIBXML_COMPACT | LIBXML_NOBLANKS);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    if (!$ok || !$xml->documentElement) throw new RuntimeException('Invalid RSS or Atom XML');
    $rootName = strtolower($xml->documentElement->localName);
    if (!in_array($rootName, ['rss','feed','rdf'], true)) throw new RuntimeException('Unsupported feed document');
    $xpath = new DOMXPath($xml);
    $nodes = $xpath->query('//*[local-name()="item" or local-name()="entry"]');
    if (!$nodes) throw new RuntimeException('Invalid feed entries');
    $out = [];
    foreach ($nodes as $node) {
        if (!$node instanceof DOMElement) continue;
        $titleRaw = news_child_text($node, ['title']);
        $title = news_plain_text($titleRaw, 500);
        if ($title === '') continue;
        $link = '';
        foreach ($node->childNodes as $child) {
            if (!$child instanceof DOMElement || strtolower($child->localName) !== 'link') continue;
            $rel = strtolower($child->getAttribute('rel'));
            if ($child->hasAttribute('href')) {
                if ($rel === '' || $rel === 'alternate') { $link = $child->getAttribute('href'); break; }
            } elseif ($child->textContent !== '') { $link = trim($child->textContent); break; }
        }
        $url = news_article_url($link, (string)$source['feedUrl']);
        if (!$url) continue;
        $descRaw = news_child_text($node, ['description','summary','encoded','content']);
        $excerpt = news_plain_text($descRaw, 240);
        $dateRaw = news_child_text($node, ['pubdate','published','updated','date']);
        if ($dateRaw === '') continue;
        try { $published = (new DateTimeImmutable($dateRaw))->getTimestamp(); }
        catch (Throwable) { continue; }
        if ($published > $now + 86400) continue;
        $combined = $title . ' ' . $excerpt;
        $category = news_detect_category($combined, (string)($source['category'] ?? 'society'));
        $maxAge = $category === 'documents' ? NEWS_DOC_MAX_AGE : NEWS_MAX_AGE;
        if ($now - $published > $maxAge) continue;
        $canonicalTitle = news_canonical_title($title);
        $hash = hash('sha256', $canonicalTitle);
        $sourceId = (string)$source['id'];
        $out[] = [
            'id' => hash('sha256', $sourceId . '|' . $url),
            'title' => $title,
            'excerpt' => $excerpt,
            'source' => (string)$source['name'],
            'sourceUrl' => 'https://' . (string)($source['domain'] ?? parse_url($source['feedUrl'], PHP_URL_HOST)),
            'originalUrl' => $url,
            'publishedAt' => gmdate(DATE_ATOM, $published),
            'fetchedAt' => gmdate(DATE_ATOM, $now),
            'language' => news_guess_language($title . ' ' . $excerpt, (string)($source['language'] ?? '')),
            'region' => preg_match('/(?:ł[oó]dź|łodzi|lodz|лодз)\p{L}*/iu', $combined) ? 'lodz' : (preg_match('~/rubric-world(?:/|$)~i', (string)parse_url($url, PHP_URL_PATH)) ? 'world' : (string)($source['region'] ?? 'world')),
            'category' => $category,
            'image' => null,
            'hash' => $hash,
            'kind' => 'aggregated',
            '_sourceId' => $sourceId,
            '_authority' => (int)($source['authority'] ?? 99),
            '_priority' => (int)($source['priority'] ?? 99),
        ];
    }
    return $out;
}

function news_http_fetch_all(array $sources): array {
    $feeds = array_values(array_filter($sources, static fn($s) => !empty($s['enabled']) && !empty($s['reuseAllowed'])));
    $results = [];
    if (function_exists('curl_multi_init')) {
        $multi = curl_multi_init(); $handles = []; $states = [];
        foreach ($feeds as $source) {
            $id=(string)$source['id'];$states[$id]=['body'=>'','overflow'=>false];
            $ch = curl_init((string)$source['feedUrl']);
            curl_setopt_array($ch, [CURLOPT_FOLLOWLOCATION=>false,CURLOPT_MAXREDIRS=>0,CURLOPT_CONNECTTIMEOUT=>3,CURLOPT_TIMEOUT=>8,CURLOPT_USERAGENT=>'PRYWOZ-News/1.0 (+https://prywoz.fm/news.html)',CURLOPT_HTTPHEADER=>['Accept: application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.2'],CURLOPT_ENCODING=>'',CURLOPT_WRITEFUNCTION=>static function ($handle, string $chunk) use (&$states,$id): int { return news_capture_http_chunk($states,$id,$chunk); }]);
            curl_multi_add_handle($multi,$ch); $handles[]=[$ch,$source,$id];
        }
        do {
            do { $status=curl_multi_exec($multi,$running); } while ($status===CURLM_CALL_MULTI_PERFORM);
            if ($status!==CURLM_OK) break;
            if ($running) { $selected=curl_multi_select($multi,0.25); if ($selected===-1) usleep(10000); }
        } while ($running);
        foreach ($handles as [$ch,$source,$id]) {
            $code=(int)curl_getinfo($ch,CURLINFO_RESPONSE_CODE); $error=curl_error($ch);
            $state=$states[$id];$results[$id]=['ok'=>!$state['overflow'] && $error==='' && $code>=200 && $code<300,'body'=>$state['body'],'status'=>$code,'error'=>$state['overflow']?'Feed exceeds size limit':($error ?: ($code===429?'Rate limited':($code>=400?'HTTP error':'')))];
            curl_multi_remove_handle($multi,$ch);curl_close($ch);
        }
        curl_multi_close($multi); return $results;
    }
    foreach ($feeds as $source) {
        $context=stream_context_create(['http'=>['timeout'=>8,'ignore_errors'=>true,'follow_location'=>0,'max_redirects'=>0,'header'=>"Accept: application/rss+xml, application/atom+xml, application/xml, text/xml\r\nUser-Agent: PRYWOZ-News/1.0\r\n"]]);
        $stream=@fopen((string)$source['feedUrl'],'rb',false,$context);
        if (!$stream) { $results[(string)$source['id']]=['ok'=>false,'body'=>'','status'=>0,'error'=>'Request failed']; continue; }
        $body='';while(!feof($stream)&&strlen($body)<=NEWS_MAX_BODY){$chunk=fread($stream,65536);if($chunk===false||$chunk==='')break;$body.=$chunk;}fclose($stream);
        $headers=$http_response_header??[];$code=0;if(isset($headers[0])&&preg_match('/\s(\d{3})\s/',$headers[0],$m))$code=(int)$m[1];
        $results[(string)$source['id']]=['ok'=>strlen($body)<=NEWS_MAX_BODY&&$code>=200&&$code<300,'body'=>$body,'status'=>$code,'error'=>$code===429?'Rate limited':($code>=400?'HTTP error':'')];
    }
    return $results;
}

function news_is_fresh_item(array $item, ?int $now = null): bool {
    $now ??= time();
    try { $published=(new DateTimeImmutable((string)($item['publishedAt']??'')))->getTimestamp(); } catch(Throwable) { return false; }
    $limit=($item['category']??'')==='documents'?NEWS_DOC_MAX_AGE:NEWS_MAX_AGE;
    return $published<=$now+86400 && $now-$published<=$limit && !empty($item['originalUrl']) && !empty($item['title']);
}

function news_dedupe(array $items): array {
    usort($items,static function($a,$b){$authority=((int)($a['_authority']??99))-((int)($b['_authority']??99));if($authority!==0)return $authority;$priority=((int)($a['_priority']??99))-((int)($b['_priority']??99));if($priority!==0)return $priority;return strcmp((string)($a['publishedAt']??''),(string)($b['publishedAt']??''));});
    $kept=[];$urls=[];$hashes=[];
    foreach($items as $item){$url=(string)($item['originalUrl']??'');$hash=(string)($item['hash']??'');if(isset($urls[$url])||($hash!==''&&isset($hashes[$hash])))continue;
        $tokens=array_values(array_unique(explode(' ',news_canonical_title((string)($item['title']??'')))));$duplicate=false;
        foreach($kept as $existing){if(($existing['language']??'')!==($item['language']??''))continue;try{$delta=abs((new DateTimeImmutable($existing['publishedAt']))->getTimestamp()-(new DateTimeImmutable($item['publishedAt']))->getTimestamp());}catch(Throwable){continue;}if($delta>86400)continue;$other=array_values(array_unique(explode(' ',news_canonical_title((string)$existing['title']))));$union=array_unique(array_merge($tokens,$other));$score=count(array_intersect($tokens,$other))/max(1,count($union));if($score>=0.88){$duplicate=true;break;}}
        if($duplicate)continue;$kept[]=$item;$urls[$url]=true;if($hash!=='')$hashes[$hash]=true;if(count($kept)>=NEWS_MAX_ITEMS)break;
    }
    usort($kept,static fn($a,$b)=>strcmp((string)$b['publishedAt'],(string)$a['publishedAt']));
    return array_map(static function($item){unset($item['_sourceId'],$item['_authority'],$item['_priority']);return $item;},$kept);
}

function news_build_envelope(array $sources, array $sourceItems, array $health, string $updatedAt, bool $stale, ?int $now = null): array {
    $now??=time();$all=[];$sourceHealth=[];$enabled=0;$available=0;
    foreach($sources as $source){$id=(string)$source['id'];$meta=$health[$id]??[];$items=array_values(array_filter($sourceItems[$id]??[],static fn($item)=>news_is_fresh_item($item,$now)));$status=(string)($meta['status']??'error');if(!empty($source['enabled'])){$enabled++;if($status==='ok')$available++;}
        foreach($items as &$item){$item['_sourceId']=$id;$item['_priority']=(int)($source['priority']??0);}unset($item);$all=array_merge($all,$items);
        $sourceHealth[]=['id'=>$id,'name'=>(string)$source['name'],'domain'=>(string)($source['domain']??parse_url($source['feedUrl'],PHP_URL_HOST)),'sourceUrl'=>(string)($source['sourceUrl']??''),'region'=>(string)($source['region']??'world'),'category'=>(string)($source['category']??'society'),'language'=>(string)($source['language']??''),'type'=>(string)($source['type']??'publisher'),'authority'=>(int)($source['authority']??99),'reuseAllowed'=>(bool)($source['reuseAllowed']??false),'enabled'=>(bool)($source['enabled']??false),'reusePolicyUrl'=>(string)($source['reusePolicyUrl']??''),'reusePolicy'=>(string)($source['reusePolicy']??''),'lastSuccessAt'=>$meta['lastSuccessAt']??null,'lastErrorAt'=>$meta['lastErrorAt']??null,'status'=>$status,'itemsCount'=>count($items)];
    }
    return ['source'=>'PRYWOZ RSS','updated_at'=>$updatedAt,'stale'=>$stale,'items'=>news_dedupe($all),'sources'=>$sourceHealth,'enabled_count'=>$enabled,'available_count'=>$available];
}

function news_private_cache_dir(): string {
    $docRoot=realpath((string)($_SERVER['DOCUMENT_ROOT']??''));$base=sys_get_temp_dir();
    if($docRoot && str_starts_with(realpath($base)?:$base,$docRoot)) $base='/tmp';
    return rtrim($base,'/') . '/prywoz-news-' . substr(hash('sha256',__DIR__),0,16);
}

function news_write_cache(string $path, array $data): void {
    $encoded=json_encode($data,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);
    $tmp=tempnam(dirname($path),'news-');if($tmp===false)throw new RuntimeException('Cannot create cache temp file');
    try{if(file_put_contents($tmp,$encoded,LOCK_EX)===false)throw new RuntimeException('Cannot write cache');@chmod($tmp,0600);if(!@rename($tmp,$path))throw new RuntimeException('Cannot replace cache');}finally{if(is_file($tmp))@unlink($tmp);}
}

function news_response(string $cacheDir, array $sources, ?callable $fetch = null, ?int $now = null, ?string $seedPath = null): array {
    $now??=time();if(!$sources)throw new RuntimeException('News source configuration unavailable');
    if(!is_dir($cacheDir)&&!@mkdir($cacheDir,0700,true)&&!is_dir($cacheDir))throw new RuntimeException('News cache unavailable');@chmod($cacheDir,0700);
    $path=$cacheDir.'/snapshot.json';$lockPath=$cacheDir.'/snapshot.lock';$read=static fn()=>news_read_json($path);
    $cache=$read();
    if(!$cache && $seedPath){$seed=news_read_json($seedPath);if($seed&&isset($seed['items'],$seed['updated_at'])){$group=[];foreach($seed['items'] as $item){$id=(string)($item['_sourceId']??'');if(!$id){foreach($sources as $s)if(($s['name']??'')===($item['source']??'')){$id=(string)$s['id'];break;}}if($id&&news_is_fresh_item($item,$now))$group[$id][]=$item;}$cache=['updated_at'=>$seed['updated_at'],'source_items'=>$group,'health'=>$seed['health']??[]];}}
    if($cache&&isset($cache['updated_at'])&&$now-(strtotime((string)$cache['updated_at'])?:0)<NEWS_CACHE_TTL){$out=news_build_envelope($sources,$cache['source_items']??[],$cache['health']??[],(string)$cache['updated_at'],false,$now);return ['status'=>200,'data'=>$out];}
    $lock=@fopen($lockPath,'c');if(!$lock){if($cache){$out=news_build_envelope($sources,$cache['source_items']??[],$cache['health']??[],(string)$cache['updated_at'],true,$now);return ['status'=>200,'data'=>$out];}return ['status'=>503,'data'=>news_error_envelope($sources)];}
    if(!flock($lock,LOCK_EX|LOCK_NB)){fclose($lock);if($cache&&news_has_items($cache,$now))return ['status'=>200,'data'=>news_build_envelope($sources,$cache['source_items']??[],$cache['health']??[],(string)$cache['updated_at'],true,$now)];return ['status'=>503,'data'=>news_error_envelope($sources)];}
    try{
        $cache=$read()??$cache;
        if($cache&&isset($cache['updated_at'])&&$now-(strtotime((string)$cache['updated_at'])?:0)<NEWS_CACHE_TTL)return ['status'=>200,'data'=>news_build_envelope($sources,$cache['source_items']??[],$cache['health']??[],(string)$cache['updated_at'],false,$now)];
        $results=($fetch??'news_http_fetch_all')($sources);$sourceItems=$cache['source_items']??[];$health=$cache['health']??[];$success=0;
        foreach($sources as $source){$id=(string)$source['id'];if(empty($source['enabled'])||empty($source['reuseAllowed']))continue;$result=$results[$id]??['ok'=>false,'error'=>'No upstream result'];
            if(!empty($result['ok'])){try{$items=news_parse_feed((string)$result['body'],$source,$now);$sourceItems[$id]=$items;$health[$id]=['lastSuccessAt'=>gmdate(DATE_ATOM,$now),'lastErrorAt'=>null,'status'=>'ok','itemsCount'=>count($items)];$success++;}catch(Throwable){$health[$id]=['lastSuccessAt'=>$health[$id]['lastSuccessAt']??null,'lastErrorAt'=>gmdate(DATE_ATOM,$now),'status'=>!empty($sourceItems[$id])?'stale':'error','itemsCount'=>count($sourceItems[$id]??[])];}}
            else{$health[$id]=['lastSuccessAt'=>$health[$id]['lastSuccessAt']??null,'lastErrorAt'=>gmdate(DATE_ATOM,$now),'status'=>!empty($sourceItems[$id])?'stale':'error','itemsCount'=>count($sourceItems[$id]??[])];}
        }
        $hasItems=false;foreach($sourceItems as $items)if(array_filter($items,'news_is_fresh_item')){$hasItems=true;break;}
        if($success===0){if($cache&&news_has_items($cache,$now)){$cache['health']=$health;news_write_cache($path,$cache);return ['status'=>200,'data'=>news_build_envelope($sources,$sourceItems,$health,(string)$cache['updated_at'],true,$now)];}return ['status'=>503,'data'=>news_error_envelope($sources,$health)];}
        $updatedAt=gmdate(DATE_ATOM,$now);$bundle=['updated_at'=>$updatedAt,'source_items'=>$sourceItems,'health'=>$health];news_write_cache($path,$bundle);
        if(!$hasItems){$data=news_build_envelope($sources,$sourceItems,$health,$updatedAt,false,$now);return ['status'=>200,'data'=>$data];}
        return ['status'=>200,'data'=>news_build_envelope($sources,$sourceItems,$health,$updatedAt,false,$now)];
    }finally{flock($lock,LOCK_UN);fclose($lock);}
}

function news_has_items(array $cache, ?int $now = null): bool {
    foreach(($cache['source_items']??[]) as $items)foreach($items as $item)if(news_is_fresh_item($item,$now))return true;
    return false;
}

function news_error_envelope(array $sources, array $health = []): array {
    $envelope=news_build_envelope($sources,[], $health, '', true);
    $envelope['updated_at']=null;$envelope['stale']=false;$envelope['error']='News temporarily unavailable';return $envelope;
}

if(defined('NEWS_LIBRARY_ONLY'))return;
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
if(($_SERVER['REQUEST_METHOD']??'GET')!=='GET'){http_response_code(405);header('Allow: GET');header('Cache-Control: no-store');echo json_encode(['error'=>'Method not allowed']);exit;}
$action=(string)($_GET['action']??'feed');if(!in_array($action,['feed','sources'],true)){http_response_code(400);header('Cache-Control: no-store');echo json_encode(['error'=>'Unsupported action']);exit;}
try{$sources=news_sources();$result=news_response(news_private_cache_dir(),$sources,null,null,NEWS_STATIC_SNAPSHOT);http_response_code($result['status']);header($result['data']['stale']?'Cache-Control: no-store':'Cache-Control: public, max-age=60');if($result['status']===503)header('Retry-After: 60');echo json_encode($result['data'],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);}
catch(Throwable){http_response_code(503);header('Cache-Control: no-store');header('Retry-After: 60');echo json_encode(['error'=>'News temporarily unavailable','updated_at'=>null,'stale'=>false,'items'=>[],'sources'=>[],'enabled_count'=>0,'available_count'=>0],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);}
