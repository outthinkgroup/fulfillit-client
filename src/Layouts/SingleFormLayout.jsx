import React from "react"
import styled from "styled-components"
import Header from "../components/Header/Header"
import GlobalStyle from "../designSystem/globalStyles"

const SingleFormLayout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header includeLogo />
      <PageContent>{children}</PageContent>
      <Footer background>©️{new Date().getFullYear()}  Sendmagnet</Footer>
      <GlobalStyle />
    </div>
  )
}
export default styled(SingleFormLayout)`
  min-height: 100vh;
  max-width: 100vw;
  min-width: 100vw;
  background: ${({ theme }) => theme.colors.lightGrey};
`

const PageContent = styled.div`
  height: 100%;
  max-width: 962px;
  width: 100%;
  padding: 30px 20px;
  margin: 0 auto;
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;
  font-weight: 300;
  letter-spacing: -0.2px;
  padding:20px;
  text-align: center;
  background: ${props =>
    props.background ? "hsl(212, 100%, 20%)" : "transparent"};
  color: ${({ background }) => (background ? "#fff" : "unset")};
`
