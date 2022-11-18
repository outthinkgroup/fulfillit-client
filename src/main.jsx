import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import getToken from "./utils/getToken";
import LocalState from "./utils/LocalContext";

const link = createHttpLink({
  uri: `${import.meta.env.VITE_GQL_URI}/graphql`,
});
const authLink = setContext(async (_, { headers }) => {
  // const token = localStorage.getItem("token");
  const token = await getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LocalState>
        <App />
      </LocalState>
    </ApolloProvider>
  </React.StrictMode>
);
