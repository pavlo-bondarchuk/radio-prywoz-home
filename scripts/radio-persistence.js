(() => {
  const STREAM_URL = "https://listen1.myradio24.com/73556";
  const STATUS_URL = "https://myradio24.com/users/73556/status.json";
  const audio = document.querySelector("[data-persistent-radio]") || document.body.appendChild(Object.assign(document.createElement("audio"), {
    preload: "none",
    crossOrigin: "anonymous",
  }));
  audio.dataset.persistentRadio = "";

  const getControl = () => document.querySelector("[data-radio-toggle]");
  const getIcon = () => getControl()?.querySelector("use");
  const stateCopy = {
    idle: { badge: "Paused", icon: "play", label: "Радіо вимкнено" },
    muted: { badge: "Paused", icon: "play", label: "Без звуку" },
    loading: { badge: "Connecting", icon: "loader-circle", label: "Підключення…" },
    live: { badge: "On air", icon: "pause", label: "Ефір наживо" },
    error: { badge: "Offline", icon: "play", label: "Помилка ефіру" },
  };

  const syncPlayer = (state) => {
    const copy = stateCopy[state] || stateCopy.idle;
    document.querySelectorAll(".live-player").forEach((player) => {
      player.dataset.radioState = state;
      player.classList.toggle("live-player--playing", state === "live");
      player.classList.toggle("live-player--loading", state === "loading");
      player.classList.toggle("live-player--error", state === "error");
      player.querySelector(".live-player__badge")?.replaceChildren(copy.badge);
      const button = player.querySelector(".live-player__play");
      button?.setAttribute("aria-pressed", String(state === "live"));
      button?.setAttribute("aria-label", state === "live" ? "Вимкнути звук ефіру" : "Увімкнути ефір");
      button?.querySelector("use")?.setAttribute("href", `./assets/icons/lucide-sprite.svg#${copy.icon}`);
    });
  };

  const setState = (state, label) => {
    const copy = stateCopy[state] || stateCopy.idle;
    const control = getControl();
    if (control) {
      control.dataset.state = state;
      control.setAttribute("aria-pressed", String(state === "live"));
      control.setAttribute("aria-label", state === "live" ? "Вимкнути звук ефіру" : "Увімкнути ефір");
      const status = control.querySelector("[data-radio-status]");
      if (status) status.textContent = label || copy.label;
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
    audio.volume = 1;
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
    const button = event.target.closest("[data-radio-toggle]");
    if (!button) return;
    toggle();
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
      document.querySelectorAll("[data-radio-track]").forEach((node) => { node.textContent = song && song !== "-" ? song : "РАДИО ПРИВОЗ ФМ"; });
    } catch { /* Keep the station name while metadata is unavailable. */ }
  };

  const updateNavigation = (url) => {
    const path = new URL(url, location.href).pathname;
    document.querySelectorAll(".main-nav__link").forEach((link) => {
      const active = new URL(link.href, location.href).pathname === path;
      link.classList.toggle("main-nav__link--active", active);
    });
  };

  const navigate = async (url, push = true) => {
    const target = new URL(url, location.href);
    try {
      const response = await fetch(target.href);
      if (!response.ok) throw new Error("Page unavailable");
      const doc = new DOMParser().parseFromString(await response.text(), "text/html");
      const nextMain = doc.querySelector("main");
      const currentMain = document.querySelector("main");
      if (!nextMain || !currentMain) throw new Error("Page structure unavailable");
      currentMain.replaceWith(nextMain);
      document.title = doc.title;
      document.body.dataset.page = doc.body.dataset.page || "";
      if (push) history.pushState({ portal: true }, "", target.href);
      updateNavigation(target.href);
      document.querySelector(".site-header")?.classList.remove("site-header--menu-open");
      if (target.hash) requestAnimationFrame(() => document.querySelector(target.hash)?.scrollIntoView());
      else scrollTo({ top: 0, behavior: "instant" });
      document.dispatchEvent(new CustomEvent("prywoz:navigation", { detail: { url: target.href } }));
      setState(audio.paused ? "idle" : (audio.muted ? "muted" : "live"));
    } catch {
      location.href = target.href;
    }
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || link.target || link.hasAttribute("download")) return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || !/\.(?:html)?$|\/$/.test(target.pathname)) return;
    if (target.pathname === location.pathname && target.hash) return;
    event.preventDefault();
    navigate(target.href);
  });
  addEventListener("popstate", () => navigate(location.href, false));

  const mount = () => {
    updateNavigation(location.href);
    setState(audio.paused ? "idle" : (audio.muted ? "muted" : "live"), audio.paused ? "Радіо вимкнено" : (audio.muted ? "Без звуку" : "Ефір наживо"));
    updateMetadata();
  };
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", mount, { once: true }); else mount();
  setInterval(updateMetadata, 15000);
})();
