import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBarMenu = ({ closeSideBar = null }) => {
  return (
    <div>
      <NavGroup>
        <h3>Campaigns</h3>
        <nav>
          <ul>
            <li>
              <Link onClick={closeSideBar} to="/">
                Campaigns
              </Link>
            </li>
            <li>
              <Link onClick={closeSideBar} to="/new-campaign">
                Create New Campaign
              </Link>
            </li>
          </ul>
        </nav>
      </NavGroup>
      <NavGroup>
        <h3>Account</h3>
        <nav>
          <ul>
            {/*// <li>
            //   <Link onClick={closeSideBar} to="/settings">
            //     User Settings
            //   </Link>
            // </li>*/}
            <li>
              <Link onClick={closeSideBar} to="/account">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </NavGroup>
    </div>
  );
};
export default SideBarMenu;

const NavGroup = styled.div`
  margin-bottom: 30px;
  h3 {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 1.6px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  nav {
    ul {
      padding: 0px;
      margin: 0px -20px; /* allows the link to be full width */
    }
    li {
      list-style: none;
      a {
        letter-spacing: 0;
        color: unset;
        display: block;
        padding: 13px 20px;
      }
    }
  }
`;

const UpgradeButton = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  a.btn {
    align-self: flex-end;
    display: block;
    width: 100%;
    padding: 12px 20px;
    text-align: center;
    background: ${({ theme }) => theme.colors.lightBlue};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 25px;
  }
`;
