import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Loader, Label } from "../../../elements";

export default function ConvertkitV4SetupForm({ cardname, updateForm, form }) {
  const { data, loading, error } = useConvertkitV4Data(form.serviceApiKey);

  return (
    <div className="mailservice-info">
      <h3 className="mb-3 text-lg font-bold">ConvertKit v4 Options</h3>
      <label htmlFor="api-key">
        <Label>ConvertKit v4 API Key</Label>
        <input
          type="text"
          name="serviceApiKey"
          id="api-key"
          value={form.serviceApiKey || ""}
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
          <span>Loading ConvertKit v4 Data</span>
        </div>
      )}
      {data?.convertKitV4Data?.forms?.length > 0 && (
        <label htmlFor="list-id">
          <Label>ConvertKit Form</Label>
          <select
            name="segmentationLevel1"
            id="list-id"
            value={form.segmentationLevel1 || ""}
            onChange={updateForm}
            data-cardname={cardname}
          >
            <option key="--" value="">
              Select a Form
            </option>
            {data.convertKitV4Data.forms.map((formOption) => (
              <option key={formOption.id} value={formOption.id}>
                {formOption.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

export function useConvertkitV4Data(apiKey) {
  return useQuery(CK_V4_FORM_QUERY, {
    variables: { apiKey },
    skip: !apiKey,
  });
}

const CK_V4_FORM_QUERY = gql`
  query CK_V4_FORM_QUERY($apiKey: String) {
    convertKitV4Data(apiKey: $apiKey) {
      forms {
        name
        id
      }
    }
  }
`;
