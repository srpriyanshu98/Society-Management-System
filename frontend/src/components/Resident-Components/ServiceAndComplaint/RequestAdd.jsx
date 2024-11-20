import { useState } from "react";
import moment from "moment";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function RequestAdd({ isOpen, onClose, onSave }) {
	const [newRequest, setNewRequest] = useState({
		requesterName: "",
		requestName: "",
		requestDescp: "",
		requestDate: new Date(),
		wing: "",
		unit: "",
		priority: "medium",
		status: "open",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "wing") {
			if (/^[a-zA-Z]$/.test(value) || value === "") {
				setNewRequest({
					...newRequest,
					[name]: value.toUpperCase(),
				});
			}
		} else if (name === "unit") {
			if (/^\d{0,4}$/.test(value)) {
				setNewRequest({ ...newRequest, [name]: value });
			}
		} else {
			setNewRequest({ ...newRequest, [name]: value });
		}
	};

	const handleRadioChange = (e) => {
		const { name, value } = e.target;
		setNewRequest({ ...newRequest, [name]: value });
	};

	const handleDateChange = (date) => {
		setNewRequest({ ...newRequest, requestDate: date });
	};

	const handleSave = () => {
		onSave(newRequest);
		clearForm();
		onClose();
	};

	const clearForm = () => {
		setNewRequest({
			requesterName: "",
			requestName: "",
			requestDescp: "",
			requestDate: new Date(),
			wing: "",
			unit: "",
			priority: "medium",
			status: "open",
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Request</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Requester Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="requesterName"
								value={newRequest.requesterName || ""}
								onChange={handleChange}
								placeholder="Requester Name"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<div className="text-left">
							<div className="font-poppins">
								Request Name
								<span className="text-[#E74C3C]">*</span>
							</div>
							<Input
								name="requestName"
								value={newRequest.requestName || ""}
								onChange={handleChange}
								placeholder="Request Name"
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
								name="requestDescp"
								value={newRequest.requestDescp || ""}
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
								value={newRequest.wing || ""}
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
								value={newRequest.unit || ""}
								onChange={handleChange}
								placeholder="Unit"
							/>
						</div>
					</div>
				</div>

				{/* Date Picker for Request Date */}
				<div className="grid grid-cols-1 gap-2 mt-4">
					<div className="text-left">
						<div className="font-poppins">
							Request Date
							<span className="text-[#E74C3C]">*</span>
						</div>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant={"outline"} className="w-full">
									{newRequest.requestDate ? (
										moment(newRequest.requestDate).format(
											"MMM DD, YYYY"
										)
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={newRequest.requestDate}
									onSelect={handleDateChange}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
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
								value="high"
								checked={newRequest.priority === "high"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">High</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="priority"
								value="medium"
								checked={newRequest.priority === "medium"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Medium</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="priority"
								value="low"
								checked={newRequest.priority === "low"}
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
								value="open"
								checked={newRequest.status === "open"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Open</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="status"
								value="pending"
								checked={newRequest.status === "pending"}
								onChange={handleRadioChange}
								className="mr-2 radio-gradient"
							/>
							<span className="text-gray-500">Pending</span>
						</label>
						<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
							<input
								type="radio"
								name="status"
								value="solve"
								checked={newRequest.status === "solve"}
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
