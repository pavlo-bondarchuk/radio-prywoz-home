import { getNewsLanguage, newsLocale, newsText } from "./news-i18n.js?v=20261010-videos1";
import { newsVideos } from "./news-videos.js?v=20261010-videos1";

const shelf = document.querySelector("[data-news-video-shelf]");
const track = shelf?.querySelector("[data-news-video-track]");
const tag = shelf?.querySelector("[data-news-video-tag]");
const titlePlaceholder = shelf?.querySelector("[data-news-video-title-placeholder]");
const floatingLabel = shelf?.querySelector("[data-news-video-label-floating]");
const sectionLabel = shelf?.querySelector("[data-news-video-label-section]");
const previousButton = shelf?.querySelector("[data-news-video-prev]");
const nextButton = shelf?.querySelector("[data-news-video-next]");
const seenKey = "prywoz-video-shelf-seen";
const supportedLanguages = ["uk", "pl", "ru"];
const safeHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
const videos = newsVideos.filter((video) => video?.enabled && safeHttpsUrl(video.url) && safeHttpsUrl(video.thumbnail) && video.title && video.id);

if (shelf && track && tag && titlePlaceholder && floatingLabel && sectionLabel && videos.length) {
  shelf.hidden = false;
  let language = getNewsLanguage();
  let morphFrame = 0;
  let lastProgress = -1;
  let completed = false;
  let shelfViewed = false;
  let observer;
  let cookieObserver;
  let floatingOrigin;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

  const analytics = (name, video, position) => {
    if (!window.prywozAnalytics?.push) return;
    try {
      if (localStorage.getItem("prywoz-analytics-consent") !== "accepted") return;
    } catch {
      return;
    }
    window.prywozAnalytics.push(name, { video_id: video.id, source: "ukrinform", position });
  };

  const videoTitle = (video) => video.title[language] || video.title.uk;
  const videoSource = (video) => video.source?.[language] || video.source?.uk || "Ukrinform";
  const formatDate = (value) => {
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat(newsLocale(language), { day: "numeric", month: "short", year: "numeric" }).format(date);
  };

  const render = () => {
    floatingLabel.textContent = newsText("videoTag", language);
    sectionLabel.textContent = newsText("videoTitle", language);
    shelf.querySelector("[data-news-copy='videoLead']")?.replaceChildren(document.createTextNode(newsText("videoLead", language)));
    track.setAttribute("aria-label", newsText("videoShelf", language));
    previousButton.setAttribute("aria-label", newsText("videoPrevious", language));
    previousButton.title = newsText("videoPrevious", language);
    nextButton.setAttribute("aria-label", newsText("videoNext", language));
    nextButton.title = newsText("videoNext", language);

    const cards = videos.map((video, index) => {
      const item = document.createElement("li");
      item.className = `news-video__card${video.featured ? " news-video__card--featured" : ""}`;
      item.dataset.videoId = video.id;
      const link = document.createElement("a");
      link.className = "news-video__link";
      link.href = video.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.dataset.videoPosition = String(index + 1);
      link.setAttribute("aria-label", `${videoTitle(video)} — ${videoSource(video)}, ${newsText("published", language).toLocaleLowerCase(language)}, ${formatDate(video.publishedAt)}`);

      const preview = document.createElement("span");
      preview.className = "news-video__preview";
      const image = document.createElement("img");
      image.src = video.thumbnail;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.width = 480;
      image.height = 360;
      preview.append(image);
      const play = document.createElement("span");
      play.className = "news-video__play";
      play.setAttribute("aria-hidden", "true");
      play.textContent = "▶";
      preview.append(play);

      const body = document.createElement("span");
      body.className = "news-video__content";
      if (video.featured) {
        const badge = document.createElement("span");
        badge.className = "news-video__featured";
        badge.textContent = newsText("videoFeatured", language);
        body.append(badge);
      }
      const heading = document.createElement("span");
      heading.className = "news-video__card-title";
      heading.textContent = videoTitle(video);
      body.append(heading);
      const metadata = document.createElement("span");
      metadata.className = "news-video__meta";
      const source = document.createElement("span");
      source.className = "news-video__source";
      source.textContent = videoSource(video) || newsText("source", language);
      metadata.append(source);
      const date = formatDate(video.publishedAt);
      if (date) {
        const published = document.createElement("time");
        published.className = "news-video__date";
        published.dateTime = video.publishedAt;
        published.textContent = date;
        metadata.append(published);
      }
      body.append(metadata);
      link.append(preview, body);
      item.append(link);
      return item;
    });
    track.replaceChildren(...cards);
    previousButton.hidden = videos.length < 2;
    nextButton.hidden = videos.length < 2;
    if (observer) observer.disconnect();
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (shelfViewed || !entries.some((entry) => entry.isIntersecting)) return;
        shelfViewed = true;
        analytics("video_shelf_view", videos[0], 1);
        observer.disconnect();
      }, { threshold: 0.25 });
      observer.observe(shelf);
    }
    applyTagLanguage();
  };

  const applyTagLanguage = () => {
    if (completed || reducedMotion?.matches) {
      floatingLabel.hidden = true;
      sectionLabel.hidden = false;
      tag.setAttribute("aria-label", newsText("videoTitle", language));
    } else {
      floatingLabel.hidden = false;
      sectionLabel.hidden = true;
      tag.setAttribute("aria-label", newsText("videoOpen", language));
    }
  };

  const cookieBannerVisible = () => {
    const banner = document.querySelector("[data-cookie-consent]");
    if (!banner || banner.hidden) return false;
    const style = window.getComputedStyle(banner);
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0;
  };

  const finishMorph = () => {
    completed = true;
    tag.classList.remove("is-floating");
    tag.classList.remove("is-morphing");
    tag.classList.add("is-settled");
    tag.style.removeProperty("--news-video-dx");
    tag.style.removeProperty("--news-video-dy");
    tag.style.removeProperty("--news-video-scale");
    tag.style.removeProperty("--news-video-morph-progress");
    tag.style.removeProperty("visibility");
    floatingLabel.hidden = true;
    sectionLabel.hidden = false;
    tag.setAttribute("aria-label", newsText("videoTitle", language));
    try { localStorage.setItem(seenKey, "1"); } catch { /* Optional preference only. */ }
    window.removeEventListener("scroll", scheduleMorph);
    window.removeEventListener("resize", scheduleMorph);
    cookieObserver?.disconnect();
  };

  const updateMorph = () => {
    morphFrame = 0;
    if (completed || reducedMotion?.matches) return;
    if (cookieBannerVisible()) {
      tag.style.visibility = "hidden";
      return;
    }
    tag.style.removeProperty("visibility");
    const sectionRect = shelf.getBoundingClientRect();
    const targetRect = titlePlaceholder.getBoundingClientRect();
    if (sectionRect.bottom <= 0) {
      finishMorph();
      return;
    }
    if (sectionRect.top > window.innerHeight * 0.95) {
      tag.classList.add("is-floating");
      tag.style.setProperty("--news-video-morph-progress", "0");
      floatingOrigin = tag.getBoundingClientRect();
      lastProgress = 0;
      return;
    }
    const start = window.innerHeight * 0.95;
    const end = Math.max(48, window.innerHeight * 0.32);
    const progress = Math.min(1, Math.max(0, (start - sectionRect.top) / (start - end)));
    if (progress >= 1) {
      finishMorph();
      return;
    }
    if (progress === lastProgress) return;
    lastProgress = progress;
    if (!floatingOrigin) floatingOrigin = tag.getBoundingClientRect();
    tag.style.setProperty("--news-video-dx", `${targetRect.left - floatingOrigin.left}px`);
    tag.style.setProperty("--news-video-dy", `${targetRect.top - floatingOrigin.top}px`);
    tag.style.setProperty("--news-video-scale", String(Math.max(0, targetRect.width / Math.max(1, floatingOrigin.width) - 1)));
    tag.classList.add("is-morphing");
    tag.style.setProperty("--news-video-morph-progress", String(progress));
    tag.style.setProperty("--video-morph", String(progress));
  };

  function scheduleMorph() {
    if (!morphFrame) morphFrame = window.requestAnimationFrame(updateMorph);
  }

  const scrollOneCard = (direction) => {
    const card = track.querySelector(".news-video__card");
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: reducedMotion?.matches ? "auto" : "smooth" });
  };

  previousButton.addEventListener("click", () => scrollOneCard(-1));
  nextButton.addEventListener("click", () => scrollOneCard(1));
  track.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-video-position]");
    if (!link) return;
    const index = Number(link.dataset.videoPosition) - 1;
    const video = videos[index];
    if (video) analytics("video_open", video, index + 1);
  });
  track.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollOneCard(event.key === "ArrowRight" ? 1 : -1);
  });
  let pointerStartX = 0;
  let pointerStartScroll = 0;
  let pointerDragging = false;
  let suppressClick = false;
  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    pointerStartX = event.clientX;
    pointerStartScroll = track.scrollLeft;
    pointerDragging = false;
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener("pointermove", (event) => {
    if (!track.hasPointerCapture(event.pointerId) || event.pointerType !== "mouse") return;
    const deltaX = event.clientX - pointerStartX;
    if (Math.abs(deltaX) > 4) pointerDragging = true;
    if (pointerDragging) {
      track.scrollLeft = pointerStartScroll - deltaX;
      event.preventDefault();
    }
  });
  const endPointerDrag = (event) => {
    if (event.pointerType !== "mouse" || !track.hasPointerCapture(event.pointerId)) return;
    if (pointerDragging) {
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    }
    pointerDragging = false;
    track.releasePointerCapture(event.pointerId);
  };
  track.addEventListener("pointerup", endPointerDrag);
  track.addEventListener("pointercancel", endPointerDrag);
  track.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  render();
  let alreadySeen = false;
  try { alreadySeen = localStorage.getItem(seenKey) === "1"; } catch { /* Optional preference only. */ }
  if (alreadySeen || reducedMotion?.matches) {
    completed = true;
    tag.classList.add("is-settled");
    applyTagLanguage();
  } else {
    tag.classList.add("is-floating");
    if (cookieBannerVisible()) tag.style.visibility = "hidden";
    window.addEventListener("scroll", scheduleMorph, { passive: true });
    window.addEventListener("resize", scheduleMorph, { passive: true });
    cookieObserver = new MutationObserver(scheduleMorph);
    const cookie = document.querySelector("[data-cookie-consent]");
    cookieObserver.observe(document.body, { subtree: true, childList: true });
    if (cookie) cookieObserver.observe(cookie, { attributes: true, attributeFilter: ["hidden", "style", "class"] });
    scheduleMorph();
  }
  document.addEventListener("prywoz:languagechange", (event) => {
    language = supportedLanguages.includes(event.detail?.language) ? event.detail.language : getNewsLanguage();
    render();
    scheduleMorph();
  });
  reducedMotion?.addEventListener?.("change", (event) => {
    if (!event.matches || completed) return;
    if (morphFrame) window.cancelAnimationFrame(morphFrame);
    morphFrame = 0;
    window.removeEventListener("scroll", scheduleMorph);
    window.removeEventListener("resize", scheduleMorph);
    tag.classList.remove("is-floating");
    tag.classList.remove("is-morphing");
    tag.classList.add("is-settled");
    tag.style.cssText = "";
    completed = true;
    applyTagLanguage();
  });
}
