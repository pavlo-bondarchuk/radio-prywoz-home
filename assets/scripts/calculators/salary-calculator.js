import { getLanguage, t, applyTranslations, bindLanguageChange } from "./calculator-i18n.js";
import { parseDecimal, formatNumber, formatPLN, trackCalculatorEvent } from "./calculator-utils.js";

export const TAX_RULES = Object.freeze({
  2026: Object.freeze({ minimumMonthly: 4806, minimumHourly: 31.4, taxFree: 30000, firstThreshold: 120000, pitLow: .12, pitHigh: .32, annualReduction: 3600, monthlyReduction: 300, employee: { pension: .0976, disability: .015, sickness: .0245 }, health: .09, kupMonthly: 250, kupCommuter: 300, ppkEmployee: .02, ppkEmployer: .015, ppkExemptFromHealth: false, employer: { accident: .0167, fp: .01, fs: .0145, fgsp: .001 }, dziełoKup: .2, under26Limit: 85528 })
});

export function calculateSalary(grossValue, settings = {}) {
  const gross = Number(grossValue), yearRules = TAX_RULES[2026];
  if (!Number.isFinite(gross) || gross < 0 || gross > 1e9) return null;
  const contract = settings.contract || "employment", age = Number(settings.age), under26 = Number.isFinite(age) && age >= 16 && age < 26;
  const rows = [], employerRows = [];
  const add = (label, value) => { if (value > 0) rows.push({ label, value }); };
  let social = 0, health = 0, pit = 0, ppk = 0, taxableBase = 0, employerSocial = 0, exempt = false;
  if (contract === "employment") {
    const rates = yearRules.employee;
    add("pension", gross * rates.pension); add("disability", gross * rates.disability); add("sickness", gross * rates.sickness);
    social = gross * (rates.pension + rates.disability + rates.sickness);
    const kup = settings.commuter ? yearRules.kupCommuter : yearRules.kupMonthly;
    const employerPpk = settings.ppk ? gross * yearRules.ppkEmployer : 0;
    taxableBase = Math.max(0, Math.floor(gross + employerPpk - social - kup));
    health = Math.round((gross - social) * yearRules.health * 100) / 100;
    ppk = settings.ppk ? gross * yearRules.ppkEmployee : 0;
    if (under26) {
      const youngTax = calculateYoungMonthlyPit({ gross, employerPpk, socialRate: rates.pension + rates.disability + rates.sickness, kup, rules: yearRules });
      exempt = youngTax.taxableRevenue === 0;
      pit = youngTax.monthlyTax;
    } else pit = calculateMonthlyPit(taxableBase, settings.pit2, yearRules);
    const e = yearRules.employer;
    const employerParts = [["employerPension", .0976], ["employerDisability", .065], ["employerAccident", e.accident], ["employerFP", e.fp], ["employerFS", e.fs], ["employerFGSP", e.fgsp]];
    employerParts.forEach(([label, rate]) => employerRows.push({ label, value: gross * rate }));
    if (settings.ppk) employerRows.push({ label: "employerPpk", value: gross * yearRules.ppkEmployer });
    employerSocial = employerRows.reduce((sum, item) => sum + item.value, 0);
  } else if (contract === "mandate") {
    const isStudentExempt = Boolean(settings.student && under26), otherTitle = Boolean(settings.otherTitle);
    if (!isStudentExempt && !otherTitle) {
      const r = yearRules.employee; add("pension", gross * r.pension); add("disability", gross * r.disability);
      social = gross * (r.pension + r.disability);
      if (settings.sickness) { add("sickness", gross * r.sickness); social += gross * r.sickness; }
    }
    if (!isStudentExempt) health = Math.round((gross - social) * yearRules.health * 100) / 100;
    taxableBase = Math.max(0, Math.floor(gross - social - gross * .2));
    if (under26) {
      const youngTax = calculateYoungMonthlyPit({ gross, employerPpk: 0, socialRate: (social / gross || 0), kup: gross * .2, rules: yearRules });
      exempt = youngTax.taxableRevenue === 0;
      pit = youngTax.monthlyTax;
    } else pit = calculateMonthlyPit(taxableBase, settings.pit2, yearRules);
  } else if (contract === "work") {
    taxableBase = Math.max(0, Math.floor(gross * (1 - yearRules.dziełoKup)));
    pit = calculateMonthlyPit(taxableBase, settings.pit2, yearRules);
    exempt = false;
  } else return null;
  add("health", health); add("pit", pit); add("ppk", ppk);
  const netto = Math.max(0, gross - social - health - pit - ppk);
  return { gross, netto, social, health, pit, ppk, taxableBase, exempt, rows, employerRows, employerSocial, employerTotal: gross + employerSocial, contract, studentExempt: contract === "mandate" && settings.student && under26, assumptions: { kup: contract === "employment" ? (settings.commuter ? yearRules.kupCommuter : yearRules.kupMonthly) : contract === "mandate" ? gross * .2 : gross * .8 } };
}

function calculateMonthlyPit(base, pit2, rules) {
  const annualBase = Math.max(0, base * 12);
  const annualTaxBeforeRelief = Math.max(0, Math.min(annualBase, rules.firstThreshold) * rules.pitLow + Math.max(0, annualBase - rules.firstThreshold) * rules.pitHigh);
  return Math.max(0, Math.round(annualTaxBeforeRelief / 12 - (pit2 ? rules.monthlyReduction : 0)));
}

/** Average monthly PIT for a full year with unchanged pay and a chronological youth allowance. */
export function calculateYoungMonthlyPit({ gross, employerPpk = 0, socialRate = 0, kup = 0, rules = TAX_RULES[2026] }) {
  const annualSalaryRevenue = Math.max(0, gross * 12);
  const annualEmployerPpkRevenue = Math.max(0, employerPpk * 12);
  const annualEmploymentRevenue = annualSalaryRevenue + annualEmployerPpkRevenue;
  const taxableRevenue = Math.max(0, annualEmploymentRevenue - rules.under26Limit);
  // Salary is paid as the regular employment revenue, then the employer PPK benefit is added.
  // The youth limit is chronological; only the taxable salary portion can carry employee ZUS.
  const taxableSalaryRevenue = Math.max(0, annualSalaryRevenue - rules.under26Limit);
  const annualSocial = Math.max(0, annualSalaryRevenue * socialRate);
  const deductibleSocial = Math.min(annualSocial, taxableSalaryRevenue * socialRate);
  const deductibleKup = Math.min(Math.max(0, kup * 12), taxableRevenue);
  const annualTaxBase = Math.max(0, Math.floor(taxableRevenue - deductibleSocial - deductibleKup));
  const annualTax = Math.max(0,
    Math.min(annualTaxBase, rules.firstThreshold) * rules.pitLow
    + Math.max(0, annualTaxBase - rules.firstThreshold) * rules.pitHigh
    - rules.annualReduction
  );
  return { annualEmploymentRevenue, taxableRevenue, deductibleSocial, deductibleKup, annualTaxBase, annualTax, monthlyTax: Math.round(annualTax / 12 * 100) / 100 };
}

const messages = {
  uk: { home:"Головна",breadcrumbs:"Навігаційний шлях",services:"Сервіси",title:"Калькулятор зарплати в Польщі",eyebrow:"Розрахунок на 2026 рік",intro:"Оцініть зарплату netto, утримання та орієнтовну вартість працівника для різних типів договору.",amount:"Місячна сума brutto",amountHelp:"Введіть суму до оподаткування.",contract:"Тип договору",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",quick:"Швидкі суми",resultEyebrow:"Ваш орієнтовний результат",netto:"netto",grossLabel:"brutto на місяць",employerCost:"Вартість для роботодавця",employerVaries:"Для цього договору точна вартість роботодавця залежить від підстав соціального страхування та конкретних умов договору.",employerAssumption:"Орієнтовно: внесок від нещасних випадків 1,67%, FP 1%, FS 1,45%, FGŚP 0,1%; ставка може залежати від роботодавця.",howTitle:"Як читати результат",disclaimer:"Розрахунок має інформаційний характер. Фактична сума залежить від індивідуальних податкових та страхових обставин.",sourcesTitle:"Джерела та актуальність",verified:"Правила перевірено: 05.10.2026 · розрахунок для податкових правил 2026 року.",related:"Інші сервіси PRYWOZ",calendar:"Робочий календар",rent:"Калькулятор оренди",currency:"Курси валют",pitYearTitle:"Що буде з податками наприкінці року?",pitYearText:"Роботодавець або інший платник передає інформацію про ваші доходи у PIT-11. На її основі формується річна декларація в сервісі Twój e-PIT.",pitYearContext:"Цей дохід часто враховується у річному розрахунку PIT. Точний тип декларації залежить від усіх джерел доходу та обставин.",pitYearLink:"Дізнатися про PIT-37 та річне розрахування →",age:"Вік",fulltime:"Повна ставка (для перевірки мінімальної зарплати)",pit2:"Застосовувати щомісячне зменшення PIT-2 (до 300 zł)",ppk:"Участь у PPK: мій внесок 2%, роботодавця 1,5%",employerPpk:"Врахувати внесок роботодавця PPK 1,5% у вартості роботодавця",commuter:"Підвищені KUP 300 zł (доїзд з іншої місцевості)",student:"Студент до 26 років",under26:"Вік до 26 років",sickness:"Добровільне страхування chorobowe",otherTitle:"Маю іншу підставу для обов'язкового страхування",assumptions:"Параметри застосованого розрахунку",gross:"Brutto",pension:"Пенсійне страхування ZUS",disability:"Страхування на випадок непрацездатності ZUS",sicknessDed:"Страхування chorobowe ZUS",health:"Медичне страхування NFZ",pit:"Податок PIT",ppkDed:"Ваш PPK",employerPension:"Пенсійні внески роботодавця",employerDisability:"Страхування на випадок непрацездатності роботодавця",employerAccident:"Страхування від нещасних випадків",employerFP:"Fundusz Pracy",employerFS:"Fundusz Solidarnościowy",employerFGSP:"FGŚP",employerPpkDed:"PPK роботодавця",total:"Разом",warning:"Brutto нижче мінімальної місячної зарплати 4 806 zł для повної ставки у 2026 році.",invalid:"Введіть суму від 0 до 1 000 000 000 zł.",sourceP:"Податкова служба Польщі — шкала PIT та пільга для молодих",sourceZ:"ZUS — ставки соціального страхування та охорони здоров'я",sourceMin:"Офіційний портал уряду Польщі — мінімальна зарплата 2026",sourcePPK:"Офіційний портал PPK — базові внески",employmentNote:"UoP: стандартна ставка PIT, 250 zł KUP (або 300 zł для відповідного доїзду), щомісячне оподаткування річної бази та внески ZUS. Внесок PPK працівника зменшує виплату; внесок PPK роботодавця додається до оподатковуваного доходу.",mandateNote:"Zlecenie: припускаємо 20% KUP та один місячний платіж. Для студента до 26 років передбачається звільнення від ZUS/NFZ; інші випадки страхування залежать від підстави договору. Інша підстава може звільнити від соціальних внесків із zlecenie, але зазвичай не від окремого медичного внеску. Річне PIT-2 тут показано як орієнтир.",workNote:"Dzieło: припускаємо незалежний договір із 20% KUP без ZUS; договори з власним роботодавцем не охоплені. Пільга до 26 років для цього типу договору не застосовується.",under26Note:"Для відповідних UoP і zlecenie використовується звільнення PIT для молодих у межах 85 528 zł на рік. Показано середній місячний PIT за умови однакового доходу всі 12 місяців; пільга застосовується хронологічно, PIT-2 змінює авансові утримання протягом року, але не річний податок. Інші доходи або дата виплат можуть змінити результат.",ppkNote:"Внесок PPK роботодавця 1,5% є оподатковуваним доходом, але не базою соціальних чи медичних внесків. Внесок працівника утримується після податку.",employerAssumed:"Усі суми приблизні; роботодавчі внески застосовуються за типової ситуації, без спеціальних звільнень." },
  pl: { home:"Strona główna",breadcrumbs:"Nawigacja okruszkowa",services:"Usługi",title:"Kalkulator wynagrodzenia w Polsce",eyebrow:"Wyliczenie na 2026 rok",intro:"Oszacuj wynagrodzenie netto, potrącenia i przybliżony całkowity koszt pracownika dla różnych umów.",amount:"Miesięczna kwota brutto",amountHelp:"Wpisz kwotę przed opodatkowaniem.",contract:"Rodzaj umowy",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",quick:"Szybkie kwoty",resultEyebrow:"Szacowany wynik",netto:"netto",grossLabel:"brutto miesięcznie",employerCost:"Koszt pracodawcy",employerVaries:"Koszt dla zleceniodawcy zależy od tytułów ubezpieczeniowych i warunków umowy.",employerAssumption:"Szacunek: wypadkowe 1,67%, FP 1%, FS 1,45%, FGŚP 0,1%; stawka może zależeć od pracodawcy.",howTitle:"Jak czytać wynik",disclaimer:"Wyliczenie ma charakter informacyjny. Faktyczna kwota zależy od indywidualnej sytuacji podatkowej i ubezpieczeniowej.",sourcesTitle:"Źródła i aktualność",verified:"Zasady sprawdzono: 05.10.2026 · wyliczenie według zasad podatkowych na 2026 rok.",related:"Inne usługi PRYWOZ",calendar:"Kalendarz pracy",rent:"Kalkulator najmu",currency:"Kursy walut",pitYearTitle:"Co dzieje się z podatkiem po zakończeniu roku?",pitYearText:"Pracodawca lub inny płatnik przekazuje informacje o dochodach w PIT-11. Na tej podstawie przygotowywane jest roczne rozliczenie w usłudze Twój e-PIT.",pitYearContext:"Ten dochód często jest uwzględniany w rocznym rozliczeniu PIT. Właściwy formularz zależy od wszystkich źródeł dochodu i indywidualnej sytuacji.",pitYearLink:"Dowiedz się więcej o PIT-37 i rozliczeniu rocznym →",age:"Wiek",fulltime:"Pełny etat (kontrola płacy minimalnej)",pit2:"Stosuj miesięczne pomniejszenie PIT-2 (do 300 zł)",ppk:"Udział w PPK: moja wpłata 2%, pracodawcy 1,5%",employerPpk:"Uwzględnij składkę pracodawcy PPK 1,5% w jego koszcie",commuter:"Podwyższone KUP 300 zł (dojazd z innej miejscowości)",student:"Student do 26 lat",under26:"Wiek poniżej 26 lat",sickness:"Dobrowolne ubezpieczenie chorobowe",otherTitle:"Mam inny tytuł do obowiązkowych ubezpieczeń",assumptions:"Założenia wyliczenia",gross:"Brutto",pension:"Składka emerytalna ZUS",disability:"Składka rentowa ZUS",sicknessDed:"Składka chorobowa ZUS",health:"Składka zdrowotna NFZ",pit:"Podatek PIT",ppkDed:"Twoje PPK",employerPension:"Składki emerytalne pracodawcy",employerDisability:"Składka rentowa pracodawcy",employerAccident:"Ubezpieczenie wypadkowe",employerFP:"Fundusz Pracy",employerFS:"Fundusz Solidarnościowy",employerFGSP:"FGŚP",employerPpkDed:"PPK pracodawcy",total:"Razem",warning:"Brutto jest niższe od minimalnego wynagrodzenia 4 806 zł przy pełnym etacie w 2026 roku.",invalid:"Wpisz kwotę od 0 do 1 000 000 000 zł.",sourceP:"Krajowa Administracja Skarbowa — skala PIT i ulga dla młodych",sourceZ:"ZUS — stawki ubezpieczeń społecznych i zdrowotnego",sourceMin:"Oficjalny portal rządu RP — minimalne wynagrodzenie 2026",sourcePPK:"Oficjalny portal PPK — podstawowe składki",employmentNote:"Umowa o pracę: standardowa skala PIT, 250 zł KUP (lub 300 zł dla uprawnionego dojazdu), miesięczne rozliczenie rocznej podstawy i składki ZUS. PPK pracownika obniża wypłatę; sposób opodatkowania PPK może zmienić kwotę końcową.",mandateNote:"Zlecenie: zakładamy 20% KUP i jedną wypłatę miesięczną. Student do 26 lat jest założeniowo zwolniony z ZUS/NFZ; pozostałe przypadki zależą od tytułu ubezpieczenia. PIT-2 dla zlecenia jest orientacyjny.",workNote:"Dzieło: zakładamy niezależną umowę z 20% KUP bez ZUS; umowy z własnym pracodawcą nie są objęte. Ulga dla młodych nie dotyczy tego rodzaju umowy.",under26Note:"Dla uprawnionej UoP i zlecenia stosowana jest ulga dla młodych do 85 528 zł rocznie. Wynik pokazuje średni miesięczny PIT przy niezmiennych zarobkach przez 12 miesięcy; ulga działa chronologicznie, PIT-2 wpływa na zaliczki w trakcie roku, ale nie na roczny podatek. Inne dochody lub daty wypłat mogą zmienić wynik.",ppkNote:"Wpłata PPK pracodawcy 1,5% jest przychodem opodatkowanym, ale nie podstawą składek społecznych ani zdrowotnych. Wpłata pracownika jest potrącana po opodatkowaniu.",employerAssumed:"Kwoty są szacunkowe; składki pracodawcy zakładają typową sytuację bez szczególnych zwolnień." },
  ru: { home:"Главная",breadcrumbs:"Навигационная цепочка",services:"Сервисы",title:"Калькулятор зарплаты в Польше",eyebrow:"Расчёт на 2026 год",intro:"Оцените сумму netto, удержания и примерную стоимость сотрудника для разных типов договора.",amount:"Месячная сумма brutto",amountHelp:"Введите сумму до налогообложения.",contract:"Тип договора",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",quick:"Быстрые суммы",resultEyebrow:"Ваш примерный результат",netto:"netto",grossLabel:"brutto в месяц",employerCost:"Стоимость для работодателя",employerVaries:"Точная стоимость работодателя зависит от оснований страхования и условий договора.",employerAssumption:"Оценка: взнос от несчастных случаев 1,67%, FP 1%, FS 1,45%, FGŚP 0,1%; ставка зависит от работодателя.",howTitle:"Как читать результат",disclaimer:"Расчёт носит информационный характер. Фактическая сумма зависит от индивидуальных налоговых и страховых обстоятельств.",sourcesTitle:"Источники и актуальность",verified:"Правила проверены: 05.10.2026 · расчёт по налоговым правилам 2026 года.",related:"Другие сервисы PRYWOZ",calendar:"Рабочий календарь",rent:"Калькулятор аренды",currency:"Курсы валют",pitYearTitle:"Что происходит с налогами после окончания года?",pitYearText:"Работодатель или другой плательщик передаёт сведения о доходах в PIT-11. На их основе формируется годовая декларация в сервисе Twój e-PIT.",pitYearContext:"Этот доход часто учитывается в годовом расчёте PIT. Точный тип декларации зависит от всех источников дохода и обстоятельств.",pitYearLink:"Узнать о PIT-37 и годовой декларации →",age:"Возраст",fulltime:"Полная ставка (для проверки минимальной зарплаты)",pit2:"Применять ежемесячное уменьшение PIT-2 (до 300 zł)",ppk:"Участие в PPK: мой взнос 2%, работодателя 1,5%",employerPpk:"Учесть взнос работодателя PPK 1,5% в его расходах",commuter:"Повышенные KUP 300 zł (проезд из другого населённого пункта)",student:"Студент до 26 лет",under26:"Возраст до 26 лет",sickness:"Добровольное страхование chorobowe",otherTitle:"Есть другое основание обязательного страхования",assumptions:"Параметры расчёта",gross:"Brutto",pension:"Пенсионное страхование ZUS",disability:"Страхование нетрудоспособности ZUS",sicknessDed:"Страхование chorobowe ZUS",health:"Медицинское страхование NFZ",pit:"Налог PIT",ppkDed:"Ваш PPK",employerPension:"Пенсионные взносы работодателя",employerDisability:"Страхование нетрудоспособности работодателя",employerAccident:"Страхование от несчастных случаев",employerFP:"Fundusz Pracy",employerFS:"Fundusz Solidarnościowy",employerFGSP:"FGŚP",employerPpkDed:"PPK работодателя",total:"Итого",warning:"Brutto ниже минимальной месячной зарплаты 4 806 zł для полной ставки в 2026 году.",invalid:"Введите сумму от 0 до 1 000 000 000 zł.",sourceP:"Налоговая служба Польши — шкала PIT и льгота для молодых",sourceZ:"ZUS — ставки социального и медицинского страхования",sourceMin:"Официальный портал правительства Польши — минимальная зарплата 2026",sourcePPK:"Официальный портал PPK — базовые взносы",employmentNote:"UoP: стандартная шкала PIT, KUP 250 zł (или 300 zł для подходящего проезда), ежемесячный расчёт годовой базы и взносы ZUS. PPK сотрудника уменьшает выплату; налоговый режим PPK может изменить итог.",mandateNote:"Zlecenie: предполагаются KUP 20% и один ежемесячный платёж. Для студента до 26 лет предполагается освобождение от ZUS/NFZ; другие случаи зависят от основания страхования. PIT-2 для zlecenie показан ориентировочно.",workNote:"Dzieło: предполагается независимый договор с KUP 20% без ZUS; договоры со своим работодателем не включены. Льгота до 26 лет к этому договору не применяется.",under26Note:"Для подходящих UoP и zlecenie применяется льгота для молодых в пределах 85 528 zł в год. Показан средний месячный PIT при одинаковом доходе все 12 месяцев; льгота применяется хронологически, PIT-2 меняет авансовые удержания в течение года, но не годовой налог. Другие доходы или даты выплат могут изменить результат.",ppkNote:"Взнос PPK работодателя, если он есть, показан отдельно как примерная стоимость и не уменьшает netto.",employerAssumed:"Суммы примерные; взносы работодателя рассчитаны для типичного случая без особых освобождений." }
};

const el = selector => document.querySelector(selector);
let language = getLanguage(), lastContract = "employment", lastTrack = false;
function tr(key) { return t(messages, key, language); }
function markupOptions() {
  const contract = document.querySelector('[name="salary-contract"]:checked')?.value || "employment";
  const common = `<label class="calculator-field utility-field"><span>${tr("age")}</span><input data-s-age class="utility-input" type="number" min="16" max="100" value="30"></label><label class="calculator-check utility-field"><input class="utility-checkbox" data-s-pit2 type="checkbox" checked><span>${tr("pit2")}</span></label>`;
  let specific = "";
  if (contract === "employment") specific = `<label class="calculator-check utility-field"><input class="utility-checkbox" data-s-fulltime type="checkbox" checked><span>${tr("fulltime")}</span></label><label class="calculator-check utility-field"><input class="utility-checkbox" data-s-ppk type="checkbox"><span>${tr("ppk")}</span></label><label class="calculator-check utility-field"><input class="utility-checkbox" data-s-commuter type="checkbox"><span>${tr("commuter")}</span></label>`;
  if (contract === "mandate") specific = `<label class="calculator-check utility-field"><input class="utility-checkbox" data-s-student type="checkbox"><span>${tr("student")}</span></label><label class="calculator-check utility-field"><input class="utility-checkbox" data-s-sickness type="checkbox"><span>${tr("sickness")}</span></label><label class="calculator-check utility-field"><input class="utility-checkbox" data-s-other-title type="checkbox"><span>${tr("otherTitle")}</span></label>`;
  return `<div class="calculator-options-grid">${common}${specific}</div>`;
}
function renderOptions(settings = readSettings()) {
  el("[data-s-options]").innerHTML = markupOptions();
  ["age", "pit2", "fulltime", "ppk", "commuter", "student", "sickness", "otherTitle"].forEach(key => {
    const selectors = { age: "[data-s-age]", pit2: "[data-s-pit2]", fulltime: "[data-s-fulltime]", ppk: "[data-s-ppk]", commuter: "[data-s-commuter]", student: "[data-s-student]", sickness: "[data-s-sickness]", otherTitle: "[data-s-other-title]" };
    const control = el(selectors[key]);
    if (!control) return;
    if (key === "age") control.value = String(settings.age || 30);
    else control.checked = Boolean(settings[key]);
  });
}
function translateStatic() {
  language = getLanguage();
  applyTranslations(document.querySelector("[data-no-auto-i18n]"), messages, language);
  document.documentElement.lang = language;
  const localizedMeta = language === "pl" ? { title: "Kalkulator wynagrodzenia w Polsce 2026 — brutto netto | PRYWOZ", description: "Oblicz orientacyjne wynagrodzenie netto z brutto w Polsce dla umowy o pracę, zlecenia i umowy o dzieło." } : language === "ru" ? { title: "Калькулятор зарплаты в Польше 2026 — brutto netto | PRYWOZ", description: "Рассчитайте примерную зарплату netto из brutto в Польше для umowa o pracę, zlecenie и dzieło." } : { title: "Калькулятор зарплати в Польщі 2026 — brutto netto | PRYWOZ", description: "Розрахуйте орієнтовну зарплату netto з brutto у Польщі для umowa o pracę, umowa zlecenie та umowa o dzieło." };
  document.title = localizedMeta.title;
  document.querySelector('meta[name="description"]').content = localizedMeta.description;
  document.querySelector('meta[property="og:title"]').content = localizedMeta.title;
  document.querySelector('meta[property="og:description"]').content = localizedMeta.description;
  document.querySelector('meta[name="twitter:title"]').content = localizedMeta.title;
  document.querySelector('meta[name="twitter:description"]').content = localizedMeta.description;
  renderOptions();
  renderSources();
  calculateAndRender();
}
function renderSources() {
  const urls = ["https://www.podatki.gov.pl/ulgi-i-odliczenia/ulga-dla-mlodych-pit-dla-osob-do-26-lat", "https://www.zus.pl/pl/firmy/rozliczenia-z-zus/skladki-na-ubezpieczenia/spoleczne", "https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20250001242/O/D20251242.pdf", "https://www.mojeppk.pl/faq.html" ];
  el("[data-s-sources]").innerHTML = ["sourceP","sourceZ","sourceMin","sourcePPK"].map((key,i)=>`<li><a href="${urls[i]}" target="_blank" rel="noopener noreferrer">${tr(key)}</a></li>`).join("");
}
function readSettings() {
  const contract = document.querySelector('[name="salary-contract"]:checked')?.value || "employment";
  const age = Number(el("[data-s-age]")?.value);
  return { contract, age: Number.isFinite(age) && age >= 16 && age <= 100 ? age : 30, fulltime: el("[data-s-fulltime]") ? Boolean(el("[data-s-fulltime]").checked) : true, pit2: el("[data-s-pit2]") ? Boolean(el("[data-s-pit2]").checked) : true, ppk: Boolean(el("[data-s-ppk]")?.checked), employerPpk: Boolean(el("[data-s-ppk]")?.checked), commuter: Boolean(el("[data-s-commuter]")?.checked), student: Boolean(el("[data-s-student]")?.checked), sickness: Boolean(el("[data-s-sickness]")?.checked), otherTitle: Boolean(el("[data-s-other-title]")?.checked) };
}
function line(label, amount, negative = false) { return `<div class="salary-breakdown-row"><dt>${label}</dt><dd>${negative ? "−" : ""}${formatPLN(Math.abs(amount), language)}</dd></div>`; }
function calculateAndRender() {
  const input = el("[data-s-amount]"), gross = parseDecimal(input.value), error = el("[data-s-error]");
  if (gross === null || gross < 0 || gross > 1e9) { error.hidden = false; error.textContent = tr("invalid"); el("[data-s-result]").setAttribute("aria-busy", "true"); el("[data-s-netto]").textContent = "—"; el("[data-s-gross]").textContent = "—"; el("[data-s-breakdown]").replaceChildren(); el("[data-s-employer]").replaceChildren(); el("[data-s-bar]").replaceChildren(); return; }
  error.hidden = true; el("[data-s-result]").removeAttribute("aria-busy");
  const calc = calculateSalary(gross, readSettings());
  if (!calc) return;
  el("[data-s-gross]").textContent = formatPLN(calc.gross, language);
  el("[data-s-netto]").textContent = formatPLN(calc.netto, language);
  const items = [{key:"gross",value:calc.gross}, ...calc.rows.map(row=>({key:row.label,value:row.value,negative:true})), {key:"total",value:calc.netto}];
  const translationKeys = { pension:"pension", disability:"disability", sickness:"sicknessDed", health:"health", pit:"pit", ppk:"ppkDed" };
  el("[data-s-breakdown]").innerHTML = items.map((item,index)=>`<div class="salary-breakdown-row ${index===items.length-1?"is-total":""}"><dt>${tr(translationKeys[item.key]||item.key)}</dt><dd>${item.negative?"−":""}${formatPLN(item.value,language)}</dd></div>`).join("");
  const netPercent = gross ? calc.netto/gross*100 : 0, socialPercent = gross ? calc.social/gross*100 : 0, pitPercent = gross ? calc.pit/gross*100 : 0;
  el("[data-s-bar]").innerHTML = `<label>${tr("netto")} <meter min="0" max="100" value="${Math.min(100,netPercent)}">${Math.min(100,netPercent)}%</meter></label><label>ZUS <meter min="0" max="100" value="${Math.min(100,socialPercent)}">${Math.min(100,socialPercent)}%</meter></label><label>PIT <meter min="0" max="100" value="${Math.min(100,pitPercent)}">${Math.min(100,pitPercent)}%</meter></label>`;
  const employerItems = [...calc.employerRows, {label:"employerTotal",value:calc.employerTotal}];
  const employerMap = {employerPension:"employerPension",employerDisability:"employerDisability",employerAccident:"employerAccident",employerFP:"employerFP",employerFS:"employerFS",employerFGSP:"employerFGSP",employerPpk:"employerPpkDed",employerTotal:"total"};
  el("[data-s-employer]").innerHTML = calc.contract === "employment" ? `<div class="salary-breakdown-row"><dt>${tr("gross")}</dt><dd>${formatPLN(gross,language)}</dd></div>${employerItems.map(row=>`<div class="salary-breakdown-row ${row.label==="employerTotal"?"is-total":""}"><dt>${tr(employerMap[row.label]||row.label)}</dt><dd>${formatPLN(row.value,language)}</dd></div>`).join("")}` : `<p>${tr("employerVaries")}</p>`;
  el("[data-s-min-warning]").hidden = !(calc.contract === "employment" && readSettings().fulltime && gross < TAX_RULES[2026].minimumMonthly);
  el("[data-s-min-warning]").textContent = tr("warning");
  const noteKey = calc.contract === "employment" ? "employmentNote" : calc.contract === "mandate" ? "mandateNote" : "workNote";
  el("[data-s-assumptions]").innerHTML = `<p>${tr(noteKey)}</p>${calc.exempt?`<p>${tr("under26Note")}</p>`:""}${settingsHasEmployerPpk()?`<p>${tr("ppkNote")}</p>`:""}<p>${tr("employerAssumed")}</p>`;
  const settings = readSettings();
  if (lastContract !== settings.contract) { trackCalculatorEvent("salary_contract_changed"); lastContract = settings.contract; }
  if (!lastTrack) { trackCalculatorEvent("salary_calculator_used"); lastTrack = true; }
}
function settingsHasEmployerPpk() { return Boolean(el("[data-s-ppk]")?.checked); }
if (typeof document !== "undefined" && document.querySelector("[data-s-form]")) {
  el("[data-s-form]").addEventListener("input", () => calculateAndRender());
  el("[data-s-form]").addEventListener("change", event => { if (event.target.name === "salary-contract") renderOptions(); calculateAndRender(); });
  el("[data-s-amount]").addEventListener("blur", event => { const value = parseDecimal(event.target.value); if (value !== null && value >= 0 && value <= 1e9) event.target.value = formatNumber(value, language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); });
  document.querySelectorAll("[data-s-quick]").forEach(button => button.addEventListener("click", () => { el("[data-s-amount]").value = button.dataset.sQuick; calculateAndRender(); el("[data-s-amount]").focus(); }));
  bindLanguageChange(translateStatic);
  translateStatic();
}
