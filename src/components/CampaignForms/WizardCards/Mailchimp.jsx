import { useLazyQuery, gql } from "@apollo/client";
import { WizardFormButton } from "./WizardCards";
import React from "react";

export default function MailchimpSetupForm({
  style,
  cards,
  item,
  updateFormData,
  nextCard,
  formData,
  mailserviceInfo,
}) {
  const [getLists, { mcListData, listsLoading, listsError }] = useLazyMCLists(
    formData.mailserviceInfo.serviceApiKey
  );

  async function interceptThenUpdate(e) {
    updateFormData(e);
    const { value, name } = e.target;
    getLists();
  }
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
            onChange={interceptThenUpdate}
            data-cardname={cards[item]}
          />
          {formData.mailserviceInfo.serviceApiKey && listsError?.message}
        </label>
        {mcListData?.getMailServiceLists?.lists?.length > 0 && (
          <label htmlFor="list-id">
            <span className="label-text">Mail Service List Id</span>
            <select
              name="serviceListId"
              id="list-id"
              value={formData.mailserviceInfo.serviceListId}
              onChange={interceptThenUpdate}
              data-cardname={cards[item]}
            >
              {mcListData?.getMailServiceLists?.lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {/*<label htmlFor="group-id">
          <span className="label-text">Mail Service Group Id</span>
          <input
            type="text"
            name="serviceGroupId"
            id="group-id"
            value={formData.mailserviceInfo.serviceGroupId}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
          {formData.mailserviceInfo.serviceApiKey &&
            !validFields.serviceApiKey.isValid &&
            validFields.serviceApiKey.error}
    </label>*/}
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

function useLazyMCLists(apiKey) {
  const [
    getLists,
    { data: mcListData, loading: listLoading, error: listError },
  ] = useLazyQuery(MC_LIST_QUERY, { variables: { apiKey } });
  return [getLists, { mcListData, listLoading, listError }];
}
const MC_LIST_QUERY = gql`
  query MC_LIST_QUERY($apiKey: String) {
    getMailServiceLists(apiKey: $apiKey, mailservice: "mailchimp") {
      lists {
        name
        id
      }
    }
  }
`;
