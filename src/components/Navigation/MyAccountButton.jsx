import React from "react";
import { TextButton } from "../../elements/Button";
import {ToolTip } from "../ToolTip/ToolTip"

import { wp_url } from "../../utils";
import getToken from "../../utils/getToken";

export default function MyAccountButton({ accountStatus }) {
  const [isLoading, setIsLoading] = React.useState(false);
  async function goToMyAccount() {
    setIsLoading(true);
    const token = await getToken();
    setIsLoading(false);
    const url = wp_url + "/my-account/?__token=" + token;
    window.open(url);
  }

  return (
    <span className="flex  items-center ml-4 ">
      {!accountStatus ? (
        <ToolTip text={"!"} type="error" message={"Not An Active Account"}>
					Not an active account click "My Account" above to learn more
				</ToolTip>
      ) : (
        ""
      )}
      <TextButton onClick={goToMyAccount} type="button">
        {isLoading ? "Logging in..." : "My Account"}
      </TextButton>
    </span>
  );
}
