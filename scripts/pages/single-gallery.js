const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector(".lightbox__image");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const photoButtons = document.querySelectorAll("[data-lightbox-image]");
const copyGalleryButton = document.querySelector("[data-copy-gallery]");

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
      lightbox?.setAttribute("hidden", "");
    }
  });
}

photoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = button.dataset.lightboxImage;
    lightboxImage.alt = button.querySelector("img")?.alt || "";
    lightbox.removeAttribute("hidden");
  });
});

lightboxClose?.addEventListener("click", () => {
  lightbox?.setAttribute("hidden", "");
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.setAttribute("hidden", "");
  }
});

copyGalleryButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyGalleryButton.querySelector("span").textContent = "Посилання скопійовано";
  } catch {
    copyGalleryButton.querySelector("span").textContent = "Не вдалося скопіювати";
  }
});
