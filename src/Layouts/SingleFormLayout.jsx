import React from "react";
import Header from "../components/Header/Header";

const SingleFormLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-gray-100">
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
