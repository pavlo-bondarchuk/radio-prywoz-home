import{fetchForecast,fetchHistory,fetchWarnings,fetchAir}from"./weather-api.js?v=20261004-polish";
import{renderForecast,renderHistory,renderWarnings,renderAir,error}from"./weather-render.js?v=20261004-polish";
import{applyWeatherTranslations,t}from"./weather-i18n.js?v=20261004-polish";

let forecastData=null,historyData=null,warningsData=null,airData=null,historyDays=14;
const failed=new Set();
const renderFailures=()=>{for(const name of failed){if(name==='forecast'){error('[data-weather-current]',t('forecastError'));document.querySelector('[data-weather-updated]').textContent=t('unavailable');['metrics','hourly','daily','chart','sun'].forEach(part=>error('[data-weather-'+part+']',t('temporaryUnavailable')))}else error('[data-weather-'+name+']',t({history:'historyError',warnings:'warningError',air:'airError'}[name]))}};
const notice=document.querySelector("[data-weather-notice]");

const renderAll=()=>{
  applyWeatherTranslations();
  if(forecastData)renderForecast(forecastData);
  if(historyData)renderHistory(historyData,historyDays);
  if(warningsData)renderWarnings(warningsData);
  if(airData)renderAir(airData);
  renderFailures();
};

const activateTab=(name,focus=false)=>{
  document.querySelectorAll("[data-weather-tab]").forEach(button=>{
    const active=button.dataset.weatherTab===name;
    button.setAttribute("aria-selected",String(active));
    button.tabIndex=active?0:-1;
    if(active&&focus)button.focus();
  });
  document.querySelectorAll("[data-weather-panel]").forEach(panel=>{panel.hidden=panel.dataset.weatherPanel!==name});
};

const tabs=[...document.querySelectorAll("[data-weather-tab]")];
tabs.forEach((button,index)=>{
  button.addEventListener("click",()=>activateTab(button.dataset.weatherTab));
  button.addEventListener("keydown",event=>{
    const delta=event.key==="ArrowRight"?1:event.key==="ArrowLeft"?-1:0;
    if(!delta)return;
    event.preventDefault();
    const next=tabs[(index+delta+tabs.length)%tabs.length];
    activateTab(next.dataset.weatherTab,true);
  });
});

applyWeatherTranslations();
Promise.allSettled([fetchForecast(),fetchHistory(),fetchWarnings(),fetchAir()]).then(results=>{
  const[f,h,w,a]=results;
  results.forEach((result,i)=>{if(result.status==="rejected")failed.add(["forecast","history","warnings","air"][i])});
  if(results.some(x=>x.status==="fulfilled"&&x.value.stale)){notice.hidden=false;notice.textContent=t("stale")}
  if(f.status==="fulfilled"){forecastData=f.value.data;renderForecast(forecastData)}else{error("[data-weather-current]",t("forecastError"));["[data-weather-metrics]","[data-weather-hourly]","[data-weather-daily]","[data-weather-chart]","[data-weather-sun]"].forEach(selector=>error(selector,t("temporaryUnavailable")))}
  if(h.status==="fulfilled"){historyData=h.value.data;renderHistory(historyData,historyDays)}else error("[data-weather-history]",t("historyError"));
  if(w.status==="fulfilled"){warningsData=w.value.data;renderWarnings(warningsData)}else error("[data-weather-warnings]",t("warningError"));
  if(a.status==="fulfilled"){airData=a.value.data;renderAir(airData)}else error("[data-weather-air]",t("airError"));
  renderFailures();
});

document.querySelectorAll("[data-history-range]").forEach(button=>button.addEventListener("click",()=>{
  historyDays=Number(button.dataset.historyRange);
  document.querySelectorAll("[data-history-range]").forEach(item=>item.classList.toggle("is-active",item===button));
  if(historyData)renderHistory(historyData,historyDays);
}));
document.addEventListener("prywoz:language-change",()=>{renderAll();if(!notice.hidden)notice.textContent=t("stale")});
let resizeTimer;
window.addEventListener("resize",()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(forecastData)renderForecast(forecastData)},100)});
