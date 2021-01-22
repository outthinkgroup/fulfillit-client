import React, { useContext } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

import { PageHeading } from "../../../designSystem/styles"
import { USER_DATA } from "../../Header/Header"
import { LocalContext } from "../../../utils/LocalContext"
import getUrlParam from "../../../utils/getUrlParams"

export default function CampaignAnalytics({ id, campaignName }) {
  const {
    data: dataAnalytics,
    loading: loadingAnalytics,
    error: errorAnalytics,
  } = useQuery(CAMPAIGN_ANALYTICS, {
    variables: {
      id,
      campaign: campaignName,
    },
  })

  if (loadingAnalytics) {
    return <div style={{ textAlign: "center" }}>Loading Campaign Logs...</div>
  }

  return (
    <div>
      <div>
        <h3>Total Transactions</h3>
        <p>{dataAnalytics.campaign.campaignOptions.campaignTransactions}</p>
      </div>
      <div>
        <h3>Logs</h3>
        <ul>
          {dataAnalytics.logs.nodes.length &&
            dataAnalytics.logs.nodes.length.map(({ title, id }) => {
              return <li key={id}>{title}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export const CAMPAIGN_ANALYTICS = gql`
  query CAMPAIGN_ANALYTICS($id: ID!, $campaign: String!) {
    campaign(id: $id, idType: DATABASE_ID) {
      campaignOptions {
        campaignTransactions
      }
    }
    logs(
      where: {
        metaQuery: {
          metaArray: {
            compare: EQUAL_TO
            key: "campaign"
            type: CHAR
            value: $campaign
          }
        }
      }
    ) {
      nodes {
        id
        title
      }
    }
  }
`
