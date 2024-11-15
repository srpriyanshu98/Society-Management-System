import { useState } from "react";
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
import { facilityManagement as initialFacilities } from "@/data/facilityManagement";
import ConfirmationDialog from "@/components/ConfirmationDialog ";

export default function FacilityManagement({ userRole }) {
	const [dropdownOpenId, setDropdownOpenId] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [editingFacility, setEditingFacility] = useState(null);
	const [viewingFacility, setViewingFacility] = useState(null);
	const [facilities, setFacilities] = useState(initialFacilities);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation
	const [facilityToDelete, setFacilityToDelete] = useState(null); // Store facility ID for deletion

	const toggleDropdown = (id) => {
		setDropdownOpenId((prevId) => (prevId === id ? null : id));
	};

	const handleOpenDialog = (facility = null) => {
		setEditingFacility(facility);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setEditingFacility(null);
		setIsDialogOpen(false);
	};

	const handleSaveFacility = (facilityData) => {
		if (editingFacility) {
			setFacilities((prevFacilities) =>
				prevFacilities.map((facility) =>
					facility.id === editingFacility.id
						? { ...facility, ...facilityData }
						: facility
				)
			);
		} else {
			const newFacility = { ...facilityData, id: facilities.length + 1 };
			setFacilities((prevFacilities) => [...prevFacilities, newFacility]);
		}
		handleCloseDialog();
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

	const handleConfirmDelete = () => {
		setFacilities((prevFacilities) =>
			prevFacilities.filter(
				(facility) => facility.id !== facilityToDelete
			)
		);
		setShowDeleteConfirmation(false);
		setFacilityToDelete(null);
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
						Create Facility
					</Button>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-4 gap-4">
						{facilities.map((item) => (
							<Card
								key={item.id}
								className="border shadow-lg rounded-xl border-blue-200 pb-8"
							>
								<CardHeader className="relative bg-blue-500 text-white rounded-t-lg p-4">
									<h3 className="text-lg font-semibold">
										{item.facilityName}
									</h3>
									<div className="absolute top-3 right-3">
										<DropdownMenu
											open={dropdownOpenId === item.id}
											onOpenChange={() =>
												toggleDropdown(item.id)
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
															item.id
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
											{item.serviceDate}
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
