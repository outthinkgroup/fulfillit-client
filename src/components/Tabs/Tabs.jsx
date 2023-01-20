import * as React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";

export default function Tabs({ tabs, children }) {
  const location = useLocation();
  const isIndex = /\/campaign\/([a-z-0-9-A-Z])*==$/.test(location.pathname);
  console.log(isIndex);
  const tablist = Object.keys(tabs);
  return (
    <div className="flex items-start gap-6 pt-0">
      <ul className="tab-buttons sticky top-4 m-0 flex w-1/3 min-w-[275px] max-w-[350px] overflow-hidden flex-col rounded-md border border-gray-200 bg-gray-100 ">
        {tablist.map((tabname) => (
          <li className="relative" key={tabname}>
            <NavLink to={tabs[tabname]}
          className={({ isActive })=>`h-full w-full rounded-none block py-2 px-1 text-left text-lg font-medium ${isActive && (tabname != "Overview" || isIndex) ? "bg-white text-blue-600" : "text-black"}`}
            >
              {tabname}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex-1">
    {children}
      </div>
    </div>
  );
}
