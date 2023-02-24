const requiredFields = [
  "serviceApiKey",
  "emailMarketingService",
  "name",
  "email",
  "status",
]

// this is a place to add required fields that
// only pertain to a specific emailMarketingService
const EmailServiceRequiredFields = {
  convertkit:[
    "servicePublicKey",
  ],
}

function allFieldsHaveData(currentCardName, formData) {
  const currentCardData = getFormValues(currentCardName, formData)

  return currentCardData.every(data => data !== "")
}

function getFormValues(card, formData) {
  const emailService = formData?.mailservice?.emailMarketingService 
  return Object.keys(formData[card])
    .filter(field => requiredFields.includes(field))
    .map(dataKey => formData[card][dataKey])
}

function checkEmailServiceRequiredFields(service, field){
  if(!service) return true;
  if(!EmailServiceRequiredFields.hasOwnProperty(service)) return true

  return EmailServiceRequiredFields[service].includes(field)
}

export { allFieldsHaveData, getFormValues, requiredFields }
