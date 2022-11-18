import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CampaignDetails from "../components/CampaignDetails/CampaignDetails";
import getUrlParams from "../utils/getUrlParams";

const CampaignSingle = () => {
  return (
    <DashboardLayout>
      <CampaignDetails query={getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  );
};
export default CampaignSingle;
