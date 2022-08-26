import React from "react";
import { useQuery, gql } from "@apollo/client";

import { PageHeading } from "../../../designSystem/styles";
import { USER_DATA } from "../../Header/Header";
import { LocalContext } from "../../../utils/LocalContext";
import getUrlParam from "../../../utils/getUrlParams";

export default function CampaignAnalytics({ id, campaignName }) {
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      id,
      campaign: campaignName,
    },
  });

  if (loadingAnalytics) {
    return <div style={{ textAlign: "center" }}>Loading Campaign Logs...</div>;
  }
  if (errorAnalytics) {
    return <div style={{ textAlign: "center" }}>{errorAnalytics.message}</div>;
  }

  return (
    <div>
      <div>
        <h3>Total Transactions</h3>
        <p>{dataAnalytics.campaign?.transactionCount}</p>
      </div>
      <div>
        <h3>Logs</h3>
        <ul>
          {dataAnalytics?.logs?.nodes.length &&
            dataAnalytics.logs.nodes.map(({ title, id }) => {
              return <li key={id}>{title}</li>;
            })}
        </ul>
      </div>
    </div>
  );
}

export const CAMPAIGN_ANALYTICS = gql`
  query CAMPAIGN_ANALYTICS($id: ID!, $campaign: String!) {
    campaign(id: $id, idType: DATABASE_ID) {
      transactionCount
    }
    logs(
      where: {
        metaQuery: {
          metaArray: {
            compare: EQUAL_TO
            key: "campaign"
            type: CHAR
            value: $campaign
          }
        }
      }
    ) {
      nodes {
        id
        title
      }
    }
  }
`;
/*    
   campaign(id: $id, idType: DATABASE_ID) {
     campaignTransactions
  }
  */
