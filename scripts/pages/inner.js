const iconPath = "./assets/icons/lucide-sprite.svg";
const page = document.body.dataset.page || "";
const savedLanguage = localStorage.getItem("prywoz-language") || "uk";

const shell = document.querySelector("[data-site-header]");
if (shell) {
  shell.innerHTML = `<div class="container site-header__inner portal-header">
    <a class="logo" href="./index.html"><span class="logo__mark"><svg class="icon"><use href="${iconPath}#radio-tower"></use></svg></span><span class="logo__text"><span class="logo__name">РАДИО ПРИВОЗ ФМ</span><span class="logo__description">Перше українське<br>радіо в Польщі</span></span></a>
    <div class="portal-local-time"><span class="portal-local-time__icon"><svg class="icon"><use href="${iconPath}#clock"></use></svg></span><div><strong>Лодзь · <time data-local-time>--:--</time></strong><span data-local-date>Локальний час</span></div></div>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Змінити тему"><svg class="icon theme-toggle__icon theme-toggle__icon--sun"><use href="${iconPath}#sun"></use></svg><svg class="icon theme-toggle__icon theme-toggle__icon--moon"><use href="${iconPath}#moon"></use></svg></button>
    <div class="language-switcher" aria-label="Мова"><button class="language-switcher__item" data-language="uk">UA</button><button class="language-switcher__item" data-language="pl">PL</button><button class="language-switcher__item" data-language="ru">RU</button></div>
    <button class="site-header__menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"><svg class="icon site-header__menu-icon site-header__menu-icon--open"><use href="${iconPath}#menu"></use></svg><svg class="icon site-header__menu-icon site-header__menu-icon--close"><use href="${iconPath}#x"></use></svg></button>
  </div><div class="site-header__panel" id="mobile-menu"><div class="container portal-nav-row"><nav class="main-nav">
    <a class="main-nav__link ${page === "home" ? "main-nav__link--active" : ""}" href="./index.html">Головна</a><a class="main-nav__link ${page === "listen" ? "main-nav__link--active" : ""}" href="./listen.html">Ефір</a><a class="main-nav__link ${page === "news" ? "main-nav__link--active" : ""}" href="./news.html">Новини</a><a class="main-nav__link ${page === "services" ? "main-nav__link--active" : ""}" href="./services.html">Послуги в Лодзі</a><a class="main-nav__link ${page === "business" ? "main-nav__link--active" : ""}" href="./business.html">Бізнес</a><a class="main-nav__link ${page === "programs" ? "main-nav__link--active" : ""}" href="./programs.html">Програми</a><a class="main-nav__link ${page === "about" ? "main-nav__link--active" : ""}" href="./about.html">Про нас</a><a class="main-nav__link ${page === "contacts" ? "main-nav__link--active" : ""}" href="./contacts.html">Контакти</a><a class="main-nav__link ${page === "card" ? "main-nav__link--active" : ""}" href="./index.html#card">Картка</a>
  </nav></div></div>`;
}

document.body.insertAdjacentHTML("beforeend", `<footer class="site-footer"><div class="container site-footer__grid"><div><strong>РАДИО ПРИВОЗ ФМ</strong><p class="site-footer__about">Українське радіо та корисний портал у Польщі.</p></div><div class="footer-contacts"><h2 class="footer-contacts__title">Контакти</h2><a class="footer-contacts__link" href="mailto:hello@prywoz.fm"><svg class="icon"><use href="${iconPath}#mail"></use></svg><span>hello@prywoz.fm</span></a><a class="footer-contacts__link" href="tel:+48799123456"><svg class="icon"><use href="${iconPath}#phone"></use></svg><span>+48 799 123 456</span></a></div><div class="footer-contacts"><h2 class="footer-contacts__title">Інформація</h2><a class="footer-contacts__link" href="./about.html">Про нас</a><a class="footer-contacts__link" href="./contacts.html">Зв’язок</a><a class="footer-contacts__link" href="./privacy.html">Політика приватності</a></div></div><div class="container site-footer__bottom"><p>© 2026 РАДИО ПРИВОЗ ФМ. Усі права захищено.</p></div></footer>`);

const renderTime = () => {
  const now = new Date();
  const time = document.querySelector("[data-local-time]");
  const date = document.querySelector("[data-local-date]");
  if (time) time.textContent = new Intl.DateTimeFormat("uk-UA", { timeZone:"Europe/Warsaw", hour:"2-digit", minute:"2-digit" }).format(now);
  if (date) date.textContent = new Intl.DateTimeFormat("uk-UA", { timeZone:"Europe/Warsaw", weekday:"short", day:"numeric", month:"long" }).format(now);
};

const applyLanguage = (language) => {
  const lang = ["uk","pl","ru"].includes(language) ? language : "uk";
  localStorage.setItem("prywoz-language", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-uk]").forEach((node) => { node.textContent = node.dataset[lang] || node.dataset.uk; });
  document.querySelectorAll("[data-language]").forEach((button) => { const active=button.dataset.language===lang; button.classList.toggle("language-switcher__item--active",active); button.setAttribute("aria-current",String(active)); });
};

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("prywoz-theme", theme);
});
document.querySelectorAll("[data-language]").forEach((button)=>button.addEventListener("click",()=>applyLanguage(button.dataset.language)));
const header=document.querySelector(".site-header"); const menu=document.querySelector(".site-header__menu-toggle");
menu?.addEventListener("click",()=>{const open=header.classList.toggle("site-header--menu-open");menu.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".main-nav__link").forEach((link)=>link.addEventListener("click",()=>header?.classList.remove("site-header--menu-open")));
renderTime(); setInterval(renderTime,30000); applyLanguage(savedLanguage);

const audio=document.querySelector("[data-inner-audio]"); const play=document.querySelector("[data-inner-play]");
play?.addEventListener("click",async()=>{ if(!audio)return; if(audio.paused){try{await audio.play();play.setAttribute("aria-pressed","true");play.querySelector("use")?.setAttribute("href",`${iconPath}#pause`);}catch{play.dataset.error="true";}}else{audio.pause();play.setAttribute("aria-pressed","false");play.querySelector("use")?.setAttribute("href",`${iconPath}#play`);}});

const updateOnAir = async () => {
  const title = document.querySelector(".live-player__track");
  const meta = document.querySelector(".live-player__host");
  if (!title || !meta) return;
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone:"Europe/Warsaw", hour:"2-digit", hour12:false }).format(new Date()));
  meta.textContent = hour >= 10 && hour < 20 ? "Денний ефір · 10:00–20:00" : "Нічний ефір · 20:00–10:00";
  try {
    const response = await fetch("https://myradio24.com/users/73556/status.json", { cache:"no-store" });
    if (!response.ok) return;
    const status = await response.json();
    const current = status.song || [status.artist, status.songtitle].filter(Boolean).join(" — ");
    if (current && current !== "-") title.textContent = current;
  } catch { /* The station name remains visible while metadata is unavailable. */ }
};
updateOnAir(); setInterval(updateOnAir,15000);

const newsRoot=document.querySelector("[data-inner-news]");
if(newsRoot){let items=[],shown=9,filter="all";const country=x=>/uokik|gus|gov\.pl|\.pl\//i.test(`${x.source} ${x.originalUrl}`)?"poland":"ukraine";const draw=()=>{const filtered=filter==="all"?items:items.filter(x=>x.category===filter||country(x)===filter);newsRoot.innerHTML=filtered.slice(0,shown).map(x=>`<article><div><h2>${x.title}</h2><p>${x.excerpt||""}</p><small>${x.source||""}</small></div><a href="${x.originalUrl||x.url}" target="_blank" rel="noopener">Джерело →</a></article>`).join("")||"<p>У цій категорії поки немає матеріалів.</p>";document.querySelector("[data-news-more]").hidden=shown>=filtered.length;};fetch("./assets/data/news-cache.json").then(r=>{if(!r.ok)throw new Error();return r.json();}).then(data=>{items=Array.isArray(data)?data:(data.items||[]);draw();}).catch(()=>{newsRoot.innerHTML="<p>Не вдалося завантажити стрічку. Спробуйте оновити сторінку.</p>";});document.querySelectorAll("[data-news-filter]").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.newsFilter;shown=9;document.querySelectorAll("[data-news-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));draw();}));document.querySelector("[data-news-more]")?.addEventListener("click",()=>{shown+=9;draw();});}
