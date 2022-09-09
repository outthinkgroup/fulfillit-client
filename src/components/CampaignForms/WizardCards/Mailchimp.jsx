import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { WizardFormButton } from "./WizardCards";
import { Loader } from "../../../designSystem/styles";

export default function MailchimpSetupForm({
  style,
  cards,
  item,
  updateFormData,
  nextCard,
  formData,
  mailserviceInfo,
}) {
  const { mcListData:mc, listLoading, listsError } = useMailChimpLists(
    formData.mailserviceInfo.serviceApiKey
  );

  const list = React.useMemo(
    () =>
      mc?.mailchimpData?.lists?.find(
        (list) => list.id === formData.mailserviceInfo.serviceListId
      ),
    [mc, formData]
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
        <h3>Email Service Info</h3>
        <label htmlFor="api-key">
          <span className="label-text">Mail Service Api Key</span>
          <input
            type="text"
            name="serviceApiKey"
            id="api-key"
            value={formData.mailserviceInfo.serviceApiKey}
            onChange={(e) => {
              updateFormData(e);
            }}
            data-cardname={cards[item]}
          />
          {formData.mailserviceInfo.serviceApiKey && listsError?.message}
        </label>
        {listLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Loader />
            <span>Loading Mailchimp Data</span>
          </div>
        )}
        {mc?.mailchimpData?.lists?.length > 0 && (
          <label htmlFor="list-id">
            <span className="label-text">Mail Service List Id</span>
            <select
              name="serviceListId"
              id="list-id"
              value={formData.mailserviceInfo.serviceListId}
              onChange={updateFormData}
              data-cardname={cards[item]}
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
          <label htmlFor="group-id">
            <span className="label-text">Mail Service Interest Group</span>
            <select
              name="serviceGroupId"
              id="group-id"
              value={formData.mailserviceInfo.serviceGroupId}
              onChange={updateFormData}
              data-cardname={cards[item]}
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
      <div className="card-nav">
        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={nextCard}
        />
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
    mailchimpData(apiKey: $apiKey ) {
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
