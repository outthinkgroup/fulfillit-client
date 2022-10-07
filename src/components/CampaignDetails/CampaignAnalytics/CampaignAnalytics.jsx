import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import CampaignGraph from "./CampaignGraph.jsx";

// import { PageHeading } from "../../../designSystem/styles";
// import { USER_DATA } from "../../Header/Header";
// import { LocalContext } from "../../../utils/LocalContext";
// import getUrlParam from "../../../utils/getUrlParams";

export default function CampaignAnalytics({ id, campaignSlug }) {
  console.log({ id, campaignSlug });
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      id,
      campaign: [campaignSlug],
    },
  });

  const [logQuery, setLogQuery] = React.useState({
    date: null,
    search: "",
  });

  const [view, setView] = React.useState("month");

  function logFilter(log) {
    const { search, date } = logQuery;
    if (!search || !search.length > 2) {
      return true;
    }
    if (
      log.title.toLowerCase().includes(search.toLowerCase()) ||
      log.content.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }

    return false;
  }

  if (loadingAnalytics) {
    return <div style={{ textAlign: "center" }}>Loading Campaign Logs...</div>;
  }
  if (errorAnalytics) {
    return <div style={{ textAlign: "center" }}>{errorAnalytics.message}</div>;
  }

  console.log(view);
  return (
    <CampaignAnalyticsWrapper>
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
        <h3>Logs</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Filter logs by title or content</label>
          <input
            type="text"
            id="search"
            value={logQuery.search}
            onChange={(e) =>
              setLogQuery((s) => ({ ...s, search: e.target.value }))
            }
          />
        </form>
        <ul>
          {dataAnalytics?.viewer?.logs?.nodes.length &&
            dataAnalytics?.viewer?.logs.nodes
              .filter(logFilter)
              .map(({ date, content, title, id }) => {
                return (
                  <li key={id}>
                    <details>
                      <summary>
                        {date} : {title}
                      </summary>
                      <p dangerouslySetInnerHTML={{ __html: content }} />
                    </details>
                  </li>
                );
              })}
        </ul>
      </div>
    </CampaignAnalyticsWrapper>
  );
}

export const CAMPAIGN_ANALYTICS = gql`
  query CAMPAIGN_ANALYTICS($id: ID!, $campaign: [String]) {
    campaign(id: $id, idType: DATABASE_ID) {
      transactionCount
    }
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
const CampaignAnalyticsWrapper = styled.div`
  form {
    max-width: 300px;
    margin-bottom: 20px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  br {
    display: none;
  }
  details p {
    margin-inline-start: 0.5em;
    background: #eff4ff;
    padding: 1em;
  }
  details p * {
    margin-block: 0;
    margin-bottom: 10px;
  }
`;
