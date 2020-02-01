import React from "react"
import styled from 'styled-components'
import {  animated } from "react-spring"
import { allFieldsHaveData } from "../utils/formValidation"


const FormCards = [
  ({ style, cards, item, updateFormData, nextCard, formData }) => (
    <WizardCard depth="medium" style={{ ...style }}>
      <div className="general-info">
        <h3>General</h3>
        <label htmlFor="name">
          <span className="label-text">Campaign Name</span>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.general.name}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
        </label>
        <label htmlFor="email">
          <span className="label-text">
            The Email Your Users Will forward or send their message to
          </span>
          <input
            onChange={updateFormData}
            type="text"
            name="email"
            id="email"
            value={formData.general.email}
            data-cardname={cards[item]}
          />
        </label>
        <label htmlFor="description">
          <span className="label-text">
            Short Description of what your campaign does.
          </span>
          <textarea
            name="description"
            id="description"
            rows="3"
            value={formData.general.description}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
        </label>
      </div>
      <div className="card-nav">
        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={nextCard}
        />
      </div>
    </WizardCard>
  ),
  ({ style, cards, item, updateFormData, nextCard, formData }) => (
    <WizardCard depth="medium" style={{ ...style }}>
      <div className="mailservice">
        <h3>Email Service</h3>
        <label htmlFor="mailservice">
          <span className="label-text">
            Select which Email Marketing Service You want to deliver your
            message too
          </span>
          <select
            id="mailservice"
            name="emailMarketingService"
            value={formData.mailservice.emailMarketingService}
            onChange={updateFormData}
            data-cardname={cards[item]}
          >
            <option value="">choose a email marketing service</option>
            <option value="mailchimp">mailchimp</option>
            <option value="mailgun">mailgun</option>
            <option value="converkit">converkit</option>
          </select>
        </label>
      </div>
      <div className="card-nav">
        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={nextCard}
        />
      </div>
    </WizardCard>
  ),
  ({ style, cards, item, updateFormData, nextCard, formData, mailserviceInfo }) => (
    <WizardCard depth="medium" style={{ ...style }}>
      <div className="mailservice-info">
        <h3>Email Service Info</h3>
        <label htmlFor="api-key">
          <span className="label-text">Mail Service Api Key</span>
          <input
            type="text"
            name="serviceApiKey"
            id="api-key"
            value={formData.mailserviceInfo.serviceApiKey}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
        </label>
        <label htmlFor="list-id">
          <span className="label-text">Mail Service List Id</span>
          <input
            type="text"
            name="serviceListId"
            id="list-id"
            value={formData.mailserviceInfo.serviceListId}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
        </label>
        <label htmlFor="group-id">
          <span className="label-text">Mail Service Group Id</span>
          <input
            type="text"
            name="serviceGroupId"
            id="group-id"
            value={formData.mailserviceInfo.serviceGroupId}
            onChange={updateFormData}
            data-cardname={cards[item]}
          />
        </label>
      </div>
      <div className="card-nav">
        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={nextCard}
        />
      </div>
    </WizardCard>
  ),
  ({ style, cards, item, updateFormData, updating, createNewCampaign, finish, formData }) => (
    <WizardCard depth="medium" style={{ ...style }}>
      <div className="finish">
        <h3>Publish</h3>
        <label htmlFor="publish">
          <span className="label-text">Publish campaign</span>
          <select
            value={formData.finish.status}
            onChange={updateFormData}
            name="status"
            id="publish"
            data-cardname={cards[item]}
          >
            <option value="">Choose How To Publish</option>
            <option value="publish">Publish</option>
            <option value="draft">pause</option>
          </select>
        </label>

        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={createNewCampaign}
          txt={updating ? "creating...." : "Create Campaign"}
        />
      </div>
    </WizardCard>
  ), 
]

const WizardCard = styled(animated.div)`
  width: 100%;
  padding: 20px;

  border-radius: 4px;
  box-shadow: ${props => props.depth && props.theme.depth[props.depth]};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  overflow: hidden;
  & > {
    h1:first-child,
    h2:first-child,
    h3:first-child,
    h4:first-child,
    h5:first-child {
      margin-top: 0px;
    }
  }
`
const WizardFormButton = ({ card, formData, fn, txt = "next" }) => {
  return allFieldsHaveData(card, formData) ? (
    <button type="button" onClick={fn}>
      {txt}
    </button>
  ) : (
    ""
  )
}


export default FormCards
export { WizardCard, WizardFormButton }
