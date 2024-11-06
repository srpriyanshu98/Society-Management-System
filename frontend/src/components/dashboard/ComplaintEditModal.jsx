import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
		setEditedComplaint({ ...editedComplaint, [name]: value });
	};

	const handleRadioChange = (e) => {
		const { name, value } = e.target;
		setEditedComplaint({ ...editedComplaint, [name]: value });
	};

	const handleSave = () => {
		onSave(editedComplaint);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Complaint</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Input
						name="complainerName"
						value={editedComplaint.complainerName || ""}
						onChange={handleChange}
						placeholder="Complainer Name"
					/>
					<Input
						name="complaintName"
						value={editedComplaint.complaintName || ""}
						onChange={handleChange}
						placeholder="Complaint Name"
					/>
					<Input
						name="description"
						value={editedComplaint.description || ""}
						onChange={handleChange}
						placeholder="Description"
					/>
					<div className="flex space-x-4">
						<Input
							name="wing"
							value={editedComplaint.wing || ""}
							onChange={handleChange}
							placeholder="Wing"
						/>
						<Input
							name="unit"
							value={editedComplaint.unit || ""}
							onChange={handleChange}
							placeholder="Unit"
						/>
					</div>

					{/* Radio Group for Priority */}
					<div>
						<label className="block font-medium">Priority</label>
						<div className="flex space-x-4">
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
								<input
									type="radio"
									name="priority"
									value="High"
									checked={
										editedComplaint.priority === "High"
									}
									onChange={handleRadioChange}
									className="mr-2 radio-gradient"
								/>
								<span className="text-gray-500">High</span>
							</label>
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
								<input
									type="radio"
									name="priority"
									value="Medium"
									checked={
										editedComplaint.priority === "Medium"
									}
									onChange={handleRadioChange}
									className="mr-2 radio-gradient"
								/>
								<span className="text-gray-500">Medium</span>
							</label>
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
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
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
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
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
								<input
									type="radio"
									name="status"
									value="Pending"
									checked={
										editedComplaint.status === "Pending"
									}
									onChange={handleRadioChange}
									className="mr-2 radio-gradient"
								/>
								<span className="text-gray-500">Pending</span>
							</label>
							<label className="flex items-center p-2 border rounded-md cursor-pointer">
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
				</div>
				<div className="mt-4 flex justify-between space-x-2">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className="bg-gradient-to-l from-orange-400 to-orange-600"
					>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
