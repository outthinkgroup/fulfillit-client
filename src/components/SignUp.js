import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { SingleForm } from "../designSystem/styles"

const SignUp = () => {
  const [message, setMessage] = useState("")
  return (
    <SingleForm>
      <div className="singleform-wrapper">
        <div className="left-column" />
        <div className="singleform-form-wrapper">
          <p>{message}</p>
          <h2>Sign Up</h2>
          <form action="">
            <label htmlFor="username">
              <span>username</span>
              <input type="text" name="username" id="username" />
            </label>
            <label htmlFor="email">
              <span>Email</span>
              <input type="email" name="email" id="email" />
            </label>
            <label htmlFor="password">
              <span>password</span>
              <input type="password" name="password" id="password" />
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
