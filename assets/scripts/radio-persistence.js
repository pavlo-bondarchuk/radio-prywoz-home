(() => {
  const STREAM_URL = "https://listen1.myradio24.com/73556";
  const STATUS_URL = "https://myradio24.com/users/73556/status.json";
  const audio = document.querySelector("[data-persistent-radio]") || document.body.appendChild(Object.assign(document.createElement("audio"), {
    preload: "none",
    crossOrigin: "anonymous",
  }));
  audio.dataset.persistentRadio = "";

  const storedVolume = Number(localStorage.getItem("prywoz-volume"));
  audio.volume = Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 1 ? storedVolume : 1;

  const getControl = () => document.querySelector("[data-radio-toggle]");
  const getIcon = () => getControl()?.querySelector("use");
  const languageIndex = () => ({ uk: 0, pl: 1, ru: 2 })[localStorage.getItem("prywoz-language")] ?? 0;
  const localized = (values) => values[languageIndex()] || values[0];
  const stateCopy = {
    idle: { badge: ["Пауза", "Pauza", "Пауза"], icon: "play", label: ["Радіо вимкнено", "Radio wyłączone", "Радио выключено"] },
    muted: { badge: ["Без звуку", "Wyciszone", "Без звука"], icon: "play", label: ["Без звуку", "Wyciszone", "Без звука"] },
    loading: { badge: ["Підключення", "Łączenie", "Подключение"], icon: "loader-circle", label: ["Підключення…", "Łączenie…", "Подключение…"] },
    live: { badge: ["В ефірі", "Na antenie", "В эфире"], icon: "pause", label: ["Ефір наживо", "Radio na żywo", "Эфир в прямом эфире"] },
    error: { badge: ["Не в ефірі", "Offline", "Не в эфире"], icon: "play", label: ["Помилка ефіру", "Błąd transmisji", "Ошибка эфира"] },
  };

  const syncPlayer = (state) => {
    const copy = stateCopy[state] || stateCopy.idle;
    document.querySelectorAll(".live-player").forEach((player) => {
      player.dataset.radioState = state;
      player.classList.toggle("live-player--playing", state === "live");
      player.classList.toggle("live-player--loading", state === "loading");
      player.classList.toggle("live-player--error", state === "error");
      player.querySelector(".live-player__badge")?.replaceChildren(localized(copy.badge));
      const button = player.querySelector(".live-player__play");
      button?.setAttribute("aria-pressed", String(state === "live"));
      button?.setAttribute("aria-label", localized(state === "live" ? ["Вимкнути звук ефіру", "Wycisz radio", "Выключить звук эфира"] : ["Увімкнути ефір", "Włącz radio", "Включить эфир"]));
      button?.querySelector("use")?.setAttribute("href", `./assets/icons/lucide-sprite.svg#${copy.icon}`);
      const range = player.querySelector(".live-player__volume-range");
      const level = audio.muted ? 0 : Math.round(audio.volume * 100);
      if (range) range.value = String(level);
      const value = player.querySelector(".live-player__volume-value");
      if (value) value.textContent = `${level}%`;
      player.querySelector(".live-player__volume use")?.setAttribute("href", `./assets/icons/lucide-sprite.svg#${level === 0 ? "volume-x" : "volume-2"}`);
    });
  };

  const syncTheme = () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const label = localized(isDark
      ? ["Увімкнути світлу тему", "Włącz jasny motyw", "Включить светлую тему"]
      : ["Увімкнути темну тему", "Włącz ciemny motyw", "Включить тёмную тему"]);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", label);
      button.title = label;
    });
  };

  const toggleTheme = () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("prywoz-theme", theme);
    syncTheme();
  };

  const syncSchedule = () => {
    const hour = Number(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      hour12: false,
    }).format(new Date()));
    const label = localized(hour >= 10 && hour < 20
      ? ["Денний ефір · 10:00–20:00", "Program dzienny · 10:00–20:00", "Дневной эфир · 10:00–20:00"]
      : ["Нічний ефір · 20:00–10:00", "Program nocny · 20:00–10:00", "Ночной эфир · 20:00–10:00"]);
    document.querySelectorAll(".live-player__host").forEach((node) => { node.textContent = label; });
  };

  const setState = (state) => {
    const copy = stateCopy[state] || stateCopy.idle;
    const control = getControl();
    if (control) {
      control.dataset.state = state;
      control.setAttribute("aria-pressed", String(state === "live"));
      control.setAttribute("aria-label", localized(state === "live" ? ["Вимкнути звук ефіру", "Wycisz radio", "Выключить звук эфира"] : ["Увімкнути ефір", "Włącz radio", "Включить эфир"]));
      const status = control.querySelector("[data-radio-status]");
      if (status) status.textContent = localized(copy.label);
      getIcon()?.setAttribute("href", `./assets/icons/lucide-sprite.svg#${state === "live" ? "volume-2" : "play"}`);
    }
    syncPlayer(state);
    document.dispatchEvent(new CustomEvent("prywoz:radio-state", { detail: { state } }));
  };

  const start = async () => {
    if (!audio.src) {
      audio.src = STREAM_URL;
      audio.load();
    }
    audio.muted = false;
    setState("loading", "Підключення…");
    try {
      await audio.play();
      sessionStorage.setItem("prywoz-radio-active", "1");
      setState("live", "Ефір наживо");
    } catch {
      setState("error", "Натисніть ще раз");
    }
  };

  const mute = () => {
    audio.muted = true;
    sessionStorage.setItem("prywoz-radio-active", "1");
    setState("muted", "Без звуку");
  };

  const toggle = () => {
    if (!audio.paused && !audio.muted) mute(); else start();
  };

  window.PrywozRadio = { audio, mute, start, toggle };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-theme-toggle]")) {
      toggleTheme();
      return;
    }

    if (event.target.closest("[data-radio-toggle], .live-player__play, [data-inner-play]")) {
      toggle();
      return;
    }

    const volumeButton = event.target.closest(".live-player__volume");
    if (volumeButton) {
      const panel = volumeButton.closest(".live-player__volume-control")?.querySelector(".live-player__volume-panel");
      if (!panel) return;
      panel.hidden = !panel.hidden;
      volumeButton.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) panel.querySelector("input")?.focus();
      return;
    }

    if (event.target.closest(".live-player__volume-panel")) return;

    document.querySelectorAll(".live-player__volume-panel:not([hidden])").forEach((panel) => {
      panel.hidden = true;
      panel.closest(".live-player__volume-control")?.querySelector(".live-player__volume")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("input", (event) => {
    const range = event.target.closest(".live-player__volume-range");
    if (!range) return;
    audio.volume = Number(range.value) / 100;
    audio.muted = audio.volume === 0;
    localStorage.setItem("prywoz-volume", String(audio.volume));
    setState(audio.muted ? "muted" : (audio.paused ? "idle" : "live"));
  });

  audio.addEventListener("playing", () => setState(audio.muted ? "muted" : "live", audio.muted ? "Без звуку" : "Ефір наживо"));
  audio.addEventListener("waiting", () => setState("loading", "Підключення…"));
  audio.addEventListener("error", () => setState("error", "Помилка ефіру"));

  const updateMetadata = async () => {
    try {
      const response = await fetch(STATUS_URL, { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      const song = data.song || [data.artist, data.songtitle].filter(Boolean).join(" — ");
      document.querySelectorAll("[data-radio-track], .live-player__track").forEach((node) => { node.textContent = song && song !== "-" ? song : "РАДИО ПРИВОЗ ФМ"; });
    } catch { /* Keep the station name while metadata is unavailable. */ }
  };

  const updateNavigation = (url) => {
    const path = new URL(url, location.href).pathname;
    document.querySelectorAll(".main-nav__link").forEach((link) => {
      const active = new URL(link.href, location.href).pathname === path;
      link.classList.toggle("main-nav__link--active", active);
    });
  };

  // This is a static multi-page site: every page owns its stylesheets and
  // initialization scripts. Let the browser perform document navigation so
  // that page-specific CSS and JavaScript are always loaded together.
  document.addEventListener("prywoz:language-change", () => {
    syncSchedule();
    setState(audio.paused ? "idle" : (audio.muted ? "muted" : "live"));
  });

  const mount = () => {
    updateNavigation(location.href);
    syncTheme();
    syncSchedule();
    setState(audio.paused ? "idle" : (audio.muted ? "muted" : "live"), audio.paused ? "Радіо вимкнено" : (audio.muted ? "Без звуку" : "Ефір наживо"));
    updateMetadata();
  };
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", mount, { once: true }); else mount();
  setInterval(updateMetadata, 15000);
  setInterval(syncSchedule, 60000);
})();
