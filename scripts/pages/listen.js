const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");

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

const player = document.querySelector(".listen-player");
const audio = document.querySelector(".listen-player__audio");
const playButton = document.querySelector(".listen-player__play");
const playButtonIcon = document.querySelector(".listen-player__play-icon use");
const volumeButton = document.querySelector(".listen-player__volume");
const volumeButtonIcon = document.querySelector(".listen-player__volume-icon use");
const favoriteButton = document.querySelector(".listen-player__favorite");
const progressRange = document.querySelector(".listen-player__range");
const currentTimeLabel = document.querySelector("[data-listen-current]");
const durationLabel = document.querySelector("[data-listen-duration]");
const title = document.querySelector(".listen-player__title");
const artist = document.querySelector(".listen-player__artist");
const program = document.querySelector(".listen-player__program");
const switchButtons = document.querySelectorAll("[data-listen-action]");
const spritePath = "./assets/icons/lucide-sprite.svg";

const tracks = [
  {
    title: "Любов, братці, любов",
    artist: "Тарас Чубай",
    program: "Програма: Українська хвиля",
  },
  {
    title: "Чорне море сміється",
    artist: "Гурт Prywoz",
    program: "Програма: Одеса в серці",
  },
  {
    title: "Ой у лузі червона калина",
    artist: "Український ефір",
    program: "Програма: Жива хвиля",
  },
];

let currentTrackIndex = 0;

const setIcon = (iconUse, id) => {
  iconUse?.setAttribute("href", `${spritePath}#${id}`);
};

const formatTime = (value) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const updatePlayState = () => {
  const isPlaying = audio && !audio.paused;
  player?.classList.toggle("listen-player--playing", Boolean(isPlaying));
  playButton?.setAttribute("aria-label", isPlaying ? "Поставити ефір на паузу" : "Відтворити ефір");
  setIcon(playButtonIcon, isPlaying ? "pause" : "play");
};

const updateTimeline = () => {
  if (!audio || !progressRange) {
    return;
  }

  const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
  progressRange.max = duration || 100;
  progressRange.value = audio.currentTime || 0;

  if (currentTimeLabel) {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  }

  if (durationLabel) {
    durationLabel.textContent = duration ? formatTime(duration) : "Live";
  }
};

const loadTrack = (direction) => {
  const track = tracks[currentTrackIndex];

  if (title) {
    title.textContent = track.title;
  }

  if (artist) {
    artist.textContent = track.artist;
  }

  if (program) {
    program.textContent = track.program;
  }

  player?.classList.remove("listen-player--switching");
  requestAnimationFrame(() => {
    player?.classList.add("listen-player--switching");
  });

  window.setTimeout(() => {
    player?.classList.remove("listen-player--switching");
  }, 560);

  if (audio) {
    audio.currentTime = 0;
  }

  if (direction && audio && !audio.paused) {
    audio.play().catch(() => updatePlayState());
  }
};

playButton?.addEventListener("click", () => {
  if (!audio) {
    return;
  }

  if (audio.paused) {
    audio.play().catch(() => updatePlayState());
  } else {
    audio.pause();
  }
});

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.listenAction;
    const shift = action === "previous" ? -1 : 1;
    currentTrackIndex = (currentTrackIndex + shift + tracks.length) % tracks.length;
    loadTrack(action);
  });
});

progressRange?.addEventListener("input", () => {
  if (audio) {
    audio.currentTime = Number(progressRange.value);
  }
});

volumeButton?.addEventListener("click", () => {
  if (!audio) {
    return;
  }

  audio.muted = !audio.muted;
  volumeButton.setAttribute("aria-pressed", String(audio.muted));
  volumeButton.setAttribute("aria-label", audio.muted ? "Увімкнути звук" : "Вимкнути звук");
  setIcon(volumeButtonIcon, audio.muted ? "volume-x" : "volume-2");
});

favoriteButton?.addEventListener("click", () => {
  const isActive = favoriteButton.classList.toggle("is-active");
  favoriteButton.setAttribute("aria-label", isActive ? "Прибрати ефір з улюблених" : "Додати ефір в улюблені");
});

audio?.addEventListener("play", updatePlayState);
audio?.addEventListener("pause", updatePlayState);
audio?.addEventListener("ended", updatePlayState);
audio?.addEventListener("loadedmetadata", updateTimeline);
audio?.addEventListener("timeupdate", updateTimeline);

loadTrack();
updateTimeline();
updatePlayState();
