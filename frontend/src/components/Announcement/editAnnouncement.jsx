import { useState, useEffect } from "react";
import { isValid } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import axiosInstance from "@/test/axiosInstance";
import moment from "moment";
import { Separator } from "../ui/separator";

export default function EditAnnouncement({
	isOpen,
	onClose,
	onSave,
	announcement = null,
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
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
		setDate("");
		setTime("");
	};

	const handleSubmit = async () => {
		const parsedDate = new Date(date);
		if (!isValid(parsedDate)) {
			console.error("Invalid date value");
			return;
		}

		const updatedAnnouncement = {
			title,
			description,
			date: moment(parsedDate).format("YYYY-MM-DD"),
			time: moment(time, "HH:mm").format("hh:mm A"),
		};

		try {
			const response = await axiosInstance.put(
				`/announcements/${announcement._id}`,
				updatedAnnouncement
			);
			onSave(response.data.updatedAnnouncement);
			clearForm();
			onClose();
		} catch (error) {
			console.error("Error updating announcement:", error);
			alert(
				"Failed to update announcement. Please check the data and try again."
			);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>Edit Announcement</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="grid grid-cols-1 gap-4">
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
							Announcement Description
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
						<div>
							<label className="text-sm font-medium">
								Announcement Date
								<span className="text-red-500">*</span>
							</label>
							<Input
								type="date"
								value={moment(date).format("YYYY-MM-DD")} // Ensure date is in the correct format
								onChange={(e) =>
									setDate(new Date(e.target.value))
								}
								className="w-full border border-gray-300 rounded-lg"
								placeholder="Select Date"
							/>
						</div>
						<div>
							<label className="text-sm font-medium">
								Announcement Time
								<span className="text-red-500">*</span>
							</label>
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
