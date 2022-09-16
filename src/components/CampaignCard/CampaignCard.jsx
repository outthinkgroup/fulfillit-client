import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "../../elements/Card";

export const DELETE_CAMPAIGN = gql`
  mutation DELETE_CAMPAIGN($id: ID!) {
    deleteCampaign(input: { clientMutationId: "sdfsdaa", id: $id }) {
      campaign {
        id
      }
    }
  }
`;

const CampaignCard = ({
  className,
  id,
  status,
  date,
  email,
  transactionCount,
  meta,
}) => {
  const dateFormatted = `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
  const emailAddress = `${email}@sendmagnet.com`;
  return (
    <Card depth="low" className={className}>
      <Link to={`/campaign/?campaign_id=${id}`} onMouseLeave={() => setShowActions(false)}>
        <div className="top-section">
          <div className="title">
            <p className="tag">{status}</p>
            <h3>{meta.name}</h3>
            {/* TODO: get this working*/}
            <a href={`mailto:${emailAddress}`} >{emailAddress}</a>
          </div>
        </div>
        <div className="info">
          <div className="info-section">
            <p>Date Created</p>
            <span className="value">{dateFormatted}</span>
          </div>
          <div className="info-section">
            <p>Total Transactions</p>
            <span className="value">{transactionCount}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default styled(CampaignCard)`
  padding: 0;
  color: black;
  background: #fff;
  max-width: 100%;
  overflow-x: hidden;
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
    width: 100%;
    overflow-x: scroll;
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
    top: 3px;
    right: 3px;
    display: flex;
    justify-content: flex-end;
    svg {
      width: 20px;
    }
    .actions {
      font-size: 14px;
      display: flex;

      & > * {
        height: 100%;
        border-radius: 50%;
        padding: 5px 8px;
        display: block;
        width: 35px;
        margin-left: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        box-shadow: ${({ theme }) => theme.depth.contrastLow};
        &:hover {
          font-weight: 700;
          transform: scale(1.1);
          box-shadow: ${({ theme }) => theme.depth.high};
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
  .options {
    ${({ theme }) => theme.above.medium`
    
    `}
    background: transparent;
    box-shadow: none;
    &:hover,
    &:active,
    &:focus {
      background: #efefef;
    }
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    padding: 0;
    margin-left: 5px;
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
`;
