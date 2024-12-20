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
	const [editedComplaint, setEditedComplaint] = useState({
		...complaint,
		priority: "High",
		prioritys: "Open",
	});

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
		setEditedComplaint({
			...editedComplaint,
			priority: event.target.value,
			prioritys: event.targets.value,
		});
		setSelectedLabel(event.target.value, event.targets.value); // Update selected label on change
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

	const [selectedLabel, setSelectedLabel] = useState("High"); // Track selected label
	const [selectedLabels, setSelectedLabels] = useState("Open"); // Track selected label

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				onClose();
				resetForm();
			}}
		>
			<DialogContent className="w-[300px] md:w-full p-3 md:p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle className="text-start md:text-start">
						{complaint ? "Edit Complaint" : "Add Complaint"}
					</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins text-sm md:text-[16px]">
								Complainer Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="complainerName"
								value={editedComplaint.complainerName || ""}
								onChange={handleChange}
								placeholder="Complainer Name"
								className="w-64 md:w-full"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins text-sm md:text-[16px]">
								Complaint Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="complaintName"
								value={editedComplaint.complaintName || ""}
								onChange={handleChange}
								placeholder="Complaint Name"
								className="w-64 md:w-full"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins text-sm md:text-[16px]">
								Description
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="description"
								value={editedComplaint.description || ""}
								onChange={handleChange}
								placeholder="Description"
								className="w-64 md:w-full"
							/>
						</div>
					</div>
				</div>
				<div className="flex  space-x-4">
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins text-sm md:text-[16px]">
								Wing<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="wing"
								value={editedComplaint.wing || ""}
								onChange={handleChange}
								placeholder="Wing"
								className="w-28 md:w-full"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins text-sm md:text-[16px]">
								Unit<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="unit"
								type="number"
								value={editedComplaint.unit || ""}
								onChange={handleChange}
								placeholder="Unit"
								className="w-28 md:w-full"
							/>
						</div>
					</div>
				</div>

				{/* Radio Group for Priority */}
				<div>
					<label className="block font-medium text-sm md:text-[16px]">Priority</label>
					<div className="flex space-x-4">
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer  w-15 md:w-28 ${
								selectedLabel === "High"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabel("High")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="priority"
								value="High"
								checked={editedComplaint.priority === "High"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">High</span>
						</label>
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer  w-15 md:w-28 ${
								selectedLabel === "Medium"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabel("Medium")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="priority"
								value="Medium"
								checked={editedComplaint.priority === "Medium"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">Medium</span>
						</label>
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer w-15 md:w-28 ${
								selectedLabel === "Low"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabel("Low")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="priority"
								value="Low"
								checked={editedComplaint.priority === "Low"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">Low</span>
						</label>
					</div>
				</div>

				{/* Radio Group for Status */}
				<div>
					<label className="block font-medium text-sm md:text-[16px]">Status</label>
					<div className="flex space-x-4">
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer w-15 md:w-28 ${
								selectedLabels === "Open"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabels("Open")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="status"
								value="Open"
								checked={editedComplaint.status === "Open"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">Open</span>
						</label>
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer w-15 md:w-28 ${
								selectedLabels === "Pending"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabels("Pending")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="status"
								value="Pending"
								checked={editedComplaint.status === "Pending"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">Pending</span>
						</label>
						<label
							className={`flex items-center p-2 border rounded-md cursor-pointer w-15 md:w-28 ${
								selectedLabels === "Solve"
									? "border-solid border-coral"
									: ""
							}`}
							onClick={() => setSelectedLabels("Solve")} // Handle label click to set selection
						>
							<input
								type="radio"
								name="status"
								value="Solve"
								checked={editedComplaint.status === "Solve"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500 text-xs md:text-[16px]">Solve</span>
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
