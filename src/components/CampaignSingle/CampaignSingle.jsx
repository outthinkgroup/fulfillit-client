import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { USER_DATA } from "../Header/Header";
import getUrlParam from "../../utils/getUrlParams";

import { CampaignDetailsHeading } from "./PageHeader/PageHeader";
import CampaignTransactions from "./CampaignAnalytics/CampaignTransactions";
import Tabs from "../Tabs/Tabs";
import { Loader } from "../../elements";

const CampaignSingle = ({query}) => {
  const { data, loading, error } = useQuery(USER_DATA);
  const {
    data: campaignData,
    loading: campaignDataLoading,
    error: campaignDataError,
  } = useQuery(SINGLE_CAMPAIGN_TITLE, {
    variables: {
      id: query
    },
  });
  const navigate = useNavigate();

  if (error) {
    navigate("/sign-in");
    return null;
  }
  if(campaignDataError){
    console.log(campaignDataError);
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
        <CampaignTransactions campaignId={campaignData.campaign?.id} />
      </header>
    <Tabs tabs={{Overview:"", Inbox:"inbox", settings:"Settings", Logs:"logs",Delete:"delete"}} >
        <Outlet context={{
          id: campaignData.campaign?.id,
          slug: campaignData.campaign?.email,
        }}/>
      </Tabs>
    </div>
  );
};

export default CampaignSingle;

export const SINGLE_CAMPAIGN_TITLE = gql`
  query SINGLE_CAMPAIGN_TITLE($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      databaseId
      status
      email: title(format: RENDERED)
      meta {
        id
        name
        description
      }
    }
  }
`;
