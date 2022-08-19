import React, { useContext } from "react";
import styled from "styled-components";
import { PageHeading } from "../../designSystem/styles";
import { useNavigate } from "react-router-dom";
import { USER_DATA } from "../Header/Header";
import CampaignList from "../CampaignList/CampaignList";
import EditCampaign from "../CampaignForms/EditCampaign/EditCampaign.jsx";
import { useQuery } from "@apollo/client";
import { LocalContext } from "../../utils/LocalContext";

const Dashboard = ({ query, className }) => {
  const { data, loading, error } = useQuery(USER_DATA);
  const { localState, setLocalState } = useContext(LocalContext);
  const navigate = useNavigate();
  console.log(localState);
  React.useEffect(() => {
    if (error || !data?.viewer) {
      navigate("/sign-in");
    }
  }, [error, data]);

  const { isSideBarOpen } = localState;
  return (
    <div className={className}>
      <PageHeading>
        <h1>{loading ? "" : data && data.viewer.name}</h1>
        <p>A list of your registered emailAddresses and stats</p>
      </PageHeading>
      <CampaignList />
      {isSideBarOpen === "EDIT_CAMPAIGN" && <EditCampaign campaign />}
    </div>
  );
};
export default styled(Dashboard)``;
