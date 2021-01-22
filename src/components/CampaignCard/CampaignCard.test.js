import React from "react"

import renderer from "react-test-renderer"
import CampaignCard from "./CampaignCard"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { TestWrapper } from "../../apollo/wrap-root-element"

describe("CampaignCard", () => {
  let props = {
    id: "2",
    status: "Publish",
    date: "2020-12-15T18:32:55",
    email: "ronlieber",
    campaignOptions: {
      description: null,
      emailMarketingService: "mailchimp",
      name: "College Pre-order receipts",
    },
  }

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <CampaignCard {...props} />
        </TestWrapper>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("shows options", () => {
    const Comp = () => (
      <TestWrapper>
        <CampaignCard {...props} />
      </TestWrapper>
    )

    render(<Comp />)
    fireEvent.click(screen.getByTestId("option-btn"))

    expect(screen.getByTestId("actions-wrapper").childElementCount).toBe(3)
  })
})
