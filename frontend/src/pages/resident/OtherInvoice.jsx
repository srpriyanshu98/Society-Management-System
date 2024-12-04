import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import IncomeInvoices from "@/components/Resident-Components/PaymentPortal/IncomeInvoices";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/test/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function OtherInvoice({ userRole }) {
	const [incomeData, setIncomeData] = useState([]);
	const [showInvoicePage, setShowInvoicePage] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [clientSecret, setClientSecret] = useState(null);

	useEffect(() => {
		const fetchIncomeData = async () => {
			try {
				const response = await axiosInstance.get("/otherIncome");
				setIncomeData(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchIncomeData();
	}, []);

	const handleViewInvoice = () => {
		setShowInvoicePage(true);
	};

	const handlePayNow = async (incomeId, amount) => {
		try {
			console.log(
				"Initiating payment for income ID:",
				incomeId,
				"with amount:",
				amount
			);

			// Create payment intent
			const response = await axiosInstance.post(
				"/payments/create-payment-intent",
				{
					amount,
				}
			);

			console.log("Received response from server:", response);

			if (response.data.clientSecret) {
				setClientSecret(response.data.clientSecret);
				console.log(
					"Client Secret successfully set:",
					response.data.clientSecret
				);

				// Navigate to the payment page if clientSecret is valid
				navigate("/payment", {
					state: {
						client_secret: response.data.clientSecret,
						amount,
					},
				});
			} else {
				console.error("Client Secret not returned from the backend");
				alert("Unable to initiate payment. Please try again.");
			}
		} catch (error) {
			console.error("Error creating payment intent:", error);
			alert("Unable to initiate payment. Please try again.");
		}
	};

	if (loading) {
		return <Layout userRole={userRole}>Loading...</Layout>;
	}

	if (error) {
		return <Layout userRole={userRole}>Error: {error}</Layout>;
	}
	return (
		<Layout userRole={userRole}>
			{showInvoicePage ? (
				<IncomeInvoices />
			) : (
				<>
					<Card className="mt-8">
						<CardHeader className="grid grid-cols-[auto_auto] items-center justify-between">
							<CardTitle className="text-lg font-semibold">
								Income Details
							</CardTitle>
							<Button onClick={handleViewInvoice}>
								View Invoice
							</Button>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{incomeData.map((income) => (
								<Card key={income._id} className="">
									<CardHeader className="bg-blue-500 rounded-t-lg text-white">
										<CardTitle className="text-base">
											Due Event Payment
											<span className="float-end">
												Pending
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2 mt-3">
										<p>
											<span className="inline-block text-slate-600">
												Event Name
											</span>
											<span className="float-right">
												{income.title}
											</span>
										</p>
										<p>
											<span className="inline-block text-slate-600">
												Due Date
											</span>
											<span className="float-right">
												{new Date(
													income.dueDate
												).toLocaleDateString()}
											</span>
										</p>
										<Separator />
										<p>
											<span className="inline-block text-slate-600">
												Amount
											</span>
											<span className="float-right">
												₹{income.amount}
											</span>
										</p>
										<Button
											className="w-full"
											onClick={() =>
												handlePayNow(
													income._id,
													income.amount
												)
											}
										>
											Pay Now
										</Button>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>
				</>
			)}
		</Layout>
	);
}
