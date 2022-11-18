import React from "react";
import { renderCampaignEmail } from "../../../utils";

export const CampaignDetailsHeading = ({ campaign }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <h1 className="mb-2 text-4xl font-bold text-blue-900">
        {campaign.meta.name}
      </h1>
      <p className="mb-6 w-full text-ellipsis text-sm text-blue-700">
        {renderCampaignEmail(campaign.email)}
      </p>
      <p>{campaign.description}</p>
    </div>
  );
};
