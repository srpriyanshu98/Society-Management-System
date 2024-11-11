import { useState } from "react";
import { maintenanceData } from "@/data/maintenanceData";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MaintenanceViewModal from "./MaintenanceViewModal"; // Import the new modal component

export const MaintenanceDetails = () => {
	const [selectedMaintenance, setSelectedMaintenance] = useState(null);

	const handleViewClick = (item) => {
		setSelectedMaintenance(item);
	};

	const handleCloseModal = () => {
		setSelectedMaintenance(null);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Maintenance Details</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<ScrollArea className="max-h-[550px] overflow-y-auto m-4 custom-scrollbar">
					<table className="w-full border-collapse rounded-tl-3xl text-center">
						<thead className="bg-gray-200 sticky top-0 z-10">
							<tr>
								<th className="p-4 text-left rounded-tl-3xl">
									Name
								</th>
								<th className="p-4">Unit Number</th>
								<th className="p-4">Date</th>
								<th className="p-4">Status</th>
								<th className="p-4">Phone Number</th>
								<th className="p-4">Amount</th>
								<th className="p-4">Penalty</th>
								<th className="p-4">Maintenance Status</th>
								<th className="p-4">Payment</th>
								<th className="p-4 rounded-tr-3xl">Action</th>
							</tr>
						</thead>
						<tbody>
							{maintenanceData.map((item) => (
								<tr key={item.id} className="border-b">
									<div className="flex items-center mt-5">
										<Avatar className="w-10 h-10">
											<AvatarImage
												src="https://github.com/shadcn.png"
												alt="@shadcn"
											/>
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<td className="p-4 text-left">
											{item.name}
										</td>
									</div>
									<td className="p-4">{item.unitNumber}</td>
									<td className="p-4">{item.date}</td>
									<td className="p-4">
										<span
											className={`p-2 ps-8 pe-8 rounded-full text-base font-semibold ${
												item.status === "Owner"
													? "bg-blue-100 text-blue-800"
													: "bg-pink-100 text-pink-800"
											}`}
										>
											<span className="inline-block align-middle me-2">
												<img
													src={
														item.status === "Owner"
															? "./src/assets/owner.svg"
															: "./src/assets/tenant.svg"
													}
													className="w-5 h-5"
													alt={`${item.status} Icon`}
												/>
											</span>
											<span>{item.status}</span>
										</span>
									</td>

									<td className="p-4 ">{item.phoneNumber}</td>
									<td className="p-4 text-green-500">
										{item.amount}
									</td>
									<td className="p-4">
										<span
											className={`p-2 ps-8 pe-8 rounded-full  text-base font-semibold ${
												item.maintenanceStatus ===
												"Done"
													? "bg-red-600 text-white"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{item.penalty}
										</span>
									</td>
									<td className="p-4">
										<span
											className={`p-2 ps-8 pe-8 rounded-full text-base font-semibold ${
												item.maintenanceStatus ===
												"Done"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											<span className="inline-block align-middle me-2">
												<img
													src={
														item.maintenanceStatus ===
														"Done"
															? "./src/assets/verify.svg"
															: "./src/assets/timer.svg"
													}
													className="w-5 h-5"
													alt="Status Icon"
												/>
											</span>
											<span>
												{item.maintenanceStatus}
											</span>
										</span>
									</td>

									<td className="">
										<span
											className={`p-2 ps-8 pe-8 rounded-full text-base font-semibold ${
												item.paymentMode === "Online"
													? "bg-blue-100 text-blue-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											<span className="inline-block align-middle me-2">
												<img
													src={
														item.paymentMode ===
														"Online"
															? "./src/assets/wallet-2.svg"
															: "./src/assets/wallet-1.svg"
													}
													className="w-5 h-5"
													alt="Payment Icon"
												/>
											</span>
											<span>{item.paymentMode}</span>
										</span>
									</td>

									<td className="p-4">
										<Button
											variant="ghost"
											className="p-2 bg-gray-100"
											onClick={() =>
												handleViewClick(item)
											}
										>
											<img
												src="/src/assets/view.svg"
												alt="View"
											/>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</ScrollArea>
			</CardContent>
			<MaintenanceViewModal
				isOpen={Boolean(selectedMaintenance)}
				onClose={handleCloseModal}
				maintenance={selectedMaintenance}
			/>
		</Card>
	);
};
