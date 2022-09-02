import { useQuery, gql } from "@apollo/client";
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
  const { mcListData, listsLoading, listsError } = useLazyMCLists(
    formData.mailserviceInfo.serviceApiKey
  );

  const groups = mcListData?.getMailServiceLists?.lists.find(
    (list) => list.id === formData.mailserviceInfo.serviceListId
  )?.groupCategories;

  const nestedGroups = groups?.find(
    (ng) => ng.id === formData.mailserviceInfo.serviceInterestGroupId
  )?.groups;

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
        {mcListData?.getMailServiceLists?.lists?.length > 0 && (
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
              {mcListData?.getMailServiceLists?.lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {groups?.length > 0 && (
          <label htmlFor="interest-group-id">
            <span className="label-text">Mail Service Interest Group</span>
            <select
              name="serviceInterestGroupId"
              id="interest-group-id"
              value={formData.mailserviceInfo.serviceInterestGroupId}
              onChange={updateFormData}
              data-cardname={cards[item]}
            >
              <option key="--" value={null}>
                Select a Group Category
              </option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        )}
        {nestedGroups?.length > 0 && (
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
              {nestedGroups?.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
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

function useLazyMCLists(apiKey) {
  const {
    data: mcListData,
    loading: listLoading,
    error: listError,
  } = useQuery(MC_LIST_QUERY, { variables: { apiKey } });
  return { mcListData, listLoading, listError };
}
const MC_LIST_QUERY = gql`
  query MC_LIST_QUERY($apiKey: String) {
    getMailServiceLists(apiKey: $apiKey, mailservice: "mailchimp") {
      lists {
        name
        id
        groupCategories {
          name
          id
          groups {
            name
            id
          }
        }
      }
    }
  }
`;

function useLazyMCInterestGroups({ apiKey, listId }) {
  const {
    data: mcInterestGroupsData,
    loading: interestGroupsLoading,
    error: interestGroupsError,
  } = useQuery(MC_INTEREST_GROUP_QUERY, { variables: { apiKey, listId } });
  return {
    mcInterestGroupsData,
    interestGroupsLoading,
    interestGroupsError,
  };
}
const MC_INTEREST_GROUP_QUERY = gql`
  query MC_INTEREST_GROUP_QUERY($apiKey: String, $listId: String) {
    getMailServiceInterestGroups(
      mailservice: "mailchimp"
      apiKey: $apiKey
      listId: $listId
    ) {
      interestGroups {
        name
        id
      }
    }
  }
`;

function useLazyMCGroups({ apiKey, listId, groupId }) {
  const {
    data: mcGroupsData,
    loading: groupsLoading,
    error: groupsError,
  } = useQuery(MC_GROUPS_QUERY, {
    variables: { apiKey, listId, groupCategoryId: groupId },
  });
  return { mcGroupsData, groupsLoading, groupsError };
}
const MC_GROUPS_QUERY = gql`
  query MC_GROUPS_QUERY(
    $apiKey: String
    $listId: String
    $groupCategoryId: String
  ) {
    getMailServiceGroups(
      mailservice: "mailchimp"
      apiKey: $apiKey
      listId: $listId
      groupCategoryId: $groupCategoryId
    ) {
      groups {
        name
        id
      }
    }
  }
`;
