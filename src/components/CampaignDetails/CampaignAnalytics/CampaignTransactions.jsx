import React from "react"
import styled from "styled-components"
import {Loader} from "../../../designSystem/styles"
import {gql, useQuery} from "@apollo/client"

export default function CampaignTransactions({campaignId}){
  const {data, loading, error} = useQuery(CAMPAIGN_TRANSACTIONS, {
    variables:{
      id:campaignId,
    }
  });
  if(loading){
    return <CampaignTransactionsWrapper><Loader/></CampaignTransactionsWrapper>
  }
  return (
    <CampaignTransactionsWrapper>
      <div className="section">
        <p className="label">Total</p>
        <p className="count">{data.campaign.transactions}</p>
      </div>
    </CampaignTransactionsWrapper>
  )
}
const CampaignTransactionsWrapper = styled.div`
  
`
export const CAMPAIGN_TRANSACTIONS = gql`
  query CAMPAIGN_TRANSACTIONS($id: ID!) {
    campaign(id: $id, idType: ID) {
      id
      databaseId
      transactions:transactionCount
    }
  }
`;
