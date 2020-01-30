import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import CampaignCard from "./CampaignCard"

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
`
const CampaignList = ({ className }) => {
  const { data, loading, error } = useQuery(CAMPAIGNS)

  const campaigns = data
    ? [...data.viewer.campaigns.nodes, ...data.viewer.draftCampaigns.nodes]
    : []
  return (
    <div className={className}>
      <ul>
        {loading
          ? "loading"
          : campaigns.map(campaign => {
              return (
                <li key={campaign.id}>
                  <CampaignCard {...campaign} />
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export default styled(CampaignList)`
  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    grid-gap: 20px;

    margin: 0px;
    padding: 0px;
    li {
      margin-bottom: 20px;
      list-style: none;
    }
  }
`
