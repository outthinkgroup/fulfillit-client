import React, { useEffect } from "react";

import DashboardLayout from "../Layouts/DashboardLayout";
import CampaignDetails from "../components/CampaignDetails/CampaignDetails";
import getUrlParams from "../utils/getUrlParams";

const CampaignSingle = () => {
  return (
    <DashboardLayout>
      <CampaignDetails
        query={getUrlParams("campaign_id", null)}
      />
    </DashboardLayout>
  );
};
export default CampaignSingle;
