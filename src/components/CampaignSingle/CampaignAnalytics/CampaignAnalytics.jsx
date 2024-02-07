import React, {useMemo} from "react";
import { useQuery, gql } from "@apollo/client";
import CampaignGraph from "./CampaignGraph.jsx";
import { useParams } from "react-router-dom";

import { getStartDateForView, getTimeRangeForView } from "./datemanager";
const start = (Date.now() / 1000).toString()
export default function CampaignAnalytics() {
  const { campaignId } = useParams();

  const [view, setView] = React.useState("day");

  //this will be used to get all
  //logs after the date below
  const afterDate = useMemo(()=>getStartDateForView(view), [view]);
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      campaign: campaignId,
      duration: getTimeRangeForView(view),
      start: (Math.floor(afterDate.date.getTime() / 1000) ).toString(),
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
          <option value="month">Year</option>
          <option value="day">Month</option>
        </select>
        <CampaignGraph
          name={dataAnalytics?.campaign?.meta?.name}
          view={view}
          startDate={afterDate.date}
          dates={dataAnalytics?.campaign?.graphAnalytics}
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
    $campaign: ID!
    $duration: String
    $start: String
  ) {
    campaign(id: $campaign, idType: ID) {
			meta{
				name
			}
      graphAnalytics(duration: $duration, start: $start) {
        count
        day
        month
        year
      }
    }
	}
`;
