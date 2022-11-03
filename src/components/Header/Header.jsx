import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import Logo from "../../elements/Logo";
import Navigation from "../Navigation/Navigation";

export const USER_DATA = gql`
  query USER_DATA {
    viewer {
      id
      name
      email
    }
  }
`;

const HeaderComp = ({ includeLogo }) => {
  const { data, loading, error } = useQuery(USER_DATA);

  return (
    <header className="bg-blue-900">
      <div
        className={`mx-auto flex max-w-screen-lg items-center p-5 ${
          includeLogo ? "justify-between" : "justify-end"
        } `}
      >
        <span className="flex items-center">
          <Logo includeLogo={includeLogo} />
        </span>
        <Navigation userData={data && data.viewer} />
      </div>
    </header>
  );
};

export default styled(HeaderComp)`
  background: var(--primary-dark);
  .wrapper {
    display: flex;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    height: 100%;
    padding: 20px;
    width: 100%;
    justify-content: ${({ includeLogo }) =>
      includeLogo ? "space-between" : "flex-end"};
    ${({ theme }) => theme.below.small`
      justify-content:space-between;
    `}
  }
`;
