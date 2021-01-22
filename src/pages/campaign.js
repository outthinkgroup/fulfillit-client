import React, { useEffect } from "react"

import DashboardLayout from "../Layouts/DashboardLayout"
import CampaignDetails from "../components/CampaignDetails/CampaignDetails.js"
import ShouldRender from "../utils/isBrowser"
import getUrlParams from "../utils/getUrlParams"

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <CampaignDetails
        query={ShouldRender && getUrlParams("campaign_id", null)}
      />
    </DashboardLayout>
  )
}
export default DashboardPage
