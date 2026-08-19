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
const stationTitle = document.querySelector(".live-player__track");
const stationMeta = document.querySelector(".live-player__host");
const stationStatus = document.querySelector("[data-station-status]");
const stationList = document.querySelector("[data-station-list]");
const trackControls = document.querySelectorAll(".live-player__control[data-action]");
const mediaHolder = document.querySelector(".live-player__record");
const mediaImage = document.querySelector(".live-player__record-image");
const newsList = document.querySelector("[data-news-list]");
const newsSourcesList = document.querySelector("[data-news-sources]");

const iconPath = "./assets/icons/lucide-sprite.svg";

const translations = {
  uk: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Головна",
    navListen: "Ефір",
    navStations: "Станції",
    navNews: "Новини",
    navAbout: "Про нас",
    navContacts: "Контакти",
    eyebrow: "Музика. Гумор. Культура. Люди.",
    heroTitle: "Перше українське радіо в Польщі",
    heroLead: "РАДИО ПРИВОЗ ФМ — легкий медіалендинг для українців у Польщі: живе радіо, польські станції, автоматична стрічка відкритих українських новин і простий контакт з редакцією.",
    listenLive: "Слухати live",
    nowOnAir: "Зараз в ефірі",
    stationsTitle: "Польські та українські станції",
    stationsText: "Список автоматично оновлюється через Radio Browser API: польські ефіри плюс Одеса, Херсон і Дніпро. Якщо станція недоступна, плеєр покаже fallback.",
    latestNews: "Останні новини",
    legalSources: "Відкриті джерела",
    aboutProject: "Про проєкт",
    aboutText: "РАДИО ПРИВОЗ ФМ — україномовний медіапроєкт для людей у Польщі та по всьому світу. Ми поєднуємо музику, корисні новини, культуру і живе слово без важкої CMS.",
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
    catalogCount: "Каталог: {count} станцій",
    catalogLoading: "Завантаження каталогу...",
    catalogUpdating: "Оновлюємо каталог Radio Browser...",
    catalogFallback: "Radio Browser тимчасово недоступний. Працює demo fallback.",
    localStationMeta: "Власний stream можна підключити через PRYWOZ_STREAM_URL. Зараз працює demo fallback.",
    externalStationMeta: "{codec}{bitrate} · поточний трек потребує ICY metadata backend",
    stationError: "Не вдалося підключитися до цієї станції. Спробуйте іншу.",
    newsSourceLabel: "Джерело",
    readOriginal: "Читати оригінал",
    newsFallbackText: "Короткий опис недоступний. Перейдіть до оригіналу на сайті джерела.",
    sourcePolicyLabel: "короткий опис + посилання на оригінал",
  },
  pl: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Start",
    navListen: "Radio",
    navStations: "Stacje",
    navNews: "Wiadomości",
    navAbout: "O nas",
    navContacts: "Kontakt",
    eyebrow: "Muzyka. Humor. Kultura. Ludzie.",
    heroTitle: "Ukraińskie radio w Polsce",
    heroLead: "РАДИО ПРИВОЗ ФМ to lekki landing medialny dla Ukraińców w Polsce: radio na żywo, polskie stacje, automatyczna lista otwartych wiadomości z Ukrainy i prosty kontakt z redakcją.",
    listenLive: "Słuchaj live",
    nowOnAir: "Teraz gramy",
    stationsTitle: "Polskie i ukraińskie stacje",
    stationsText: "Lista aktualizuje się przez Radio Browser API: polskie audycje oraz Odesa, Chersoń i Dnipro. Jeśli stacja jest niedostępna, odtwarzacz pokaże fallback.",
    latestNews: "Najnowsze wiadomości",
    legalSources: "Otwarte źródła",
    aboutProject: "O projekcie",
    aboutText: "РАДИО ПРИВОЗ ФМ to ukraińskojęzyczny projekt medialny dla osób w Polsce i na świecie. Łączymy muzykę, przydatne wiadomości, kulturę i żywe słowo bez ciężkiego CMS.",
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
    catalogCount: "Katalog: {count} stacji",
    catalogLoading: "Ładowanie katalogu...",
    catalogUpdating: "Aktualizujemy katalog Radio Browser...",
    catalogFallback: "Radio Browser jest chwilowo niedostępne. Działa demo fallback.",
    localStationMeta: "Własny stream można podłączyć przez PRYWOZ_STREAM_URL. Teraz działa demo fallback.",
    externalStationMeta: "{codec}{bitrate} · bieżący utwór wymaga backendu ICY metadata",
    stationError: "Nie udało się połączyć z tą stacją. Spróbuj innej.",
    newsSourceLabel: "Źródło",
    readOriginal: "Czytaj oryginał",
    newsFallbackText: "Krótki opis jest niedostępny. Przejdź do oryginału na stronie źródła.",
    sourcePolicyLabel: "krótki opis + link do oryginału",
  },
  ru: {
    brandName: "РАДИО ПРИВОЗ ФМ",
    navHome: "Главная",
    navListen: "Эфир",
    navStations: "Станции",
    navNews: "Новости",
    navAbout: "О нас",
    navContacts: "Контакты",
    eyebrow: "Музыка. Юмор. Культура. Люди.",
    heroTitle: "Украинское радио в Польше",
    heroLead: "РАДИО ПРИВОЗ ФМ — легкий медиалендинг для украинцев в Польше: живое радио, польские станции, автоматическая лента открытых украинских новостей и простой контакт с редакцией.",
    listenLive: "Слушать live",
    nowOnAir: "Сейчас в эфире",
    stationsTitle: "Польские и украинские станции",
    stationsText: "Список автоматически обновляется через Radio Browser API: польские эфиры плюс Одесса, Херсон и Днепр. Если станция недоступна, плеер покажет fallback.",
    latestNews: "Последние новости",
    legalSources: "Открытые источники",
    aboutProject: "О проекте",
    aboutText: "РАДИО ПРИВОЗ ФМ — украиноязычный медиапроект для людей в Польше и по всему миру. Мы соединяем музыку, полезные новости, культуру и живое слово без тяжелой CMS.",
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
    catalogCount: "Каталог: {count} станций",
    catalogLoading: "Загрузка каталога...",
    catalogUpdating: "Обновляем каталог Radio Browser...",
    catalogFallback: "Radio Browser временно недоступен. Работает demo fallback.",
    localStationMeta: "Собственный stream можно подключить через PRYWOZ_STREAM_URL. Сейчас работает demo fallback.",
    externalStationMeta: "{codec}{bitrate} · текущий трек требует ICY metadata backend",
    stationError: "Не удалось подключиться к этой станции. Попробуйте другую.",
    newsSourceLabel: "Источник",
    readOriginal: "Читать оригинал",
    newsFallbackText: "Краткое описание недоступно. Перейдите к оригиналу на сайте источника.",
    sourcePolicyLabel: "краткое описание + ссылка на оригинал",
  },
};

const stationSearchGroups = [
  {
    preferredNames: ["RMF FM", "Radio Zet", "Radio 357", "ESKA", "RMF MAXX", "VOX FM", "Antyradio", "TOK FM", "Złote Przeboje", "Polskie Radio 24"],
    maxItems: 8,
    searches: [
      {
        countrycode: "PL",
        language: "polish",
        order: "clickcount",
        reverse: "true",
        limit: "140",
      },
    ],
  },
  {
    preferredNames: ["Перше міське радіо", "Одесса радио", "Minatrix", "Radio Ppeople"],
    maxItems: 3,
    searches: [
      { countrycode: "UA", name: "Одеса", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", name: "Одесса", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", state: "Odesa", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", state: "Odessa", order: "clickcount", reverse: "true", limit: "20" },
    ],
  },
  {
    preferredNames: ["RockRadio UA", "РокРадіо UA", "Kherson"],
    maxItems: 2,
    searches: [
      { countrycode: "UA", name: "Херсон", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", name: "Kherson", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", state: "Kherson", order: "clickcount", reverse: "true", limit: "20" },
    ],
  },
  {
    preferredNames: ["Informator FM", "Дніпро", "Днепр", "Dnipro"],
    maxItems: 2,
    searches: [
      { countrycode: "UA", name: "Дніпро", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", name: "Днепр", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", name: "Dnipro", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", name: "Informator FM", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", state: "Dnepr", order: "clickcount", reverse: "true", limit: "20" },
      { countrycode: "UA", state: "Dnipropetrovsk", order: "clickcount", reverse: "true", limit: "20" },
    ],
  },
];

const localStation = {
  stationuuid: "radio-prywoz",
  name: "РАДИО ПРИВОЗ ФМ",
  url_resolved: "./assets/audio/radio-privoz-demo.mp3",
  favicon: "./assets/images/logo.png",
  codec: "MP3",
  bitrate: 128,
  homepage: "https://pavlo-bondarchuk.github.io/radio-prywoz-home/",
  tags: "ukrainian, community, poland",
  isLocal: true,
};

const newsSources = [
  {
    name: "Укрінформ",
    domain: "ukrinform.ua",
    feedUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    policyUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    category: "Україна",
    reuseAllowed: true,
  },
  {
    name: "Радіо Свобода",
    domain: "radiosvoboda.org",
    feedUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    policyUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    category: "Україна",
    reuseAllowed: true,
  },
  {
    name: "UOKiK",
    domain: "uokik.gov.pl",
    feedUrl: "https://uokik.gov.pl/feed",
    policyUrl: "https://uokik.gov.pl/rss",
    category: "Польща",
    reuseAllowed: true,
  },
  {
    name: "GUS",
    domain: "stat.gov.pl",
    feedUrl: "https://stat.gov.pl/rss/pl/5438/8.xml",
    policyUrl: "https://stat.gov.pl/rss/",
    category: "Польща",
    reuseAllowed: true,
  },
];

const fallbackNews = [
  {
    id: "fallback-odesa",
    title: "Одеський напрямок: чекаємо на оновлення RSS",
    excerpt: "Якщо живий фід тимчасово недоступний, сайт лишає резервну картку і веде читача до відкритого українського джерела.",
    source: "Укрінформ",
    originalUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    publishedAt: new Date().toISOString(),
    category: "Одеса",
  },
  {
    id: "fallback-kherson-radiosvoboda",
    title: "Херсон у фокусі української новинної стрічки",
    excerpt: "Сайт підсвічує матеріали, де у відкритих українських RSS згадується Херсон або область, і веде читача до сторінки джерела.",
    source: "Радіо Свобода",
    originalUrl: "https://www.radiosvoboda.org/api/zrqiteuuir",
    publishedAt: new Date().toISOString(),
    category: "Херсон",
  },
  {
    id: "fallback-dnipro-ukrinform",
    title: "Дніпро та область: регіональні згадки підіймаються вище",
    excerpt: "Алгоритм сортування спочатку показує матеріали з Одесою, Херсоном і Дніпром, а потім інші українські та польські новини з whitelist.",
    source: "Укрінформ",
    originalUrl: "https://www.ukrinform.ua/rss/block-lastnews",
    publishedAt: new Date().toISOString(),
    category: "Дніпро",
  },
  {
    id: "fallback-polish-context-uokik",
    title: "Польський контекст теж залишається у стрічці",
    excerpt: "Для українців у Польщі важливі також офіційні польські оновлення. Картки показують короткий опис, джерело і посилання на оригінал.",
    source: "UOKiK",
    originalUrl: "https://uokik.gov.pl/rss",
    publishedAt: new Date().toISOString(),
    category: "Польща",
  },
  {
    id: "fallback-polish-context-gus",
    title: "Статистика і суспільні оновлення з польських джерел",
    excerpt: "Стрічка може поєднувати українські регіональні новини з польськими офіційними RSS, щоб контент був корисним для життя в Польщі.",
    source: "GUS",
    originalUrl: "https://stat.gov.pl/rss/",
    publishedAt: new Date().toISOString(),
    category: "Польща",
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
  if (key === "prywoz-language" || key === "prywoz-station-index") {
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
let stations = [localStation];
let activeStationIndex = Number(storageGet("prywoz-station-index")) || 0;
let userStartedPlayback = false;
let switchTimeout;

const normalizeStationName = (value = "") => value.toLocaleLowerCase("uk-UA").replace(/[^\p{L}\p{N}]+/gu, "");
const isPlayableStation = (station) => {
  const streamUrl = station.url_resolved || station.url || "";
  const requiresHttps = window.location.protocol === "https:";
  return streamUrl && (!requiresHttps || streamUrl.startsWith("https://"));
};
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

const fetchRadioStations = async (apiBase, search) => {
  const params = new URLSearchParams({
    hidebroken: "true",
    ...search,
  });
  const response = await fetch(`${apiBase}/json/stations/search?${params.toString()}`);
  const data = await response.json();
  return Array.isArray(data) ? data.filter(isPlayableStation) : [];
};

const pickStationGroup = (results, preferredNames, maxItems) => {
  const normalizedPreferredNames = preferredNames.map(normalizeStationName);
  const picked = [];
  const append = (station) => {
    if (station && !picked.some((item) => item.stationuuid === station.stationuuid)) {
      picked.push(station);
    }
  };

  normalizedPreferredNames.forEach((preferredName) => {
    append(results.find((station) => normalizeStationName(station.name).includes(preferredName)));
  });

  results.forEach(append);
  return picked.slice(0, maxItems);
};

const mixStationGroups = (groups) => {
  const mixed = [];
  let cursor = 0;

  while (groups.some((group) => group.length)) {
    const group = groups[cursor % groups.length];
    if (group?.length) {
      mixed.push(group.shift());
    }
    cursor += 1;
  }

  return mixed;
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

const renderStationMeta = (station) => {
  if (!stationTitle || !stationMeta) {
    return;
  }

  stationTitle.textContent = station.name;
  stationMeta.textContent = station.isLocal
    ? t("localStationMeta")
    : t("externalStationMeta", {
      codec: station.codec || "stream",
      bitrate: station.bitrate ? ` · ${station.bitrate} kbps` : "",
    });
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

const renderStations = () => {
  if (!stationList) {
    return;
  }

  stationList.replaceChildren();
  stations.forEach((station, index) => {
    const button = document.createElement("button");
    button.className = "station-chip";
    button.type = "button";
    button.dataset.stationIndex = String(index);
    button.classList.toggle("station-chip--active", index === activeStationIndex);
    button.setAttribute("aria-pressed", String(index === activeStationIndex));

    const logo = document.createElement("span");
    logo.className = "station-chip__logo";
    if (station.favicon) {
      const image = document.createElement("img");
      image.src = station.favicon;
      image.alt = "";
      image.loading = "lazy";
      logo.append(image);
    } else {
      logo.textContent = station.name.slice(0, 2).toUpperCase();
    }

    const text = document.createElement("span");
    text.className = "station-chip__text";
    text.textContent = station.name;
    button.append(logo, text);
    stationList.append(button);
  });
};

const setActiveStation = async (index, shouldPlay = userStartedPlayback) => {
  if (!audio || stations.length === 0) {
    return;
  }

  activeStationIndex = (index + stations.length) % stations.length;
  storageSet("prywoz-station-index", String(activeStationIndex));

  const station = stations[activeStationIndex];
  window.clearTimeout(switchTimeout);
  player?.classList.remove("live-player--switching");
  void player?.offsetWidth;
  player?.classList.add("live-player--switching");
  switchTimeout = window.setTimeout(() => player?.classList.remove("live-player--switching"), 820);

  renderStationMeta(station);
  renderMediaType(activeStationIndex);
  renderStations();

  audio.pause();
  audio.src = station.url_resolved || station.url || localStation.url_resolved;
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

const getRadioBrowserServer = async () => {
  const response = await fetch("https://all.api.radio-browser.info/json/servers");
  const servers = await response.json();
  const firstServer = servers.find((server) => server.name);
  return firstServer ? `https://${firstServer.name}` : "https://de1.api.radio-browser.info";
};

const loadStations = async () => {
  if (!stationStatus) {
    return;
  }

  const cacheKey = "prywoz-radio-browser-stations-v2";
  const cached = storageJson(cacheKey);
  const cacheMaxAge = 6 * 60 * 60 * 1000;

  if (cached && Date.now() - cached.createdAt < cacheMaxAge) {
    stations = [localStation, ...cached.items];
    stationStatus.textContent = t("catalogCount", { count: String(stations.length) });
    await setActiveStation(Math.min(activeStationIndex, stations.length - 1), false);
    return;
  }

  try {
    stationStatus.textContent = t("catalogUpdating");
    const apiBase = await getRadioBrowserServer();
    const stationGroups = await Promise.all(stationSearchGroups.map(async (group) => {
      const results = await Promise.all(group.searches.map((search) => fetchRadioStations(apiBase, search)));
      const uniqueResults = results
        .flat()
        .filter((station, index, all) => all.findIndex((item) => item.stationuuid === station.stationuuid) === index);
      return pickStationGroup(uniqueResults, group.preferredNames, group.maxItems);
    }));
    const picked = mixStationGroups(stationGroups);

    storageSet(cacheKey, JSON.stringify({ createdAt: Date.now(), items: picked }));
    stations = [localStation, ...picked];
    stationStatus.textContent = t("catalogCount", { count: String(stations.length) });
    await setActiveStation(Math.min(activeStationIndex, stations.length - 1), false);
  } catch {
    stationStatus.textContent = t("catalogFallback");
    stations = [localStation];
    await setActiveStation(0, false);
  }
};

const updateVolumeState = () => {
  if (!audio || !volumeButton) {
    return;
  }

  const isMuted = audio.muted;
  volumeButton.setAttribute("aria-pressed", String(isMuted));
  volumeButton.setAttribute("aria-label", isMuted ? "Увімкнути звук" : "Вимкнути звук");
  volumeButtonIcon?.setAttribute("href", `${iconPath}#${isMuted ? "volume-x" : "volume-2"}`);
};

const renderNewsSources = () => {
  if (!newsSourcesList) {
    return;
  }

  newsSourcesList.replaceChildren();
  newsSources.forEach((source) => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="${source.policyUrl}" target="_blank" rel="noopener">${source.name}</a> · ${source.domain} · ${t("sourcePolicyLabel")}`;
    newsSourcesList.append(item);
  });
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
  if (text.includes("одес") || text.includes("odesa")) {
    return "Одеса";
  }
  if (text.includes("херсон") || text.includes("kherson")) {
    return "Херсон";
  }
  if (text.includes("дніпр") || text.includes("днепр") || text.includes("dnipro") || text.includes("dnipropetrov")) {
    return "Дніпро";
  }
  return "";
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

  newsList.replaceChildren();
  items.slice(0, 8).forEach((item) => {
    const article = document.createElement("article");
    article.className = "news-card news-card--text";

    const content = document.createElement("div");
    content.className = "news-card__content";

    const meta = document.createElement("div");
    meta.className = "news-card__meta";

    const tag = document.createElement("span");
    tag.className = "news-card__tag";
    tag.textContent = item.category || "Україна";

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
  const cacheKey = "prywoz-news-feed-ua-pl-v2";
  const cached = storageJson(cacheKey);
  const cacheMaxAge = 30 * 60 * 1000;

  if (cached && Date.now() - cached.createdAt < cacheMaxAge && !cached.items?.some((item) => item.id?.startsWith("fallback-"))) {
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

    const safeItems = items.length ? mixNewsBySource(items) : staticCache;
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

  renderStationMeta(stations[activeStationIndex] || localStation);
  if (stationStatus) {
    stationStatus.textContent = stations.length > 1
      ? t("catalogCount", { count: String(stations.length) })
      : t("catalogLoading");
  }

  renderNewsSources();
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
    renderNews(storageJson("prywoz-news-feed-ua-pl-v2")?.items || fallbackNews);
  });
});

if (player && audio && playButton && volumeButton) {
  audio.volume = 0.7;

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

  volumeButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateVolumeState();
  });

  trackControls.forEach((control) => {
    control.addEventListener("click", () => {
      setActiveStation(activeStationIndex + (control.dataset.action === "next" ? 1 : -1));
    });
  });

  stationList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-station-index]");
    if (button) {
      setActiveStation(Number(button.dataset.stationIndex));
    }
  });

  updateVolumeState();
  renderStationMeta(localStation);
  renderMediaType(0);
  renderStations();
  loadStations();
}

renderNewsSources();
applyLanguage(activeLanguage);
loadNews();
