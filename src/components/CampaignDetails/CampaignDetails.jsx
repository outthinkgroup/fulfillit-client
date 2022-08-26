import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { PageHeading } from "../../designSystem/styles";
import { USER_DATA } from "../Header/Header";
import { LocalContext } from "../../utils/LocalContext";
import getUrlParam from "../../utils/getUrlParams";
import CampaignGeneralInfo from "./CampaignGeneralInfo/CampaignGeneralInfo.jsx";
import CampaignAnalytics from "./CampaignAnalytics/CampaignAnalytics.jsx";
import EditCampaign from "../CampaignForms/EditCampaign/EditCampaign.jsx";

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
  const { localState, setLocalState } = useContext(LocalContext);

  function openEditingSideBar() {
    setLocalState((state) => ({
      ...state,
      isSideBarOpen: "EDIT_CAMPAIGN",
    }));
  }

  if (error) {
    navigate("/sign-in");
    return null;
  }
  const { isSideBarOpen } = localState;

  return (
    <div className={className}>
      <PageHeading>
        <div>{loading ? "" : data && data.viewer.name}</div>

        {!campaignDataLoading && (
          <CampaignDetailsHeading
            campaign={campaignData.campaign}
            handEdit={openEditingSideBar}
          />
        )}
      </PageHeading>
      {!campaignDataLoading && (
        <>
          <CampaignAnalytics
            id={campaignData.campaign.campaignId}
            campaignName={campaignData.campaign.campaignOptions.name}
          />
          <CampaignGeneralInfo />
        </>
      )}
      {isSideBarOpen === "EDIT_CAMPAIGN" && <EditCampaign />}
    </div>
  );
};

const CampaignDetailsHeading = ({ campaign, handleEdit }) => (
  <div>
    <h2>{campaign.campaignOptions.name}</h2>
    <button onClick={handleEdit}>Edit</button>
  </div>
);

export default styled(CampaignDetails)``;

export const SINGLE_CAMPAIGN_TITLE = gql`
  query SINGLE_CAMPAIGN_TITLE($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      campaignId
      status
      email: title(format: RAW)
      campaignOptions {
        name
      }
    }
  }
`;
