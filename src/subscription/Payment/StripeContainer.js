import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { REACT_APP_PUBLISHABLE_KEY } from "../../key"
import React from "react"
import PaymentForm from "./PaymentForm"


// const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"
const PUBLIC_KEY = REACT_APP_PUBLISHABLE_KEY 

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={ stripeTestPromise }>
      <PaymentForm />
    </Elements>
  )
}
