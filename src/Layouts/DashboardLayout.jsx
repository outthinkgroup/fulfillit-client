import React from "react";

import HeaderComp from "../components/Header/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <HeaderComp includeLogo includeUserMenu />
      <main className="mx-auto w-full max-w-screen-lg flex-1 p-5 pt-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
