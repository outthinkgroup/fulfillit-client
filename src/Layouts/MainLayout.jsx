import React from "react";
import styled from "styled-components";
import HeaderComp from "../components/Header/Header";
import GlobalStyle from "../designSystem/globalStyles";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderComp includeLogo={true} />
      <PageContent>{children}</PageContent>
      <Footer background>©️{new Date().getFullYear()} fSendmagnet</Footer>
      <GlobalStyle />
    </div>
  );
};
export default styled(MainLayout)`
  min-height: 100vh;
  max-width: 100vw;
`;

const PageContent = styled.div`
  height: 100%;
  max-width: 962px;
  width: 100%;
  padding: 30px 20px;
  margin: 0 auto;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  letter-spacing: -0.2px;
  text-align: center;
  background: ${(props) =>
    props.background ? "hsl(212, 100%, 20%)" : "transparent"};
  color: ${({ background }) => (background ? "#fff" : "unset")};
`;
