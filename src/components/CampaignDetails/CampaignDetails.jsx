import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import CampaignAnalytics from "./CampaignAnalytics/CampaignAnalytics";
import { Loader } from "../../elements";
import { USER_DATA } from "../Header/Header";
import { CampaignDetailsHeading } from "./CampaignDetailsHeading/CampaignDetailsHeading";
import CampaignTransactions from "./CampaignAnalytics/CampaignTransactions";
import getUrlParam from "../../utils/getUrlParams";
import Tabs from "../Tabs/Tabs";
import Logs from "../CampaignDetails/CampaignAnalytics/Logs";
import EditCampaign from "../CampaignForms/EditCampaign/EditCampaign";

const CampaignDetails = ({ query, className }) => {
  const { data, loading, error } = useQuery(USER_DATA);
  const {
    data: campaignData,
    loading: campaignDataLoading,
    error: campaignDataError,
  } = useQuery(SINGLE_CAMPAIGN_TITLE, {
    variables: {
      id: getUrlParam("campaign_id"),
    },
  });
  const navigate = useNavigate();

  if (error) {
    navigate("/sign-in");
    return null;
  }
  if (loading || campaignDataLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <header className="mb-10">
        <p className="text-blue-600">Campaign</p>
        <div>
          <CampaignDetailsHeading campaign={campaignData.campaign} />
        </div>
        <CampaignTransactions campaignId={campaignData.campaign.id} />
      </header>

      <Tabs
        tabs={{
          ["Overview"]: () => (
            <CampaignAnalytics
              id={campaignData.campaign.databaseId}
              campaignSlug={campaignData.campaign.email}
            />
          ),
          ["Settings"]: () => (
            <>
              <EditCampaign />
            </>
          ),
          ["Logs"]: () => (
            <>
              <Logs campaign={campaignData.campaign.email} />
            </>
          ),
        }}
      />
    </div>
  );
};

export default CampaignDetails;

export const SINGLE_CAMPAIGN_TITLE = gql`
  query SINGLE_CAMPAIGN_TITLE($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      databaseId
      status
      email: title(format: RAW)
      meta {
        name
        description
      }
    }
  }
`;
