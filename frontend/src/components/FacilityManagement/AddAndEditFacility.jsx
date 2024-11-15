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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";

export default function AddAndEditFacility({
	isOpen,
	onClose,
	onSave,
	mode = "add",
	facility = null,
}) {
	const [facilityName, setFacilityName] = useState("");
	const [description, setDescription] = useState("");
	const [serviceDate, setServiceDate] = useState(new Date());
	const [remindBefore, setRemindBefore] = useState("");
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (mode === "edit" && facility) {
			setFacilityName(facility.facilityName);
			setDescription(facility.description);
			const parsedDate = new Date(facility.serviceDate);
			setServiceDate(isValid(parsedDate) ? parsedDate : new Date());
			setRemindBefore(facility.remindBefore);
		} else {
			clearForm();
		}
	}, [mode, facility]);

	const validateForm = () => {
		const errors = {};
		if (!facilityName) errors.facilityName = "Facility Name is required";
		if (!description) errors.description = "Description is required";
		if (!serviceDate) errors.serviceDate = "Service Date is required";
		return errors;
	};

	const handleSubmit = () => {
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		const newFacility = {
			facilityName,
			description,
			serviceDate: format(serviceDate, "dd/MM/yyyy"),
			remindBefore,
		};

		onSave(newFacility);
		clearForm();
		onClose();
	};

	const clearForm = () => {
		setFacilityName("");
		setDescription("");
		setServiceDate(new Date());
		setRemindBefore("");
		setFormErrors({});
	};

	// Check if all required fields are filled
	const isSaveButtonDisabled = !facilityName || !description || !serviceDate;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>
						{mode === "add" ? "Create Facility" : "Edit Facility"}
					</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="text-sm font-medium">
							Facility Name<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={facilityName}
							onChange={(e) => setFacilityName(e.target.value)}
							placeholder="Enter Facility Name"
							required
						/>
						{formErrors.facilityName && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.facilityName}
							</p>
						)}
					</div>
					<div>
						<label className="text-sm font-medium">
							Description<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Description"
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
					<div>
						<label className="text-sm font-medium">
							Remind Before
						</label>
						<Select
							value={remindBefore}
							onValueChange={(value) => setRemindBefore(value)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select Remind Before" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1 day">1 Day</SelectItem>
								<SelectItem value="2 days">2 Days</SelectItem>
								<SelectItem value="3 days">3 Days</SelectItem>
								<SelectItem value="1 week">1 Week</SelectItem>
								<SelectItem value="2 weeks">2 Weeks</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="flex justify-end mt-4 space-x-2">
					<Button
						variant="outline"
						onClick={onClose}
						className="w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className="w-full"
						disabled={isSaveButtonDisabled} // Disable button when any field is empty
					>
						{mode === "add" ? "Save" : "Update"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
