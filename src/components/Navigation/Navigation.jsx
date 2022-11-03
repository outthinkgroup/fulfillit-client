import React from "react";
import { Link } from "react-router-dom";

import { TextButton } from "../../elements/Button";

const Navigation = ({ userData = false }) => {
  const isLoggedIn = userData;
  function signOut() {
    localStorage.setItem("token", "");
    window.location.href = "/sign-in";
  }
  return (
    <nav className="flex items-center justify-end gap-2">
      {!isLoggedIn ? (
        <>
          <Link
            className="text-base font-normal capitalize tracking-normal text-white"
            to="/sign-in"
          >
            sign in
          </Link>
        </>
      ) : (
        <>
          <Link
            className="text-base font-normal capitalize tracking-normal text-white"
            to="/"
          >
            Dashboard
          </Link>
          <TextButton onClick={signOut} type="button">
            Sign Out
          </TextButton>
        </>
      )}
    </nav>
  );
};

export default Navigation;
