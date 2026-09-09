export function hardNavigate(path) {
  window.location.href = `${window.location.origin}${path}`;
}

export function renderCampaignEmail(email) {
  return `${email}@sendmagnet.com`;
}

export const wp_url =
  import.meta.env.VITE_GQL_URI ||
  (import.meta.env.DEV ? "http://sendmagnet.local" : "https://sendmagnet.com");
