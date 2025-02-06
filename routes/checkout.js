const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ message: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Payment initiation failed", error: error.message });
  }
});

module.exports = router;