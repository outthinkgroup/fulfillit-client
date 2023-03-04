
export async function fetchRefreshToken(token) {
  if(!token) throw new Error("No token was given");

  const res = await fetch(`${import.meta.env.VITE_GQL_URI}/graphql`, {
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
  }).then(res=>res.json());
  if(res?.data?.viewer?.jwtRefreshToken){
    return res.data.viewer.jwtRefreshToken
  }
  throw new Error("counldnt get a refresh token")
}

export async function fetchAuthToken(refreshToken){
  if(!refreshToken) throw new Error("No refreshToken was given");

    const res = await fetch(`${import.meta.env.VITE_GQL_URI}/graphql`, {
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
  return res
}
