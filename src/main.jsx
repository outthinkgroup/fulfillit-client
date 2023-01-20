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
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
} from "react-router-dom";
import getToken from "./utils/getToken";
import LocalState from "./hooks/LocalContext";

Sentry.init({
  dsn: "https://ada74006b8bd4e02968daa38e88dbe4e@o1188866.ingest.sentry.io/4504537308856322",
  integrations: [new BrowserTracing({
    routingInstrumentation: Sentry.reactRouterV6Instrumentation(
      React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,  
    )
  })],
  environment: import.meta.env.MODE,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

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
