import React from "react";

import Dashboard from "../components/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import ShouldRender from "../utils/isBrowser";
import getUrlParams from "../utils/getUrlParams";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Dashboard query={ShouldRender && getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  );
};
export default DashboardPage;
