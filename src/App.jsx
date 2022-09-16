import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/sign-in";
import NewCampaign from "./pages/new-campaign";
import CampaignSingle from "./pages/campaign";

// DOCS: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
export default function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" index element={<Dashboard />} />

        <Route path="/campaign" element={<CampaignSingle />} />

        <Route path="/sign-in" element={<SignIn />} />

        <Route path="/new-campaign" element={<NewCampaign />} />
      </Routes>
    </Router>
  );
}
