import React from "react";
import styled, { css } from "styled-components";

import HeaderComp from "../components/Header/Header";
import GlobalStyle from "../designSystem/globalStyles";

const DashboardLayout = ({ children, className }) => {
  return (
    <div className={className}>
      <HeaderComp
        includeLogo
        includeUserMenu
        css={`
          grid-row: 1/2;
          grid-column: 1/-1;
        `}
      />
      <div
        style={{
          gridColumn: ` 1/2`,
          gridRow: `1/4`,
        }}
      ></div>
      <PageContent>{children}</PageContent>
      <GlobalStyle />
    </div>
  );
};
export default styled(DashboardLayout)`
  min-height: 100vh;
  /*overflow: auto;*/
  padding: 0;
  ${HeaderComp} {
    width: 100%;
  }
  background: white;
`;

const PageContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  padding: 20px;
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.below.small`
    grid-column: 1/-1;
    margin-top:30px;
  `}/*overflow-x: auto;*/
  /*overflow-y: scroll;*/
`;
