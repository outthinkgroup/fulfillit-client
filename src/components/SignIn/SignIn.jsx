import React from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import Error from "../Error/ErrorMessage";
import useForm from "../../utils/useForm";
import { SingleForm, SigninFormWrapper, Label } from "../../elements";
import { hardNavigate } from "../../utils";
export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    userLogin: login(
      input: {
        username: $username
        password: $password
        clientMutationId: "blah"
      }
    ) {
      authToken
      refreshToken
      user {
        jwtAuthExpiration
        username
        id
        name
        nickname
        email
      }
    }
  }
`;

const SignIn = ({}) => {
  const [form, updateForm] = useForm({
    username: "",
    password: "",
  });
  const [userLogin, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: form.username,
      password: form.password,
    },
    onCompleted({ userLogin }) {
      typeof window !== "undefined" &&
        localStorage.setItem("token", userLogin.authToken);
      localStorage.setItem("refreshToken", userLogin.refreshToken);
      localStorage.setItem(
        "tokenExpires",
        parseInt(userLogin.user.jwtAuthExpiration) * 1000
      );
      localStorage.setItem("userID", userLogin.user.id);
      hardNavigate("/");
    },
  });

  return (
    <SingleForm>
      <SigninFormWrapper>
        <div className="w-10 bg-blue-900 md:block md:w-2/6" />
        <div className="grid flex-1 place-content-center py-8 px-6">
          <h2 className="mb-3 text-xl font-bold">Sign In</h2>
          {error ? <Error message={error.message} /> : null}
          <form
            className="mb-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              typeof window !== "undefined" &&
                localStorage.setItem("token", "");
              userLogin();
            }}
          >
            <label htmlFor="username" className="block w-full min-w-full">
              <Label>username</Label>
              <input
                className="block w-full"
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="password" className="block w-full">
              <Label>password</Label>
              <input
                className="w-full"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm}
              />
            </label>
            <button
              type="submit"
              className="inline-block rounded-md bg-blue-600 text-sm"
            >
              {loading ? "loading..." : "Sign in"}
            </button>
          </form>
          <p>
            <Link className="text-blue-800 underline" to="/checkout">
              Don't have an account?
            </Link>
          </p>
        </div>
      </SigninFormWrapper>
    </SingleForm>
  );
};

export default SignIn;
