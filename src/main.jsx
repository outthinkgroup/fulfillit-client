import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import theme from "./designSystem/theme";
import LocalState from "./utils/LocalContext";

const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_URI,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LocalState>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </LocalState>
    </ApolloProvider>
  </React.StrictMode>
);
