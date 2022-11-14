import * as React from "react";
import { useQuery } from "@apollo/client";

import { CAMPAIGN_ANALYTICS } from "./CampaignAnalytics";
import { Label } from "../../../elements";
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
    <div>
      <h2 className="mb-8 px-4 text-xl font-bold tracking-tight">Logs</h2>
      <div className="wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="p-4">
          <label className="mb-0" htmlFor="search">
            <Label>Filter logs by title or content</Label>
          </label>
          <input
            type="text"
            id="search"
            value={logQuery.search}
            onChange={(e) =>
              setLogQuery((s) => ({ ...s, search: e.target.value }))
            }
          />
        </form>
        <ul className="list-none">
          {dataAnalytics?.viewer?.logs?.nodes.length ? (
            dataAnalytics?.viewer?.logs.nodes
              .filter(logFilter)
              .map(({ date, content, title, id }) => {
                return (
                  <li
                    key={id}
                    className="border-b border-gray-200 p-4 last:border-none"
                  >
                    <details>
                      <summary>
                        <span class="inline-block bg-pink-50 py-1 px-2 text-pink-400">
                          {new Date(date).toLocaleDateString()}
                        </span>{" "}
                        : <span class="font-bold text-blue-500">{title}</span>
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
    </div>
  );
}
