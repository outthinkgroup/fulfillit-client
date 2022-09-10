import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import CampaignCard from "../CampaignCard/CampaignCard";
import { Loader } from "../../designSystem/styles";

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
          campaignOptions {
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
          campaignOptions {
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

  if(loading){
    return <div className={className}>
      <div style={{display:'flex', alignItems:'center', gap:5}}><Loader/> <span>loading...</span></div>
    </div>
  }
  return (
    <div className={className}>
      <ul>
      {campaigns.map((campaign) => {
        return (
          <li key={campaign.id}>
            <CampaignCard {...campaign} />
          </li>
        )})}
      </ul>
    </div>
  );
};

export default styled(CampaignList)`
  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    ${({ theme }) => theme.below.medium`
      grid-template-columns: 1fr;
    `}
    gap: 20px;
    margin: 0px;
    padding: 0px;
    li {
      list-style: none;
    }
  }
`;
