import { wp_url } from ".";
import { AutoLogin } from "./autologin";
import {fetchRefreshToken, fetchAuthToken} from "./tokenQuery";

export default async function getToken() {
  //check if the jwt was sent in the url
  //and use that instead
  const autoLogin = new AutoLogin();
  if (autoLogin.hasToken()) {
    const token = autoLogin.getToken();
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpires", Date.now() + 60 * 1000);
    const refreshToken = await fetchRefreshToken(token).catch(console.error)
    localStorage.setItem('refreshToken',refreshToken)
    return token;
  }

  //need to check if we even have the key in localStorage
  const expires = new Date(parseInt(localStorage.getItem("tokenExpires")));
  if (expires.getTime() < Date.now() || !Boolean(localStorage.getItem("token"))) {
    const refreshToken = localStorage.getItem("refreshToken");
    if(!refreshToken){
      throw new Error("No Refresh Token");
    }
    
    const res = await fetchAuthToken(refreshToken).catch(console.error)

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
