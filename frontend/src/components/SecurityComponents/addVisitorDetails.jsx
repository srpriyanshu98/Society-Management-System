import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Calendar } from "../ui/calendar";
import { useState } from "react";

export default function AddVisitorDetails({ isOpen, onClose, onAddVisitor }) {
	const [selectedDate, setSelectedDate] = useState(null);

	const [formData, setFormData] = useState({
		visitorName: "",
		phoneNumber: "",
		wing: "",
		unit: "",
		time: "",
	});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.visitorName.trim()) {
			newErrors.visitorName = "Visitor Name is required.";
		}
		if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
			newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
		}
		if (!formData.wing.trim()) {
			newErrors.wing = "Wing is required.";
		}
		if (!formData.unit.trim()) {
			newErrors.unit = "Unit is required.";
		}
		if (!selectedDate) {
			newErrors.date = "Date is required.";
		}
		if (!formData.time) {
			newErrors.time = "Time is required.";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		let newValue = value;

		if (name === "phoneNumber") {
			newValue = value.slice(0, 10);
		} else if (name === "unit") {
			newValue = value.slice(0, 4);
		} else if (name === "wing") {
			newValue = value.toUpperCase().slice(0, 1);
		}

		setFormData((prev) => ({ ...prev, [name]: newValue }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			const newVisitor = {
				visitorName: formData.visitorName,
				Number: formData.phoneNumber,
				wing: formData.wing,
				unit: formData.unit,
				date: selectedDate.toISOString().split("T")[0],
				time: formData.time,
			};
			onAddVisitor(newVisitor);
			onClose();
			resetForm();
		}
	};

	const resetForm = () => {
		setFormData({
			visitorName: "",
			phoneNumber: "",
			wing: "",
			unit: "",
			time: "",
		});
		setSelectedDate(null);
		setErrors({});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-80">
				<DialogHeader>
					<DialogTitle>Add Visitor Details</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Separator />
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="text-sm font-medium">
							Visitor Name<span className="text-red-500">*</span>
						</label>
						<Input
							type="text"
							name="visitorName"
							placeholder="Enter Visitor Name"
							className="mt-1 block rounded-md"
							value={formData.visitorName}
							onChange={handleChange}
						/>
						{errors.visitorName && (
							<p className="text-red-500 text-sm">
								{errors.visitorName}
							</p>
						)}
					</div>
					<div>
						<label className="text-sm font-medium">
							Phone Number<span className="text-red-500">*</span>
						</label>
						<Input
							type="number"
							name="phoneNumber"
							placeholder="Enter Phone Number"
							className="mt-1 block w-full rounded-md"
							value={formData.phoneNumber}
							onChange={handleChange}
						/>
						{errors.phoneNumber && (
							<p className="text-red-500 text-sm">
								{errors.phoneNumber}
							</p>
						)}
					</div>
					<div className="flex justify-between">
						<div>
							<label className="text-sm font-medium block">
								Wing <span className="text-red-500">*</span>
							</label>
							<Input
								type="text"
								name="wing"
								placeholder="Enter Wing"
								className="mt-1 block rounded-md w-28"
								value={formData.wing}
								onChange={handleChange}
							/>
							{errors.wing && (
								<p className="text-red-500 text-sm">
									{errors.wing}
								</p>
							)}
						</div>
						<div>
							<label className="text-sm font-medium block">
								Unit <span className="text-red-500">*</span>
							</label>
							<Input
								type="text"
								name="unit"
								placeholder="Enter Unit"
								className="mt-1 block rounded-md w-28"
								value={formData.unit}
								onChange={handleChange}
							/>
							{errors.unit && (
								<p className="text-red-500 text-sm">
									{errors.unit}
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-between">
						<div className="w-32">
							<label className="text-sm font-medium block">
								Date <span className="text-red-500">*</span>
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full text-left font-normal"
									>
										<span
											className={
												selectedDate
													? "text-black"
													: "text-gray-500"
											}
										>
											{selectedDate
												? selectedDate.toLocaleDateString()
												: "Select a date"}
										</span>
										<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={selectedDate}
										onSelect={setSelectedDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							{errors.date && (
								<p className="text-red-500 text-sm">
									{errors.date}
								</p>
							)}
						</div>
						<div>
							<label className="block font-medium">
								Time<span className="text-red-600">*</span>
							</label>
							<Input
								type="time"
								name="time"
								className="cursor-pointer w-28"
								value={formData.time}
								onChange={handleChange}
							/>
							{errors.time && (
								<p className="text-red-500 text-sm">
									{errors.time}
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-between space-x-2">
						<Button
							type="button"
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-32"
							onClick={onClose}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-md w-32"
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
