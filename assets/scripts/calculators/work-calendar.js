import { getLanguage, getLocale, t, applyTranslations, bindLanguageChange } from "./calculator-i18n.js";
import { getWarsawDateParts, formatWarsawDate, trackCalculatorEvent } from "./calculator-utils.js";

export const WARSAW_TIME_ZONE = "Europe/Warsaw";
export const calendarTranslations = {
  uk: {home:"Головна",breadcrumbs:"Навігаційний шлях",calendarTitle:"Робочий календар Польщі",eyebrow:"Плануйте час у Польщі",intro:"Робочі дні та години, державні свята, торгові неділі й довгі вихідні.",monthLabel:"Місяць",yearLabel:"Рік",hoursLegend:"Тривалість робочого дня",hoursPerDay:"Годин на день",standardHours:"Стандартно · 8 год",customHours:"Власний графік",workingDays:"Робочі дні",workingHours:"Робочі години",estimatedHours:"Орієнтовні години",hoursShort:"год",dayShort:"день",weekendDays:"Вихідні дні",holidays:"Державні свята",tradingTitle:"Торгові неділі 2026",nextTrading:"Наступна торгова неділя",inDays:"через {days} дн.",noUpcoming:"У 2026 році більше немає торгових неділь.",nextHolidayTitle:"Наступний офіційний вихідний",noUpcomingHoliday:"У 2026 році більше немає наступних офіційних свят.",longWeekendTitle:"Ідеї для довгих вихідних",longWeekendLead:"Це варіанти планування відпустки, а не додаткові офіційні вихідні.",sourcesTitle:"Джерела та актуальність",selectionLabel:"Вибір місяця та року",summaryLabel:"Підсумок місяця",relatedLabel:"Корисні сервіси",calendarError:"Не вдалося завантажити дані календаря. Спробуйте оновити сторінку.",checked:"Дані календаря перевірено {date}.",sourceLabour:"Кодекс праці Польщі, стаття 130",sourceTradeLaw:"Закон про обмеження торгівлі в неділю",sourceTrading:"Торгові неділі 2026 · Zielona Linia",sourcePip:"PIP: вихідний за свято в суботу",disclaimer:"Норма робочого часу для стандартного графіка; фактичний графік може відрізнятися. День відпочинку за суботнє свято визначає роботодавець.",saturdayNote:"Якщо свято припадає на суботу, роботодавець визначає інший день відпочинку в межах розрахункового періоду.",longWeekendSuggestion:"{date}: святковий день у {weekday}. Якщо використати {leave}, можна отримати {days} відпочинку.",leaveNone:"0",leaveOne:"1",dayOff:"Офіційне свято",weekend:"Вихідний",working:"Робочий день",trading:"Торгова неділя",today:"Сьогодні",legend:"Позначення календаря",weekdayMon:"Пн",weekdayTue:"Вт",weekdayWed:"Ср",weekdayThu:"Чт",weekdayFri:"Пт",weekdaySat:"Сб",weekdaySun:"Нд",relatedSalary:"Калькулятор зарплати",relatedRent:"Калькулятор оренди",relatedCurrency:"Курси валют",relatedWeather:"Погода",month1:"Січень",month2:"Лютий",month3:"Березень",month4:"Квітень",month5:"Травень",month6:"Червень",month7:"Липень",month8:"Серпень",month9:"Вересень",month10:"Жовтень",month11:"Листопад",month12:"Грудень",pageTitle:"Робочий календар Польщі 2026 — свята і торгові неділі | PRYWOZ",pageDescription:"Робочий календар Польщі на 2026 рік: робочі дні та години, державні свята, торгові неділі й довгі вихідні."},
  pl: {home:"Strona główna",breadcrumbs:"Okruszki",calendarTitle:"Kalendarz pracy w Polsce",eyebrow:"Planuj czas w Polsce",intro:"Dni i godziny pracy, święta państwowe, niedziele handlowe i długie weekendy.",monthLabel:"Miesiąc",yearLabel:"Rok",hoursLegend:"Długość dnia pracy",hoursPerDay:"Godzin dziennie",standardHours:"Standardowo · 8 godz.",customHours:"Własny grafik",workingDays:"Dni robocze",workingHours:"Godziny pracy",estimatedHours:"Szacunkowe godziny",hoursShort:"godz.",dayShort:"dzień",weekendDays:"Dni wolne",holidays:"Święta państwowe",tradingTitle:"Niedziele handlowe 2026",nextTrading:"Najbliższa niedziela handlowa",inDays:"za {days} dni",noUpcoming:"W 2026 roku nie ma już niedziel handlowych.",nextHolidayTitle:"Najbliższe święto ustawowe",noUpcomingHoliday:"W 2026 roku nie ma już kolejnych świąt ustawowych.",longWeekendTitle:"Pomysły na długie weekendy",longWeekendLead:"To propozycje planowania urlopu, a nie dodatkowe dni ustawowo wolne.",sourcesTitle:"Źródła i aktualność",selectionLabel:"Wybór miesiąca i roku",summaryLabel:"Podsumowanie miesiąca",relatedLabel:"Przydatne usługi",calendarError:"Nie udało się załadować danych kalendarza. Odśwież stronę.",checked:"Dane kalendarza sprawdzono {date}.",sourceLabour:"Kodeks pracy, art. 130",sourceTradeLaw:"Ustawa o ograniczeniu handlu w niedziele",sourceTrading:"Niedziele handlowe 2026 · Zielona Linia",sourcePip:"PIP: wolne za święto w sobotę",disclaimer:"Norma czasu pracy dla standardowego grafiku; rzeczywisty harmonogram może się różnić. Dzień wolny za święto w sobotę wyznacza pracodawca.",saturdayNote:"Jeśli święto przypada w sobotę, pracodawca wyznacza inny dzień wolny w okresie rozliczeniowym.",longWeekendSuggestion:"{date}: święto wypada w {weekday}. Wykorzystaj {leave}, aby zyskać {days} odpoczynku.",leaveNone:"0",leaveOne:"1",dayOff:"Święto ustawowe",weekend:"Dzień wolny",working:"Dzień roboczy",trading:"Niedziela handlowa",today:"Dzisiaj",legend:"Oznaczenia kalendarza",weekdayMon:"Pn",weekdayTue:"Wt",weekdayWed:"Śr",weekdayThu:"Cz",weekdayFri:"Pt",weekdaySat:"Sb",weekdaySun:"Nd",relatedSalary:"Kalkulator wynagrodzenia",relatedRent:"Kalkulator kosztów najmu",relatedCurrency:"Kursy walut",relatedWeather:"Pogoda",month1:"Styczeń",month2:"Luty",month3:"Marzec",month4:"Kwiecień",month5:"Maj",month6:"Czerwiec",month7:"Lipiec",month8:"Sierpień",month9:"Wrzesień",month10:"Październik",month11:"Listopad",month12:"Grudzień",pageTitle:"Kalendarz pracy w Polsce 2026 — święta i niedziele handlowe | PRYWOZ",pageDescription:"Kalendarz pracy w Polsce na 2026 rok: dni i godziny pracy, święta państwowe, niedziele handlowe i długie weekendy."},
  ru: {home:"Главная",breadcrumbs:"Навигационная цепочка",calendarTitle:"Рабочий календарь Польши",eyebrow:"Планируйте время в Польше",intro:"Рабочие дни и часы, государственные праздники, торговые воскресенья и длинные выходные.",monthLabel:"Месяц",yearLabel:"Год",hoursLegend:"Продолжительность рабочего дня",hoursPerDay:"Часов в день",standardHours:"Стандартно · 8 ч",customHours:"Свой график",workingDays:"Рабочие дни",workingHours:"Рабочие часы",estimatedHours:"Ориентировочные часы",hoursShort:"ч",dayShort:"день",weekendDays:"Выходные дни",holidays:"Государственные праздники",tradingTitle:"Торговые воскресенья 2026",nextTrading:"Ближайшее торговое воскресенье",inDays:"через {days} дн.",noUpcoming:"В 2026 году торговых воскресений больше нет.",nextHolidayTitle:"Следующий официальный выходной",noUpcomingHoliday:"В 2026 году следующих официальных праздников больше нет.",longWeekendTitle:"Идеи для длинных выходных",longWeekendLead:"Это варианты планирования отпуска, а не дополнительные официальные выходные.",sourcesTitle:"Источники и актуальность",selectionLabel:"Выбор месяца и года",summaryLabel:"Итоги месяца",relatedLabel:"Полезные сервисы",calendarError:"Не удалось загрузить данные календаря. Обновите страницу.",checked:"Данные календаря проверены {date}.",sourceLabour:"Трудовой кодекс Польши, статья 130",sourceTradeLaw:"Закон об ограничении торговли по воскресеньям",sourceTrading:"Торговые воскресенья 2026 · Zielona Linia",sourcePip:"PIP: выходной за праздник в субботу",disclaimer:"Норма рабочего времени для стандартного графика; фактическое расписание может отличаться. День отдыха за субботний праздник определяет работодатель.",saturdayNote:"Если праздник выпадает на субботу, работодатель определяет другой выходной в пределах расчётного периода.",longWeekendSuggestion:"{date}: праздник выпадает на {weekday}. Используйте {leave}, чтобы получить {days} отдыха.",leaveNone:"0",leaveOne:"1",dayOff:"Официальный праздник",weekend:"Выходной",working:"Рабочий день",trading:"Торговое воскресенье",today:"Сегодня",legend:"Обозначения календаря",weekdayMon:"Пн",weekdayTue:"Вт",weekdayWed:"Ср",weekdayThu:"Чт",weekdayFri:"Пт",weekdaySat:"Сб",weekdaySun:"Вс",relatedSalary:"Калькулятор зарплаты",relatedRent:"Калькулятор аренды",relatedCurrency:"Курсы валют",relatedWeather:"Погода",month1:"Январь",month2:"Февраль",month3:"Март",month4:"Апрель",month5:"Май",month6:"Июнь",month7:"Июль",month8:"Август",month9:"Сентябрь",month10:"Октябрь",month11:"Ноябрь",month12:"Декабрь",pageTitle:"Рабочий календарь Польши 2026 — праздники и торговые воскресенья | PRYWOZ",pageDescription:"Рабочий календарь Польши на 2026 год: рабочие дни и часы, государственные праздники, торговые воскресенья и длинные выходные."}
};

const safeLang = lang => ["uk", "pl", "ru"].includes(lang) ? lang : "uk";
const dateParts = date => ({ year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() });
const isoDate = (year, month, day) => `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
const utcDate = iso => new Date(`${iso}T12:00:00Z`);
const weekdayOf = iso => utcDate(iso).getUTCDay();
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

export function getTodayInWarsaw(now = new Date()) {
  if (typeof getWarsawDateParts === "function") return getWarsawDateParts(now);
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: WARSAW_TIME_ZONE, year:"numeric", month:"2-digit", day:"2-digit" }).formatToParts(now);
  const val = key => Number(parts.find(part => part.type === key)?.value);
  return { year:val("year"), month:val("month"), day:val("day") };
}

export function calculateMonth(year, month, calendar, hoursPerDay = 8) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12 || !Number.isFinite(hoursPerDay) || hoursPerDay <= 0) return null;
  const first = new Date(Date.UTC(year, month - 1, 1)), days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const holidays = new Map((calendar?.holidays || []).filter(item => item.date.startsWith(`${year}-`)).map(item => [item.date, item]));
  let weekdays = 0, publicDays = 0, nonSundayHolidays = 0, saturdayHolidays = 0, sundayHolidays = 0;
  for (let day = 1; day <= days; day++) {
    const iso = isoDate(year, month, day), weekday = weekdayOf(iso), holiday = holidays.get(iso);
    if (weekday !== 0 && weekday !== 6) weekdays++;
    if (holiday) {
      publicDays++;
      if (weekday === 0) sundayHolidays++;
      else { nonSundayHolidays++; if (weekday === 6) saturdayHolidays++; }
    }
  }
  return { year, month, daysInMonth:days, weekdays, publicDays, nonSundayHolidays, saturdayHolidays, sundayHolidays, weekendDays:days - weekdays, workingDays:Math.max(0,weekdays - nonSundayHolidays), workingHours:Math.max(0, weekdays * hoursPerDay - nonSundayHolidays * hoursPerDay), theoreticalStandardHours:calendar?.monthlyWorkingHours?.[String(month)] ?? Math.max(0, weekdays * 8 - nonSundayHolidays * 8), firstWeekday:(first.getUTCDay() + 6) % 7 };
}

export function buildMonthCells(year, month, calendar, today = null) {
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lead = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const total = Math.ceil((lead + count) / 7) * 7;
  const holidays = new Map((calendar?.holidays || []).map(item => [item.date, item]));
  const trading = new Set(calendar?.tradingSundays || []);
  return Array.from({length:total}, (_, index) => {
    const day = index - lead + 1;
    if (day < 1 || day > count) return { inMonth:false, day:null, date:null, weekday:index % 7 };
    const date = isoDate(year, month, day), weekday = weekdayOf(date), holiday = holidays.get(date);
    return { inMonth:true, day, date, weekday, weekend:weekday === 0 || weekday === 6, holiday:holiday || null, tradingSunday:trading.has(date), today:today?.year === year && today?.month === month && today?.day === day };
  });
}

export function buildGridRows(cells) {
  return Array.from({length:Math.ceil((cells?.length || 0)/7)},(_,index)=>cells.slice(index*7,index*7+7));
}

export function buildCalendarTableMarkup(cells, lang = "uk") {
  const weekdayKeys=["weekdayMon","weekdayTue","weekdayWed","weekdayThu","weekdayFri","weekdaySat","weekdaySun"];
  const headers=weekdayKeys.map(key=>`<th class="work-calendar-weekday" scope="col">${escapeHTML(tx(key,lang))}</th>`).join("");
  const weeks=buildGridRows(cells).map(week=>`<tr class="work-calendar-week-row">${week.map(cell=>{
    if(!cell.inMonth) return `<td class="work-calendar-day is-empty" aria-hidden="true"></td>`;
    const classes=["work-calendar-day",cell.weekend&&"is-weekend",cell.holiday&&"is-holiday",cell.tradingSunday&&"is-trading",cell.today&&"is-today"].filter(Boolean).join(" ");
    const labels=[cell.holiday&&tx("dayOff",lang),cell.weekend&&tx("weekend",lang),cell.tradingSunday&&tx("trading",lang),cell.today&&tx("today",lang)].filter(Boolean);
    const holidayName=cell.holiday?.name?.[lang]||cell.holiday?.name?.uk;
    const accessible=[localizedDate(cell.date,lang,{day:"numeric",month:"long",year:"numeric"}),holidayName,...labels.filter(label=>label!==tx("dayOff",lang)),!cell.weekend&&!cell.holiday?tx("working",lang):""].filter(Boolean).join(" · ");
    const markers=[cell.holiday&&`<span class="work-calendar-marker marker-holiday">${escapeHTML(tx("dayOff",lang))}</span>`,cell.tradingSunday&&`<span class="work-calendar-marker marker-trading">${escapeHTML(tx("trading",lang))}</span>`,cell.today&&`<span class="work-calendar-marker marker-today">${escapeHTML(tx("today",lang))}</span>`].filter(Boolean).join("");
    return `<td class="${classes}" aria-label="${escapeHTML(accessible)}"${cell.today?' aria-current="date"':""}><span class="work-calendar-day-number">${cell.day}</span>${markers}${cell.holiday?`<span class="work-calendar-holiday-name">${escapeHTML(holidayName)}</span>`:""}</td>`;
  }).join("")}</tr>`).join("");
  return `<thead><tr class="work-calendar-week-row">${headers}</tr></thead><tbody>${weeks}</tbody>`;
}

export function findNextDates(calendar, nowParts) {
  const today = isoDate(nowParts.year, nowParts.month, nowParts.day);
  const nextTrading = (calendar?.tradingSundays || []).find(date => date >= today) || null;
  const nextHoliday = (calendar?.holidays || []).find(item => item.date >= today && weekdayOf(item.date) > 0 && weekdayOf(item.date) < 6) || null;
  return { nextTrading, nextHoliday };
}

export function suggestLongWeekends(calendar, year) {
  const holidays = (calendar?.holidays || []).filter(item => item.date.startsWith(`${year}-`));
  const holidayDates = new Set(holidays.map(item=>item.date)), byDate = new Map(holidays.map(item=>[item.date,item]));
  const dayNumber = iso => Math.floor(utcDate(iso).getTime()/86400000);
  const fromDayNumber = value => new Date(value*86400000).toISOString().slice(0,10);
  const results = new Map();
  holidays.filter(item=>![0,6].includes(weekdayOf(item.date))).forEach(item=>{
    const center=dayNumber(item.date); let best=null;
    for(let start=center-6;start<=center;start++) for(let end=center;end<=center+6;end++) {
      const length=end-start+1; if(length<3||length>7) continue;
      let leave=0;
      for(let day=start;day<=end;day++) {
        const iso=fromDayNumber(day), weekday=weekdayOf(iso);
        if(weekday!==0&&weekday!==6&&!holidayDates.has(iso)) leave++;
      }
      if(leave>2) continue;
      const candidate={date:item.date,holiday:item,weekday:weekdayOf(item.date),leave,days:length,start:fromDayNumber(start),end:fromDayNumber(end)};
      if(!best||candidate.days>best.days||(candidate.days===best.days&&candidate.leave<best.leave)) best=candidate;
    }
    if(best&&(!results.has(`${best.start}:${best.end}`))) results.set(`${best.start}:${best.end}`,best);
  });
  return [...results.values()].sort((a,b)=>a.date.localeCompare(b.date));
}

function tx(key, lang, vars = {}) {
  const template = t(calendarTranslations, key, safeLang(lang));
  return Object.entries(vars).reduce((text,[name,value])=>text.replaceAll(`{${name}}`,String(value)),template);
}
function locale(lang) { return typeof getLocale === "function" ? getLocale(safeLang(lang)) : ({uk:"uk-UA",pl:"pl-PL",ru:"ru-RU"})[safeLang(lang)]; }
function localizedDate(iso, lang, options = { day:"numeric", month:"long" }) {
  if (Object.keys(options).join() === "day,month,year") return formatWarsawDate(utcDate(iso),safeLang(lang));
  return new Intl.DateTimeFormat(locale(lang), { ...options, timeZone:"UTC" }).format(utcDate(iso));
}
function monthName(month, lang) { return tx(`month${month}`,lang); }
function setText(el, value) { if (el) el.textContent = value; }

function getMonthNames(lang) { return Array.from({length:12},(_,index)=>monthName(index + 1,lang)); }
function renderCalendar(root, calendar, year, month, hours, lang, now) {
  const monthHeading = root.querySelector("[data-cal-month-heading]"), grid = root.querySelector("[data-cal-grid]"), summaryRoot = root.querySelector("[data-cal-summary]");
  if (!grid || !summaryRoot) return;
  const stats = calculateMonth(year, month, calendar, hours), cells = buildMonthCells(year, month, calendar, now);
  setText(monthHeading, `${monthName(month,lang)} ${year}`);
  grid.innerHTML = buildCalendarTableMarkup(cells,lang);
  const summary = [[tx("workingDays",lang),stats.workingDays], [hours === 8 ? tx("workingHours",lang) : `${tx("estimatedHours",lang)} · ${hours} ${tx("hoursShort",lang)}/${tx("dayShort",lang)}`,`${stats.workingHours} ${tx("hoursShort",lang)}`], [tx("weekendDays",lang),stats.weekendDays], [tx("holidays",lang),stats.publicDays]];
  summaryRoot.innerHTML = summary.map(([label,value])=>`<article class="calculator-result-card"><span>${escapeHTML(label)}</span><strong>${escapeHTML(String(value))}</strong></article>`).join("");
  const hasSaturday = cells.some(cell=>cell.holiday && cell.weekday===6);
  setText(root.querySelector("[data-cal-saturday-note]"), hasSaturday ? tx("saturdayNote",lang) : "");
  const legend = root.querySelector("[data-cal-legend]");
  if (legend) legend.innerHTML = [["is-weekend","weekend"],["is-holiday","dayOff"],["is-trading","trading"],["is-today","today"]].map(([className,key])=>`<span class="work-calendar-legend-item ${className}"><i aria-hidden="true"></i>${escapeHTML(tx(key,lang))}</span>`).join("");
}

function renderHighlights(root, calendar, lang, now) {
  const { nextTrading, nextHoliday } = findNextDates(calendar, now);
  const tradingList = root.querySelector("[data-cal-trading-list]");
  if (tradingList) tradingList.innerHTML = (calendar.tradingSundays || []).map(date=>`<li>${escapeHTML(localizedDate(date,lang,{day:"numeric",month:"long"}))}</li>`).join("");
  if (nextTrading) {
    const days = Math.max(0, Math.round((Date.UTC(...nextTrading.split("-").map((part,index)=>index===1?Number(part)-1:Number(part))) - Date.UTC(now.year,now.month-1,now.day)) / 86400000));
    setText(root.querySelector("[data-cal-next-trading]"), `${tx("nextTrading",lang)}: ${localizedDate(nextTrading,lang,{day:"numeric",month:"long"})} · ${tx("inDays",lang,{days})}`);
  } else setText(root.querySelector("[data-cal-next-trading]"), tx("noUpcoming",lang));
  const holidayEl = root.querySelector("[data-cal-next-holiday]");
  if (holidayEl) setText(holidayEl, nextHoliday ? `${localizedDate(nextHoliday.date,lang,{day:"numeric",month:"long",year:"numeric"})} · ${nextHoliday.name?.[lang] || nextHoliday.name?.uk || ""}` : tx("noUpcomingHoliday",lang));
  const list = root.querySelector("[data-cal-long-weekends]");
  if (list) list.innerHTML = suggestLongWeekends(calendar,now.year).filter(item=>item.date>=isoDate(now.year,now.month,now.day)).slice(0,4).map(item=>{
    const weekday = new Intl.DateTimeFormat(locale(lang),{weekday:"long",timeZone:"UTC"}).format(utcDate(item.date));
    const days = lang==="pl" ? `${item.days} ${item.days===1?"dzień":"dni"}` : lang==="ru" ? `${item.days} ${item.days%10===1&&item.days%100!==11?"день":item.days%10>=2&&item.days%10<=4&&!(item.days%100>=12&&item.days%100<=14)?"дня":"дней"}` : `${item.days} ${item.days===1?"день":item.days<5?"дні":"днів"}`;
    const leave = item.leave===0 ? (lang==="pl"?"bez urlopu":lang==="ru"?"без отпуска":"без відпустки") : lang==="pl" ? `${item.leave} ${item.leave===1?"dzień":"dni"} urlopu` : lang==="ru" ? `${item.leave} ${item.leave===1?"день":"дня"} отпуска` : `${item.leave} ${item.leave===1?"день":"дні"} відпустки`;
    return `<li>${escapeHTML(tx("longWeekendSuggestion",lang,{date:localizedDate(item.date,lang,{day:"numeric",month:"long"}),weekday,leave,days}))}</li>`;
  }).join("");
  const checked = calendar.checkedAt;
  if (checked) setText(root.querySelector("[data-cal-source-updated]"), tx("checked",lang,{date:localizedDate(checked,lang,{day:"2-digit",month:"2-digit",year:"numeric"})}));
}

export async function initWorkCalendar({ root = document, calendar = null, now = new Date() } = {}) {
  const lang = getLanguage();
  let language = safeLang(lang), data = calendar;
  if (!data) {
    const response = await fetch("./assets/data/poland-calendar-2026.json", { cache:"no-cache" });
    if (!response.ok) throw new Error("Calendar data unavailable");
    data = await response.json();
  }
  const today = getTodayInWarsaw(now), monthSelect = root.querySelector("[data-cal-month]"), yearSelect = root.querySelector("[data-cal-year]"), customHours = root.querySelector("[data-cal-custom-hours]");
  if (!monthSelect || !yearSelect) return;
  if (typeof applyTranslations === "function") {
    applyTranslations(root, calendarTranslations, language);
  }
  const render = () => {
    const year = Number(yearSelect.value), month = Number(monthSelect.value), radio = root.querySelector('input[name="hours-per-day"]:checked'), hours = radio?.value === "custom" ? Number(customHours.value) : 8;
    renderCalendar(root,data,year,month,hours,language,today);
    renderHighlights(root,data,language,today);
    const badge = root.querySelector("[data-cal-year-badge]"); if (badge) setText(badge,String(year));
    const title = calendarTranslations[language].pageTitle.replace("2026",String(year)); document.title=title;
    const desc = calendarTranslations[language].pageDescription.replace("2026",String(year)); root.querySelector('meta[name="description"]')?.setAttribute("content",desc);
    root.querySelector('meta[property="og:title"]')?.setAttribute("content",title);
    root.querySelector('meta[property="og:description"]')?.setAttribute("content",desc);
    root.querySelector('meta[name="twitter:title"]')?.setAttribute("content",title);
    root.querySelector('meta[name="twitter:description"]')?.setAttribute("content",desc);
  };
  monthSelect.innerHTML = getMonthNames(language).map((name,index)=>`<option value="${index+1}">${escapeHTML(name)}</option>`).join("");
  const supportedYear = Number(data.year) || 2026;
  yearSelect.innerHTML = `<option value="${supportedYear}">${supportedYear}</option>`;
  yearSelect.value=String(supportedYear); monthSelect.value=String(today.year===supportedYear?today.month:1);
  const yearLabel = root.querySelector('[data-cal-year]')?.parentElement; if(yearLabel) setText(yearLabel.querySelector("span"),calendarTranslations[language].yearLabel);
  monthSelect.addEventListener("change",()=>{render();trackCalculatorEvent?.("calendar_month_changed");});
  yearSelect.addEventListener("change",render);
  root.querySelectorAll('input[name="hours-per-day"]').forEach(input=>input.addEventListener("change",()=>{customHours.hidden=input.value!=="custom";render();}));
  customHours?.addEventListener("change",render);
  const updateLanguage = next => {
    language = safeLang(next);
    if (typeof applyTranslations === "function") applyTranslations(root,calendarTranslations,language);
    const selectedMonth=Number(monthSelect.value);
    monthSelect.innerHTML=getMonthNames(language).map((name,index)=>`<option value="${index+1}">${escapeHTML(name)}</option>`).join("");monthSelect.value=String(selectedMonth);
    render();
  };
  if (typeof bindLanguageChange === "function") bindLanguageChange(updateLanguage);
  if (findNextDates(data,today).nextTrading) trackCalculatorEvent("calendar_trading_sunday_viewed");
  render();
  return { render, get calendar(){return data;} };
}

if (typeof document !== "undefined" && document.querySelector("[data-cal-grid]")) {
  initWorkCalendar().catch(error=>{
    const grid=document.querySelector("[data-cal-grid]");
    if(grid) grid.innerHTML=`<p role="alert">${escapeHTML(tx("calendarError",safeLang(getLanguage())))}</p>`;
  });
}
