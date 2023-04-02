import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import styled from "styled-components"
import { pay } from "../../utils"

const Wrapper = styled.form`
.cont{
  /* display: flex;
  flex-direction: column; */
  .StripeElement {
	width: 350px;
	padding: 11px 15px 11px 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;
  background-color: black;
}
}
`


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

export default function PaymentForm() {
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })


    if (!error) {
      const { id } = paymentMethod
      pay(1000,id)
      /*try {
        const { id } = paymentMethod
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id
        })

        if (response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
        }

      } catch (error) {
        console.log("Error", error)
      } */
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      { !success ?
        <Wrapper onSubmit={ handleSubmit }>
              <div className="cont">
            <CardElement
              options={ CARD_OPTIONS }
            />
              </div>
          {/* <fieldset className="FormGroup">
            <div className="FormRow">
            </div>
          </fieldset> */}
          <button>Pay</button>
        </Wrapper>
        :
        <div>
          <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
        </div>
      }

    </>
  )
}