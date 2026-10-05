import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { calculateMonth, buildMonthCells, buildGridRows, buildCalendarTableMarkup, findNextDates, getTodayInWarsaw, suggestLongWeekends } from "../assets/scripts/calculators/work-calendar.js";

const calendar = JSON.parse(await readFile(new URL("../assets/data/poland-calendar-2026.json", import.meta.url), "utf8"));

test("2026 monthly working norms agree with the statutory calendar", () => {
  for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
    assert.equal(calculateMonth(2026, month, calendar).workingHours, calendar.monthlyWorkingHours[String(month)], `month ${month}`);
  }
  assert.equal(Object.values(calendar.monthlyWorkingHours).reduce((sum, hours) => sum + hours, 0), 2008);
});

test("April, May, August and December account for Sunday and Saturday holidays", () => {
  assert.equal(calculateMonth(2026, 4, calendar).workingHours, 168);
  assert.equal(calculateMonth(2026, 5, calendar).workingHours, 160);
  const august = calculateMonth(2026, 8, calendar);
  assert.equal(august.saturdayHolidays, 1);
  assert.equal(august.workingHours, 160);
  assert.equal(calculateMonth(2026, 12, calendar).workingHours, 160);
  assert.ok(calendar.holidays.some(holiday => holiday.date === "2026-12-24"));
});

test("2026 trading Sundays are exactly the eight official dates", () => {
  assert.deepEqual(calendar.tradingSundays, ["2026-01-25","2026-03-29","2026-04-26","2026-06-28","2026-08-30","2026-12-06","2026-12-13","2026-12-20"]);
  for (const date of calendar.tradingSundays) assert.equal(new Date(`${date}T12:00:00Z`).getUTCDay(), 0);
  const cells = buildMonthCells(2026, 12, calendar, {year:2026,month:12,day:13});
  assert.equal(cells.find(cell=>cell.date==="2026-12-13").tradingSunday,true);
  assert.equal(cells.find(cell=>cell.date==="2026-12-26").holiday.name.pl,"Drugi dzień Bożego Narodzenia");
});

test("month grids begin Monday and mark public holidays, weekends and Warsaw today", () => {
  const cells=buildMonthCells(2026,1,calendar,{year:2026,month:1,day:1});
  assert.equal(cells[0].date,null);
  const newYear=cells.find(cell=>cell.date==="2026-01-01");
  assert.equal(newYear.weekday,4);
  assert.equal(newYear.holiday.name.uk,"Новий рік");
  assert.equal(newYear.today,true);
  assert.equal(cells.find(cell=>cell.date==="2026-01-03").weekend,true);
});

test("calendar uses native table semantics with seven header and data cells per row", () => {
  for (let month=1; month<=12; month++) {
    const rows=buildGridRows(buildMonthCells(2026,month,calendar));
    assert.ok(rows.length>=4&&rows.length<=6);
    assert.ok(rows.every(row=>row.length===7),`month ${month}`);
    const html=buildCalendarTableMarkup(buildMonthCells(2026,month,calendar,{year:2026,month,day:1}),"uk");
    assert.match(html,/<thead><tr class="work-calendar-week-row">/);
    assert.equal((html.match(/<th class="work-calendar-weekday" scope="col">/g)||[]).length,7);
    assert.equal((html.match(/<tr class="work-calendar-week-row">/g)||[]).length,rows.length+1);
    for(const row of html.matchAll(/<tr class="work-calendar-week-row">([\s\S]*?)<\/tr>/g)) assert.equal((row[1].match(/<(?:th|td)\b/g)||[]).length,7);
    assert.match(html,/aria-label="1 .+ 2026 р\./);
    assert.doesNotMatch(html,/role="grid(cell|row|columnheader)"/);
  }
});

test("next dates and custom-day estimate use calendar dates without device timezone", () => {
  assert.deepEqual(findNextDates(calendar,{year:2026,month:12,day:5}),{nextTrading:"2026-12-06",nextHoliday:calendar.holidays.find(item=>item.date==="2026-12-24")});
  const custom=calculateMonth(2026,1,calendar,6);
  assert.equal(custom.workingHours,120);
  const lateUtc = new Date("2025-12-31T23:30:00Z");
  assert.deepEqual(getTodayInWarsaw(lateUtc),{year:2026,month:1,day:1});
  const suggestions=suggestLongWeekends(calendar,2026);
  const christmas=suggestions.find(item=>item.date==="2026-12-24");
  assert.equal(christmas.days,6);
  assert.equal(christmas.leave,2);
  assert.ok(suggestions.every(item=>item.days>=3&&item.leave<=2));
});
