import { complaintsData } from "@/data/complaintsData ";
import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export default function ComplaintList() {
	const [complaints, setComplaints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState("All");

	const fetchComplaints = async () => {
		try {
			setIsLoading(true);
			// Simulating an API call with a delay
			const response = await new Promise((resolve) => {
				setTimeout(() => {
					resolve(complaintsData); // Resolve with dummy data
				});
			});
			setComplaints(response);
		} catch (error) {
			console.error("Error fetching complaints:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchComplaints();
	}, []);

	const filteredComplaints = complaints.filter((complaint) => {
		if (filter === "All") return true;
		return complaint.status === filter;
	});

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "High":
				return "text-red-500";
			case "Medium":
				return "text-yellow-500";
			case "Low":
				return "text-green-500";
			default:
				return "text-gray-500";
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Open":
				return "text-blue-500";
			case "Pending":
				return "text-orange-500";
			case "Solve":
				return "text-green-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<Card className="bg-white p-4 shadow-md rounded-xl max-w-md w-[450px]">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Complaint List</h2>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="border p-2 rounded-md text-sm w-[160px]">
						{filter}
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Open">Open</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="Solve">Solve</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<ScrollArea className="h-80">
				<div className="space-y-4">
					{isLoading ? (
						<Skeleton />
					) : filteredComplaints.length > 0 ? (
						filteredComplaints.map((complaint) => (
							<div
								key={complaint.id}
								className="flex justify-between items-center border-b pb-2"
							>
								<div className="flex items-center space-x-4">
									<div>
										<div className="font-semibold">
											{complaint.complainerName}
										</div>
										<div className="text-gray-500 text-sm">
											{complaint.complaintName}
										</div>
										<div className="text-gray-500 text-sm">
											{complaint.date}
										</div>
									</div>
								</div>
								<div className="flex flex-col items-end">
									<div
										className={`text-sm ${getPriorityColor(
											complaint.priority
										)}`}
									>
										{complaint.priority}
									</div>
									<div
										className={`text-sm ${getStatusColor(
											complaint.status
										)}`}
									>
										{complaint.status}
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-500 text-sm">
							No complaints found.
						</p>
					)}
				</div>
			</ScrollArea>
		</Card>
	);
}
