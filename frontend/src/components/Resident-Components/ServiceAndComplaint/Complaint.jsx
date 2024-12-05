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
import ConfirmationDialog from "@/components/ConfirmationDialog ";
import ComplaintAdd from "./ComplaintAdd";

export default function Complaint() {
	const [complaints, setComplaints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [complaintToDelete, setComplaintToDelete] = useState(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	const fetchComplaints = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get("/complaints");
			setComplaints(response.data);
		} catch (error) {
			console.error("Error fetching complaints:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchComplaints();
	}, []);

	const handleDeleteComplaint = (complaint) => {
		setComplaintToDelete(complaint);
		setIsDeleteDialogOpen(true);
	};

	const confirmDeleteComplaint = async () => {
		if (!complaintToDelete || !complaintToDelete._id) {
			console.error(
				"Invalid complaintToDelete object:",
				complaintToDelete
			);
			return;
		}

		try {
			const response = await axiosInstance.delete(
				`/complaints/${complaintToDelete._id}`
			);
			console.log("Delete Response:", response);
			setComplaints(
				complaints.filter((c) => c._id !== complaintToDelete._id)
			);
			setIsDeleteDialogOpen(false);
			setComplaintToDelete(null);
		} catch (error) {
			console.error("Error deleting complaint:", error);
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

	const handleAddComplaint = async (newComplaint) => {
		try {
			const response = await axiosInstance.post(
				"/complaints",
				newComplaint
			);
			console.log("Add Response:", response);
			await fetchComplaints();
			setIsAddModalOpen(false);
		} catch (error) {
			console.error("Error adding complaint:", error);
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
			<CardHeader className="flex flex-row justify-between items-center p-3 ml-4 md:ml-0 md:p-6">
				<CardTitle className="text-lg font-semibold">Complaint</CardTitle>
				<Button
					onClick={() => setIsAddModalOpen(true)}
					className="bg-blue-500 text-white text-sm md:text-md w-36"
				>
					Create Complaint
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{isLoading ? (
						<p>Loading...</p>
					) : (
						complaints.map((item) => (
							<Card
								key={item._id}
								className="border shadow-lg rounded-xl border-blue-200 pb-4 md:pb-8"
							>
								<CardHeader className="relative bg-blue-500 text-white p-2 rounded-t-lg md:p-4">
									<h3 className="text-lg font-semibold">
										{item.complaintName}
									</h3>
									<div className="absolute top-0 md:top-3 right-3">
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
														handleDeleteComplaint(item)
													}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</CardHeader>
								<CardContent className="p-4 space-y-3 text-sm md:text-[16px]">
									<p>
										<span className="inline-block text-slate-600">
											Status{" "}
										</span>
										<span
											className={`float-right px-4 py-2 rounded-full text-sm font-thin ${item.status === "Open"
													? "bg-blue-100 text-blue-600"
													: item.status === "Pending"
														? "bg-yellow-100 text-yellow-600"
														: item.status === "Solve"
															? "bg-green-100 text-green-600"
															: "bg-gray-100 text-gray-600"
												}`}
										>
											{item.status}
										</span>
									</p>
									<p className="text-slate-600 mb-2">Description</p>
									<p>{item.description}</p>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</CardContent>
			<ConfirmationDialog
				isOpen={isDeleteDialogOpen}
				title="Delete Complaint"
				description="Are you sure you want to delete this complaint?"
				onConfirm={confirmDeleteComplaint}
				onCancel={() => setIsDeleteDialogOpen(false)}
			/>
			{/* ComplaintAdd Modal */}
			<ComplaintAdd
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
				onSave={handleAddComplaint}
			/>
		</Card>

	);
}
