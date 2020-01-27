import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CampaignDetails = ({ form, updateForm, className }) => {
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
          <input
            type="text"
            onChange={updateForm}
            name="email"
            id="email"
            value={form.email}
          />
        </label>
        <label htmlFor="service">
          <span>Email Marketing Service</span>
          <select
            name="service"
            onChange={updateForm}
            id="service"
            selected={form.service}
          >
            <option value="MailGun">Mail gun</option>
            <option value="Mailchimp">Mailchimp</option>
          </select>
        </label>
      </div>
      {form.service == "Mailchimp" && (
        <div className="form-section">
          <h3>Mailchimp Settings</h3>
          <label htmlFor="mc_api_key">
            <span>Mailchimp Api Key</span>
            <input
              type="text"
              onChange={updateForm}
              name="mailchimpApiKey"
              id="mc_api_key"
              value={form.mailchimpApiKey}
            />
          </label>
          <label htmlFor="mc_list_id">
            <span>Mailchimp List Id</span>
            <input
              type="text"
              onChange={updateForm}
              name="mailchimpListId"
              id="mc_list_id"
              value={form.mailchimpListId}
            />
          </label>
          <label htmlFor="mc_group_id">
            <span>Mailchimp Group Id</span>
            <input
              type="text"
              onChange={updateForm}
              name="mailchimpGroupId"
              id="mc_group_id"
              value={form.mailchimpGroupId}
            />
          </label>
        </div>
      )}
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
  .form-section {
    h3 {
    }
  }
  label {
    margin-bottom: 27px;

    justify-content: space-between;
    display: flex;
    align-content: center;
    height: 100%;
    span {
      display: flex;
      align-items: center;
      min-width: 170px;
      font-size: 20px;
      font-weight: 300;
    }
  }
`;
