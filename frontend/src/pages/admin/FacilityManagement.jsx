import { useState, useEffect } from "react";
import AddAndEditFacility from "@/components/FacilityManagement/AddAndEditFacility";
import FacilityView from "@/components/FacilityManagement/FacilityView";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import axiosInstance from "@/test/axiosInstance"; // Import your axios instance
import ConfirmationDialog from "@/components/ConfirmationDialog ";
import moment from "moment"; // Import moment.js

export default function FacilityManagement({ userRole }) {
	const [dropdownOpenId, setDropdownOpenId] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [editingFacility, setEditingFacility] = useState(null);
	const [viewingFacility, setViewingFacility] = useState(null);
	const [facilities, setFacilities] = useState([]);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [facilityToDelete, setFacilityToDelete] = useState(null);

	useEffect(() => {
		fetchFacilities();
	}, []);

	const fetchFacilities = async () => {
		try {
			console.log("Fetching facilities from API");
			const response = await axiosInstance.get("/facilities");
			console.log("Facilities fetched:", response.data);
			setFacilities(response.data);
		} catch (error) {
			console.error("Error fetching facilities:", error);
		}
	};

	const toggleDropdown = (id) => {
		setDropdownOpenId((prevId) => (prevId === id ? null : id));
	};

	const handleOpenDialog = (facility = null) => {
		if (facility) {
			// Ensure the facility object has an id field
			setEditingFacility({ ...facility, id: facility._id });
		} else {
			setEditingFacility(null);
		}
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setEditingFacility(null);
		setIsDialogOpen(false);
	};

	const handleSaveFacility = async (facilityData) => {
		try {
			const formattedFacilityData = {
				...facilityData,
				scheduleServiceDate: moment(facilityData.serviceDate).format(
					"YYYY-MM-DD"
				),
				remindBefore:
					typeof facilityData.remindBefore === "string"
						? parseInt(facilityData.remindBefore.split(" ")[0])
						: facilityData.remindBefore,
			};

			console.log("Sending data to API:", formattedFacilityData);

			if (editingFacility) {
				console.log("Updating facility with ID:", editingFacility.id);
				const response = await axiosInstance.put(
					`/facilities/${editingFacility.id}`,
					formattedFacilityData
				);
				console.log("Update response:", response.data);
			} else {
				console.log("Creating new facility");
				const response = await axiosInstance.post(
					"/facilities",
					formattedFacilityData
				);
				console.log("Create response:", response.data);
			}

			fetchFacilities();
			handleCloseDialog();
		} catch (error) {
			console.error("Error saving facility:", error);
		}
	};
	const handleViewFacility = (facility) => {
		setViewingFacility(facility);
		setIsViewOpen(true);
	};

	const handleCloseView = () => {
		setViewingFacility(null);
		setIsViewOpen(false);
	};

	const confirmDeleteFacility = (id) => {
		setFacilityToDelete(id);
		setShowDeleteConfirmation(true);
	};

	const handleConfirmDelete = async () => {
		try {
			console.log("Deleting facility with ID:", facilityToDelete);
			const response = await axiosInstance.delete(
				`/facilities/${facilityToDelete}`
			);
			console.log("Delete response:", response.data);
			fetchFacilities();
			setShowDeleteConfirmation(false);
			setFacilityToDelete(null);
		} catch (error) {
			console.error("Error deleting facility:", error);
		}
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirmation(false);
		setFacilityToDelete(null);
	};

	return (
		<Layout userRole={userRole}>
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle className="text-lg font-semibold">
						Facility Management
					</CardTitle>
					<Button
						onClick={() => handleOpenDialog()}
						className="bg-blue-500 text-white"
					>
						Add New Facility
					</Button>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-4 gap-4">
						{facilities.map((item) => (
							<Card
								key={item._id}
								className="border shadow-lg rounded-xl border-blue-200 pb-8"
							>
								<CardHeader className="relative bg-blue-500 text-white p-4 rounded-t-lg">
									<h3 className="text-lg font-semibold">
										{item.facilityName}
									</h3>
									<div className="absolute top-3 right-3">
										<DropdownMenu
											open={dropdownOpenId === item._id}
											onOpenChange={() =>
												toggleDropdown(item._id)
											}
										>
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
														handleOpenDialog(item)
													}
												>
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														handleViewFacility(item)
													}
												>
													View
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() =>
														confirmDeleteFacility(
															item._id
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
											Upcoming Schedule Service :
										</span>
										<span className="float-right">
											{moment(item.serviceDate).format(
												"MM/DD/YYYY"
											)}
										</span>
									</p>
									<p>
										<span className="inline-block text-slate-600 mb-2">
											Description :
										</span>
										<span className="float-right">
											{item.description}
										</span>
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
			{isDialogOpen && (
				<AddAndEditFacility
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					onSave={handleSaveFacility}
					mode={editingFacility ? "edit" : "add"}
					facility={editingFacility}
				/>
			)}
			{isViewOpen && (
				<FacilityView
					facility={viewingFacility}
					isOpen={isViewOpen}
					onClose={handleCloseView}
				/>
			)}
			{showDeleteConfirmation && (
				<ConfirmationDialog
					isOpen={showDeleteConfirmation}
					title="Delete Facility"
					description="Are you sure you want to delete this facility? This action cannot be undone."
					onConfirm={handleConfirmDelete}
					onCancel={handleCancelDelete}
				/>
			)}
		</Layout>
	);
}
