import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import Campaign from "../components/CampaignSingle/CampaignSingle";
import getUrlParam from "../utils/getUrlParams";

export const CampaignSingle = () => {
  const campaignId = getUrlParam("campaign_id");

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!campaignId) {
      navigate("/404");
    }
  }, [campaignId]);

  return (
    <DashboardLayout>
      <Campaign query={campaignId} />
    </DashboardLayout>
  );
};
