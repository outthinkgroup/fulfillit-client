import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import Logo from "../elements/Logo"
import Navigation from "../components/Navigation"

export const USER_DATA = gql`
  query USER_DATA {
    viewer {
      id
      name
      email
    }
  }
`

const HeaderComp = ({ className, includeLogo }) => {
  const { data, loading, error } = useQuery(USER_DATA)

  return (
    <header className={className}>
      {includeLogo && <Logo />}
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
`
