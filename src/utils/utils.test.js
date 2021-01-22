import {
  allFieldsHaveData,
  getFormValues,
  requiredFields,
} from "./formValidation"

describe("form Validation: getFormValues", () => {
  it("should only check required fields", () => {
    const card = "general"
    const formData = {
      general: {
        name: "test",
        email: "test@gmail.com",
        description: "",
      },
    }
    const currentCardData = getFormValues(card, formData)
    expect(currentCardData).toEqual(["test", "test@gmail.com"])
  })
})
describe("allFieldsHaveData", () => {
  it("should return false if required field is empty", () => {
    const card = "general"
    const formData = {
      general: {
        name: "test",
        email: "",
        description: "",
      },
    }
    expect(allFieldsHaveData(card, formData)).toBe(false)
  })

  it("should return true if all required fields have data", () => {
    const card = "general"
    const formData = {
      general: {
        name: "test",
        email: "email@email.com",
        description: "",
      },
    }
    expect(allFieldsHaveData(card, formData)).toBe(true)
  })
})
