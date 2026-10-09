(() => {
  const translations = {
    uk: {
      title: "Для бізнесу та партнерів — PRYWOZ",
      description: "Співпраця з PRYWOZ: розміщення бізнесу, реклама на сайті та в ефірі, партнерські проєкти й авторські матеріали.",
      home: "Головна",
      page: "Для бізнесу та партнерів",
    },
    pl: {
      title: "Dla biznesu i partnerów — PRYWOZ",
      description: "Współpraca z PRYWOZ: prezentacja firmy, reklama na stronie i antenie, partnerstwa oraz materiały eksperckie.",
      home: "Strona główna",
      page: "Dla biznesu i partnerów",
    },
    ru: {
      title: "Для бизнеса и партнеров — PRYWOZ",
      description: "Сотрудничество с PRYWOZ: размещение бизнеса, реклама на сайте и в эфире, партнерские проекты и авторские материалы.",
      home: "Главная",
      page: "Для бизнеса и партнеров",
    },
  };
  const apply = (language) => {
    const copy = translations[language] || translations.uk;
    document.title = copy.title;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = copy.description;
    if (ogTitle) ogTitle.content = copy.title;
    if (ogDescription) ogDescription.content = copy.description;
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) {
      try {
        const graph = JSON.parse(schema.textContent);
        const page = graph['@graph'].find((item) => item['@type'] === 'WebPage');
        const breadcrumb = graph['@graph'].find((item) => item['@type'] === 'BreadcrumbList');
        if (page) page.name = copy.page;
        if (breadcrumb) {
          breadcrumb.itemListElement[0].name = copy.home;
          breadcrumb.itemListElement[1].name = copy.page;
        }
        schema.textContent = JSON.stringify(graph);
      } catch {}
    }
  };
  apply(localStorage.getItem('prywoz-language') || 'uk');
  document.addEventListener('prywoz:languagechange', (event) => apply(event.detail?.language));
})();
