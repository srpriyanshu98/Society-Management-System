import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import AddSecurityForm from "@/components/SecurityGuard/AddSecurityForm";
import GuardViewModal from "@/components/SecurityGuard/GuardViewModal";
import { format } from "date-fns";
import {
	createGuard,
	deleteGuard,
	fetchGuards,
	updateGuard,
} from "@/components/services/securityService";
import ConfirmationDialog from "@/components/ConfirmationDialog ";

export default function SecurityGuard({ userRole }) {
	const [isLoading, setIsLoading] = useState(true);
	const [guards, setGuards] = useState([]);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const [guardToDelete, setGuardToDelete] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editGuard, setEditGuard] = useState(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [guardToView, setGuardToView] = useState(null);

	const fetchGuardsData = async () => {
		try {
			setIsLoading(true);
			const response = await fetchGuards();
			setGuards(response);
		} catch (error) {
			console.error("Error fetching security guards:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGuardsData();
	}, []);

	const handleDeleteSecurity = (guard) => {
		setGuardToDelete(guard);
		setIsConfirmationDialogOpen(true);
	};

	const confirmDeleteSecurity = async () => {
		try {
			await deleteGuard(guardToDelete._id);
			const updatedGuards = guards.filter(
				(g) => g._id !== guardToDelete._id
			);
			setGuards(updatedGuards);
		} catch (error) {
			console.error("Error deleting security guard:", error);
		} finally {
			setIsConfirmationDialogOpen(false);
			setGuardToDelete(null);
		}
	};

	const cancelDeleteSecurity = () => {
		setIsConfirmationDialogOpen(false);
		setGuardToDelete(null);
	};

	const handleAddSecurity = () => {
		setEditGuard(null);
		setIsDialogOpen(true);
	};

	const handleEditSecurity = (guard) => {
		setEditGuard(guard);
		setIsDialogOpen(true);
	};

	const saveNewGuard = async (guard) => {
		try {
			console.log("Form Data to be sent:", guard);
			if (editGuard) {
				await updateGuard(editGuard._id, guard);
			} else {
				await createGuard(guard);
			}
			fetchGuardsData();
			setIsDialogOpen(false);
			setEditGuard(null);
		} catch (error) {
			console.error("Error saving security guard:", error);
		}
	};

	const handleViewSecurity = (guard) => {
		setGuardToView(guard);
		setIsViewModalOpen(true);
	};

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Security Guard Details</CardTitle>
					<Button
						className="flex items-center space-x-2"
						onClick={handleAddSecurity}
					>
						<img src="/assets/add-square.svg" alt="Add" />
						<span>Add Security</span>
					</Button>
				</CardHeader>
				<CardContent>
					<ScrollArea className="max-h-[715px] overflow-y-auto custom-scrollbar">
						<div>
							<table className="w-full text-left border-collapse">
								<thead className="text-center text-gray-700">
									<tr className="bg-blue-50 font-semibold font-poppins">
										<th className="p-3 rounded-tl-xl text-start">
											Security Guard Name
										</th>
										<th className="p-3">Phone Number</th>
										<th className="p-3">Select Shift</th>
										<th className="p-3">Shift Date</th>
										<th className="p-3">Shift Time</th>
										<th className="p-3">Gender</th>
										<th className="p-3 rounded-tr-xl">
											Action
										</th>
									</tr>
								</thead>
								<tbody className="text-center text-gray-600 font-poppins">
									{isLoading ? (
										<tr>
											<td
												colSpan="7"
												className="p-4 text-center"
											>
												Loading...
											</td>
										</tr>
									) : guards.length > 0 ? (
										guards.map((guard) => {
											const shiftDate = new Date(
												guard.shiftDate
											);
											const shiftTime = new Date(
												`1970-01-01T${guard.shiftTime}`
											);
											return (
												<>
													<tr key={guard.id}>
														<td className="flex items-center space-x-2 p-3">
															<Avatar className="w-10 h-10 me-3">
																<AvatarImage
																	src="https://github.com/shadcn.png"
																	alt={
																		guard.fullName
																	}
																/>
																<AvatarFallback>
																	CN
																</AvatarFallback>
															</Avatar>
															<span>
																{guard.fullName}
															</span>
														</td>
														<td className="p-3">
															{guard.phoneNumber}
														</td>
														<td className="p-3">
															<span
																className={`inline-flex items-center py-1 px-3 rounded-full font-semibold ${
																	guard.shift ===
																	"Day"
																		? "bg-gray-200 text-orange-400"
																		: "bg-gray-600 text-white"
																}`}
															>
																<img
																	src={
																		guard.shift ===
																		"Day"
																			? "/assets/Day.svg"
																			: "/assets/Night.svg"
																	}
																	alt={`${guard.shift} Icon`}
																	className="w-4 h-4 mr-2"
																/>
																{guard.shift}
															</span>
														</td>
														<td className="p-3">
															{shiftDate instanceof
																Date &&
															!isNaN(shiftDate)
																? format(
																		shiftDate,
																		"MM/dd/yyyy"
																  )
																: "Invalid Date"}
														</td>
														<td className="p-3">
															{shiftTime instanceof
																Date &&
															!isNaN(shiftTime)
																? shiftTime.toLocaleTimeString(
																		[],
																		{
																			hour: "2-digit",
																			minute: "2-digit",
																			hour12: true,
																		}
																  )
																: "Invalid Time"}
														</td>
														<td className="p-3">
															<span
																className={`inline-flex items-center py-1 px-3 rounded-full font-semibold ${
																	guard.gender ===
																	"Male"
																		? "bg-blue-100 text-blue-600"
																		: "bg-pink-100 text-pink-600"
																}`}
															>
																<img
																	src={
																		guard.gender ===
																		"Male"
																			? "/assets/male.svg"
																			: "/assets/female.svg"
																	}
																	className="w-5 h-5 mr-2"
																	alt={`${guard.gender} Icon`}
																/>
																{guard.gender}
															</span>
														</td>
														<td className="flex justify-center space-x-4 p-3">
															<button
																className="rounded-md bg-gray-100 p-2"
																onClick={() =>
																	handleEditSecurity(
																		guard
																	)
																}
															>
																<img
																	src="/assets/edit.svg"
																	alt="Edit"
																/>
															</button>
															<button
																className="rounded-md bg-gray-100 p-2"
																onClick={() =>
																	handleViewSecurity(
																		guard
																	)
																}
															>
																<img
																	src="/assets/view.svg"
																	alt="View"
																/>
															</button>
															<button
																className="rounded-md bg-gray-100 p-2"
																onClick={() =>
																	handleDeleteSecurity(
																		guard
																	)
																}
															>
																<img
																	src="/assets/delete.svg"
																	alt="Delete"
																/>
															</button>
														</td>
													</tr>
													<tr>
														<td colSpan="7">
															<Separator />
														</td>
													</tr>
												</>
											);
										})
									) : (
										<tr>
											<td
												colSpan="7"
												className="p-4 text-gray-500 text-center"
											>
												No guards found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Add Security Form Dialog */}
			<AddSecurityForm
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSave={saveNewGuard}
				editData={editGuard}
			/>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={isConfirmationDialogOpen}
				title="Confirm Deletion"
				description="Are you sure you want to delete this guard?"
				onConfirm={confirmDeleteSecurity}
				onCancel={cancelDeleteSecurity}
			/>

			{/* View Security Guard Modal */}
			<GuardViewModal
				isOpen={isViewModalOpen}
				onClose={() => setIsViewModalOpen(false)}
				guard={guardToView}
			/>
		</Layout>
	);
}
