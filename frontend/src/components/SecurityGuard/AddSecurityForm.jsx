import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UploadIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

export default function AddSecurityForm({ isOpen, onClose, onSave, editData }) {
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		gender: "",
		shift: "",
		shiftDate: new Date(),
		shiftTime: "",
		aadharFile: null,
		guardPhoto: null,
	});
	const [fileError, setFileError] = useState("");
	const [photoError, setPhotoError] = useState("");
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (editData) {
			setFormData({
				fullName: editData.fullName,
				phoneNumber: editData.phoneNumber,
				gender: editData.gender,
				shift: editData.shift,
				shiftDate: new Date(editData.shiftDate),
				shiftTime: editData.shiftTime,
				aadharFile: null, // You might need to handle file data differently
				guardPhoto: null, // You might need to handle file data differently
			});
		} else {
			setFormData({
				fullName: "",
				phoneNumber: "",
				gender: "",
				shift: "",
				shiftDate: new Date(),
				shiftTime: "",
				aadharFile: null,
				guardPhoto: null,
			});
		}
	}, [editData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFileUpload = (e, field) => {
		const file = e.target.files[0];
		const validTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"application/pdf",
		];
		const maxSize = 10 * 1024 * 1024; // 10 MB

		if (file && validTypes.includes(file.type) && file.size <= maxSize) {
			setFormData((prevData) => ({ ...prevData, [field]: file }));
			if (field === "aadharFile") setFileError("");
			if (field === "guardPhoto") setPhotoError("");
		} else {
			if (field === "aadharFile") {
				setFileError(
					"Only JPEG, JPG, PNG, GIF, and PDF files under 10MB are allowed."
				);
			}
			if (field === "guardPhoto") {
				setPhotoError(
					"Only JPEG, JPG, PNG, GIF files under 10MB are allowed."
				);
			}
		}
	};

	const validateForm = () => {
		let errors = {};
		if (!formData.fullName) {
			errors.fullName = "Full Name is required.";
		}
		if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
			errors.phoneNumber = "Phone Number must be exactly 10 digits.";
		}
		if (!formData.gender) {
			errors.gender = "Gender is required.";
		}
		if (!formData.shift) {
			errors.shift = "Shift is required.";
		}
		if (!formData.shiftDate) {
			errors.shiftDate = "Shift Date is required.";
		}
		if (!formData.shiftTime) {
			errors.shiftTime = "Shift Time is required.";
		}
		if (!formData.aadharFile) {
			errors.aadharFile = "Aadhar File is required.";
		}
		if (!formData.guardPhoto) {
			errors.guardPhoto = "Guard Photo is required.";
		}
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		onSave(formData);
		setFormData({
			fullName: "",
			phoneNumber: "",
			gender: "",
			shift: "",
			shiftDate: new Date(),
			shiftTime: "",
			aadharFile: null,
			guardPhoto: null,
		});
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<h2 className="text-2xl font-bold mb-6">
					{editData ? "Edit Security" : "Add Security"}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block font-medium mb-1">
							Full Name<span className="text-red-600">*</span>
						</label>
						<Input
							name="fullName"
							placeholder="Enter Full Name"
							value={formData.fullName}
							onChange={handleInputChange}
						/>
						{formErrors.fullName && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.fullName}
							</p>
						)}
					</div>
					{/* //TODO: RESTRICT USER FROM ENTERIN MORE THE 10 DIGITS */}
					<div className="mb-4">
						<label className="block font-medium mb-1">
							Phone Number
							<span className="text-red-600">*</span>
						</label>
						<Input
							name="phoneNumber"
							type="number"
							placeholder="+91"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							maxLength={10}
						/>
						{formErrors.phoneNumber && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.phoneNumber}
							</p>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block font-medium mb-1">
								Gender
								<span className="text-red-600">*</span>
							</label>
							<Select
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										gender: value,
									}))
								}
								value={formData.gender}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Male">Male</SelectItem>
									<SelectItem value="Female">
										Female
									</SelectItem>
								</SelectContent>
							</Select>
							{formErrors.gender && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors.gender}
								</p>
							)}
						</div>

						<div>
							<label className="block font-medium mb-1">
								Shift<span className="text-red-600">*</span>
							</label>
							<Select
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										shift: value,
									}))
								}
								value={formData.shift}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Shift" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Day">Day</SelectItem>
									<SelectItem value="Night">Night</SelectItem>
								</SelectContent>
							</Select>
							{formErrors.shift && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors.shift}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block font-medium mb-1">
								Shift Date
								<span className="text-red-600">*</span>
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={
											"w-full pl-3 text-left font-normal" +
											(!formData.shiftDate
												? " text-muted-foreground"
												: "")
										}
									>
										{formData.shiftDate
											? format(
													formData.shiftDate,
													"MM/dd/yyyy"
											  )
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
										selected={formData.shiftDate}
										onSelect={(newDate) => {
											if (newDate) {
												setFormData((prev) => ({
													...prev,
													shiftDate: newDate,
												}));
											}
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							{formErrors.shiftDate && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors.shiftDate}
								</p>
							)}
						</div>

						<div>
							<label className="block font-medium mb-1">
								Shift Time
								<span className="text-red-600">*</span>
							</label>
							<Input
								type="time"
								name="shiftTime"
								value={formData.shiftTime}
								onChange={handleInputChange}
								className="cursor-pointer"
							/>
							{formErrors.shiftTime && (
								<p className="text-red-500 text-sm mt-1">
									{formErrors.shiftTime}
								</p>
							)}
						</div>
					</div>
					{/* //TODO: UPDATE TH UI OF ADHAR UPLODE */}
					<div className="mb-4">
						<label className="block font-medium mb-1">
							Upload Aadhar Card
							<span className="text-red-600">*</span>
						</label>
						<div className="border-dashed border-2 border-gray-300 p-4 rounded-lg">
							{formData.aadharFile ? (
								<p className="text-center">
									{formData.aadharFile.name}
								</p>
							) : (
								<label className="cursor-pointer text-blue-600 flex flex-col items-center">
									<UploadIcon className="w-6 h-6 mb-2" />
									<span>Upload a file or drag and drop</span>
									<input
										type="file"
										accept=".jpeg, .jpg, .png, .gif, .pdf"
										onChange={(e) =>
											handleFileUpload(e, "aadharFile")
										}
										className="hidden"
									/>
								</label>
							)}
						</div>
						{fileError && (
							<p className="text-red-600 text-sm mt-1">
								{fileError}
							</p>
						)}
						{formErrors.aadharFile && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.aadharFile}
							</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block font-medium mb-1">
							Upload Guard Photo
							<span className="text-red-600">*</span>
						</label>
						<div className="border-dashed border-2 border-gray-300 p-4 rounded-lg">
							{formData.guardPhoto ? (
								<p className="text-center">
									{formData.guardPhoto.name}
								</p>
							) : (
								<label className="cursor-pointer text-blue-600 flex flex-col items-center">
									<UploadIcon className="w-6 h-6 mb-2" />
									<span>Upload a file or drag and drop</span>
									<input
										type="file"
										accept=".jpeg, .jpg, .png, .gif"
										onChange={(e) =>
											handleFileUpload(e, "guardPhoto")
										}
										className="hidden"
									/>
								</label>
							)}
						</div>
						{photoError && (
							<p className="text-red-600 text-sm mt-1">
								{photoError}
							</p>
						)}
						{formErrors.guardPhoto && (
							<p className="text-red-500 text-sm mt-1">
								{formErrors.guardPhoto}
							</p>
						)}
					</div>

					<div className="flex justify-between mt-6">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button type="submit">
							{editData ? "Update" : "Create"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
