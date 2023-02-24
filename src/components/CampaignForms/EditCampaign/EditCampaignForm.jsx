import React, { useContext, useEffect } from "react";

import CampaignFormFields from "./CampaignFormFields";
import getUrlParam from "../../../utils/getUrlParams";
import useForm from "../../../hooks/useForm";
import { LocalContext } from "../../../hooks/LocalContext";

import { useQuery, useMutation, gql } from "@apollo/client";
import { Loader } from "../../../elements";
import { useParams } from "react-router-dom";

export const SINGLE_CAMPAIGN = gql`
  query SINGLE_CAMPAIGN($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      status
      email: title(format: RENDERED)
      date
      databaseId
      meta {
        id
        description
        emailMarketingService
        name
        servicePublicKey
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
    $servicePublicKey:String
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
        servicePublicKey:$servicePublicKey
        serviceGroupId: $serviceGroupId
        serviceListId: $serviceListId
        status: $status
      }
    ) {
      campaign {
        id
        databaseId
        email: title(format: RENDERED)
        date
        meta {
          id
          description
          emailMarketingService
          name
          serviceApiKey
          servicePublicKey
          serviceGroupId
          serviceListId
        }
      }
    }
  }
`;

const EditCampaign = ({ className }) => {
  const { localState, setLocalState } = useContext(LocalContext);
  const {campaignId:id} = useParams();
  const { data, loading, error } = useQuery(SINGLE_CAMPAIGN, {
    variables: {
      id,
    },
  });
  const [form, updateForm, setForm] = useForm({});

  const [updateCampaign] = useMutation(UPDATE_CAMPAIGN, {
    variables: { ...form },
    refetchQueries: ["CAMPAIGNS"],
    onCompleted() {
      setLocalState({ ...localState, isSideBarOpen: false });
    },
  });

  useEffect(() => {
    if (data) {
      const { id, email, status, meta, databaseId } = data.campaign;
      setForm({ id, email, databaseId, status, ...meta });
    }
  }, [data]);

  if (loading) {
    return (
      <div className={className}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Loader /> <span>loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        updateCampaign();
      }}
    >
      <CampaignFormFields form={form} updateForm={updateForm} />

      <div className="bottom-bar">
        <div>
          <button type="submit" value="save" className="bg-blue-600 text-sm">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditCampaign;
