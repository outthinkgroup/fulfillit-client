import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

import { Loader, PageHeading } from "../../designSystem/styles";
import { USER_DATA } from "../Header/Header";
import { UPDATE_CAMPAIGN } from "../CampaignForms/EditCampaign/EditCampaign";
import { LocalContext } from "../../utils/LocalContext";
import getUrlParam from "../../utils/getUrlParams";

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
  if (loading || campaignDataLoading) {
    return <Loader />;
  }

  return (
    <div className={className}>
      <PageHeading>
        <div>Details</div>
        <CampaignDetailsHeading campaign={campaignData.campaign} />
      </PageHeading>
    </div>
  );
};

const CampaignDetailsHeading = ({ campaign }) => {
  const [form, setForm] = useState({
    name: campaign.name,
    email: campaign.email,
    description: campaign.description,
  });
  const [isShowEditUI, setIsShowEditUI] = useState(false);

  const [updateCampaign] = useMutation(UPDATE_CAMPAIGN, {
    variables: {
      name: form.name,
      email: form.email,
      description: form.description,
      databaseId: campaign.databaseId,
    },
    refetchQueries: ["CAMPAIGNS"],
    onCompleted() {
      setLocalState({ ...localState, isSideBarOpen: false });
    },
  });
  return (
    <div>
      <h2>{campaign.meta.name}</h2>
      <button onClick={() => setIsShowEditUI((s) => !s)}>Edit</button>
    </div>
  );
};

export default styled(CampaignDetails)``;

export const SINGLE_CAMPAIGN_TITLE = gql`
  query SINGLE_CAMPAIGN_TITLE($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      campaignId
      status
      email: title(format: RAW)
      meta {
        name
      }
    }
  }
`;
