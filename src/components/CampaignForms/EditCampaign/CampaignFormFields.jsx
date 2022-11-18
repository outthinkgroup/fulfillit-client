import React from "react";
import { Label, Loader } from "../../../elements";
import { EmailMarketingServiceConfig } from "../EmailMarketingServiceConfig/EmailMarketingServiceConfig";

export default function CampaignSettings({ form, updateForm }) {
  if (Object.keys(form).length === 0) return <Loader />;
  return (
    <div className="relative max-w-screen-md">
      <h2 className="mb-8 text-xl font-bold tracking-tight">
        Campaign Settings
      </h2>
      <div className="">
        <h3 className="mb-3 text-lg font-bold tracking-tight">
          General Settings
        </h3>
        <div className="flex items-baseline gap-3">
          <label htmlFor="name" className="mb-8">
            <Label>Campaign Name</Label>
            <input
              type="text"
              onChange={updateForm}
              name="name"
              id="name"
              value={form.name}
            />
          </label>
          <label htmlFor="email" className="mb-8 ">
            <Label>Campaign Email</Label>
            <span className="emailFieldWithSuffix flex items-center gap-1">
              <input
                type="text"
                onChange={updateForm}
                name="email"
                id="email"
                className=""
                style={{ textAlign: "right" }}
                value={form.email || ""}
                autoComplete="0"
              />
              <span className="suffix pt-2">@sendmagnet.com</span>
            </span>
          </label>
        </div>
        <label htmlFor="service" className="mb-8">
          <Label>Email Marketing Service</Label>
          <select
            name="emailMarketingService"
            onChange={updateForm}
            id="service"
            value={form.emailMarketingService}
          >
            <option value="">choose a email marketing service</option>
            <option value="mailchimp">mailchimp</option>
            <option value="mailgun">mailgun</option>
            <option value="mailerlite">mailerlite</option>
            <option value="converkit">converkit</option>
          </select>
        </label>
      </div>

      <div className="">
        <EmailMarketingServiceConfig
          service={form.emailMarketingService}
          cardname="empty"
          updateForm={updateForm}
          form={form}
        />
      </div>
      <div className="">
        <h3 className="mb-3 text-lg font-bold tracking-tight">Publish</h3>
        <label className="mb-8">
          <Label>Publish or Pause</Label>
          <select value={form.status} onChange={updateForm} name="status">
            <option value="publish">Publish</option>
            <option value="draft">Pause</option>
          </select>
        </label>
      </div>
    </div>
  );
}
