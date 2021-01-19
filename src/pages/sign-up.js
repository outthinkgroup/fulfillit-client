import React from "react"

import SingleFormLayout from "../Layouts/SingleFormLayout"
import SignUp from "../components/SignUp/SignUp"

const SignUpPage = ({ query }) => {
  return (
    <SingleFormLayout>
      <SignUp />
    </SingleFormLayout>
  )
}

export default SignUpPage
