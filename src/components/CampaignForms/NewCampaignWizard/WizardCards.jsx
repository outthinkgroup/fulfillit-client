import React from "react";
import { animated } from "react-spring";
import { Label, SendmagnetEmailInput } from "../../../elements";
import { allFieldsHaveData } from "../../../utils/formValidation";
import { EmailMarketingServiceConfigWizard } from "../EmailMarketingServiceConfig/EmailMarketingServiceConfig";

const FormCards = [
  ({ style, cards, item, updateFormData, nextCard, formData }) => (
    <animated.div
      className=" h-full  w-full bg-white p-4 shadow-lg"
      style={{ ...style }}
    >
      <div className="general-info flex flex-col">
        <h3 className="mb-8 text-lg font-bold">General</h3>
        <label htmlFor="name">
          <Label>Campaign Name</Label>
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
          <Label>Campaign Handle</Label>
          <SendmagnetEmailInput
            onChange={updateFormData}
            type="text"
            name="email"
            id="email"
            value={formData.general.email}
            cardname={cards[item]}
          />
          <p className="text-xs">
            This will be the email that users will email to get on your list
          </p>
        </label>
        <label htmlFor="description">
          <Label>Short Description of What Your Campaign Does</Label>
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
    </animated.div>
  ),
  ({ style, cards, item, updateFormData, nextCard, formData }) => (
    <animated.div
      className="h-full  w-full bg-white p-4 shadow-lg"
      style={{ ...style }}
    >
      <div className="mailservice">
        <h3 className="mb-8 text-lg font-bold">Email Service</h3>
        <label htmlFor="mailservice">
          <Label>
            Select Which Email Marketing Service You Want to Subscribe Your
            Users To
          </Label>
          <select
            id="mailservice"
            name="emailMarketingService"
            value={formData.mailservice.emailMarketingService}
            onChange={updateFormData}
            data-cardname={cards[item]}
          >
            <option value="">Choose an Email Marketing Service</option>
            <option value="mailchimp">Mailchimp</option>
            <option value="mailerlite">MailerLite</option>
            <option value="convertkit">ConvertKit</option>
            <option value="convertkit_v4">ConvertKit v4</option>
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
    </animated.div>
  ),
  (props) => {
    return (
      <animated.div
        className="h-full w-full bg-white p-4 shadow-lg"
        style={{ ...props.style }}
      >
        <EmailMarketingServiceConfigWizard {...props} />
      </animated.div>
    );
  },
  ({
    style,
    cards,
    item,
    updateFormData,
    updating,
    createNewCampaign,
    finish,
    formData,
  }) => (
    <animated.div
      className="h-full w-full bg-white p-4 shadow-lg"
      style={{ ...style }}
    >
      <div className="finish">
        <h3 className="mb-8 text-lg font-bold">Publish</h3>
        <label htmlFor="publish">
          <Label>Publish Campaign</Label>
          <select
            value={formData.finish.status}
            onChange={updateFormData}
            name="status"
            id="publish"
            data-cardname={cards[item]}
          >
            <option value="">Choose How to Publish</option>
            <option value="publish">Publish</option>
            <option value="draft">Pause</option>
          </select>
        </label>

        <WizardFormButton
          card={cards[item]}
          formData={formData}
          fn={createNewCampaign}
          txt={updating ? "Creating..." : "Create Campaign"}
        />
      </div>
    </animated.div>
  ),
];

const WizardFormButton = ({ card, formData, fn, txt = "Next" }) => {
  return allFieldsHaveData(card, formData) ? (
    <button
      className="rounded bg-blue-600 text-sm text-white"
      type="button"
      onClick={fn}
    >
      {txt}
    </button>
  ) : (
    ""
  );
};

export default FormCards;
export { WizardFormButton };
