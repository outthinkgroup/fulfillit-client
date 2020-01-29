import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { client } from "./client"
import { ThemeProvider } from "styled-components"
import theme from "../designSystem/theme"
import LocalState from "../utils/LocalContext"
export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <LocalState>
        <ThemeProvider theme={theme}>{element}</ThemeProvider>
      </LocalState>
    </ApolloProvider>
  )
}
