import * as React from "react";

import MailchimpSetupForm from "./Mailchimp";
import MailerliteSetupForm from "./Mailerlite";
import ConvertkitSetupForm from "./Convertkit";

import { WizardFormButton } from "../NewCampaignWizard/WizardCards";

const Services = {
  mailchimp: (props) => <MailchimpSetupForm {...props} />,
  mailerlite: (props) => <MailerliteSetupForm {...props} />,
  convertkit: (props) => <ConvertkitSetupForm {...props} />,
};

const emptyNull = () => null;

export function EmailMarketingServiceConfig(props) {
  const Service = Services[props.service] || emptyNull;
  return <Service {...props} />;
}

export function EmailMarketingServiceConfigWizard({
  formData,
  cards,
  item,
  updateFormData,
  nextCard,
}) {
  return (
    <>
      <EmailMarketingServiceConfig
        service={formData.mailservice.emailMarketingService}
        form={formData.mailserviceInfo}
        cardname={cards[item]}
        updateForm={updateFormData}
      />
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
