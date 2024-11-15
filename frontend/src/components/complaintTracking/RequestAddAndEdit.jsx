import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Separator } from "../ui/separator";

export default function RequestAddAndEdit({
	isOpen,
	onClose,
	request,
	onSave,
}) {
	const [editedRequest, setEditedRequest] = useState({ ...request });
	const [serviceDate, setServiceDate] = useState(new Date());
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		setEditedRequest({ ...request });
		const parsedDate = new Date(request?.date || new Date());
		setServiceDate(isValid(parsedDate) ? parsedDate : new Date());
	}, [request]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedRequest({ ...editedRequest, [name]: value });
	};

	const handleRadioChange = (e) => {
		const { name, value } = e.target;
		setEditedRequest({ ...editedRequest, [name]: value });
	};

	const validateForm = () => {
		const errors = {};
		if (!editedRequest.RequesterName)
			errors.RequesterName = "Requester Name is required";
		if (!editedRequest.RequestName)
			errors.RequestName = "Request Name is required";
		if (!editedRequest.description)
			errors.description = "Description is required";
		if (!serviceDate) errors.serviceDate = "Service Date is required";
		return errors;
	};

	const handleSave = () => {
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		const newRequest = {
			...editedRequest,
			date: format(serviceDate, "dd/MM/yyyy"),
		};

		onSave(newRequest);
		clearForm();
		onClose();
	};

	const clearForm = () => {
		setEditedRequest({});
		setServiceDate(new Date());
		setFormErrors({});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>
						{request ? "Edit Request" : "Create Request"}
					</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="text-sm font-medium">
							Requester Name
							<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							name="RequesterName"
							value={editedRequest.RequesterName || ""}
							onChange={handleChange}
							placeholder="Requester Name"
							required
						/>
						{formErrors.RequesterName && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.RequesterName}
							</p>
						)}
					</div>
					<div>
						<label className="text-sm font-medium">
							Request Name
							<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							name="RequestName"
							value={editedRequest.RequestName || ""}
							onChange={handleChange}
							placeholder="Request Name"
							required
						/>
						{formErrors.RequestName && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.RequestName}
							</p>
						)}
					</div>
					<div>
						<label className="text-sm font-medium">
							Description<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							name="description"
							value={editedRequest.description || ""}
							onChange={handleChange}
							placeholder="Description"
							required
						/>
						{formErrors.description && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.description}
							</p>
						)}
					</div>
					<div>
						<label className="text-sm font-medium">
							Schedule Service Date
							<span className="text-[#E74C3C]">*</span>
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={
										"w-full pl-3 text-left font-normal" +
										(!serviceDate
											? " text-muted-foreground"
											: "")
									}
								>
									{isValid(serviceDate)
										? format(serviceDate, "MM/dd/yyyy")
										: "Select Date"}
									<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={serviceDate}
									onSelect={(newDate) => {
										if (newDate && isValid(newDate)) {
											setServiceDate(newDate);
										}
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						{formErrors.serviceDate && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.serviceDate}
							</p>
						)}
					</div>
					<div className="flex space-x-4">
						<div className="grid grid-cols-1 gap-2">
							<div className="text-left">
								<div className="font-poppins">
									Wing
									<span className="text-[#E74C3C]">*</span>
								</div>
								<Input
									name="wing"
									value={editedRequest.wing || ""}
									onChange={handleChange}
									placeholder="Wing"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-2">
							<div className="text-left">
								<div className="font-poppins">
									Unit
									<span className="text-[#E74C3C]">*</span>
								</div>
								<Input
									name="unit"
									type="number"
									value={editedRequest.unit || ""}
									onChange={handleChange}
									placeholder="Unit"
								/>
							</div>
						</div>
					</div>

					{/* Radio Group for Priority */}
					<div>
						<label className="block font-medium">
							Priority<span className="text-[#E74C3C]">*</span>
						</label>
						<div className="flex space-x-4">
							<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
								<input
									type="radio"
									name="priority"
									value="High"
									checked={editedRequest.priority === "High"}
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
									checked={
										editedRequest.priority === "Medium"
									}
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
									checked={editedRequest.priority === "Low"}
									onChange={handleRadioChange}
									className="mr-2 radio-gradient"
								/>
								<span className="text-gray-500">Low</span>
							</label>
						</div>
					</div>

					{/* Radio Group for Status */}
					<div>
						<label className="block font-medium">
							Status<span className="text-[#E74C3C]">*</span>
						</label>
						<div className="flex space-x-4">
							<label className="flex items-center p-2 border rounded-md cursor-pointer w-28">
								<input
									type="radio"
									name="status"
									value="Open"
									checked={editedRequest.status === "Open"}
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
									checked={editedRequest.status === "Pending"}
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
									checked={editedRequest.status === "Solve"}
									onChange={handleRadioChange}
									className="mr-2 radio-gradient"
								/>
								<span className="text-gray-500">Solve</span>
							</label>
						</div>
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
