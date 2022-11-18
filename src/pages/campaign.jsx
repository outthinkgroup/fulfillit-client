import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Campaign from "../components/CampaignSingle/CampaignSingle";
import getUrlParams from "../utils/getUrlParams";

export const CampaignSingle = () => {
  return (
    <DashboardLayout>
      <Campaign query={getUrlParams("campaign_id", null)} />
    </DashboardLayout>
  );
};
