import React from "react"

import SingleFormLayout from "../Layouts/SingleFormLayout"
import SignIn from "../components/SignIn/SignIn"

const SignInPage = ({ query }) => {
  return (
    <SingleFormLayout>
      <SignIn />
    </SingleFormLayout>
  )
}

export default SignInPage
