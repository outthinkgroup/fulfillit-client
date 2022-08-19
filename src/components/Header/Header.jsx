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

const HeaderComp = ({ className, includeLogo, includeUserMenu }) => {
  const { data, loading, error } = useQuery(USER_DATA);

  return (
    <header className={className}>
      <span
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <Logo includeLogo={includeLogo} />
      </span>
      <Navigation userData={data && data.viewer} />
    </header>
  );
};

export default styled(HeaderComp)`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 100%;
  padding: 20px;
  width: 100%;
  justify-content: ${({ includeLogo }) =>
    includeLogo ? "space-between" : "flex-end"};
  ${({ theme }) => theme.below.small`
    justify-content:space-between;
  `}
`;
