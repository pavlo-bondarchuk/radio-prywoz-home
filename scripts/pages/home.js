const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const languageButtons = document.querySelectorAll("[data-language]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const player = document.querySelector(".live-player");
const audio = document.querySelector(".live-player__audio");
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
const newsList = document.querySelector("[data-news-list]");
const newsFilter = document.querySelector("[data-news-filter]");
const newsFilterButtons = document.querySelectorAll("[data-news-category]");

const iconPath = "./assets/icons/lucide-sprite.svg";

const translations = {
  uk: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Головна",
    navListen: "Ефір",
    navNews: "Новини",
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
    footerCardLabel: "Щоденний ефір",
    footerCardDate: "3 вересня!",
    footerCardText: "Будемо разом щодня на хвилях РАДИО ПРИВОЗ ФМ",
    copyright: "© 2026 РАДИО ПРИВОЗ ФМ. Усі права захищено.",
    madeFor: "Створено з любов'ю для наших слухачів",
    localStationMeta: "Живий ефір онлайн",
    dayBroadcastMeta: "Денний ефір · 10:00–20:00",
    nightBroadcastMeta: "Нічний ефір · 20:00–10:00",
    volumeSettings: "Налаштувати гучність",
    volumeLevel: "Гучність",
    stationOffline: "Не в ефірі",
    stationError: "Не вдалося підключитися до цієї станції. Спробуйте іншу.",
    newsSourceLabel: "Джерело",
    readOriginal: "Читати оригінал",
    newsFallbackText: "Короткий опис недоступний. Перейдіть до оригіналу на сайті джерела.",
    ownBroadcastMeta: "Авторський ефір",
    relayBroadcastMeta: "Нічна ретрансляція",
    newsCategoryAll: "Усі",
    newsCategoryPolitics: "Політика",
    newsCategorySociety: "Суспільство",
    newsCategoryCulture: "Культура",
    newsCategoryEntertainment: "Розваги",
    newsCategorySport: "Спорт",
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
  },
  pl: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Start",
    navListen: "Radio",
    navNews: "Wiadomości",
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
    footerCardLabel: "Codzienna audycja",
    footerCardDate: "3 września!",
    footerCardText: "Bądźmy razem każdego dnia na falach РАДИО ПРИВОЗ ФМ",
    copyright: "© 2026 РАДИО ПРИВОЗ ФМ. Wszelkie prawa zastrzeżone.",
    madeFor: "Stworzone z miłością dla naszych słuchaczy",
    localStationMeta: "Radio online na żywo",
    dayBroadcastMeta: "Program dzienny · 10:00–20:00",
    nightBroadcastMeta: "Program nocny · 20:00–10:00",
    volumeSettings: "Ustaw głośność",
    volumeLevel: "Głośność",
    stationOffline: "Offline",
    stationError: "Nie udało się połączyć z tą stacją. Spróbuj innej.",
    newsSourceLabel: "Źródło",
    readOriginal: "Czytaj oryginał",
    newsFallbackText: "Krótki opis jest niedostępny. Przejdź do oryginału na stronie źródła.",
    ownBroadcastMeta: "Program autorski",
    relayBroadcastMeta: "Nocna retransmisja",
    newsCategoryAll: "Wszystkie",
    newsCategoryPolitics: "Polityka",
    newsCategorySociety: "Społeczeństwo",
    newsCategoryCulture: "Kultura",
    newsCategoryEntertainment: "Rozrywka",
    newsCategorySport: "Sport",
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
  },
  ru: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Главная",
    navListen: "Эфир",
    navNews: "Новости",
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
    footerCardLabel: "Ежедневный эфир",
    footerCardDate: "3 сентября!",
    footerCardText: "Будем вместе каждый день на волнах РАДИО ПРИВОЗ ФМ",
    copyright: "© 2026 РАДИО ПРИВОЗ ФМ. Все права защищены.",
    madeFor: "Создано с любовью для наших слушателей",
    localStationMeta: "Живой эфир онлайн",
    dayBroadcastMeta: "Дневной эфир · 10:00–20:00",
    nightBroadcastMeta: "Ночной эфир · 20:00–10:00",
    volumeSettings: "Настроить громкость",
    volumeLevel: "Громкость",
    stationOffline: "Не в эфире",
    stationError: "Не удалось подключиться к этой станции. Попробуйте другую.",
    newsSourceLabel: "Источник",
    readOriginal: "Читать оригинал",
    newsFallbackText: "Краткое описание недоступно. Перейдите к оригиналу на сайте источника.",
    ownBroadcastMeta: "Авторский эфир",
    relayBroadcastMeta: "Ночная ретрансляция",
    newsCategoryAll: "Все",
    newsCategoryPolitics: "Политика",
    newsCategorySociety: "Общество",
    newsCategoryCulture: "Культура",
    newsCategoryEntertainment: "Развлечения",
    newsCategorySport: "Спорт",
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

const newsSources = [
  {
    name: "Укрінформ",
    domain: "ukrinform.ua",
    feedUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    category: "society",
    reuseAllowed: true,
  },
  {
    name: "Радіо Свобода",
    domain: "radiosvoboda.org",
    feedUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    category: "society",
    reuseAllowed: true,
  },
  {
    name: "UOKiK",
    domain: "uokik.gov.pl",
    feedUrl: "https://uokik.gov.pl/feed",
    category: "society",
    reuseAllowed: true,
  },
  {
    name: "GUS",
    domain: "stat.gov.pl",
    feedUrl: "https://stat.gov.pl/rss/pl/5438/8.xml",
    category: "society",
    reuseAllowed: true,
  },
];

const fallbackNews = [
  {
    id: "fallback-odesa",
    title: "Суспільні новини Одеси та півдня України",
    excerpt: "Останні матеріали про життя громад, міські зміни та важливі події регіону — з переходом до першоджерела.",
    source: "Укрінформ",
    originalUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    publishedAt: new Date().toISOString(),
    category: "society",
  },
  {
    id: "fallback-kherson-radiosvoboda",
    title: "Політика України та рішення, що впливають на регіони",
    excerpt: "Добірка політичних новин із відкритих українських джерел, включно з подіями на півдні країни.",
    source: "Радіо Свобода",
    originalUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    publishedAt: new Date().toISOString(),
    category: "politics",
  },
  {
    id: "fallback-dnipro-ukrinform",
    title: "Культурне життя Дніпра та українських громад",
    excerpt: "Фестивалі, виставки, концерти й культурні ініціативи України та українців у Польщі.",
    source: "Укрінформ",
    originalUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    publishedAt: new Date().toISOString(),
    category: "culture",
  },
  {
    id: "fallback-polish-context-uokik",
    title: "Корисні суспільні новини для українців у Польщі",
    excerpt: "Офіційні польські оновлення про права споживачів, послуги та повсякденне життя.",
    source: "UOKiK",
    originalUrl: "https://uokik.gov.pl/rss",
    publishedAt: new Date().toISOString(),
    category: "society",
  },
  {
    id: "fallback-polish-context-gus",
    title: "Спортивні новини отримали окрему рубрику",
    excerpt: "Матеріали про матчі, турніри та українських спортсменів автоматично збираються у вкладці «Спорт».",
    source: "GUS",
    originalUrl: "https://stat.gov.pl/rss/",
    publishedAt: new Date().toISOString(),
    category: "sport",
  },
  {
    id: "fallback-entertainment",
    title: "Розваги, подорожі та легкі історії для слухачів",
    excerpt: "Шоу, гумор, цікаві маршрути й інші легкі матеріали автоматично потрапляють до рубрики «Розваги».",
    source: "Радіо Свобода",
    originalUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    publishedAt: new Date().toISOString(),
    category: "entertainment",
  },
];

const regionalNewsKeywords = [
  "одес",
  "odesa",
  "одеса",
  "херсон",
  "kherson",
  "дніпр",
  "днепр",
  "dnipro",
  "дніпро",
  "дніпропетров",
  "dnipropetrov",
];

const newsCategoryKeys = ["politics", "society", "culture", "entertainment", "sport"];
const newsCategoryTranslationKeys = {
  politics: "newsCategoryPolitics",
  society: "newsCategorySociety",
  culture: "newsCategoryCulture",
  entertainment: "newsCategoryEntertainment",
  sport: "newsCategorySport",
};
const newsCategoryKeywords = {
  politics: [
    "політик", "политик", "вибор", "выбор", "уряд", "правительств", "парламент", "депутат", "президент",
    "minister", "sejm", "senat", "wybor", "rząd", "polityk",
  ],
  sport: [
    "спорт", "футбол", "баскетбол", "теніс", "теннис", "олімп", "олимп", "матч", "чемпіон", "чемпион",
    "sport", "piłk", "mecz", "liga", "turniej",
  ],
  culture: [
    "культур", "мистец", "искусств", "театр", "кіно", "кино", "літератур", "литератур", "музей", "вистав",
    "концерт", "фестиваль", "kultur", "teatr", "film", "muze", "wystaw",
  ],
  entertainment: [
    "розваг", "развлеч", "шоу", "гумор", "юмор", "зірк", "звезд", "серіал", "сериал", "рецепт", "подорож",
    "rozrywk", "gwiazd", "serial", "przepis", "podróż",
  ],
  society: [
    "суспіль", "общество", "громад", "соціаль", "социал", "освіт", "образован", "здоров", "місто", "город",
    "społecz", "edukac", "zdrow", "miasto", "mieszkań",
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
let loadedNewsItems = fallbackNews;
let activeNewsCategory = "all";

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const rssJsonUrl = (url) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
const rawProxyUrl = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
const normalizeNewsText = (value = "") => value.toLocaleLowerCase("uk-UA");
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

const getNewsCategoryLabel = (category) => {
  const key = newsCategoryTranslationKeys[category] || "newsCategorySociety";
  return t(key);
};

const isRegionalNews = (item) => {
  const text = normalizeNewsText(`${item.title} ${item.excerpt} ${item.category}`);
  return regionalNewsKeywords.some((keyword) => text.includes(keyword));
};

const mixNewsBySource = (items) => {
  const buckets = newsSources.map((source) => {
    return items
      .filter((item) => item.source === source.name)
      .sort((a, b) => {
        const regionalDelta = Number(isRegionalNews(b)) - Number(isRegionalNews(a));
        if (regionalDelta !== 0) {
          return regionalDelta;
        }
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
  });
  const mixed = [];
  let cursor = 0;

  while (buckets.some((bucket) => bucket.length)) {
    const bucket = buckets[cursor % buckets.length];
    if (bucket?.length) {
      mixed.push(bucket.shift());
    }
    cursor += 1;
  }

  return mixed;
};

const ensureNewsCategoryCoverage = (items, reserveItems) => {
  const completeItems = [...items];
  newsCategoryKeys.forEach((category) => {
    if (!completeItems.some((item) => item.category === category)) {
      const reserveItem = reserveItems.find((item) => item.category === category);
      if (reserveItem) {
        completeItems.push(reserveItem);
      }
    }
  });
  return completeItems;
};

const setMenuState = (isOpen) => {
  if (!header || !menuToggle) {
    return;
  }

  header.classList.toggle("site-header--menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
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
  const playlistName = String(nowPlayingStatus?.playlist || "").toUpperCase();
  const playlistSlot = broadcastSchedule.slots?.find((item) => {
    return item.playlistMarker && playlistName.includes(String(item.playlistMarker).toUpperCase());
  });
  const displaySlot = playlistSlot || slot;
  const liveSong = nowPlayingStatus?.song || [nowPlayingStatus?.artist, nowPlayingStatus?.songtitle].filter(Boolean).join(" — ");

  stationTitle.textContent = liveSong && liveSong !== "-"
    ? liveSong
    : (activeBroadcast?.title || localStation.name);
  stationMeta.textContent = t(displaySlot?.labelKey || "localStationMeta");

  if (stationBadge) {
    const isOnline = nowPlayingStatus?.online !== 0;
    stationBadge.textContent = isOnline ? "On air" : t("stationOffline");
    player?.classList.toggle("live-player--offline", !isOnline);
  }
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

const parseFeed = async (source) => {
  try {
    const response = await fetch(rssJsonUrl(source.feedUrl));
    const data = await response.json();

    if (data.status === "ok" && Array.isArray(data.items)) {
      return data.items.slice(0, 6).map((item) => ({
        id: `${source.name}-${item.guid || item.link}`,
        title: stripHtml(item.title) || source.name,
        excerpt: stripHtml(item.description || item.content).slice(0, 220),
        source: source.name,
        originalUrl: item.link || source.feedUrl,
        publishedAt: item.pubDate || new Date().toISOString(),
        category: detectNewsCategory(`${item.title} ${item.description || item.content}`) || source.category,
      }));
    }
  } catch {
    // Fallback below keeps the source readable when the JSON proxy is unavailable.
  }

  const response = await fetch(rawProxyUrl(source.feedUrl));
  const xmlText = await response.text();
  const xml = new DOMParser().parseFromString(xmlText, "text/xml");
  const entries = Array.from(xml.querySelectorAll("item, entry")).slice(0, 6);

  return entries.map((entry) => {
    const linkNode = entry.querySelector("link");
    const originalUrl = linkNode?.getAttribute("href") || linkNode?.textContent || source.feedUrl;

    return {
      id: `${source.name}-${originalUrl}`,
      title: stripHtml(entry.querySelector("title")?.textContent) || source.name,
      excerpt: stripHtml(entry.querySelector("description, summary, content")?.textContent).slice(0, 220),
      source: source.name,
      originalUrl,
      publishedAt: entry.querySelector("pubDate, published, updated")?.textContent || new Date().toISOString(),
      category: detectNewsCategory(`${entry.querySelector("title")?.textContent || ""} ${entry.querySelector("description, summary, content")?.textContent || ""}`) || source.category,
    };
  });
};

const detectNewsCategory = (value = "") => {
  const text = normalizeNewsText(value);
  return newsCategoryKeys.find((category) => {
    return newsCategoryKeywords[category].some((keyword) => text.includes(keyword));
  }) || "society";
};

const formatNewsDate = (dateValue) => {
  try {
    return new Intl.DateTimeFormat(activeLanguage === "pl" ? "pl-PL" : "uk-UA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateValue));
  } catch {
    return "";
  }
};

const renderNews = (items) => {
  if (!newsList) {
    return;
  }

  loadedNewsItems = items;
  const visibleItems = activeNewsCategory === "all"
    ? items
    : items.filter((item) => item.category === activeNewsCategory);

  newsList.replaceChildren();
  visibleItems.slice(0, 8).forEach((item) => {
    const article = document.createElement("article");
    article.className = "news-card news-card--text";

    const content = document.createElement("div");
    content.className = "news-card__content";

    const meta = document.createElement("div");
    meta.className = "news-card__meta";

    const tag = document.createElement("span");
    tag.className = "news-card__tag";
    tag.textContent = getNewsCategoryLabel(item.category);

    const time = document.createElement("time");
    time.textContent = formatNewsDate(item.publishedAt);

    const title = document.createElement("h3");
    title.className = "news-card__title";
    title.textContent = item.title;

    const excerpt = document.createElement("p");
    excerpt.className = "news-card__text";
    excerpt.textContent = item.excerpt || t("newsFallbackText");

    const source = document.createElement("p");
    source.className = "news-card__source";
    source.textContent = `${t("newsSourceLabel")}: ${item.source}`;

    const link = document.createElement("a");
    link.className = "text-link";
    link.href = item.originalUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `
      <span>${t("readOriginal")}</span>
      <svg class="icon" aria-hidden="true">
        <use href="./assets/icons/lucide-sprite.svg#arrow-right"></use>
      </svg>
    `;

    meta.append(tag, time);
    content.append(meta, title, excerpt, source, link);
    article.append(content);
    newsList.append(article);
  });
};

const loadNews = async () => {
  const cacheKey = "prywoz-news-feed-ua-pl-v4";
  const cached = storageJson(cacheKey);
  const cacheMaxAge = 30 * 60 * 1000;

  if (cached && Date.now() - cached.createdAt < cacheMaxAge) {
    renderNews(cached.items);
    return;
  }

  let staticCache = fallbackNews;

  try {
    const response = await fetch("./assets/data/news-cache.json");
    staticCache = await response.json();
    renderNews(staticCache);
  } catch {
    renderNews(staticCache);
  }

  try {
    const feedGroups = await Promise.allSettled(newsSources.filter((source) => source.reuseAllowed).map(parseFeed));
    const items = feedGroups
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value)
      .filter((item, index, all) => all.findIndex((nextItem) => nextItem.id === item.id) === index)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const safeItems = items.length
      ? mixNewsBySource(ensureNewsCategoryCoverage(items, staticCache))
      : staticCache;
    storageSet(cacheKey, JSON.stringify({ createdAt: Date.now(), items: safeItems }));
    renderNews(safeItems);
  } catch {
    renderNews(staticCache);
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

  renderStationMeta();
  updateVolumeState();
  renderNews(loadedNewsItems);
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
      setMenuState(false);
    }
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
  });
});

newsFilter?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-news-category]");
  if (!button) {
    return;
  }

  activeNewsCategory = button.dataset.newsCategory || "all";
  newsFilterButtons.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("news-filter__button--active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
  renderNews(loadedNewsItems);
});

if (player && audio && playButton && volumeButton) {
  const storedVolumeValue = storageGet("prywoz-volume");
  const storedVolume = storedVolumeValue === null ? null : Number(storedVolumeValue);
  audio.volume = storedVolume !== null
    && Number.isFinite(storedVolume)
    && storedVolume >= 0
    && storedVolume <= 1
    ? storedVolume
    : 1;

  playButton.addEventListener("click", async () => {
    userStartedPlayback = true;

    if (audio.paused) {
      setPlayerState("loading");
      try {
        await audio.play();
      } catch {
        setPlayerState("error");
        if (stationMeta) {
          stationMeta.textContent = t("stationError");
        }
      }
      return;
    }

    audio.pause();
  });

  audio.addEventListener("play", () => {
    document.body.classList.add("page--audio-focus");
    setPlayerState("playing");
    playButtonIcon?.setAttribute("href", `${iconPath}#pause`);
    playButton.setAttribute("aria-label", "Поставити ефір на паузу");
  });

  audio.addEventListener("pause", () => {
    document.body.classList.remove("page--audio-focus");
    setPlayerState("paused");
    playButtonIcon?.setAttribute("href", `${iconPath}#play`);
    playButton.setAttribute("aria-label", "Відтворити ефір");
  });

  audio.addEventListener("waiting", () => setPlayerState("loading"));
  audio.addEventListener("error", () => setPlayerState("error"));
  audio.addEventListener("ended", () => {
    if (activeBroadcast?.mode === "playlist") {
      activePlaylistIndex += 1;
      syncScheduledBroadcast(true, true);
    }
  });

  volumeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = volumePanel?.hidden ?? false;
    if (volumePanel) {
      volumePanel.hidden = !willOpen;
    }
    volumeButton.setAttribute("aria-expanded", String(willOpen));
    if (willOpen) {
      volumeRange?.focus();
    }
  });

  volumeRange?.addEventListener("input", () => {
    const level = Number(volumeRange.value) / 100;
    audio.volume = level;
    audio.muted = level === 0;
    storageSet("prywoz-volume", String(level));
    updateVolumeState();
  });

  volumePanel?.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", () => {
    if (volumePanel && !volumePanel.hidden) {
      volumePanel.hidden = true;
      volumeButton.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && volumePanel && !volumePanel.hidden) {
      volumePanel.hidden = true;
      volumeButton.setAttribute("aria-expanded", "false");
      volumeButton.focus();
    }
  });

  updateVolumeState();

  const initializePlayer = async () => {
    await loadBroadcastSchedule();
    await syncScheduledBroadcast(false, true);
    await loadNowPlaying();
  };

  initializePlayer();
  window.setInterval(() => syncScheduledBroadcast(userStartedPlayback), 60 * 1000);
  window.setInterval(loadNowPlaying, 15 * 1000);
}

applyLanguage(activeLanguage);
loadNews();
