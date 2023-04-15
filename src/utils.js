import appStripe from "stripe"
import axios from "axios";

// const userData = JSON.parse(localStorage.getItem("userData"))

const secrete = "sk_live_iBluqXMu8TthVIcwwqb0cwek"
const stripe = appStripe(secrete)
export async function pay(amount, id, description) {
  let result = null;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100, // To convert to cent.
      currency: "USD",
      description,
      // customer: userData.email,
      payment_method: id,
      confirm: true
    })
    result = payment;
  } catch (error) {
    result = error;
  }
  return result;
}