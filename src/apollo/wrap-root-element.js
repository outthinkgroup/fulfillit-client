import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { ThemeProvider } from "styled-components";
import theme from "../designSystem/theme";
import LocalState from "../utils/LocalContext";
export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <LocalState>
        <ThemeProvider theme={theme}>{element}</ThemeProvider>
      </LocalState>
    </ApolloProvider>
  );
};
export const TestWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    <LocalState>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LocalState>
  </ApolloProvider>
);
