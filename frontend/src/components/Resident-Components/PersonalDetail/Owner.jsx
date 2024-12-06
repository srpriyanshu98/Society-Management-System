import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { residentDataFront } from "@/data/PersonalDetail/residentDataFront";
import axiosInstance from "@/test/axiosInstance";
import { useNavigate } from "react-router-dom";

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
const fetchAnnouncements = async () => {
	try {
		const response = await axiosInstance.get("/announcements");
		return response.data;
	} catch (error) {
		console.error("Error fetching announcements:", error);
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

export default function Owner() {
	const { profile, members, vehicles } = residentDataFront;
	const [announcements, setAnnouncements] = useState([]);
	const [maintenanceRecords, setMaintenanceRecords] = useState([]);
	const [totalMaintenanceAmount, setTotalMaintenanceAmount] = useState(0);
	const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);
	const [clientSecret, setClientSecret] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchMaintenanceRecords().then((data) => {
			setMaintenanceRecords(data);
			setTotalMaintenanceAmount(calculateTotalMaintenanceAmount(data));
			setTotalPenaltyAmount(calculateTotalPenaltyAmount(data));
		});
		fetchAnnouncements().then((data) => setAnnouncements(data));
	}, []);

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
		<>
			{/* Profile Section */}
			<Card className="flex flex-col lg:flex-row gap-4 items-center p-3 md:p-6 shadow-md rounded-lg">
				{/* Profile Avatar and Details */}
				<div className="grid grid-cols-2">

					<Avatar className="w-20 h-20 md:w-24 md:h-24 rounded-full">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt={profile.fullName}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="md:hidden font-medium font-poppins mt-4">
						<p>Full Name</p>
						<span className="text-slate-600">{profile.fullName}</span>
					</div>
				</div>

				{/* Profile Information */}
				<div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-6 font-medium font-poppins w-full">
					<div className="hidden md:block">
						<p>Full Name</p>
						<span className="text-slate-600">{profile.fullName}</span>
					</div>
					<div>
						<p>Phone Number</p>
						<span className="text-slate-600">{profile.phoneNumber}</span>
					</div>
					<div>
						<p>Email Address</p>
						<span className="text-slate-600">{profile.emailAddress}</span>
					</div>
					<div>
						<p>Gender</p>
						<span className="text-slate-600">{profile.gender}</span>
					</div>
					<div>
						<p>Wing</p>
						<span className="text-slate-600">{profile.wing}</span>
					</div>
					<div>
						<p>Unit</p>
						<span className="text-slate-600">{profile.unit}</span>
					</div>
					<div>
						<p>Age</p>
						<span className="text-slate-600">{profile.age}</span>
					</div>
					<div>
						<p>Relation</p>
						<span className="text-slate-600">{profile.relation}</span>
					</div>
				</div>




				{/* Uploaded Documents */}
				<div className="space-y-2">
					{profile.documents.map((doc, index) => (
						<div
							key={index}
							className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
						>
							<div className="flex items-center">
								<img
									src="/path/to/icon.png"
									alt="Document Icon"
									className="w-6 h-6"
								/>
								<p className="text-sm ">{doc.name}</p>
							</div>
							<p className="text-xs text-slate-600">{doc.size}</p>
						</div>
					))}
				</div>
			</Card >

			{/* Members Section */}
			<Card Card className="mt-2 md:mt-8" >
				<CardHeader className="p-3 md:p-6">
					<CardTitle className="mb-2 md:mb-4 font-semibold text-md md:text-lg">
						Members ({members.length}):
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-6">
					{members.map((items, index) => (
						<Card key={index} className="">
							<CardHeader className="bg-blue-500 rounded-t-lg text-white font-poppins p-3 md:p-6">
								<CardTitle className="text-base">
									{items.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 mt-3 font-poppins text-sm md:text-[16px]  p-2 md:p-6">
								<p>
									<span className="inline-block text-slate-600 ">
										Email:
									</span>
									<span className="float-right">
										{items.email}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Phone:
									</span>
									<span className="float-right">
										{items.phoneNumber}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Age:
									</span>
									<span className="float-right">
										{items.age}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Gender:
									</span>
									<span className="float-right">
										{items.gender}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Relation:
									</span>
									<span className="float-right">
										{items.relation}
									</span>
								</p>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card >

			{/* Vehicles Section */}
			<Card Card className="mt-2 md:mt-8" >
				<CardHeader className="p-3 md:p-6">
					<CardTitle className="mb-2 md:mb-4 font-semibold text-base md:text-lg">
						Vehicles ({vehicles.length}):
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-6">
					{vehicles.map((items, index) => (
						<Card key={index} className="">
							<CardHeader className="bg-blue-500 rounded-t-lg text-white p-3 md:p-6">
								<CardTitle className="text-base font-poppins">
									{items.type}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 mt-3 font-poppins text-sm md:text-[16px] p-2 md:p-6">
								<p>
									<span className="inline-block text-slate-600">
										Vehicle Name:
									</span>
									<span className="float-right">
										{items.name}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Vehicle Number:
									</span>
									<span className="float-right">
										{items.number}
									</span>
								</p>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card >

			{/* Maintenance Section */}
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

			{/* Pending Section */}
			<Card Card className="mt-2 md:mt-8" >
				<CardHeader className="p-3 md:p-6">
					<CardTitle className="font-semibold font-poppins text-[16px] md:text-lg">
						Pending Maintanance
					</CardTitle>
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
											items.maintenanceDueDate
										).toLocaleDateString()}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Pending Date
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
										Maintenance Penalty Amount
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
									Pay Now</Button>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card >


			{/* Due Section */}
			<Card Card className="mt-2 md:mt-8" >
				<CardHeader className="p-3 md:p-6">
					<CardTitle className="font-semibold font-poppins text-[16px] md:text-lg">
						Due Maintanance
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-6">
					{maintenanceRecords.map((items, index) => (
						<Card key={index} className="">
							<CardHeader className="bg-blue-500 rounded-t-lg text-white p-3 md:p-6">
								<CardTitle className="text-base">
									Maintenance
									<span className="float-end">Pending</span>
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
									Pay Now</Button>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card >

			{/* Announcement Section */}
			<Card Card className="mt-2 md:mt-8" >
				<CardHeader className="p-3 md:p-6">
					<CardTitle className="font-semibold font-poppins text-[16px] md:text-lg">
						Announcement Details
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-6">
					{announcements.map((items, index) => (
						<Card key={index} className="">
							<CardHeader className="bg-blue-500 rounded-t-lg text-white p-3 md:p-6">
								<CardTitle className="text-base">
									{items.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 mt-1 md:mt-3 text-[15px] md:text-lg p-2 md:p-6">
								<p>
									<span className="inline-block text-slate-600">
										Announcement Date
									</span>
									<span className="float-right">
										{new Date(
											items.date
										).toLocaleDateString()}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Announcement Time
									</span>
									<span className="float-right">
										{items.time}
									</span>
								</p>
								<p>
									<span className="inline-block text-slate-600">
										Description
									</span>
									<span className="float-right mt-1">
										{items.description}
									</span>
								</p>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card >
		</>
	);
}
