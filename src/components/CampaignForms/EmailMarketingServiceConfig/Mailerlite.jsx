import * as React from "react"
import { useQuery, gql } from "@apollo/client";
import { Loader } from "../../../designSystem/styles";

export default function MailerliteSetupForm({
	cardname,
  updateForm,
  form,
}) {
  const { data, loading, error } = useMailerliteData(
    form.serviceApiKey
  );

  return (
    <div className="mailservice-info">
      <h3>Mailerlite Options</h3>
      <label htmlFor="api-key">
        <span className="label-text">Mailerlite Api Key</span>
        <input
          type="text"
          name="serviceApiKey"
          id="api-key"
          value={form.serviceApiKey}
          onChange={(e) => {
            updateForm(e);
          }}
          data-cardname={cardname}
        />
        {form.serviceApiKey && error?.message}
      </label>
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Loader />
          <span>Loading Mailerlite Data</span>
        </div>
      )}
      {data?.mailerliteData?.groups?.length > 0 && (
        <label htmlFor="list-id">
          <span className="label-text">Group</span>
          <select
            name="serviceGroupId"
            id="list-id"
            value={form.serviceGroupId}
            onChange={updateForm}
            data-cardname={cardname}
          >
            <option key="--" value={null}>
              Select a Group
            </option>
            {data?.mailerliteData?.groups.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

export function useMailerliteData(apiKey) {
  return useQuery(ML_LIST_QUERY, { variables: { apiKey } });
}
const ML_LIST_QUERY = gql`
  query ML_LIST_QUERY($apiKey: String) {
    mailerliteData(apiKey: $apiKey ) {
      groups {
        name
        id
      }
    }
  }
`;

