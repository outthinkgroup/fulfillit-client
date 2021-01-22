const requiredFields = [
  "serviceApiKey",
  "emailMarketingService",
  "name",
  "email",
  "status",
]

function allFieldsHaveData(currentCardName, formData) {
  const currentCardData = getFormValues(currentCardName, formData)

  return currentCardData.every(data => data !== "")
}

function getFormValues(card, formData) {
  return Object.keys(formData[card])
    .filter(field => requiredFields.includes(field))
    .map(dataKey => formData[card][dataKey])
}
export { allFieldsHaveData, getFormValues, requiredFields }
