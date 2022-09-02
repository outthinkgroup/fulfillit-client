import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import CampaignDetails from "../CampaignDetails/CampaignDetails";
import getUrlParam from "../../../utils/getUrlParams";
import useForm from "../../../utils/useForm";
import { LocalContext } from "../../../utils/LocalContext";
import {} from "../WizardCards/Mailchimp";

import { useQuery, useMutation, gql } from "@apollo/client";

export const SINGLE_CAMPAIGN = gql`
  query SINGLE_CAMPAIGN($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      status
      email: title(format: RAW)
      date
      databaseId
      campaignOptions {
        description
        emailMarketingService
        name
        serviceApiKey
        serviceGroupId
        serviceListId
      }
    }
  }
`;
export const UPDATE_CAMPAIGN = gql`
  mutation UPDATE_CAMPAIGN(
    $databaseId: ID!
    $email: String
    $emailMarketingService: String
    $name: String
    $serviceApiKey: String
    $serviceGroupId: String
    $serviceListId: String
    $description: String
    $status: String
  ) {
    updateCampaignById(
      input: {
        clientMutationId: "asdfasdf"
        databaseId: $databaseId
        description: $description
        email: $email
        emailMarketingService: $emailMarketingService
        name: $name
        serviceApiKey: $serviceApiKey
        serviceGroupId: $serviceGroupId
        serviceListId: $serviceListId
        status: $status
      }
    ) {
      campaign {
        id
        databaseId
        email: title
        date
        campaignOptions {
          description
          emailMarketingService
          name
          serviceApiKey
          serviceGroupId
          serviceListId
        }
      }
    }
  }
`;

const EditCampaign = ({ className }) => {
  const { localState, setLocalState } = useContext(LocalContext);
  const { data, loading, error } = useQuery(SINGLE_CAMPAIGN, {
    variables: {
      id: getUrlParam("campaign_id"),
    },
  });
  const [form, updateForm, setForm] = useForm({});
  const [updateCampaign, updatedData] = useMutation(UPDATE_CAMPAIGN, {
    variables: { ...form },
    refetchQueries: ["CAMPAIGNS"],
    onCompleted() {
      setLocalState({ ...localState, isSideBarOpen: false });
    },
  });

  useEffect(() => {
    if (data) {
      const { id, email, status, campaignOptions, databaseId } = data.campaign;
      setForm({ id, email, databaseId, status, ...campaignOptions });
    }
  }, [data]);

  if (loading) return "loading...."; //todo get real loader
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        updateCampaign();
      }}
    >
      <CampaignDetails form={form} updateForm={updateForm} />

      <div className="bottom-bar">
        <div>
          <input type="submit" value="save" className="save" />
          <input
            type="button"
            onClick={() =>
              setLocalState({ ...localState, isSideBarOpen: false })
            }
            value="cancel"
            className="btn cancel"
          />
        </div>
      </div>
    </form>
  );
};

export default styled(EditCampaign)`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  max-width: 400px;
  width: 100%;
  /* min-width: 300px; */
  background: #fff;
  overflow-y: scroll;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.depth.high};
  padding-top: 0;
  .bottom-bar {
    z-index: 12;
    border-top: 1px solid #efefef;
    background: white;
    position: fixed;
    bottom: 0;
    width: 400px;
    & > div {
      padding: 10px;
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }
    .save,
    .cancel {
      margin-right: 10px;
      margin-top: 0;
      text-align: center;
      padding: 11px 15px;
      width: 150px;
    }
    .save {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
    .cancel {
      background: ${({ theme }) => theme.colors.warning.light};
      color: ${({ theme }) => theme.colors.warning.primary};
      border: 2px solid ${({ theme }) => theme.colors.warning.primary};
    }
  }
  ${CampaignDetails} {
    padding: 20px;
    padding-bottom: 80px;
  }
`;
