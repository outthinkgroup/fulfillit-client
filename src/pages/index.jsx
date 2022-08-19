import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";

const IndexPage = (props) => {
  return (
    <MainLayout>
      <h1>HOME</h1>
    </MainLayout>
  );
};

export default IndexPage;
