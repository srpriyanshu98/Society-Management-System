import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import axiosInstance from "@/test/axiosInstance";
import moment from "moment";
import ConfirmationDialog from "@/components/ConfirmationDialog ";
import RequestAdd from "../RequestAdd";

export default function Request() {
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [requestToDelete, setRequestToDelete] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const fetchRequests = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get("/requests");
			setRequests(response.data);
		} catch (error) {
			console.error("Error fetching requests:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	const handleDeleteRequest = (request) => {
		setRequestToDelete(request);
		setIsDeleteDialogOpen(true);
	};

	const confirmDeleteRequest = async () => {
		if (!requestToDelete || !requestToDelete._id) {
			console.error("Invalid requestToDelete object:", requestToDelete);
			return;
		}

		try {
			const response = await axiosInstance.delete(
				`/requests/${requestToDelete._id}`
			);
			console.log("Delete Response:", response);
			setRequests(requests.filter((r) => r._id !== requestToDelete._id));
			setIsDeleteDialogOpen(false);
			setRequestToDelete(null);
		} catch (error) {
			console.error("Error deleting request:", error);
			if (error.response) {
				console.error("Server responded with:", error.response.status);
				console.error("Response data:", error.response.data);
			} else if (error.request) {
				console.error("No response received:", error.request);
			} else {
				console.error("Error setting up the request:", error.message);
			}
		}
	};

	const handleAddRequest = async (newRequest) => {
		try {
			const response = await axiosInstance.post("/requests", newRequest);
			console.log("Add Response:", response);
			await fetchRequests();
			setIsAddModalOpen(false);
		} catch (error) {
			console.error("Error adding request:", error);
			if (error.response) {
				console.error("Server responded with:", error.response.status);
				console.error("Response data:", error.response.data);
			} else if (error.request) {
				console.error("No response received:", error.request);
			} else {
				console.error("Error setting up the request:", error.message);
			}
		}
	};

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<CardTitle className="text-lg font-semibold">Request</CardTitle>
				<Button
					onClick={() => setIsAddModalOpen(true)}
					className="bg-blue-500 text-white"
				>
					Create Request
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-4">
					{isLoading ? (
						<p>Loading...</p>
					) : (
						requests.map((item) => (
							<Card
								key={item._id}
								className="border shadow-lg rounded-xl border-blue-200 pb-8"
							>
								<CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
									<h3 className="text-lg font-semibold">
										{item.requestName}
									</h3>
									<div className="absolute top-3 right-3">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="text-white"
												>
													<MoreVertical />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="bg-white border rounded shadow-md">
												<DropdownMenuItem
													onClick={() =>
														handleDeleteRequest(
															item
														)
													}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</CardHeader>
								<CardContent className="p-4 space-y-3">
									<p>
										<span className="inline-block text-slate-600">
											Request Date{" "}
										</span>
										<span className="float-right">
											{moment(item.requestDate).format(
												"MM/DD/YYYY"
											)}
										</span>
									</p>
									<p>
										<span className="inline-block text-slate-600">
											Status{" "}
										</span>
										<span
											className={`float-right px-4 py-2 rounded-full text-sm font-thin ${
												item.status === "open"
													? "bg-blue-100 text-blue-600"
													: item.status === "pending"
													? "bg-yellow-100 text-yellow-600"
													: item.status === "solve"
													? "bg-green-100 text-green-600"
													: "bg-gray-100 text-gray-600"
											}`}
										>
											{item.status}
										</span>
									</p>
									<p className="text-slate-600 mb-2">
										Description
									</p>
									<p>{item.requestDescp}</p>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</CardContent>
			<ConfirmationDialog
				isOpen={isDeleteDialogOpen}
				title="Delete Request"
				description="Are you sure you want to delete this request?"
				onConfirm={confirmDeleteRequest}
				onCancel={() => setIsDeleteDialogOpen(false)}
			/>
			{/* RequestAdd Modal */}
			<RequestAdd
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSave={handleAddRequest}
			/>
		</Card>
	);
}
