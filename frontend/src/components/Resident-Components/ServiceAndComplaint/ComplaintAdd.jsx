import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function ComplaintAdd({ isOpen, onClose, onSave }) {
	const [newComplaint, setNewComplaint] = useState({
		complainerName: "",
		complaintName: "",
		description: "",
		wing: "",
		unit: "",
		priority: "medium",
		status: "open",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "wing") {
			if (/^[a-zA-Z]$/.test(value) || value === "") {
				setNewComplaint({
					...newComplaint,
					[name]: value.toUpperCase(),
				});
			}
		} else if (name === "unit") {
			if (/^\d{0,4}$/.test(value)) {
				setNewComplaint({ ...newComplaint, [name]: value });
			}
		} else {
			setNewComplaint({ ...newComplaint, [name]: value });
		}
	};

	const handleRadioChange = (e) => {
		const { name, value } = e.target;
		setNewComplaint({ ...newComplaint, [name]: value });
	};

	const handleSave = () => {
		onSave(newComplaint);
		clearForm();
		onClose();
	};

	const clearForm = () => {
		setNewComplaint({
			complainerName: "",
			complaintName: "",
			description: "",
			wing: "",
			unit: "",
			priority: "Medium",
			status: "Open",
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Complaint</DialogTitle>
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
								value={newComplaint.complainerName || ""}
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
								value={newComplaint.complaintName || ""}
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
								value={newComplaint.description || ""}
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
								value={newComplaint.wing || ""}
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
								value={newComplaint.unit || ""}
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
								checked={newComplaint.priority === "High"}
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
								checked={newComplaint.priority === "Medium"}
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
								checked={newComplaint.priority === "Low"}
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
								checked={newComplaint.status === "Open"}
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
								checked={newComplaint.status === "Pending"}
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
								checked={newComplaint.status === "Solve"}
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
						onClick={onClose}
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
