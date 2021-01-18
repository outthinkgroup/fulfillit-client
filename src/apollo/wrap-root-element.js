import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { StripeProvider } from "react-stripe-elements"
import { client } from "./client"
import { ThemeProvider } from "styled-components"
import theme from "../designSystem/theme"
import LocalState from "../utils/LocalContext"
export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider apiKey="pk_test_gLXHhM133Hr3wT95bfbTbjY300a67NU0FP">
      <ApolloProvider client={client}>
        <LocalState>
          <ThemeProvider theme={theme}>{element}</ThemeProvider>
        </LocalState>
      </ApolloProvider>
    </StripeProvider>
  )
}
