import Stripe from "stripe";
import { ENV_VARS } from "../config/envVars.js";

const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
	const { amount } = req.body;

	console.log("Received amount:", amount);

	try {
		console.log("Stripe secret key:", ENV_VARS.STRIPE_SECRET_KEY);

		// Create a PaymentIntent with the amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100, // Stripe expects amount in cents
			currency: "usd",
			payment_method_types: ["card"],
		});

		console.log("Payment Intent created successfully:", paymentIntent);

		// Ensure that the client secret exists and is being returned
		if (paymentIntent.client_secret) {
			console.log("Client Secret:", paymentIntent.client_secret);
			// Return the client secret to the frontend
			return res.send({
				clientSecret: paymentIntent.client_secret,
			});
		} else {
			console.error("Client Secret not found in the payment intent.");
			return res.status(400).json({ error: "Client Secret not found" });
		}
	} catch (error) {
		console.error("Error creating payment intent:", error);
		res.status(500).json({ error: error.message });
	}
};
