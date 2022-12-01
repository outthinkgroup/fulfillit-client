import { wp_url } from ".";
import { AutoLogin } from "./autologin";

export default async function getToken() {
  //check if the jwt was sent in the url
  //and use that instead
  const autoLogin = new AutoLogin();
  if (autoLogin.hasToken()) {
    const token = autoLogin.getToken();
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpires", Date.now() + 60 * 1000);
    return token;
  }

  const expires = new Date(parseInt(localStorage.getItem("tokenExpires")));
  if (expires.getTime() < Date.now() || !localStorage.getItem("token")) {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await fetch(`${wp_url}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
            refreshJwtAuthToken(
              input: {
                clientMutationId: "uniqueId"
                jwtRefreshToken: "${refreshToken}"
              }) {
              authToken
            }
          }`,
      }),
    })
      .then((res) => res.json())
      .catch(console.error);

    if (res.data && res.data?.refreshJwtAuthToken?.authToken) {
      const token = res.data.refreshJwtAuthToken.authToken;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpires", Date.now() + 300 * 1000); // our best guess since we cant get token expire time
      return token;
    } else {
      console.log(res);
    }
  }

  return localStorage.getItem("token");
}
