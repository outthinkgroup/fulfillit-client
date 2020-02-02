import React, { useEffect, useState } from "react"
import styled from "styled-components"

const CampaignDetails = ({ form, updateForm, className }) => {
  if (Object.keys(form).length === 0) return "loading................."
  console.log(form.email)
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
            <span className="suffix">@mg.taskcannon.co</span>
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
        <label htmlFor="mc_api_key">
          <span>Mailchimp Api Key</span>
          <input
            type="text"
            onChange={updateForm}
            name="serviceApiKey"
            id="mc_api_key"
            value={form.serviceApiKey}
          />
        </label>
        <label htmlFor="mc_list_id">
          <span>Mailchimp List Id</span>
          <input
            type="text"
            onChange={updateForm}
            name="serviceListId"
            id="mc_list_id"
            value={form.serviceListId}
          />
        </label>
        <label htmlFor="mc_group_id">
          <span>Mailchimp Group Id</span>
          <input
            type="text"
            onChange={updateForm}
            name="serviceGroupId"
            id="mc_group_id"
            value={form.serviceGroupId}
          />
        </label>
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
  )
}

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
`
