import Layout from "@/components/Layout";
import AddResidentDialog from "@/components/residentManagement/AddResidentDialog";
import ProfileSheetContent from "@/components/residentManagement/ProfileSheetContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { residents } from "@/data/residentsData";
import { useState } from "react";

// Function to get image based on unit status
const getUnitStatusImage = (unitStatus) => {
	if (unitStatus === "Occupied") {
		return "/src/assets/Occupied.svg";
	} else if (unitStatus === "Vacant") {
		return "/src/assets/Vacant.svg";
	}
};

// Function to get image based on resident status
const getResidentStatusImage = (residentStatus) => {
	if (residentStatus === "Owner") {
		return "/src/assets/Owner.svg";
	} else if (residentStatus === "Tenant") {
		return "/src/assets/Tenant.svg";
	}
};

// Function to get background color based on unit status
const getUnitStatusColor = (unitStatus) => {
	return unitStatus === "Occupied"
		? "rgba(20, 184, 166, 0.1)"
		: "rgba(147, 51, 234, 0.1)";
};

const getUnitStatusTextColor = (unitStatus) => {
	return unitStatus === "Occupied" ? "#14B8A6" : "#9333EA";
};

// Function to get background color based on resident status
const getResidentStatusColor = (residentStatus) => {
	return residentStatus === "Owner"
		? "rgba(236, 72, 153, 0.1)"
		: "rgba(79, 70, 229, 0.1)";
};

const getResidentStatusTextColor = (residentStatus) => {
	return residentStatus === "Owner" ? "#4F46E5" : "#EC4899";
};

const vacateBgColor = "rgba(128, 128, 128, 0.1)";

export default function ResidentManagement({ userRole }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleAddResident = () => {
		setIsDialogOpen(true); // Open the dialog
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false); // Close the dialog
	};

	const handleSaveResident = (unitStatus) => {
		// Handle the logic after saving (e.g., add resident to list)
		console.log(`New resident with unit status: ${unitStatus}`);
		// You can make an API call here to save the data
		handleCloseDialog(); // Close the dialog after saving
	};

	return (
		<Layout userRole={userRole}>
			<Card className="flex-1 p-6 bg-white h-full overflow-auto rounded-2xl">
				<CardHeader className="flex flex-row justify-between items-center p-0">
					<CardTitle>Resident Tenant and Owner Details</CardTitle>
					<Button
						className="flex items-center space-x-2"
						onClick={handleAddResident}
					>
						<img src="./src/assets/add-square.svg" alt="" />
						<span>Add New Resident Details</span>
					</Button>
				</CardHeader>
				<CardContent className="p-0">
					<ScrollArea className="max-h-[715px] overflow-y-auto m-4 custom-scrollbar">
						<table className="w-full border-collapse rounded-tl-3xl text-center">
							<thead className="bg-gray-200 sticky top-0 z-10">
								<tr>
									<th className="p-3 text-left rounded-tl-3xl">
										Full Name
									</th>
									<th className="p-3">Unit Number</th>
									<th className="p-3">Unit Status</th>
									<th className="p-3">Resident Status</th>
									<th className="p-3">Phone Number</th>
									<th className="p-3">Member</th>
									<th className="p-3">Vehicle</th>
									<th className="p-3 rounded-tr-3xl">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{residents.map((resident, index) => {
									const isVacate =
										resident.unitStatus === "Vacate";
									return (
										<tr key={index} className="border-b">
											<td
												className="p-3 text-left"
												style={{
													backgroundColor: isVacate
														? vacateBgColor
														: "transparent",
												}}
											>
												<div className="flex items-center">
													<img
														src={
															resident.residentStatus
																? getResidentStatusImage(
																		resident.residentStatus
																  )
																: getUnitStatusImage(
																		resident.unitStatus
																  )
														}
														alt={
															resident.fullName ||
															"No Image"
														}
														className="w-8 h-8 rounded-full mr-2"
													/>
													<span>
														{resident.fullName ||
															"-"}
													</span>
												</div>
											</td>
											<td className="p-3">
												<span className="flex justify-center">
													{resident.unitWing}{" "}
													{resident.unitNumber}
												</span>
											</td>
											<td className="p-3">
												<span
													className="flex items-center justify-center space-x-1 rounded-s-full rounded-e-full pt-1 pb-1 font-semibold"
													style={{
														backgroundColor:
															getUnitStatusColor(
																resident.unitStatus
															),
														color: getUnitStatusTextColor(
															resident.unitStatus
														),
													}}
												>
													<img
														src={getUnitStatusImage(
															resident.unitStatus
														)}
														alt={
															resident.unitStatus
														}
														className="w-4 h-4"
													/>
													<span>
														{resident.unitStatus}
													</span>
												</span>
											</td>
											<td className="p-3">
												<span
													className="flex items-center justify-center space-x-1 rounded-s-full rounded-e-full pt-1 pb-1 font-semibold"
													style={{
														backgroundColor:
															isVacate
																? vacateBgColor
																: getResidentStatusColor(
																		resident.residentStatus
																  ),
														color: getResidentStatusTextColor(
															resident.residentStatus
														),
													}}
												>
													<img
														src={getResidentStatusImage(
															resident.residentStatus
														)}
														alt={
															resident.residentStatus
														}
														className="w-4 h-4"
													/>
													<span>
														{resident.residentStatus ||
															"--"}
													</span>
												</span>
											</td>

											<td
												className="p-3"
												style={{
													backgroundColor: isVacate
														? vacateBgColor
														: "transparent",
												}}
											>
												{resident.phoneNumber || "--"}
											</td>
											<td
												className="p-3"
												style={{
													backgroundColor: isVacate
														? vacateBgColor
														: "transparent",
												}}
											>
												{resident.member || "--"}
											</td>
											<td
												className="p-3"
												style={{
													backgroundColor: isVacate
														? vacateBgColor
														: "transparent",
												}}
											>
												{resident.vehicle || "--"}
											</td>
											<td
												className="p-3 space-x-2"
												style={{
													backgroundColor: isVacate
														? vacateBgColor
														: "transparent",
												}}
											>
												{resident.fullName ? (
													<>
														<div className="flex space-x-2 items-center justify-center">
															<button className="bg-gray-200 p-2 w-8 h-8 rounded-lg">
																<img
																	src="/src/assets/edit.svg"
																	alt="Edit"
																/>
															</button>
															<Sheet>
																<SheetTrigger
																	asChild
																>
																	<button className="bg-gray-200 p-2 w-8 h-8 rounded-lg">
																		<img
																			src="/src/assets/view.svg"
																			alt="View"
																		/>
																	</button>
																</SheetTrigger>

																{/* Sheet Content */}
																<ProfileSheetContent />
															</Sheet>
														</div>
													</>
												) : (
													"--"
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</ScrollArea>
				</CardContent>
			</Card>

			{/* AddResidentDialog component */}
			<AddResidentDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onSave={handleSaveResident}
			/>
		</Layout>
	);
}
