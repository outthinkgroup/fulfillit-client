import React, { useContext } from "react"
import styled from "styled-components"
import { LocalContext } from "../utils/LocalContext"
import Icon from "../elements/Icon"

const Hamburger = ({ className }) => {
  const { localState, setLocalState } = useContext(LocalContext)
  const closeSideBar = () => {
    if (localState.isSideBarOpen === "MOBILE_MENU") {
      setLocalState({ ...localState, isSideBarOpen: "NONE" })
    }
  }
  return (
    <button
      type="button"
      className={className}
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
    </button>
  )
}
export default styled(Hamburger)`
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  margin-left: 0px;

  padding: 20px;
  color: black;
  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.darkBlue};
  }
  ${({ theme }) => theme.above.small`
    display:none;
  `}
`
