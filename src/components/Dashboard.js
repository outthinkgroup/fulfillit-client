import React, { useContext } from "react"
import styled from "styled-components"
import { PageHeading } from "../designSystem/styles"
import { navigate } from "gatsby"
import { USER_DATA } from "./Header"
import CampaignList from "./CampaignList"
import EditCampaign from "./EditCampaign.js"
import { useQuery } from "@apollo/react-hooks"
import { LocalContext } from "../utils/LocalContext"

const Dashboard = ({ query, className }) => {
  const { data, loading, error } = useQuery(USER_DATA)
  const { localState, setLocalState } = useContext(LocalContext)
  console.log(localState)
  if (error) {
    navigate("/sign-in")
    return <></>
  }
  const { isSideBarOpen } = localState
  return (
    <div className={className}>
      <PageHeading>
        <h1>{loading ? "" : data.viewer.name}</h1>
        <p>A list of your registered emailAddresses and stats</p>
      </PageHeading>
      <CampaignList />
      {isSideBarOpen && <EditCampaign campaign />}
    </div>
  )
}
export default styled(Dashboard)``
