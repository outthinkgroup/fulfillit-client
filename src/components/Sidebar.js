import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Logo from "../elements/Logo"

const Sidebar = ({ className }) => {
  return (
    <aside className={className}>
      <div className="container">
        <LogoSlot>
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
  background: ${({ theme }) => theme.colors.lightGrey};
  box-shadow: 0px 0px 4px hsla(212, 100%, 20%, 30%);
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: fixed;
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
