import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"


// const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"
const PUBLIC_KEY = "pk_live_BAQCVkj5J2Yzd4cxshbG7alP";


const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({price, description}) {
  return (
    <Elements stripe={ stripeTestPromise }>
      <PaymentForm price={ price } description={ description } />
    </Elements>
  )
}
