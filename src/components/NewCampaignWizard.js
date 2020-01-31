import React, { useState } from "react"
import styled from "styled-components"
import { useTransition, animated } from "react-spring"

import Card from "../elements/Card"
import NavigationProgress from "./NavigationProgress"
import { allFieldsHaveData } from "../utils/formValidation"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { navigate } from "gatsby"
import { CAMPAIGNS } from "./CampaignList"

export const FORM_DEFAULT_STATE = {
  general: {
    name: "",
    email: "",
    description: "",
  },
  mailservice: {
    emailMarketingService: "",
  },
  mailserviceInfo: {
    serviceApiKey: "",
    serviceListId: "",
    serviceGroupId: "",
  },
  finish: {
    status: "",
  },
}

const NEW_CAMPAIGN = gql`
  mutation NEW_CAMPAIGN(
    $email: String
    $emailMarketingService: String
    $name: String
    $serviceApiKey: String
    $serviceGroupId: String
    $serviceListId: String
    $description: String
    $status: String
  ) {
    newCampaign(
      input: {
        clientMutationId: "qweqweqwe"
        email: $email
        emailMarketingService: $emailMarketingService
        name: $name
        serviceApiKey: $serviceApiKey
        serviceGroupId: $serviceGroupId
        serviceListId: $serviceListId
        description: $description
        status: $status
      }
    ) {
      campaign {
        id
        databaseId
        email: title
        date
        campaignOptions {
          description
          emailMarketingService
          name
          serviceApiKey
          serviceGroupId
          serviceListId
        }
      }
    }
  }
`

const NewCampaignWizard = ({ className }) => {
  const cards = ["general", "mailservice", "mailserviceInfo", "finish"]
  const [formData, setFormData] = useState(FORM_DEFAULT_STATE)
  const { general, mailservice, mailserviceInfo, finish } = formData

  const [createNewCampaign, { data, loading: updating, error }] = useMutation(
    NEW_CAMPAIGN,
    {
      variables: {
        email: general.email,
        name: general.name,
        description: general.description,
        emailMarketingService: mailservice.emailMarketingService,
        serviceApiKey: mailserviceInfo.serviceApiKey,
        serviceGroupId: mailserviceInfo.serviceGroupId,
        serviceListId: mailserviceInfo.serviceListId,
        status: finish.status,
      },
      refetchQueries: ["CAMPAIGNS"],
      update(cache, payload) {
        const data = cache.readQuery({ query: CAMPAIGNS })
        const newCampaign = payload.data.newCampaign.campaign
        console.log(payload)
        data.viewer.campaigns.nodes = [
          newCampaign,
          ...data.viewer.campaigns.nodes,
        ]
        cache.writeQuery({ query: CAMPAIGNS, data })
      },
      onCompleted() {
        navigate("/dashboard")
      },
    }
  )

  function updateFormData(e) {
    const { name, value, dataset } = e.target
    setFormData({
      ...formData,
      [dataset.cardname]: {
        ...formData[dataset.cardname],
        [name]: value,
      },
    })
  }

  const [currentCard, setCurrentCard] = useState(0)
  function nextCard(e) {
    e.preventDefault()
    if (currentCard === cards.length - 1) {
      return
    } else {
      tryToGoToCard(currentCard + 1)
    }
  }
  function tryToGoToCard(cardIndex) {
    const previousCard = currentCard > cardIndex
    const cardIsComplete = allFieldsHaveData(cards[currentCard], formData)
    if (cardIsComplete || previousCard) {
      setCurrentCard(cardIndex)
    }
  }

  const transitions = useTransition(currentCard, card => card, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translateX(-400px)",
    },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(400px)" },
  })

  return (
    <div className={className}>
      <NavigationProgress
        currentCard={currentCard}
        cards={cards}
        changeCardTo={tryToGoToCard}
        formData={formData}
      />
      <form>
        {transitions.map(({ item, key, props }) =>
          item === 0 ? (
            <WizardCard depth="medium" style={props} key={key}>
              <div className="general-info">
                <h3>General</h3>
                <label htmlFor="name">
                  <span className="label-text">Campaign Name</span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={general.name}
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
                    value={general.email}
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
                    value={general.description}
                    onChange={updateFormData}
                    data-cardname={cards[item]}
                  />
                </label>
              </div>
              <div className="card-nav">
                {allFieldsHaveData(cards[item], formData) && (
                  <button onClick={nextCard}>next</button>
                )}
              </div>
            </WizardCard>
          ) : item === 1 ? (
            <WizardCard depth="medium" style={props} key={key}>
              <div className="mailservice">
                <h3>Email Service</h3>
                <label htmlFor="mailservice">
                  <span className="label-text">
                    Select which Email Marketing Service You want to deliver
                    your message too
                  </span>
                  <select
                    id="mailservice"
                    name="emailMarketingService"
                    value={mailservice.emailMarketingService}
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
                {allFieldsHaveData(cards[item], formData) && (
                  <button onClick={nextCard}>next</button>
                )}
              </div>
            </WizardCard>
          ) : cards[item] === "mailserviceInfo" ? (
            <WizardCard depth="medium" style={props} key={key}>
              <div className="mailservice-info">
                <h3>Email Service Info</h3>
                <label htmlFor="api-key">
                  <span className="label-text">Mail Service Api Key</span>
                  <input
                    type="text"
                    name="serviceApiKey"
                    id="api-key"
                    value={mailserviceInfo.serviceApiKey}
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
                    value={mailserviceInfo.serviceListId}
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
                    value={mailserviceInfo.serviceGroupId}
                    onChange={updateFormData}
                    data-cardname={cards[item]}
                  />
                </label>
              </div>
              <div className="card-nav">
                {allFieldsHaveData(cards[item], formData) && (
                  <button onClick={nextCard}>next</button>
                )}
              </div>
            </WizardCard>
          ) : (
            <WizardCard depth="medium" style={props} key={key}>
              <div className="finish">
                <h3>Publish</h3>
                <label htmlFor="publish">
                  <span className="label-text">Publish campaign</span>
                  <select
                    value={finish.status}
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

                <input
                  type="button"
                  onClick={e => {
                    createNewCampaign()
                  }}
                  value={updating ? "creating...." : "Create Campaign"}
                />
              </div>
            </WizardCard>
          )
        )}
      </form>
    </div>
  )
}

export default styled(NewCampaignWizard)`
  max-width: 475px;
  padding-bottom: 300px;
  margin-left: auto;
  margin-right: auto;

  label {
    padding-bottom: 20px;
  }
  form {
    padding-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 400px;
    ${Card} {
      background: white;
      grid-column: 1/2;
      grid-row: 1/2;
      min-height: 100%;
    }
  }
  .card-nav {
    display: flex;
    justify-content: flex-end;
  }
`
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
