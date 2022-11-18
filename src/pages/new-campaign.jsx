import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import NewCampaign from "../components/NewCampaign/NewCampaign";

export const NewCampaignPage = ({ query }) => {
  return (
    <DashboardLayout>
      <NewCampaign query={query} />
    </DashboardLayout>
  );
};
