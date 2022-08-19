import React from "react"
import styled from "styled-components"

import { PageHeading } from "../../designSystem/styles"
import NewCampaignWizard from "../CampaignForms/NewCampaignWizard/NewCampaignWizard"

const NewCampaign = ({ className }) => {
  return (
    <div className={className}>
      <PageHeading>
        <h1>New Campaign</h1>
        <p>Follow the prompts to create a new Campaign</p>
      </PageHeading>
      {<NewCampaignWizard />}
    </div>
  )
}

export default styled(NewCampaign)`
  max-width: 650px;
`
