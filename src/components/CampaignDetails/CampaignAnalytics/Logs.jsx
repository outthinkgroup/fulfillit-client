import * as React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { CAMPAIGN_ANALYTICS } from "./CampaignAnalytics";
export default function Logs({ campaign }) {
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      campaign: [campaign],
    },
  });
  const [logQuery, setLogQuery] = React.useState({
    date: null,
    search: "",
  });
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

  return (
    <LogsWrapper>
      <h3>Logs</h3>
      <div className="wrapper">
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
          {dataAnalytics?.viewer?.logs?.nodes.length ? (
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
              })
          ) : (
            <p>No logs to display</p>
          )}
        </ul>
      </div>
    </LogsWrapper>
  );
}

const LogsWrapper = styled.div`
  .wrapper {
    border: 1px solid #eee;
    border-radius: 6px;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li,
  form {
    padding: 1rem;
  }
  li:not(:first-child) {
    border: 1px solid #eee;
  }
`;
