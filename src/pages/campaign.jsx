import React from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Campaign from "../components/CampaignSingle/CampaignSingle";
import { Outlet, useParams } from "react-router-dom";

export const CampaignSingle = ({}) => {
  
  const {campaignId} = useParams()

  return (
    <DashboardLayout>
      <Campaign query={campaignId} />

    </DashboardLayout>
  );
};
