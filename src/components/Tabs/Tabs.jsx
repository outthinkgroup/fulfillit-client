import * as React from "react";

export default function Tabs({ tabs }) {
  const tablist = Object.keys(tabs);
  const [selected, setSelected] = React.useState(tablist[0]);
  function selectTab(key) {
    setSelected(key);
  }
  const ActiveTab = tabs[selected];
  return (
    <div className="flex items-start gap-6 pt-0">
      <ul className="tab-buttons sticky top-4 m-0 flex w-1/3 min-w-[275px] max-w-[350px] flex-col rounded-md border border-gray-200 bg-gray-100 ">
        {tablist.map((tabname) => (
          <li className="relative" key={tabname}>
            <button
              className={`h-full w-full rounded-none text-left text-black ${
                selected == tabname
                  ? `border-0  border-l-4 border-solid  border-blue-600 bg-white `
                  : `bg-transparent`
              }`}
              onClick={() => selectTab(tabname)}
            >
              {tabname}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-1">
        <ActiveTab />
      </div>
    </div>
  );
}
