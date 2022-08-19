import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/sign-in";

//DOCS https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
export default function App() {
  return (
    <Router basename="/map">
      <Routes>
        <Route path="/" index element={<Dashboard />} />

        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}
