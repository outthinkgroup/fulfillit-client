import * as React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  SignInPage,
  CampaignSingle,
  NewCampaignPage,
} from "./pages";

// DOCS: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
export default function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" index element={<DashboardPage />} />

        <Route path="/campaign" element={<CampaignSingle />} />

        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="/new-campaign" element={<NewCampaignPage />} />
      </Routes>
    </Router>
  );
}
