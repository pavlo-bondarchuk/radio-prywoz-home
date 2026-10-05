const messages = {
  uk: {
    all: "Усі", lodz: "Лодзь", poland: "Польща", ukraine: "Україна", world: "Світ",
    documents: "Документи", society: "Суспільство", culture: "Культура", sport: "Спорт",
    politics: "Політика", economy: "Економіка", technology: "Технології", health: "Здоров’я", other: "Інше", official: "Офіційні джерела",
    homeTitle: "Головне сьогодні", aggregated: "Агрегована стрічка", todayLead: "Важливі матеріали з Польщі, України та Лодзі — за регіоном і свіжістю.", pageTitle: "Останні новини", pageLead: "Новини Польщі, України, світу та Лодзі з посиланнями на першоджерела.",
    filters: "Фільтри новин", archiveLabel: "Стрічка новин",
    filters: "Фільтри новин", archiveLabel: "Стрічка новин",
    sources: "Джерела", sourcesTitle: "Джерела новин", sourcesLead: "PRYWOZ агрегує заголовки та короткі описи з відкритих RSS/API і завжди веде до оригінального матеріалу.",
    loading: "Завантажуємо новини…", loadingLead: "Матеріали з відкритих джерел із переходом до оригіналу.", loadingSources: "Завантажуємо список джерел…", loadMore: "Завантажити більше",
    readOriginal: "Читати оригінал", rssExcerpt: "Короткий опис із RSS", noExcerpt: "Короткий опис недоступний. Перейдіть до оригінального матеріалу.",
    noNews: "Поки немає новин для цього фільтра.", noSources: "Список джерел тимчасово недоступний.",
    apiError: "Стрічка тимчасово недоступна. Спробуйте ще раз.", retry: "Спробувати ще раз",
    updated: "Оновлено", noUpdate: "Час оновлення невідомий", stale: "Показано останні доступні дані",
    available: "{available} із {total} активних джерел доступні", itemsCount: "Матеріалів: {count}", partial: "Деякі джерела тимчасово недоступні",
    published: "Опубліковано", fetched: "Отримано", source: "Джерело", category: "Рубрика", language: "Мова матеріалу",
    sourceKindOfficial: "Офіційне джерело", sourceKindMedia: "Медіа", statusOk: "Працює", statusStale: "Застарілі дані", statusError: "Помилка", statusDisabled: "Неактивне джерело",
    lastSuccess: "Останнє успішне оновлення", country: "Регіон", type: "Тип джерела", newsCount: "Новин отримано", news_agency: "Інформаційне агентство", publisher: "Медіа", sourceDetails: "Відкрити сайт джерела",
    noSourcesHealth: "Статус ще не отримано", homeEmpty: "Зараз немає матеріалів для вибраної теми.",
    retrying: "Оновлюємо стрічку…", allSourcesFailed: "Джерела тимчасово не відповідають. Показано останні збережені матеріали.",
  },
  pl: {
    all: "Wszystkie", lodz: "Łódź", poland: "Polska", ukraine: "Ukraina", world: "Świat",
    documents: "Dokumenty", society: "Społeczeństwo", culture: "Kultura", sport: "Sport",
    politics: "Polityka", economy: "Gospodarka", technology: "Technologie", health: "Zdrowie", other: "Inne", official: "Źródła oficjalne",
    homeTitle: "Najważniejsze dziś", aggregated: "Zebrane źródła RSS", todayLead: "Ważne materiały z Polski, Ukrainy i Łodzi uporządkowane według regionu i aktualności.", pageTitle: "Najnowsze wiadomości", pageLead: "Wiadomości z Polski, Ukrainy, świata i Łodzi z linkami do źródeł.",
    filters: "Filtry wiadomości", archiveLabel: "Lista wiadomości",
    filters: "Filtry wiadomości", archiveLabel: "Lista wiadomości",
    sources: "Źródła", sourcesTitle: "Źródła wiadomości", sourcesLead: "PRYWOZ agreguje nagłówki i krótkie opisy z otwartych RSS/API i zawsze prowadzi do oryginalnego materiału.",
    loading: "Ładujemy wiadomości…", loadingLead: "Materiały z otwartych źródeł z linkami do oryginałów.", loadingSources: "Ładujemy listę źródeł…", loadMore: "Załaduj więcej",
    readOriginal: "Czytaj oryginał", rssExcerpt: "Krótki opis z RSS", noExcerpt: "Krótki opis jest niedostępny. Przejdź do oryginalnego materiału.",
    noNews: "Brak wiadomości dla tego filtra.", noSources: "Lista źródeł jest chwilowo niedostępna.",
    apiError: "Serwis wiadomości jest chwilowo niedostępny. Spróbuj ponownie.", retry: "Spróbuj ponownie",
    updated: "Aktualizacja", noUpdate: "Czas aktualizacji jest nieznany", stale: "Wyświetlamy ostatnie dostępne dane",
    available: "Dostępne źródła: {available} z {total}", itemsCount: "Materiałów: {count}", partial: "Niektóre źródła są chwilowo niedostępne",
    published: "Opublikowano", fetched: "Pobrano", source: "Źródło", category: "Kategoria", language: "Język materiału",
    sourceKindOfficial: "Źródło oficjalne", sourceKindMedia: "Media", statusOk: "Działa", statusStale: "Nieaktualne dane", statusError: "Błąd", statusDisabled: "Źródło nieaktywne",
    lastSuccess: "Ostatnia udana aktualizacja", country: "Region", type: "Typ źródła", newsCount: "Otrzymane wiadomości", news_agency: "Agencja informacyjna", publisher: "Wydawca medialny", sourceDetails: "Otwórz stronę źródła",
    noSourcesHealth: "Status jeszcze nieznany", homeEmpty: "Brak materiałów dla wybranego tematu.",
    retrying: "Odświeżamy wiadomości…", allSourcesFailed: "Źródła chwilowo nie odpowiadają. Wyświetlamy ostatnio zapisane materiały.",
  },
  ru: {
    all: "Все", lodz: "Лодзь", poland: "Польша", ukraine: "Украина", world: "Мир",
    documents: "Документы", society: "Общество", culture: "Культура", sport: "Спорт",
    politics: "Политика", economy: "Экономика", technology: "Технологии", health: "Здоровье", other: "Другое", official: "Официальные источники",
    homeTitle: "Главное сегодня", aggregated: "Агрегированная лента", todayLead: "Важные материалы из Польши, Украины и Лодзи с учётом региона и свежести.", pageTitle: "Последние новости", pageLead: "Новости Польши, Украины, мира и Лодзи со ссылками на первоисточники.",
    filters: "Фильтры новостей", archiveLabel: "Лента новостей",
    filters: "Фильтры новостей", archiveLabel: "Лента новостей",
    sources: "Источники", sourcesTitle: "Источники новостей", sourcesLead: "PRYWOZ собирает заголовки и короткие описания из открытых RSS/API и всегда ведёт к оригинальному материалу.",
    loading: "Загружаем новости…", loadingLead: "Материалы из открытых источников со ссылками на оригиналы.", loadingSources: "Загружаем список источников…", loadMore: "Загрузить ещё",
    readOriginal: "Читать оригинал", rssExcerpt: "Краткое описание из RSS", noExcerpt: "Краткое описание недоступно. Перейдите к оригинальному материалу.",
    noNews: "Для этого фильтра пока нет новостей.", noSources: "Список источников временно недоступен.",
    apiError: "Лента временно недоступна. Попробуйте ещё раз.", retry: "Попробовать ещё раз",
    updated: "Обновлено", noUpdate: "Время обновления неизвестно", stale: "Показаны последние доступные данные",
    available: "Доступно активных источников: {available} из {total}", itemsCount: "Материалов: {count}", partial: "Некоторые источники временно недоступны",
    published: "Опубликовано", fetched: "Получено", source: "Источник", category: "Рубрика", language: "Язык материала",
    sourceKindOfficial: "Официальный источник", sourceKindMedia: "СМИ", statusOk: "Работает", statusStale: "Устаревшие данные", statusError: "Ошибка", statusDisabled: "Источник выключен",
    lastSuccess: "Последнее успешное обновление", country: "Регион", type: "Тип источника", newsCount: "Получено новостей", news_agency: "Информационное агентство", publisher: "СМИ", sourceDetails: "Открыть сайт источника",
    noSourcesHealth: "Статус пока неизвестен", homeEmpty: "Сейчас нет материалов по выбранной теме.",
    retrying: "Обновляем ленту…", allSourcesFailed: "Источники временно не отвечают. Показаны последние сохранённые материалы.",
  },
};

export const getNewsLanguage = () => {
  try {
    const stored = localStorage.getItem("prywoz-language") || document.cookie.split("; ").find((item) => item.startsWith("prywoz-language="))?.split("=").slice(1).join("=");
    const value = stored ? decodeURIComponent(stored) : "";
    return messages[value] ? value : "uk";
  } catch {
    return "uk";
  }
};

export const newsText = (key, language = getNewsLanguage(), values = {}) => {
  let text = messages[language]?.[key] || messages.uk[key] || key;
  Object.entries(values).forEach(([name, value]) => {
    text = text.replaceAll("{" + name + "}", String(value));
  });
  return text;
};

export const newsLocale = (language = getNewsLanguage()) => ({ uk: "uk-UA", pl: "pl-PL", ru: "ru-RU" }[language] || "uk-UA");
