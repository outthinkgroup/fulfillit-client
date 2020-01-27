import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { SingleForm } from "../designSystem/styles"

const SignIn = ({ className }) => {
  return (
    <SingleForm>
      <div className="singleform-wrapper">
        <div className="left-column" />
        <div className="singleform-form-wrapper">
          <h2>Sign In</h2>
          <form action="">
            <label htmlFor="username">
              <span>username</span>
              <input type="text" name="username" id="username" />
            </label>
            <label htmlFor="password">
              <span>password</span>
              <input type="password" name="password" id="password" />
            </label>
            <input type="submit" value="Sign In" />
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
