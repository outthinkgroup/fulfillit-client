import React from "react";
import { Loader } from "../../../elements";
import { gql, useQuery } from "@apollo/client";

export default function CampaignTransactions({ campaignId }) {
  const { data, loading, error } = useQuery(CAMPAIGN_TRANSACTIONS, {
    variables: {
      id: campaignId,
    },
  });
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-2">
        <p className="font-medium capitalize ">Total transactions:</p>
        <p className="font-bold text-blue-700">{data.campaign.transactions}</p>
      </div>
    </div>
  );
}
export const CAMPAIGN_TRANSACTIONS = gql`
  query CAMPAIGN_TRANSACTIONS($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      databaseId
      transactions: transactionCount
    }
  }
`;
