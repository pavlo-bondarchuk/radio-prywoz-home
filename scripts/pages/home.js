const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const languageButtons = document.querySelectorAll("[data-language]");
const translatableNodes = document.querySelectorAll("[data-i18n]");
const googleTranslateLink = document.querySelector("[data-google-translate]");
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
const eventSlider = document.querySelector("[data-event-slider]");

const iconPath = "./assets/icons/lucide-sprite.svg";

const translations = {
  uk: {
    navHome: "Головна",
    navListen: "Ефір",
    navStations: "Станції",
    navNews: "Новини",
    navEvents: "Події",
    navAbout: "Про нас",
    navContacts: "Контакти",
    eyebrow: "Музика. Гумор. Культура. Люди.",
    heroTitle: "Перше українське радіо в Польщі",
    heroLead: "Radio Prywoz — легкий медіалендинг для українців у Польщі: живе радіо, польські станції, автоматична стрічка офіційних новин і простий контакт з редакцією.",
    listenLive: "Слухати live",
    nowOnAir: "Зараз в ефірі",
    stationsTitle: "Польські станції",
    stationsText: "Список автоматично оновлюється через Radio Browser API. Якщо станція недоступна, плеєр покаже fallback.",
    latestNews: "Останні новини",
    legalSources: "Дозволені джерела",
    eventsTitle: "Події Radio Prywoz",
    eventsCta: "Запропонувати подію",
    aboutProject: "Про проєкт",
    aboutText: "Radio Prywoz — україномовний медіапроєкт для людей у Польщі та по всьому світу. Ми поєднуємо музику, корисні новини, культуру і живе слово без важкої CMS.",
  },
  pl: {
    navHome: "Start",
    navListen: "Radio",
    navStations: "Stacje",
    navNews: "Wiadomości",
    navEvents: "Wydarzenia",
    navAbout: "O nas",
    navContacts: "Kontakt",
    eyebrow: "Muzyka. Humor. Kultura. Ludzie.",
    heroTitle: "Ukraińskie radio w Polsce",
    heroLead: "Radio Prywoz to lekki landing medialny dla Ukraińców w Polsce: radio na żywo, polskie stacje, automatyczna lista oficjalnych wiadomości i prosty kontakt z redakcją.",
    listenLive: "Słuchaj live",
    nowOnAir: "Teraz gramy",
    stationsTitle: "Polskie stacje",
    stationsText: "Lista aktualizuje się przez Radio Browser API. Jeśli stacja jest niedostępna, odtwarzacz pokaże fallback.",
    latestNews: "Najnowsze wiadomości",
    legalSources: "Dozwolone źródła",
    eventsTitle: "Wydarzenia Radio Prywoz",
    eventsCta: "Zaproponuj wydarzenie",
    aboutProject: "O projekcie",
    aboutText: "Radio Prywoz to ukraińskojęzyczny projekt medialny dla osób w Polsce i na świecie. Łączymy muzykę, przydatne wiadomości, kulturę i żywe słowo bez ciężkiego CMS.",
  },
  ru: {
    navHome: "Главная",
    navListen: "Эфир",
    navStations: "Станции",
    navNews: "Новости",
    navEvents: "События",
    navAbout: "О нас",
    navContacts: "Контакты",
    eyebrow: "Музыка. Юмор. Культура. Люди.",
    heroTitle: "Украинское радио в Польше",
    heroLead: "Radio Prywoz — легкий медиалендинг для украинцев в Польше: живое радио, польские станции, автоматическая лента официальных новостей и простой контакт с редакцией.",
    listenLive: "Слушать live",
    nowOnAir: "Сейчас в эфире",
    stationsTitle: "Польские станции",
    stationsText: "Список автоматически обновляется через Radio Browser API. Если станция недоступна, плеер покажет fallback.",
    latestNews: "Последние новости",
    legalSources: "Разрешенные источники",
    eventsTitle: "События Radio Prywoz",
    eventsCta: "Предложить событие",
    aboutProject: "О проекте",
    aboutText: "Radio Prywoz — украиноязычный медиапроект для людей в Польше и по всему миру. Мы соединяем музыку, полезные новости, культуру и живое слово без тяжелой CMS.",
  },
};

const featuredStationNames = ["RMF FM", "Radio Zet", "Radio 357", "ESKA", "RMF MAXX", "VOX FM", "Antyradio", "TOK FM", "Złote Przeboje"];

const localStation = {
  stationuuid: "radio-prywoz",
  name: "Radio Prywoz",
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
    name: "UOKiK",
    domain: "uokik.gov.pl",
    feedUrl: "https://uokik.gov.pl/feed",
    policyUrl: "https://uokik.gov.pl/rss",
    category: "Polska",
    reuseAllowed: true,
  },
  {
    name: "GUS",
    domain: "stat.gov.pl",
    feedUrl: "https://stat.gov.pl/rss/pl/5438/8.xml",
    policyUrl: "https://stat.gov.pl/rss/",
    category: "Społeczeństwo",
    reuseAllowed: true,
  },
];

const fallbackNews = [
  {
    id: "fallback-uokik",
    title: "Офіційні польські новини підключаються через whitelist RSS",
    excerpt: "MVP показує короткі описи, джерело і посилання на оригінал. Повні тексти не копіюються автоматично.",
    source: "Radio Prywoz",
    originalUrl: "https://uokik.gov.pl/rss",
    publishedAt: new Date().toISOString(),
    category: "Polska",
  },
  {
    id: "fallback-gus",
    title: "Стрічка готова до державних джерел Польщі",
    excerpt: "Для старту додані UOKiK та GUS. Інші RSS можна вносити в конфіг після перевірки умов повторного використання.",
    source: "Radio Prywoz",
    originalUrl: "https://stat.gov.pl/rss/",
    publishedAt: new Date().toISOString(),
    category: "Społeczeństwo",
  },
];

let activeLanguage = localStorage.getItem("prywoz-language") || "uk";
let stations = [localStation];
let activeStationIndex = Number(localStorage.getItem("prywoz-station-index")) || 0;
let userStartedPlayback = false;
let switchTimeout;

const normalizeStationName = (value) => value.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, "");
const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const rssJsonUrl = (url) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
const rawProxyUrl = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

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
    ? "Власний stream можна підключити через PRYWOZ_STREAM_URL. Зараз працює demo fallback."
    : `${station.codec || "stream"}${station.bitrate ? ` · ${station.bitrate} kbps` : ""} · поточний трек потребує ICY metadata backend`;
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
  localStorage.setItem("prywoz-station-index", String(activeStationIndex));

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
        stationMeta.textContent = "Не вдалося підключитися до цієї станції. Спробуйте іншу.";
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

  const cacheKey = "prywoz-radio-browser-stations-v1";
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
  const cacheMaxAge = 6 * 60 * 60 * 1000;

  if (cached && Date.now() - cached.createdAt < cacheMaxAge) {
    stations = [localStation, ...cached.items];
    stationStatus.textContent = `Каталог: ${stations.length} станцій`;
    await setActiveStation(Math.min(activeStationIndex, stations.length - 1), false);
    return;
  }

  try {
    stationStatus.textContent = "Оновлюємо каталог Radio Browser...";
    const apiBase = await getRadioBrowserServer();
    const params = new URLSearchParams({
      countrycode: "PL",
      language: "polish",
      hidebroken: "true",
      order: "clickcount",
      reverse: "true",
      limit: "120",
    });
    const response = await fetch(`${apiBase}/json/stations/search?${params.toString()}`);
    const results = await response.json();
    const picked = [];

    featuredStationNames.forEach((name) => {
      const requiresHttps = window.location.protocol === "https:";
      const match = results.find((station) => {
        const streamUrl = station.url_resolved || station.url || "";
        return normalizeStationName(station.name).includes(normalizeStationName(name))
          && (!requiresHttps || streamUrl.startsWith("https://"));
      });
      if (match && match.url_resolved && !picked.some((station) => station.stationuuid === match.stationuuid)) {
        picked.push(match);
      }
    });

    localStorage.setItem(cacheKey, JSON.stringify({ createdAt: Date.now(), items: picked }));
    stations = [localStation, ...picked];
    stationStatus.textContent = `Каталог: ${stations.length} станцій`;
    await setActiveStation(Math.min(activeStationIndex, stations.length - 1), false);
  } catch {
    stationStatus.textContent = "Radio Browser тимчасово недоступний. Працює demo fallback.";
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
    item.innerHTML = `<a href="${source.policyUrl}" target="_blank" rel="noopener">${source.name}</a> · ${source.domain} · excerpt + original link`;
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
        category: source.category,
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
      category: source.category,
    };
  });
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
    tag.textContent = item.category || "Polska";

    const time = document.createElement("time");
    time.textContent = formatNewsDate(item.publishedAt);

    const title = document.createElement("h3");
    title.className = "news-card__title";
    title.textContent = item.title;

    const excerpt = document.createElement("p");
    excerpt.className = "news-card__text";
    excerpt.textContent = item.excerpt || "Короткий опис недоступний. Перейдіть до оригіналу на сайті джерела.";

    const source = document.createElement("p");
    source.className = "news-card__source";
    source.textContent = `Джерело: ${item.source}`;

    const link = document.createElement("a");
    link.className = "text-link";
    link.href = item.originalUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `
      <span>Читати оригінал</span>
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
  const cacheKey = "prywoz-news-feed-v1";
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
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

    const safeItems = items.length ? items : staticCache;
    localStorage.setItem(cacheKey, JSON.stringify({ createdAt: Date.now(), items: safeItems }));
    renderNews(safeItems);
  } catch {
    renderNews(staticCache);
  }
};

const applyLanguage = (language) => {
  activeLanguage = translations[language] ? language : "uk";
  localStorage.setItem("prywoz-language", activeLanguage);
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

  if (googleTranslateLink) {
    googleTranslateLink.href = `https://translate.google.com/translate?sl=auto&tl=${activeLanguage}&u=${encodeURIComponent(window.location.href.split("#")[0])}`;
  }
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
    renderNews(JSON.parse(localStorage.getItem("prywoz-news-feed-v1") || "null")?.items || fallbackNews);
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
          stationMeta.textContent = "Не вдалося підключитися до станції. Спробуйте іншу.";
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

if (eventSlider) {
  const track = eventSlider.querySelector(".event-slider__track");
  const controls = eventSlider.querySelectorAll("[data-event-direction]");
  const originalCards = track ? Array.from(track.children) : [];
  let eventIndex = 0;
  let eventStep = 0;
  let eventPerView = 1;
  let isSliding = false;

  const getEventPerView = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return 1;
    }

    if (window.matchMedia("(max-width: 1180px)").matches) {
      return 2;
    }

    return 4;
  };

  const setEventPosition = (withTransition = true) => {
    if (!track) {
      return;
    }

    track.style.transition = withTransition ? "" : "none";
    track.style.transform = `translateX(${-eventIndex * eventStep}px)`;
  };

  const measureEventStep = () => {
    if (!track) {
      return;
    }

    const firstCard = track.children[eventPerView];
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    eventStep = firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
  };

  const buildEventLoop = () => {
    if (!track || originalCards.length === 0) {
      return;
    }

    eventPerView = Math.min(getEventPerView(), originalCards.length);
    track.replaceChildren();

    const cloneCard = (card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      return clone;
    };

    const startClones = originalCards.slice(-eventPerView).map(cloneCard);
    const endClones = originalCards.slice(0, eventPerView).map(cloneCard);

    [...startClones, ...originalCards, ...endClones].forEach((card) => {
      track.append(card);
    });

    eventIndex = eventPerView;
    measureEventStep();
    setEventPosition(false);
  };

  const moveEvents = (direction) => {
    if (!track || isSliding || eventStep === 0) {
      return;
    }

    isSliding = true;
    eventIndex += direction === "next" ? 1 : -1;
    setEventPosition(true);
  };

  track?.addEventListener("transitionend", () => {
    if (!track) {
      return;
    }

    if (eventIndex >= originalCards.length + eventPerView) {
      eventIndex = eventPerView;
      setEventPosition(false);
    }

    if (eventIndex < eventPerView) {
      eventIndex = originalCards.length + eventPerView - 1;
      setEventPosition(false);
    }

    isSliding = false;
  });

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      moveEvents(control.dataset.eventDirection === "prev" ? "prev" : "next");
    });
  });

  window.addEventListener("resize", buildEventLoop);
  buildEventLoop();
}
