import React, { useState } from "react";
import { useTransition } from "react-spring";

import NavigationProgress from "./NavigationProgress";
import { allFieldsHaveData } from "../../../utils/formValidation";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import FormCards from "./WizardCards";

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
    servicePublicKey:"",
    segmentationLevel2: "",
    segmentationLevel1: "",
  },
  finish: {
    status: "",
  },
};

const NEW_CAMPAIGN = gql`
  mutation NEW_CAMPAIGN(
    $email: String
    $emailMarketingService: String
    $name: String
    $serviceApiKey: String
    $servicePublicKey: String
    $segmentationLevel2: String
    $segmentationLevel1: String
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
        servicePublicKey: $servicePublicKey
        segmentationLevel2: $segmentationLevel2
        segmentationLevel1: $segmentationLevel1
        description: $description
        status: $status
      }
    ) {
      campaign {
        id
        databaseId
        email: title
        date
        meta {
          id
          description
          emailMarketingService
          name
          serviceApiKey
          servicePublicKey
          segmentationLevel1
          segmentationLevel2
        }
      }
    }
  }
`;

const NewCampaignWizard = ({}) => {
  //Form state
  const [formData, setFormData] = useState(FORM_DEFAULT_STATE);

  const { general, mailservice, mailserviceInfo, finish } = formData;
  function updateFormData(e) {
    const { name, value, dataset } = e.target;
    setFormData({
      ...formData,
      [dataset.cardname]: {
        ...formData[dataset.cardname],
        [name]: value,
      },
    });
  }

  const cards = Object.keys(formData);

  const navigate = useNavigate();
  const [createNewCampaign, { loading: updating, error }] = useMutation(
    NEW_CAMPAIGN,
    {
      variables: {
        email: general.email,
        name: general.name,
        description: general.description,
        emailMarketingService: mailservice.emailMarketingService,
        serviceApiKey: mailserviceInfo.serviceApiKey,
        servicePublicKey: mailserviceInfo.servicePublicKey,
        segmentationLevel2: mailserviceInfo.segmentationLevel2,
        segmentationLevel1: mailserviceInfo.segmentationLevel1,
        status: finish.status,
      },
      refetchQueries: ["CAMPAIGNS"],
      onCompleted() {
        navigate("/");
      },
    }
  );

  //card navigation
  const [currentCard, setCurrentCard] = useState(0);
  function nextCard(e) {
    e.preventDefault();
    const lastCard = cards.length - 1;
    if (currentCard === lastCard) {
      return;
    } else {
      tryToGoToCard(currentCard + 1);
    }
  }
  function tryToGoToCard(cardIndex) {
    const previousCard = currentCard > cardIndex;
    const cardIsComplete = allFieldsHaveData(cards[currentCard], formData);
    if (cardIsComplete || previousCard) {
      setCurrentCard(cardIndex);
    }
  }

  //react spring stuff
  const transitions = useTransition(currentCard, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translateX(-400px)",
    },
    enter: { position: "relative", opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, position: "absolute", transform: "translateX(400px)" },
  });

  return (
    <div className="">
      <NavigationProgress
        currentCard={currentCard}
        cards={cards}
        changeCardTo={tryToGoToCard}
        formData={formData}
      />
      <form className="">
        {transitions((props, item) => {
          const ActiveCard = FormCards[item];
          return (
            <ActiveCard
              key={item}
              item={item}
              style={props}
              formData={formData}
              cards={cards}
              nextCard={nextCard}
              updating={updating}
              updateFormData={updateFormData}
              createNewCampaign={createNewCampaign}
            />
          );
        })}
      </form>
    </div>
  );
};

export default NewCampaignWizard;
//
//   max-width: 475px;
//   padding-bottom: 300px;
//   margin-left: auto;
//   margin-right: auto;
//
//   label {
//     padding-bottom: 20px;
//   }
//   form {
//     padding-bottom: 30px;
//     display: grid;
//     grid-template-columns: 1fr;
//     ${Card} {
//       background: white;
//       grid-column: 1/2;
//       grid-row: 1/2;
//       min-height: 100%;
//     }
//   }
//   .card-nav {
//     display: flex;
//     justify-content: flex-end;
//   }
//   .finish button {
//     width: 100%;
//     font-size: 16px;
//     display: block;
//   }
// `;
