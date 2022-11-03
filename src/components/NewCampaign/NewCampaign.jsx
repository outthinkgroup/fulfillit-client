import React from "react";

import NewCampaignWizard from "../CampaignForms/NewCampaignWizard/NewCampaignWizard";

const NewCampaign = ({}) => {
  return (
    <div className="mx-auto max-w-screen-sm">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-blue-900">New Campaign</h1>
        <p className="text-blue-600">Create a new Campaign</p>
      </header>
      <NewCampaignWizard />
    </div>
  );
};
export default NewCampaign;
