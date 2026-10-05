const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll("a.main-nav__link, .main-nav__submenu-link, .button--header");
const languageButtons = document.querySelectorAll("[data-language]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const player = document.querySelector(".live-player");
const audio = document.querySelector("[data-persistent-radio]");
const playButton = document.querySelector(".live-player__play");
const playButtonIcon = document.querySelector(".live-player__play-icon use");
const volumeButton = document.querySelector(".live-player__volume");
const volumeButtonIcon = document.querySelector(".live-player__volume use");
const volumePanel = document.querySelector(".live-player__volume-panel");
const volumeRange = document.querySelector(".live-player__volume-range");
const volumeValue = document.querySelector(".live-player__volume-value");
const stationTitle = document.querySelector(".live-player__track");
const stationMeta = document.querySelector(".live-player__host");
const stationBadge = document.querySelector(".live-player__badge");
const mediaHolder = document.querySelector(".live-player__record");
const mediaImage = document.querySelector(".live-player__record-image");
const citySelect = document.querySelector("[data-city-select]");
const weatherTitle = document.querySelector("[data-weather-title]");
const weatherMeta = document.querySelector("[data-weather-meta]");
const currencyTitle = document.querySelector("[data-currency-title]");
const airTitle = document.querySelector("[data-air-title]");
const airMeta = document.querySelector("[data-air-meta]");
const miniPlayerButton = document.querySelector("[data-mini-player]");
const miniPlayerIcon = miniPlayerButton?.querySelector("use");
const localTime = document.querySelector("[data-local-time]");
const localTimeCity = document.querySelector("[data-local-time-city]");
const localDate = document.querySelector("[data-local-date]");
const themeToggle = document.querySelector("[data-theme-toggle]");

const iconPath = "./assets/icons/lucide-sprite.svg";

const themeLabels = {
  uk: { dark: "Увімкнути темну тему", light: "Увімкнути світлу тему" },
  pl: { dark: "Włącz ciemny motyw", light: "Włącz jasny motyw" },
  ru: { dark: "Включить тёмную тему", light: "Включить светлую тему" },
};

const updateThemeToggle = () => {
  if (!themeToggle) return;
  const isDark = document.documentElement.dataset.theme === "dark";
  const label = themeLabels[activeLanguage]?.[isDark ? "light" : "dark"] || themeLabels.uk.dark;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
};

const setTheme = (theme, persist = true) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  if (persist) storageSet("prywoz-theme", nextTheme);
  updateThemeToggle();
};

const translations = {
  uk: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    brandTagline: "Перше українське\nрадіо в Польщі",
    navHome: "Головна",
    navListen: "Ефір",
    navNews: "Новини",
    navServicesLodz: "Послуги в Лодзі",
    navBusiness: "Бізнес",
    navPrograms: "Програми",
    navUseful: "Корисне",
    navSalaryCalculator: "Калькулятор зарплати",
    navWorkCalendar: "Робочий календар",
    navRentCalculator: "Калькулятор оренди",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    navAbout: "Про нас",
    navCard: "Картка",
    navContacts: "Контакти",
    eyebrow: "Музика. Гумор. Культура. Люди.",
    heroTitle: "Перше українське радіо в Польщі",
    heroLead: "РАДИО ПРИВОЗ ФМ — україномовний медіапроєкт для людей у Польщі та по всьому світу: живе радіо, корисні новини, культура і простий контакт з редакцією.",
    listenLive: "Слухати live",
    nowOnAir: "Зараз в ефірі",
    latestNews: "Останні новини",
    aboutProject: "Про проєкт",
    aboutText: "РАДИО ПРИВОЗ ФМ — україномовний медіапроєкт для людей у Польщі та по всьому світу. Ми поєднуємо музику, корисні новини, культуру і живе слово.",
    featureLiveTitle: "Живий ефір 24/7",
    featureLiveText: "Улюблена музика, авторські програми та цікаві гості щодня.",
    featureCultureTitle: "Своє. Українське",
    featureCultureText: "Підтримуємо українську культуру, мову та традиції у Польщі та світі.",
    featureCommunityTitle: "Для громади",
    featureCommunityText: "Висвітлюємо ініціативи та важливі новини для українців.",
    featureEverywhereTitle: "Де б ви не були",
    featureEverywhereText: "Слухайте нас на сайті та в соцмережах — ми поруч!",
    contactText: "Є новина або пропозиція для ефіру? Напишіть нам, а ми повернемось із відповіддю.",
    footerBrand: "Перше українське\nрадіо в Польщі",
    footerAbout: "Музика, гумор, культура та люди, що об'єднують.",
    footerCountry: "Польща",
    writeUs: "Написати нам",
    footerCardLabel: "Радіо 24/7",
    footerCardDate: "Слухайте наживо",
    footerCardText: "Денний ефір 10:00–20:00 · нічний 20:00–10:00",
    copyright: "© 2026 РАДИО ПРИВОЗ ФМ. Усі права захищено.",
    madeFor: "Створено з любов'ю для наших слухачів",
    localStationMeta: "Живий ефір онлайн",
    dayBroadcastMeta: "Денний ефір · 10:00–20:00",
    nightBroadcastMeta: "Нічний ефір · 20:00–10:00",
    volumeSettings: "Налаштувати гучність",
    volumeLevel: "Гучність",
    stationOffline: "Не в ефірі",
    stationError: "Не вдалося підключитися до цієї станції. Спробуйте іншу.",
    ownBroadcastMeta: "Авторський ефір",
    relayBroadcastMeta: "Нічна ретрансляція",
    cardEyebrow: "Картка клієнта",
    cardTitle: "Зареєструйте картку Привоз",
    cardLead: "Заповніть анкету для активації картки та зворотного зв'язку.",
    cardAddressLabel: "Знижки діють за адресою:",
    cardAddress: "93-120 Łódź, ul. Przybyszewskiego 176/178.",
    cardActivation: "Картка активується протягом 48 годин після перевірки анкети.",
    cardValidity: "Термін дії картки — 1 рік із моменту реєстрації.",
    rulesButton: "Правила",
    registerCardButton: "Зареєструвати картку",
    questionnaireEyebrow: "Активація картки",
    questionnaireTitle: "Анкета",
    questionnaireSubtitle: "Заповніть дані для активації картки та зворотного зв'язку.",
    rulesTitle: "Правила картки",
    saveRules: "Зберегти правила",
    adDemoLabel: "Рекламне місце",
    adForBusiness: "Для бізнесу",
    adPopularLabel: "Станьте помітнішими",
    adPartnerLabel: "Партнер програми",
    adNewsTitle: "Ваш бренд у новинній стрічці",
    adNewsText: "Помітне розміщення поруч з актуальними матеріалами.",
    adServicesTitle: "Додайте свій сервіс",
    adServicesText: "Компанія, контакти й пряме посилання у каталозі для українців.",
    adBusinessTitle: "Покажіть свій бізнес українській громаді",
    adBusinessText: "Картка компанії, контакти, посилання та пріоритет у каталозі.",
    adProgramTitle: "Підтримайте ефір і розкажіть про себе",
    adProgramText: "Ваш бренд у тематичному розділі та партнерських матеріалах PRYWOZ.",
    adPriceFrom10: "від 10 € / рік",
    adPriceFrom15: "від 15 € / рік",
    adPrice15: "15 € / рік",
    adBook: "Забронювати",
    adRegister: "Зареєструватися",
    adAddCompany: "Додати компанію",
    adBecomePartner: "Стати партнером",
  },
  pl: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    brandTagline: "Pierwsze ukraińskie\nradio w Polsce",
    navHome: "Start",
    navListen: "Radio",
    navNews: "Wiadomości",
    navServicesLodz: "Usługi w Łodzi",
    navBusiness: "Biznes",
    navPrograms: "Programy",
    navUseful: "Przydatne",
    navSalaryCalculator: "Kalkulator wynagrodzenia",
    navWorkCalendar: "Kalendarz pracy",
    navRentCalculator: "Kalkulator kosztów najmu",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    navAbout: "O nas",
    navCard: "Karta",
    navContacts: "Kontakt",
    eyebrow: "Muzyka. Humor. Kultura. Ludzie.",
    heroTitle: "Ukraińskie radio w Polsce",
    heroLead: "РАДИО ПРИВОЗ ФМ to ukraińskojęzyczny projekt medialny dla osób w Polsce i na świecie: radio na żywo, przydatne wiadomości, kultura i prosty kontakt z redakcją.",
    listenLive: "Słuchaj live",
    nowOnAir: "Teraz gramy",
    latestNews: "Najnowsze wiadomości",
    aboutProject: "O projekcie",
    aboutText: "РАДИО ПРИВОЗ ФМ to ukraińskojęzyczny projekt medialny dla osób w Polsce i na świecie. Łączymy muzykę, przydatne wiadomości, kulturę i żywe słowo.",
    featureLiveTitle: "Radio na żywo 24/7",
    featureLiveText: "Ulubiona muzyka, autorskie audycje i ciekawi goście każdego dnia.",
    featureCultureTitle: "Swoje. Ukraińskie",
    featureCultureText: "Wspieramy ukraińską kulturę, język i tradycje w Polsce i na świecie.",
    featureCommunityTitle: "Dla społeczności",
    featureCommunityText: "Pokazujemy inicjatywy i ważne wiadomości dla Ukraińców.",
    featureEverywhereTitle: "Gdziekolwiek jesteś",
    featureEverywhereText: "Słuchaj nas na stronie i w mediach społecznościowych — jesteśmy blisko!",
    contactText: "Masz wiadomość albo pomysł do audycji? Napisz do nas, a wrócimy z odpowiedzią.",
    footerBrand: "Pierwsze ukraińskie\nradio w Polsce",
    footerAbout: "Muzyka, humor, kultura i ludzie, którzy łączą.",
    footerCountry: "Polska",
    writeUs: "Napisz do nas",
    footerCardLabel: "Radio 24/7",
    footerCardDate: "Słuchaj na żywo",
    footerCardText: "Program dzienny 10:00–20:00 · nocny 20:00–10:00",
    copyright: "© 2026 RADIO PRYWOZ FM. Wszelkie prawa zastrzeżone.",
    madeFor: "Stworzone z miłością dla naszych słuchaczy",
    localStationMeta: "Radio online na żywo",
    dayBroadcastMeta: "Program dzienny · 10:00–20:00",
    nightBroadcastMeta: "Program nocny · 20:00–10:00",
    volumeSettings: "Ustaw głośność",
    volumeLevel: "Głośność",
    stationOffline: "Offline",
    stationError: "Nie udało się połączyć z tą stacją. Spróbuj innej.",
    ownBroadcastMeta: "Program autorski",
    relayBroadcastMeta: "Nocna retransmisja",
    cardEyebrow: "Karta klienta",
    cardTitle: "Zarejestruj kartę Prywoz",
    cardLead: "Wypełnij formularz, aby aktywować kartę i umożliwić kontakt zwrotny.",
    cardAddressLabel: "Rabaty obowiązują pod adresem:",
    cardAddress: "93-120 Łódź, ul. Przybyszewskiego 176/178.",
    cardActivation: "Karta zostanie aktywowana w ciągu 48 godzin po weryfikacji formularza.",
    cardValidity: "Karta jest ważna przez rok od rejestracji.",
    rulesButton: "Regulamin",
    registerCardButton: "Zarejestruj kartę",
    questionnaireEyebrow: "Aktywacja karty",
    questionnaireTitle: "Formularz",
    questionnaireSubtitle: "Wypełnij dane potrzebne do aktywacji karty i kontaktu zwrotnego.",
    rulesTitle: "Regulamin karty",
    saveRules: "Zapisz regulamin",
    adDemoLabel: "Miejsce reklamowe",
    adForBusiness: "Dla firm",
    adPopularLabel: "Bądź bardziej widoczny",
    adPartnerLabel: "Partner programu",
    adNewsTitle: "Twoja marka w serwisie informacyjnym",
    adNewsText: "Widoczne miejsce obok aktualnych materiałów.",
    adServicesTitle: "Dodaj swoją usługę",
    adServicesText: "Firma, dane kontaktowe i bezpośredni link w katalogu dla Ukraińców.",
    adBusinessTitle: "Pokaż swoją firmę ukraińskiej społeczności",
    adBusinessText: "Wizytówka, kontakty, link i wyższa pozycja w katalogu.",
    adProgramTitle: "Wesprzyj audycję i opowiedz o sobie",
    adProgramText: "Twoja marka w sekcji tematycznej i materiałach partnerskich PRYWOZ.",
    adPriceFrom10: "od 10 € / rok",
    adPriceFrom15: "od 15 € / rok",
    adPrice15: "15 € / rok",
    adBook: "Zarezerwuj",
    adRegister: "Zarejestruj się",
    adAddCompany: "Dodaj firmę",
    adBecomePartner: "Zostań partnerem",
  },
  ru: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    brandTagline: "Первое украинское\nрадио в Польше",
    navHome: "Главная",
    navListen: "Эфир",
    navNews: "Новости",
    navServicesLodz: "Услуги в Лодзи",
    navBusiness: "Бизнес",
    navPrograms: "Программы",
    navUseful: "Полезное",
    navSalaryCalculator: "Калькулятор зарплаты",
    navWorkCalendar: "Рабочий календарь",
    navRentCalculator: "Калькулятор аренды",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    navAbout: "О нас",
    navCard: "Карта",
    navContacts: "Контакты",
    eyebrow: "Музыка. Юмор. Культура. Люди.",
    heroTitle: "Украинское радио в Польше",
    heroLead: "РАДИО ПРИВОЗ ФМ — украиноязычный медиапроект для людей в Польше и по всему миру: живое радио, полезные новости, культура и простой контакт с редакцией.",
    listenLive: "Слушать live",
    nowOnAir: "Сейчас в эфире",
    latestNews: "Последние новости",
    aboutProject: "О проекте",
    aboutText: "РАДИО ПРИВОЗ ФМ — украиноязычный медиапроект для людей в Польше и по всему миру. Мы соединяем музыку, полезные новости, культуру и живое слово.",
    featureLiveTitle: "Живой эфир 24/7",
    featureLiveText: "Любимая музыка, авторские программы и интересные гости каждый день.",
    featureCultureTitle: "Своё. Украинское",
    featureCultureText: "Поддерживаем украинскую культуру, язык и традиции в Польше и мире.",
    featureCommunityTitle: "Для сообщества",
    featureCommunityText: "Показываем инициативы и важные новости для украинцев.",
    featureEverywhereTitle: "Где бы вы ни были",
    featureEverywhereText: "Слушайте нас на сайте и в соцсетях — мы рядом!",
    contactText: "Есть новость или предложение для эфира? Напишите нам, и мы ответим.",
    footerBrand: "Первое украинское\nрадио в Польше",
    footerAbout: "Музыка, юмор, культура и люди, которые объединяют.",
    footerCountry: "Польша",
    writeUs: "Написать нам",
    footerCardLabel: "Радио 24/7",
    footerCardDate: "Слушайте в прямом эфире",
    footerCardText: "Дневной эфир 10:00–20:00 · ночной 20:00–10:00",
    copyright: "© 2026 РАДИО ПРИВОЗ ФМ. Все права защищены.",
    madeFor: "Создано с любовью для наших слушателей",
    localStationMeta: "Живой эфир онлайн",
    dayBroadcastMeta: "Дневной эфир · 10:00–20:00",
    nightBroadcastMeta: "Ночной эфир · 20:00–10:00",
    volumeSettings: "Настроить громкость",
    volumeLevel: "Громкость",
    stationOffline: "Не в эфире",
    stationError: "Не удалось подключиться к этой станции. Попробуйте другую.",
    ownBroadcastMeta: "Авторский эфир",
    relayBroadcastMeta: "Ночная ретрансляция",
    cardEyebrow: "Карта клиента",
    cardTitle: "Зарегистрируйте карту Привоз",
    cardLead: "Заполните анкету для активации карты и обратной связи.",
    cardAddressLabel: "Скидки действуют по адресу:",
    cardAddress: "93-120 Łódź, ul. Przybyszewskiego 176/178.",
    cardActivation: "Карта активируется в течение 48 часов после проверки анкеты.",
    cardValidity: "Срок действия карты — один год с момента регистрации.",
    rulesButton: "Правила",
    registerCardButton: "Зарегистрировать карту",
    questionnaireEyebrow: "Активация карты",
    questionnaireTitle: "Анкета",
    questionnaireSubtitle: "Заполните данные для активации карты и обратной связи.",
    rulesTitle: "Правила карты",
    saveRules: "Сохранить правила",
    adDemoLabel: "Рекламное место",
    adForBusiness: "Для бизнеса",
    adPopularLabel: "Станьте заметнее",
    adPartnerLabel: "Партнер программы",
    adNewsTitle: "Ваш бренд в новостной ленте",
    adNewsText: "Заметное размещение рядом с актуальными материалами.",
    adServicesTitle: "Добавьте свой сервис",
    adServicesText: "Компания, контакты и прямая ссылка в каталоге для украинцев.",
    adBusinessTitle: "Покажите свой бизнес украинскому сообществу",
    adBusinessText: "Карточка компании, контакты, ссылка и приоритет в каталоге.",
    adProgramTitle: "Поддержите эфир и расскажите о себе",
    adProgramText: "Ваш бренд в тематическом разделе и партнерских материалах PRYWOZ.",
    adPriceFrom10: "от 10 € / год",
    adPriceFrom15: "от 15 € / год",
    adPrice15: "15 € / год",
    adBook: "Забронировать",
    adRegister: "Зарегистрироваться",
    adAddCompany: "Добавить компанию",
    adBecomePartner: "Стать партнером",
  },
};

const localStation = {
  stationuuid: "radio-prywoz",
  name: "РАДИО ПРИВОЗ ФМ",
  url_resolved: "https://listen1.myradio24.com/73556",
  favicon: "./assets/images/logo.png",
  codec: "MP3",
  bitrate: 128,
  homepage: "https://pavlo-bondarchuk.github.io/radio-prywoz-home/",
  tags: "ukrainian, community, poland",
  isLocal: true,
};

const defaultBroadcastSchedule = {
  timezone: "Europe/Warsaw",
  slots: [
    {
      id: "radio-prywoz-day",
      start: "10:00",
      end: "20:00",
      mode: "stream",
      title: "РАДИО ПРИВОЗ ФМ",
      labelKey: "dayBroadcastMeta",
      playlistMarker: "DAY",
      streamUrl: "https://listen1.myradio24.com/73556",
    },
    {
      id: "radio-prywoz-night",
      start: "20:00",
      end: "10:00",
      mode: "stream",
      title: "РАДИО ПРИВОЗ ФМ",
      labelKey: "nightBroadcastMeta",
      playlistMarker: "NIGHT",
      streamUrl: "https://listen1.myradio24.com/73556",
    },
  ],
};

const memoryStorage = new Map();
const cookieGet = (key) => {
  const prefix = `${encodeURIComponent(key)}=`;
  const item = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : null;
};
const cookieSet = (key, value) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
};
const storageGet = (key) => {
  try {
    return window.localStorage?.getItem(key) || cookieGet(key) || memoryStorage.get(key) || null;
  } catch {
    return cookieGet(key) || memoryStorage.get(key) || null;
  }
};
const storageSet = (key, value) => {
  memoryStorage.set(key, value);
  if (key === "prywoz-language") {
    cookieSet(key, value);
  }
  try {
    window.localStorage?.setItem(key, value);
  } catch {
    // Some embedded browsers can disable persistent storage; in-memory state keeps UI stable.
  }
};
const storageJson = (key) => {
  try {
    return JSON.parse(storageGet(key) || "null");
  } catch {
    return null;
  }
};

let activeLanguage = storageGet("prywoz-language") || "uk";
let userStartedPlayback = false;
let broadcastSchedule = defaultBroadcastSchedule;
let activeBroadcast = null;
let nowPlayingStatus = null;
let activePlaylistIndex = 0;
let currentBroadcastSignature = "";
const cityData = {
  lodz: { name: "Лодзь", latitude: 51.7592, longitude: 19.456 },
  warsaw: { name: "Варшава", latitude: 52.2297, longitude: 21.0122 },
  wroclaw: { name: "Вроцлав", latitude: 51.1079, longitude: 17.0385 },
  krakow: { name: "Краків", latitude: 50.0647, longitude: 19.945 },
  gdansk: { name: "Гданськ", latitude: 54.352, longitude: 18.6466 },
};

const t = (key, replacements = {}) => {
  const value = translations[activeLanguage]?.[key] || translations.uk[key] || "";
  return Object.entries(replacements).reduce(
    (result, [name, replacement]) => result.replaceAll(`{${name}}`, replacement),
    value,
  );
};

const parseClockMinutes = (value = "00:00") => {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours * 60) + minutes;
};

const getTimezoneMinutes = (timezone) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hours = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minutes = Number(parts.find((part) => part.type === "minute")?.value || 0);
  return (hours * 60) + minutes;
};

const isMinuteInSlot = (minute, slot) => {
  const start = parseClockMinutes(slot.start);
  const end = parseClockMinutes(slot.end);
  return start < end
    ? minute >= start && minute < end
    : minute >= start || minute < end;
};

const getActiveBroadcastSlot = () => {
  const timezone = broadcastSchedule.timezone || "Europe/Warsaw";
  const minute = getTimezoneMinutes(timezone);
  return broadcastSchedule.slots?.find((slot) => isMinuteInSlot(minute, slot)) || defaultBroadcastSchedule.slots[0];
};

const getBroadcastItem = (slot = getActiveBroadcastSlot()) => {
  if (slot.mode === "stream" || slot.mode === "relay") {
    return {
      id: slot.id,
      title: slot.title || localStation.name,
      artist: t(slot.labelKey || (slot.mode === "relay" ? "relayBroadcastMeta" : "localStationMeta")),
      src: slot.streamUrl,
      mode: slot.mode,
    };
  }

  const playlist = slot.playlist?.length ? slot.playlist : defaultBroadcastSchedule.slots[0].playlist;
  activePlaylistIndex = (activePlaylistIndex + playlist.length) % playlist.length;
  const item = playlist[activePlaylistIndex];
  return {
    ...item,
    title: item.title || localStation.name,
    artist: item.artist || t("ownBroadcastMeta"),
    mode: "playlist",
  };
};

const setMenuState = (isOpen) => {
  if (!header || !menuToggle) {
    return;
  }

  header.classList.toggle("site-header--menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", translations[activeLanguage]?.[isOpen ? "closeMenu" : "openMenu"] || "Відкрити меню");
};

const setUsefulMenuState = (button, isOpen, returnFocus = false) => {
  if (!button) return;
  const submenu = document.getElementById(button.getAttribute("aria-controls"));
  if (!submenu) return;
  button.setAttribute("aria-expanded", String(isOpen));
  submenu.hidden = !isOpen;
  if (returnFocus) button.focus();
};

const setPlayerState = (state) => {
  if (!player) {
    return;
  }

  player.dataset.state = state;
  player.classList.toggle("live-player--playing", state === "playing");
  player.classList.toggle("live-player--loading", state === "loading");
  player.classList.toggle("live-player--error", state === "error");
};

const renderStationMeta = () => {
  if (!stationTitle || !stationMeta) {
    return;
  }

  const slot = getActiveBroadcastSlot();
  const liveSong = nowPlayingStatus?.song || [nowPlayingStatus?.artist, nowPlayingStatus?.songtitle].filter(Boolean).join(" — ");

  stationTitle.textContent = liveSong && liveSong !== "-"
    ? liveSong
    : (activeBroadcast?.title || localStation.name);
  stationMeta.textContent = t(slot?.labelKey || "localStationMeta");

  const isOnline = nowPlayingStatus?.online !== 0;
  player?.classList.toggle("live-player--offline", !isOnline);
};

const loadNowPlaying = async () => {
  try {
    const response = await fetch("https://myradio24.com/users/73556/status.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Now playing unavailable");
    }
    nowPlayingStatus = await response.json();
    renderStationMeta();
  } catch {
    // The scheduled label and station name remain available if metadata is temporarily unavailable.
  }
};

const loadBroadcastSchedule = async () => {
  try {
    const response = await fetch("./assets/data/broadcast-schedule.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Broadcast schedule unavailable");
    }
    const schedule = await response.json();
    if (schedule?.slots?.length) {
      broadcastSchedule = schedule;
    }
  } catch {
    broadcastSchedule = defaultBroadcastSchedule;
  }
};

const syncScheduledBroadcast = async (shouldPlay = false, force = false) => {
  if (!audio) {
    return;
  }

  const slot = getActiveBroadcastSlot();
  const nextBroadcast = getBroadcastItem(slot);
  const signature = nextBroadcast.mode === "playlist"
    ? `${slot.id}:${nextBroadcast.id || nextBroadcast.src}`
    : `${nextBroadcast.mode}:${nextBroadcast.src}`;
  const sourceChanged = force || signature !== currentBroadcastSignature;

  activeBroadcast = nextBroadcast;
  currentBroadcastSignature = signature;
  renderStationMeta();
  renderMediaType(nextBroadcast.mode === "playlist" ? activePlaylistIndex : 0);

  if (!sourceChanged) {
    return;
  }

  audio.pause();
  audio.src = nextBroadcast.src || localStation.url_resolved;
  audio.load();

  if (shouldPlay) {
    setPlayerState("loading");
    try {
      await audio.play();
    } catch {
      setPlayerState("error");
      if (stationMeta) {
        stationMeta.textContent = t("stationError");
      }
    }
  }
};

const renderMediaType = (stationIndex) => {
  if (!mediaHolder || !mediaImage) {
    return;
  }

  const type = stationIndex % 2 === 0 ? "vinyl" : "cd";
  mediaImage.src = `./assets/images/home/player-${type}.png`;
  mediaHolder.classList.remove("live-player__record--vinyl", "live-player__record--cd");
  mediaHolder.classList.add(`live-player__record--${type}`);
};

const updateVolumeState = () => {
  if (!audio || !volumeButton || !volumeRange) {
    return;
  }

  const level = audio.muted ? 0 : Math.round(audio.volume * 100);
  volumeRange.value = String(level);
  volumeRange.setAttribute("aria-label", t("volumeLevel"));
  volumeButton.setAttribute("aria-label", t("volumeSettings"));
  volumeButtonIcon?.setAttribute("href", `${iconPath}#${level === 0 ? "volume-x" : "volume-2"}`);
  if (volumeValue) {
    volumeValue.value = `${level}%`;
    volumeValue.textContent = `${level}%`;
  }
};

const renderLocalTime = () => {
  const locale = activeLanguage === "pl" ? "pl-PL" : activeLanguage === "ru" ? "ru-RU" : "uk-UA";
  const now = new Date();
  if (localTime) {
    localTime.dateTime = now.toISOString();
    localTime.textContent = new Intl.DateTimeFormat(locale, {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(now);
  }
  if (localTimeCity) {
    localTimeCity.textContent = activeLanguage === "pl" ? "Łódź" : activeLanguage === "ru" ? "Лодзь" : "Лодзь";
  }
  if (localDate) {
    localDate.textContent = new Intl.DateTimeFormat(locale, {
      timeZone: "Europe/Warsaw",
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(now);
  }
};

const getWeatherLabel = (code) => {
  if (code === 0) return "Ясно";
  if (code <= 3) return "Мінлива хмарність";
  if (code <= 48) return "Туман";
  if (code <= 67) return "Дощ";
  if (code <= 77) return "Сніг";
  if (code <= 82) return "Зливи";
  return "Гроза";
};

const getAirLabel = (index) => {
  if (!Number.isFinite(index)) return "Дані тимчасово недоступні";
  if (index <= 20) return "Якість дуже добра";
  if (index <= 40) return "Якість добра";
  if (index <= 60) return "Якість помірна";
  if (index <= 80) return "Якість погана";
  return "Якість дуже погана";
};

const loadPortalWidgets = async (cityKey = "lodz") => {
  const city = cityData[cityKey] || cityData.lodz;
  storageSet("prywoz-city", cityKey);

  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,weather_code",
    timezone: "Europe/Warsaw",
  });

  const airUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  airUrl.search = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "european_aqi,pm2_5",
    timezone: "Europe/Warsaw",
  });

  const [weatherResult, airResult] = await Promise.allSettled([
    fetch(weatherUrl, { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()),
    fetch(airUrl, { cache: "no-store" }).then((response) => response.ok ? response.json() : Promise.reject()),
  ]);

  if (weatherResult.status === "fulfilled") {
    const temperature = Math.round(weatherResult.value.current?.temperature_2m);
    if (weatherTitle && Number.isFinite(temperature)) {
      weatherTitle.textContent = `${city.name} · ${temperature > 0 ? "+" : ""}${temperature}°`;
    }
    if (weatherMeta) {
      weatherMeta.textContent = getWeatherLabel(weatherResult.value.current?.weather_code);
    }
  }

  if (airResult.status === "fulfilled") {
    const airIndex = Number(airResult.value.current?.european_aqi);
    const particulate = Number(airResult.value.current?.pm2_5);
    if (airTitle) {
      airTitle.textContent = getAirLabel(airIndex);
    }
    if (airMeta && Number.isFinite(particulate)) {
      airMeta.textContent = `PM2.5 · ${Math.round(particulate)} µg/m³`;
    }
  }
};

const loadCurrencyWidget = async () => {
  try {
    const { loadHeaderCurrency } = await import("../currency/currency-header.js?v=20261005-currency3");
    await loadHeaderCurrency();
  } catch {
    if (currencyTitle) currencyTitle.textContent = "Курси валют";
  }
};

const applyLanguage = (language) => {
  activeLanguage = translations[language] ? language : "uk";
  storageSet("prywoz-language", activeLanguage);
  document.documentElement.lang = activeLanguage;

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[activeLanguage][key]) {
      node.textContent = translations[activeLanguage][key];
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === activeLanguage;
    button.classList.toggle("language-switcher__item--active", isActive);
    button.setAttribute("aria-current", String(isActive));
  });
  if (menuToggle) {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", translations[activeLanguage]?.[isOpen ? "closeMenu" : "openMenu"] || "Відкрити меню");
  }

  renderStationMeta();
  updateVolumeState();
  renderLocalTime();
  updateThemeToggle();
  document.dispatchEvent(new CustomEvent("prywoz:languagechange", { detail: { language: activeLanguage } }));
};

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    setMenuState(!header.classList.contains("site-header--menu-open"));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openUseful = document.querySelector('.main-nav__disclosure[aria-expanded="true"]');
      if (openUseful) {
        setUsefulMenuState(openUseful, false, true);
        return;
      }
      if (header?.classList.contains("site-header--menu-open")) {
        setMenuState(false);
        menuToggle?.focus();
      }
    }
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".main-nav__disclosure");
  if (button) setUsefulMenuState(button, button.getAttribute("aria-expanded") !== "true");
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
  });
});

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener?.("change", (event) => {
  if (!storageGet("prywoz-theme")) setTheme(event.matches ? "dark" : "light", false);
});

citySelect?.addEventListener("change", () => {
  loadPortalWidgets(citySelect.value);
});

applyLanguage(activeLanguage);
window.setInterval(renderLocalTime, 30 * 1000);
const savedCity = citySelect ? (storageGet("prywoz-city") || "lodz") : "lodz";
if (citySelect && cityData[savedCity]) {
  citySelect.value = savedCity;
}
loadPortalWidgets(savedCity);
loadCurrencyWidget();
