import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { residents } from "@/data/residentsData";

const getResidentImage = (residentStatus, unitStatus) => {
	if (residentStatus === "Owner" && unitStatus === "Occupied") {
		return "/src/assets/Owner.svg";
	} else if (residentStatus === "Owner" && unitStatus === "Vacate") {
		return "/src/assets/Owner.svg";
	} else if (residentStatus === "Tenant" && unitStatus === "Occupied") {
		return "/src/assets/Tenant.svg";
	} else if (residentStatus === "Tenant" && unitStatus === "Vacate") {
		return "/src/assets/Tenant.svg";
	}
};

const getBackgroundColor = (residentStatus) => {
	if (residentStatus === "Owner") {
		return "rgba(0, 255, 0, 0.2)";
	} else if (residentStatus === "Tenant") {
		return "rgba(255, 0, 0, 0.2)";
	}
	return "rgba(200, 200, 200, 0.2)";
};

export default function ResidentManagement({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Card className="flex-1 p-6 bg-white h-full overflow-auto rounded-2xl">
				<CardHeader className="flex flex-row justify-between items-center p-0">
					<CardTitle>Resident Tenant and Owner Details</CardTitle>
					<Button className="flex items-center space-x-2">
						<img src="./src/assets/add-square.svg" alt="" />
						<span>Add New Resident Details</span>
					</Button>
				</CardHeader>
				<CardContent className="p-0">
					{/* Wrapping only the table in a ScrollArea with a fixed height */}
					<ScrollArea className="max-h-[715px] overflow-y-auto m-4">
						<table className="w-full border-collapse rounded-tl-3xl text-center">
							<thead className="bg-gray-200 sticky top-0 z-10">
								<tr>
									<th className="p-3 text-left">Full Name</th>
									<th className="p-3">Unit Number</th>
									<th className="p-3">Unit Status</th>
									<th className="p-3">Resident Status</th>
									<th className="p-3">Phone Number</th>
									<th className="p-3">Member</th>
									<th className="p-3">Vehicle</th>
									<th className="p-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{residents.map((resident, index) => (
									<tr key={index} className="border-b">
										<td className="p-3 text-left">
											<div className="flex items-center">
												<img
													src={getResidentImage(
														resident.residentStatus,
														resident.action
													)}
													alt={resident.fullName}
													className="w-8 h-8 rounded-full mr-2"
												/>
												{resident.fullName}
											</div>
										</td>
										<td className="p-3">
											{resident.unitWing}{" "}
											{resident.unitNumber}
										</td>
										<td className="p-3">
											{resident.unitStatus}
										</td>
										<td className="p-3">
											<span
												className="p-1 ps-7 pe-7 rounded-full"
												style={{
													backgroundColor:
														getBackgroundColor(
															resident.residentStatus
														),
												}}
											>
												{resident.residentStatus}
											</span>
										</td>
										<td className="p-3">
											{resident.phoneNumber}
										</td>
										<td className="p-3">
											{resident.member}
										</td>
										<td className="p-3">
											{resident.vehicle}
										</td>
										<td className="p-3 space-x-2">
											<Button variant="outline" size="sm">
												View
											</Button>
											<Button variant="outline" size="sm">
												Edit
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</ScrollArea>
				</CardContent>
			</Card>
		</Layout>
	);
}
