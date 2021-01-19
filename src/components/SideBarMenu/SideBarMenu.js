import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

import Logo from "../../elements/Logo"
import theme from "../../designSystem/theme"

const SideBarMenu = ({ closeSideBar = null }) => {
  return (
    <div>
      <NavGroup>
        <h3>Campaigns</h3>
        <nav>
          <ul>
            <li>
              <Link onClick={closeSideBar} to="/dashboard">
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
            <li>
              <Link onClick={closeSideBar} to="/">
                User Settings
              </Link>
            </li>
            <li>
              <Link onClick={closeSideBar} to="/">
                Billing
              </Link>
            </li>
            <li>
              <Link onClick={closeSideBar} to="/">
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </NavGroup>
      <UpgradeButton>
        <Link onClick={closeSideBar} to="/" className="btn">
          Upgrade Plan
        </Link>
      </UpgradeButton>
    </div>
  )
}
export default SideBarMenu

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
`

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
`
