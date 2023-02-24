# Sendmagnet Client

## How to add a new Email Service to the client

1. create a new File in `src/components/CampaignForms/EmailMarketingServiceConfigInfo/<email-service-name>.jsx`

   1. create a gql query:
      - try and follow naming convention of `<EmailServiceInitials>_<Resource>_QUERY` all caps as well.
      - add the required variables
      - query for all data that is needed to set up a campaign

   ```javascript
   const CK_FORM_QUERY = gql`
     query CK_FORM_QUERY($apiKey: String, $publicKey: String) {
       #adding variables
       convertkitData(apiKey: $apiKey, publicKey: $publicKey) {
         #querying for the required data to set up campaign
         forms {
           name
           id
         }
       }
     }
   `;
   ```

   2. create `use<EmailService>Data()` hook that is a wrapper around `useQuery`

   ```javascript
   export function useConverkitData(apiKey, publicKey) {
     return useQuery(CK_FORM_QUERY, { variables: { apiKey, publicKey } });
   }
   ```

   3. Copy a working component to use as a reference to how the new one should work. Replace where makes sense.
      - Mailerlite is a good one to copy as its the simplest
      - if you have fields that depend on each other look at the Mailchimp component
      1. Replace all of old component code that is specific to that service you copied with the name and resources of
         the one you are adding
      2. make sure you are setting the name for each input as the name of the field you want to update in the form
         - example:
         ```javascript
           <select
             name="serviceListId" // this matches
             id="list-id"
             value={form.serviceListId} // this key
             onChange={updateForm}
             data-cardname={cardname}
           >
         ```
   4. Add your component to the list of emailservice in
      `src/components/CampaignForms/EmailMarketingServiceConfigInfo/EmailMarketingServiceConfigInfo.jsx`

      ```javascript
      const Services = {
        mailchimp: (props) => <MailchimpSetupForm {...props} />,
        mailerlite: (props) => <MailerliteSetupForm {...props} />,
        convertkit: (props) => <ConvertkitSetupForm {...props} />,
        // add yours here just like this 👇
        //service_slug: (props)=><YourComponentForService {...props}/>
      };
      ```

      - This will make it available to be used

   5. if your component has additional required fields that are not on this list:

      - "serviceApiKey",
      - "emailMarketingService",
      - "name",
      - "email",
      - "status",

      Then you will need to add it to the `EmailServiceRequiredFields` object in file `src/utils/formValidation.js`

      ```javascript
      const EmailServiceRequiredFields = {
        convertkit: ["servicePublicKey"],
        youremailserviceslug: ["formFieldName"],
      };
      ```

      you will also need to add that option if its not already there to the `FORM_DEFAULT_STATE` variable in
      `src/components/CampaignForms/NewCampaignWizard/NewCampaignWizard.jsx`

      ```javascript
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
          //here
          serviceExampleField: "", // <- like this
        },
        finish: {
          status: "",
        },
      };
      ```
    6. Add it to the list of options in `src/components/CampaignForms/EditCampaign/CampaignFormFields.jsx` and
    `src/components/CampaignForms/NewCampaignWizard/WizardCards.jsx`
    ```javascript
          <select
            name="emailMarketingService"
            onChange={updateForm}
            id="service"
            value={form.emailMarketingService}
          >
            <option value="">choose a email marketing service</option>
            <option value="mailchimp">Mailchimp</option>
            <option value="mailerlite">Mailerlite</option>
            <option value="convertkit">ConvertKit</option>
            <option value="yourservice">Your Service</option>//<- like this
          </select>
    ```

`

