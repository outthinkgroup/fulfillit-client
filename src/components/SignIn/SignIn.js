import React, { useState, useContext } from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import useForm from "../../utils/useForm"
import { SingleForm } from "../../designSystem/styles"
import { hardNavigate } from "../../utils"
export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    userLogin: login(
      input: {
        username: $username
        password: $password
        clientMutationId: "blah"
      }
    ) {
      authToken
      user {
        username
        id
        name
        nickname
        email
      }
    }
  }
`

const SignIn = ({ className }) => {
  const [form, updateForm] = useForm({
    username: "",
    password: "",
  })
  const [userLogin, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: form.username,
      password: form.password,
    },
    onCompleted({ userLogin }) {
      typeof window !== "undefined" &&
        localStorage.setItem("token", userLogin.authToken)
      localStorage.setItem("userID", userLogin.user.id)
      hardNavigate("/dashboard")
    },
  })

  return (
    <SingleForm>
      <div className="singleform-wrapper">
        <div className="left-column" />
        <div className="singleform-form-wrapper">
          <h2>Sign In</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              typeof window !== "undefined" && localStorage.setItem("token", "")
              userLogin()
            }}
          >
            <label htmlFor="username">
              <span>username</span>
              <input
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="password">
              <span>password</span>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm}
              />
            </label>
            <button type="submit">{loading ? "loading..." : "Sign In"} </button>
          </form>
          <p>
            <Link to="/sign-up">Don't have an account?</Link>
          </p>
        </div>
      </div>
    </SingleForm>
  )
}

export default SignIn
