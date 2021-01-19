import React from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import CheckoutForm from "../components/CheckoutForm/CheckoutForm"
import CheckoutStyledWrapper from "../designSystem/styles/MyCardElement"

import SingleFormLayout from "../Layouts/SingleFormLayout"
const Checkout = () => (
  <SingleFormLayout>
    {typeof window !== "undefined" && (
      <CheckoutStyledWrapper>
        <StripeProvider apiKey="pk_test_gLXHhM133Hr3wT95bfbTbjY300a67NU0FP">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>
      </CheckoutStyledWrapper>
    )}
  </SingleFormLayout>
)

export default Checkout
