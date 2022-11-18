import React from "react";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "../../elements/Card";

const CampaignCard = ({ id, status, date, email, transactionCount, meta }) => {
  const dateFormatted = `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
  const emailAddress = `${email}@sendmagnet.com`;
  return (
    <Card
      depth="low"
      className="max-w-full overflow-hidden border-l-4 border-blue-900 bg-white p-0 text-black shadow shadow-blue-300 hover:shadow-lg"
    >
      <Link to={`/campaign/?campaign_id=${id}`}>
        <div className="z-10 flex justify-between py-3 px-6">
          <div className="w-full overflow-x-scroll">
            <p className="m-0 inline-block rounded bg-blue-100 p-1 text-xs uppercase tracking-wide text-blue-600">
              {status}
            </p>
            <h3 className="mt-1 text-2xl font-light capitalize text-blue-900">
              {meta.name}
            </h3>
            {/* TODO: get this working*/}
            <span data-link={`mailto:${emailAddress}`}>{emailAddress}</span>
          </div>
        </div>
        <div className="flex gap-4 bg-blue-50 py-3 px-6 text-blue-900">
          <div className="w-full">
            <p className="mt-0 text-sm font-bold">Date Created</p>
            <span className="text-base">{dateFormatted}</span>
          </div>
          <div className="w-full">
            <p className="mt-0 text-sm font-bold">Total Transactions</p>
            <span className="text-base">{transactionCount}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};
export default CampaignCard;
