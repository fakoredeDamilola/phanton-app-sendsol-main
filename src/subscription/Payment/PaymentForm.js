import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import styled from "styled-components"
import { pay } from "../../utils"

const Wrapper = styled.form`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 16px;
  

  .StripeElement {
	width: 350px;
	padding: 11px 15px 11px 0;
  padding: 1rem;
  background-color: black;
}
`

const AlertWrapper = styled.div`
width: 250px;
padding: 10px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
border-bottom: 3px solid ${props => props.color};
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
font-size: 14px;
position: fixed;
right: 2rem;
top: 2rem;
background-color: white;
.cancel{
  content: "X";
  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: 700;

}
p{
  padding: 0 10px;
}
`
const Alert = ({ message, color, onClick }) => <AlertWrapper onClick={ onClick } color={ color }>
  <p>{ message }</p>
<span className="cancel">X</span>
</AlertWrapper>



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

export default function PaymentForm({ price , description}) {
  const [success, setSuccess] = useState(false)
  const [alertDetails, setAlertDetails] = useState({ show: false, color: null, message: "" })
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
      let value = await pay(price, id, description)
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
      if (value.status === "succeeded") {
      setAlertDetails({ show: true, color: "#4bb543", message: `Your purchase of ${value.description} at $${price} was successful` })
      } else {
        setAlertDetails({ show: true, color: "red", message: value.message })
      }

    } else {
      console.log()
      setAlertDetails({ show: true, color: "red", message: error.message })
    }
  }

  return (
    <>
      {alertDetails.show && <Alert message={ alertDetails.message } color={ alertDetails.color } onClick={ () => setAlertDetails(previousState => ({ ...previousState, show: false })) } /> }
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