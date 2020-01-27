import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { client } from "./client"
import { ThemeProvider } from "styled-components"
import theme from "../designSystem/theme"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </ApolloProvider>
)
