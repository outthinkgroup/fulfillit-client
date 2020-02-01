import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

import Logo from "../elements/Logo"
import Icon from "../elements/Icon"
import theme from "../designSystem/theme"
import { LocalContext } from "../utils/LocalContext"
import { Hamburger } from "../designSystem/styles"

const Sidebar = ({ className, isOpen }) => {
  const { localState, setLocalState } = useContext(LocalContext)
  return (
    <aside
      className={className}
      style={{
        display: localState.isSideBarOpen === "MOBILE_MENU" && "block",
      }}
    >
      <div className="container">
        <LogoSlot>
          <Hamburger
            className="hamburger"
            onClick={() => {
              if (localState.isSideBarOpen === "MOBILE_MENU") {
                setLocalState({ ...localState, isSideBarOpen: "NONE" })
              } else {
                setLocalState({ ...localState, isSideBarOpen: "MOBILE_MENU" })
              }
            }}
          >
            <span>
              <Icon name="menu" />
            </span>
          </Hamburger>
          <Logo />
        </LogoSlot>
        <NavGroup>
          <h3>Campaigns</h3>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Campaigns</Link>
              </li>
              <li>
                <Link to="/new-campaign">Create New Campaign</Link>
              </li>
            </ul>
          </nav>
        </NavGroup>
        <NavGroup>
          <h3>Account</h3>
          <nav>
            <ul>
              <li>
                <Link to="/">User Settings</Link>
              </li>
              <li>
                <Link to="/">Billing</Link>
              </li>
              <li>
                <Link to="/">Account</Link>
              </li>
            </ul>
          </nav>
        </NavGroup>
        <UpgradeButton>
          <Link to="/" className="btn">
            Upgrade Plan
          </Link>
        </UpgradeButton>
      </div>
    </aside>
  )
}

export default styled(Sidebar)`
  ${({ theme }) => theme.below.small`
    display:none;
    position:fixed;

  `}
  z-index:100;
  .container {
    box-shadow: 0px 0px 4px hsla(212, 100%, 20%, 30%);
    background: ${({ theme }) => theme.colors.lightGrey};
    position: fixed;
    padding: 20px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 267px;
  }
`

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
const LogoSlot = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  ${Logo} {
    padding: 20px 0;
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
