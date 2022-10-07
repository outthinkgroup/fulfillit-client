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
      <div className="view">
        <ActiveTab />
      </div>
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 0px;

  .tab-buttons {
    border-radius: 6px;
    margin: 0;
    border: 1px solid #eee;
    padding: 0;
    align-self: flex-start;
    position: sticky;
    top: 1rem;
    left: 0px;
    display: flex;
    flex-direction: column;
    min-width: 275px;
    width: 33%;
    max-width: 350px;
    list-style: none;
    background: #f9f9f9;
  }
  .tab-buttons button {
    padding: 1rem 0.5rem;
    width: 100%;
    box-shadow: none;
    background: transparent;
    color: black;
    font-weight: bold;
    margin: 0;
    border-radius: 0;
    text-align: left;
    &.active {
      background-color: white;
      border-left: 3px solid var(--primary-color);
    }
  }
  .tab-buttons li:not(:first-child) {
    border-top: 1px solid #eee;
  }
  .view {
    width: 100%;
  }
`;
