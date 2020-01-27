import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Logo from "../elements/Logo"
import Navigation from "../components/Navigation"

const HeaderComp = ({ className, includeLogo }) => {
  return (
    <header className={className}>
      {includeLogo && <Logo />}
      <Navigation />
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
