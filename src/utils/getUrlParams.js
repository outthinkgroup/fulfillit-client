export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return params;
}

export default function getUrlParam(parameter, defaultValue = null) {
  const params = getUrlParams();
  if (params.has(parameter)) {
    return params.get(parameter);
  }
  return defaultValue;
}
