import React, { useState } from "react"
import styled from "styled-components"
import { useTransition, animated } from "react-spring"

import Card from "../../elements/Card"
import NavigationProgress from "../NavigationProgress/NavigationProgress"
import { allFieldsHaveData } from "../../utils/formValidation"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import { navigate } from "gatsby"
import { CAMPAIGNS } from "../CampaignList/CampaignList"
import FormCards from "../WizardCards/WizardCards"

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
  //Form state
  const [formData, setFormData] = useState(FORM_DEFAULT_STATE)

  const { general, mailservice, mailserviceInfo, finish } = formData
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

  const cards = Object.keys(formData)

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

  //card navigation
  const [currentCard, setCurrentCard] = useState(0)
  function nextCard(e) {
    e.preventDefault()
    const lastCard = cards.length - 1
    if (currentCard === lastCard) {
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

  //react spring stuff
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
        {transitions.map(({ item, key, props }) => {
          const ActiveCard = FormCards[item]
          return (
            <ActiveCard
              key={key}
              item={item}
              style={props}
              formData={formData}
              cards={cards}
              nextCard={nextCard}
              updating={updating}
              updateFormData={updateFormData}
              createNewCampaign={createNewCampaign}
            />
          )
        })}
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
  .finish button {
    width: 100%;
    font-size: 16px;
    display: block;
  }
`
