import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import HeaderComp from "../components/Header"
import GlobalStyle from "../designSystem/globalStyles"

const DashboardLayout = ({ children, className }) => {
  const isOpen = false
  return (
    <div className={className}>
      <HeaderComp includeLogo="false" includeUserMenu />
      <Sidebar
        css={`
          grid-column: 1/2;
          grid-row: 1/4;
        `}
      />
      <PageContent>{children}</PageContent>
      <GlobalStyle />
    </div>
  )
}
export default styled(DashboardLayout)`
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-rows: 65px 1fr;
  grid-template-columns: 100%;
  ${({ theme }) => theme.above.small`
    grid-template-columns: 267px 1fr;
  `}
  ${HeaderComp} {
    width: 100%;
  }
  background: white;
`

const PageContent = styled.div`
  height: 100%;
  grid-column: 2/3;
  padding: 20px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  ${({ theme }) => theme.below.small`
    grid-column: 1/-1;
    margin-top:30px;
  `}
  overflow-x: auto;
  overflow-y: scroll;
`
