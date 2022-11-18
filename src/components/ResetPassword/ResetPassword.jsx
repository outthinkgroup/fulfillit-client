import React from "react";

import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import Error from "../Error/ErrorMessage";
import useForm from "../../hooks/useForm";
import { SingleForm, SigninFormWrapper, Label } from "../../elements";
import { wp_url } from "../../utils";

const REQUEST_PASSWORD_RESET = gql`
  mutation REQUEST_PASSWORD_RESET($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      user {
        email
      }
    }
  }
`;

export default function ResetPassword() {
  const [form, updateForm] = useForm({
    account: "",
  });

  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_PASSWORD_RESET,
    {
      variables: {
        username: form.account,
      },
    }
  );

  const email = data ? data?.sendPasswordResetEmail?.user?.email : null;

  return (
    <SingleForm>
      <SigninFormWrapper>
        <div className="w-10 bg-blue-900 md:block md:w-2/6" />
        <div className="grid w-full flex-1 place-content-center py-8 px-6">
          <h2 className="mb-3 text-xl font-bold">Request a password reset</h2>
          {email ? (
            <>
              <p className="text-md mb-2 text-gray-600">
                An Email with a link to reset your password was sent to
                <br />
                <span className="font-bold text-black">{email}</span>
              </p>
              <Link
                className="mb-6 text-blue-800 underline hover:no-underline"
                to="/sign-in"
              >
                Ready to sign in?
              </Link>
            </>
          ) : null}
          {error ? <Error message={error.message} /> : null}
          <form
            className="mb-6 w-full min-w-[281px] "
            onSubmit={(e) => {
              e.preventDefault();
              requestReset();
            }}
          >
            <label htmlFor="username" className="block w-full min-w-full">
              <Label>Username or email</Label>
              <input
                className="block w-full"
                type="text"
                name="account"
                id="account"
                value={form.account}
                onChange={updateForm}
              />
            </label>
            <button
              type="submit"
              className="inline-block rounded-md bg-blue-600 text-sm"
            >
              {loading ? "loading..." : "Request"}
            </button>
          </form>
          <p className="flex flex-col items-start gap-1">
            <Link
              to="/sign-in"
              className="text-blue-800 underline hover:no-underline"
            >
              Sign In
            </Link>
            <a
              className="text-blue-800 underline hover:no-underline"
              href={`${wp_url}/create-account`}
            >
              Don't have an account?
            </a>
          </p>
        </div>
      </SigninFormWrapper>
    </SingleForm>
  );
}
