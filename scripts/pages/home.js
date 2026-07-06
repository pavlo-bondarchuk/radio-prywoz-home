const player = document.querySelector(".live-player");
const audio = document.querySelector(".live-player__audio");
const playButton = document.querySelector(".live-player__play");
const volumeRange = document.querySelector(".live-player__volume-range");

if (player && audio && playButton && volumeRange) {
  audio.volume = Number(volumeRange.value);

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
    playButton.setAttribute("aria-label", "Поставити ефір на паузу");
  });

  audio.addEventListener("pause", () => {
    player.classList.remove("live-player--playing");
    playButton.setAttribute("aria-label", "Відтворити ефір");
  });

  volumeRange.addEventListener("input", () => {
    audio.volume = Number(volumeRange.value);
  });
}
