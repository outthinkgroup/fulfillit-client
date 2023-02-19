import React from "react";
import { useQuery, gql } from "@apollo/client";
import CampaignGraph from "./CampaignGraph.jsx";
import { useOutletContext, useParams } from "react-router-dom";

import {} from "./datemanager"

export default function CampaignAnalytics() {
  const {campaignId:id} = useParams();
  const {slug:campaignSlug} = useOutletContext();

  const [view, setView] = React.useState("month");


  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      campaign: [campaignSlug],
      day:
      month:
      year:
    },
  });


  if (loadingAnalytics) {
    return <div style={{ textAlign: "center" }}>Loading Campaign Logs...</div>;
  }
  if (errorAnalytics) {
    return <div style={{ textAlign: "center" }}>{errorAnalytics.message}</div>;
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
      id
    }
  }
`;
export const CAMPAIGN_ANALYTICS = gql`
query CAMPAIGN_ANALYTICS($day:Number, $month:Number, $year:Number) {
  viewer {
    logs(
      where: {orderby: {field: DATE, order: ASC}, dateQuery: {after: {day: 17, month: 1, year: 2023}}}
    ) {
      edges {
        node {
          meta {
            messageId
            recipient
            sender
            subject
            to
          }
          date
        }
      }
      nodes {
        id
      }
    }
    name
  }
}
`;
