import React from "react"

import DashboardLayout from "../Layouts/DashboardLayout"
import Dashboard from "../components/Dashboard"
import ShouldRender from "../utils/isBrowser"
import getUrlParams from "../utils/getUrlParams"

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Dashboard query={ShouldRender && getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  )
}
export default DashboardPage
