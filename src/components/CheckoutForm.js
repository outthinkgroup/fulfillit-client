import React, { useState } from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import { SingleForm } from "../designSystem/styles"
import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"
import UseForm from "../utils/useForm"
import { LOGIN_MUTATION } from "./SignIn"
import { Error } from "./Error"
const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
}
const ADD_CUSTOMER = gql`
  mutation ADD_CUSTOMER(
    $email: String!
    $username: String!
    $password: String!
    $paymentMethod: String!
  ) {
    newCustomer(
      input: {
        clientMutationId: "sdf"
        email: $email
        password: $password
        username: $username
        paymentMethod: $paymentMethod
      }
    ) {
      paymentMethodID
      subscription
      user {
        username
      }
    }
  }
`

const CheckoutForm = props => {
  const [form, updateForm] = UseForm({ email: "", username: "", password: "" })
  const [errorM, setErrorM] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [login, loginData] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: form.username,
      password: form.password,
    },

    onCompleted({ userLogin }) {
      localStorage.setItem("token", userLogin.authToken)
      localStorage.setItem("userID", userLogin.user.id)
      window.location.href = `${window.location.origin}/dashboard`
    },
  })
  const [
    addCustomerAndSubscription,
    { data, error: mutationError, loading },
  ] = useMutation(ADD_CUSTOMER, {
    variables: {
      email: form.email,
      paymentMethod,
      username: form.username,
      password: form.password,
    },
    onCompleted({ newCustomer }) {
      const { subscription } = newCustomer
      const subscriptionData = JSON.parse(subscription)
      const { latest_invoice } = subscriptionData
      const { payment_intent } = latest_invoice

      if (payment_intent) {
        const { client_secret, status } = payment_intent

        if (status === "requires_action") {
          props.stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              console.log("card declined")
            } else {
              login()
            }
          })
        } else {
          // No additional information was needed
          login()
          // Show a success message to your customer
        }
      } else {
        // No additional information was needed
        login()
        // Show a success message to your customer
      }
    },
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const cardElement = props.elements.getElement("card")
    //TODO set loading state.
    const result = await props.stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: form.email,
      },
    })

    stripePaymentMethodHandler(result)
  }
  const stripePaymentMethodHandler = result => {
    if (result.error) {
      // Show error in payment form
    } else {
      setPaymentMethod(result.paymentMethod.id)
      addCustomerAndSubscription()
      // The customer has been created
      //const customer = await res.json()
    }
  }

  return (
    <SingleForm>
      <div className="singleform-wrapper">
        <div className="left-column" />
        <div className="singleform-form-wrapper">
          <h2>Checkout</h2>
          {mutationError &&
            mutationError.graphQLErrors.map((error, i) => {
              return <Error message={error.message} />
            })}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <span>name</span>
              <input
                type="text"
                name="username"
                id="name"
                value={form.username}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="email">
              <span>email</span>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="password">
              <span>password</span>
              <input
                type="text"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm}
              />
            </label>
            <label htmlFor="card-details">
              <span>Card Details</span>
              <CardElement className="MyCardElement" style={style} />
            </label>
            <button type="submit">
              {loading
                ? "creating user"
                : loginData.loading
                ? "Loading"
                : "checkout"}
            </button>
          </form>
        </div>
      </div>
    </SingleForm>
  )
}
export default injectStripe(CheckoutForm)
