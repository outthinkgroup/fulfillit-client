import React from "react";
import { useQuery, gql } from "@apollo/client";
import CampaignGraph from "./CampaignGraph.jsx";
import { useOutletContext } from "react-router-dom";

import { getStartDateForView } from "./datemanager";

export default function CampaignAnalytics() {
  const { slug: campaignSlug } = useOutletContext();

  const [view, setView] = React.useState("day");

  //this will be used to get all
  //logs after the date below
  const afterDate = getStartDateForView(view);
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      campaign: [campaignSlug],
      day: afterDate.day,
      month: afterDate.month,
      year: afterDate.year,
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
        <label htmlFor="viewSelect">view by</label>
        <select onChange={(e) => setView(e.target.value)} value={view}>
          <option value="week">Last Quarter</option>
          <option value="day">Last Month</option>
          <option value="hour">Last 24 Hours</option>
        </select>
        <CampaignGraph
          name={campaignSlug}
          view={view}
          startDate={afterDate.date}
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
  query CAMPAIGN_ANALYTICS(
    $campaign: [String]
    $day: Int
    $month: Int
    $year: Int
  ) {
    viewer {
      logs(
        last:1000000
        where: {
          orderby: { field: DATE, order: ASC }
          dateQuery: { after: { day: $day, month: $month, year: $year } }
          taxQuery: {
            taxArray: { taxonomy: FOR_CAMPAIGN, terms: $campaign, field: SLUG }
          }
          
        }
      ) {
        nodes {
          id
          date
        }
      }
      name
    }
  }
`;
