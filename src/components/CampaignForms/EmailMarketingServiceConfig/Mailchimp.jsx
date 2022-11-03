import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Loader } from "../../../designSystem/styles";

export default function MailchimpSetupForm({ cardname, updateForm, form }) {
  const {
    mcListData: mc,
    listLoading,
    listsError,
  } = useMailChimpLists(form.serviceApiKey);

  const list = React.useMemo(
    () =>
      mc?.mailchimpData?.lists?.find((list) => list.id === form.serviceListId),
    [mc, form]
  );
  const groupsByParent = list?.groups.reduce((acc, group) => {
    if (!(group.parentGroupName in acc)) {
      acc[group.parentGroupName] = [];
    }
    acc[group.parentGroupName].push(group);
    return acc;
  }, {});

  return (
    <>
      <div className="mailservice-info">
        <h3 className="mb-8 text-lg font-bold tracking-tight">
          Mailchimp options
        </h3>
        <label className="mb-8" htmlFor="api-key">
          <Label className="label-text">Mailchimp Api Key</Label>
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
            <span>Loading Mailchimp Data</span>
          </div>
        )}
        <div className="settings-group">
          {mc?.mailchimpData?.lists?.length > 0 && (
            <label htmlFor="list-id">
              <Label>Mailchimp List</Label>
              <select
                name="serviceListId"
                id="list-id"
                value={form.serviceListId}
                onChange={updateForm}
                data-cardname={cardname}
              >
                <option key="--" value={null}>
                  Select a List
                </option>
                {mc?.mailchimpData?.lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          {list?.groups?.length > 0 && (
            <label className="mb-8" htmlFor="group-id">
              <Label>Mailchimp Group</Label>
              <select
                name="serviceGroupId"
                id="group-id"
                value={form.serviceGroupId}
                onChange={updateForm}
                data-cardname={cardname}
              >
                <option key="--" value={null}>
                  Select a Group
                </option>
                {Object.keys(groupsByParent)?.map((parent) => (
                  <optgroup key={parent} label={parent}>
                    {groupsByParent[parent].map((group) => {
                      return (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
    </>
  );
}

export function useMailChimpLists(apiKey) {
  const {
    data: mcListData,
    loading: listLoading,
    error: listError,
  } = useQuery(MC_LIST_QUERY, { variables: { apiKey } });
  return { mcListData, listLoading, listError };
}
const MC_LIST_QUERY = gql`
  query MC_LIST_QUERY($apiKey: String) {
    mailchimpData(apiKey: $apiKey) {
      lists {
        name
        id
        groups {
          parentGroupName
          name
          id
        }
      }
    }
  }
`;
