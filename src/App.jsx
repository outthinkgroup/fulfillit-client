import * as React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import {
  DashboardPage,
  SignInPage,
  CampaignSingle,
  NewCampaignPage,
  NotFound,
  ResetPasswordPage,
} from "./pages";
import CampaignAnalytics from "./components/CampaignSingle/CampaignAnalytics/CampaignAnalytics";
import { CampaignInbox } from "./components/CampaignSingle/CampaignInbox/CampaignInbox";
import EditCampaignForm from "./components/CampaignForms/EditCampaign/EditCampaignForm";
import Logs from "./components/CampaignSingle/CampaignAnalytics/Logs";
import { DeleteCampaign } from "./components/CampaignSingle/DeleteCampaign/DeleteCampaign";

const SentryRoutes = import.meta.env.DEV ? Routes : Sentry.withSentryReactRouterV6Routing(Routes);

// DOCS: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
export default function App() {
  return (
    <Router basename="/">
      <SentryRoutes>
        <Route path="/" index element={<DashboardPage />} />

        <Route path="/campaign/:campaignId" element={<CampaignSingle />}>
          <Route path="inbox" element={<CampaignInbox />} />
          <Route path="settings" element={<EditCampaignForm />} />
          <Route path="logs" element={<Logs />} />
          <Route path="delete" element={<DeleteCampaign />} />
          <Route index element={<CampaignAnalytics />} />
        </Route>

        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/new-campaign" element={<NewCampaignPage />} />

        <Route path="*" element={<NotFound />} />
      </SentryRoutes>
    </Router>
  );
}
