import appStripe from "stripe"



const secrete = "sk_live_iBluqXMu8TthVIcwwqb0cwek"
const stripe = appStripe(secrete)
export async function pay(amount, id) {
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spoon For cooking",
      payment_method: id,
      confirm: true
    })

    console.log("Payment", payment)
  } catch (error) {
    console.log("Error", "Payment fail");
    console.log("Message: ", error.message)
  }
}