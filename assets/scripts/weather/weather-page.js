import{fetchForecast,fetchHistory,fetchWarnings,fetchAir}from"./weather-api.js?v=20261004-2";
import{renderForecast,renderHistory,renderWarnings,renderAir,error}from"./weather-render.js?v=20261004-units-footer";
import{applyWeatherTranslations,t}from"./weather-i18n.js?v=20261004-units-footer";

let forecastData=null,historyData=null,warningsData=null,airData=null,historyDays=14;
const notice=document.querySelector("[data-weather-notice]");

const renderAll=()=>{
  applyWeatherTranslations();
  if(forecastData)renderForecast(forecastData);
  if(historyData)renderHistory(historyData,historyDays);
  if(warningsData)renderWarnings(warningsData);
  if(airData)renderAir(airData);
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
  if(results.some(x=>x.status==="fulfilled"&&x.value.stale)){notice.hidden=false;notice.textContent=t("stale")}
  if(f.status==="fulfilled"){forecastData=f.value.data;renderForecast(forecastData)}else{error("[data-weather-current]",t("forecastError"));["[data-weather-metrics]","[data-weather-hourly]","[data-weather-daily]","[data-weather-chart]","[data-weather-sun]"].forEach(selector=>error(selector,t("temporaryUnavailable")))}
  if(h.status==="fulfilled"){historyData=h.value.data;renderHistory(historyData,historyDays)}else error("[data-weather-history]",t("historyError"));
  if(w.status==="fulfilled"){warningsData=w.value.data;renderWarnings(warningsData)}else error("[data-weather-warnings]",t("warningError"));
  if(a.status==="fulfilled"){airData=a.value.data;renderAir(airData)}else error("[data-weather-air]",t("airError"));
});

document.querySelectorAll("[data-history-range]").forEach(button=>button.addEventListener("click",()=>{
  historyDays=Number(button.dataset.historyRange);
  document.querySelectorAll("[data-history-range]").forEach(item=>item.classList.toggle("is-active",item===button));
  if(historyData)renderHistory(historyData,historyDays);
}));
document.addEventListener("prywoz:language-change",()=>{renderAll();if(!notice.hidden)notice.textContent=t("stale")});
