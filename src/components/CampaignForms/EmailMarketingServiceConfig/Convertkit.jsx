import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Loader, Label } from "../../../elements";

export default function ConvertkitSetupForm({ cardname, updateForm, form }) {
  const {
    ckListData: ck,
    listLoading,
    listsError,
  } = useConverkitData(form.serviceApiKey, form.servicePublicKey);


  return (
    <>
      <div className="mailservice-info">
        <h3 className="mb-8 text-lg font-bold tracking-tight">
          Convertkit options
        </h3>
        <label className="mb-8" htmlFor="api-key">
          <Label className="label-text">Convertkit Public Key</Label>
          <input
            type="text"
            name="servicePublicKey"
            id="public-key"
            value={form.servicePublicKey}
            onChange={(e) => {
              updateForm(e);
            }}
            data-cardname={cardname}
          />
          {form.servicePublicKey && listsError?.message}
        </label>
        <label className="mb-8" htmlFor="api-key">
          <Label className="label-text">Convertkit Secret Key</Label>
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
          {form.serviceApiKey && listsError?.message}
        </label>
        {listLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Loader />
            <span>Loading Convert Data</span>
          </div>
        )}
        <div className="settings-group">
          {ck?.convertKitData?.forms?.length > 0 && (
            <label htmlFor="list-id">
              <Label>Convertkit Form</Label>
              {/*we set forms as the list id because */}
              {/*this is the top level of segementation */}
              <select
                name="serviceListId"
                id="list-id"
                value={form.serviceListId}
                onChange={updateForm}
                data-cardname={cardname}
              >
                <option key="--" value={null}>
                  Select a Form
                </option>
                {ck?.convertKitData?.forms.map((f) => console.log(f) || (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
    </>
  );
}

export function useConverkitData(apiKey, publicKey) {
  const {data:ckListData, loading:listLoading, error:listError} = useQuery(CK_FORM_QUERY, { variables: { apiKey, publicKey } });

  return { ckListData, listLoading, listError };
}
const CK_FORM_QUERY = gql`
  query CK_FORM_QUERY($apiKey: String, $publicKey:String) {
    convertKitData(apiKey: $apiKey, publicKey: $publicKey) {
      forms {
        name
        id
      }
    }
  }
`;
