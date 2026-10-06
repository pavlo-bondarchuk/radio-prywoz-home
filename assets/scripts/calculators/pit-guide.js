const WORDS = {
  uk: {
    home:"Головна",services:"Сервіси",breadcrumb:"PIT у Польщі",badge:"Інформаційний сервіс",title:"PIT у Польщі",subtitle:"Річна податкова декларація простими словами",lead:"Допомагаємо зрозуміти, який PIT вам може знадобитися, що перевірити перед підтвердженням декларації та де подати її офіційно.",seasonEyebrow:"Податковий сезон",seasonBefore:"Новий сезон PIT відкриється 15 лютого",seasonOpen:"Триває розрахунок PIT",seasonAfter:"Стандартний строк подання завершено",seasonCopy:"Очікуваний загальний строк для розрахунку за 2026 рік: 15 лютого — 30 квітня 2027 року. Точні дати перевіряйте в офіційних повідомленнях.",seasonOpenCopy:"Загальний строк за щорічним правилом — до 30 квітня. Перевірте точні дати в офіційних повідомленнях.",seasonAfterCopy:"Перевірте декларацію або документи за минулий рік в офіційному сервісі.",daysLeft:"днів до відкриття сезону",daysDeadline:"днів до завершення",helperEyebrow:"Короткий навігатор",helperTitle:"Який PIT мені може знадобитися?",helperIntro:"Оберіть загальні обставини. Це орієнтир, а не юридичне визначення вашої податкової декларації.",incomeQuestion:"Як ви отримували дохід?",incomePayer:"Польський роботодавець / замовник",incomeBusiness:"Власна діяльність",incomeRental:"Оренда",incomeInvestments:"Інвестиції",incomeForeign:"Дохід за межами Польщі",incomeMultiple:"Кілька джерел доходу",contractQuestion:"Який тип договору?",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",unknown:"Не знаю",abroadQuestion:"Чи мали ви дохід за межами Польщі?",no:"Ні",yes:"Так",guideResult:"Попередній орієнтир",likely37:"Ймовірно вам може підійти PIT-37",likely36:"Ваш випадок може вимагати PIT-36",likely28:"Перевірте, чи потрібен PIT-28",likely38:"Перевірте, чи потрібен PIT-38",complex:"Ваш тип декларації залежить від додаткових обставин",copy37:"PIT-37 часто використовують для доходів, які польський платник показав у PIT-11. Інші доходи або обставини можуть змінити форму декларації.",copy36:"PIT-36 може стосуватися доходів, за якими ви самостійно розраховуєте податок. Перевірте інші джерела доходу та офіційні правила.",copy28:"PIT-28 стосується окремих доходів, оподаткованих ryczałt, зокрема приватної оренди у відповідних випадках.",copy38:"PIT-38 зазвичай стосується окремих доходів від капіталу та цінних паперів.",copyComplex:"Поєднання джерел доходу, дохід за кордоном або індивідуальні обставини можуть змінити потрібну форму. Перевірте ситуацію в офіційній інструкції або у фахівця.",to37:"Перейти до checklist PIT-37",toOfficial:"Перевірити офіційні форми PIT",noData:"Не вводьте PESEL, NIP, суми доходу чи дані документів.",referenceEyebrow:"Короткий довідник",typesTitle:"Поширені типи декларацій",type37:"Одна з найпоширеніших форм для доходів від роботи чи договорів, які розраховує польський платник.",type36:"Може стосуватися доходів, за якими людина самостійно розраховує податок, зокрема окремих видів діяльності або іноземних доходів.",type28:"Застосовується, зокрема, до оподаткування ryczałt у відповідних випадках, наприклад приватної оренди.",type38:"Використовується для окремих доходів від капіталу та цінних паперів.",typesCaveat:"Це загальні приклади. Поєднання джерел доходу та індивідуальні обставини можуть змінити потрібну форму.",processEyebrow:"Як це працює",flowTitle:"Від PIT-11 до річного розрахунку",flowWorkTitle:"Робота протягом року",flowWork:"Роботодавець або замовник виплачує дохід і сплачує авансові платежі.",flow11Title:"PIT-11 від платника",flow11:"Зазвичай до кінця лютого ви отримуєте інформацію про доходи, податки та внески.",flowServiceTitle:"Twój e-PIT",flowService:"У сервісі Міністерства фінансів з’являється попередньо підготовлена декларація.",flowCheckTitle:"Перевірка декларації",flowCheck:"Звірте всі доходи, пільги, сімейні дані та рахунок для повернення.",pit11Title:"Що таке PIT-11",pit11Copy:"PIT-11 — це інформація від роботодавця або іншого платника про ваші доходи, податки та внески за попередній рік.",pit11Several:"Якщо ви працювали у кількох роботодавців, перевірте, чи враховані всі PIT-11.",refundTitle:"Zwrot або dopłata",refundLabel:"Zwrot podatku:",refundCopy:"податкова повертає частину сплаченого податку, якщо виникла переплата.",dueLabel:"Dopłata:",dueCopy:"потрібно доплатити різницю, якщо авансів було недостатньо.",checklistEyebrow:"Перед підтвердженням",checklistTitle:"Що перевірити перед підтвердженням PIT",checklistIntro:"Позначки зберігаються лише у браузері на цьому пристрої.",checkSources:"Усі PIT-11 враховані",checkIncome:"Доходи та роботодавці правильні",checkReliefs:"Перевірено доступні податкові пільги",checkChildren:"Перевірено дані дітей, якщо це стосується вас",checkJoint:"Перевірено можливість спільного розрахунку з чоловіком / дружиною",checkBank:"Перевірено банківський рахунок для повернення",checkAmount:"Перевірено суму zwrot або dopłata",checkOpp:"За бажанням перевірено передачу 1,5% OPP",datesEyebrow:"Щороку",datesTitle:"Ключові дати PIT",datesNote:"Загальний строк для річної декларації — від 15 лютого до 30 квітня наступного року. Дати наступного сезону мають бути підтверджені офіційно.",dateFeb:"Зазвичай отримуємо PIT-11 від платника.",dateOpen:"Відкривається Twój e-PIT для попереднього податкового року.",dateWindow:"Перевіряємо та подаємо декларацію у встановлений строк.",dateDeadline:"Загальний кінцевий строк за чинним щорічним правилом.",officialEyebrow:"Офіційний сервіс",officialTitle:"Перевірте декларацію у Twój e-PIT",officialCopy:"Офіційний сервіс Міністерства фінансів Польщі. PRYWOZ не приймає документи та не подає декларації.",officialCta:"Відкрити Twój e-PIT",officialHint:"Для входу скористайтеся лише офіційними способами, запропонованими державним сервісом.",ukraineEyebrow:"Для українців",ukraineTitle:"PIT для українців у Польщі",ukraineCopy:"Громадянство саме по собі не визначає тип декларації. Важливі джерела доходу, місце роботи та податкова ситуація.",ukraineExample:"Якщо ви отримували дохід тільки від польського роботодавця, у багатьох випадках може використовуватися PIT-37.",ukraineWarning:"Якщо ви також мали доходи в Україні або іншій країні, розрахунок може бути складнішим.",salaryTitle:"Працюєте в Польщі?",salaryCopy:"Перевірте також орієнтовну зарплату brutto/netto.",salaryCta:"Калькулятор зарплати →",relatedTitle:"Корисні сервіси PRYWOZ",salaryLink:"Калькулятор зарплати",calendarLink:"Робочий календар",currencyLink:"Курси валют",rentLink:"Калькулятор оренди",sourcesTitle:"Джерела та актуальність",verified:"Офіційні матеріали перевірено 06.10.2026. Загальні пояснення не враховують усіх індивідуальних випадків.",disclaimer:"PRYWOZ допомагає зорієнтуватися у процесі розрахунку PIT, але не замінює податкову консультацію. Остаточну декларацію перевіряйте та подавайте через офіційні сервіси Польщі.",countdownDays:"днів"
  },
  pl: {
    home:"Strona główna",services:"Usługi",breadcrumb:"PIT w Polsce",badge:"Serwis informacyjny",title:"PIT w Polsce",subtitle:"Roczne zeznanie podatkowe prostym językiem",lead:"Wyjaśniamy, jaki PIT może Cię dotyczyć, co sprawdzić przed zatwierdzeniem zeznania i gdzie złożyć je oficjalnie.",seasonEyebrow:"Sezon podatkowy",seasonBefore:"Nowy sezon PIT rozpocznie się 15 lutego",seasonOpen:"Trwa rozliczenie PIT",seasonAfter:"Standardowy termin składania minął",seasonCopy:"Oczekiwany ogólny termin rozliczenia za 2026 rok: 15 lutego — 30 kwietnia 2027 roku. Dokładne daty sprawdzaj w oficjalnych komunikatach.",seasonOpenCopy:"Ogólny termin zgodnie z coroczną zasadą upływa 30 kwietnia. Dokładne daty sprawdź w oficjalnych komunikatach.",seasonAfterCopy:"Sprawdź zeznanie lub dokumenty za poprzedni rok w oficjalnej usłudze.",daysLeft:"dni do rozpoczęcia sezonu",daysDeadline:"dni do końca",helperEyebrow:"Krótki przewodnik",helperTitle:"Jaki PIT może mnie dotyczyć?",helperIntro:"Wybierz ogólne okoliczności. To wskazówka, a nie prawna kwalifikacja Twojego zeznania.",incomeQuestion:"Jak uzyskiwałeś(-aś) dochód?",incomePayer:"Polski pracodawca / zleceniodawca",incomeBusiness:"Własna działalność",incomeRental:"Najem",incomeInvestments:"Inwestycje",incomeForeign:"Dochód poza Polską",incomeMultiple:"Kilka źródeł dochodu",contractQuestion:"Jaki rodzaj umowy?",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",unknown:"Nie wiem",abroadQuestion:"Czy uzyskiwałeś(-aś) dochód poza Polską?",no:"Nie",yes:"Tak",guideResult:"Wstępna wskazówka",likely37:"Prawdopodobnie może Cię dotyczyć PIT-37",likely36:"W Twojej sytuacji może być potrzebny PIT-36",likely28:"Sprawdź, czy dotyczy Cię PIT-28",likely38:"Sprawdź, czy dotyczy Cię PIT-38",complex:"Rodzaj zeznania zależy od dodatkowych okoliczności",copy37:"PIT-37 jest często stosowany do dochodów wykazanych w PIT-11 przez polskiego płatnika. Inne dochody lub okoliczności mogą zmienić formularz.",copy36:"PIT-36 może dotyczyć dochodów, od których samodzielnie obliczasz podatek. Sprawdź inne źródła dochodu i oficjalne zasady.",copy28:"PIT-28 dotyczy niektórych przychodów opodatkowanych ryczałtem, w tym w odpowiednich przypadkach najmu prywatnego.",copy38:"PIT-38 zwykle dotyczy wybranych dochodów kapitałowych i papierów wartościowych.",copyComplex:"Połączenie źródeł dochodu, dochód zagraniczny lub indywidualne okoliczności mogą zmienić właściwy formularz. Sprawdź sytuację w oficjalnych informacjach lub u specjalisty.",to37:"Przejdź do checklisty PIT-37",toOfficial:"Sprawdź oficjalne formularze PIT",noData:"Nie wpisuj PESEL-u, NIP-u, kwot dochodu ani danych dokumentów.",referenceEyebrow:"Krótki informator",typesTitle:"Popularne formularze PIT",type37:"Jeden z najczęstszych formularzy dla dochodów z pracy lub umów rozliczanych przez polskiego płatnika.",type36:"Może dotyczyć dochodów, od których podatnik sam oblicza podatek, np. niektórych rodzajów działalności lub dochodów zagranicznych.",type28:"Stosowany m.in. do ryczałtu w odpowiednich przypadkach, na przykład najmu prywatnego.",type38:"Używany dla wybranych dochodów kapitałowych i papierów wartościowych.",typesCaveat:"To ogólne przykłady. Połączenie źródeł dochodu i indywidualna sytuacja mogą zmienić właściwy formularz.",processEyebrow:"Jak to działa",flowTitle:"Od PIT-11 do rocznego rozliczenia",flowWorkTitle:"Praca w ciągu roku",flowWork:"Pracodawca lub zleceniodawca wypłaca dochód i odprowadza zaliczki.",flow11Title:"PIT-11 od płatnika",flow11:"Zazwyczaj do końca lutego otrzymujesz informację o dochodach, podatkach i składkach.",flowServiceTitle:"Twój e-PIT",flowService:"W usłudze Ministerstwa Finansów pojawia się wstępnie przygotowane zeznanie.",flowCheckTitle:"Sprawdzenie zeznania",flowCheck:"Sprawdź wszystkie dochody, ulgi, dane rodzinne i rachunek do zwrotu.",pit11Title:"Czym jest PIT-11",pit11Copy:"PIT-11 to informacja od pracodawcy lub innego płatnika o dochodach, podatkach i składkach za poprzedni rok.",pit11Several:"Jeśli pracowałeś(-aś) dla kilku pracodawców, sprawdź, czy uwzględniono wszystkie PIT-11.",refundTitle:"Zwrot lub dopłata",refundLabel:"Zwrot podatku:",refundCopy:"urząd zwraca część zapłaconego podatku, jeśli powstała nadpłata.",dueLabel:"Dopłata:",dueCopy:"trzeba dopłacić różnicę, jeśli zaliczki były za niskie.",checklistEyebrow:"Przed zatwierdzeniem",checklistTitle:"Co sprawdzić przed zatwierdzeniem PIT",checklistIntro:"Zaznaczenia są zapisywane tylko w przeglądarce na tym urządzeniu.",checkSources:"Uwzględniono wszystkie PIT-11",checkIncome:"Dochody i pracodawcy są poprawni",checkReliefs:"Sprawdzono dostępne ulgi podatkowe",checkChildren:"Sprawdzono dane dzieci, jeśli Cię dotyczą",checkJoint:"Sprawdzono możliwość wspólnego rozliczenia z małżonkiem",checkBank:"Sprawdzono rachunek bankowy do zwrotu",checkAmount:"Sprawdzono kwotę zwrotu lub dopłaty",checkOpp:"Opcjonalnie sprawdzono przekazanie 1,5% OPP",datesEyebrow:"Co roku",datesTitle:"Najważniejsze terminy PIT",datesNote:"Ogólny termin rocznego zeznania przypada od 15 lutego do 30 kwietnia następnego roku. Daty kolejnego sezonu muszą być potwierdzone oficjalnie.",dateFeb:"Zazwyczaj otrzymujemy PIT-11 od płatnika.",dateOpen:"Twój e-PIT udostępnia zeznanie za poprzedni rok podatkowy.",dateWindow:"Sprawdzamy i składamy zeznanie w wyznaczonym terminie.",dateDeadline:"Ogólny termin wynikający z aktualnej corocznej zasady.",officialEyebrow:"Usługa oficjalna",officialTitle:"Sprawdź zeznanie w Twój e-PIT",officialCopy:"Oficjalna usługa Ministerstwa Finansów. PRYWOZ nie przyjmuje dokumentów ani nie składa zeznań.",officialCta:"Otwórz Twój e-PIT",officialHint:"Loguj się wyłącznie oficjalnymi metodami oferowanymi przez usługę państwową.",ukraineEyebrow:"Dla obywateli Ukrainy",ukraineTitle:"PIT dla Ukraińców w Polsce",ukraineCopy:"Samo obywatelstwo nie określa rodzaju zeznania. Liczą się źródła dochodu, miejsce pracy i sytuacja podatkowa.",ukraineExample:"Jeśli dochód pochodził wyłącznie od polskiego pracodawcy, w wielu przypadkach może mieć zastosowanie PIT-37.",ukraineWarning:"Jeśli uzyskiwałeś(-aś) dochody także w Ukrainie lub innym kraju, rozliczenie może być bardziej złożone.",salaryTitle:"Pracujesz w Polsce?",salaryCopy:"Sprawdź także orientacyjne wynagrodzenie brutto/netto.",salaryCta:"Kalkulator wynagrodzenia →",relatedTitle:"Przydatne usługi PRYWOZ",salaryLink:"Kalkulator wynagrodzenia",calendarLink:"Kalendarz pracy",currencyLink:"Kursy walut",rentLink:"Kalkulator najmu",sourcesTitle:"Źródła i aktualność",verified:"Oficjalne materiały sprawdzono 06.10.2026. Ogólne informacje nie obejmują wszystkich indywidualnych przypadków.",disclaimer:"PRYWOZ pomaga zorientować się w rocznym rozliczeniu PIT, ale nie zastępuje porady podatkowej. Ostateczne zeznanie sprawdź i złóż za pomocą oficjalnych usług w Polsce.",countdownDays:"dni"
  },
  ru: {
    home:"Главная",services:"Сервисы",breadcrumb:"PIT в Польше",badge:"Информационный сервис",title:"PIT в Польше",subtitle:"Годовая налоговая декларация простыми словами",lead:"Помогаем понять, какая форма PIT может вам подойти, что проверить перед подтверждением декларации и где подать её официально.",seasonEyebrow:"Налоговый сезон",seasonBefore:"Новый сезон PIT откроется 15 февраля",seasonOpen:"Идёт расчёт PIT",seasonAfter:"Стандартный срок подачи завершён",seasonCopy:"Ожидаемый общий срок расчёта за 2026 год: 15 февраля — 30 апреля 2027 года. Точные даты проверяйте в официальных сообщениях.",seasonOpenCopy:"Общий срок по ежегодному правилу — до 30 апреля. Проверьте точные даты в официальных сообщениях.",seasonAfterCopy:"Проверьте декларацию или документы за прошлый год в официальном сервисе.",daysLeft:"дней до начала сезона",daysDeadline:"дней до завершения",helperEyebrow:"Краткий навигатор",helperTitle:"Какая форма PIT может мне подойти?",helperIntro:"Выберите общие обстоятельства. Это ориентир, а не юридическое определение вашей декларации.",incomeQuestion:"Как вы получали доход?",incomePayer:"Польский работодатель / заказчик",incomeBusiness:"Собственная деятельность",incomeRental:"Аренда",incomeInvestments:"Инвестиции",incomeForeign:"Доход за пределами Польши",incomeMultiple:"Несколько источников дохода",contractQuestion:"Какой тип договора?",employment:"Umowa o pracę",mandate:"Umowa zlecenie",work:"Umowa o dzieło",unknown:"Не знаю",abroadQuestion:"Был ли у вас доход за пределами Польши?",no:"Нет",yes:"Да",guideResult:"Предварительный ориентир",likely37:"Вероятно, вам может подойти PIT-37",likely36:"В вашей ситуации может потребоваться PIT-36",likely28:"Проверьте, нужна ли вам PIT-28",likely38:"Проверьте, нужна ли вам PIT-38",complex:"Форма декларации зависит от дополнительных обстоятельств",copy37:"PIT-37 часто используют для доходов, которые польский плательщик указал в PIT-11. Другие доходы или обстоятельства могут изменить форму.",copy36:"PIT-36 может относиться к доходам, по которым вы самостоятельно рассчитываете налог. Проверьте другие источники дохода и официальные правила.",copy28:"PIT-28 применяется к отдельным доходам, облагаемым ryczałt, например к частной аренде в предусмотренных случаях.",copy38:"PIT-38 обычно касается отдельных доходов от капитала и ценных бумаг.",copyComplex:"Сочетание источников дохода, доход за границей или личные обстоятельства могут изменить форму. Проверьте ситуацию по официальной инструкции или у специалиста.",to37:"Перейти к checklist PIT-37",toOfficial:"Проверить официальные формы PIT",noData:"Не вводите PESEL, NIP, суммы дохода или данные документов.",referenceEyebrow:"Краткая справка",typesTitle:"Распространённые формы деклараций",type37:"Одна из самых распространённых форм для доходов от работы или договоров, которые рассчитывает польский плательщик.",type36:"Может относиться к доходам, по которым человек сам рассчитывает налог, например к отдельным видам деятельности или зарубежным доходам.",type28:"Применяется, в частности, к ryczałt в предусмотренных случаях, например к частной аренде.",type38:"Используется для некоторых доходов от капитала и ценных бумаг.",typesCaveat:"Это общие примеры. Сочетание доходов и личные обстоятельства могут изменить нужную форму.",processEyebrow:"Как это работает",flowTitle:"От PIT-11 к годовому расчёту",flowWorkTitle:"Работа в течение года",flowWork:"Работодатель или заказчик выплачивает доход и перечисляет авансовые платежи.",flow11Title:"PIT-11 от плательщика",flow11:"Обычно до конца февраля вы получаете сведения о доходах, налогах и взносах.",flowServiceTitle:"Twój e-PIT",flowService:"В сервисе Министерства финансов появляется предварительно подготовленная декларация.",flowCheckTitle:"Проверка декларации",flowCheck:"Сверьте все доходы, льготы, семейные данные и счёт для возврата.",pit11Title:"Что такое PIT-11",pit11Copy:"PIT-11 — сведения от работодателя или другого плательщика о ваших доходах, налогах и взносах за прошлый год.",pit11Several:"Если вы работали у нескольких работодателей, проверьте, учтены ли все PIT-11.",refundTitle:"Zwrot или dopłata",refundLabel:"Zwrot podatku:",refundCopy:"налоговая возвращает часть уплаченного налога, если возникла переплата.",dueLabel:"Dopłata:",dueCopy:"нужно доплатить разницу, если авансовых платежей было недостаточно.",checklistEyebrow:"Перед подтверждением",checklistTitle:"Что проверить перед подтверждением PIT",checklistIntro:"Отметки сохраняются только в браузере на этом устройстве.",checkSources:"Учтены все PIT-11",checkIncome:"Доходы и работодатели указаны верно",checkReliefs:"Проверены доступные налоговые льготы",checkChildren:"Проверены данные детей, если это относится к вам",checkJoint:"Проверена возможность совместного расчёта с супругом или супругой",checkBank:"Проверен банковский счёт для возврата",checkAmount:"Проверена сумма возврата или доплаты",checkOpp:"При желании проверена передача 1,5% OPP",datesEyebrow:"Каждый год",datesTitle:"Ключевые даты PIT",datesNote:"Общий срок годовой декларации — с 15 февраля по 30 апреля следующего года. Даты следующего сезона должны быть подтверждены официально.",dateFeb:"Обычно получаем PIT-11 от плательщика.",dateOpen:"Twój e-PIT открывает декларацию за предыдущий налоговый год.",dateWindow:"Проверяем и подаём декларацию в установленный срок.",dateDeadline:"Общий конечный срок по действующему ежегодному правилу.",officialEyebrow:"Официальный сервис",officialTitle:"Проверьте декларацию в Twój e-PIT",officialCopy:"Официальный сервис Министерства финансов Польши. PRYWOZ не принимает документы и не подаёт декларации.",officialCta:"Открыть Twój e-PIT",officialHint:"Для входа используйте только официальные способы, предложенные государственным сервисом.",ukraineEyebrow:"Для украинцев",ukraineTitle:"PIT для украинцев в Польше",ukraineCopy:"Гражданство само по себе не определяет тип декларации. Важны источники дохода, место работы и налоговая ситуация.",ukraineExample:"Если доход был только от польского работодателя, во многих случаях может использоваться PIT-37.",ukraineWarning:"Если у вас также были доходы в Украине или другой стране, расчёт может быть сложнее.",salaryTitle:"Работаете в Польше?",salaryCopy:"Проверьте также примерную зарплату brutto/netto.",salaryCta:"Калькулятор зарплаты →",relatedTitle:"Полезные сервисы PRYWOZ",salaryLink:"Калькулятор зарплаты",calendarLink:"Рабочий календарь",currencyLink:"Курсы валют",rentLink:"Калькулятор аренды",sourcesTitle:"Источники и актуальность",verified:"Официальные материалы проверены 06.10.2026. Общие пояснения не учитывают все индивидуальные случаи.",disclaimer:"PRYWOZ помогает сориентироваться в годовом расчёте PIT, но не заменяет налоговую консультацию. Итоговую декларацию проверяйте и подавайте через официальные сервисы Польши.",countdownDays:"дней"
  }
};

const LANGS = ["uk", "pl", "ru"];
const EXTRA_WORDS = {
  uk: { chooseIncome:"Оберіть варіант", answerIncome:"Спершу оберіть, як ви отримували дохід.", initialCopy:"Після відповідей покажемо загальний орієнтир. Результат не замінює офіційної перевірки.", answerContract:"Оберіть тип договору або варіант «Не знаю».", answerAbroad:"Вкажіть, чи мали ви дохід за межами Польщі.", foreignConflict:"Відповіді суперечать одна одній. Перевірте, чи справді ви мали дохід за межами Польщі.", contractEmployment:"За umowa o pracę PIT-11 від роботодавця часто використовується для підготовки річного розрахунку. Сам договір не гарантує конкретної форми.", contractMandate:"За umowa zlecenie платник може передати PIT-11. Сам договір не визначає остаточну форму декларації.", contractWork:"За umowa o dzieło платник може передати PIT-11. Перевірте всі джерела доходу перед вибором форми.", contractUnknown:"Якщо тип договору невідомий, звірте отримані PIT-11 та інші джерела доходу." },
  pl: { chooseIncome:"Wybierz odpowiedź", answerIncome:"Najpierw wybierz, z jakiego źródła pochodził dochód.", initialCopy:"Po udzieleniu odpowiedzi pokażemy ogólną wskazówkę. Wynik nie zastępuje oficjalnej weryfikacji.", answerContract:"Wybierz rodzaj umowy lub opcję „Nie wiem”.", answerAbroad:"Określ, czy uzyskiwałeś(-aś) dochód poza Polską.", foreignConflict:"Odpowiedzi są sprzeczne. Sprawdź, czy uzyskiwałeś(-aś) dochód poza Polską.", contractEmployment:"Przy umowie o pracę pracodawca często przekazuje PIT-11 do rocznego rozliczenia. Sama umowa nie przesądza o formularzu.", contractMandate:"Przy umowie zlecenie płatnik może przekazać PIT-11. Sama umowa nie określa ostatecznego formularza.", contractWork:"Przy umowie o dzieło płatnik może przekazać PIT-11. Przed wyborem formularza sprawdź wszystkie źródła dochodu.", contractUnknown:"Jeśli nie znasz rodzaju umowy, sprawdź otrzymane PIT-11 i pozostałe źródła dochodu." },
  ru: { chooseIncome:"Выберите вариант", answerIncome:"Сначала выберите, откуда вы получали доход.", initialCopy:"После ответов покажем общий ориентир. Он не заменяет официальную проверку.", answerContract:"Выберите тип договора или вариант «Не знаю».", answerAbroad:"Укажите, был ли у вас доход за пределами Польши.", foreignConflict:"Ответы противоречат друг другу. Проверьте, действительно ли у вас был доход за пределами Польши.", contractEmployment:"При umowa o pracę работодатель часто передаёт PIT-11 для годового расчёта. Сам договор не определяет точную форму.", contractMandate:"При umowa zlecenie плательщик может передать PIT-11. Сам договор не определяет итоговую форму декларации.", contractWork:"При umowa o dzieło плательщик может передать PIT-11. Перед выбором формы проверьте все источники дохода.", contractUnknown:"Если тип договора неизвестен, проверьте полученные PIT-11 и другие источники дохода." }
};
const QUIZ_WORDS = {
  uk: {
    helperEyebrow:"Квіз із результатом",helperTitle:"Пройдіть квіз і дізнайтеся, що перевірити",helperIntro:"Відповідайте на 2–3 запитання. Наприкінці ви отримаєте попередній орієнтир щодо форми PIT і персональний список наступних перевірок. Це не юридична консультація.",
    step:"Крок {current} із {total}",done:"Квіз завершено · {total} відповіді",continue:"Продовжити",showResult:"Показати результат",back:"Назад",changeAnswers:"Змінити відповіді",answerError:"Оберіть відповідь, щоб продовжити.",quizChecklistTitle:"Що перевірити далі",
    foreignQuestion:"Чи мали ви також дохід за межами Польщі?",domesticQuestion:"Чи мали ви також дохід від польського джерела?",initialTitle:"Результат з’явиться після квізу",initialCopy:"Квіз поставить кілька коротких запитань і підготує обережний орієнтир та персональні наступні кроки.",resultEyebrow:"Ваш попередній орієнтир",reported:"Ваші відповіді (зі слів, не перевірені документами):",resultChecklist:"Що перевірити далі",restart:"Пройти квіз знову",toGuide:"Переглянути пояснення форми",toOfficialGuide:"Перевірити офіційні пояснення",
    sourcePayer:"Польський роботодавець або замовник",sourceBusiness:"Власна діяльність",sourceRental:"Оренда",sourceInvestments:"Інвестиції",sourceForeign:"Дохід за межами Польщі",sourceMultiple:"Кілька джерел доходу",contractLabel:"Тип договору",abroadLabel:"Дохід за межами Польщі",domesticLabel:"Дохід із польського джерела",answerYes:"Так",answerNo:"Ні",contractEmployment:"Umowa o pracę",contractMandate:"Umowa zlecenie",contractWork:"Umowa o dzieło",contractUnknown:"Не знаю",
    stepPayerContract:"За яким договором ви отримували дохід від польського платника?",stepForeignDomestic:"Окрім доходу за кордоном, чи був у вас дохід із польського джерела?",stepOtherAbroad:"Чи мали ви також дохід за межами Польщі?",
    likely37:"Ймовірно, варто почати з PIT-37",likely36:"Можливо, вам потрібно перевірити PIT-36",likely28:"Перевірте, чи стосується вас PIT-28",likely38:"Перевірте, чи стосується вас PIT-38",complex:"Ваш випадок потребує додаткової перевірки",complexForeign:"Дохід з-за кордону може вимагати окремої перевірки",complexMultiple:"Кілька джерел доходу можуть змінити форму декларації",
    copy37:"PIT-37 часто стосується доходів, які польський платник показав у PIT-11. Остаточну форму перевірте у Twój e-PIT та за офіційними правилами.",copy36:"За власної діяльності форма залежить від способу оподаткування та джерел доходу. Перевірте інформацію у Twój e-PIT або офіційній інструкції.",copy28:"Для оренди форма залежить, зокрема, від того, чи це приватна оренда та як вона оподатковувалася. Перевірте PIT-28 та офіційні правила.",copy38:"PIT-38 може стосуватися окремих доходів від капіталу. Звірте тип інвестиційного доходу з отриманою інформацією та офіційними правилами.",copyComplex:"За вказаних обставин не можна надійно визначити форму лише з цих відповідей. Перевірте офіційну інформацію або зверніться до податкового фахівця.",
    check37a:"Зіставте кожен PIT-11 із відповідним договором і періодом роботи.",check37b:"Перевірте, чи відображено у Twój e-PIT інші джерела або виплати, якщо вони були.",check37c:"Перегляньте пояснення до форми PIT-37 у державному сервісі.",check36a:"З’ясуйте, який спосіб оподаткування застосовувався до діяльності.",check36b:"Перевірте, чи податкові аванси та інформація від платників враховані у річному розрахунку.",check36c:"Порівняйте свою ситуацію з офіційними умовами PIT-36.",check28a:"Уточніть, чи йдеться про приватну оренду чи інший вид діяльності.",check28b:"Знайдіть дані про оподаткування оренди та звірте їх з офіційними правилами PIT-28.",check28c:"Перевірте, чи не було інших джерел доходу, що впливають на річний розрахунок.",check38a:"Визначте тип доходу від інвестицій і знайдіть відповідну інформацію від брокера або платника.",check38b:"Перевірте офіційні пояснення, чи охоплює PIT-38 саме ваш тип доходу.",check38c:"З’ясуйте, чи були інші доходи, які потрібно подати окремо.",checkForeignA:"Визначте податкове резидентство за відповідний рік і правила, що застосовуються до вашої ситуації.",checkForeignB:"Зберіть офіційні річні довідки про доходи та сплачений за кордоном податок.",checkForeignC:"Перевірте правила уникнення подвійного оподаткування для відповідних країн.",checkMultipleA:"Складіть перелік усіх видів доходу та платників за рік.",checkMultipleB:"Звірте річні довідки кожного платника з даними у Twój e-PIT.",checkMultipleC:"Перевірте офіційні вказівки щодо поєднання цих джерел доходу.",checkBusinessForeign:"Окремо перевірте, як іноземний дохід впливає на звітність за діяльністю.",checkRentalForeign:"Перевірте правила для оренди та доходу з-за кордону окремо, перш ніж обирати форму."
  },
  pl: {
    helperEyebrow:"Quiz z wynikiem",helperTitle:"Rozwiąż quiz i sprawdź, co warto zweryfikować",helperIntro:"Odpowiedz na 2–3 pytania. Na końcu otrzymasz wstępną wskazówkę dotyczącą formularza PIT i własną listę dalszych spraw do sprawdzenia. To nie jest porada prawna.",
    step:"Krok {current} z {total}",done:"Quiz zakończony · odpowiedzi: {total}",continue:"Dalej",showResult:"Pokaż wynik",back:"Wstecz",changeAnswers:"Zmień odpowiedzi",answerError:"Wybierz odpowiedź, aby przejść dalej.",quizChecklistTitle:"Co sprawdzić dalej",
    foreignQuestion:"Czy uzyskiwałeś(-aś) także dochód poza Polską?",domesticQuestion:"Czy uzyskiwałeś(-aś) także dochód z polskiego źródła?",initialTitle:"Wynik pojawi się po quizie",initialCopy:"Quiz zada kilka krótkich pytań, a następnie pokaże ostrożną wskazówkę i indywidualne kolejne kroki.",resultEyebrow:"Wstępna wskazówka",reported:"Twoje odpowiedzi (na podstawie deklaracji, bez weryfikacji dokumentów):",resultChecklist:"Co sprawdzić dalej",restart:"Rozwiąż quiz ponownie",toGuide:"Zobacz wyjaśnienie formularza",toOfficialGuide:"Sprawdź oficjalne informacje",
    sourcePayer:"Polski pracodawca lub zleceniodawca",sourceBusiness:"Własna działalność",sourceRental:"Najem",sourceInvestments:"Inwestycje",sourceForeign:"Dochód poza Polską",sourceMultiple:"Kilka źródeł dochodu",contractLabel:"Rodzaj umowy",abroadLabel:"Dochód poza Polską",domesticLabel:"Dochód z polskiego źródła",answerYes:"Tak",answerNo:"Nie",contractEmployment:"Umowa o pracę",contractMandate:"Umowa zlecenie",contractWork:"Umowa o dzieło",contractUnknown:"Nie wiem",
    stepPayerContract:"Na podstawie jakiej umowy uzyskiwałeś(-aś) dochód od polskiego płatnika?",stepForeignDomestic:"Czy oprócz dochodu zagranicznego uzyskiwałeś(-aś) dochód z polskiego źródła?",stepOtherAbroad:"Czy uzyskiwałeś(-aś) także dochód poza Polską?",
    likely37:"Prawdopodobnie warto zacząć od PIT-37",likely36:"Możliwe, że należy sprawdzić PIT-36",likely28:"Sprawdź, czy dotyczy Cię PIT-28",likely38:"Sprawdź, czy dotyczy Cię PIT-38",complex:"Twoja sytuacja wymaga dodatkowej weryfikacji",complexForeign:"Dochód zagraniczny może wymagać osobnej weryfikacji",complexMultiple:"Kilka źródeł dochodu może zmienić formularz zeznania",
    copy37:"PIT-37 często dotyczy dochodów wykazanych przez polskiego płatnika w PIT-11. Ostateczny formularz sprawdź w Twój e-PIT i według oficjalnych zasad.",copy36:"Przy własnej działalności formularz zależy m.in. od sposobu opodatkowania i źródeł dochodu. Sprawdź informacje w Twój e-PIT lub oficjalnej instrukcji.",copy28:"W przypadku najmu formularz zależy m.in. od tego, czy jest to najem prywatny i jak był opodatkowany. Sprawdź PIT-28 oraz oficjalne zasady.",copy38:"PIT-38 może dotyczyć wybranych dochodów kapitałowych. Porównaj rodzaj dochodu inwestycyjnego z otrzymanymi informacjami i oficjalnymi zasadami.",copyComplex:"Na podstawie tych odpowiedzi nie można wiarygodnie określić formularza. Sprawdź oficjalne informacje lub skonsultuj się ze specjalistą.",
    check37a:"Porównaj każdy PIT-11 z odpowiednią umową i okresem pracy.",check37b:"Sprawdź, czy Twój e-PIT uwzględnia inne źródła lub wypłaty, jeśli występowały.",check37c:"Przeczytaj oficjalne objaśnienia formularza PIT-37.",check36a:"Ustal, jaka forma opodatkowania działalności była stosowana.",check36b:"Sprawdź, czy zaliczki podatkowe i informacje od płatników uwzględniono w rozliczeniu rocznym.",check36c:"Porównaj swoją sytuację z oficjalnymi warunkami PIT-36.",check28a:"Ustal, czy chodzi o najem prywatny czy inny rodzaj działalności.",check28b:"Znajdź informacje o opodatkowaniu najmu i porównaj je z oficjalnymi zasadami PIT-28.",check28c:"Sprawdź, czy inne źródła dochodu wpływają na rozliczenie roczne.",check38a:"Określ rodzaj dochodu inwestycyjnego i znajdź odpowiednią informację od brokera lub płatnika.",check38b:"Sprawdź oficjalne wyjaśnienia, czy PIT-38 obejmuje Twój rodzaj dochodu.",check38c:"Ustal, czy były inne dochody wymagające osobnego wykazania.",checkForeignA:"Ustal rezydencję podatkową za dany rok i zasady dotyczące Twojej sytuacji.",checkForeignB:"Zbierz oficjalne roczne informacje o dochodach i podatku zapłaconym za granicą.",checkForeignC:"Sprawdź zasady unikania podwójnego opodatkowania dla właściwych państw.",checkMultipleA:"Sporządź listę wszystkich rodzajów dochodu i płatników z danego roku.",checkMultipleB:"Porównaj roczne informacje od każdego płatnika z danymi w Twój e-PIT.",checkMultipleC:"Sprawdź oficjalne wskazówki dotyczące łączenia tych źródeł dochodu.",checkBusinessForeign:"Osobno sprawdź, jak dochód zagraniczny wpływa na rozliczenie działalności.",checkRentalForeign:"Przed wyborem formularza osobno sprawdź zasady dotyczące najmu i dochodu zagranicznego."
  },
  ru: {
    helperEyebrow:"Квиз с результатом",helperTitle:"Пройдите квиз и узнайте, что проверить",helperIntro:"Ответьте на 2–3 вопроса. В конце вы получите предварительный ориентир по форме PIT и персональный список следующих проверок. Это не юридическая консультация.",
    step:"Шаг {current} из {total}",done:"Квиз завершён · ответов: {total}",continue:"Продолжить",showResult:"Показать результат",back:"Назад",changeAnswers:"Изменить ответы",answerError:"Выберите ответ, чтобы продолжить.",quizChecklistTitle:"Что проверить дальше",
    foreignQuestion:"Был ли у вас также доход за пределами Польши?",domesticQuestion:"Был ли у вас также доход из польского источника?",initialTitle:"Результат появится после квиза",initialCopy:"Квиз задаст несколько коротких вопросов и подготовит осторожный ориентир и персональные следующие шаги.",resultEyebrow:"Предварительный ориентир",reported:"Ваши ответы (со слов, без проверки документов):",resultChecklist:"Что проверить дальше",restart:"Пройти квиз снова",toGuide:"Посмотреть пояснение формы",toOfficialGuide:"Проверить официальные пояснения",
    sourcePayer:"Польский работодатель или заказчик",sourceBusiness:"Собственная деятельность",sourceRental:"Аренда",sourceInvestments:"Инвестиции",sourceForeign:"Доход за пределами Польши",sourceMultiple:"Несколько источников дохода",contractLabel:"Тип договора",abroadLabel:"Доход за пределами Польши",domesticLabel:"Доход из польского источника",answerYes:"Да",answerNo:"Нет",contractEmployment:"Umowa o pracę",contractMandate:"Umowa zlecenie",contractWork:"Umowa o dzieło",contractUnknown:"Не знаю",
    stepPayerContract:"По какому договору вы получали доход от польского плательщика?",stepForeignDomestic:"Был ли у вас, помимо зарубежного дохода, доход из польского источника?",stepOtherAbroad:"Был ли у вас также доход за пределами Польши?",
    likely37:"Вероятно, стоит начать с PIT-37",likely36:"Возможно, нужно проверить PIT-36",likely28:"Проверьте, относится ли к вам PIT-28",likely38:"Проверьте, относится ли к вам PIT-38",complex:"Ваша ситуация требует дополнительной проверки",complexForeign:"Зарубежный доход требует отдельной проверки",complexMultiple:"Несколько источников дохода могут повлиять на форму декларации",
    copy37:"PIT-37 часто относится к доходам, которые польский плательщик указал в PIT-11. Итоговую форму проверьте в Twój e-PIT и по официальным правилам.",copy36:"При собственной деятельности форма зависит от способа налогообложения и источников дохода. Проверьте информацию в Twój e-PIT или официальной инструкции.",copy28:"Для аренды форма зависит, в частности, от того, частная ли это аренда и как она облагалась налогом. Проверьте PIT-28 и официальные правила.",copy38:"PIT-38 может относиться к отдельным доходам от капитала. Сопоставьте тип инвестиционного дохода с полученными сведениями и официальными правилами.",copyComplex:"По этим ответам нельзя надёжно определить форму. Проверьте официальную информацию или обратитесь к налоговому специалисту.",
    check37a:"Сопоставьте каждый PIT-11 с соответствующим договором и периодом работы.",check37b:"Проверьте, отражены ли в Twój e-PIT другие источники или выплаты, если они были.",check37c:"Изучите официальные пояснения к форме PIT-37.",check36a:"Уточните, какой способ налогообложения применялся к деятельности.",check36b:"Проверьте, учтены ли авансовые платежи и сведения плательщиков в годовом расчёте.",check36c:"Сравните свою ситуацию с официальными условиями PIT-36.",check28a:"Уточните, идёт ли речь о частной аренде или другом виде деятельности.",check28b:"Найдите сведения о налогообложении аренды и сравните их с официальными правилами PIT-28.",check28c:"Проверьте, влияют ли другие источники дохода на годовой расчёт.",check38a:"Определите тип инвестиционного дохода и найдите сведения от брокера или плательщика.",check38b:"Проверьте официальные пояснения, охватывает ли PIT-38 ваш тип дохода.",check38c:"Уточните, были ли другие доходы, которые нужно указать отдельно.",checkForeignA:"Определите налоговое резидентство за соответствующий год и применимые правила.",checkForeignB:"Соберите официальные годовые сведения о доходах и налоге, уплаченном за рубежом.",checkForeignC:"Проверьте правила об избежании двойного налогообложения для соответствующих стран.",checkMultipleA:"Составьте список всех видов дохода и плательщиков за год.",checkMultipleB:"Сверьте годовые сведения от каждого плательщика с данными в Twój e-PIT.",checkMultipleC:"Проверьте официальные правила сочетания этих источников дохода.",checkBusinessForeign:"Отдельно проверьте, как зарубежный доход влияет на отчётность по деятельности.",checkRentalForeign:"До выбора формы отдельно проверьте правила аренды и зарубежного дохода."
  }
};
const QUIZ_FLOW_WORDS = {
  uk:{helperEyebrow:"Квіз PIT",helperTitle:"З’ясуйте, що перевірити у своєму PIT",helperIntro:"Оберіть усі джерела доходу та пройдіть 3–5 коротких кроків. Побачите лише уточнення для вибраних джерел, а наприкінці — попередній орієнтир і персональний список перевірок. Відповіді не перевіряються документами й не є податковою консультацією.",sourcesQuestion:"Які джерела доходу у вас були? Оберіть усі відповідні варіанти.",sourceWork:"Робота або договори через польського платника",sourceBusiness:"Власна діяльність",sourceRental:"Приватна оренда житла",sourceInvestments:"Інвестиції / доходи від капіталу",sourceForeign:"Дохід за межами Польщі",sourceOther:"Інше або не впевнений(-а)",detailsQuestion:"Уточніть деталі вибраних джерел доходу",workDetailsTitle:"Робота через польського платника",pit11Question:"Чи отримали ви PIT-11 від усіх роботодавців / замовників?",contractsQuestion:"Які договори у вас були? Оберіть усі відповідні.",businessDetailsTitle:"Як оподатковувалася діяльність?",businessMethodQuestion:"Оберіть відомий вам спосіб",methodScale:"Skala podatkowa",methodLinear:"Podatek liniowy",methodLump:"Ryczałt",rentalDetailsTitle:"Якою була оренда?",rentalTypeQuestion:"Уточніть тип оренди",rentalPrivate:"Приватна оренда поза господарською діяльністю",rentalBusiness:"Оренда в межах власної діяльності",investmentDetailsTitle:"Інвестиційний дохід",capitalQuestion:"Чи йдеться про акції, цінні папери або інший дохід від капіталу?",foreignNote:"Дохід з-за кордону потребує окремої перевірки податкового резидентства та правил міждержавного оподаткування.",otherNote:"Для цього джерела потрібні додаткові відомості, тому квіз не визначатиме форму декларації.",familyQuestion:"Які сімейні обставини або можливості пільг хочете врахувати? Оберіть усі відповідні.",familyChildren:"Маю дітей / хочу перевірити пільгу на дітей",familySpouse:"Хочу перевірити спільне розрахування з чоловіком / дружиною",familyReliefs:"Хочу перевірити інші податкові пільги",familyOpp:"Хочу передати 1,5% OPP",familyNone:"Нічого з переліченого",unsure:"Не впевнений(-а)",step:"Крок {current} із {total}",done:"Квіз завершено · {total} кроки",continue:"Продовжити",showResult:"Показати результат",back:"Назад",restart:"Почати квіз знову",editAnswers:"Змінити відповіді",answerError:"Оберіть відповідь у кожному видимому блоці, щоб продовжити.",resultEyebrow:"Ваш результат",initialTitle:"Спершу оберіть джерела доходу",initialCopy:"Квіз підготує орієнтир лише після ваших відповідей.",reportedTitle:"Що ви вказали / вже маєте",verifyTitle:"Що перевірити далі",resultComplex:"Потрібна додаткова перевірка",resultSingle:"Попередній орієнтир",resultMultiple:"Можуть знадобитися кілька форм",resultForeign:"Іноземний дохід потребує окремої перевірки",reasonWork:"Для доходу від польського платника PIT-37 часто є відправною точкою; перевірте, чи всі PIT-11 і договори охоплено.",reasonBusiness:"Форма залежить від способу оподаткування діяльності; орієнтир не замінює перевірки офіційних умов.",reasonRental:"PIT-28 можливий лише для підтвердженої приватної оренди; тип діяльності може змінити форму.",reasonInvestment:"PIT-38 може стосуватися підтверджених доходів від капіталу, зокрема цінних паперів.",reasonForeign:"Можуть застосовуватися PIT-36 та PIT/ZG залежно від резидентства, виду доходу й угод про уникнення подвійного оподаткування. Перевірте офіційні правила.",reasonOther:"За відповідями неможливо надійно визначити форму. Звірте документи й офіційні пояснення.",form37:"Можливий орієнтир: PIT-37",form36:"Можливий орієнтир: PIT-36",form36l:"Можливий орієнтир: PIT-36L",form28:"Можливий орієнтир: PIT-28",form38:"Можливий орієнтир: PIT-38",formNeedCheck:"Форму потрібно уточнити",answerWork:"Робота через польського платника",answerBusiness:"Власна діяльність",answerRental:"Оренда",answerInvestments:"Інвестиційний дохід",answerForeign:"Дохід за кордоном",answerOther:"Інше / невпевненість",yes:"Так",no:"Ні",unsureAnswer:"Не знаю",familyLabel:"Сімейні обставини / пільги",contractsLabel:"Вибрані договори",pit11Label:"PIT-11 від усіх платників",businessMethodLabel:"Спосіб оподаткування",rentalTypeLabel:"Тип оренди",capitalLabel:"Доходи від капіталу",checkWork:"Зіставте отримані PIT-11 з усіма договорами й перевірте, чи платник надіслав відсутні документи.",checkContract:"Звірте, що кожен тип договору та платника враховано у річних відомостях.",checkBusinessScale:"Перевірте офіційну інструкцію PIT-36 для вашого способу оподаткування.",checkBusinessLinear:"Перевірте офіційні умови PIT-36L і чи не потрібні інші форми для додаткових доходів.",checkBusinessLump:"Перевірте офіційні умови PIT-28 для вашого ryczałt.",checkBusinessUnknown:"З’ясуйте спосіб оподаткування за документами або з бухгалтером перед вибором форми.",checkPrivateRental:"Підтвердьте, що це приватна оренда поза господарською діяльністю, та звірте облік доходу.",checkBusinessRental:"Оскільки оренду позначено як частину діяльності, перевірте її форму разом із правилами оподаткування бізнесу.",checkCapitalYes:"Звірте тип доходу від капіталу з інформацією від брокера / платника та умовами PIT-38.",checkCapitalNo:"Перевірте, чи немає іншого доходу від капіталу, який потрібно задекларувати окремо.",checkCapitalUnknown:"Уточніть природу інвестиційного доходу за річною довідкою платника.",checkForeign:"Перевірте резидентство, іноземні річні довідки та застосовні угоди про уникнення подвійного оподаткування.",checkOther:"Визначте назву джерела за офіційною довідкою та перевірте відповідну інструкцію Міністерства фінансів.",checkChildren:"Перевірте право на пільгу на дітей і потрібні дані для відповідного року.",checkSpouse:"Перевірте умови спільного розрахування для вашої сімейної ситуації.",checkReliefs:"Перевірте умови й підтвердження для кожної пільги, яку плануєте застосувати.",checkOpp:"Звірте номер KRS обраної організації OPP та правила передачі 1,5%.",checkUpo:"Після подання збережіть UPO — офіційне підтвердження отримання декларації.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) підтверджує, що офіційний сервіс отримав надіслану декларацію. Збережіть підтвердження після відправлення.",resultOfficial:"Відкрити офіційний Twój e-PIT",noData:"Не вводьте PESEL, NIP, суми доходу чи дані документів."},
  pl:{helperEyebrow:"Quiz PIT",helperTitle:"Sprawdź, co warto zweryfikować w swoim PIT",helperIntro:"Zaznacz wszystkie źródła dochodu i przejdź 3–5 krótkich kroków. Zobaczysz tylko pytania dotyczące wybranych źródeł, a na końcu otrzymasz wstępną wskazówkę i własną listę spraw do sprawdzenia. Odpowiedzi nie są weryfikowane dokumentami i nie stanowią porady podatkowej.",sourcesQuestion:"Z jakich źródeł uzyskiwałeś(-aś) dochód? Zaznacz wszystkie właściwe odpowiedzi.",sourceWork:"Praca lub umowy przez polskiego płatnika",sourceBusiness:"Własna działalność",sourceRental:"Najem prywatny",sourceInvestments:"Inwestycje / dochody kapitałowe",sourceForeign:"Dochód poza Polską",sourceOther:"Inne lub nie mam pewności",detailsQuestion:"Doprecyzuj wybrane źródła dochodu",workDetailsTitle:"Praca przez polskiego płatnika",pit11Question:"Czy otrzymałeś(-aś) PIT-11 od wszystkich pracodawców / zleceniodawców?",contractsQuestion:"Jakie umowy Cię dotyczyły? Zaznacz wszystkie właściwe.",businessDetailsTitle:"Jak opodatkowana była działalność?",businessMethodQuestion:"Wybierz znany Ci sposób",methodScale:"Skala podatkowa",methodLinear:"Podatek liniowy",methodLump:"Ryczałt",rentalDetailsTitle:"Jakiego rodzaju był najem?",rentalTypeQuestion:"Doprecyzuj rodzaj najmu",rentalPrivate:"Najem prywatny poza działalnością gospodarczą",rentalBusiness:"Najem w ramach własnej działalności",investmentDetailsTitle:"Dochód z inwestycji",capitalQuestion:"Czy chodzi o akcje, papiery wartościowe lub inny dochód kapitałowy?",foreignNote:"Dochód zagraniczny wymaga osobnej weryfikacji rezydencji podatkowej i zasad międzynarodowych.",otherNote:"To źródło wymaga dodatkowych informacji, dlatego quiz nie określi formularza zeznania.",familyQuestion:"Jakie sytuacje rodzinne lub ulgi chcesz uwzględnić? Zaznacz wszystkie właściwe.",familyChildren:"Mam dzieci / chcę sprawdzić ulgę na dzieci",familySpouse:"Chcę sprawdzić wspólne rozliczenie z małżonkiem",familyReliefs:"Chcę sprawdzić inne ulgi podatkowe",familyOpp:"Chcę przekazać 1,5% OPP",familyNone:"Żadne z powyższych",unsure:"Nie mam pewności",step:"Krok {current} z {total}",done:"Quiz zakończony · kroków: {total}",continue:"Dalej",showResult:"Pokaż wynik",back:"Wstecz",restart:"Rozpocznij quiz ponownie",editAnswers:"Zmień odpowiedzi",answerError:"Odpowiedz w każdym widocznym bloku, aby przejść dalej.",resultEyebrow:"Twój wynik",initialTitle:"Najpierw wybierz źródła dochodu",initialCopy:"Quiz przygotuje wskazówkę dopiero po udzieleniu odpowiedzi.",reportedTitle:"Co wskazałeś(-aś) / już masz",verifyTitle:"Co sprawdzić dalej",resultComplex:"Potrzebna jest dodatkowa weryfikacja",resultSingle:"Wstępna wskazówka",resultMultiple:"Może być potrzebnych kilka formularzy",resultForeign:"Dochód zagraniczny wymaga osobnej weryfikacji",reasonWork:"Dla dochodu od polskiego płatnika PIT-37 jest częstym punktem wyjścia; sprawdź, czy uwzględniono wszystkie PIT-11 i umowy.",reasonBusiness:"Formularz zależy od sposobu opodatkowania działalności; wskazówka nie zastępuje sprawdzenia oficjalnych warunków.",reasonRental:"PIT-28 może dotyczyć wyłącznie potwierdzonego najmu prywatnego; rodzaj działalności może zmienić formularz.",reasonInvestment:"PIT-38 może dotyczyć potwierdzonych dochodów kapitałowych, w tym papierów wartościowych.",reasonForeign:"W zależności od rezydencji, rodzaju dochodu i umów międzynarodowych mogą mieć zastosowanie PIT-36 i PIT/ZG. Sprawdź oficjalne zasady.",reasonOther:"Na podstawie odpowiedzi nie można wiarygodnie określić formularza. Sprawdź dokumenty i oficjalne informacje.",form37:"Możliwa wskazówka: PIT-37",form36:"Możliwa wskazówka: PIT-36",form36l:"Możliwa wskazówka: PIT-36L",form28:"Możliwa wskazówka: PIT-28",form38:"Możliwa wskazówka: PIT-38",formNeedCheck:"Formularz wymaga ustalenia",answerWork:"Praca przez polskiego płatnika",answerBusiness:"Własna działalność",answerRental:"Najem",answerInvestments:"Dochód z inwestycji",answerForeign:"Dochód zagraniczny",answerOther:"Inne / brak pewności",yes:"Tak",no:"Nie",unsureAnswer:"Nie wiem",familyLabel:"Sytuacje rodzinne / ulgi",contractsLabel:"Wybrane umowy",pit11Label:"PIT-11 od wszystkich płatników",businessMethodLabel:"Sposób opodatkowania",rentalTypeLabel:"Rodzaj najmu",capitalLabel:"Dochód kapitałowy",checkWork:"Porównaj otrzymane PIT-11 ze wszystkimi umowami i sprawdź, czy płatnik dosłał brakujące dokumenty.",checkContract:"Sprawdź, czy każdy rodzaj umowy i płatnika uwzględniono w rocznych informacjach.",checkBusinessScale:"Sprawdź oficjalną instrukcję PIT-36 dla wybranej formy opodatkowania.",checkBusinessLinear:"Sprawdź oficjalne warunki PIT-36L i czy dodatkowe dochody wymagają innych formularzy.",checkBusinessLump:"Sprawdź oficjalne warunki PIT-28 dla Twojego ryczałtu.",checkBusinessUnknown:"Ustal sposób opodatkowania na podstawie dokumentów lub z księgowym przed wyborem formularza.",checkPrivateRental:"Potwierdź, że to najem prywatny poza działalnością gospodarczą, i sprawdź ewidencję dochodu.",checkBusinessRental:"Ponieważ najem wskazano jako część działalności, sprawdź formularz łącznie z zasadami opodatkowania firmy.",checkCapitalYes:"Porównaj rodzaj dochodu kapitałowego z informacją od brokera / płatnika i warunkami PIT-38.",checkCapitalNo:"Sprawdź, czy nie wystąpił inny dochód kapitałowy wymagający osobnego wykazania.",checkCapitalUnknown:"Ustal charakter dochodu inwestycyjnego na podstawie rocznej informacji od płatnika.",checkForeign:"Sprawdź rezydencję, zagraniczne informacje roczne i właściwe umowy o unikaniu podwójnego opodatkowania.",checkOther:"Ustal źródło dochodu na podstawie oficjalnej informacji i sprawdź instrukcję Ministerstwa Finansów.",checkChildren:"Sprawdź prawo do ulgi na dzieci i dane wymagane za dany rok.",checkSpouse:"Sprawdź warunki wspólnego rozliczenia dla Twojej sytuacji rodzinnej.",checkReliefs:"Sprawdź warunki i dokumenty dla każdej ulgi, którą planujesz zastosować.",checkOpp:"Sprawdź numer KRS wybranej organizacji OPP i zasady przekazania 1,5%.",checkUpo:"Po wysłaniu zachowaj UPO — urzędowe potwierdzenie odbioru zeznania.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) potwierdza, że oficjalna usługa otrzymała wysłane zeznanie. Zapisz potwierdzenie po wysłaniu.",resultOfficial:"Otwórz oficjalny Twój e-PIT",noData:"Nie wpisuj PESEL-u, NIP-u, kwot dochodu ani danych dokumentów."},
  ru:{helperEyebrow:"Квиз PIT",helperTitle:"Узнайте, что проверить в своей декларации PIT",helperIntro:"Отметьте все источники дохода и пройдите 3–5 коротких шагов. Вы увидите только вопросы по выбранным источникам, а в конце — предварительный ориентир и персональный список проверок. Ответы не сверяются с документами и не являются налоговой консультацией.",sourcesQuestion:"Из каких источников вы получали доход? Отметьте все подходящие варианты.",sourceWork:"Работа или договоры через польского плательщика",sourceBusiness:"Собственная деятельность",sourceRental:"Частная аренда",sourceInvestments:"Инвестиции / доходы от капитала",sourceForeign:"Доход за пределами Польши",sourceOther:"Другое или не уверен(-а)",detailsQuestion:"Уточните выбранные источники дохода",workDetailsTitle:"Работа через польского плательщика",pit11Question:"Получили ли вы PIT-11 от всех работодателей / заказчиков?",contractsQuestion:"Какие договоры у вас были? Отметьте все подходящие.",businessDetailsTitle:"Как облагалась налогом деятельность?",businessMethodQuestion:"Выберите известный вам способ",methodScale:"Skala podatkowa",methodLinear:"Podatek liniowy",methodLump:"Ryczałt",rentalDetailsTitle:"Какой была аренда?",rentalTypeQuestion:"Уточните тип аренды",rentalPrivate:"Частная аренда вне предпринимательской деятельности",rentalBusiness:"Аренда в рамках собственной деятельности",investmentDetailsTitle:"Доход от инвестиций",capitalQuestion:"Идёт ли речь об акциях, ценных бумагах или другом доходе от капитала?",foreignNote:"Зарубежный доход требует отдельной проверки налогового резидентства и международных правил.",otherNote:"Для этого источника нужны дополнительные сведения, поэтому квиз не определяет форму декларации.",familyQuestion:"Какие семейные обстоятельства или льготы учесть? Отметьте все подходящие.",familyChildren:"Есть дети / хочу проверить льготу на детей",familySpouse:"Хочу проверить совместный расчёт с супругом(-ой)",familyReliefs:"Хочу проверить другие налоговые льготы",familyOpp:"Хочу передать 1,5% OPP",familyNone:"Ничего из перечисленного",unsure:"Не уверен(-а)",step:"Шаг {current} из {total}",done:"Квиз завершён · шагов: {total}",continue:"Продолжить",showResult:"Показать результат",back:"Назад",restart:"Пройти квиз заново",editAnswers:"Изменить ответы",answerError:"Ответьте в каждом видимом блоке, чтобы продолжить.",resultEyebrow:"Ваш результат",initialTitle:"Сначала выберите источники дохода",initialCopy:"Квиз подготовит ориентир только после ваших ответов.",reportedTitle:"Что вы указали / уже имеете",verifyTitle:"Что проверить дальше",resultComplex:"Нужна дополнительная проверка",resultSingle:"Предварительный ориентир",resultMultiple:"Могут потребоваться несколько форм",resultForeign:"Зарубежный доход требует отдельной проверки",reasonWork:"Для дохода от польского плательщика PIT-37 часто служит отправной точкой; проверьте полноту PIT-11 и договоров.",reasonBusiness:"Форма зависит от способа налогообложения деятельности; ориентир не заменяет проверку официальных условий.",reasonRental:"PIT-28 может относиться только к подтверждённой частной аренде; тип деятельности может изменить форму.",reasonInvestment:"PIT-38 может относиться к подтверждённым доходам от капитала, включая ценные бумаги.",reasonForeign:"В зависимости от резидентства, вида дохода и международных соглашений могут применяться PIT-36 и PIT/ZG. Проверьте официальные правила.",reasonOther:"По ответам нельзя надёжно определить форму. Сверьте документы и официальные пояснения.",form37:"Возможный ориентир: PIT-37",form36:"Возможный ориентир: PIT-36",form36l:"Возможный ориентир: PIT-36L",form28:"Возможный ориентир: PIT-28",form38:"Возможный ориентир: PIT-38",formNeedCheck:"Форму нужно уточнить",answerWork:"Работа через польского плательщика",answerBusiness:"Собственная деятельность",answerRental:"Аренда",answerInvestments:"Инвестиционный доход",answerForeign:"Доход за рубежом",answerOther:"Другое / нет уверенности",yes:"Да",no:"Нет",unsureAnswer:"Не знаю",familyLabel:"Семейные обстоятельства / льготы",contractsLabel:"Выбранные договоры",pit11Label:"PIT-11 от всех плательщиков",businessMethodLabel:"Способ налогообложения",rentalTypeLabel:"Тип аренды",capitalLabel:"Доходы от капитала",checkWork:"Сопоставьте полученные PIT-11 со всеми договорами и проверьте, прислал ли плательщик недостающие документы.",checkContract:"Убедитесь, что каждый тип договора и плательщик учтены в годовых сведениях.",checkBusinessScale:"Проверьте официальную инструкцию PIT-36 для выбранного способа налогообложения.",checkBusinessLinear:"Проверьте официальные условия PIT-36L и необходимость других форм для дополнительных доходов.",checkBusinessLump:"Проверьте официальные условия PIT-28 для вашего ryczałt.",checkBusinessUnknown:"До выбора формы уточните способ налогообложения по документам или у бухгалтера.",checkPrivateRental:"Подтвердите, что это частная аренда вне деятельности, и сверьте учёт дохода.",checkBusinessRental:"Поскольку аренда указана в рамках деятельности, проверьте её вместе с правилами налогообложения бизнеса.",checkCapitalYes:"Сверьте тип дохода от капитала со сведениями брокера / плательщика и условиями PIT-38.",checkCapitalNo:"Проверьте, не было ли другого дохода от капитала, который нужно указать отдельно.",checkCapitalUnknown:"Уточните характер инвестиционного дохода по годовым сведениям плательщика.",checkForeign:"Проверьте резидентство, зарубежные годовые сведения и применимые соглашения об избежании двойного налогообложения.",checkOther:"Уточните источник по официальной справке и найдите соответствующую инструкцию Министерства финансов.",checkChildren:"Проверьте право на льготу на детей и нужные сведения за соответствующий год.",checkSpouse:"Проверьте условия совместного расчёта для вашей семейной ситуации.",checkReliefs:"Проверьте условия и подтверждения для каждой планируемой налоговой льготы.",checkOpp:"Сверьте номер KRS выбранной организации OPP и правила передачи 1,5%.",checkUpo:"После отправки сохраните UPO — официальное подтверждение получения декларации.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) подтверждает, что официальный сервис получил отправленную декларацию. Сохраните это подтверждение.",resultOfficial:"Открыть официальный Twój e-PIT",noData:"Не вводите PESEL, NIP, суммы дохода или данные документов."}
};
const UX_WORDS = {
  uk: { shortLead:"Дізнайтеся за кілька запитань, яка декларація може вам знадобитися та що перевірити перед поданням.", heroMeta:"Кілька коротких запитань · без PESEL та фінансових даних", privacyTitle:"Без персональних даних", privacyCopy:"Ми не запитуємо PESEL, NIP, адресу, суми доходу чи номер банківського рахунку.", seasonYearTitle:"PIT за 2026 рік", seasonYearCopy:"Очікуваний період подання за 2026 рік: 15.02–30.04.2027. Дати наступного сезону слід перевіряти в офіційних повідомленнях.", quizEyebrow:"PIT-навігатор", quizTitle:"Допоможемо зорієнтуватися з PIT", quizIntro:"Відповідайте на кілька простих запитань. Ми покажемо, яка декларація може стосуватися вашої ситуації та що перевірити.", resultEyebrow:"Ваш результат", resultLikelyPrefix:"Ймовірно може стосуватися:", resultMultiplePrefix:"Можливі форми:", resultFormsTitle:"Чому ми показали цей орієнтир", answerSummaryTitle:"За вашими відповідями", planTitle:"Ваш план перед поданням PIT", clarifyTitle:"Що варто уточнити", nextActionTitle:"Готові перевірити декларацію?", nextActionCopy:"Відкрийте офіційний сервіс Міністерства фінансів Польщі, щоб переглянути підготовлену декларацію, внести зміни та подати її.", printHint:"Збережіть результат як PDF або візьміть пам’ятку до Urzędu Skarbowego чи бухгалтера.", officialCta:"Відкрити Twój e-PIT ↗", typesSubheading:"Поширені типи декларацій", checkedProgress:"{checked} з {total} перевірено", clarificationForeignResidence:"Чи є Польща моєю податковою резиденцією?", clarificationForeignZG:"Чи потрібен додаток PIT/ZG?", clarificationUkraine:"Як врахувати дохід з України та правила уникнення подвійного оподаткування?", clarificationBusinessMethod:"Який спосіб оподаткування діяльності застосовувався?", clarificationBusinessForm:"Чи стосуються мене PIT-36, PIT-36L або PIT-28?", clarificationRental:"Чи була оренда приватною та поза підприємницькою діяльністю?", clarificationInvestments:"Які доходи від капіталу потрібно зазначити та в якій формі?", clarificationOther:"Яка форма декларації стосується цього джерела доходу?", clarificationSeveral:"Чи потрібно подати окремі декларації для різних джерел доходу?" },
  pl: { shortLead:"Odpowiedz na kilka pytań, aby sprawdzić, jaki formularz może Cię dotyczyć i co warto zweryfikować przed złożeniem.", heroMeta:"Kilka krótkich pytań · bez PESEL-u i danych finansowych", privacyTitle:"Bez danych osobowych", privacyCopy:"Nie pytamy o PESEL, NIP, adres, kwoty dochodu ani numer rachunku bankowego.", seasonYearTitle:"PIT za 2026 rok", seasonYearCopy:"Przewidywany okres składania zeznań za 2026 rok: 15.02–30.04.2027. Daty kolejnego sezonu sprawdzaj w oficjalnych komunikatach.", quizEyebrow:"Nawigator PIT", quizTitle:"Pomożemy Ci zorientować się w PIT", quizIntro:"Odpowiedz na kilka prostych pytań. Pokażemy, jaki formularz może dotyczyć Twojej sytuacji i co warto sprawdzić.", resultEyebrow:"Twój wynik", resultLikelyPrefix:"Możliwa wskazówka:", resultMultiplePrefix:"Możliwe formularze:", resultFormsTitle:"Dlaczego pokazujemy tę wskazówkę", answerSummaryTitle:"Na podstawie Twoich odpowiedzi", planTitle:"Twoja lista przed złożeniem PIT", clarifyTitle:"Co warto wyjaśnić", nextActionTitle:"Chcesz sprawdzić zeznanie?", nextActionCopy:"Otwórz oficjalną usługę Ministerstwa Finansów, aby sprawdzić przygotowane zeznanie, wprowadzić zmiany i je złożyć.", printHint:"Zapisz wynik jako PDF lub zabierz notatkę do Urzędu Skarbowego albo księgowego.", officialCta:"Otwórz Twój e-PIT ↗", typesSubheading:"Popularne formularze PIT", checkedProgress:"Sprawdzono {checked} z {total}", clarificationForeignResidence:"Czy jestem polskim rezydentem podatkowym?", clarificationForeignZG:"Czy potrzebuję załącznika PIT/ZG?", clarificationUkraine:"Jak rozliczyć dochód z Ukrainy i zasady unikania podwójnego opodatkowania?", clarificationBusinessMethod:"Jaka forma opodatkowania działalności była stosowana?", clarificationBusinessForm:"Czy dotyczą mnie formularze PIT-36, PIT-36L lub PIT-28?", clarificationRental:"Czy najem był prywatny i poza działalnością gospodarczą?", clarificationInvestments:"Jakie dochody kapitałowe należy wykazać i w którym formularzu?", clarificationOther:"Który formularz dotyczy tego źródła dochodu?", clarificationSeveral:"Czy trzeba złożyć osobne zeznania dla różnych źródeł dochodu?" },
  ru: { shortLead:"Ответьте на несколько вопросов, чтобы узнать, какая декларация может вам понадобиться и что проверить перед подачей.", heroMeta:"Несколько коротких вопросов · без PESEL и финансовых данных", privacyTitle:"Без персональных данных", privacyCopy:"Мы не спрашиваем PESEL, NIP, адрес, суммы дохода или номер банковского счёта.", seasonYearTitle:"PIT за 2026 год", seasonYearCopy:"Ожидаемый период подачи декларации за 2026 год: 15.02–30.04.2027. Даты следующего сезона проверяйте в официальных сообщениях.", quizEyebrow:"Навигатор PIT", quizTitle:"Поможем разобраться с PIT", quizIntro:"Ответьте на несколько простых вопросов. Мы покажем, какая форма может относиться к вашей ситуации и что проверить.", resultEyebrow:"Ваш результат", resultLikelyPrefix:"Возможный ориентир:", resultMultiplePrefix:"Возможные формы:", resultFormsTitle:"Почему мы показываем этот ориентир", answerSummaryTitle:"По вашим ответам", planTitle:"Ваш план перед подачей PIT", clarifyTitle:"Что стоит уточнить", nextActionTitle:"Готовы проверить декларацию?", nextActionCopy:"Откройте официальный сервис Министерства финансов Польши, чтобы проверить подготовленную декларацию, внести изменения и подать её.", printHint:"Сохраните результат как PDF или возьмите памятку в Urząd Skarbowy или к бухгалтеру.", officialCta:"Открыть Twój e-PIT ↗", typesSubheading:"Популярные формы PIT", checkedProgress:"Проверено {checked} из {total}", clarificationForeignResidence:"Считаюсь ли я налоговым резидентом Польши?", clarificationForeignZG:"Нужно ли приложение PIT/ZG?", clarificationUkraine:"Как учесть доход из Украины и правила предотвращения двойного налогообложения?", clarificationBusinessMethod:"Какой способ налогообложения деятельности применялся?", clarificationBusinessForm:"Относятся ли ко мне PIT-36, PIT-36L или PIT-28?", clarificationRental:"Была ли аренда частной и вне предпринимательской деятельности?", clarificationInvestments:"Какие доходы от капитала нужно указать и в какой форме?", clarificationOther:"Какая форма декларации относится к этому источнику дохода?", clarificationSeveral:"Нужно ли подать отдельные декларации для разных источников дохода?" }
};
Object.assign(QUIZ_FLOW_WORDS.uk,{quizPrivacy:"Ваші відповіді та позначки чек-листа зберігаються лише у браузері на цьому пристрої.",pit11Unknown:"Не знаю, що таке PIT-11",foreignDetailsTitle:"Дохід з-за кордону",foreignResidentQuestion:"Чи маєте ви інформацію про своє податкове резидентство за цей рік?",foreignResidentLabel:"Інформація про податкове резидентство",otherDetailsTitle:"Інший або невідомий вид доходу",otherDocumentQuestion:"Чи маєте ви офіційний документ або річну довідку про це джерело?",otherDocumentLabel:"Документ про інше джерело",pit11Hint:"PIT-11 — це інформація від роботодавця або іншого платника про доходи, податки та внески.",type36l:"Може стосуватися діяльності, оподатковуваної за лінійною ставкою, якщо виконані офіційні умови.",formsTitle:"Можливі форми для перевірки",reportedTitle:"Що ви вказали / вже маєте",verifyTitle:"Що перевірити далі",form37:"Можливий орієнтир: PIT-37",form36:"Можливий орієнтир: PIT-36",form36l:"Можливий орієнтир: PIT-36L",form28:"Можливий орієнтир: PIT-28",form38:"Можливий орієнтир: PIT-38",formPITZG:"Перевірте, чи потрібен додаток PIT/ZG",formNeedCheck:"Форму потрібно уточнити",contract_employment:"Umowa o pracę",contract_mandate:"Umowa zlecenie",contract_work:"Umowa o dzieło",contract_unknown:"Не знаю",business_scale:"Skala podatkowa",business_linear:"Podatek liniowy",business_lump:"Ryczałt",business_unknown:"Не знаю",rental_private:"Приватна оренда",rental_business:"Оренда в межах діяльності",rental_unknown:"Не знаю",capital_yes:"Так",capital_no:"Ні",capital_unknown:"Не впевнений(-а)",family_children:"Діти",family_spouse:"Спільне розрахування з чоловіком / дружиною",family_reliefs:"Інші податкові пільги",family_opp:"Передача 1,5% OPP",family_none:"Нічого з переліченого",reasonWork:"Для доходу від польського платника PIT-37 часто є відправною точкою; перевірте, чи всі PIT-11 і договори охоплено.",reasonBusiness:"Форма залежить від способу оподаткування діяльності; орієнтир не замінює перевірки офіційних умов.",reasonRental:"PIT-28 можливий лише для підтвердженої приватної оренди; тип діяльності може змінити форму.",reasonInvestment:"PIT-38 може стосуватися підтверджених доходів від капіталу, зокрема цінних паперів.",reasonForeign:"Можуть застосовуватися PIT-36 та PIT/ZG залежно від резидентства, виду доходу й угод про уникнення подвійного оподаткування. Перевірте офіційні правила.",reasonOther:"За відповідями неможливо надійно визначити форму. Звірте документи й офіційні пояснення.",checkWork:"Зіставте отримані PIT-11 з усіма договорами й перевірте, чи платник надіслав відсутні документи.",checkContract:"Звірте, що кожен тип договору та платника враховано у річних відомостях.",checkBusinessScale:"Перевірте офіційну інструкцію PIT-36 для вашого способу оподаткування.",checkBusinessLinear:"Перевірте офіційні умови PIT-36L і чи не потрібні інші форми для додаткових доходів.",checkBusinessLump:"Перевірте офіційні умови PIT-28 для вашого ryczałt.",checkBusinessUnknown:"З’ясуйте спосіб оподаткування за документами або з бухгалтером перед вибором форми.",checkPrivateRental:"Підтвердьте, що це приватна оренда поза господарською діяльністю, та звірте облік доходу.",checkBusinessRental:"Оскільки оренду позначено як частину діяльності, перевірте її форму разом із правилами оподаткування бізнесу.",checkCapitalYes:"Звірте тип доходу від капіталу з інформацією від брокера / платника та умовами PIT-38.",checkCapitalNo:"Перевірте, чи немає іншого доходу від капіталу, який потрібно задекларувати окремо.",checkCapitalUnknown:"Уточніть природу інвестиційного доходу за річною довідкою платника.",checkForeign:"Перевірте резидентство, іноземні річні довідки та застосовні угоди про уникнення подвійного оподаткування.",checkOther:"Визначте назву джерела за офіційною довідкою та перевірте відповідну інструкцію Міністерства фінансів.",checkChildren:"Перевірте право на пільгу на дітей і потрібні дані для відповідного року.",checkSpouse:"Перевірте умови спільного розрахування для вашої сімейної ситуації.",checkReliefs:"Перевірте умови й підтвердження для кожної пільги, яку плануєте застосувати.",checkOpp:"Звірте номер KRS обраної організації OPP та правила передачі 1,5%.",checkUpo:"Після подання збережіть UPO — офіційне підтвердження отримання декларації.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) підтверджує, що офіційний сервіс отримав надіслану декларацію. Збережіть підтвердження після відправлення.",resultOfficial:"Відкрити офіційний Twój e-PIT",editAnswers:"Змінити відповіді",restart:"Почати квіз знову",yes:"Так",no:"Ні",unsureAnswer:"Не знаю",pit11Label:"PIT-11 від усіх платників",contractsLabel:"Вибрані договори",businessMethodLabel:"Спосіб оподаткування",rentalTypeLabel:"Тип оренди",capitalLabel:"Доходи від капіталу",familyLabel:"Сімейні обставини / пільги"});
Object.assign(QUIZ_FLOW_WORDS.pl,{quizPrivacy:"Odpowiedzi i zaznaczenia listy kontrolnej są przechowywane tylko w przeglądarce na tym urządzeniu.",pit11Unknown:"Nie wiem, czym jest PIT-11",foreignDetailsTitle:"Dochód zagraniczny",foreignResidentQuestion:"Czy masz informacje o swojej rezydencji podatkowej za ten rok?",foreignResidentLabel:"Informacje o rezydencji podatkowej",otherDetailsTitle:"Inny lub nieznany rodzaj dochodu",otherDocumentQuestion:"Czy masz oficjalny dokument lub roczną informację o tym źródle?",otherDocumentLabel:"Dokument dotyczący innego źródła",pit11Hint:"PIT-11 to informacja od pracodawcy lub innego płatnika o dochodach, podatkach i składkach.",type36l:"Może dotyczyć działalności opodatkowanej podatkiem liniowym, jeśli spełnione są oficjalne warunki.",formsTitle:"Możliwe formularze do sprawdzenia",reportedTitle:"Co wskazałeś(-aś) / już masz",verifyTitle:"Co sprawdzić dalej",form37:"Możliwa wskazówka: PIT-37",form36:"Możliwa wskazówka: PIT-36",form36l:"Możliwa wskazówka: PIT-36L",form28:"Możliwa wskazówka: PIT-28",form38:"Możliwa wskazówka: PIT-38",formPITZG:"Sprawdź, czy potrzebny jest załącznik PIT/ZG",formNeedCheck:"Formularz wymaga ustalenia",contract_employment:"Umowa o pracę",contract_mandate:"Umowa zlecenie",contract_work:"Umowa o dzieło",contract_unknown:"Nie wiem",business_scale:"Skala podatkowa",business_linear:"Podatek liniowy",business_lump:"Ryczałt",business_unknown:"Nie wiem",rental_private:"Najem prywatny",rental_business:"Najem w ramach działalności",rental_unknown:"Nie wiem",capital_yes:"Tak",capital_no:"Nie",capital_unknown:"Nie mam pewności",family_children:"Dzieci",family_spouse:"Wspólne rozliczenie z małżonkiem",family_reliefs:"Inne ulgi podatkowe",family_opp:"Przekazanie 1,5% OPP",family_none:"Żadne z powyższych",reasonWork:"Przy dochodzie od polskiego płatnika PIT-37 jest częstym punktem wyjścia; sprawdź kompletność PIT-11 i umów.",reasonBusiness:"Formularz zależy od sposobu opodatkowania działalności; wskazówka nie zastępuje sprawdzenia oficjalnych warunków.",reasonRental:"PIT-28 może dotyczyć wyłącznie potwierdzonego najmu prywatnego; rodzaj działalności może zmienić formularz.",reasonInvestment:"PIT-38 może dotyczyć potwierdzonych dochodów kapitałowych, w tym papierów wartościowych.",reasonForeign:"W zależności od rezydencji, rodzaju dochodu i umów międzynarodowych mogą mieć zastosowanie PIT-36 i PIT/ZG. Sprawdź oficjalne zasady.",reasonOther:"Na podstawie odpowiedzi nie można wiarygodnie określić formularza. Sprawdź dokumenty i oficjalne informacje.",checkWork:"Porównaj otrzymane PIT-11 ze wszystkimi umowami i sprawdź, czy płatnik dosłał brakujące dokumenty.",checkContract:"Sprawdź, czy każdy rodzaj umowy i płatnika uwzględniono w rocznych informacjach.",checkBusinessScale:"Sprawdź oficjalną instrukcję PIT-36 dla wybranej formy opodatkowania.",checkBusinessLinear:"Sprawdź oficjalne warunki PIT-36L i czy dodatkowe dochody wymagają innych formularzy.",checkBusinessLump:"Sprawdź oficjalne warunki PIT-28 dla Twojego ryczałtu.",checkBusinessUnknown:"Ustal sposób opodatkowania na podstawie dokumentów lub z księgowym przed wyborem formularza.",checkPrivateRental:"Potwierdź, że to najem prywatny poza działalnością gospodarczą, i sprawdź ewidencję dochodu.",checkBusinessRental:"Ponieważ najem wskazano jako część działalności, sprawdź formularz łącznie z zasadami opodatkowania firmy.",checkCapitalYes:"Porównaj rodzaj dochodu kapitałowego z informacją od brokera / płatnika i warunkami PIT-38.",checkCapitalNo:"Sprawdź, czy nie wystąpił inny dochód kapitałowy wymagający osobnego wykazania.",checkCapitalUnknown:"Ustal charakter dochodu inwestycyjnego na podstawie rocznej informacji od płatnika.",checkForeign:"Sprawdź rezydencję, zagraniczne informacje roczne i właściwe umowy o unikaniu podwójnego opodatkowania.",checkOther:"Ustal źródło dochodu na podstawie oficjalnej informacji i sprawdź instrukcję Ministerstwa Finansów.",checkChildren:"Sprawdź prawo do ulgi na dzieci i dane wymagane za dany rok.",checkSpouse:"Sprawdź warunki wspólnego rozliczenia dla Twojej sytuacji rodzinnej.",checkReliefs:"Sprawdź warunki i dokumenty dla każdej ulgi, którą planujesz zastosować.",checkOpp:"Sprawdź numer KRS wybranej organizacji OPP i zasady przekazania 1,5%.",checkUpo:"Po wysłaniu zachowaj UPO — urzędowe potwierdzenie odbioru zeznania.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) potwierdza, że oficjalna usługa otrzymała wysłane zeznanie. Zapisz potwierdzenie.",resultOfficial:"Otwórz oficjalny Twój e-PIT",editAnswers:"Zmień odpowiedzi",restart:"Rozpocznij quiz ponownie",yes:"Tak",no:"Nie",unsureAnswer:"Nie wiem",pit11Label:"PIT-11 od wszystkich płatników",contractsLabel:"Wybrane umowy",businessMethodLabel:"Sposób opodatkowania",rentalTypeLabel:"Rodzaj najmu",capitalLabel:"Dochód kapitałowy",familyLabel:"Sytuacje rodzinne / ulgi"});
Object.assign(QUIZ_FLOW_WORDS.ru,{quizPrivacy:"Ваши ответы и отметки чек-листа сохраняются только в браузере на этом устройстве.",pit11Unknown:"Не знаю, что такое PIT-11",foreignDetailsTitle:"Доход из-за границы",foreignResidentQuestion:"Есть ли у вас информация о налоговом резидентстве за этот год?",foreignResidentLabel:"Информация о налоговом резидентстве",otherDetailsTitle:"Другой или неизвестный вид дохода",otherDocumentQuestion:"Есть ли у вас официальный документ или годовая справка об этом источнике?",otherDocumentLabel:"Документ о другом источнике",pit11Hint:"PIT-11 — это сведения работодателя или другого плательщика о доходах, налогах и взносах.",type36l:"Может относиться к деятельности с линейным налогообложением при соблюдении официальных условий.",formsTitle:"Возможные формы для проверки",reportedTitle:"Что вы указали / уже имеете",verifyTitle:"Что проверить дальше",form37:"Возможный ориентир: PIT-37",form36:"Возможный ориентир: PIT-36",form36l:"Возможный ориентир: PIT-36L",form28:"Возможный ориентир: PIT-28",form38:"Возможный ориентир: PIT-38",formPITZG:"Проверьте, требуется ли приложение PIT/ZG",formNeedCheck:"Форму нужно уточнить",contract_employment:"Umowa o pracę",contract_mandate:"Umowa zlecenie",contract_work:"Umowa o dzieło",contract_unknown:"Не знаю",business_scale:"Skala podatkowa",business_linear:"Podatek liniowy",business_lump:"Ryczałt",business_unknown:"Не знаю",rental_private:"Частная аренда",rental_business:"Аренда в рамках деятельности",rental_unknown:"Не знаю",capital_yes:"Да",capital_no:"Нет",capital_unknown:"Не уверен(-а)",family_children:"Дети",family_spouse:"Совместный расчёт с супругом(-ой)",family_reliefs:"Другие налоговые льготы",family_opp:"Передача 1,5% OPP",family_none:"Ничего из перечисленного",reasonWork:"Для дохода от польского плательщика PIT-37 часто служит отправной точкой; проверьте полноту PIT-11 и договоров.",reasonBusiness:"Форма зависит от способа налогообложения деятельности; ориентир не заменяет проверку официальных условий.",reasonRental:"PIT-28 может относиться только к подтверждённой частной аренде; вид деятельности может изменить форму.",reasonInvestment:"PIT-38 может относиться к подтверждённым доходам от капитала, включая ценные бумаги.",reasonForeign:"В зависимости от резидентства, вида дохода и международных соглашений могут применяться PIT-36 и PIT/ZG. Проверьте официальные правила.",reasonOther:"По ответам нельзя надёжно определить форму. Сверьте документы и официальные пояснения.",checkWork:"Сопоставьте PIT-11 со всеми договорами и проверьте, прислал ли плательщик недостающие документы.",checkContract:"Убедитесь, что каждый тип договора и плательщик учтены в годовых сведениях.",checkBusinessScale:"Проверьте официальную инструкцию PIT-36 для выбранного способа налогообложения.",checkBusinessLinear:"Проверьте официальные условия PIT-36L и необходимость других форм для дополнительных доходов.",checkBusinessLump:"Проверьте официальные условия PIT-28 для вашего ryczałt.",checkBusinessUnknown:"До выбора формы уточните способ налогообложения по документам или у бухгалтера.",checkPrivateRental:"Подтвердите, что это частная аренда вне деятельности, и сверьте учёт дохода.",checkBusinessRental:"Поскольку аренда указана в рамках деятельности, проверьте её вместе с правилами налогообложения бизнеса.",checkCapitalYes:"Сверьте тип дохода от капитала со сведениями брокера / плательщика и условиями PIT-38.",checkCapitalNo:"Проверьте, не было ли другого дохода от капитала, который нужно указать отдельно.",checkCapitalUnknown:"Уточните характер инвестиционного дохода по годовым сведениям плательщика.",checkForeign:"Проверьте резидентство, зарубежные годовые сведения и применимые соглашения об избежании двойного налогообложения.",checkOther:"Уточните источник по официальной справке и найдите соответствующую инструкцию Министерства финансов.",checkChildren:"Проверьте право на льготу на детей и нужные сведения за соответствующий год.",checkSpouse:"Проверьте условия совместного расчёта для вашей семейной ситуации.",checkReliefs:"Проверьте условия и подтверждения для каждой планируемой налоговой льготы.",checkOpp:"Сверьте номер KRS выбранной организации OPP и правила передачи 1,5%.",checkUpo:"После отправки сохраните UPO — официальное подтверждение получения декларации.",upoNote:"UPO (Urzędowe Poświadczenie Odbioru) подтверждает, что официальный сервис получил отправленную декларацию. Сохраните это подтверждение.",resultOfficial:"Открыть официальный Twój e-PIT",editAnswers:"Изменить ответы",restart:"Пройти квиз заново",yes:"Да",no:"Нет",unsureAnswer:"Не знаю",pit11Label:"PIT-11 от всех плательщиков",contractsLabel:"Выбранные договоры",businessMethodLabel:"Способ налогообложения",rentalTypeLabel:"Тип аренды",capitalLabel:"Доходы от капитала",familyLabel:"Семейные обстоятельства / льготы"});
Object.assign(QUIZ_FLOW_WORDS.uk,{pit11Partial:"Отримав(-ла) PIT-11, але не знаю, чи від усіх платників",pit11Confirmed:"Вказано, що PIT-11 отримано від усіх платників",workStepTitle:"Дохід від польського платника",activityStepTitle:"Діяльність та оренда",otherIncomeStepTitle:"Інші доходи",reportedTitle:"Що ви вказали",pit11Partial:"Отримав(-ла) PIT-11, але не знаю, чи від усіх платників",reasonWork:"Ви вказали дохід від польського платника. PIT-37 може бути орієнтиром, якщо дохід не об’єднується з підприємницьким доходом за шкалою у PIT-36.",reasonBusiness:"Ви вказали дохід від діяльності. Форму визначає обраний режим оподаткування; для шкали інші доходи за шкалою, зокрема робота, можуть об’єднуватися у PIT-36.",reasonForeign:"Ви вказали іноземний дохід. Форма залежить від резидентства, виду доходу та податкової угоди; перевірте можливі форми лише за офіційними правилами.",pit11Confirmed:"Вказано, що PIT-11 отримано від усіх платників",type36:"Може стосуватися доходу від діяльності на загальній шкалі разом з іншими доходами, що оподатковуються за шкалою, зокрема доходом від роботи. Іноземний дохід оцінюється окремо залежно від резидентства й угоди."});
Object.assign(QUIZ_FLOW_WORDS.pl,{pit11Partial:"Mam PIT-11, ale nie wiem, czy od wszystkich płatników",pit11Confirmed:"Wskazano, że otrzymano PIT-11 od wszystkich płatników",workStepTitle:"Dochód od polskiego płatnika",activityStepTitle:"Działalność i najem",otherIncomeStepTitle:"Pozostałe dochody",reportedTitle:"Co wskazano",pit11Partial:"Mam PIT-11, ale nie wiem, czy od wszystkich płatników",reasonWork:"Wskazano dochód od polskiego płatnika. PIT-37 może być punktem odniesienia, jeśli dochód nie łączy się z dochodem z działalności opodatkowanej skalą w PIT-36.",reasonBusiness:"Wskazano dochód z działalności. Formularz zależy od wybranej metody; dochody opodatkowane skalą, w tym z pracy, mogą być łączone w PIT-36.",reasonForeign:"Wskazano dochód zagraniczny. Formularz zależy od rezydencji, rodzaju dochodu i umowy podatkowej; możliwe formularze należy sprawdzić w oficjalnych zasadach.",pit11Partial:"Mam PIT-11, ale nie wiem, czy od wszystkich płatników",pit11Confirmed:"Wskazano, że otrzymano PIT-11 od wszystkich płatników",type36:"Może dotyczyć działalności opodatkowanej skalą wraz z innymi dochodami opodatkowanymi skalą, w tym z pracy. Dochód zagraniczny ocenia się osobno, zależnie od rezydencji i umowy."});
Object.assign(QUIZ_FLOW_WORDS.ru,{pit11Partial:"PIT-11 есть, но не знаю, от всех ли плательщиков",pit11Confirmed:"Указано, что PIT-11 получен от всех плательщиков",workStepTitle:"Доход от польского плательщика",activityStepTitle:"Деятельность и аренда",otherIncomeStepTitle:"Другие доходы",reportedTitle:"Что вы указали",pit11Partial:"PIT-11 есть, но не знаю, от всех ли плательщиков",reasonWork:"Вы указали доход от польского плательщика. PIT-37 может быть ориентиром, если доход не объединяется с предпринимательским доходом по шкале в PIT-36.",reasonBusiness:"Вы указали доход от деятельности. Форма зависит от режима; доходы по шкале, включая работу, могут объединяться в PIT-36.",reasonForeign:"Вы указали иностранный доход. Форма зависит от резидентства, вида дохода и налогового соглашения; возможные формы следует проверять по официальным правилам.",pit11Partial:"PIT-11 есть, но не знаю, от всех ли плательщиков",pit11Confirmed:"Указано, что PIT-11 получен от всех плательщиков",type36:"Может относиться к предпринимательскому доходу по шкале вместе с другими доходами по шкале, включая работу. Иностранный доход рассматривается отдельно с учётом резидентства и соглашения."});

Object.assign(QUIZ_FLOW_WORDS.uk, {
  printButton:"🖨 Роздрукувати / зберегти PDF", printTitle:"PIT у Польщі — персональна пам’ятка", printGenerated:"Сформовано", printResultHeading:"Результат квізу", printSuggested:"Можливі форми для перевірки:", printAnswersTitle:"На основі ваших відповідей", printAlreadyTitle:"Що ви вже маєте", printChecklistTitle:"Ще потрібно перевірити", printQuestionsTitle:"Питання для Urząd Skarbowy / бухгалтера", printBringTitle:"Що взяти із собою", printBringNote:"Перелік залежить від вашої ситуації та способу звернення.", printOfficialTitle:"Офіційний сервіс", printOfficialCopy:"Twój e-PIT — офіційний сервіс Міністерства фінансів Польщі.", printDisclaimer:"Ця пам’ятка сформована сервісом PRYWOZ на основі ваших відповідей і має інформаційний характер. Вона не є податковою декларацією або податковою консультацією. Остаточну форму та дані перевіряйте у Twój e-PIT, Urząd Skarbowy або у фахівця.", printSources:"Офіційні джерела: Ministerstwo Finansów, podatki.gov.pl", printChecked:"Інформацію перевірено", printNoForms:"За вашими відповідями не вдалося визначити форму для перевірки.", printExistingPit11:"Ви вказали, що PIT-11 отримано від усіх роботодавців / замовників.", printExistingContracts:"Ви вказали тип договору", printExistingBusiness:"Ви вказали спосіб оподаткування діяльності", printExistingRental:"Ви вказали тип оренди", printExistingOther:"Ви вказали, що маєте документ про інше джерело доходу.", printNoExisting:"Підтверджених документів у відповідях не зазначено.", printShortCaveat:"Це попередній орієнтир, а не остаточне визначення потрібної декларації.", printQuestionWork:"Чи враховані PIT-11 від усіх роботодавців і замовників?", printQuestionBusiness:"Чи правильно визначено спосіб оподаткування діяльності та пов’язану з ним форму PIT?", printQuestionRental:"Чи є оренда приватною та поза межами підприємницької діяльності?", printQuestionInvestments:"Які саме інвестиційні доходи потрібно відобразити та в якій формі?", printQuestionForeignResidence:"Чи вважаюся я податковим резидентом Польщі за цей рік?", printQuestionForeignZG:"Чи потрібно додати PIT/ZG?", printQuestionUkraine:"Як врахувати дохід з України та правила уникнення подвійного оподаткування?", printQuestionSeveral:"Чи потрібно подати кілька декларацій для різних джерел доходу?", printQuestionOther:"Яка форма декларації стосується цього джерела доходу?", printBringPit11:"PIT-11 від усіх роботодавців / замовників", printBringIdentity:"Документ, що посвідчує особу", printBringBank:"Дані банківського рахунку, якщо потрібно оновити рахунок для zwrot", printBringRelief:"Документи на пільги, якщо вони застосовуються", printBringBusiness:"Облік доходів і документ про спосіб оподаткування діяльності", printBringRental:"Документи про доходи та витрати щодо оренди", printBringInvestment:"Річні відомості від брокера / платника інвестиційного доходу", printBringForeign:"Документи про іноземний дохід і сплачений за кордоном податок"
});
Object.assign(QUIZ_FLOW_WORDS.pl, {
  printButton:"🖨 Wydrukuj / zapisz jako PDF", printTitle:"PIT w Polsce — Twoja osobista notatka", printGenerated:"Utworzono", printResultHeading:"Wynik quizu", printSuggested:"Możliwe formularze do sprawdzenia:", printAnswersTitle:"Na podstawie Twoich odpowiedzi", printAlreadyTitle:"Co już masz", printChecklistTitle:"Co jeszcze sprawdzić", printQuestionsTitle:"Pytania do Urzędu Skarbowego / księgowego", printBringTitle:"Co zabrać ze sobą", printBringNote:"Lista zależy od Twojej sytuacji i sposobu kontaktu z urzędem.", printOfficialTitle:"Oficjalna usługa", printOfficialCopy:"Twój e-PIT — oficjalna usługa Ministerstwa Finansów Polski.", printDisclaimer:"Ta notatka została przygotowana przez PRYWOZ na podstawie Twoich odpowiedzi i ma charakter informacyjny. Nie jest zeznaniem podatkowym ani poradą podatkową. Ostateczny formularz i dane sprawdź w Twój e-PIT, Urzędzie Skarbowym lub u specjalisty.", printSources:"Oficjalne źródła: Ministerstwo Finansów, podatki.gov.pl", printChecked:"Informacje sprawdzono", printNoForms:"Na podstawie odpowiedzi nie udało się wskazać formularza do sprawdzenia.", printExistingPit11:"Wskazano, że PIT-11 otrzymano od wszystkich pracodawców / zleceniodawców.", printExistingContracts:"Wskazany rodzaj umowy", printExistingBusiness:"Wskazano sposób opodatkowania działalności", printExistingRental:"Wskazano rodzaj najmu", printExistingOther:"Wskazano, że posiadasz dokument dotyczący innego źródła dochodu.", printNoExisting:"W odpowiedziach nie wskazano potwierdzonych dokumentów.", printShortCaveat:"To wstępna wskazówka, a nie ostateczne ustalenie właściwego zeznania.", printQuestionWork:"Czy uwzględniono PIT-11 od wszystkich pracodawców i zleceniodawców?", printQuestionBusiness:"Czy prawidłowo ustalono sposób opodatkowania działalności i powiązany formularz PIT?", printQuestionRental:"Czy najem jest prywatny i poza działalnością gospodarczą?", printQuestionInvestments:"Jakie dochody kapitałowe należy wykazać i w którym formularzu?", printQuestionForeignResidence:"Czy jestem polskim rezydentem podatkowym w tym roku?", printQuestionForeignZG:"Czy trzeba dołączyć PIT/ZG?", printQuestionUkraine:"Jak rozliczyć dochód z Ukrainy i zasady unikania podwójnego opodatkowania?", printQuestionSeveral:"Czy trzeba złożyć kilka zeznań dla różnych źródeł dochodu?", printQuestionOther:"Który formularz dotyczy tego źródła dochodu?", printBringPit11:"PIT-11 od wszystkich pracodawców / zleceniodawców", printBringIdentity:"Dokument tożsamości", printBringBank:"Dane rachunku bankowego, jeśli trzeba zaktualizować go do zwrotu", printBringRelief:"Dokumenty potwierdzające ulgi, jeśli mają zastosowanie", printBringBusiness:"Ewidencja dochodów i dokument określający sposób opodatkowania", printBringRental:"Dokumenty dotyczące przychodów i kosztów najmu", printBringInvestment:"Roczne informacje od brokera / płatnika dochodów kapitałowych", printBringForeign:"Dokumenty o dochodzie zagranicznym i zapłaconym podatku"
});
Object.assign(QUIZ_FLOW_WORDS.ru, {
  printButton:"🖨 Распечатать / сохранить PDF", printTitle:"PIT в Польше — персональная памятка", printGenerated:"Сформировано", printResultHeading:"Результат квиза", printSuggested:"Возможные формы для проверки:", printAnswersTitle:"На основе ваших ответов", printAlreadyTitle:"Что у вас уже есть", printChecklistTitle:"Что ещё проверить", printQuestionsTitle:"Вопросы для Urząd Skarbowy / бухгалтера", printBringTitle:"Что взять с собой", printBringNote:"Список зависит от вашей ситуации и способа обращения.", printOfficialTitle:"Официальный сервис", printOfficialCopy:"Twój e-PIT — официальный сервис Министерства финансов Польши.", printDisclaimer:"Эта памятка сформирована сервисом PRYWOZ на основе ваших ответов и носит информационный характер. Это не налоговая декларация и не налоговая консультация. Окончательную форму и данные проверьте в Twój e-PIT, Urząd Skarbowy или у специалиста.", printSources:"Официальные источники: Ministerstwo Finansów, podatki.gov.pl", printChecked:"Информация проверена", printNoForms:"По вашим ответам не удалось определить форму для проверки.", printExistingPit11:"Вы указали, что PIT-11 получен от всех работодателей / заказчиков.", printExistingContracts:"Вы указали тип договора", printExistingBusiness:"Вы указали способ налогообложения деятельности", printExistingRental:"Вы указали тип аренды", printExistingOther:"Вы указали, что у вас есть документ по другому источнику дохода.", printNoExisting:"Подтверждённые документы в ответах не указаны.", printShortCaveat:"Это предварительный ориентир, а не окончательное определение нужной декларации.", printQuestionWork:"Учтены ли PIT-11 от всех работодателей и заказчиков?", printQuestionBusiness:"Правильно ли определён способ налогообложения деятельности и связанная с ним форма PIT?", printQuestionRental:"Является ли аренда частной и не связанной с предпринимательством?", printQuestionInvestments:"Какие именно инвестиционные доходы нужно указать и в какой форме?", printQuestionForeignResidence:"Считаюсь ли я налоговым резидентом Польши в этом году?", printQuestionForeignZG:"Нужно ли приложить PIT/ZG?", printQuestionUkraine:"Как учесть доход из Украины и правила предотвращения двойного налогообложения?", printQuestionSeveral:"Нужно ли подать несколько деклараций для разных источников дохода?", printQuestionOther:"Какая форма декларации относится к этому источнику дохода?", printBringPit11:"PIT-11 от всех работодателей / заказчиков", printBringIdentity:"Документ, удостоверяющий личность", printBringBank:"Банковские реквизиты, если нужно обновить счёт для zwrot", printBringRelief:"Документы, подтверждающие льготы, если они применяются", printBringBusiness:"Учёт доходов и документ о способе налогообложения деятельности", printBringRental:"Документы о доходах и расходах по аренде", printBringInvestment:"Годовые сведения от брокера / плательщика инвестиционного дохода", printBringForeign:"Документы об иностранном доходе и налоге, уплаченном за рубежом"
});

const getLanguage = () => {
  try {
    const saved = localStorage.getItem("prywoz-language");
    if (LANGS.includes(saved)) return saved;
  } catch { /* Use the document language when storage is unavailable. */ }
  return LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : "uk";
};
const root = document.querySelector(".pit-main");
const helper = root?.querySelector("[data-pit-helper]");
const printSheet = document.querySelector("[data-pit-print-sheet]");
const quizAnswersStorageKey = "prywoz-pit-quiz-answers-v1";
const quizChecklistStoragePrefix = "prywoz-pit-quiz-checklist-v1";
let language = getLanguage();
const tr = key => EXTRA_WORDS[language]?.[key] || UX_WORDS[language]?.[key] || QUIZ_FLOW_WORDS[language]?.[key] || QUIZ_WORDS[language]?.[key] || WORDS[language]?.[key] || EXTRA_WORDS.uk[key] || UX_WORDS.uk[key] || QUIZ_FLOW_WORDS.uk[key] || QUIZ_WORDS.uk[key] || WORDS.uk[key] || key;

function applyLanguage(next = getLanguage()) {
  language = LANGS.includes(next) ? next : "uk";
  document.documentElement.lang = language;
  document.querySelectorAll(".pit-main [data-pit], .pit-print-sheet [data-pit]").forEach(node => { node.textContent = tr(node.dataset.pit); });
  const quizHeading = root?.querySelector("[data-pit=helperEyebrow]");
  const quizTitle = root?.querySelector("[data-pit=helperTitle]");
  const quizIntro = root?.querySelector("[data-pit=helperIntro]");
  if (quizHeading) quizHeading.textContent = tr("helperEyebrow");
  if (quizTitle) quizTitle.textContent = tr("helperTitle");
  if (quizIntro) quizIntro.textContent = tr("helperIntro");
  const ariaLabels = {
    uk: { breadcrumbLabel: "Навігаційний шлях", relatedLabel: "Корисні сервіси PRYWOZ" },
    pl: { breadcrumbLabel: "Nawigacja okruszkowa", relatedLabel: "Przydatne usługi PRYWOZ" },
    ru: { breadcrumbLabel: "Навигационная цепочка", relatedLabel: "Полезные сервисы PRYWOZ" }
  }[language];
  root?.querySelectorAll("[data-pit-aria]").forEach(node => { node.setAttribute("aria-label", ariaLabels[node.dataset.pitAria]); });
  root?.querySelector(".pit-privacy")?.setAttribute("aria-label", tr("privacyTitle"));
  root?.querySelector("[data-pit-check-progressbar]")?.setAttribute("aria-label", tr("planTitle"));
  const labels = {
    uk: { timeline: ["До кінця лютого", "15 лютого", "15 лютого — 30 квітня", "30 квітня"], sources: ["Ministerstwo Finansów — Twój e-PIT", "Ministerstwo Finansów — форми у Twój e-PIT", "Ministerstwo Finansów — інформація PIT-11 для платників", "podatki.gov.pl — доходи від роботи та строки", "Ministerstwo Finansów — діяльність за шкалою", "Ministerstwo Finansów — діяльність на лінійному податку", "Ministerstwo Finansów — приватна оренда", "Ministerstwo Finansów — інструкція PIT-38", "Ministerstwo Finansów — довідник для громадян України"] },
    pl: { timeline: ["Do końca lutego", "15 lutego", "15 lutego — 30 kwietnia", "30 kwietnia"], sources: ["Ministerstwo Finansów — Twój e-PIT", "Ministerstwo Finansów — formularze w Twój e-PIT", "Ministerstwo Finansów — informacje PIT-11 dla płatników", "podatki.gov.pl — dochody z pracy i terminy", "Ministerstwo Finansów — działalność opodatkowana skalą", "Ministerstwo Finansów — podatek liniowy", "Ministerstwo Finansów — najem prywatny", "Ministerstwo Finansów — informacja PIT-38", "Ministerstwo Finansów — poradnik dla obywateli Ukrainy"] },
    ru: { timeline: ["До конца февраля", "15 февраля", "15 февраля — 30 апреля", "30 апреля"], sources: ["Ministerstwo Finansów — Twój e-PIT", "Ministerstwo Finansów — формы в Twój e-PIT", "Ministerstwo Finansów — сведения PIT-11 для плательщиков", "podatki.gov.pl — доходы от работы и сроки", "Ministerstwo Finansów — деятельность по шкале", "Ministerstwo Finansów — линейный налог", "Ministerstwo Finansów — частная аренда", "Ministerstwo Finansów — инструкция PIT-38", "Ministerstwo Finansów — справочник для граждан Украины"] }
  }[language];
  root?.querySelectorAll(".pit-timeline time").forEach((node, index) => { node.textContent = labels.timeline[index]; });
  root?.querySelectorAll(".pit-sources li a").forEach((node, index) => { node.textContent = labels.sources[index]; });
  const meta = {
    uk: ["PIT у Польщі 2026 — PIT-37, PIT-11 та Twój e-PIT | PRYWOZ", "Як перевірити PIT у Польщі: PIT-37, PIT-11, Twój e-PIT, ключові строки та checklist для українців у Польщі."],
    pl: ["PIT w Polsce — PIT-37, PIT-11 i Twój e-PIT | PRYWOZ", "Jak sprawdzić PIT w Polsce: PIT-37, PIT-11, Twój e-PIT, ważne terminy i lista kontrolna."],
    ru: ["PIT в Польше — PIT-37, PIT-11 и Twój e-PIT | PRYWOZ", "Как проверить PIT в Польше: PIT-37, PIT-11, Twój e-PIT, важные сроки и список проверки."]
  }[language];
  document.title = meta[0];
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta[1]);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta[0]);
  renderSeason();
  renderQuiz();
}

function warsawDate() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const value = Object.fromEntries(parts.filter(part => part.type !== "literal").map(part => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

const SEASONS = Object.freeze({ 2026: Object.freeze({ start: "2027-02-15", deadline: "2027-04-30", status: "expected" }) });
function renderSeason() {
  const today = warsawDate();
  const season = SEASONS[2026];
  const status = today < season.start ? "before" : today <= season.deadline ? "open" : "after";
  const titleKey = status === "before" ? "seasonBefore" : status === "open" ? "seasonOpen" : "seasonAfter";
  const title = root?.querySelector("[data-pit-season-title]");
  if (title) title.textContent = tr(titleKey);
  const countdown = root?.querySelector("[data-pit-countdown]");
  if (!countdown) return;
  if (status === "after") {
    countdown.textContent = "";
    return;
  }
  const target = status === "before" ? season.start : season.deadline;
  const days = Math.max(0, Math.ceil((Date.parse(`${target}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000));
  const label = status === "before" ? tr("daysLeft") : tr("daysDeadline");
  countdown.textContent = `${days} ${tr("countdownDays")} · ${label}`;
}

const quizState = {
  step: "sources",
  complete: false,
  answers: { sources: [], pit11: "", contracts: [], businessMethod: "", rentalType: "", capital: "", foreignResident: "", otherDocument: "", family: [] },
  checks: []
};
const SOURCE_KEYS = ["work", "business", "rental", "investments", "foreign", "other"];
const FAMILY_KEYS = ["children", "spouse", "reliefs", "opp", "none"];
const selected = key => quizState.answers.sources.includes(key);

function restoreQuiz() {
  try {
    const saved = JSON.parse(localStorage.getItem(quizAnswersStorageKey) || "null");
    const savedAnswers = saved?.answers && typeof saved.answers === "object" ? saved.answers : saved;
    if (savedAnswers && Array.isArray(savedAnswers.sources) && Array.isArray(savedAnswers.family)) {
      const validList = (value, allowed) => Array.isArray(value) ? [...new Set(value.filter(item => allowed.includes(item)))] : [];
      const validChoice = (value, allowed) => allowed.includes(value) ? value : "";
      const answers = {
        sources: validList(savedAnswers.sources, SOURCE_KEYS),
        family: validList(savedAnswers.family, FAMILY_KEYS),
        contracts: validList(savedAnswers.contracts, ["employment", "mandate", "work", "unknown"]),
        pit11: validChoice(savedAnswers.pit11, ["yes", "no", "partial", "unknown"]),
        businessMethod: validChoice(savedAnswers.businessMethod, ["scale", "linear", "lump", "unknown"]),
        rentalType: validChoice(savedAnswers.rentalType, ["private", "business", "unknown"]),
        capital: validChoice(savedAnswers.capital, ["yes", "no", "unknown"]),
        foreignResident: validChoice(savedAnswers.foreignResident, ["yes", "no", "unknown"]),
        otherDocument: validChoice(savedAnswers.otherDocument, ["yes", "no", "unknown"])
      };
      if (answers.family.includes("none")) answers.family = ["none"];
      if (answers.contracts.includes("unknown")) answers.contracts = ["unknown"];
      quizState.answers = answers;
      const checklist = JSON.parse(localStorage.getItem(scenarioChecklistKey(answers)) || "[]");
      const validChecks = new Set(makeOutcome().checks);
      quizState.checks = Array.isArray(checklist) ? [...new Set(checklist.filter(key => typeof key === "string" && validChecks.has(key)))] : [];
      quizState.step = typeof saved.step === "string" ? saved.step : "sources";
      quizState.complete = saved.complete === true;
      if (!activeQuizSteps().includes(quizState.step)) quizState.step = activeQuizSteps()[0] || "sources";
      if (quizState.complete && !answersComplete()) quizState.complete = false;
      syncQuizControls();
    }
  } catch { /* Keep the empty quiz available when local storage is unavailable. */ }
}

function persistQuiz() {
  try {
    localStorage.setItem(quizAnswersStorageKey, JSON.stringify({ answers: quizState.answers, step: quizState.step, complete: quizState.complete }));
    localStorage.setItem(scenarioChecklistKey(quizState.answers), JSON.stringify(quizState.checks));
  } catch { /* The quiz remains usable without storage. */ }
}

function scenarioKey(answers) {
  const stable = { ...answers, sources:[...answers.sources].sort(), contracts:[...answers.contracts].sort(), family:[...answers.family].sort() };
  const value = JSON.stringify(stable);
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(36);
}

const scenarioChecklistKey = answers => `${quizChecklistStoragePrefix}-${scenarioKey(answers)}`;

function syncQuizControls() {
  if (!helper) return;
  helper.querySelectorAll('[name="pit-source"]').forEach(input => { input.checked = quizState.answers.sources.includes(input.value); });
  helper.querySelectorAll('[name="pit-contract"]').forEach(input => { input.checked = quizState.answers.contracts.includes(input.value); });
  helper.querySelectorAll('[name="pit-family"]').forEach(input => { input.checked = quizState.answers.family.includes(input.value); });
  for (const [name, value] of [["pit11",quizState.answers.pit11],["pit-business-method",quizState.answers.businessMethod],["pit-rental-type",quizState.answers.rentalType],["pit-capital",quizState.answers.capital],["pit-foreign-resident",quizState.answers.foreignResident],["pit-other-document",quizState.answers.otherDocument]]) {
    helper.querySelectorAll(`[name="${name}"]`).forEach(input => { input.checked = input.value === value; });
  }
}

function readChecklistForScenario(answers) {
  try {
    const saved = JSON.parse(localStorage.getItem(scenarioChecklistKey(answers)) || "[]");
    const validChecks = new Set(makeOutcome().checks);
    return Array.isArray(saved) ? [...new Set(saved.filter(key => typeof key === "string" && validChecks.has(key)))] : [];
  } catch { return []; }
}

function clearDeselectedBranchAnswers(previousSources, nextSources) {
  const a = quizState.answers;
  if (previousSources.includes("work") && !nextSources.includes("work")) { a.pit11 = ""; a.contracts = []; }
  if (previousSources.includes("business") && !nextSources.includes("business")) a.businessMethod = "";
  if (previousSources.includes("rental") && !nextSources.includes("rental")) a.rentalType = "";
  if (previousSources.includes("investments") && !nextSources.includes("investments")) a.capital = "";
  if (previousSources.includes("foreign") && !nextSources.includes("foreign")) a.foreignResident = "";
  if (previousSources.includes("other") && !nextSources.includes("other")) a.otherDocument = "";
}

function makeReportedList() {
  const items = [];
  const a = quizState.answers;
  const sourceNames = { work:"answerWork", business:"answerBusiness", rental:"answerRental", investments:"answerInvestments", foreign:"answerForeign", other:"answerOther" };
  a.sources.forEach(source => items.push(tr(sourceNames[source])));
  if (selected("work")) {
    if (a.pit11 === "yes") items.push(tr("pit11Confirmed"));
    else items.push(`${tr("pit11Label")}: ${tr(a.pit11 === "no" ? "no" : a.pit11 === "partial" ? "pit11Partial" : "pit11Unknown")}`);
    if (a.contracts.length) items.push(`${tr("contractsLabel")}: ${a.contracts.map(value => tr(`contract_${value}`)).join(", ")}`);
  }
  if (selected("business")) items.push(`${tr("businessMethodLabel")}: ${tr(`business_${a.businessMethod || "unknown"}`)}`);
  if (selected("rental")) items.push(`${tr("rentalTypeLabel")}: ${tr(`rental_${a.rentalType || "unknown"}`)}`);
  if (selected("investments")) items.push(`${tr("capitalLabel")}: ${tr(`capital_${a.capital || "unknown"}`)}`);
  if (selected("foreign")) items.push(`${tr("foreignResidentLabel")}: ${tr(a.foreignResident || "unsureAnswer")}`);
  if (selected("other")) items.push(`${tr("otherDocumentLabel")}: ${tr(a.otherDocument || "unsureAnswer")}`);
  items.push(`${tr("familyLabel")}: ${a.family.map(value => tr(`family_${value}`)).join(", ") || tr("unsureAnswer")}`);
  return items;
}

function makeOutcome() {
  const a = quizState.answers;
  const forms = [];
  const reasons = [];
  const checks = new Set(["checkUpo"]);
  let complex = false;
  const scaleBusiness = selected("business") && a.businessMethod === "scale";
  if (selected("work")) {
    if (!scaleBusiness) forms.push("form37");
    reasons.push("reasonWork");
    checks.add("checkWork");
    if (a.contracts.length) checks.add("checkContract");
    if (a.pit11 !== "yes") complex = true;
  }
  if (selected("business")) {
    reasons.push("reasonBusiness");
    if (a.businessMethod === "scale") forms.push("form36");
    else if (a.businessMethod === "linear") forms.push("form36l");
    else if (a.businessMethod === "lump") forms.push("form28");
    else { forms.push("formNeedCheck"); complex = true; checks.add("checkBusinessUnknown"); }
    if (a.businessMethod === "scale") checks.add("checkBusinessScale");
    if (a.businessMethod === "linear") checks.add("checkBusinessLinear");
    if (a.businessMethod === "lump") checks.add("checkBusinessLump");
  }
  if (selected("rental")) {
    reasons.push("reasonRental");
    if (a.rentalType === "private") forms.push("form28");
    else { forms.push("formNeedCheck"); complex = true; }
    checks.add(a.rentalType === "business" ? "checkBusinessRental" : "checkPrivateRental");
  }
  if (selected("investments")) {
    reasons.push("reasonInvestment");
    if (a.capital === "yes") forms.push("form38");
    else { forms.push("formNeedCheck"); complex = true; }
    checks.add(a.capital === "yes" ? "checkCapitalYes" : a.capital === "no" ? "checkCapitalNo" : "checkCapitalUnknown");
  }
  if (selected("foreign")) {
    reasons.push("reasonForeign");
    forms.push("formNeedCheck");
    complex = true;
    checks.add("checkForeign");
  }
  if (selected("other")) {
    reasons.push("reasonOther");
    forms.push("formNeedCheck");
    complex = true;
    checks.add("checkOther");
  }
  a.family.forEach(item => {
    if (item === "children") checks.add("checkChildren");
    if (item === "spouse") checks.add("checkSpouse");
    if (item === "reliefs") checks.add("checkReliefs");
    if (item === "opp") checks.add("checkOpp");
  });
  const uniqueForms = [...new Set(forms)];
  if (uniqueForms.includes("formNeedCheck")) complex = true;
  const title = selected("foreign") ? "resultForeign" : complex ? "resultComplex" : uniqueForms.length > 1 ? "resultMultiple" : "resultSingle";
  return { title, forms: uniqueForms, reasons, checks: [...checks], complex };
}

function makeClarifications(outcome = makeOutcome()) {
  const a = quizState.answers;
  const items = [];
  if (selected("foreign")) items.push("clarificationForeignResidence", "clarificationForeignZG", "clarificationUkraine");
  if (selected("business") && (a.businessMethod === "unknown" || !a.businessMethod)) items.push("clarificationBusinessMethod", "clarificationBusinessForm");
  if (selected("rental") && a.rentalType !== "private") items.push("clarificationRental");
  if (selected("investments") && a.capital !== "yes") items.push("clarificationInvestments");
  if (selected("other")) items.push("clarificationOther");
  if (a.sources.length > 1) items.push("clarificationSeveral");
  if (outcome.complex && items.length === 0) items.push("clarificationOther");
  return [...new Set(items)];
}

function updateChecklistProgress(checklist) {
  if (!checklist) return;
  const controls = [...checklist.querySelectorAll("[data-pit-check]")];
  const checked = controls.filter(input => input.checked).length;
  const total = controls.length;
  const text = root?.querySelector("[data-pit-check-progress]");
  if (text) text.textContent = tr("checkedProgress").replace("{checked}", checked).replace("{total}", total);
  const bar = root?.querySelector("[data-pit-check-progressbar]");
  if (bar) {
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", String(total));
    bar.setAttribute("aria-valuenow", String(checked));
    bar.setAttribute("aria-valuetext", tr("checkedProgress").replace("{checked}", checked).replace("{total}", total));
    if ("value" in bar) { bar.max = total || 1; bar.value = checked; }
    else bar.style.setProperty("--pit-progress", `${total ? (checked / total) * 100 : 0}%`);
  }
}

function activeQuizSteps() {
  const steps = ["sources"];
  if (selected("work")) steps.push("work");
  if (selected("business") || selected("rental")) steps.push("activity");
  if (["investments", "foreign", "other"].some(selected)) steps.push("other");
  steps.push("family");
  return steps;
}

function answersComplete() {
  const a = quizState.answers;
  return a.sources.length > 0 && (!selected("work") || (a.pit11 && a.contracts.length > 0)) &&
    (!selected("business") || Boolean(a.businessMethod)) && (!selected("rental") || Boolean(a.rentalType)) &&
    (!selected("investments") || Boolean(a.capital)) && (!selected("foreign") || Boolean(a.foreignResident)) &&
    (!selected("other") || Boolean(a.otherDocument)) && a.family.length > 0;
}

function renderQuiz() {
  if (!helper) return;
  const final = root.querySelector("[data-pit-final]");
  const steps = [...helper.querySelectorAll("[data-pit-step]")];
  const active = activeQuizSteps();
  const index = active.indexOf(quizState.step);
  if (index < 0) quizState.step = active[0];
  const currentIndex = Math.max(0, active.indexOf(quizState.step));
  helper.hidden = quizState.complete;
  if (final) final.hidden = !quizState.complete;
  steps.forEach(node => { node.hidden = node.dataset.pitStep !== quizState.step; });
  const branchStep = quizState.step === "work" ? ["work"] : quizState.step === "activity" ? ["business", "rental"] : quizState.step === "other" ? ["investments", "foreign", "other"] : [];
  helper.querySelectorAll("[data-pit-branch]").forEach(node => { node.hidden = !branchStep.includes(node.dataset.pitBranch) || !selected(node.dataset.pitBranch); });
  const progress = helper.querySelector("[data-pit-progress]");
  if (progress) progress.textContent = tr("step").replace("{current}", currentIndex + 1).replace("{total}", active.length);
  const back = helper.querySelector("[data-pit-back]");
  const next = helper.querySelector("[data-pit-next]");
  if (back) { back.textContent = tr("back"); back.hidden = currentIndex === 0; }
  if (next) { next.textContent = currentIndex === active.length - 1 ? tr("showResult") : tr("continue"); next.disabled = !stepIsValid(quizState.step); }
  root.querySelector("[data-pit-edit]").textContent = tr("editAnswers");
  root.querySelector("[data-pit-restart]").textContent = tr("restart");
  const error = helper.querySelector("[data-pit-error]");
  if (error) { error.textContent = tr("answerError"); error.hidden = true; }
  if (quizState.complete && final) renderFinal(final);
  else if (final) final.querySelector("[data-pit-result-title]").textContent = tr("initialTitle");
}

function formatResultTitle(outcome) {
  const codes = { form37: "PIT-37", form36: "PIT-36", form36l: "PIT-36L", form28: "PIT-28", form38: "PIT-38" };
  const names = outcome.forms.filter(key => codes[key]).map(key => codes[key]);
  if (!outcome.complex && names.length) return `${tr(names.length > 1 ? "resultMultiplePrefix" : "resultLikelyPrefix")} ${names.join(" + ")}`;
  return tr(outcome.title);
}

function renderFinal(final) {
  const outcome = makeOutcome();
  const title = final.querySelector("[data-pit-result-title]");
  const forms = final.querySelector("[data-pit-result-forms], [data-pit-result-reasons]");
  const reported = final.querySelector("[data-pit-reported]");
  const checklist = final.querySelector("[data-pit-result-checklist]");
  if (title) title.textContent = formatResultTitle(outcome);
  const copy = final.querySelector("[data-pit-result-copy]");
  if (copy) { copy.textContent = ""; copy.hidden = true; }
  const reasonList = final.querySelector("[data-pit-reasons]");
  if (reasonList) { reasonList.replaceChildren(); reasonList.hidden = true; }
  if (forms) forms.replaceChildren(...outcome.reasons.map(key => { const li = document.createElement("li"); li.textContent = tr(key); return li; }));
  if (reported) reported.replaceChildren(...makeReportedList().map(text => { const li = document.createElement("li"); li.textContent = text; return li; }));
  const clarificationSection = final.querySelector("[data-pit-clarifications]");
  const clarifications = clarificationSection?.querySelector("[data-pit-clarification-items]");
  if (clarificationSection && clarifications) {
    const items = makeClarifications(outcome);
    clarifications.replaceChildren(...items.map(key => { const li = document.createElement("li"); li.textContent = tr(key); return li; }));
    clarificationSection.hidden = items.length === 0;
  }
  if (checklist) checklist.replaceChildren(...outcome.checks.map(key => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox"; input.dataset.pitCheck = key; input.checked = quizState.checks.includes(key);
    const text = document.createElement("span"); text.textContent = tr(key);
    label.append(input, text); return label;
  }));
  updateChecklistProgress(checklist);
}

function renderPrintList(list, items, mode = "plain") {
  if (!list) return;
  list.replaceChildren(...items.map(item => {
    const row = document.createElement("li");
    if (mode === "checklist") {
      const box = document.createElement("span");
      box.className = `pit-print-box${item.checked ? " is-checked" : ""}`;
      box.setAttribute("aria-hidden", "true");
      if (item.checked) box.textContent = "✓";
      row.append(box, document.createTextNode(item.text));
    } else if (mode === "answers" || mode === "confirmed") {
      const mark = document.createElement("span");
      mark.className = "pit-print-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "✓";
      row.append(mark, document.createTextNode(typeof item === "string" ? item : item.text));
    } else {
      row.textContent = typeof item === "string" ? item : item.text;
    }
    return row;
  }));
  list.hidden = items.length === 0;
}

function printBringItems() {
  const a = quizState.answers;
  const items = [tr("printBringIdentity"), tr("printBringBank")];
  if (selected("work")) items.unshift(tr("printBringPit11"));
  if (selected("business")) items.push(tr("printBringBusiness"));
  if (selected("rental")) items.push(tr("printBringRental"));
  if (selected("investments")) items.push(tr("printBringInvestment"));
  if (selected("foreign")) items.push(tr("printBringForeign"));
  if (a.family.some(item => ["children", "reliefs", "spouse"].includes(item))) items.push(tr("printBringRelief"));
  return items;
}

function renderPrintSheet() {
  if (!printSheet || !quizState.complete || !answersComplete()) return false;
  const outcome = makeOutcome();
  const setText = (selector, value) => {
    const node = printSheet.querySelector(selector);
    if (node) node.textContent = value;
  };
  const generatedParts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", day: "2-digit", month: "2-digit", year: "numeric" }).formatToParts(new Date()).filter(part => part.type !== "literal").map(part => [part.type, part.value]));
  const generated = `${generatedParts.day}.${generatedParts.month}.${generatedParts.year}`;
  const verifiedText = root?.querySelector('[data-pit="verified"]')?.textContent || "";
  const verifiedDate = verifiedText.match(/\b\d{2}\.\d{2}\.\d{4}\b/)?.[0] || "—";
  setText("[data-pit-print-date]", generated);
  setText("[data-pit-print-verified]", verifiedDate);
  setText("[data-pit-print-result]", formatResultTitle(outcome));
  setText("[data-pit-print-explanation]", tr("printShortCaveat"));
  const printForms = outcome.forms.map(key => tr(key));
  if (!printForms.length) printForms.push(tr("printNoForms"));
  renderPrintList(printSheet.querySelector("[data-pit-print-forms]"), printForms);
  renderPrintList(printSheet.querySelector("[data-pit-print-answers]"), makeReportedList(), "answers");

  const existing = [];
  const a = quizState.answers;
  if (selected("work") && a.pit11 === "yes") existing.push(tr("printExistingPit11"));
  if (selected("work") && a.contracts.length) existing.push(`${tr("printExistingContracts")}: ${a.contracts.map(value => tr(`contract_${value}`)).join(", ")}`);
  if (selected("business") && a.businessMethod && a.businessMethod !== "unknown") existing.push(`${tr("printExistingBusiness")}: ${tr(`business_${a.businessMethod}`)}`);
  if (selected("rental") && a.rentalType && a.rentalType !== "unknown") existing.push(`${tr("printExistingRental")}: ${tr(`rental_${a.rentalType}`)}`);
  if (selected("other") && a.otherDocument === "yes") existing.push(tr("printExistingOther"));
  renderPrintList(printSheet.querySelector("[data-pit-print-existing]"), existing.length ? existing : [tr("printNoExisting")], existing.length ? "confirmed" : "plain");

  const checklist = [...(root?.querySelectorAll("[data-pit-final] [data-pit-check]") || [])].map(input => ({ text: tr(input.dataset.pitCheck), checked: input.checked }));
  renderPrintList(printSheet.querySelector("[data-pit-print-checklist]"), checklist, "checklist");
  const questions = makeClarifications(outcome).map(key => tr(key));
  const questionsList = printSheet.querySelector("[data-pit-print-questions]");
  renderPrintList(questionsList, questions.map(text => ({ text, checked: false })), "checklist");
  if (questionsList?.closest(".pit-print-section")) questionsList.closest(".pit-print-section").hidden = questions.length === 0;
  renderPrintList(printSheet.querySelector("[data-pit-print-bring]"), printBringItems().map(text => ({ text, checked: false })), "checklist");
  printSheet.hidden = false;
  printSheet.setAttribute("aria-hidden", "false");
  return true;
}

function printQuizResult() {
  if (!renderPrintSheet()) return;
  document.body.classList.add("pit-print-mode");
  try { window.print(); }
  finally {
    printSheet.hidden = true;
    printSheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pit-print-mode");
  }
}

function updateAnswer(input) {
  const a = quizState.answers;
  const previousScenario = scenarioChecklistKey(a);
  try { localStorage.setItem(previousScenario, JSON.stringify(quizState.checks)); } catch { /* Keep current checks in memory when storage is unavailable. */ }
  if (input.name === "pit-source") {
    const previousSources = [...a.sources];
    a.sources = [...helper.querySelectorAll('[name="pit-source"]:checked')].map(node => node.value);
    clearDeselectedBranchAnswers(previousSources, a.sources);
    syncQuizControls();
  } else if (input.name === "pit-family") {
    a.family = [...helper.querySelectorAll('[name="pit-family"]:checked')].map(node => node.value);
    if (input.value === "none" && input.checked) {
      a.family = ["none"];
      helper.querySelectorAll('[name="pit-family"]').forEach(node => { node.checked = node.value === "none"; });
    } else if (input.value !== "none" && input.checked) {
      a.family = a.family.filter(value => value !== "none");
      const none = helper.querySelector('[name="pit-family"][value="none"]');
      if (none) none.checked = false;
    }
  } else {
    const fields = { "pit11":"pit11", "pit-contract":"contracts", "pit-business-method":"businessMethod", "pit-rental-type":"rentalType", "pit-capital":"capital", "pit-foreign-resident":"foreignResident", "pit-other-document":"otherDocument" };
    const key = fields[input.name];
    if (input.name === "pit-contract") {
      if (input.value === "unknown" && input.checked) helper.querySelectorAll('[name="pit-contract"]').forEach(node => { if (node !== input) node.checked = false; });
      else if (input.checked) helper.querySelector('[name="pit-contract"][value="unknown"]').checked = false;
      a.contracts = [...helper.querySelectorAll('[name="pit-contract"]:checked')].map(node => node.value);
    }
    else if (key) a[key] = input.value;
  }
  const nextScenario = scenarioChecklistKey(a);
  if (nextScenario !== previousScenario) quizState.checks = readChecklistForScenario(a);
  persistQuiz();
  renderQuiz();
}

function stepIsValid(step) {
  const a = quizState.answers;
  if (step === "sources") return a.sources.length > 0;
  if (step === "work") return !selected("work") || Boolean(a.pit11 && a.contracts.length);
  if (step === "activity") return (!selected("business") || Boolean(a.businessMethod)) && (!selected("rental") || Boolean(a.rentalType));
  if (step === "other") return (!selected("investments") || Boolean(a.capital)) && (!selected("foreign") || Boolean(a.foreignResident)) && (!selected("other") || Boolean(a.otherDocument));
  if (step === "family") return a.family.length > 0;
  return false;
}

function focusMissingAnswer(step) {
  const candidates = {
    sources: '[name="pit-source"]', work: !quizState.answers.pit11 ? '[name="pit11"]' : '[name="pit-contract"]',
    activity: !quizState.answers.businessMethod && selected("business") ? '[name="pit-business-method"]' : '[name="pit-rental-type"]',
    other: !quizState.answers.capital && selected("investments") ? '[name="pit-capital"]' : !quizState.answers.foreignResident && selected("foreign") ? '[name="pit-foreign-resident"]' : '[name="pit-other-document"]',
    family: '[name="pit-family"]'
  };
  helper.querySelector(candidates[step])?.focus();
}

function moveNext(event) {
  event?.preventDefault();
  if (!stepIsValid(quizState.step)) { helper.querySelector("[data-pit-error]").hidden = false; focusMissingAnswer(quizState.step); return; }
  const steps = activeQuizSteps();
  const index = steps.indexOf(quizState.step);
  if (index < steps.length - 1) quizState.step = steps[index + 1];
  else quizState.complete = true;
  persistQuiz();
  renderQuiz();
  if (quizState.complete) root.querySelector("[data-pit-result-title]")?.focus();
  else focusStepHeading(quizState.step);
}

function moveBack() {
  const steps = activeQuizSteps();
  const index = steps.indexOf(quizState.step);
  if (index > 0) quizState.step = steps[index - 1];
  persistQuiz();
  renderQuiz();
  focusStepHeading(quizState.step);
}

function focusStepHeading(step) {
  const section = helper?.querySelector(`[data-pit-step="${step}"]`);
  const heading = section?.querySelector(":scope > legend");
  if (heading) { heading.focus(); return; }
  [...(section?.querySelectorAll("input, button, select, textarea, a[href]") || [])].find(node => !node.closest("[hidden]"))?.focus();
}

function restartQuiz() {
  quizState.step = "sources";
  quizState.complete = false;
  quizState.answers = { sources: [], pit11: "", contracts: [], businessMethod: "", rentalType: "", capital: "", foreignResident: "", otherDocument: "", family: [] };
  quizState.checks = [];
  helper.querySelectorAll("input").forEach(input => { input.checked = false; });
  persistQuiz();
  renderQuiz();
  helper.querySelector("input")?.focus();
}

helper?.addEventListener("submit", event => moveNext(event));
helper?.addEventListener("change", event => {
  if (event.target.matches("input")) updateAnswer(event.target);
});
helper?.querySelector("[data-pit-back]")?.addEventListener("click", moveBack);
root?.querySelector("[data-pit-edit]")?.addEventListener("click", () => { quizState.complete = false; quizState.step = "sources"; persistQuiz(); renderQuiz(); helper.querySelector('[data-pit-step="sources"] input')?.focus(); });
root?.querySelector("[data-pit-restart]")?.addEventListener("click", restartQuiz);
root?.querySelector("[data-pit-print]")?.addEventListener("click", printQuizResult);
root?.querySelector("[data-pit-final]")?.addEventListener("change", event => {
  const key = event.target.dataset.pitCheck;
  if (!key) return;
  quizState.checks = event.target.checked ? [...new Set([...quizState.checks, key])] : quizState.checks.filter(item => item !== key);
  persistQuiz();
  updateChecklistProgress(event.currentTarget.querySelector("[data-pit-result-checklist]"));
  if (printSheet && !printSheet.hidden) renderPrintSheet();
});

document.addEventListener("prywoz:language-change", event => applyLanguage(event.detail?.language));
restoreQuiz();
applyLanguage();
