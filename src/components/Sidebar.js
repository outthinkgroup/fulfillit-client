import React from "react"
import styled from "styled-components"

import Logo from "../elements/Logo"
import SideBarMenu from "./SideBarMenu"

const Sidebar = ({ className, isOpen }) => {
  return (
    <aside className={className}>
      <div className="container">
        <LogoSlot>
          <Logo />
        </LogoSlot>
        <SideBarMenu />
      </div>
    </aside>
  )
}

export default styled(Sidebar)`
  ${({ theme }) => theme.below.small`
    display:none;
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
const LogoSlot = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  ${Logo} {
    padding: 20px 0;
  }
`
