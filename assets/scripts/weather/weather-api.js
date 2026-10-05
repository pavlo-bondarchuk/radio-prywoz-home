import {WEATHER_LOCATION, storage, historyRange} from "./weather-utils.js?v=20261004-polish";
const forecastTTL=15*60e3,historyTTL=60*60e3,warningsTTL=10*60e3,airTTL=10*60e3;
async function cached(key,ttl,request){
  const hit=storage.get(key,ttl);
  if(hit)return {data:hit,stale:hit.stale===true,cached:true};
  try{const data=await request();if(!data.stale)storage.set(key,data);return {data,stale:data.stale===true}}
  catch(error){let previous;try{previous=JSON.parse(localStorage.getItem(key))?.data}catch{}if(previous)return {data:previous,stale:true};throw error}
}
const json=async url=>{const r=await fetch(url,{headers:{Accept:"application/json"},signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error("Weather HTTP "+r.status);return r.json()};
const locationParams={latitude:WEATHER_LOCATION.latitude,longitude:WEATHER_LOCATION.longitude,timezone:WEATHER_LOCATION.timezone,timeformat:"unixtime"};
export function fetchForecast(){
  const u=new URL("https://api.open-meteo.com/v1/forecast");
  u.search=new URLSearchParams({...locationParams,forecast_days:"14",
    current:"temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day",
    hourly:"temperature_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day",
    daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,sunrise,sunset,daylight_duration,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max"});
  return cached("prywoz-weather-forecast-epoch-v1",forecastTTL,async()=>{const data=await json(u);if(!Number.isFinite(data.current?.time)||!Array.isArray(data.hourly?.time)||!Array.isArray(data.daily?.time))throw new Error("Invalid forecast");return data});
}
export function fetchHistory(){
  const {start,end}=historyRange(),u=new URL("https://historical-forecast-api.open-meteo.com/v1/forecast");
  u.search=new URLSearchParams({...locationParams,start_date:start,end_date:end,daily:"temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,wind_speed_10m_max"});
  return cached("prywoz-weather-history-epoch-"+end,historyTTL,async()=>{const data=await json(u);if(!Array.isArray(data.daily?.time))throw new Error("Invalid history");return data});
}
export function fetchWarnings(){return cached("prywoz-weather-warnings-v2",warningsTTL,async()=>{const data=await json("https://danepubliczne.imgw.pl/api/data/warningsmeteo");if(!Array.isArray(data)||data.some(w=>!w||!Array.isArray(w.teryt)))throw new Error("Invalid warnings");return data})}
export function fetchAir(){return cached("prywoz-weather-air-v3",airTTL,async()=>{const data=await json("./api/weather.php?source=air");if(!data.statusCode||!data.pollutants)throw new Error("Invalid air quality");return data})}
export const TTL={forecast:forecastTTL,history:historyTTL,warnings:warningsTTL,air:airTTL,stations:864e5};
