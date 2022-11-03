import React from "react";
import { useQuery, gql } from "@apollo/client";
import CampaignGraph from "./CampaignGraph.jsx";

export default function CampaignAnalytics({ id, campaignSlug }) {
  console.log({ id, campaignSlug });
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      campaign: [campaignSlug],
    },
  });
  const {
    data: dataTransactionCount,
    loading: loadingTransactionCount,
    error: errorTransactionCount,
  } = useQuery(CAMPAIGN_TRANSACTION_COUNT, {
    variables: { id },
  });

  const [view, setView] = React.useState("month");

  if (loadingAnalytics || loadingTransactionCount) {
    return <div style={{ textAlign: "center" }}>Loading Campaign Logs...</div>;
  }
  if (errorAnalytics) {
    return <div style={{ textAlign: "center" }}>{errorAnalytics.message}</div>;
  }
  if (errorTransactionCount) {
    return (
      <div style={{ textAlign: "center" }}>{errorTransactionCount.message}</div>
    );
  }

  console.log(view);
  return (
    <div>
      <div>
        <label htmlFor="viewSelect">view by</label>
        <select onChange={(e) => setView(e.target.value)} value={view}>
          <option value="month">Month by Month</option>
          <option value="day">Day by Day</option>
          <option value="hour">Hour by Hour</option>
        </select>
        <CampaignGraph
          name={campaignSlug}
          view={view}
          logs={dataAnalytics?.viewer?.logs?.nodes}
        />
      </div>
    </div>
  );
}
export const CAMPAIGN_TRANSACTION_COUNT = gql`
  query CAMPAIGN_TRANSACTION_COUNT($id: ID!) {
    campaign(id: $id, idType: DATABASE_ID) {
      transactionCount
    }
  }
`;
export const CAMPAIGN_ANALYTICS = gql`
  query CAMPAIGN_ANALYTICS($campaign: [String]) {
    viewer {
      logs(
        last: 100
        where: {
          taxQuery: {
            taxArray: { taxonomy: FOR_CAMPAIGN, terms: $campaign, field: SLUG }
          }
        }
      ) {
        nodes {
          databaseId
          authorDatabaseId
          forCampaigns {
            nodes {
              name
            }
          }
          dateGmt
          date
          content(format: RENDERED)
          title
        }
      }
    }
  }
`;
