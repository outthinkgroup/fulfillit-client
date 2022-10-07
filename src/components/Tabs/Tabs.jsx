import * as React from "react";
import styled from "styled-components";

export default function Tabs({ tabs }) {
  const tablist = Object.keys(tabs);
  const [selected, setSelected] = React.useState(tablist[0]);
  function selectTab(key) {
    setSelected(key);
  }
  const ActiveTab = tabs[selected];
  return (
    <TabsWrapper>
      <ul className="tab-buttons">
        {tablist.map((tabname) => (
          <li>
            <button
              className={selected == tabname && `active`}
              onClick={() => selectTab(tabname)}
            >
              {tabname}
            </button>
          </li>
        ))}
      </ul>
      <ActiveTab />
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  /* display: flex;
  position: static; */
  .tab-buttons {
    height: auto;
    position: sticky;
    top: 1rem;
    left: 0px;
    /*display: flex;*/
    flex-direction: column;
    max-width: 250px;
    list-style: none;
  }
  .tab-buttons button {
    padding: 1rem 0.5rem;
    background: transparent;
    color: black;
    font-weight: bold;
    margin: 0;
  }
`;
