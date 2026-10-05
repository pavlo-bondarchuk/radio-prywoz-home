import assert from 'node:assert/strict';
import {historyRange,timeLabel,openMeteoDailyDate,currentHourIndex,uvCategory,getWeatherCondition,weatherIcon,n,lodzWarnings} from '../assets/scripts/weather/weather-utils.js';
import {t} from '../assets/scripts/weather/weather-i18n.js?v=20261004-polish';
globalThis.localStorage={getItem:()=> 'pl'};
const epoch=iso=>Date.parse(iso)/1000;
let baseline;
for(const zone of ['Europe/Warsaw','Europe/Kyiv','America/Los_Angeles']){
  process.env.TZ=zone;
  const result={
    hour:timeLabel(epoch('2026-10-04T19:45:00Z')),
    range:historyRange(new Date('2026-10-04T22:30:00Z')),
    index:currentHourIndex([100,200,300],250),
    spring:[timeLabel(epoch('2026-03-29T00:00:00Z')),timeLabel(epoch('2026-03-29T01:00:00Z'))],
    autumn:[timeLabel(epoch('2026-10-25T00:00:00Z')),timeLabel(epoch('2026-10-25T01:00:00Z'))],
  };
  baseline??=result;assert.deepEqual(result,baseline);
}
assert.equal(baseline.hour,'21:45');
assert.deepEqual(baseline.range,{start:'2026-09-05',end:'2026-10-04'});
assert.deepEqual(baseline.spring,['01:00','03:00']);
assert.deepEqual(baseline.autumn,['02:00','02:00']);
assert.equal(baseline.index,1);
assert.equal(openMeteoDailyDate(epoch('2026-10-03T22:00:00Z'),7200),'2026-10-04');
assert.equal(timeLabel(null),'—');assert.equal(n(null),null);
assert.deepEqual([0,2,3,5,6,7,8,10,11,null].map(uvCategory),['uvLow','uvLow','uvModerate','uvModerate','uvHigh','uvHigh','uvVeryHigh','uvVeryHigh','uvExtreme','unavailable']);
assert.equal(getWeatherCondition(0,false).icon,'clear-night');
assert.notEqual(weatherIcon('clear-day'),weatherIcon('clear-night'));
assert.deepEqual(lodzWarnings([{teryt:['1061']},{teryt:['1062'],tresc:'Łódź'},{teryt:['10610']},{teryt:'1061'}]),[{teryt:['1061']}]);
for(const language of ['uk','pl','ru']){
  globalThis.localStorage.getItem=()=>language;
  for(const key of ['city','country','uvLow','uvModerate','uvHigh','uvVeryHigh','uvExtreme','lineChartLabel','chartTable','warningsTitle','sourceForecast','airUnknown'])assert.notEqual(t(key),key);
}
console.log('Weather timezone, DST, daily dates, UV, icons, TERYT and translations: PASS');
const nodes=new Map();
globalThis.document={querySelector(selector){if(!nodes.has(selector))nodes.set(selector,{innerHTML:'',insertAdjacentHTML(_position,text){this.innerHTML+=text}});return nodes.get(selector)}};
const {renderAir,renderWarnings}=await import('../assets/scripts/weather/weather-render.js');
for(const lang of ['uk','pl','ru']){
  globalThis.localStorage.getItem=()=>lang;
  renderAir({statusCode:'bad',pollutants:{},station:'Łódź'});
  assert.match(nodes.get('[data-weather-air]').innerHTML,/air-status--bad/);
  assert.ok(nodes.get('[data-weather-air]').innerHTML.includes(t('airBad')));
}
renderWarnings([{teryt:['1061'],nazwa_zdarzenia:'Lodz warning',tresc:'<script>unsafe</script>'},{teryt:['1062'],nazwa_zdarzenia:'Not city'}]);
assert.match(nodes.get('[data-weather-warnings]').innerHTML,/Lodz warning/);
assert.doesNotMatch(nodes.get('[data-weather-warnings]').innerHTML,/Not city|<script>/);
renderWarnings({error:true});assert.ok(nodes.get('[data-weather-warnings]').innerHTML.includes(t('warningError')));
const entries=new Map();
globalThis.localStorage={getItem:key=>entries.get(key)||null,setItem:(key,value)=>entries.set(key,value)};
const {fetchForecast,fetchHistory,fetchAir,fetchWarnings}=await import('../assets/scripts/weather/weather-api.js');
const requests=[];
globalThis.fetch=async url=>{
  requests.push(String(url));
  if(String(url).includes('source=air'))throw Error('GIOS offline');
  if(String(url).includes('warningsmeteo'))return{ok:true,json:async()=>({error:true})};
  return{ok:true,json:async()=>({current:{time:100},hourly:{time:[100]},daily:{time:[100]}})};
};
const results=await Promise.allSettled([fetchForecast(),fetchHistory(),fetchAir(),fetchWarnings()]);
assert.deepEqual(results.map(r=>r.status),['fulfilled','fulfilled','rejected','rejected']);
for(const url of requests.filter(u=>u.includes('open-meteo'))){assert.equal(new URL(url).searchParams.get('timeformat'),'unixtime');assert.equal(new URL(url).searchParams.get('timezone'),'Europe/Warsaw')}
assert.ok(new URL(requests[0]).searchParams.get('hourly').includes('is_day'));
console.log('AQ rendering, warning scope/escaping, independent source failures and API contract: PASS');
