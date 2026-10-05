import{n,temp,dateLabel,timeLabel,getWeatherCondition,weatherIcon,openMeteoDailyDate,currentHourIndex,uvCategory,escapeHTML,lodzWarnings}from"./weather-utils.js?v=20261004-polish";
import{t}from"./weather-i18n.js?v=20261004-polish";
const q=s=>document.querySelector(s),safe=v=>v??"—",metric=(name,value,detail="")=>`<article class="weather-metric"><span>${name}</span><strong>${value}</strong>${detail?`<small>${detail}</small>`:""}</article>`;

export function renderForecast(d){
  const c=d.current||{},h=d.hourly||{},daily=d.daily||{},cond=getWeatherCondition(c.weather_code,c.is_day===1);
  q("[data-weather-updated]").textContent=t("updatedAt",{time:timeLabel(c.time)});
  q("[data-weather-current]").innerHTML=`<div><span class="weather-location">${t("city")}, ${t("country")}</span><div class="weather-now"><span class="weather-now__icon">${weatherIcon(cond.icon,cond.label)}</span><strong>${temp(c.temperature_2m)}</strong><div><h2 id="weather-now-title">${cond.label}</h2><p>${t("feelsLike")} ${temp(c.apparent_temperature)}</p><p>${t("todayRange")}: ${temp(daily.temperature_2m_min?.[0])} / ${temp(daily.temperature_2m_max?.[0])}</p></div></div></div>`;
  const nowIndex=currentHourIndex(h.time),vis=n(h.visibility?.[nowIndex]);
  q("[data-weather-metrics]").innerHTML=[metric(t("precipitation"),`${Math.round(n(h.precipitation_probability?.[nowIndex],0))}%`),metric(t("wind"),`${Math.round(n(c.wind_speed_10m,0))} ${t("speedUnit")}`),metric(t("gusts"),`${Math.round(n(c.wind_gusts_10m,0))} ${t("speedUnit")}`),metric(t("humidity"),`${Math.round(n(c.relative_humidity_2m,0))}%`),metric(t("pressure"),`${Math.round(n(c.surface_pressure,0))} hPa`),metric("UV",n(h.uv_index?.[nowIndex])===null?"—":Math.round(h.uv_index[nowIndex]),t(uvCategory(h.uv_index?.[nowIndex]))),metric(t("visibility"),vis==null?"—":`${Math.round(vis/1000)} ${t("distanceUnit")}`)].join("");
  q("[data-weather-hourly]").innerHTML=(h.time||[]).slice(nowIndex,nowIndex+24).map((value,i)=>{const x=nowIndex+i,w=getWeatherCondition(h.weather_code?.[x],h.is_day?.[x]===1);return`<article class="weather-hour ${i===0?"is-current":""}"><time>${timeLabel(value)}</time>${weatherIcon(w.icon,w.label)}<strong>${temp(h.temperature_2m?.[x])}</strong><span>${t("precipitation")} ${Math.round(n(h.precipitation_probability?.[x],0))}%</span><small>${Math.round(n(h.wind_speed_10m?.[x],0))} ${t("speedUnit")}</small></article>`}).join("");
  q("[data-weather-daily]").innerHTML=(daily.time||[]).map((value,i)=>{const w=getWeatherCondition(daily.weather_code?.[i],true);return`<article class="weather-day"><time>${dateLabel(openMeteoDailyDate(value,d.utc_offset_seconds))}</time>${weatherIcon(w.icon,w.label)}<span>${w.label}</span><strong>${temp(daily.temperature_2m_min?.[i])} / <em>${temp(daily.temperature_2m_max?.[i])}</em></strong><small>${t("precipitation")} ${Math.round(n(daily.precipitation_probability_max?.[i],0))}% · ${Math.round(n(daily.wind_speed_10m_max?.[i],0))} ${t("speedUnit")}</small></article>`}).join("");
  renderLineChart(h.time?.slice(nowIndex,nowIndex+24)||[],h.temperature_2m?.slice(nowIndex,nowIndex+24)||[],h.apparent_temperature?.slice(nowIndex,nowIndex+24)||[],q("[data-weather-chart]"),t("temperature"),t("feelsLike"),"time");
  const sunrise=daily.sunrise?.[0],sunset=daily.sunset?.[0],duration=n(daily.daylight_duration?.[0],0);
  q("[data-weather-sun]").innerHTML=`<dl class="weather-facts"><div><dt>${t("sunrise")}</dt><dd>${timeLabel(sunrise)}</dd></div><div><dt>${t("sunset")}</dt><dd>${timeLabel(sunset)}</dd></div><div><dt>${t("daylight")}</dt><dd>${Math.floor(duration/3600)} ${t("hourShort")} ${Math.round(duration%3600/60)} ${t("minuteShort")}</dd></div></dl>`;
}

export function renderLineChart(labels,first,second,root,firstLabel,secondLabel){
  const values=[...first,...second].map(v=>n(v)).filter(v=>v!==null);
  if(!values.length){root.textContent=t("unavailable");return}
  const low=Math.floor(Math.min(...values))-2,high=Math.ceil(Math.max(...values))+2;
  const width=Math.max(280,Math.min(720,(root.clientWidth||document.querySelector(".weather-main .container").clientWidth-40))),right=width-24;
  const x=i=>48+i*(right-48)/Math.max(1,labels.length-1),y=v=>210-(v-low)/(high-low)*180;
  const series=[first,second],names=[firstLabel,secondLabel];
  const paths=series.map((data,j)=>{let connected=false;return '<path class="weather-line weather-line--'+j+'" d="'+data.map((v,i)=>{if(n(v)===null){connected=false;return ""}const command=connected?"L":"M";connected=true;return command+x(i)+","+y(v)}).join(" ")+'"/>'}).join("");
  const ticks=Array.from({length:5},(_,i)=>{const v=low+(high-low)*i/4;return '<line class="weather-grid" x1="48" x2="'+right+'" y1="'+y(v)+'" y2="'+y(v)+'"/><text x="40" y="'+(y(v)+4)+'" text-anchor="end">'+Math.round(v)+'°</text>'}).join("");
  const hours=labels.map((v,i)=>i%(width<480?8:4)===0||i===labels.length-1?'<text x="'+x(i)+'" y="234" text-anchor="middle">'+timeLabel(v)+'</text>':"").join("");
  const points=series.map((data,j)=>data.map((v,i)=>n(v)===null?"":'<circle class="weather-point weather-line--'+j+'" cx="'+x(i)+'" cy="'+y(v)+'" r="4" tabindex="0" aria-label="'+escapeHTML(timeLabel(labels[i])+' · '+names[j]+': '+temp(v))+'" data-chart-value="'+escapeHTML(timeLabel(labels[i])+' · '+names[j]+': '+temp(v))+'"><title>'+escapeHTML(timeLabel(labels[i])+' · '+names[j]+': '+temp(v))+'</title></circle>').join("")).join("");
  const rows=labels.map((v,i)=>'<tr><th scope="row">'+timeLabel(v)+'</th><td>'+temp(first[i])+'</td><td>'+temp(second[i])+'</td></tr>').join("");
  root.innerHTML='<svg class="weather-line-chart" viewBox="0 0 '+width+' 250" role="group" aria-label="'+t("lineChartLabel")+'"><text x="12" y="17">°C</text>'+ticks+hours+paths+points+'</svg><output class="weather-chart-value" aria-live="polite">'+t("lineChartLabel")+'</output><div class="weather-legend"><span>'+firstLabel+'</span><span>'+secondLabel+'</span></div><details class="weather-chart-table"><summary>'+t("chartTable")+'</summary><div><table><caption>'+t("lineChartLabel")+'</caption><thead><tr><th scope="col">'+t("hour")+'</th><th scope="col">'+firstLabel+'</th><th scope="col">'+secondLabel+'</th></tr></thead><tbody>'+rows+'</tbody></table></div></details>';
  root.querySelectorAll("[data-chart-value]").forEach(point=>{const show=()=>{root.querySelector("output").textContent=point.dataset.chartValue};point.addEventListener("focus",show);point.addEventListener("mouseenter",show);point.addEventListener("click",show)});
}

function renderBarChart(labels,first,second,root,firstLabel,secondLabel,labelType="date"){
  if(!first.length){root.textContent=t("unavailable");return}
  const values=[...first,...second].map(v=>n(v)).filter(v=>v!==null),floor=Math.min(0,Math.floor(Math.min(...values))),ceiling=Math.max(1,Math.ceil(Math.max(...values))),span=ceiling-floor||1;
  const label=value=>labelType==="time"?timeLabel(value):dateLabel(value,{day:"2-digit",month:"2-digit"});
  const bars=labels.map((value,i)=>{const a=n(first[i],0),b=n(second[i],0),ah=Math.max(4,(a-floor)/span*100),bh=Math.max(4,(b-floor)/span*100);return`<div class="weather-bar-group"><div class="weather-bars"><span class="weather-bar weather-bar--first" style="--bar-height:${ah}%" title="${firstLabel}: ${temp(a)}"><b>${temp(a)}</b></span><span class="weather-bar weather-bar--second" style="--bar-height:${bh}%" title="${secondLabel}: ${temp(b)}"><b>${temp(b)}</b></span></div><small>${label(value)}</small></div>`}).join("");
  root.innerHTML=`<div class="weather-bar-chart" role="img" aria-label="${t("chartLabel")}"><div class="weather-bar-plot">${bars}</div></div><div class="weather-legend"><span>${firstLabel}</span><span>${secondLabel}</span></div>`;
}

export function renderHistory(d,days=14){
  const x=d.daily||{},slice=a=>a?.slice(-days)||[],max=slice(x.temperature_2m_max),min=slice(x.temperature_2m_min),mean=slice(x.temperature_2m_mean),rain=slice(x.precipitation_sum),labels=slice(x.time).map(value=>openMeteoDailyDate(value,d.utc_offset_seconds));
  if(!max.some(v=>n(v)!==null)||!min.some(v=>n(v)!==null)){error("[data-weather-history]",t("historyError"));return}
  renderBarChart(labels,max,min,q("[data-weather-history]"),t("chartMax"),t("chartMin"));
  q("[data-weather-history]").insertAdjacentHTML("beforeend",`<dl class="weather-summary"><div><dt>${t("maximum")}</dt><dd>${temp(Math.max(...max.filter(v=>n(v)!==null)))}</dd></div><div><dt>${t("minimum")}</dt><dd>${temp(Math.min(...min.filter(v=>n(v)!==null)))}</dd></div><div><dt>${t("average")}</dt><dd>${temp(mean.some(v=>n(v)!==null)?mean.filter(v=>n(v)!==null).reduce((a,b)=>a+b,0)/mean.filter(v=>n(v)!==null).length:null)}</dd></div><div><dt>${t("rainyDays")}</dt><dd>${rain.filter(v=>v>0).length}</dd></div></dl>`);
}

export function renderWarnings(items){
  const root=q("[data-weather-warnings]");
  if(!Array.isArray(items)){error("[data-weather-warnings]",t("warningError"));return}
  const matches=lodzWarnings(items);
  root.innerHTML=matches.length?matches.map(w=>'<article class="weather-warning"><small>'+t("warningLanguage")+'</small><strong lang="pl">'+escapeHTML(w.nazwa_zdarzenia)+'</strong><span>'+t("validUntil",{date:escapeHTML(w.obowiazuje_do||"—")})+'</span><p lang="pl">'+escapeHTML(String(w.tresc||"").slice(0,600))+'</p></article>').join(""):'<p class="weather-ok">'+t("noWarnings")+'</p>';
  root.insertAdjacentHTML("beforeend",'<a class="weather-action" href="https://meteo.imgw.pl/" target="_blank" rel="noopener">'+t("checkImgw")+'</a>');
}
export function renderAir(data){
  const root=q("[data-weather-air]"),p=data.pollutants||{};
  const keys={"very-good":"airVeryGood",good:"airGood",moderate:"airModerate",sufficient:"airSufficient",bad:"airBad","very-bad":"airVeryBad",unknown:"airUnknown"};
  const code=Object.hasOwn(keys,data.statusCode)?data.statusCode:"unknown";
  const advice=["good","very-good"].includes(code)?"airGoodAdvice":code==="unknown"?"unavailable":"airCautionAdvice";
  root.innerHTML='<strong class="weather-air-status air-status--'+code+'">'+t(keys[code])+'</strong><p>'+t(advice)+'</p><div class="weather-pollutants">'+["PM2.5","PM10","NO2","O3"].map(k=>metric(k,n(p[k]?.value)===null?"—":p[k].value+" µg/m³")).join("")+'</div><small>'+t("source")+': GIOŚ · <span lang="pl">'+escapeHTML(data.station||t("nearestStation"))+'</span></small>';
}
export const error=(selector,text)=>{q(selector).innerHTML='<p class="weather-error">'+escapeHTML(text)+'</p>'};
