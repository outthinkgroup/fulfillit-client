import React from "react";
import HeaderComp from "../components/Header/Header";
import GlobalStyle from "../designSystem/globalStyles";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderComp includeLogo={true} />
      <div className="mx-auto h-full w-full max-w-screen-lg flex-1 py-8 px-6">
        {children}
      </div>
      <footer className="flex w-full items-center justify-center bg-blue-900 p-6 tracking-tight text-white">
        ©️{new Date().getFullYear()} Sendmagnet
      </footer>
      <GlobalStyle />
    </div>
  );
};
export default MainLayout;
