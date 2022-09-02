import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "../../../designSystem/styles";
import { useMailChimpLists } from "../WizardCards/Mailchimp";

const CampaignDetails = ({ form, updateForm, className }) => {
  const { mcListData, listLoading, listsError } = useMailChimpLists(
    form?.serviceApiKey
  );

  console.log(listLoading);
  const list = React.useMemo(
    () =>
      mcListData?.getMailServiceLists?.lists?.find(
        (list) => list.id === form.serviceListId
      ),
    [mcListData, form]
  );
  const groupsByParent = list?.groups.reduce((acc, group) => {
    if (!(group.parentGroupName in acc)) {
      acc[group.parentGroupName] = [];
    }
    acc[group.parentGroupName].push(group);
    return acc;
  }, {});

  if (Object.keys(form).length === 0) return "loading.................";
  return (
    <div className={className}>
      <h2>Campaign Settings</h2>
      <div className="form-section">
        <h3>General Settings</h3>
        <label htmlFor="name">
          <span>Campaign Name</span>
          <input
            type="text"
            onChange={updateForm}
            name="name"
            id="name"
            value={form.name}
          />
        </label>
        <label htmlFor="email">
          <span>Campaign Email</span>
          <span className="emailFieldWithSuffix">
            <input
              type="text"
              onChange={updateForm}
              name="email"
              id="email"
              value={form.email || ""}
            />
            <span className="suffix">@sendmagnet.com</span>
          </span>
        </label>
        <label htmlFor="service">
          <span>Email Marketing Service</span>
          <select
            name="emailMarketingService"
            onChange={updateForm}
            id="service"
            value={form.emailMarketingService}
          >
            <option value="">choose a email marketing service</option>
            <option value="mailchimp">mailchimp</option>
            <option value="mailgun">mailgun</option>
            <option value="converkit">converkit</option>
          </select>
        </label>
      </div>

      <div className="form-section">
        <h3>Mailchimp Settings</h3>
        {listLoading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Loader />
            <span>Loading Mailchimp Data</span>
          </div>
        )}
        {mcListData?.getMailServiceLists?.lists?.length > 0 && (
          <label htmlFor="list-id">
            <span className="label-text">Mail Service List Id</span>
            <select
              name="serviceListId"
              id="list-id"
              value={form.serviceListId}
              onChange={updateForm}
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

        {list?.groups?.length > 0 && (
          <label htmlFor="group-id">
            <span className="label-text">Mail Service Interest Group</span>
            <select
              name="serviceGroupId"
              id="group-id"
              value={form.serviceGroupId}
              onChange={updateForm}
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
      <div className="form-section">
        <h3>Publish</h3>
        <label>
          <span>Publish or Pause</span>
          <select value={form.status} onChange={updateForm} name="status">
            <option value="publish">Publish</option>
            <option value="draft">Pause</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default styled(CampaignDetails)`
  position: relative;
  h2 {
    margin-bottom: 30px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  label {
    margin-bottom: 37px;

    /* justify-content: space-between;
    display: flex;
    align-content: center; */
    height: 100%;
    input {
      max-width: 250px;
    }
    span {
      display: block;
      min-width: 170px;
      font-size: 18px;
      font-weight: 300;
    }
  }
  .emailFieldWithSuffix {
    display: flex;
    align-items: center;

    .suffix {
      margin-top: 5px;
      margin-left: 10px;
    }
  }
`;
