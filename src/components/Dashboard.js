import React, { useState } from "react"
import styled from "styled-components"

import { PageHeading } from "../designSystem/styles"

import CampaignList from "./CampaignList"
import EditCampaign from "./EditCampaign.js"

const Dashboard = ({ query, className }) => {
  console.log("query", query)
  return (
    <div className={className}>
      <PageHeading>
        <h1>User's Campaigns</h1>
        <p>A list of your registered emailAddresses and stats</p>
      </PageHeading>
      <CampaignList />
      {query && <EditCampaign />}
    </div>
  )
}
export default styled(Dashboard)``
