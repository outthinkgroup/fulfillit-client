import React from "react";
import styled from "styled-components";

import CampaignCard from "./CampaignCard";

const CampaignList = ({ className, campaigns }) => {
  campaigns = [
    {
      id: 1,
      name: "campaign 1",
      emailAddress: "campaign1@mg.taskcannon.co",
      dateCreated: "10/30/2017",
      transactions: 25,
      state: "running"
    },
    {
      id: 2,
      name: "campaign 2",
      emailAddress: "second@mg.taskcannon.co",
      dateCreated: "1/30/2018",
      transactions: 25,
      state: "running"
    },
    {
      id: 3,
      name: "third Campaign",
      emailAddress: "book@mg.taskcannon.co",
      dateCreated: "5/30/2027",
      transactions: 25,
      state: "running"
    }
  ];
  return (
    <div className={className}>
      <ul>
        {campaigns &&
          campaigns.map(campaign => {
            const { id } = campaign;
            return (
              <li key={id}>
                <CampaignCard {...campaign} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

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
`;
