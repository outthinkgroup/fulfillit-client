import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Navigation = ({ className }) => {
  const isLoggedIn = true
  return (
    <nav className={className}>
      {!isLoggedIn ? (
        <>
          <Link to="/sign-in">sign in</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Sign Out</Link>
        </>
      )}
    </nav>
  )
}

export default styled(Navigation)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  a {
    text-decoration: none;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.primary};
    padding-left: 20px;
  }
`
