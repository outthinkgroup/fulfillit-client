import React, { useContext } from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"

import { USER_DATA } from "./Header"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const LOGOUT = gql`
  mutation LOGOUT {
    increaseCount(count: 1)
  }
`

const Navigation = ({ className, userData = false }) => {
  const [logout, { data }] = useMutation(LOGOUT, {
    update(cache, payload) {
      const data = cache.readQuery({ query: USER_DATA })
      const empty = {}
      data.viewer = empty
      cache.writeQuery({ query: USER_DATA, empty })
    },
  })

  const isLoggedIn = userData
  function signOut() {
    localStorage.setItem("token", "")
    logout()
    navigate("/sign-in")
  }
  return (
    <nav className={className}>
      {!isLoggedIn ? (
        <>
          <Link to="/sign-in">sign in</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button className="link" type="button" onClick={signOut}>
            Sign Out
          </button>
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
  .link {
    background: none;
    box-shadow: none;
    font-size: 16px;
    font-weight: unset;
    padding: 0;
  }
  a,
  .link {
    text-decoration: none;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.primary};
    padding-left: 20px;
  }
`
