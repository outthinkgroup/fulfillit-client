import getToken from "./getToken";
import {fetchRefreshToken} from "./tokenQuery";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

global.fetch = vi.fn();
const wp_url = import.meta.env.VITE_GQL_URI;
function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("how getToken gets the token for jwt", () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch.mockReset()
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  })

  it("Base Case: gets the jwt from localStorage if the tokenExpires is after now", async () => {
    vi.setSystemTime("1/1/2000"); //because why not just need a date
    localStorage.setItem("tokenExpires", new Date("1/2/2000")); //some time after the above date
    const expected = "My Token";
    localStorage.setItem("token", expected);
    const actual = await getToken();

    expect(actual).toEqual(expected);
  });

  it("fetch new one if expired", async () => {
    // set up dates so that the token is expired
    vi.setSystemTime("2/2/2000"); //because why not just need a date
    localStorage.setItem("tokenExpires", new Date("1/1/1999").getTime()); //some time _before_ the above date
    //set a refreshToken
    const refreshToken = "A_RefreshToken";
    const oldToken = "My_Old_Token";
    const authToken = "My_New_Token";
    localStorage.setItem("token", oldToken); // token is defined here
    localStorage.setItem("refreshToken", refreshToken);

    const expectedResponse = {
      data: {
        refreshJwtAuthToken: {
          authToken: authToken,
        },
      },
    };
    fetch.mockResolvedValue(createFetchResponse(expectedResponse));

    const actualToken = await getToken();

    expect(fetch).toHaveBeenCalledWith(`${wp_url}/graphql`, {
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
    });

    expect(actualToken).toEqual(authToken);
    expect(localStorage.getItem("token")).not.toEqual(oldToken);
  });

  it("fetches new one if token is null", async () => {
    // set up dates so that the token is NOT expired
    vi.setSystemTime("1/1/2000"); //because why not just need a date
    localStorage.setItem("tokenExpires", new Date("2/1/2000").getTime()); //some time _after_ the above date
    //set a refreshToken
    const refreshToken = "A_RefreshToken1";
    const authToken = "My_New_Token";
    localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("token", "My_token") // token is NOT defined here

    const expectedResponse = {
      data: {
        refreshJwtAuthToken: {
          authToken: authToken,
        },
      },
    };
    fetch.mockResolvedValue(createFetchResponse(expectedResponse));

    const actualToken = await getToken();

    expect(fetch).toHaveBeenCalledWith(`${wp_url}/graphql`, {
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
    });

    expect(actualToken).toEqual(authToken);
    expect(localStorage.getItem("token")).not.toBeNull();
  });

  it("throws an error if no refreshToken", async () => {
    vi.setSystemTime("1/1/2000"); //because why not just need a date
    localStorage.setItem("tokenExpires", new Date("2/1/2000").getTime()); //some time _after_ the above date
    expect(getToken()).rejects.toThrow(new Error("No Refresh Token"));
  })

  it("fetches Refresh Token if there isnt one when auto logging in", async () => {

    const _refreshToken = "My_Refresh_Token";
    const token = "My_Auth_Token";

    const expectedResponse = {
      data: {
        viewer: {
          jwtRefreshToken: _refreshToken,
        },
      },
    };
    fetch.mockResolvedValue(createFetchResponse(expectedResponse));

    const actualRefeshToken = await fetchRefreshToken(token);

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_GQL_URI}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization":`Bearer ${token}`
    },
    body: JSON.stringify({
      query: `query {
            viewer {
              jwtRefreshToken
            }
          }`,
    }),
  });

  });
});
