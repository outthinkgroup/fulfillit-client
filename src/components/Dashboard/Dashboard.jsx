import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_DATA } from "../Header/Header";
import CampaignList from "../CampaignList/CampaignList";
import { useQuery } from "@apollo/client";

const Dashboard = ({}) => {
  const { data, loading, error } = useQuery(USER_DATA);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error) {
      navigate("/sign-in?here");
    }
    if (data && data.viewer == null) {
      navigate("/sign-in?here");
    }
  }, [error, data]);

  return (
    <div className="">
      <header className="mb-10">
        <p className="text-blue-600">
          {loading ? "" : data && data?.viewer?.name}
        </p>
        <h1 className="text-2xl font-bold text-blue-900">Campaigns</h1>
      </header>
      <CampaignList />
    </div>
  );
};

export default Dashboard;
