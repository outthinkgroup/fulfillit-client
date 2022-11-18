import React from "react";
import { Link } from "react-router-dom";

import SingleFormLayout from "../layouts/SingleFormLayout";

export function NotFound() {
  return (
    <SingleFormLayout>
      <div className="mx-auto mt-24 max-w-xl text-center">
        <div className="text-[100px] font-bold text-blue-600">404</div>
        <h1 className="mb-10 text-2xl font-bold text-blue-900">Not Found</h1>
        <Link to="/">&larr;Back Home</Link>
      </div>
    </SingleFormLayout>
  );
}
