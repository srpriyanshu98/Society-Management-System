import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useEffect } from "react";

const stripePromise = loadStripe(
	"pk_test_51QQX4FJQvq9oijFBGWebF9RELPde3Mx4xFAZ0Mbu2uFFoYid0YBgID05vcEVKkHyvANOjvtLqofeaDYKsVGEBWeK00hkJ0Prhf"
);

const PaymentForm = ({ client_secret, amount }) => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			console.error("Stripe or Elements not loaded.");
			return;
		}

		console.log("Submitting payment with client_secret:", client_secret);
		console.log("Amount to be charged:", amount);

		const result = await stripe.confirmCardPayment(client_secret, {
			payment_method: { card: elements.getElement(CardElement) },
		});

		if (result.error) {
			console.error("Payment failed:", result.error.message);
			alert("Payment failed: " + result.error.message);
		} else if (result.paymentIntent.status === "succeeded") {
			alert("Payment successful!");
			navigate("/success");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<CardElement className="p-2 border border-gray-300 rounded" />
			<Button type="submit" disabled={!stripe} className="w-full">
				Pay ₹{amount}
			</Button>
		</form>
	);
};

export default function PaymentPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { client_secret, amount } = location.state || {};

	useEffect(() => {
		console.log("Location State:", location.state);

		if (!client_secret || !amount) {
			console.error("Missing required data:", { client_secret, amount });
			navigate("/maintenance-invoices");
		}
	}, [client_secret, amount, navigate, location.state]);

	if (!client_secret || !amount) {
		console.log("Missing client_secret or amount, redirecting...");
		return null;
	}

	console.log("Rendering payment form with client_secret:", client_secret);
	console.log("Rendering payment form with amount:", amount);

	return (
		<Layout>
			<div className="max-w-lg mx-auto mt-12">
				<h1 className="text-xl font-bold mb-4">
					Complete Your Payment
				</h1>
				<Elements
					stripe={stripePromise}
					options={{ clientSecret: client_secret }}
				>
					<PaymentForm
						client_secret={client_secret}
						amount={amount}
					/>
				</Elements>
			</div>
		</Layout>
	);
}
