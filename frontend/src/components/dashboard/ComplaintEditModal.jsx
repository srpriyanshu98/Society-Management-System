import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ComplaintEditModal({
	isOpen,
	onClose,
	complaint,
	onSave,
}) {
	const [editedComplaint, setEditedComplaint] = useState({ ...complaint });

	useEffect(() => {
		setEditedComplaint({ ...complaint });
	}, [complaint]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "wing") {
			if (/^[a-zA-Z]$/.test(value) || value === "") {
				setEditedComplaint({
					...editedComplaint,
					[name]: value.toUpperCase(),
				});
			}
		} else if (name === "unit") {
			if (/^\d{0,4}$/.test(value)) {
				setEditedComplaint({ ...editedComplaint, [name]: value });
			}
		} else {
			setEditedComplaint({ ...editedComplaint, [name]: value });
		}
	};

	const handleRadioChange = (e) => {
		const { name, value } = e.target;
		setEditedComplaint({ ...editedComplaint, [name]: value });
	};

	const handleSave = () => {
		onSave(editedComplaint);
		resetForm();
		onClose();
	};

	const resetForm = () => {
		setEditedComplaint({
			complainerName: "",
			complaintName: "",
			description: "",
			wing: "",
			unit: "",
			priority: "Low",
			status: "Open",
		});
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				resetForm();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{complaint ? "Edit Complaint" : "Add Complaint"}
					</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Complainer Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="complainerName"
								value={editedComplaint.complainerName || ""}
								onChange={handleChange}
								placeholder="Complainer Name"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Complaint Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="complaintName"
								value={editedComplaint.complaintName || ""}
								onChange={handleChange}
								placeholder="Complaint Name"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Description
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="description"
								value={editedComplaint.description || ""}
								onChange={handleChange}
								placeholder="Description"
							/>
						</div>
					</div>
				</div>
				<div className="flex  space-x-4">
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Wing<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="wing"
								value={editedComplaint.wing || ""}
								onChange={handleChange}
								placeholder="Wing"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Unit<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="unit"
								type="number"
								value={editedComplaint.unit || ""}
								onChange={handleChange}
								placeholder="Unit"
							/>
						</div>
					</div>
				</div>

				{/* Radio Group for Priority */}
				<div>
					<label className="block font-medium">Priority</label>
					<div className="flex space-x-4">
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="priority"
								value="High"
								checked={editedComplaint.priority === "High"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">High</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="priority"
								value="Medium"
								checked={editedComplaint.priority === "Medium"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Medium</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="priority"
								value="Low"
								checked={editedComplaint.priority === "Low"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Low</span>
						</label>
					</div>
				</div>

				{/* Radio Group for Status */}
				<div>
					<label className="block font-medium">Status</label>
					<div className="flex space-x-4">
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="status"
								value="Open"
								checked={editedComplaint.status === "Open"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Open</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="status"
								value="Pending"
								checked={editedComplaint.status === "Pending"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Pending</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="status"
								value="Solve"
								checked={editedComplaint.status === "Solve"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Solve</span>
						</label>
					</div>
				</div>

				<div className="mt-4 flex justify-between">
					<Button
						variant="outline"
						onClick={() => {
							onClose();
							resetForm();
						}}
						className="w-32"
					>
						Cancel
					</Button>
					<Button onClick={handleSave} className="w-32">
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
