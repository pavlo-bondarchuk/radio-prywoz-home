(() => {
  const STATUS_URL = "https://myradio24.com/users/73556/status.json";
  const iconPath = "./assets/icons/lucide-sprite.svg";
  const languages = ["uk", "pl", "ru"];
  let language = languages.includes(localStorage.getItem("prywoz-language"))
    ? localStorage.getItem("prywoz-language")
    : "uk";

  const C = {
    siteVersion: ["Версія 2.0", "Wersja 2.0", "Версия 2.0"],
    designCredit: ["Створено", "Wykonanie", "Сделано"],
    designAria: ["bonddesign — відкривається в новій вкладці", "bonddesign — otwiera się w nowej karcie", "bonddesign — открывается в новой вкладке"],
    home: ["Головна", "Strona główna", "Главная"],
    breadcrumbsAria: ["Навігаційний шлях", "Okruszki nawigacyjne", "Навигационная цепочка"],
    currency: ["Курси валют", "Kursy walut", "Курсы валют"],
    listen: ["Ефір", "Radio", "Эфир"],
    news: ["Новини", "Wiadomości", "Новости"],
    services: ["Послуги в Лодзі", "Usługi w Łodzi", "Услуги в Лодзи"],
    usefulMenu: ["Корисне", "Przydatne", "Полезное"],
    salaryCalculator: ["Калькулятор зарплати", "Kalkulator wynagrodzenia", "Калькулятор зарплаты"],
    workCalendar: ["Робочий календар", "Kalendarz pracy", "Рабочий календарь"],
    rentCalculator: ["Калькулятор оренди", "Kalkulator kosztów najmu", "Калькулятор аренды"],
    pitGuide: ["Річний PIT у Польщі", "Roczne rozliczenie PIT", "Годовой PIT в Польше"],
    openMenu: ["Відкрити меню", "Otwórz menu", "Открыть меню"],
    closeMenu: ["Закрити меню", "Zamknij menu", "Закрыть меню"],
    languageChoice: ["Вибір мови", "Wybór języka", "Выбор языка"],
    mainNavigation: ["Основна навігація", "Nawigacja główna", "Основная навигация"],
    business: ["Бізнес", "Biznes", "Бизнес"],
    businessPartnership: ["Для бізнесу", "Dla biznesu", "Для бизнеса"],
    programs: ["Програми", "Programy", "Программы"],
    about: ["Про нас", "O nas", "О нас"],
    contacts: ["Контакти", "Kontakt", "Контакты"],
    card: ["Картка", "Karta", "Карта"],
    firstRadio: [
      "Перше українське радіо в Польщі",
      "Pierwsze ukraińskie radio w Polsce",
      "Первое украинское радио в Польше",
    ],
    radioOff: ["Радіо вимкнено", "Radio wyłączone", "Радио выключено"],
    information: ["Інформація", "Informacje", "Информация"],
    connection: ["Зв’язок", "Kontakt", "Связь"],
    privacy: [
      "Політика приватності",
      "Polityka prywatności",
      "Политика конфиденциальности",
    ],
    newsSources: ["Джерела новин", "Źródła wiadomości", "Источники новостей"],
    footerAbout: [
      "Українське радіо та корисний портал у Польщі.",
      "Ukraińskie radio i przydatny portal w Polsce.",
      "Украинское радио и полезный портал в Польше.",
    ],
    footerCountry: ["Польща", "Polska", "Польша"],
    writeUs: ["Написати нам", "Napisz do nas", "Написать нам"],
    footerCardLabel: ["Радіо 24/7", "Radio 24/7", "Радио 24/7"],
    footerCardDate: [
      "Слухайте наживо",
      "Słuchaj na żywo",
      "Слушайте в прямом эфире",
    ],
    footerCardText: [
      "Денний ефір 10:00–20:00 · нічний 20:00–10:00",
      "Program dzienny 10:00–20:00 · nocny 20:00–10:00",
      "Дневной эфир 10:00–20:00 · ночной 20:00–10:00",
    ],
    madeFor: [
      "Створено з любов'ю для наших слухачів",
      "Stworzone z miłością dla naszych słuchaczy",
      "Создано с любовью для наших слушателей",
    ],
    copyright: [
      "© 2026 РАДИО ПРИВОЗ ФМ. Усі права захищено.",
      "© 2026 RADIO PRYWOZ FM. Wszelkie prawa zastrzeżone.",
      "© 2026 РАДИО ПРИВОЗ ФМ. Все права защищены.",
    ],
    onAirNow: ["Зараз в ефірі", "Teraz na antenie", "Сейчас в эфире"],
    dayAir: [
      "Денний ефір · 10:00–20:00",
      "Program dzienny · 10:00–20:00",
      "Дневной эфир · 10:00–20:00",
    ],
    nightAir: [
      "Нічний ефір · 20:00–10:00",
      "Program nocny · 20:00–10:00",
      "Ночной эфир · 20:00–10:00",
    ],
    today: ["Сьогодні", "Dzisiaj", "Сегодня"],
    airProgram: ["Програма ефіру", "Program audycji", "Программа эфира"],
    polishTime: [
      "Час вказано для Польщі",
      "Czas polski",
      "Время указано для Польши",
    ],
    loadingProgram: [
      "Завантажуємо програму…",
      "Ładujemy program…",
      "Загружаем программу…",
    ],
    showMore: ["Показати більше", "Pokaż więcej", "Показать больше"],
    showLess: ["Показати менше", "Pokaż mniej", "Показать меньше"],
    approximateNote: [
      "Майбутній час є орієнтовним і може змінюватися через джингли або оновлення ефіру.",
      "Przyszłe godziny są orientacyjne i mogą się zmienić z powodu jingli lub zmian w emisji.",
      "Будущее время приблизительное и может меняться из-за джинглов или изменений эфира.",
    ],
    played: ["Зіграно", "Odtworzono", "Прозвучало"],
    now: ["В ефірі", "Na antenie", "В эфире"],
    next: ["Далі", "Następnie", "Далее"],
    unavailableProgram: [
      "Програма треків тимчасово недоступна.",
      "Program utworów jest chwilowo niedostępny.",
      "Программа треков временно недоступна.",
    ],
    infoFeed: [
      "Інформаційна стрічка",
      "Serwis informacyjny",
      "Информационная лента",
    ],
    all: ["Усі", "Wszystkie", "Все"],
    poland: ["Польща", "Polska", "Польша"],
    ukraine: ["Україна", "Ukraina", "Украина"],
    politics: ["Політика", "Polityka", "Политика"],
    society: ["Суспільство", "Społeczeństwo", "Общество"],
    culture: ["Культура", "Kultura", "Культура"],
    sport: ["Спорт", "Sport", "Спорт"],
    loading: ["Завантаження…", "Ładowanie…", "Загрузка…"],
    loadMore: ["Завантажити більше", "Załaduj więcej", "Загрузить ещё"],
    source: ["Джерело →", "Źródło →", "Источник →"],
    noMaterials: [
      "У цій категорії поки немає матеріалів.",
      "W tej kategorii nie ma jeszcze materiałów.",
      "В этой категории пока нет материалов.",
    ],
    newsError: [
      "Не вдалося завантажити стрічку. Спробуйте оновити сторінку.",
      "Nie udało się załadować wiadomości. Odśwież stronę.",
      "Не удалось загрузить ленту. Обновите страницу.",
    ],
    cookieTitle: [
      "Аналітичні cookie",
      "Analityczne pliki cookie",
      "Аналитические cookie",
    ],
    cookieText: [
      "Допоможіть нам зрозуміти, як відвідувачі користуються сайтом. Рекламні cookie не використовуються.",
      "Pomóż nam zrozumieć, jak użytkownicy korzystają ze strony. Nie używamy reklamowych plików cookie.",
      "Помогите нам понять, как посетители пользуются сайтом. Рекламные cookie не используются.",
    ],
    decline: ["Відхилити", "Odrzuć", "Отклонить"],
    accept: ["Прийняти", "Akceptuj", "Принять"],
    project: ["Про проєкт", "O projekcie", "О проекте"],
    radioForUs: [
      "Радіо для наших у Польщі",
      "Radio dla Ukraińców w Polsce",
      "Радио для украинцев в Польше",
    ],
    projectText: [
      "РАДИО ПРИВОЗ ФМ об’єднує українську музику, корисні новини, культуру та практичні сервіси для життя в Польщі.",
      "РАДИО ПРИВОЗ ФМ łączy ukraińską muzykę, wiadomości, kulturę i praktyczne usługi dla życia w Polsce.",
      "РАДИО ПРИВОЗ ФМ объединяет украинскую музыку, новости, культуру и практические сервисы для жизни в Польше.",
    ],
    live247: ["Живий ефір 24/7", "Radio na żywo 24/7", "Живой эфир 24/7"],
    live247Text: [
      "Денна власна програма й нічний музичний потік.",
      "Własny program dzienny i nocny strumień muzyczny.",
      "Собственная дневная программа и ночной музыкальный поток.",
    ],
    ukrainian: ["Українською", "Po ukraińsku", "На украинском"],
    ukrainianText: [
      "Зрозуміло про життя, документи й можливості в Польщі.",
      "Prosto o życiu, dokumentach i możliwościach w Polsce.",
      "Понятно о жизни, документах и возможностях в Польше.",
    ],
    community: ["Для громади", "Dla społeczności", "Для сообщества"],
    communityText: [
      "Новини, ініціативи, події та контакти українського бізнесу.",
      "Wiadomości, inicjatywy, wydarzenia i kontakty ukraińskiego biznesu.",
      "Новости, инициативы, события и контакты украинского бизнеса.",
    ],
    join: ["Як долучитися", "Jak dołączyć", "Как присоединиться"],
    guest: [
      "Стати гостем ефіру",
      "Zostań gościem audycji",
      "Стать гостем эфира",
    ],
    guestText: [
      "Розкажіть про свій проєкт, подію або корисну ініціативу.",
      "Opowiedz o swoim projekcie, wydarzeniu lub inicjatywie.",
      "Расскажите о своём проекте, событии или инициативе.",
    ],
    write: ["Написати →", "Napisz →", "Написать →"],
    addBusiness: ["Додати бізнес", "Dodaj firmę", "Добавить бизнес"],
    addBusinessText: [
      "Запропонуйте компанію чи фахівця для каталогу.",
      "Zaproponuj firmę lub specjalistę do katalogu.",
      "Предложите компанию или специалиста для каталога.",
    ],
    submit: ["Подати →", "Wyślij →", "Отправить →"],
    communityCatalog: [
      "Каталог громади",
      "Katalog społeczności",
      "Каталог сообщества",
    ],
    ukrainianBusiness: [
      "Український бізнес у Польщі",
      "Ukraiński biznes w Polsce",
      "Украинский бизнес в Польше",
    ],
    businessLead: [
      "Категорії послуг і швидкий перехід до пошуку фахівців. Для розміщення компанії напишіть редакції.",
      "Kategorie usług i szybkie wyszukiwanie specjalistów. Aby dodać firmę, napisz do redakcji.",
      "Категории услуг и быстрый поиск специалистов. Для размещения компании напишите редакции.",
    ],
    addCompany: ["Додати компанію", "Dodaj firmę", "Добавить компанию"],
    feedback: ["Зворотний зв’язок", "Informacja zwrotna", "Обратная связь"],
    contactsLead: [
      "Новина, пропозиція для ефіру, партнерство чи додавання бізнесу — напишіть редакції.",
      "Wiadomość, propozycja audycji, partnerstwo lub dodanie firmy — napisz do redakcji.",
      "Новость, предложение для эфира, партнёрство или добавление бизнеса — напишите редакции.",
    ],
    generalQuestions: [
      "Для загальних питань і пропозицій.",
      "Pytania ogólne i propozycje.",
      "Для общих вопросов и предложений.",
    ],
    phone: ["Телефон", "Telefon", "Телефон"],
    phoneText: [
      "Зв’язок із редакцією в Польщі.",
      "Kontakt z redakcją w Polsce.",
      "Связь с редакцией в Польше.",
    ],
    name: ["Ім’я", "Imię", "Имя"],
    message: ["Повідомлення", "Wiadomość", "Сообщение"],
    send: ["Надіслати", "Wyślij", "Отправить"],
    ownAir: ["Власний ефір", "Własna audycja", "Собственный эфир"],
    radioPrograms: ["Програми радіо", "Programy radiowe", "Программы радио"],
    programsLead: [
      "Музика, розмовні формати й практична інформація для української громади в Польщі.",
      "Muzyka, rozmowy i praktyczne informacje dla ukraińskiej społeczności w Polsce.",
      "Музыка, разговорные форматы и практическая информация для украинского сообщества в Польше.",
    ],
    dailyUseful: [
      "Корисно щодня",
      "Przydatne codziennie",
      "Полезно каждый день",
    ],
    servicesLead: [
      "Прямі посилання на міські та польські сервіси для життя, документів, транспорту й здоров’я.",
      "Bezpośrednie linki do miejskich i polskich usług dotyczących życia, dokumentów, transportu i zdrowia.",
      "Прямые ссылки на городские и польские сервисы для жизни, документов, транспорта и здоровья.",
    ],
    legal: [
      "Юридична інформація",
      "Informacje prawne",
      "Юридическая информация",
    ],
    privacyLead: [
      "Основні правила обробки даних на сайті РАДИО ПРИВОЗ ФМ.",
      "Podstawowe zasady przetwarzania danych na stronie РАДИО ПРИВОЗ ФМ.",
      "Основные правила обработки данных на сайте РАДИО ПРИВОЗ ФМ.",
    ],
    dataReceived: [
      "Які дані ми отримуємо",
      "Jakie dane otrzymujemy",
      "Какие данные мы получаем",
    ],
    dataPurpose: [
      "Для чого використовуються дані",
      "Do czego wykorzystujemy dane",
      "Для чего используются данные",
    ],
  };
  Object.assign(C, {
    aboutMetaTitle: [
      "Про PRYWOZ — українське радіо і корисний портал у Польщі",
      "O PRYWOZ — ukraińskie radio i praktyczny portal w Polsce",
      "О PRYWOZ — украинское радио и полезный портал в Польше",
    ],
    aboutKicker: ["Радіо і портал для українців у Польщі", "Radio i portal dla Ukraińców w Polsce", "Радио и портал для украинцев в Польше"],
    aboutHeroTitle: ["PRYWOZ — для своїх у Польщі", "PRYWOZ — dla swoich w Polsce", "PRYWOZ — для своих в Польше"],
    aboutHeroLead: ["Радіо, новини та корисні сервіси для українців у Польщі — в одному місці.", "Radio, wiadomości i przydatne serwisy dla Ukraińców w Polsce — w jednym miejscu.", "Радио, новости и полезные сервисы для украинцев в Польше — в одном месте."],
    aboutTagline: ["Слухати. Знати. Вирішувати.", "Słuchać. Wiedzieć. Działać.", "Слушать. Знать. Решать."],
    aboutPillarsLabel: ["Слухати, знати, вирішувати", "Słuchać, wiedzieć, działać", "Слушать, знать, решать"],
    aboutRadioOrigin: ["Усе почалося з радіо.", "Wszystko zaczęło się od radia.", "Всё началось с радио."],
    aboutStoryTitle: ["Від ефіру — до корисного порталу", "Od radia do praktycznego portalu", "От эфира — к полезному порталу"],
    aboutStoryStart: ["PRYWOZ народився як українське радіо в Польщі — з музикою, гумором, живим словом і відчуттям дому.", "PRYWOZ powstał jako ukraińskie radio w Polsce — z muzyką, humorem, rozmowami i poczuciem domu.", "PRYWOZ появился как украинское радио в Польше — с музыкой, юмором, живым словом и ощущением дома."],
    aboutStoryNeeds: ["Та життя слухачів — це не лише музика. Щодня виникають питання про роботу, документи, податки, транспорт, погоду, новини й український бізнес.", "Ale życie słuchaczy to nie tylko muzyka. Na co dzień pojawiają się pytania o pracę, dokumenty, podatki, transport, pogodę, wiadomości i ukraińskie firmy.", "Но жизнь слушателей — это не только музыка. Каждый день возникают вопросы о работе, документах, налогах, транспорте, погоде, новостях и украинском бизнесе."],
    aboutStoryPortal: ["Так навколо радіо поступово виріс практичний портал для українців, які живуть у Польщі.", "Tak wokół radia stopniowo powstał praktyczny portal dla Ukraińców mieszkających w Polsce.", "Так вокруг радио постепенно вырос практический портал для украинцев, которые живут в Польше."],
    aboutStoryClose: ["Радіо залишається серцем PRYWOZ. А сайт допомагає з усім іншим.", "Radio pozostaje sercem PRYWOZ. Strona pomaga w pozostałych sprawach.", "Радио остаётся сердцем PRYWOZ. А сайт помогает с остальным."],
    aboutListenTitle: ["Слухати", "Słuchać", "Слушать"],
    aboutListenText: ["Живий ефір, музика, програми, розмови й люди, яких цікаво слухати.", "Radio na żywo, muzyka, audycje, rozmowy i ciekawi ludzie.", "Прямой эфир, музыка, программы, разговоры и люди, которых интересно слушать."],
    aboutKnowTitle: ["Знати", "Wiedzieć", "Знать"],
    aboutKnowText: ["Новини з Польщі, України та світу, а також матеріали про важливі теми.", "Wiadomości z Polski, Ukrainy i świata oraz materiały o ważnych sprawach.", "Новости из Польши, Украины и мира, а также материалы о важных темах."],
    aboutSolveTitle: ["Вирішувати", "Działać", "Решать"],
    aboutSolveText: ["Погода, курси валют, PIT-навігатор і калькулятори для щоденних справ.", "Pogoda, kursy walut, przewodnik PIT i kalkulatory przydatne na co dzień.", "Погода, курсы валют, PIT-навигатор и калькуляторы для повседневных задач."],
    aboutDirectionsTitle: ["Що є на PRYWOZ", "Co znajdziesz na PRYWOZ", "Что есть на PRYWOZ"],
    aboutRadioDirection: ["Радіо", "Radio", "Радио"],
    aboutRadioDirectionText: ["Живий ефір, музика, авторські програми, розмови та інтерв’ю.", "Radio na żywo, muzyka, autorskie audycje, rozmowy i wywiady.", "Прямой эфир, музыка, авторские программы, разговоры и интервью."],
    aboutNewsDirection: ["Новини", "Wiadomości", "Новости"],
    aboutNewsDirectionText: ["Матеріали з Польщі, України та світу з посиланнями на джерело й оригінальну публікацію.", "Wiadomości z Polski, Ukrainy i świata z oznaczeniem źródła i linkiem do oryginalnej publikacji.", "Материалы из Польши, Украины и мира с указанием источника и ссылкой на оригинальную публикацию."],
    aboutNewsSourcesLink: ["Переглянути джерела новин →", "Zobacz źródła wiadomości →", "Посмотреть источники новостей →"],
    aboutServicesDirection: ["Корисні сервіси", "Przydatne serwisy", "Полезные сервисы"],
    aboutServicesDirectionText: ["Погода в Лодзі, курси валют НБУ, PIT-навігатор і калькулятори зарплати, робочого календаря та оренди.", "Pogoda w Łodzi, kursy walut NBU, przewodnik PIT oraz kalkulatory wynagrodzenia, kalendarza pracy i najmu.", "Погода в Лодзи, курсы валют НБУ, PIT-навигатор и калькуляторы зарплаты, рабочего календаря и аренды."],
    aboutLifeDirection: ["Життя у Польщі", "Życie w Polsce", "Жизнь в Польше"],
    aboutLifeDirectionText: ["Підбірка посилань на міські й польські сервіси та інформацію для повсякденних справ.", "Zestaw linków do miejskich i polskich serwisów oraz informacji przydatnych na co dzień.", "Подборка ссылок на городские и польские сервисы и информацию для повседневных дел."],
    aboutWeatherLink: ["Погода в Лодзі →", "Pogoda w Łodzi →", "Погода в Лодзи →"],
    aboutCurrencyLink: ["Курси валют →", "Kursy walut →", "Курсы валют →"],
    aboutSalaryLink: ["Калькулятор зарплати →", "Kalkulator wynagrodzenia →", "Калькулятор зарплаты →"],
    aboutCalendarLink: ["Робочий календар →", "Kalendarz pracy →", "Рабочий календарь →"],
    aboutRentLink: ["Калькулятор оренди →", "Kalkulator kosztów najmu →", "Калькулятор аренды →"],
    aboutPitLink: ["PIT у Польщі →", "PIT w Polsce →", "PIT в Польше →"],
    aboutCityServicesLink: ["Міські сервіси Лодзі →", "Usługi miejskie w Łodzi →", "Городские сервисы Лодзи →"],
    aboutCommunityDirection: ["Український бізнес і громада", "Ukraińskie firmy i społeczność", "Украинский бизнес и сообщество"],
    aboutCommunityDirectionText: ["Розповідаємо про український бізнес, ініціативи й події та запрошуємо пропонувати нові теми.", "Pokazujemy ukraińskie firmy, inicjatywy i wydarzenia. Możesz też zaproponować własny temat.", "Рассказываем об украинском бизнесе, инициативах и событиях и приглашаем предлагать новые темы."],
    aboutBusinessLink: ["Бізнес-каталог →", "Katalog firm →", "Каталог бизнеса →"],
    aboutTrustTitle: ["Як ми працюємо з інформацією", "Jak pracujemy z informacjami", "Как мы работаем с информацией"],
    aboutTrustEyebrow: ["Прозорість джерел", "Przejrzystość źródeł", "Прозрачность источников"],
    aboutTrustLead: ["Для нас важливо не лише показати відповідь, а й пояснити, звідки взялися дані.", "Ważne jest dla nas nie tylko podanie informacji, ale także wskazanie jej źródła.", "Для нас важно не только показать информацию, но и объяснить, откуда она взялась."],
    aboutTrustUpdated: ["Якщо дані можуть змінюватися, ми намагаємося показувати час оновлення та посилання на першоджерело там, де це передбачено сервісом.", "Jeśli dane mogą się zmieniać, staramy się podawać czas aktualizacji i link do źródła tam, gdzie serwis udostępnia takie informacje.", "Если данные могут меняться, мы стараемся показывать время обновления и ссылку на первоисточник там, где это предусмотрено сервисом."],
    aboutTrustDisclaimerTitle: ["Важливо", "Ważne", "Важно"],
    aboutTrustDisclaimer: ["PRYWOZ допомагає швидше знайти й зрозуміти інформацію, але не замінює державні установи, банки, лікарів, бухгалтерів або юридичних консультантів. Перед важливим рішенням перевіряйте першоджерело.", "PRYWOZ pomaga szybciej znaleźć i zrozumieć informacje, ale nie zastępuje urzędów, banków, lekarzy, księgowych ani doradców prawnych. Przed ważną decyzją sprawdź źródło.", "PRYWOZ помогает быстрее найти и понять информацию, но не заменяет государственные учреждения, банки, врачей, бухгалтеров или юристов. Перед важным решением проверяйте первоисточник."],
    aboutSourceGov: ["Офіційна інформація Польщі: gov.pl", "Oficjalne informacje z Polski: gov.pl", "Официальная информация Польши: gov.pl"],
    aboutSourceFinance: ["Податкова інформація: Міністерство фінансів Польщі та podatki.gov.pl", "Informacje podatkowe: Ministerstwo Finansów i podatki.gov.pl", "Налоговая информация: Министерство финансов Польши и podatki.gov.pl"],
    aboutSourceUkrNbu: ["Курси валют: Національний банк України, bank.gov.ua", "Kursy walut: Narodowy Bank Ukrainy, bank.gov.ua", "Курсы валют: Национальный банк Украины, bank.gov.ua"],
    aboutSourceWeather: ["Погода: Open-Meteo; якість повітря: GIOŚ; попередження: IMGW-PIB", "Pogoda: Open-Meteo; jakość powietrza: GIOŚ; ostrzeżenia: IMGW-PIB", "Погода: Open-Meteo; качество воздуха: GIOŚ; предупреждения: IMGW-PIB"],
    aboutSourceNews: ["Новини: оригінальні публікації вказаних редакцій та установ", "Wiadomości: oryginalne publikacje wskazanych redakcji i instytucji", "Новости: оригинальные публикации указанных редакций и учреждений"],
    aboutOwnershipTitle: ["Що створюємо ми", "Co tworzymy", "Что создаём мы"],
    aboutPrYwozTitle: ["Контент PRYWOZ", "Treści PRYWOZ", "Контент PRYWOZ"],
    aboutPrYwozText: ["Радіоефір, програми, інтерв’ю, пояснювальні матеріали та інтерфейси наших сервісів.", "Audycje radiowe, programy, wywiady, materiały wyjaśniające i interfejsy naszych serwisów.", "Радиоэфир, программы, интервью, объясняющие материалы и интерфейсы наших сервисов."],
    aboutExternalTitle: ["Зовнішні дані й публікації", "Dane i publikacje zewnętrzne", "Внешние данные и публикации"],
    aboutExternalText: ["Офіційні дані, прогнози, курси валют і новини інших джерел. Ми намагаємося позначати їхнє походження та посилатися на оригінал.", "Dane urzędowe, prognozy, kursy walut i wiadomości z innych źródeł. Staramy się oznaczać ich pochodzenie i linkować do oryginału.", "Официальные данные, прогнозы, курсы валют и новости других источников. Мы стараемся указывать их происхождение и ссылаться на оригинал."],
    aboutOwnershipPrywozTitle: ["Контент PRYWOZ", "Treści PRYWOZ", "Контент PRYWOZ"],
    aboutOwnershipPrywozText: ["Радіоефір, програми, інтерв’ю, пояснювальні матеріали та інтерфейси наших сервісів.", "Audycje radiowe, programy, wywiady, materiały wyjaśniające i interfejsy naszych serwisów.", "Радиоэфир, программы, интервью, объясняющие материалы и интерфейсы наших сервисов."],
    aboutOwnershipExternalTitle: ["Зовнішні дані й публікації", "Dane i publikacje zewnętrzne", "Внешние данные и публикации"],
    aboutOwnershipExternalText: ["Офіційні дані, прогнози, курси валют і новини інших джерел. Ми намагаємося позначати їхнє походження та посилатися на оригінал.", "Dane urzędowe, prognozy, kursy walut i wiadomości z innych źródeł. Staramy się oznaczać ich pochodzenie i linkować do oryginału.", "Официальные данные, прогнозы, курсы валют и новости других источников. Мы стараемся указывать их происхождение и ссылаться на оригинал."],
    aboutCultureTitle: ["Український характер. Польське сьогодення.", "Ukraiński charakter. Polska codzienność.", "Украинский характер. Польская повседневность."],
    aboutCultureEyebrow: ["Наш характер", "Nasz charakter", "Наш характер"],
    aboutCultureText: ["Ми говоримо про життя українців у Польщі без зайвого офіціозу.", "Mówimy o życiu Ukraińców w Polsce bez zbędnego urzędowego tonu.", "Мы говорим о жизни украинцев в Польше без лишнего официоза."],
    aboutCultureClose: ["З повагою до країни, у якій живемо. З любов’ю до культури, яку привезли із собою, і з нормальним людським гумором. PRYWOZ — місце, де можна почути своїх і знайти щось корисне для себе.", "Z szacunkiem do kraju, w którym żyjemy, i z przywiązaniem do kultury, którą przywieźliśmy. Zwyczajnie, po ludzku i z humorem. PRYWOZ to miejsce, w którym możesz posłuchać swoich i znaleźć coś przydatnego.", "С уважением к стране, в которой живём, и с любовью к культуре, которую привезли с собой. Просто, по-человечески и с юмором. PRYWOZ — место, где можно услышать своих и найти полезное."],
    aboutPrivacyTitle: ["Приватність", "Prywatność", "Приватность"],
    aboutPrivacyCookies: ["Аналітичні cookie працюють лише за вашою згодою; рекламні cookie не використовуються.", "Analityczne pliki cookie działają tylko za Twoją zgodą; reklamowe pliki cookie nie są używane.", "Аналитические cookie работают только с вашего согласия; рекламные cookie не используются."],
    aboutPrivacyLocal: ["Відповіді PIT-навігатора та позначки чекліста зберігаються локально у браузері на цьому пристрої.", "Odpowiedzi w przewodniku PIT i zaznaczenia na liście kontrolnej są zapisywane lokalnie w przeglądarce na tym urządzeniu.", "Ответы PIT-навигатора и отметки чеклиста сохраняются локально в браузере на этом устройстве."],
    aboutPrivacyPit: ["PIT-навігатор не запитує PESEL, NIP, адресу, суми доходу або номер рахунку.", "Przewodnik PIT nie pyta o PESEL, NIP, adres, kwoty dochodu ani numer rachunku.", "PIT-навигатор не запрашивает PESEL, NIP, адрес, суммы дохода или номер счёта."],
    aboutJoinTitle: ["Як долучитися", "Jak dołączyć", "Как присоединиться"],
    aboutGuestTitle: ["Стати гостем ефіру", "Zostań gościem audycji", "Стать гостем эфира"],
    aboutGuestText: ["Розкажіть про свій проєкт, подію або корисну ініціативу.", "Opowiedz o swoim projekcie, wydarzeniu lub inicjatywie.", "Расскажите о своём проекте, событии или полезной инициативе."],
    aboutBusinessTitle: ["Додати бізнес", "Zaproponuj firmę", "Добавить бизнес"],
    aboutBusinessText: ["Запропонуйте компанію або фахівця для каталогу PRYWOZ.", "Zaproponuj firmę lub specjalistę do katalogu PRYWOZ.", "Предложите компанию или специалиста для каталога PRYWOZ."],
    aboutTopicTitle: ["Запропонувати тему", "Zaproponuj temat", "Предложить тему"],
    aboutTopicText: ["Побачили важливу новину, проблему або тему, про яку варто розповісти? Напишіть нам.", "Widzisz ważną wiadomość, problem lub temat, o którym warto opowiedzieć? Napisz do nas.", "Увидели важную новость, проблему или тему, о которой стоит рассказать? Напишите нам."],
    aboutErrorTitle: ["Повідомити про помилку", "Zgłoś błąd", "Сообщить об ошибке"],
    aboutErrorText: ["Якщо інформація застаріла або ми помилилися — напишіть нам. Ми перевіримо.", "Jeśli informacja jest nieaktualna lub popełniliśmy błąd — napisz do nas. Sprawdzimy to.", "Если информация устарела или мы ошиблись — напишите нам. Мы проверим."],
    aboutPartnerTitle: ["Партнерство", "Współpraca", "Партнёрство"],
    aboutPartnerText: ["Відкриті до співпраці з людьми, проєктами та ініціативами української громади.", "Jesteśmy otwarci na współpracę z osobami, projektami i inicjatywami ukraińskiej społeczności.", "Открыты к сотрудничеству с людьми, проектами и инициативами украинского сообщества."],
    aboutContactAction: ["Написати нам", "Napisz do nas", "Написать нам"],
    aboutListenCta: ["Слухати ефір", "Słuchaj radia", "Слушать эфир"],
    aboutClosingTitle: ["Радіо для своїх. Портал для життя.", "Radio dla swoich. Portal na co dzień.", "Радио для своих. Портал для жизни."],
    aboutClosingLead: ["PRYWOZ — місце, де можна почути своїх і знайти корисне для життя в Польщі.", "PRYWOZ to miejsce, w którym możesz posłuchać swoich i znaleźć przydatne informacje o życiu w Polsce.", "PRYWOZ — место, где можно услышать своих и найти полезное для жизни в Польше."],
    wave: ["Українська хвиля", "Ukraińska fala", "Украинская волна"],
    waveText: [
      "Музика, новини громади та щоденні теми.",
      "Muzyka, wiadomości społeczności i codzienne tematy.",
      "Музыка, новости сообщества и ежедневные темы.",
    ],
    daily: ["Щодня", "Codziennie", "Ежедневно"],
    interview: [
      "Інтерв’ю громади",
      "Wywiady społeczności",
      "Интервью сообщества",
    ],
    interviewText: [
      "Люди, ініціативи й український бізнес у Польщі.",
      "Ludzie, inicjatywy i ukraiński biznes w Polsce.",
      "Люди, инициативы и украинский бизнес в Польше.",
    ],
    daytime: ["У денному ефірі", "W programie dziennym", "В дневном эфире"],
    useful: ["Корисно знати", "Warto wiedzieć", "Полезно знать"],
    usefulText: [
      "Документи, медицина, транспорт і міські сервіси.",
      "Dokumenty, medycyna, transport i usługi miejskie.",
      "Документы, медицина, транспорт и городские сервисы.",
    ],
    short: ["Короткі випуски", "Krótkie audycje", "Короткие выпуски"],
    cultureCode: ["Культурний код", "Kod kulturowy", "Культурный код"],
    cultureText: [
      "Українська культура, події, книжки й традиції.",
      "Ukraińska kultura, wydarzenia, książki i tradycje.",
      "Украинская культура, события, книги и традиции.",
    ],
    weekly: ["Щотижня", "Co tydzień", "Еженедельно"],
    musicEvening: ["Музичний вечір", "Wieczór muzyczny", "Музыкальный вечер"],
    musicEveningText: [
      "Авторські добірки й нові українські релізи.",
      "Autorskie wybory i nowe ukraińskie premiery.",
      "Авторские подборки и новые украинские релизы.",
    ],
    inProgram: ["У програмі ефіру", "W programie", "В программе эфира"],
    suggest: ["Запропонувати тему", "Zaproponuj temat", "Предложить тему"],
    suggestText: [
      "Надішліть ідею, гостя або матеріал редакції.",
      "Wyślij pomysł, propozycję gościa lub materiał.",
      "Отправьте идею, гостя или материал редакции.",
    ],
    cityServices: ["Міські послуги", "Usługi miejskie", "Городские услуги"],
    cityServicesText: [
      "Офіційний портал Urząd Miasta Łodzi.",
      "Oficjalny portal Urzędu Miasta Łodzi.",
      "Официальный портал Urząd Miasta Łodzi.",
    ],
    open: ["Відкрити →", "Otwórz →", "Открыть →"],
    transport: ["Транспорт MPK", "Transport MPK", "Транспорт MPK"],
    transportText: [
      "Маршрути та розклад громадського транспорту.",
      "Trasy i rozkład transportu publicznego.",
      "Маршруты и расписание общественного транспорта.",
    ],
    schedule: ["Розклад →", "Rozkład →", "Расписание →"],
    routeText: [
      "Побудова маршруту містом у реальному часі.",
      "Planowanie trasy po mieście w czasie rzeczywistym.",
      "Построение маршрута по городу в реальном времени.",
    ],
    route: ["Маршрут →", "Trasa →", "Маршрут →"],
    cityCard: [
      "Міська транспортна картка Лодзі.",
      "Łódzka karta transportu miejskiego.",
      "Городская транспортная карта Лодзи.",
    ],
    service: ["Сервіс →", "Serwis →", "Сервис →"],
    medicine: ["Медицина NFZ", "Opieka NFZ", "Медицина NFZ"],
    medicineText: [
      "Інформація для пацієнтів з України.",
      "Informacje dla pacjentów z Ukrainy.",
      "Информация для пациентов из Украины.",
    ],
    help: ["Допомога →", "Pomoc →", "Помощь →"],
    digital: [
      "Цифрові документи та державні послуги.",
      "Dokumenty cyfrowe i usługi publiczne.",
      "Цифровые документы и государственные услуги.",
    ],
    parcels: [
      "Відправлення й отримання посилок.",
      "Nadawanie i odbieranie przesyłek.",
      "Отправка и получение посылок.",
    ],
    parcelLink: ["Посилки →", "Przesyłki →", "Посылки →"],
    jobs: ["Робота в Польщі", "Praca w Polsce", "Работа в Польше"],
    jobsText: [
      "Офіційна інформація та пошук вакансій.",
      "Oficjalne informacje i wyszukiwanie ofert pracy.",
      "Официальная информация и поиск вакансий.",
    ],
    vacancies: ["Вакансії →", "Oferty pracy →", "Вакансии →"],
    documents: ["Документи", "Dokumenty", "Документы"],
    documentsText: [
      "Державна інформація українською мовою.",
      "Informacje państwowe w języku ukraińskim.",
      "Государственная информация на украинском языке.",
    ],
    auto: [
      "Автосервіс і шини",
      "Serwis samochodowy i opony",
      "Автосервис и шины",
    ],
    autoText: [
      "СТО, ремонт і сезонна заміна шин.",
      "Serwis, naprawa i sezonowa wymiana opon.",
      "СТО, ремонт и сезонная замена шин.",
    ],
    find: ["Знайти →", "Znajdź →", "Найти →"],
    dentistry: ["Стоматологія", "Stomatologia", "Стоматология"],
    dentistryText: [
      "Україномовні стоматологи в Лодзі.",
      "Ukraińskojęzyczni stomatolodzy w Łodzi.",
      "Украиноязычные стоматологи в Лодзи.",
    ],
    accounting: ["Бухгалтерія", "Księgowość", "Бухгалтерия"],
    accountingText: [
      "Підтримка підприємців і компаній.",
      "Wsparcie przedsiębiorców i firm.",
      "Поддержка предпринимателей и компаний.",
    ],
    property: ["Нерухомість", "Nieruchomości", "Недвижимость"],
    propertyText: [
      "Оренда, продаж та послуги рієлторів.",
      "Wynajem, sprzedaż i usługi pośredników.",
      "Аренда, продажа и услуги риелторов.",
    ],
    ads: ["Оголошення →", "Ogłoszenia →", "Объявления →"],
    beauty: ["Краса", "Uroda", "Красота"],
    beautyText: [
      "Косметологи, перукарі та майстри.",
      "Kosmetolodzy, fryzjerzy i inni specjaliści.",
      "Косметологи, парикмахеры и мастера.",
    ],
    tech: ["Техніка", "Elektronika", "Техника"],
    techText: [
      "Продаж і ремонт електроніки.",
      "Sprzedaż i naprawa elektroniki.",
      "Продажа и ремонт электроники.",
    ],
    receivedText: [
      "Сайт може отримувати дані, які ви добровільно надсилаєте через анкету або електронну пошту. Технічні дані браузера можуть оброблятися хостингом для безпеки й роботи сайту.",
      "Strona może otrzymywać dane dobrowolnie przesłane przez formularz lub e-mail. Dane techniczne przeglądarki mogą być przetwarzane przez hosting dla bezpieczeństwa i działania strony.",
      "Сайт может получать данные, которые вы добровольно отправляете через анкету или электронную почту. Технические данные браузера могут обрабатываться хостингом для безопасности и работы сайта.",
    ],
    purposeText: [
      "Для відповіді на звернення, активації картки та виконання запитаних вами дій. Дані не продаються третім особам.",
      "W celu odpowiedzi na zgłoszenia, aktywacji karty i wykonania żądanych działań. Dane nie są sprzedawane osobom trzecim.",
      "Для ответа на обращения, активации карты и выполнения запрошенных действий. Данные не продаются третьим лицам.",
    ],
    privacyContact: [
      "Питання щодо персональних даних надсилайте на hello@prywoz.fm.",
      "Pytania dotyczące danych osobowych wysyłaj na hello@prywoz.fm.",
      "Вопросы о персональных данных отправляйте на hello@prywoz.fm.",
    ],
  });
  const t = (key) =>
    C[key]?.[languages.indexOf(language)] || C[key]?.[0] || key;
  const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
  const reverse = new Map();
  Object.entries(C).forEach(([k, v]) =>
    v.forEach((x) => reverse.set(normalizeText(x), k)),
  );
  const titleKeys = {
    listen: "listen",
    news: "news",
    services: "services",
    business: "business",
    programs: "programs",
    about: "aboutMetaTitle",
    contacts: "contacts",
    privacy: "privacy",
  };

  const page = () => document.body.dataset.page || "";
  const shell = document.querySelector("[data-site-header]");
  if (shell)
    shell.innerHTML = `<div class="container site-header__inner portal-header portal-header--currency"><a class="logo" href="./index.html" aria-label="РАДИО ПРИВОЗ ФМ"><img class="logo__main" src="./assets/images/radio-pryvoz-fm-logo.png" alt="РАДИО ПРИВОЗ ФМ" width="1312" height="1199"><span class="logo__tagline" data-i18n="firstRadio"></span></a><div class="portal-local-time"><span class="portal-local-time__icon"><svg class="icon"><use href="${iconPath}#clock"></use></svg></span><div><strong>Лодзь · <time data-local-time>--:--</time></strong><span data-local-date></span></div></div><a class="header-currency" href="./currency.html" aria-label="Курси валют" data-i18n-aria="currency"><strong data-header-currency>—</strong><span data-i18n="currency"></span></a><button class="header-radio" type="button" data-radio-toggle data-state="idle" aria-pressed="false"><span class="header-radio__dot"></span><span class="header-radio__copy"><strong data-radio-status data-i18n="radioOff"></strong><span data-radio-track>РАДИО ПРИВОЗ ФМ</span></span><svg class="icon"><use href="${iconPath}#play"></use></svg></button><button class="theme-toggle" type="button" data-theme-toggle aria-label="Увімкнути тему" aria-pressed="false"><svg class="icon theme-toggle__icon--sun"><use href="${iconPath}#sun"></use></svg><svg class="icon theme-toggle__icon--moon"><use href="${iconPath}#moon"></use></svg></button><div class="language-switcher" role="group" aria-label="Вибір мови"><button class="language-switcher__item" type="button" data-language="uk">UA</button><button class="language-switcher__item" type="button" data-language="pl">PL</button><button class="language-switcher__item" type="button" data-language="ru">RU</button></div><button class="site-header__menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Відкрити меню"><svg class="icon site-header__menu-icon--open"><use href="${iconPath}#menu"></use></svg><svg class="icon site-header__menu-icon--close"><use href="${iconPath}#x"></use></svg></button></div><div class="site-header__panel" id="mobile-menu"><div class="container portal-nav-row"><nav class="main-nav" aria-label="Основна навігація">${["home", "listen", "news", "services"].map((k) => `<a class="main-nav__link ${page() === k ? "main-nav__link--active" : ""}" href="./${k === "home" ? "index" : k}.html" data-i18n="${k}"></a>`).join("")}<div class="main-nav__group"><button class="main-nav__link main-nav__disclosure" type="button" aria-expanded="false" aria-controls="useful-menu" data-i18n="usefulMenu"></button><ul class="main-nav__submenu" id="useful-menu" hidden><li><a class="main-nav__submenu-link" href="./salary-calculator.html" data-i18n="salaryCalculator"></a></li><li><a class="main-nav__submenu-link" href="./pit.html" data-i18n="pitGuide"></a></li><li><a class="main-nav__submenu-link" href="./work-calendar.html" data-i18n="workCalendar"></a></li><li><a class="main-nav__submenu-link" href="./rent-calculator.html" data-i18n="rentCalculator"></a></li></ul></div>${["business", "programs", "about", "contacts", "card"].map((k) => `<a class="main-nav__link ${page() === k ? "main-nav__link--active" : ""}" href="${k === "card" ? "./index.html#card" : `./${k}.html`}" data-i18n="${k}"></a>`).join("")}</nav></div></div>`;
    import("../currency/currency-header.js?v=20261005-currency3").then(({ loadHeaderCurrency }) => loadHeaderCurrency()).catch(() => {});
  if (!document.querySelector(".site-footer"))
    document.body.insertAdjacentHTML(
      "beforeend",
      `<footer class="site-footer" id="contacts"><div class="container site-footer__grid"><div class="site-footer__brand"><div class="site-footer__brand-row"><img class="site-footer__logo" src="./assets/images/radio-pryvoz-fm-logo.png" alt="РАДИО ПРИВОЗ ФМ" width="1254" height="1254"><p class="site-footer__brand-note" data-i18n="firstRadio"></p></div><p class="site-footer__about" data-i18n="footerAbout"></p></div><div class="footer-contacts"><h2 class="footer-contacts__title" data-i18n="contacts"></h2><a class="footer-contacts__link" href="mailto:hello@prywoz.fm"><svg class="icon"><use href="${iconPath}#mail"></use></svg><span>hello@prywoz.fm</span></a><a class="footer-contacts__link" href="tel:+48799123456"><svg class="icon"><use href="${iconPath}#phone"></use></svg><span>+48 799 123 456</span></a><span class="footer-contacts__link"><svg class="icon"><use href="${iconPath}#map-pin"></use></svg><span data-i18n="footerCountry"></span></span><a class="button button--contact" href="mailto:hello@prywoz.fm"><svg class="icon button__mail"><use href="${iconPath}#mail"></use></svg><span data-i18n="writeUs"></span></a></div><aside class="footer-card"><strong class="footer-card__label" data-i18n="footerCardLabel"></strong><span class="footer-card__date" data-i18n="footerCardDate"></span><p class="footer-card__text" data-i18n="footerCardText"></p><svg class="icon footer-card__tower"><use href="${iconPath}#radio-tower"></use></svg></aside></div><div class="container site-footer__bottom"><p data-i18n="copyright"></p><p class="site-footer__made"><span data-i18n="madeFor"></span><svg class="icon"><use href="${iconPath}#heart"></use></svg></p></div></footer>`,
    );

  document.querySelector('.site-footer__bottom')?.insertAdjacentHTML('beforeend', '<p class="site-footer__credits"><span data-i18n="siteVersion"></span> · <span data-i18n="designCredit"></span> <a href="https://bonddesign.top" target="_blank" rel="noopener noreferrer" data-design-credit>bonddesign</a></p>');
  if (!document.querySelector('.site-footer a[href="./business-partnership.html"]')) {
    document.querySelector('.footer-contacts')?.insertAdjacentHTML('beforeend', '<a class="footer-contacts__link" href="./business-partnership.html" data-i18n="businessPartnership"></a>');
  }

  const annotate = () =>
    document
      .querySelectorAll("main *, [data-cookie-consent] *")
      .forEach((n) => {
        if (n.closest("[data-no-auto-i18n]") || n.dataset.i18n || n.children.length) return;
        const k = reverse.get(normalizeText(n.textContent));
        if (k) n.dataset.i18n = k;
      });
  const renderTime = () => {
    const locale = { uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" }[language],
      now = new Date();
    document.querySelector("[data-local-time]")?.replaceChildren(
      new Intl.DateTimeFormat(locale, {
        timeZone: "Europe/Warsaw",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now),
    );
    document.querySelector("[data-local-date]")?.replaceChildren(
      new Intl.DateTimeFormat(locale, {
        timeZone: "Europe/Warsaw",
        weekday: "short",
        day: "numeric",
        month: "long",
      }).format(now),
    );
    document.querySelector("[data-program-date]")?.replaceChildren(
      new Intl.DateTimeFormat(locale, {
        timeZone: "Europe/Warsaw",
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(now),
    );
  };
  const applyLanguage = (lang) => {
    language = languages.includes(lang) ? lang : "uk";
    localStorage.setItem("prywoz-language", language);
    document.documentElement.lang = language;
    document.querySelector('[data-design-credit]')?.setAttribute('aria-label', t('designAria'));
    document.querySelector('.portal-header .language-switcher')?.setAttribute('aria-label', t('languageChoice'));
    document.querySelector('.site-header .main-nav')?.setAttribute('aria-label', t('mainNavigation'));
    document.querySelectorAll("[data-i18n-aria]").forEach((n) => {
      if (C[n.dataset.i18nAria]) n.setAttribute("aria-label", t(n.dataset.i18nAria));
    });
    const menuToggle = document.querySelector('[data-site-header] .site-header__menu-toggle');
    if (menuToggle) menuToggle.setAttribute('aria-label', t(menuToggle.getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'openMenu'));
    annotate();
    document
      .querySelectorAll("[data-i18n]")
      .forEach((n) => {
        if (C[n.dataset.i18n]) n.textContent = t(n.dataset.i18n);
      });
    document
      .querySelectorAll("[data-uk]")
      .forEach((n) => (n.textContent = n.dataset[language] || n.dataset.uk));
    document.querySelectorAll("[data-language]").forEach((b) => {
      const a = b.dataset.language === language;
      b.classList.toggle("language-switcher__item--active", a);
      b.setAttribute("aria-current", String(a));
    });
    const title = titleKeys[page()];
    if (title) {
      document.title = page() === "about" ? t(title) : `${t(title)} — РАДИО ПРИВОЗ ФМ`;
    }
    const cookie = document.querySelector("[data-cookie-consent]");
    if (cookie) {
      cookie.setAttribute("aria-label", t("cookieTitle"));
      cookie.querySelector("strong").textContent = t("cookieTitle");
      cookie.querySelector("p").textContent = t("cookieText");
      cookie.querySelector('[data-consent-choice="declined"]').textContent =
        t("decline");
      cookie.querySelector('[data-consent-choice="accepted"]').textContent =
        t("accept");
    }
    document.dispatchEvent(new CustomEvent("prywoz:languagechange", { detail: { language } }));
    renderTime();
    renderProgram();
    document.dispatchEvent(
      new CustomEvent("prywoz:language-change", { detail: { language } }),
    );
  };

  let program = null,
    expanded = false;
  const decodeText = (value) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value || "";
    return textarea.value;
  };
  const row = (item, state) => {
    const el = document.createElement("article"),
      time = document.createElement("time"),
      song = document.createElement("strong"),
      badge = document.createElement("span");
    el.className = `track-program__item track-program__item--${state}`;
    time.className = "track-program__time";
    song.className = "track-program__track";
    badge.className = "track-program__state";
    time.textContent =
      state === "next"
        ? "≈"
        : state === "current"
          ? "●"
          : (item.time || "").slice(0, 5);
    song.textContent = decodeText(item.song) || "РАДИО ПРИВОЗ ФМ";
    badge.textContent = t(
      state === "current" ? "now" : state === "next" ? "next" : "played",
    );
    el.append(time, song, badge);
    return el;
  };
  function renderProgram() {
    const root = document.querySelector("[data-program-list]"),
      more = document.querySelector("[data-program-more]");
    if (!root) return;
    root.replaceChildren();
    if (!program) {
      const p = document.createElement("p");
      p.className = "track-program__message";
      p.textContent = t("loadingProgram");
      root.append(p);
      return;
    }
    if (program.error) {
      const p = document.createElement("p");
      p.className = "track-program__message";
      p.textContent = t("unavailableProgram");
      root.append(p);
      if (more) more.hidden = true;
      return;
    }
    const current =
      program.song && program.song !== "-"
        ? program.song
        : [program.artist, program.songtitle].filter(Boolean).join(" — ");
    const history = (program.songs || []).filter(
      (x) => x?.song && x.song !== "-" && x.song !== current,
    );
    (expanded ? history : history.slice(-6)).forEach((x) =>
      root.append(row(x, "played")),
    );
    if (current)
      root.append(row({ time: program.time, song: current }, "current"));
    const next = (program.nextsongs || []).find(
      (x) => x?.song && x.song !== "-",
    );
    if (next) root.append(row(next, "next"));
    if (more) {
      more.hidden = history.length <= 6;
      more.textContent = t(expanded ? "showLess" : "showMore");
    }
  }
  const updateProgram = async () => {
    if (!document.querySelector("[data-track-program]")) return;
    try {
      const r = await fetch(STATUS_URL, { cache: "no-store" });
      if (!r.ok) throw 0;
      program = await r.json();
    } catch {
      program = { error: true };
    }
    renderProgram();
  };

  const setMenuOpen = (header, isOpen) => {
    const menu = header?.querySelector(".site-header__menu-toggle");
    if (!header || !menu) return;
    header.classList.toggle("site-header--menu-open", isOpen);
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", t(isOpen ? "closeMenu" : "openMenu"));
  };
  const setUsefulOpen = (button, isOpen, returnFocus = false) => {
    const submenu = document.getElementById(button?.getAttribute("aria-controls"));
    if (!button || !submenu) return;
    button.setAttribute("aria-expanded", String(isOpen));
    submenu.hidden = !isOpen;
    if (returnFocus) button.focus();
  };

  document.addEventListener("click", (e) => {
    const lang = e.target.closest("[data-language]");
    if (lang) applyLanguage(lang.dataset.language);
    const disclosure = e.target.closest(".main-nav__disclosure");
    if (disclosure && disclosure.closest("[data-site-header]")) {
      setUsefulOpen(disclosure, disclosure.getAttribute("aria-expanded") !== "true");
    }
    if (e.target.closest("[data-program-more]")) {
      expanded = !expanded;
      renderProgram();
    }
    const menu = e.target.closest(".site-header__menu-toggle");
    if (menu && menu.closest("[data-site-header]")) {
      const h = menu.closest("[data-site-header]");
      setMenuOpen(h, menu.getAttribute("aria-expanded") !== "true");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const openUseful = document.querySelector('.main-nav__disclosure[aria-expanded="true"]');
    if (openUseful) {
      setUsefulOpen(openUseful, false, true);
      return;
    }
    const generatedHeader = document.querySelector('[data-site-header].site-header--menu-open');
    if (generatedHeader) {
      setMenuOpen(generatedHeader, false);
      generatedHeader.querySelector(".site-header__menu-toggle")?.focus();
    }
  });
  const init = () => {
    annotate();
    applyLanguage(language);
    updateProgram();
  };
  document.addEventListener("prywoz:navigation", init);
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
  setInterval(renderTime, 30000);
  setInterval(updateProgram, 15000);
})();
