import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import NewCampaign from "../components/NewCampaign/NewCampaign";

const NewCampaignPage = ({ query }) => {
  return (
    <DashboardLayout>
      <NewCampaign query={query} />
    </DashboardLayout>
  );
};

export default NewCampaignPage;
