const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const player = document.querySelector(".live-player");
const audio = document.querySelector(".live-player__audio");
const playButton = document.querySelector(".live-player__play");
const playButtonIcon = document.querySelector(".live-player__play-icon use");
const volumeButton = document.querySelector(".live-player__volume");
const volumeButtonIcon = document.querySelector(".live-player__volume use");
const trackTitle = document.querySelector(".live-player__track");
const trackHost = document.querySelector(".live-player__host");
const trackControls = document.querySelectorAll(".live-player__control[data-action]");
const mediaHolder = document.querySelector(".live-player__record");
const mediaImage = document.querySelector(".live-player__record-image");
const eventSlider = document.querySelector("[data-event-slider]");

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

if (player && audio && playButton && volumeButton) {
  const iconPath = "./assets/icons/lucide-sprite.svg";
  const tracks = [
    {
      title: "Любов, братці, любов",
      host: "Тарас Чубай",
      media: {
        type: "vinyl",
        src: "./assets/images/home/player-vinyl.png",
      },
    },
    {
      title: "Чорне море сміється",
      host: "Radio Prywoz",
      media: {
        type: "cd",
        src: "./assets/images/home/player-cd.png",
      },
    },
  ];
  let activeTrackIndex = 0;
  let switchTimeout;

  audio.volume = 0.7;

  const updateVolumeState = () => {
    const isMuted = audio.muted;

    volumeButton.setAttribute("aria-pressed", String(isMuted));
    volumeButton.setAttribute("aria-label", isMuted ? "Увімкнути звук" : "Вимкнути звук");
    volumeButtonIcon?.setAttribute("href", `${iconPath}#${isMuted ? "volume-x" : "volume-2"}`);
  };

  const updateTrack = () => {
    if (!trackTitle || !trackHost || !mediaHolder || !mediaImage) {
      return;
    }

    const activeTrack = tracks[activeTrackIndex];

    trackTitle.textContent = activeTrack.title;
    trackHost.textContent = activeTrack.host;
    mediaImage.src = activeTrack.media.src;
    mediaHolder.classList.remove(
      "live-player__record--vinyl",
      "live-player__record--cd",
    );
    mediaHolder.classList.add(`live-player__record--${activeTrack.media.type}`);
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
        document.body.classList.remove("page--audio-focus");
      }
      return;
    }

    audio.pause();
  });

  audio.addEventListener("play", () => {
    document.body.classList.add("page--audio-focus");
    player.classList.add("live-player--playing");
    playButtonIcon?.setAttribute("href", `${iconPath}#pause`);
    playButton.setAttribute("aria-label", "Поставити ефір на паузу");
  });

  audio.addEventListener("pause", () => {
    document.body.classList.remove("page--audio-focus");
    player.classList.remove("live-player--playing");
    playButtonIcon?.setAttribute("href", `${iconPath}#play`);
    playButton.setAttribute("aria-label", "Відтворити ефір");
  });

  volumeButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateVolumeState();
  });

  updateVolumeState();

  trackControls.forEach((control) => {
    control.addEventListener("click", () => {
      switchTrack(control.dataset.action === "next" ? "next" : "previous");
    });
  });
}

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

  window.addEventListener("resize", () => {
    buildEventLoop();
  });

  buildEventLoop();
}
