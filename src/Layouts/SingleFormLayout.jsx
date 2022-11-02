import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";

const SingleFormLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col ">
      <Header includeLogo />
      <div className="mx-auto h-full w-full max-w-screen-md flex-1 py-8 px-6">
        {children}
      </div>
      <footer className="flex w-full items-center justify-center bg-blue-900 p-6 tracking-tight text-white">
        ©️{new Date().getFullYear()} Sendmagnet
      </footer>
    </div>
  );
};
export default SingleFormLayout;
const styles = `
  background: ${({ theme }) => theme.colors.lightGrey};
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;
  font-weight: 300;
  letter-spacing: -0.2px;
  padding: 20px;
  text-align: center;
  background: ${(props) =>
    props.background ? "hsl(212, 100%, 20%)" : "transparent"};
  color: ${({ background }) => (background ? "#fff" : "unset")};
`;
