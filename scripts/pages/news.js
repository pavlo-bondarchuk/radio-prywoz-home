const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__menu-toggle");
const menuLinks = document.querySelectorAll(".main-nav__link, .button--header");
const filterButtons = document.querySelectorAll("[data-filter]");
const newsCards = document.querySelectorAll("[data-news-card]");
const newsList = document.querySelector("[data-news-list]");
const showMoreButton = document.querySelector("[data-show-more]");

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
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("news-filter__button--active", item === button);
    });

    newsCards.forEach((card) => {
      const isVisible = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

showMoreButton?.addEventListener("click", () => {
  const isExpanded = newsList?.classList.toggle("news-list--expanded");

  showMoreButton.querySelector("span").textContent = isExpanded ? "Згорнути" : "Показати більше";
});
