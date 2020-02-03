import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export const isBrowser = () => typeof window !== "undefined"
const token = isBrowser() && window.localStorage.getItem("token")
console.log(token)
export const client = new ApolloClient({
  //uri: `https://fulfillit.mightyoak.co/graphql`, //?this needs to be an env var
  uri: process.env.GATSBY_WP_URL,
  fetch,
  request: operation => {
    const token = localStorage.getItem("token")
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
})
