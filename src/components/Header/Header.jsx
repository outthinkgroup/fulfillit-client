import React from "react";
import { useQuery, gql } from "@apollo/client";
import Logo from "../../elements/Logo";
import Navigation from "../Navigation/Navigation";

export const USER_DATA = gql`
  query USER_DATA {
    viewer {
      id
      name
      email
    }
  }
`;

export default function Header({ includeLogo }) {
  const { data, loading, error } = useQuery(USER_DATA);

  return (
    <header className="bg-blue-900">
      <div
        className={`mx-auto flex max-w-screen-lg items-center p-5 ${
          includeLogo ? "justify-between" : "justify-end"
        } `}
      >
        <span className="flex items-center">
          <Logo includeLogo={includeLogo} />
        </span>
        <Navigation userData={data && data.viewer} />
      </div>
    </header>
  );
}
