import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import { SINGLE_CAMPAIGN } from "../../CampaignForms/EditCampaign/EditCampaignForm";
import { Loader } from "../../../elements/Loader";
import { Label } from "../../../elements/SingleForm";

export const DELETE_CAMPAIGN = gql`
  mutation DELETE_CAMPAIGN($id: ID!) {
    deleteCampaign(input: { clientMutationId: "sdfsdaa", id: $id }) {
      campaign {
        id
      }
    }
  }
`;

export function DeleteCampaign() {
  const navigate = useNavigate();
  const {campaignId:id} = useParams();
  const [errors, setErrors] = React.useState(null);

  const { data, loading, error } = useQuery(SINGLE_CAMPAIGN, {
    variables: {
      id,
    },
  });

  const [
    deleteCampaign,
    { data: deleteData, loading: loadingDelete, error: deleteError },
  ] = useMutation(DELETE_CAMPAIGN, {
    variables: { id: id },
    refetchQueries: ["CAMPAIGNS"],
    onCompleted() {
      navigate("/");
    },
  });

  const [form, updateForm] = useForm({ email: "" });

  if (error) {
    navigate("/404");
  }

  if (loading) {
    return <Loader />;
  }

  function tryDeleteCampaign(e) {
    e.preventDefault();
    setErrors(null);
    if (form.email === data?.campaign?.email) {
      deleteCampaign();
      return;
    }

    setErrors("That wasnt exactly correct, try again.");
  }

  return (
    <div>
      <h3>Delete Campaign</h3>
      <p>{data.campaign.meta.name}</p>
      {errors ? errors : null}
      <form onSubmit={tryDeleteCampaign}>
        <Label>
          Type{" "}
          <span className="normal-case text-red-600">
            {data?.campaign?.email}
          </span>{" "}
          to confirm
        </Label>
        <div className="flex gap-1">
          <input
            name="email"
            type="text"
            onChange={updateForm}
            value={form.email}
          />
          <button
            type="submit"
            className="bg-red-600 text-sm font-bold text-white"
          >
            {loadingDelete ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
