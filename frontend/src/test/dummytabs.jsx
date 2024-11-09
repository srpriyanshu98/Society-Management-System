import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { maintenanceData } from "@/data/maintenanceData";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react"; // Adjust icon as per ShadCN

export default function MaintenanceTabs() {
	// const fetchData = async () => {
	// Placeholder function for future API call
	// const response = await fetch("API_URL");
	// const data = await response.json();
	// return data;
	// };

	return (
		<Tabs defaultValue="maintenance" className="p-4">
			<TabsList className="space-x-4">
				<TabsTrigger value="maintenance">Maintenance</TabsTrigger>
				<TabsTrigger value="otherIncome">Other Income</TabsTrigger>
			</TabsList>

			<TabsContent value="maintenance">
				<h2 className="text-lg font-semibold mb-4">
					Maintenance Details
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-md">
						<thead>
							<tr className="bg-gray-100 text-gray-600 text-left">
								<th className="px-4 py-2">Name</th>
								<th className="px-4 py-2">Unit Number</th>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">Status</th>
								<th className="px-4 py-2">Phone Number</th>
								<th className="px-4 py-2">Amount</th>
								<th className="px-4 py-2">Penalty</th>
								<th className="px-4 py-2">
									Maintenance Status
								</th>
								<th className="px-4 py-2">Payment</th>
								<th className="px-4 py-2">Action</th>
							</tr>
						</thead>
						<tbody>
							{maintenanceData.map((item) => (
								<tr key={item.id} className="border-b">
									<td className="px-4 py-2">{item.name}</td>
									<td className="px-4 py-2">
										{item.unitNumber}
									</td>
									<td className="px-4 py-2">{item.date}</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												item.status === "Owner"
													? "bg-blue-100 text-blue-800"
													: "bg-pink-100 text-pink-800"
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="px-4 py-2">
										{item.phoneNumber}
									</td>
									<td className="px-4 py-2">{item.amount}</td>
									<td className="px-4 py-2">
										{item.penalty}
									</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												item.maintenanceStatus ===
												"Done"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{item.maintenanceStatus}
										</span>
									</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												item.paymentMode === "Online"
													? "bg-blue-100 text-blue-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{item.paymentMode}
										</span>
									</td>
									<td className="px-4 py-2">
										<Button variant="ghost" className="p-1">
											<EyeIcon className="w-5 h-5" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</TabsContent>

			<TabsContent value="otherIncome">
				<h2 className="text-lg font-semibold">Other Income</h2>
				{/* Future content for "Other Income" */}
			</TabsContent>
		</Tabs>
	);
}
