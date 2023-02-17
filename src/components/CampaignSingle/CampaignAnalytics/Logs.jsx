import * as React from "react";
import { useQuery } from "@apollo/client";

import { CAMPAIGN_ANALYTICS } from "./CampaignAnalytics";
import { Label } from "../../../elements";
import { useOutletContext } from "react-router-dom";
export default function Logs() {
  const { slug: campaign } = useOutletContext();
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
              .map(({ date, content, title, id, meta, forCampaigns }) => {
                return (
                  <li
                    key={id}
                    className="border-b border-gray-200 p-4 last:border-none"
                  >
                    <details>
                      <summary>
                        <span className="inline-block bg-pink-50 py-1 px-2 text-pink-400">
                          {new Date(date).toLocaleDateString()}
                        </span>{" "}
                        :{" "}
                        <span className="font-bold text-blue-500">{title}</span>
                      </summary>
                      <div class="mt-3 flex flex-col overflow-hidden rounded">
                        <LogAttribute
                          label="campaign"
                          value={forCampaigns.nodes[0].name}
                        />
                        <LogAttribute label="sender" value={meta.sender} />
                        <LogAttribute label="subject" value={meta.subject} />
                        <LogAttribute label="Email Body" asHtml={true} value={content} />
                        <LogAttribute
                          label="Attachments"
                          value={meta.attachments}
                        />
                      </div>
                    </details>
                  </li>
                );
              })
          ) : (
            <p className="p-4 font-bold">No logs to display</p>
          )}
        </ul>
      </div>
    </div>
  );
}

function LogAttribute({ label, value, asHtml = false }) {
  return (
    <div class="flex items-start gap-3 bg-gray-100 p-1 even:bg-gray-50">
      <div class="w-28 font-semibold  capitalize text-gray-800">{label}</div>
      {asHtml ? (
        <div class="flex-1" >
          <div dangerouslySetInnerHTML={{__html:value}}></div>
        </div>
      ) : (
        <div class="flex-1  ">{value}</div>
      )}
    </div>
  );
}
