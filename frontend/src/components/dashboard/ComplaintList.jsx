import { getPriorityColor, getStatusColor } from "@/data/complaintsData";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import ConfirmationDialog from "../ConfirmationDialog ";
import ComplaintViewModal from "./ComplaintViewModal ";
import ComplaintEditModal from "./ComplaintEditModal";
import axiosInstance from "@/test/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";

export default function ComplaintList() {
	const [complaints, setComplaints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState("All");
	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const [complaintToDelete, setComplaintToDelete] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [complaintToEdit, setComplaintToEdit] = useState(null);

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

	const filteredComplaints = complaints.filter((complaint) => {
		if (filter === "All") return true;
		return complaint.status === filter;
	});

	const handleViewComplaint = (complaint) => {
		setSelectedComplaint(complaint);
		setIsViewModalOpen(true);
	};

	const handleDeleteComplaint = (complaint) => {
		setComplaintToDelete(complaint);
		setIsConfirmationDialogOpen(true);
	};

	const confirmDeleteComplaint = async () => {
		try {
			await axiosInstance.delete(`/complaints/${complaintToDelete._id}`);
			setComplaints(
				complaints.filter((c) => c._id !== complaintToDelete._id)
			);
		} catch (error) {
			console.error("Error deleting complaint:", error);
		} finally {
			setIsConfirmationDialogOpen(false);
			setComplaintToDelete(null);
		}
	};

	const cancelDeleteComplaint = () => {
		setIsConfirmationDialogOpen(false);
		setComplaintToDelete(null);
	};

	const handleEditComplaint = (complaint) => {
		setComplaintToEdit(complaint);
		setIsEditDialogOpen(true);
	};

	const saveEditedComplaint = async (editedComplaint) => {
		try {
			const response = await axiosInstance.put(
				`/complaints/${editedComplaint._id}`,
				editedComplaint
			);
			setComplaints(
				complaints.map((c) =>
					c._id === editedComplaint._id ? response.data : c
				)
			);
		} catch (error) {
			console.error("Error updating complaint:", error);
		} finally {
			setIsEditDialogOpen(false);
			setComplaintToEdit(null);
		}
	};

	return (
		<Card className="bg-white p-4 shadow-md rounded-xl w-full">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-[20px] font-semibold font-poppins leading-[30px] text-left decoration-slice">
					Complaint List
				</h2>
				<Select value={filter} onValueChange={setFilter}>
					<SelectTrigger className="border p-2 rounded-md text-sm w-[160px]">
						{filter}
					</SelectTrigger>
					<SelectContent className="font-semibold font-poppins">
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Open">Open</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="Solve">Solve</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<ScrollArea className="h-80">
				<div className="overflow-auto">
					<table className="w-full text-left border-collapse">
						<thead className="text-center text-gray-600">
							<tr className="bg-blue-50 font-semibold font-poppins">
								<th className="p-3">Complainer Name</th>
								<th className="p-3">Complaint Name</th>
								<th className="p-3">Date</th>
								<th className="p-3">Priority</th>
								<th className="p-3">Complain Status</th>
								<th className="p-3">Action</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{isLoading ? (
								<tr>
									<td colSpan="6" className="p-4">
										<Skeleton />
									</td>
								</tr>
							) : filteredComplaints.length > 0 ? (
								filteredComplaints.map((complaint) => (
									<tr key={complaint.id} className="border-b">
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
											<span className="font-semibold font-poppins">
												{complaint.complainerName}
											</span>
										</td>
										<td className="p-3 text-gray-700 font-semibold font-poppins">
											{complaint.complaintName}
										</td>
										<td className="p-3 text-gray-500">
											{moment(complaint.date).format(
												"DD/MM/YYYY"
											)}
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
												className="rounded-md bg-gray-100 p-2 font-semibold font-poppins"
												onClick={() =>
													handleEditComplaint(
														complaint
													)
												}
											>
												<img
													src="./src/assets/edit.svg"
													alt=""
												/>
											</button>
											<button
												className="rounded-md bg-gray-100 p-2 font-semibold font-poppins"
												onClick={() =>
													handleViewComplaint(
														complaint
													)
												}
											>
												<img
													src="./src/assets/view.svg"
													alt=""
												/>
											</button>
											<button
												className="rounded-md bg-gray-100 p-2 font-semibold font-poppins"
												onClick={() =>
													handleDeleteComplaint(
														complaint
													)
												}
											>
												<img
													src="./src/assets/delete.svg"
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
										className="p-4 text-gray-500 text-center font-semibold font-poppins"
									>
										No complaints found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</ScrollArea>

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
