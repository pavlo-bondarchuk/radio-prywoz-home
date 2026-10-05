import { parseDecimal, formatPLN, trackCalculatorEvent } from "./calculator-utils.js";
import { getLanguage, applyTranslations, bindLanguageChange } from "./calculator-i18n.js";

export const RENT_DICTIONARY = {
  uk: {
    home:"Головна", breadcrumbs:"Навігаційний шлях", pageTitle:"Калькулятор оренди житла", eyebrow:"Планування бюджету", intro:"Оцініть щомісячні витрати, суму для заселення та бюджет на перший рік у Польщі.",
    monthlyHeading:"Щомісячні витрати", rent:"Оренда житла", rentHelp:"Сума odstępnego / найму за місяць", admin:"Адміністративний czynsz", electricity:"Електроенергія", gas:"Газ", water:"Вода", heating:"Опалення", internet:"Інтернет", parking:"Паркінг", otherMonthly:"Інші щомісячні",
    moveHeading:"Витрати для заселення", deposit:"Застава (kaucja)", depositHelp:"Може бути повернута після завершення оренди згідно з договором.", agency:"Комісія агентства", agencyAmount:"Сума або відсоток комісії", fixed:"Фіксована сума", percent:"Відсоток оренди", agencyHelp:"Відсоток розраховується від щомісячної оренди житла.", moving:"Переїзд", equipment:"Обладнання та покупки на старт", otherOneTime:"Інші разові витрати", householdHeading:"Домогосподарство", people:"Кількість людей", income:"Дохід домогосподарства netto (необов’язково)", incomeHelp:"Значення залишається у вашому браузері та не надсилається на сервер.", results:"Ваш бюджет оренди", monthlyTotal:"Щомісяця", moveIn:"Для заселення", annual:"За рік (без застави)", firstYearCash:"Гроші протягом першого року*", perPersonLabel:"На одну людину / місяць", perPerson:"{amount} на людину · {people} ос.",
    share:"Скопіювати посилання на розрахунок", copied:"Посилання скопійовано.", copyFallback:"Скопіюйте адресу сторінки з рядка браузера.", breakdown:"Щомісячна деталізація", firstYearNote:"* Річна сума включає разові неповоротні витрати та заставу як кошти, які потрібно мати; застава не вважається витратою.", incomeShare:"Оренда та комунальні витрати становлять приблизно {percent}% введеного чистого доходу домогосподарства.", invalid:"Введіть невід’ємні суми у числовому форматі. Кількість людей має бути цілим числом від 1 до 100.", disclaimer:"Калькулятор допомагає оцінити бюджет оренди. Фактичні платежі залежать від договору, тарифів і правил власника житла.", privacy:"Усі розрахунки виконуються у браузері. Введені суми не надсилаються на сервер і не передаються в аналітику.", salaryLink:"Калькулятор зарплати", calendarLink:"Робочий календар", currencyLink:"Курси валют", weatherLink:"Погода",
    breakdownRent:"Оренда житла", breakdownAdmin:"Адміністративні платежі", breakdownUtilities:"Комунальні послуги", breakdownInternet:"Інтернет", breakdownParking:"Паркінг", breakdownOther:"Інші витрати", metaTitle:"Калькулятор оренди житла в Польщі | PRYWOZ", metaDescription:"Оцініть повну щомісячну вартість оренди житла в Польщі, суму для заселення та бюджет на перший рік."
  },
  pl: {
    home:"Strona główna", breadcrumbs:"Nawigacja okruszkowa", pageTitle:"Kalkulator kosztów najmu", eyebrow:"Planowanie budżetu", intro:"Oszacuj miesięczne koszty, kwotę potrzebną na wprowadzenie i budżet na pierwszy rok w Polsce.",
    monthlyHeading:"Koszty miesięczne", rent:"Odstępne / najem", rentHelp:"Kwota czynszu najmu za miesiąc", admin:"Czynsz administracyjny", electricity:"Prąd", gas:"Gaz", water:"Woda", heating:"Ogrzewanie", internet:"Internet", parking:"Parking", otherMonthly:"Inne miesięczne",
    moveHeading:"Koszty na start", deposit:"Kaucja", depositHelp:"Może podlegać zwrotowi po zakończeniu najmu zgodnie z umową.", agency:"Prowizja agencji", agencyAmount:"Kwota lub procent prowizji", fixed:"Kwota stała", percent:"Procent miesięcznego najmu", agencyHelp:"Procent jest liczony od miesięcznej kwoty najmu.", moving:"Przeprowadzka", equipment:"Wyposażenie i zakupy na start", otherOneTime:"Inne jednorazowe koszty", householdHeading:"Gospodarstwo domowe", people:"Liczba osób", income:"Dochód netto gospodarstwa (opcjonalnie)", incomeHelp:"Wartość pozostaje w przeglądarce i nie jest wysyłana na serwer.", results:"Budżet najmu", monthlyTotal:"Miesięcznie", moveIn:"Na start", annual:"Rocznie (bez kaucji)", firstYearCash:"Środki potrzebne w pierwszym roku*", perPersonLabel:"Na osobę / miesiąc", perPerson:"{amount} na osobę · {people} os.",
    share:"Kopiuj link do obliczeń", copied:"Link skopiowany.", copyFallback:"Skopiuj adres strony z paska przeglądarki.", breakdown:"Koszty miesięczne", firstYearNote:"* Kwota na pierwszy rok obejmuje jednorazowe koszty bezzwrotne i kaucję jako potrzebne środki; kaucja nie jest kosztem.", incomeShare:"Najem i opłaty stanowią około {percent}% podanego dochodu netto gospodarstwa.", invalid:"Wpisz nieujemne kwoty. Liczba osób musi być liczbą całkowitą od 1 do 100.", disclaimer:"Kalkulator pomaga oszacować budżet najmu. Rzeczywiste płatności zależą od umowy, taryf i zasad właściciela mieszkania.", privacy:"Wszystkie obliczenia odbywają się w przeglądarce. Wpisane kwoty nie są wysyłane na serwer ani przekazywane do analityki.", salaryLink:"Kalkulator wynagrodzenia", calendarLink:"Kalendarz pracy", currencyLink:"Kursy walut", weatherLink:"Pogoda",
    breakdownRent:"Najem", breakdownAdmin:"Czynsz administracyjny", breakdownUtilities:"Media", breakdownInternet:"Internet", breakdownParking:"Parking", breakdownOther:"Inne koszty", metaTitle:"Kalkulator kosztów najmu w Polsce | PRYWOZ", metaDescription:"Oszacuj miesięczny koszt najmu mieszkania w Polsce, kwotę na start i budżet na pierwszy rok."
  },
  ru: {
    home:"Главная", breadcrumbs:"Навигационная цепочка", pageTitle:"Калькулятор аренды жилья", eyebrow:"Планирование бюджета", intro:"Оцените ежемесячные расходы, сумму для заселения и бюджет на первый год в Польше.",
    monthlyHeading:"Ежемесячные расходы", rent:"Аренда жилья", rentHelp:"Сумма odstępnego / аренды за месяц", admin:"Административный czynsz", electricity:"Электричество", gas:"Газ", water:"Вода", heating:"Отопление", internet:"Интернет", parking:"Паркинг", otherMonthly:"Другие ежемесячные",
    moveHeading:"Расходы для заселения", deposit:"Залог (kaucja)", depositHelp:"Может быть возвращён после завершения аренды согласно договору.", agency:"Комиссия агентства", agencyAmount:"Сумма или процент комиссии", fixed:"Фиксированная сумма", percent:"Процент аренды", agencyHelp:"Процент рассчитывается от ежемесячной стоимости аренды.", moving:"Переезд", equipment:"Оборудование и покупки на старте", otherOneTime:"Другие разовые расходы", householdHeading:"Домохозяйство", people:"Количество человек", income:"Чистый доход домохозяйства (необязательно)", incomeHelp:"Значение остаётся в браузере и не отправляется на сервер.", results:"Ваш бюджет аренды", monthlyTotal:"В месяц", moveIn:"Для заселения", annual:"За год (без залога)", firstYearCash:"Деньги на первый год*", perPersonLabel:"На одного человека / месяц", perPerson:"{amount} на человека · {people} чел.",
    share:"Скопировать ссылку на расчёт", copied:"Ссылка скопирована.", copyFallback:"Скопируйте адрес страницы из строки браузера.", breakdown:"Ежемесячная детализация", firstYearNote:"* Сумма на первый год включает разовые невозвратные расходы и залог как необходимые средства; залог не считается расходом.", incomeShare:"Аренда и коммунальные расходы составляют примерно {percent}% указанного чистого дохода домохозяйства.", invalid:"Введите неотрицательные суммы. Количество людей должно быть целым числом от 1 до 100.", disclaimer:"Калькулятор помогает оценить бюджет аренды. Фактические платежи зависят от договора, тарифов и правил владельца жилья.", privacy:"Все расчёты выполняются в браузере. Введённые суммы не отправляются на сервер и не передаются в аналитику.", salaryLink:"Калькулятор зарплаты", calendarLink:"Рабочий календарь", currencyLink:"Курсы валют", weatherLink:"Погода",
    breakdownRent:"Аренда жилья", breakdownAdmin:"Административные платежи", breakdownUtilities:"Коммунальные услуги", breakdownInternet:"Интернет", breakdownParking:"Паркинг", breakdownOther:"Другие расходы", metaTitle:"Калькулятор аренды жилья в Польше | PRYWOZ", metaDescription:"Оцените полную ежемесячную стоимость аренды жилья в Польше, сумму для заселения и бюджет на первый год."
  }
};

const MONTHLY_FIELDS = ["rent", "admin", "electricity", "gas", "water", "heating", "internet", "parking", "otherMonthly"];
const ONE_TIME_FIELDS = ["deposit", "agency", "moving", "equipment", "otherOneTime"];
export const SHAREABLE_FIELDS = [...MONTHLY_FIELDS, ...ONE_TIME_FIELDS, "agencyMode", "people"];

export function serializeRentQuery(values) {
  const params = new URLSearchParams();
  SHAREABLE_FIELDS.forEach(key => {
    const value = values[key];
    if (value !== "" && value != null && !(key === "agencyMode" && value === "fixed") && !(key === "people" && String(value) === "1")) params.set(key, value);
  });
  return params;
}

export function hydrateRentQuery(params, fields) {
  SHAREABLE_FIELDS.forEach(key => { if (params.has(key) && fields[key]) fields[key].value = params.get(key); });
}

export function calculateRent(values) {
  const monthlyValues = Object.fromEntries(MONTHLY_FIELDS.map(key => [key, parseDecimal(values[key])]));
  const oneTimeValues = Object.fromEntries(ONE_TIME_FIELDS.map(key => [key, parseDecimal(values[key])]));
  const people = Number(values.people);
  const income = values.income === "" || values.income == null ? null : parseDecimal(values.income);
  const agencyInput = oneTimeValues.agency;
  if ([...Object.values(monthlyValues), ...Object.values(oneTimeValues)].some(value => value === null) ||
      (values.income !== "" && values.income != null && income === null) ||
      !Number.isInteger(people) || people < 1 || people > 100 ||
      (values.agencyMode === "percent" && agencyInput > 10000)) return null;

  const monthly = Object.values(monthlyValues).reduce((sum, value) => sum + value, 0);
  const agencyFee = values.agencyMode === "percent" ? monthlyValues.rent * agencyInput / 100 : agencyInput;
  const nonRefundableOneTime = agencyFee + oneTimeValues.moving + oneTimeValues.equipment + oneTimeValues.otherOneTime;
  const moveIn = monthly + oneTimeValues.deposit + nonRefundableOneTime;
  const annual = monthly * 12 + nonRefundableOneTime;
  const firstYearCash = annual + oneTimeValues.deposit;
  const utilityCharges = monthly - monthlyValues.rent;
  return {
    monthly, moveIn, annual, firstYearCash, people, perPerson: monthly / people,
    deposit: oneTimeValues.deposit, agencyFee, nonRefundableOneTime,
    incomeShare: income > 0 ? monthly / income * 100 : null,
    breakdown: {
      rent: monthlyValues.rent,
      admin: monthlyValues.admin,
      utilities: monthlyValues.electricity + monthlyValues.gas + monthlyValues.water + monthlyValues.heating,
      internet: monthlyValues.internet,
      parking: monthlyValues.parking,
      other: monthlyValues.otherMonthly
    },
    utilityCharges
  };
}

if (typeof document !== "undefined") {
const form = document.querySelector("[data-rent-form]");
if (form) {
  let language = getLanguage();
  const queryFields = [...MONTHLY_FIELDS, ...ONE_TIME_FIELDS, "agencyMode", "people", "income"];
  const fields = Object.fromEntries(queryFields.map(name => [name, form.elements.namedItem(name)]));
  const error = document.querySelector("[data-rent-error]");
  const result = key => document.querySelector(`[data-result="${key}"]`);

  function readValues() { return Object.fromEntries(queryFields.map(key => [key, fields[key].value])); }
  function render() {
    const values = readValues();
    const totals = calculateRent(values);
    if (!totals) {
      error.hidden = false;
      error.textContent = RENT_DICTIONARY[language].invalid;
      form.querySelectorAll("input").forEach(input => input.setAttribute("aria-invalid", "true"));
      ["monthly", "moveIn", "annual", "firstYearCash", "perPerson", "perPersonStat"].forEach(key => result(key).textContent = "—");
      document.querySelector('[data-result="breakdown"]').replaceChildren();
      document.querySelector('[data-result="incomeShare"]').textContent = "";
      return;
    }
    error.hidden = true;
    form.querySelectorAll("[aria-invalid]").forEach(input => input.removeAttribute("aria-invalid"));
    result("monthly").textContent = formatPLN(totals.monthly, language);
    result("moveIn").textContent = formatPLN(totals.moveIn, language);
    result("annual").textContent = formatPLN(totals.annual, language);
    result("firstYearCash").textContent = formatPLN(totals.firstYearCash, language);
    result("perPersonStat").textContent = formatPLN(totals.perPerson, language);
    result("perPerson").textContent = RENT_DICTIONARY[language].perPerson.replace("{amount}", formatPLN(totals.perPerson, language)).replace("{people}", String(totals.people));
    result("incomeShare").textContent = totals.incomeShare === null ? "" : RENT_DICTIONARY[language].incomeShare.replace("{percent}", new Intl.NumberFormat(({uk:"uk-UA",pl:"pl-PL",ru:"ru-RU"})[language], { maximumFractionDigits: 1 }).format(totals.incomeShare));
    const names = RENT_DICTIONARY[language];
    const rows = [
      [names.breakdownRent, totals.breakdown.rent], [names.breakdownAdmin, totals.breakdown.admin],
      [names.breakdownUtilities, totals.breakdown.utilities], [names.breakdownInternet, totals.breakdown.internet],
      [names.breakdownParking, totals.breakdown.parking], [names.breakdownOther, totals.breakdown.other]
    ];
    const list = document.querySelector('[data-result="breakdown"]');
    list.replaceChildren(...rows.map(([label, amount]) => {
      const wrapper = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd");
      dt.textContent = label; dd.textContent = formatPLN(amount, language); wrapper.append(dt, dd); return wrapper;
    }));
  }
  function hydrateFromUrl() {
    const params = new URLSearchParams(location.search);
    hydrateRentQuery(params, fields);
  }
  function updateMetadata(lang) {
    const dictionary = RENT_DICTIONARY[lang] || RENT_DICTIONARY.uk;
    document.title = dictionary.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dictionary.metaDescription);
    document.documentElement.lang = lang === "uk" ? "uk" : lang;
  }
  form.addEventListener("input", event => {
    render();
    if (event.target.name !== "income") trackCalculatorEvent("rent_calculator_used");
  });
  form.addEventListener("change", render);
  document.querySelector("[data-share]").addEventListener("click", async () => {
    const params = serializeRentQuery(readValues());
    const url = `${location.origin}${location.pathname}${params.size ? `?${params}` : ""}`;
    const status = document.querySelector("[data-share-status]");
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else throw new Error("Clipboard API unavailable");
      status.textContent = RENT_DICTIONARY[language].copied;
      trackCalculatorEvent("rent_share_clicked");
    } catch {
      status.textContent = RENT_DICTIONARY[language].copyFallback;
    }
  });
  hydrateFromUrl();
  applyTranslations(document.querySelector("main"), RENT_DICTIONARY, language);
  updateMetadata(language);
  render();
  bindLanguageChange(nextLanguage => {
    language = nextLanguage;
    applyTranslations(document.querySelector("main"), RENT_DICTIONARY, language);
    updateMetadata(language);
    render();
  });
}
}
