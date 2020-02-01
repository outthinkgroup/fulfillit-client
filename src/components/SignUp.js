import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { SingleForm } from "../designSystem/styles"
import UseForm from "../utils/useForm"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

const SIGN_UP = gql`
  mutation SIGN_UP($password: String!, $username: String!, $email: String!) {
    createUser(
      input: {
        clientMutationId: "signup"
        username: $username
        email: $email
        password: $password
        roles: "author"
      }
    ) {
      user {
        id
      }
    }
  }
`

const SignUp = () => {
  const [form, updateForm] = UseForm({
    username: "",
    password: "",
    email: "",
  })
  const { username, password, email } = form
  const [signUp, signUpData] = useMutation(SIGN_UP, {
    variables: {
      username,
      email,
      password,
    },
  })

  return (
    <SingleForm>
      <div className="singleform-wrapper">
        <div className="left-column" />
        <div className="singleform-form-wrapper">
          <h2>Sign Up</h2>
          <form
            onSubmit={e => {
              e.preventDefault()
              signUp()
            }}
          >
            <label htmlFor="username">
              <span>username</span>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="password">
              <span>password</span>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={updateForm}
              />
            </label>
            <input type="submit" value="Sign Up" />
          </form>
          <p>
            <Link to="/sign-in">Already have an account?</Link>
          </p>
        </div>
      </div>
    </SingleForm>
  )
}

export default SignUp
