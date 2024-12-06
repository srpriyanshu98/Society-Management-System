import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Invoices from "@/components/Resident-Components/PaymentPortal/Invoices";
import axiosInstance from "@/test/axiosInstance";

// Fetch maintenance records from the API
const fetchMaintenanceRecords = async () => {
	try {
		const response = await axiosInstance.get("/maintenance");
		return response.data;
	} catch (error) {
		console.error("Error fetching maintenance records:", error);
		return [];
	}
};

// Calculate total maintenance amount
const calculateTotalMaintenanceAmount = (maintenanceRecords) => {
	return maintenanceRecords.reduce(
		(total, record) => total + record.maintenanceAmount,
		0
	);
};

// Calculate total penalty amount
const calculateTotalPenaltyAmount = (maintenanceRecords) => {
	return maintenanceRecords.reduce(
		(total, record) => total + record.penaltyAmount,
		0
	);
};

export default function MaintenanceInvoices({ userRole }) {
	const [showInvoicePage, setShowInvoicePage] = useState(false);
	const [maintenanceRecords, setMaintenanceRecords] = useState([]);
	const [totalMaintenanceAmount, setTotalMaintenanceAmount] = useState(0);
	const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);
	const [clientSecret, setClientSecret] = useState(null);
	const navigate = useNavigate();

	// Load maintenance records on component mount
	useEffect(() => {
		fetchMaintenanceRecords().then((data) => {
			setMaintenanceRecords(data);
			setTotalMaintenanceAmount(calculateTotalMaintenanceAmount(data));
			setTotalPenaltyAmount(calculateTotalPenaltyAmount(data));
		});
	}, []);

	// Show invoice page
	const handleViewInvoice = () => {
		setShowInvoicePage(true);
	};

	// Redirect to the payment page
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

	return (
		<Layout userRole={userRole}>
			{showInvoicePage ? (
				<Invoices />
			) : (
				<>
					{/* Maintenance Summary */}
					<Card className="mt-2 md:mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center">
						<CardHeader className="p-3 md:p-6">
							<CardTitle className="font-semibold font-poppins text-[16px] md:text-lg">
								Show Maintenance Details:
							</CardTitle>
						</CardHeader>
						<CardContent className="p-3 md:p-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 md:gap-6 overflow-x-auto font-poppins w-full">
								<Card className="p-4 space-x-4 rounded-lg shadow-lg relative w-[250px] md:w-full max-w-xs mt-2 md:mt-5">
									{/* Left Accent Bar */}
									<div
										className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b from-green-400 to-green-600 opacity-40`}
									/>
									{/* Content */}
									<div>
										<p className="text-sm font-semibold">Maintenance Amount</p>
										<h2 className="text-2xl font-semibold text-green-600">
											{totalMaintenanceAmount}
										</h2>
									</div>
								</Card>
								<Card className="p-4 space-x-4 rounded-lg shadow-lg relative w-[250px] md:w-full max-w-xs mt-2 md:mt-5">
									{/* Left Accent Bar */}
									<div
										className={`absolute left-0 top-0 bottom-0 w-2 h-14 rounded-e-lg m-auto bg-gradient-to-b from-red-400 to-red-600 opacity-40`}
									/>
									{/* Content */}
									<div>
										<p className="text-sm font-semibold">Penalty Amount</p>
										<h2 className="text-2xl font-semibold text-red-600">
											{totalPenaltyAmount}
										</h2>
									</div>
								</Card>
							</div>
						</CardContent>
					</Card>

					{/* Pending Maintenance Section */}
					<Card className="mt-2 md:mt-8">
						<CardHeader className="grid grid-cols-[auto_auto] items-center justify-between p-3 md:p-6">
							<CardTitle className="font-semibold font-poppins text-[16px] md:text-lg">
								Pending Maintenance
							</CardTitle>
							<Button onClick={handleViewInvoice} className="w-24">
								View Invoice
							</Button>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-6">
							{maintenanceRecords.map((items, index) => (
								<Card key={index} className="">
									<CardHeader className="bg-blue-500 rounded-t-lg text-white p-3 md:p-6">
										<CardTitle className="text-base font-poppins">
											Maintenance
											<span className="float-end font-poppins">
												Pending
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2 mt-3 font-poppins text-[15px] md:text-lg p-2 md:p-6">
										<p>
											<span className="inline-block text-slate-600">
												Bill Date
											</span>
											<span className="float-right">
												{new Date(
													items.billDate
												).toLocaleDateString()}
											</span>
										</p>
										<p>
											<span className="inline-block text-slate-600">
												Due Date
											</span>
											<span className="float-right">
												{new Date(
													items.maintenanceDueDate
												).toLocaleDateString()}
											</span>
										</p>
										<Separator />
										<p>
											<span className="inline-block text-slate-600">
												Maintanance Amount
											</span>
											<span className="float-right text-red-500">
												{items.maintenanceAmount}
											</span>
										</p>
										<p>
											<span className="inline-block text-slate-600">
												Penalty Amount
											</span>
											<span className="float-right text-red-500">
												{items.penaltyAmount}
											</span>
										</p>
										<Separator />
										<p>
											<span className="inline-block text-slate-600 font-semibold font-poppins">
												Grand Total
											</span>
											<span className="float-right text-green-500">
												{items.maintenanceAmount +
													items.penaltyAmount}
											</span>
										</p>
										<Button
											className="w-full"
											onClick={() =>
												handlePayNow(
													items.id,
													items.maintenanceAmount +
													items.penaltyAmount
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

					{/* Due Section */}
					<Card className="mt-2 md:mt-8">
						<CardHeader className="p-3 md:p-6">
							<CardTitle className="text-lg font-semibold font-poppins text-[16px] md:text-lg">
								Due Maintanance
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-6">
							{maintenanceRecords.map((items, index) => (
								<Card key={index} className="">
									<CardHeader className="bg-blue-500 rounded-t-lg text-white p-3 md:p-6">
										<CardTitle className="text-base">
											Maintenance
											<span className="float-end">
												Pending
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2 mt-1 md:mt-3 text-[15px] md:text-lg p-2 md:p-6">
										<p>
											<span className="inline-block text-slate-600">
												Date
											</span>
											<span className="float-right">
												{new Date(
													items.maintenanceDueDate
												).toLocaleDateString()}
											</span>
										</p>
										<Separator />
										<p>
											<span className="inline-block text-slate-600">
												Amount
											</span>
											<span className="float-right text-red-500">
												{items.maintenanceAmount}
											</span>
										</p>
										<p>
											<span className="inline-block text-slate-600">
												Due Maintanance Amount
											</span>
											<span className="float-right text-red-500">
												{items.penaltyAmount}
											</span>
										</p>
										<Separator />
										<Button
											className="w-full"
											onClick={() =>
												handlePayNow(
													items.id,
													items.maintenanceAmount +
													items.penaltyAmount
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
