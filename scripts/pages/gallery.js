const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const filterButtons = document.querySelectorAll("[data-gallery-filter]");
const galleryGrid = document.querySelector("[data-gallery-grid]");
const galleryCards = galleryGrid ? Array.from(galleryGrid.querySelectorAll("[data-gallery-card]")) : [];
const sortSelect = document.querySelector("[data-gallery-sort]");
const moreButton = document.querySelector("[data-gallery-more]");

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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.galleryFilter;

    filterButtons.forEach((item) => {
      item.classList.toggle("gallery-filter__button--active", item === button);
    });

    galleryCards.forEach((card) => {
      const isVisible = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

sortSelect?.addEventListener("change", () => {
  const sortedCards = [...galleryCards].sort((first, second) => {
    if (sortSelect.value === "popular") {
      return Number(second.dataset.popular) - Number(first.dataset.popular);
    }

    if (sortSelect.value === "photos") {
      return Number(second.dataset.photos) - Number(first.dataset.photos);
    }

    return new Date(second.dataset.date) - new Date(first.dataset.date);
  });

  sortedCards.forEach((card) => galleryGrid?.append(card));
});

moreButton?.addEventListener("click", () => {
  moreButton.querySelector("span").textContent = "Усі фото завантажені";
  moreButton.disabled = true;
});
