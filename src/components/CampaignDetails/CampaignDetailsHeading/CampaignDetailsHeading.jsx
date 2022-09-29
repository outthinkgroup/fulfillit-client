import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { UPDATE_CAMPAIGN } from "../../CampaignForms/EditCampaign/EditCampaign";
import { renderCampaignEmail } from "../../../utils";

export const CampaignDetailsHeading = ({ campaign }) => {
  return (
    <CampaignDetailsHeadingWrapper>
      <h2>{campaign.meta.name}</h2>
      <p className="email">{renderCampaignEmail(campaign.email)}</p>
      <p>{campaign.description}</p>
    </CampaignDetailsHeadingWrapper>
  );
};

const CampaignDetailsHeadingWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  .edit-button {
    background: var(--primary-light);
    color: var(--primary-dark);
    cursor: pointer;
  }
  @media (min-width: 763px) {
    .edit-button {
      display: none;
    }
    &:hover .edit-button {
      display: unset;
    }
  }
  h2,
  .h2-input {
    font-size: 55px;
    margin-top: 0;
  }
  h2 {
    margin-bottom: 10px;
  }
  p.email {
    width: 100%;
    text-overflow: elipse;
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 20px;
  }
  .campaign-email {
    display: flex;
    align-items: center;
  }
  .campaign-email > .p-input {
    flex: 0;
    min-width: fit-content;
    text-align: right;
  }
`;

const Input = styled.input`
  &.invisible {
    border-radius: 0;
    background: none;
    border: none;
    border-bottom: 1px solid;
    border-color: var(--primary-light);
    box-shadow: none;
    line-height: 1.2;

    &:focus {
      border-color: var(--primary-color);
    }
  }
  &.h2-input {
    font-weight: bold;
    padding-block: 0;
  }
  &.p-input {
    color: var(--primary-color);
  }
`;
const Textarea = styled.textarea`
  &.invisible {
    background: none;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid;
    border-color: var(--primary-light);
    box-shadow: none;
    line-height: 1.2;

    &:focus {
      border-color: var(--primary-color);
    }
  }
`;
