import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navigation = ({ className, userData = false }) => {
  const isLoggedIn = userData;
  function signOut() {
    localStorage.setItem("token", "");
    window.location.href = "/sign-in";
  }
  return (
    <nav className={className}>
      {!isLoggedIn ? (
        <>
          <Link to="/sign-in">sign in</Link>
        </>
      ) : (
        <>
          <Link to="/">Dashboard</Link>
          <button className="link" type="button" onClick={signOut}>
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
};

export default styled(Navigation)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  ${({ theme }) => theme.below.small`
    padding-right:20px;
  `}
  .link {
    background: none;
    box-shadow: none;
    font-size: 16px;
    font-weight: unset;
    padding: 0;
  }
  a,
  .link {
    white-space: nowrap;
    text-decoration: none;
    text-transform: capitalize;
    color: white;
    padding-left: 20px;
    &:hover {
      color: var(--primary-light);
    }
  }
`;
