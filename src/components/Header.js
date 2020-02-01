import React, { useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link, navigate } from "gatsby"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import Logo from "../elements/Logo"
import Navigation from "../components/Navigation"
import Icon from "../elements/Icon"
import { LocalContext } from "../utils/LocalContext"
import { Hamburger } from "../designSystem/styles"

export const USER_DATA = gql`
  query USER_DATA {
    viewer {
      id
      name
      email
    }
  }
`

const HeaderComp = ({ className, includeLogo, includeUserMenu }) => {
  const { data, loading, error } = useQuery(USER_DATA)
  const { localState, setLocalState } = useContext(LocalContext)
  return (
    <header className={className}>
      <span
        css={`
          display: flex;
          align-items: center;
        `}
      >
        {includeUserMenu && (
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
        )}
        <Logo includeLogo={includeLogo} />
      </span>
      <Navigation userData={data && data} />
    </header>
  )
}

export default styled(HeaderComp)`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 100%;
  padding: 20px;
  width: 100%;
  justify-content: ${({ includeLogo }) =>
    includeLogo ? "space-between" : "flex-end"};
  ${({ theme }) => theme.below.small`
    justify-content:space-between;

  `}
`
