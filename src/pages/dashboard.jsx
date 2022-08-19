import React, { useEffect } from "react";

import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import ShouldRender from "../utils/isBrowser";
import getUrlParams from "../utils/getUrlParams";
//import { CURRENT_USER } from "../components/SignIn"

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Dashboard query={ShouldRender && getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  );
};
export default DashboardPage;
