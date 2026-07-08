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
