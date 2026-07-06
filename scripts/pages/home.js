const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const player = document.querySelector(".live-player");
const audio = document.querySelector(".live-player__audio");
const playButton = document.querySelector(".live-player__play");
const playButtonIcon = document.querySelector(".live-player__play-icon use");
const volumeRange = document.querySelector(".live-player__volume-range");
const trackTitle = document.querySelector(".live-player__track");
const trackHost = document.querySelector(".live-player__host");
const trackControls = document.querySelectorAll(".live-player__control[data-action]");

if (header && menuToggle) {
  const setMenuState = (isOpen) => {
    header.classList.toggle("site-header--menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
  };

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

if (player && audio && playButton && volumeRange) {
  const iconPath = "./assets/icons/lucide-sprite.svg";
  const tracks = [
    {
      title: "Любов, братці, любов",
      host: "Тарас Чубай",
    },
    {
      title: "Чорне море сміється",
      host: "Radio Prywoz",
    },
    {
      title: "Ой у лузі червона калина",
      host: "Український ефір",
    },
  ];
  let activeTrackIndex = 0;
  let switchTimeout;

  audio.volume = Number(volumeRange.value);

  const updateTrack = () => {
    if (!trackTitle || !trackHost) {
      return;
    }

    trackTitle.textContent = tracks[activeTrackIndex].title;
    trackHost.textContent = tracks[activeTrackIndex].host;
  };

  const switchTrack = (direction) => {
    window.clearTimeout(switchTimeout);
    player.classList.remove("live-player--switching");
    void player.offsetWidth;
    player.classList.add("live-player--switching");

    activeTrackIndex =
      (activeTrackIndex + (direction === "next" ? 1 : -1) + tracks.length) % tracks.length;

    window.setTimeout(updateTrack, 320);
    switchTimeout = window.setTimeout(() => {
      player.classList.remove("live-player--switching");
    }, 820);
  };

  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        player.classList.remove("live-player--playing");
      }
      return;
    }

    audio.pause();
  });

  audio.addEventListener("play", () => {
    player.classList.add("live-player--playing");
    playButtonIcon?.setAttribute("href", `${iconPath}#pause`);
    playButton.setAttribute("aria-label", "Поставити ефір на паузу");
  });

  audio.addEventListener("pause", () => {
    player.classList.remove("live-player--playing");
    playButtonIcon?.setAttribute("href", `${iconPath}#play`);
    playButton.setAttribute("aria-label", "Відтворити ефір");
  });

  volumeRange.addEventListener("input", () => {
    audio.volume = Number(volumeRange.value);
  });

  trackControls.forEach((control) => {
    control.addEventListener("click", () => {
      switchTrack(control.dataset.action === "next" ? "next" : "previous");
    });
  });
}
