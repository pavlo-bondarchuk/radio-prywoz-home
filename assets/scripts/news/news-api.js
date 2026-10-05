let pendingRequest = null;
let cachedResponse = null;
let cachedAt = 0;

const endpoint = new URL("../../../api/news.php?action=feed", import.meta.url);

export const getNews = ({ refresh = false, timeoutMs = 20_000 } = {}) => {
  if (pendingRequest) return pendingRequest;
  if (!refresh && cachedResponse && Date.now() - cachedAt < 30_000) {
    return Promise.resolve(cachedResponse);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  pendingRequest = fetch(endpoint, { cache: "no-store", headers: { Accept: "application/json" }, signal: controller.signal })
    .then(async (response) => {
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }
      if (!response.ok) {
        const error = new Error(data.error || "News feed unavailable");
        error.data = data;
        throw error;
      }
      if (!data || !Array.isArray(data.items)) {
        const error = new Error("Invalid news response");
        error.data = data || {};
        throw error;
      }
      cachedResponse = data;
      cachedAt = Date.now();
      return data;
    })
    .finally(() => {
      clearTimeout(timeout);
      pendingRequest = null;
    });

  return pendingRequest;
};
