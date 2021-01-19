import React, { useEffect } from "react"

import DashboardLayout from "../Layouts/DashboardLayout"
import Dashboard from "../components/Dashboard/Dashboard"
import ShouldRender from "../utils/isBrowser"
import getUrlParams from "../utils/getUrlParams"
import { useQuery } from "@apollo/react-hooks"
import { navigate } from "gatsby"
//import { CURRENT_USER } from "../components/SignIn"
import isBrowser from "../utils/isBrowser"
import { MY_CAMPAIGNS } from "../pages/index"
import { gql } from "apollo-boost"

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Dashboard query={ShouldRender && getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  )
}
export default DashboardPage
