import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { pay } from "../../utils";

const Wrapper = styled.form`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 16px;

  .StripeElement {
    width: 350px;
    padding: 11px 15px 11px 0;
    padding: 1rem;
    background-color: black;
  }
`;

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
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({ price, macAddress, description, handlers }) {
  const [success, setSuccess] = useState(false);
  // const [alertDetails, setAlertDetails] = useState({ show: false, color: null, message: "" })
  const stripe = useStripe();
  const elements = useElements();
  const { setShowItem, setAlertDetails } = handlers;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      let value = await pay(price, id, description);
      const data = {
        name: description,
        subRatePerMin: price,
        hasActiveSub: true,
        email: "youremail@you.com",
      };
      if (value.status === "succeeded") {
        // axios
        //   .post("http://localhost:5000/api/users/sub",data)
        //   .then((res) => {

        //   })
        //   .catch((err) => {
        //     console.log("The error", err)
        //   });

        alert("yes");

        const user = JSON.parse(localStorage.getItem("phantom_user"));
        console.log({ user });
        const data = {
          name: description,
          subRatePerMin: price,
          hasActiveSub: true,
          email: user.email,
          durationInMinutes: `${24 * 60 * 60}`,
          MacAddress: macAddress,
        };
        axios
          .post("http://localhost:5000/api/sub", data, {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            console.log({ res });
          })
          .catch((err) => {
            console.log("The error", err);
          });

        setAlertDetails({
          show: true,
          color: "#4bb543",
          message: `Your purchase of ${value.description} at $${price} was successful`,
        });
        setShowItem(false);
      } else {
        setAlertDetails({ show: true, color: "red", message: value.message });
        setShowItem(false);
      }
    } else {
      setAlertDetails({ show: true, color: "red", message: error.message });
      setShowItem(false);
    }
  };

  return (
    <>
      {!success ? (
        <Wrapper onSubmit={handleSubmit}>
          <div className="cont">
            <CardElement options={CARD_OPTIONS} />
          </div>

          <button>Pay</button>
        </Wrapper>
      ) : (
        <div>
          <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
        </div>
      )}
    </>
  );
}
