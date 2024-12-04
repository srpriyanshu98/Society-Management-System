import { useState } from "react";
import axiosInstance from "@/test/axiosInstance";

const useStripePayment = () => {
	const [clientSecret, setClientSecret] = useState(null);

	const createPaymentIntent = async (amount) => {
		try {
			// Log the amount being sent to the backend for payment intent creation
			console.log("Creating payment intent with amount:", amount);

			const response = await axiosInstance.post(
				"/payments/create-payment-intent",
				{
					amount,
				}
			);

			// Log the response from the backend to check if the clientSecret is returned
			console.log("Received response from server:", response);

			if (response.data.clientSecret) {
				setClientSecret(response.data.clientSecret);
				console.log(
					"Client Secret successfully set:",
					response.data.clientSecret
				);
			} else {
				console.error("Client Secret not returned from the backend");
			}
		} catch (error) {
			console.error("Error creating payment intent:", error);
		}
	};

	return { clientSecret, createPaymentIntent };
};

export default useStripePayment;
