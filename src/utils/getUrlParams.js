function toQueryString(data) {
  const urlSearhParams = new URLSearchParams(data)
  const queryString = urlSearhParams.toString()
  return queryString
}

function getUrlVars() {
  var vars = {}
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value
  })
  return vars
}

export default function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter]
  }
  return urlparameter
}
