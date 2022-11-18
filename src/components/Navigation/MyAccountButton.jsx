import React from "react";

export default function MyAccountButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  async function goToMyAccount() {
    setIsLoading(true);
    const token = await getToken();
    setIsLoading(false);
    const url = wp_url + "?__token=" + token;
    window.open(url);
  }

  return (
    <TextButton onClick={goToMyAccount} type="button">
      {isLoading ? "Logging in..." : "My Account"}
    </TextButton>
  );
}
