# PRYWOZ calculators: QA and annual maintenance

This note covers `salary-calculator.html`, `work-calendar.html`, and `rent-calculator.html`. Calculations are client-side; rent inputs are not sent to the server or included in analytics.

## Annual update checklist

### Salary rules

Before publishing a new tax year:

1. Verify the new minimum monthly and hourly rates, PIT thresholds and relief, employee/employer ZUS rates, health contribution, KUP, PPK rates, and youth-relief limit against current official sources: `podatki.gov.pl`, `zus.pl`, `gov.pl`, and `mojeppk.pl`.
2. Add a year-specific entry to `TAX_RULES` in `assets/scripts/calculators/salary-calculator.js`; keep rates grouped there rather than scattering constants through the formulas.
3. Update the calculation's selected rule year and the minimum-wage warning, which currently both use the 2026 rules. Update the displayed year, verification date, assumptions, source labels, and SEO strings in that module and `salary-calculator.html`.
4. Add control cases for minimum salary, ordinary employment, PIT-2 on/off, the annual PIT threshold, under-26 relief, student zlecenie, non-student zlecenie, and dzieło. Compare representative results with official rules and at least two independent calculators; explain any difference before release.

### Work calendar

1. Verify the statutory public-holiday list and trading Sundays for the new year using the current legislation and official sources. Confirm Easter-related dates, holidays on Saturday/Sunday, and the 24 December holiday status.
2. Add a year-specific JSON data file based on `assets/data/poland-calendar-2026.json`, including `year`, `checkedAt`, `timezone`, monthly working-hour norms, localized holiday names, and trading Sundays. Keep `timezone` as `Europe/Warsaw`.
3. Extend `assets/scripts/calculators/work-calendar.js` to load/select the new year; its current year selector is populated from the single loaded calendar. Update year-bearing translations, source labels, and SEO metadata in the module and `work-calendar.html`.
4. Run month checks for January, April, May, August, and December. Verify Saturday-holiday reductions, Sunday holidays, custom-hour estimates, next holiday/trading Sunday, long-weekend suggestions, and the December shopping Sundays.

### Rent calculator

The rent calculator uses user-entered amounts and has no annual external rate table. Review labels and explanations if Polish rental conventions or supported fields change. Do not add rental values to analytics or server requests. Keep deposit treatment separate: move-in/first-year cash includes it, while annual expense excludes the potentially refundable deposit.

## QA commands

Run the focused calculation tests from the repository root:

```sh
node --test tests/salary-calculator.test.mjs tests/work-calendar.test.mjs tests/rent-calculator.test.mjs
```

For layout checks, open each page directly and inspect widths 320, 360, 390, 768, 1024, and 1440 px in both light and dark themes. Check UA, PL, and RU; keyboard focus and native form controls; no horizontal overflow; no `NaN`/`Infinity`; and no console errors. On the calendar, verify that day cells remain in seven-column ARIA rows and holiday/trading/today markers contain readable text as well as visual distinction.

`assets/scripts/calculators/calculator-utils.js` owns shared numeric parsing, Polish złoty formatting, Warsaw date parts/formatting, and value-free analytics events. `assets/scripts/calculators/calculator-i18n.js` owns language selection and the shared translation attributes. Keep annual rules and dates in their page-specific versioned sources; avoid adding a dependency for formatting or calendar calculations.
