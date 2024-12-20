import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/test/axiosInstance";
import ComplaintViewModal from "../dashboard/ComplaintViewModal ";
import ConfirmationDialog from "../ConfirmationDialog ";
import ComplaintEditModal from "../dashboard/ComplaintEditModal";
import { getPriorityColor, getStatusColor } from "@/data/complaintsData";

export default function CreateComplaint() {
	const [complaints, setComplaints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const [complaintToDelete, setComplaintToDelete] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [complaintToEdit, setComplaintToEdit] = useState(null);
	const [refreshFlag, setRefreshFlag] = useState(false);

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
	}, [refreshFlag]);

	const handleViewComplaint = (complaint) => {
		setSelectedComplaint(complaint);
		setIsViewModalOpen(true);
	};

	const handleDeleteComplaint = (complaint) => {
		setComplaintToDelete(complaint);
		setIsConfirmationDialogOpen(true);
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
			setIsConfirmationDialogOpen(false);
			setComplaintToDelete(null);
			setRefreshFlag(!refreshFlag);
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

	const cancelDeleteComplaint = () => {
		setIsConfirmationDialogOpen(false);
		setComplaintToDelete(null);
	};

	const handleEditComplaint = (complaint) => {
		if (complaint) {
			setComplaintToEdit(complaint);
		} else {
			setComplaintToEdit(null);
		}
		setIsEditDialogOpen(true);
	};

	const saveEditedComplaint = async (editedComplaint) => {
		try {
			let response;
			if (editedComplaint._id) {
				response = await axiosInstance.put(
					`/complaints/${editedComplaint._id}`,
					editedComplaint
				);
			} else {
				response = await axiosInstance.post(
					"/complaints",
					editedComplaint
				);
			}
			console.log("Save Response:", response);
			setComplaints(
				complaints.map((c) =>
					c._id === editedComplaint._id ? response.data : c
				)
			);
			setIsEditDialogOpen(false);
			setComplaintToEdit(null);
			setRefreshFlag(!refreshFlag);
		} catch (error) {
			console.error("Error saving complaint:", error);
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
				<CardTitle>Create Complaint</CardTitle>
				<Button
					className="flex items-center space-x-2"
					onClick={() => handleEditComplaint(null)}
				>
					<span>Create Complaint</span>
				</Button>
			</CardHeader>
			<CardContent className="p-0">
				<ScrollArea className="max-h-[715px] overflow-y-auto m-4 custom-scrollbar">
					<div className="overflow-auto">
						<table className="w-full text-left border-collapse">
							<thead className="text-center text-gray-600">
								<tr className="bg-blue-50 font-semibold font-poppins">
									<th className="p-3 rounded-t-xl">
										Complainer Name
									</th>
									<th className="p-3">Complaint Name</th>
									<th className="p-3">Description</th>
									<th className="p-3">Unit Number</th>
									<th className="p-3">Priority</th>
									<th className="p-3">Complain Status</th>
									<th className="p-3 rounded-t-xl">Action</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{isLoading ? (
									<tr>
										<td colSpan="6" className="p-4">
											<Skeleton />
										</td>
									</tr>
								) : complaints.length > 0 ? (
									complaints.map((complaint) => (
										<tr
											key={complaint._id}
											className="border-b text-slate-600 font-medium font-poppins"
										>
											<td className="p-3 flex items-center space-x-3">
												<Avatar className="w-10 h-10">
													<AvatarImage
														src="https://github.com/shadcn.png"
														alt={
															complaint.complainerName
														}
													/>
													<AvatarFallback>
														CN
													</AvatarFallback>
												</Avatar>
												<span className="font-poppins">
													{complaint.complainerName}
												</span>
											</td>
											<td className="p-3 ">
												{complaint.complaintName}
											</td>
											<td className="text-start w-96">
												{complaint.description}
											</td>
											<td className="p-3">
												<span className="p-2 text-center bg-blue-200 rounded-full me-2">
													{complaint.wing}
												</span>{" "}
												{complaint.unit}
											</td>
											<td className="p-3">
												<span
													className={`px-2 py-1 rounded-full text-sm font-thin block text-white ${getPriorityColor(
														complaint.priority
													)}`}
												>
													{complaint.priority}
												</span>
											</td>
											<td className="p-3">
												<p
													className={`px-2 py-1 rounded-full text-sm font-thin  ${getStatusColor(
														complaint.status
													)}`}
												>
													{complaint.status}
												</p>
											</td>
											<td className="flex justify-center space-x-4">
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleEditComplaint(
															complaint
														)
													}
												>
													<img
														src="/assets/edit.svg"
														alt=""
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleViewComplaint(
															complaint
														)
													}
												>
													<img
														src="/assets/view.svg"
														alt=""
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleDeleteComplaint(
															complaint
														)
													}
												>
													<img
														src="/assets/delete.svg"
														alt=""
													/>
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="6"
											className="p-4 text-gray-500 text-center"
										>
											No complaints found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>
			{/* View Complaint Modal */}
			<ComplaintViewModal
				isOpen={isViewModalOpen}
				onClose={() => setIsViewModalOpen(false)}
				complaint={selectedComplaint}
			/>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={isConfirmationDialogOpen}
				title="Confirm Deletion"
				description="Are you sure you want to delete this complaint?"
				onConfirm={confirmDeleteComplaint}
				onCancel={cancelDeleteComplaint}
			/>

			{/* Edit Dialog */}
			<ComplaintEditModal
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				complaint={complaintToEdit}
				onSave={saveEditedComplaint}
			/>
		</Card>
	);
}
