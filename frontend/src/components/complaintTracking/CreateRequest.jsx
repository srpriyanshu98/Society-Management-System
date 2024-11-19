import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/test/axiosInstance";
import RequestViewModal from "./RequestViewModal";
import ConfirmationDialog from "../ConfirmationDialog ";
import RequestAddAndEdit from "./RequestAddAndEdit";
import { getPriorityColor, getStatusColor } from "@/data/requestData";

export default function CreateRequest() {
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const [requestToDelete, setRequestToDelete] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [requestToEdit, setRequestToEdit] = useState(null);
	const [refreshFlag, setRefreshFlag] = useState(false);

	const fetchRequests = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get("/requests");
			const sortedRequests = response.data.sort(
				(a, b) => new Date(b.requestDate) - new Date(a.requestDate)
			);
			setRequests(sortedRequests);
		} catch (error) {
			console.error("Error fetching requests:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, [refreshFlag]);

	const handleViewRequest = (request) => {
		setSelectedRequest(request);
		setIsViewModalOpen(true);
	};

	const handleDeleteRequest = (request) => {
		setRequestToDelete(request);
		setIsConfirmationDialogOpen(true);
	};

	const confirmDeleteRequest = async () => {
		try {
			await axiosInstance.delete(`/requests/${requestToDelete._id}`);
			const updatedRequests = requests.filter(
				(r) => r._id !== requestToDelete._id
			);
			setRequests(updatedRequests);
			setIsConfirmationDialogOpen(false);
			setRequestToDelete(null);
			// setRefreshFlag(!refreshFlag);
		} catch (error) {
			console.error("Error deleting request:", error);
		}
	};

	const cancelDeleteRequest = () => {
		setIsConfirmationDialogOpen(false);
		setRequestToDelete(null);
	};

	const handleEditRequest = (request) => {
		if (request) {
			setRequestToEdit(request);
		} else {
			setRequestToEdit(null);
		}
		setIsEditDialogOpen(true);
	};

	const saveEditedRequest = async (editedRequest) => {
		try {
			let response;
			if (editedRequest._id) {
				response = await axiosInstance.put(
					`/requests/${editedRequest._id}`,
					editedRequest
				);
				const updatedRequests = requests.map((r) =>
					r._id === response.data._id ? response.data : r
				);
				setRequests(updatedRequests);
			} else {
				response = await axiosInstance.post("/requests", editedRequest);
				const updatedRequests = [...requests, response.data].sort(
					(a, b) => new Date(b.requestDate) - new Date(a.requestDate)
				);
				setRequests(updatedRequests);
			}
			setIsEditDialogOpen(false);
			setRequestToEdit(null);
			setRefreshFlag(!refreshFlag);
		} catch (error) {
			console.error("Error saving request:", error);
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
				<CardTitle>Request Complaint</CardTitle>
				<Button
					className="flex items-center space-x-2"
					onClick={() => handleEditRequest(null)}
				>
					<span>Create Request</span>
				</Button>
			</CardHeader>
			<CardContent className="p-0">
				<ScrollArea className="max-h-[715px] overflow-y-auto m-4 custom-scrollbar">
					<div className="overflow-auto">
						<table className="w-full text-left border-collapse">
							<thead className="text-center text-gray-600">
								<tr className="bg-blue-50 font-semibold font-poppins">
									<th className="p-3 rounded-t-xl">
										Requester Name
									</th>
									<th className="p-3">Request Name</th>
									<th className="p-3">Description</th>
									<th className="p-3">Request Date</th>
									<th className="p-3">Unit Number</th>
									<th className="p-3">Priority</th>
									<th className="p-3">Request Status</th>
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
								) : requests.length > 0 ? (
									requests.map((request) => (
										<tr
											key={request._id}
											className="border-b text-slate-600 font-medium font-poppins"
										>
											<td className="p-3 flex items-center space-x-3">
												<Avatar className="w-10 h-10">
													<AvatarImage
														src="https://github.com/shadcn.png"
														alt={
															request.requesterName
														}
													/>
													<AvatarFallback>
														CN
													</AvatarFallback>
												</Avatar>
												<span className="font-poppins">
													{request.requesterName}
												</span>
											</td>
											<td className="p-3 text-start">
												{request.requestName}
											</td>
											<td className="text-start w-96">
												{request.requestDescp}
											</td>
											<td>{request.requestDate}</td>
											<td className="p-3">
												<span className="p-2 text-center bg-blue-200 rounded-full me-2">
													{request.wing}
												</span>{" "}
												{request.unit}
											</td>
											<td className="p-3">
												<span
													className={`px-2 py-1 rounded-full text-sm font-thin block text-white ${getPriorityColor(
														request.priority
													)}`}
												>
													{request.priority}
												</span>
											</td>
											<td className="p-3">
												<p
													className={`px-2 py-1 rounded-full text-sm font-thin  ${getStatusColor(
														request.status
													)}`}
												>
													{request.status}
												</p>
											</td>
											<td className="flex justify-center space-x-4">
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleEditRequest(
															request
														)
													}
												>
													<img
														src="./src/assets/edit.svg"
														alt=""
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleViewRequest(
															request
														)
													}
												>
													<img
														src="./src/assets/view.svg"
														alt=""
													/>
												</button>
												<button
													className="rounded-md bg-gray-100 p-2"
													onClick={() =>
														handleDeleteRequest(
															request
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
											className="p-4 text-gray-500 text-center"
										>
											No requests found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</ScrollArea>
			</CardContent>

			{/* View Request Modal */}
			<RequestViewModal
				isOpen={isViewModalOpen}
				onClose={() => setIsViewModalOpen(false)}
				request={selectedRequest}
			/>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={isConfirmationDialogOpen}
				title="Confirm Deletion"
				description="Are you sure you want to delete this Request?"
				onConfirm={confirmDeleteRequest}
				onCancel={cancelDeleteRequest}
			/>

			{/* Edit Dialog */}
			<RequestAddAndEdit
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				request={requestToEdit}
				onSave={saveEditedRequest}
			/>
		</Card>
	);
}
