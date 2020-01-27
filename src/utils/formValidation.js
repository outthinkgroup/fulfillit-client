function allFieldsHaveData(currentCardName, formData) {
  const currentCardData = getFormValues(currentCardName, formData);

  return currentCardData.every(data => data !== "");
}
function getFormValues(card, formData) {
  return Object.keys(formData[card]).map(dataKey => formData[card][dataKey]);
}

export { allFieldsHaveData };
