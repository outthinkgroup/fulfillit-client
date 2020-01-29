import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import CampaignCard from "./CampaignCard"
import { MY_CAMPAIGNS } from "../pages/index"

export const CURRENT_USER = gql`
  query CURRENT_USER {
    viewer {
      id
      name
      email
      campaigns {
        nodes {
          id
          date
          title(format: RENDERED)
          campaignOptions {
            mailchimpApiKey
            mailchimpListId
          }
        }
      }
    }
  }
`
const CampaignList = ({ className }) => {
  /* campaigns = [
    {
      id: 1,
      name: "campaign 1",
      emailAddress: "campaign1@mg.taskcannon.co",
      dateCreated: "10/30/2017",
      transactions: 25,
      state: "running",
    },
    {
      id: 2,
      name: "campaign 2",
      emailAddress: "second@mg.taskcannon.co",
      dateCreated: "1/30/2018",
      transactions: 25,
      state: "running",
    },
    {
      id: 3,
      name: "third Campaign",
      emailAddress: "book@mg.taskcannon.co",
      dateCreated: "5/30/2027",
      transactions: 25,
      state: "running",
    },
  ] */
  const { data, loading, error } = useQuery(CURRENT_USER)

  const campaigns = data && data.viewer.campaigns.nodes
  return (
    <div className={className}>
      <ul>
        {loading
          ? "loading"
          : campaigns
          ? campaigns.map(campaign => {
              return (
                <li key={campaign.id}>
                  <CampaignCard {...campaign} />
                </li>
              )
            })
          : ""}
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
