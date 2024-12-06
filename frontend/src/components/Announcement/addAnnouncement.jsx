import { useState, useEffect } from "react";
import { isValid } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import axiosInstance from "@/test/axiosInstance";
import moment from "moment";
import { Separator } from "../ui/separator";
import { Select } from "../ui/select";

export default function AddAnnouncement({
	isOpen,
	onClose,
	onSave,
	announcement = null,
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState("");

	useEffect(() => {
		if (announcement) {
			setTitle(announcement.title);
			setDescription(announcement.description);
			const parsedDate = new Date(announcement.date);
			setDate(isValid(parsedDate) ? parsedDate : new Date());
			setTime(announcement.time);
		} else {
			clearForm();
		}
	}, [announcement]);

	const clearForm = () => {
		setTitle("");
		setDescription("");
		setDate(new Date());
		setTime("");
	};

	const handleSubmit = async () => {
		const newAnnouncement = {
			title,
			description,
			date: moment(date).format("YYYY-MM-DD"),
			time: moment(time, "HH:mm").format("hh:mm A"),
		};

		try {
			// Send a POST request to the backend
			const response = await axiosInstance.post(
				"/announcements",
				newAnnouncement
			);
			onSave(response.data.newAnnouncement);
			clearForm();
			onClose();
		} catch (error) {
			console.error("Error creating announcement:", error);
		}
	};

	const [selectedType, setSelectedType] = useState('Select');

	const handleTypeChange = (event) => {
	  setSelectedType(event.target.value);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>Add Announcement</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label htmlFor="announcementType" className="block text-sm font-medium">
							Announcement Type
							<span className="text-red-500">*</span>
							</label>
						<select
							id="announcementType"
							name="announcementType"
							placeholder="Enter announcement type"
							value={selectedType}
							onChange={handleTypeChange}
							className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-gray-150 sm:text-sm rounded-md"
						>
							<option value="Select">Select Announcement Type</option>
							<option value="Event">Event</option>
							<option value="Activity">Activity</option>
						</select>
					</div>
					<div>

						<label className="text-sm font-medium">
							Announcement Title
							<span className="text-red-500">*</span>
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Announcement Title"
							required
						/>
					</div>
					<div>
						<label className="text-sm font-medium">
							 Description
							<span className="text-red-500">*</span>
						</label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Announcement Description"
							required
						/>
					</div>
					<div className="flex space-x-4">
						<div className="grid grid-cols-1">
							<label className="text-sm font-medium">
								Announcement Date
								<span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<Input
									type="date"
									value={moment(date).format("YYYY-MM-DD")}
									onChange={(e) =>
										setDate(new Date(e.target.value))
									}
									className="w-full border border-gray-300 rounded-lg"
									placeholder="Select Date"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1">
							<label className="text-sm font-medium">
								Announcement Time
								<span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<Input
									type="time"
									value={time}
									onChange={(e) => setTime(e.target.value)}
									className="w-full border border-gray-300 rounded-lg"
									placeholder="Select Time"
								/>
							</div>
						</div>
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
					<Button onClick={handleSubmit} className="w-full">
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
