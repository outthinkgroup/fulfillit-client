import React, { useContext, useRef } from "react"
import styled from "styled-components"

import { LocalContext } from "../utils/LocalContext"
import Hamburger from "./Hamburger"
import Logo from "../elements/Logo"
import Icon from "../elements/Icon"
import SideBarMenu from "./SideBarMenu"
import useOnClickOutside from "../utils/useOnClickOutside"

const MobileSidebar = ({ className }) => {
  const { localState, setLocalState } = useContext(LocalContext)
  const closeSideBar = () => {
    if (localState.isSideBarOpen === "MOBILE_MENU") {
      setLocalState({ ...localState, isSideBarOpen: "NONE" })
    }
  }
  const ref = useRef()
  useOnClickOutside(ref, closeSideBar)

  if (localState.isSideBarOpen === "MOBILE_MENU") {
    return (
      <div className={className} ref={ref}>
        <div className="container">
          <LogoSlot>
            <Logo />
            <CloseButton onClick={closeSideBar}>
              <Icon name="close" />
            </CloseButton>
          </LogoSlot>
          <SideBarMenu closeSideBar={closeSideBar} />
        </div>
      </div>
    )
  } else {
    return <Hamburger />
  }
}

export default styled(MobileSidebar)`
  ${({ theme }) => theme.above.small`
    display:block;
  `}
  z-index:100;
  position: fixed;
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
  justify-content: space-between;
  align-items: center;
  ${Logo} {
    padding: 20px 0;
  }
`
const CloseButton = styled.button`
  margin-top: -20px;
  margin-right: -10px;
  background: transparent;
  border: none;
  box-shadow: none;
`
