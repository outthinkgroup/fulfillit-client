import React, { useState, useContext } from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"

import Card from "../elements/Card"
import Icon from "../elements/Icon"
import EditCampaign from "./EditCampaign"
import { LocalContext } from "../utils/LocalContext"

const CampaignCard = ({
  className,
  id,
  status,
  date,
  email,
  campaignOptions,
}) => {
  const [showActions, setShowActions] = useState(false)
  const dateFormated = `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`
  const emailAddress = `${email}@mg.taskcannon.co`
  const { localState, setLocalState } = useContext(LocalContext)
  return (
    <Card depth="low" className={className}>
      <div
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="top-section">
          <div className="title">
            <p className="tag">{status}</p>
            <h3>{campaignOptions.name}</h3>
            <p>{emailAddress}</p>
          </div>
          <div className="actions-group">
            {showActions && (
              <div className="actions">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/dashboard?campaign_id=${id}`)
                    setLocalState({ ...localState, isSideBarOpen: true })
                  }}
                  className="edit"
                  title="Edit"
                >
                  <Icon name="edit" color="white" />
                </button>
                <span className="analytics" title="Analytics">
                  <Icon name="chart" color="white" />
                </span>
                <span className="delete" title="Delete Campaign">
                  <Icon name="delete" color="white" />
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="info">
          <div className="info-section">
            <p>Date Created</p>
            <span className="value">{dateFormated}</span>
          </div>
          <div className="info-section">
            <p>Total Transactions</p>
            <span className="value">{0}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default styled(CampaignCard)`
  padding: 0;
  color: black;
  background: #fff;
  box-shadow: ${({ theme }) => theme.depth.contrastLow};
  border-left: 4px solid ${({ theme }) => theme.colors.darkBlue};
  &:hover {
    box-shadow: ${({ theme }) => theme.depth.medium};
  }
  & > * {
    margin: 0;
  }
  .top-section {
    z-index: 2;
    padding: 10px 20px 10px;
    display: flex;
    justify-content: space-between;
  }
  .title {
    h3 {
      font-size: 28px;
      font-weight: 200;
      margin-top: 5px;
      text-transform: capitalize;
      color: ${({ theme }) => theme.colors.darkBlue};
    }
  }
  .info {
    color: ${({ theme }) => theme.colors.darkBlue};
    padding: 10px 20px;
    display: flex;
    background: ${({ theme }) => theme.colors.lightGrey};
    & > .info-section {
      width: 100%;
      text-align: center;
      &:not(:last-child) {
        border-right: 1px solid ${({ theme }) => theme.colors.lightBlue};
      }
    }
    p {
      margin-top: 0;
      font-weight: 500;
      font-size: 14px;
    }
    .value {
      font-size: 18px;
    }
  }

  .tag {
    margin: 0;
    display: inline-block;
    background: ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 100;
    text-transform: uppercase;
    padding: 2px 4px;
  }

  .actions-group {
    position: absolute;
    top: 0;
    right: 0;

    svg {
      width: 20px;
    }
    .actions {
      box-shadow: inset 0 0px 25px rgba(50, 50, 93, 0.025),
        inset 0 0px 8px rgba(50, 50, 93, 0.07);
      font-size: 14px;
      display: flex;

      & > * {
        padding: 5px 8px;
        display: block;
        width: 100%;
        &:hover {
          font-weight: 700;
        }
      }
    }
  }
  .edit {
    background: ${({ theme }) => theme.colors.primary};
  }
  .analytics {
    background: ${({ theme }) => theme.colors.success.primary};
  }
  .delete {
    background: ${({ theme }) => theme.colors.warning.primary};
  }
  .action-icon {
    padding: 0;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #ddd;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  }
`
