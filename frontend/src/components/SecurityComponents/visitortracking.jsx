import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import AddVisitorDetails from "./AddVisitorDetails";
import axiosInstance from "@/test/axiosInstance";
import moment from "moment";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function VisitorTracking() {
	const [Visitors, setVisitors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState("All");
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const fetchVisitors = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get("/visitors");
			setVisitors(response.data);
		} catch (error) {
			console.error("Error fetching Visitors:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchVisitors();
	}, []);

	const filteredVisitors = Visitors.filter((Visitor) => {
		switch (filter) {
			case "Week":
				return moment(Visitor.date).isSame(moment(), "week");
			case "Month":
				return moment(Visitor.date).isSame(moment(), "month");
			case "Year":
				return moment(Visitor.date).isSame(moment(), "year");
			default:
				return true;
		}
	});

	const handleAddVisitors = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleAddVisitor = async (visitor) => {
		try {
			console.log("Sending request payload:", visitor);
			const response = await axiosInstance.post("/visitors", visitor);
			setVisitors((prevVisitors) => [
				...prevVisitors,
				response.data.visitor,
			]);
			handleCloseDialog();
		} catch (error) {
			console.error("Error creating visitor entry:", error);
		}
	};

	return (
		<Card className="flex-1 p-6 bg-white h-full overflow-auto rounded-2xl">
			<CardHeader className="flex flex-row justify-between items-center p-0 font-poppins mb-3">
				<CardTitle>Visitor Tracking</CardTitle>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Filter</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setFilter("All")}>
							All
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilter("Week")}>
							Week
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilter("Month")}>
							Month
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilter("Year")}>
							Year
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button
					className="flex items-center space-x-2"
					onClick={handleAddVisitors}
				>
					<img src="./src/assets/add-square.svg" alt="" />
					<span>Add Visitor details</span>
				</Button>
			</CardHeader>

			<CardContent>
				<ScrollArea className="h-[730px] rounded-t-lg">
					<div>
						<table className="w-full text-left">
							<thead className="text-center text-gray-600">
								<tr className="bg-blue-50">
									<th className="p-3 text-left">
										Visitor Name
									</th>
									<th className="p-3">Phone Number</th>
									<th className="p-3">Date</th>
									<th className="p-3">Unit Number</th>
									<th className="p-3">Time</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{isLoading ? (
									<tr>
										<td colSpan="6" className="p-4">
											<Skeleton />
										</td>
									</tr>
								) : filteredVisitors.length > 0 ? (
									filteredVisitors.map((Visitor) => (
										<tr
											key={Visitor._id}
											className="border-b"
										>
											<td className="p-3 flex items-center space-x-3">
												<Avatar className="w-10 h-10">
													<AvatarImage
														src="https://github.com/shadcn.png"
														alt={
															Visitor.visitorName
														}
													/>
													<AvatarFallback>
														CN
													</AvatarFallback>
												</Avatar>
												<span className="font-semibold font-poppins">
													{Visitor.visitorName}
												</span>
											</td>
											<td className="p-3 text-gray-700 font-semibold font-poppins">
												{Visitor.Number}
											</td>
											<td className="p-3 text-gray-500">
												{Visitor.date}
											</td>
											<td className="p-3 text-gray-500">
												<span className="mr-3 bg-blue-50 p-2 rounded-full">
													<span className="font-semibold font-poppins text-blue-500">
														{Visitor.wing}
													</span>
												</span>
												{Visitor.unit}
											</td>
											<td className="p-3 text-gray-500">
												{moment(
													Visitor.time,
													"HH:mm"
												).format("hh:mm A")}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="6"
											className="p-4 text-gray-500 text-center font-semibold font-poppins"
										>
											No Visitor Tracking data found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>

			{/* AddVisitorDetails component */}
			<AddVisitorDetails
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				onAddVisitor={handleAddVisitor}
			/>
		</Card>
	);
}
