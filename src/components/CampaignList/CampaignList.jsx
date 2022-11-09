import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Loader } from "../../elements";

export const CAMPAIGNS = gql`
  query CAMPAIGNS {
    viewer {
      id
      campaigns {
        nodes {
          status
          id
          date
          email: title(format: RENDERED)
          transactionCount
          meta {
            name
            emailMarketingService
            description
          }
        }
      }
      draftCampaigns: campaigns(where: { status: DRAFT }) {
        nodes {
          status
          id
          date
          transactionCount
          email: title(format: RENDERED)
          meta {
            name
            emailMarketingService
            description
          }
        }
      }
    }
  }
`;

const CampaignList = ({ className }) => {
  const { data, loading, error } = useQuery(CAMPAIGNS);

  if (error) return error.errors[0].debugMessage;

  const campaigns = data
    ? [...data.viewer.campaigns.nodes, ...data.viewer.draftCampaigns.nodes]
    : [];

  if (loading) {
    return (
      <div className={className}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Loader /> <span>loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <Link
        className=" mb-4 inline-block rounded p-1 text-blue-600 hover:bg-blue-50"
        to="/new-campaign"
      >
        + New Campaign
      </Link>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {campaigns.map((campaign) => {
          return (
            <li key={campaign.id} className="list-none">
              <CampaignCard {...campaign} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CampaignList;
