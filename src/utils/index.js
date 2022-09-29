export function hardNavigate(path) {
  window.location.href = `${window.location.origin}${path}`
}

export function renderCampaignEmail(email){
  return `${email}@sendmagnet.com` 
}
