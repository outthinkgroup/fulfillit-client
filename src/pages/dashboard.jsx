import React from "react";

import Dashboard from "../components/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import getUrlParams from "../utils/getUrlParams";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Dashboard query={getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  );
};
export default DashboardPage;
