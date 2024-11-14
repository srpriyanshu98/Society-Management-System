import { useState, useEffect } from "react";
import { format, isValid } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function AddAnnouncement({
	isOpen,
	onClose,
	onSave,
	announcement = null,
}) {
	const [Announcementtitle, setAnnouncementtitle] = useState("");
	const [Announcementdescription, setAnnouncementdescription] = useState("");
	const [Announcementdate, setAnnouncementdate] = useState(new Date());
	const [Announcementtime, setAnnouncementtime] = useState("");

	useEffect(() => {
		if (announcement) {
			setAnnouncementtitle(announcement.Announcementtitle);
			setAnnouncementdescription(announcement.Announcementdescription);
			const parsedDate = new Date(announcement.Announcementdate);
			setAnnouncementdate(isValid(parsedDate) ? parsedDate : new Date());
			setAnnouncementtime(announcement.Announcementtime);
		} else {
			clearForm();
		}
	}, [announcement]);

	const clearForm = () => {
		setAnnouncementtitle("");
		setAnnouncementdescription("");
		setAnnouncementdate(new Date());
		setAnnouncementtime("");
	};

	const handleSubmit = () => {
		const newAnnouncement = {
			Announcementtitle,
			Announcementdescription,
			Announcementdate: format(Announcementdate, "dd/MM/yyyy"),
			Announcementtime,
		};

		onSave(newAnnouncement);
		clearForm();
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>Add Announcement</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="text-sm font-medium">
							Announcement Title<span className="text-red-500">*</span>
						</label>
						<Input
							value={Announcementtitle}
							onChange={(e) => setAnnouncementtitle(e.target.value)}
							placeholder="Enter Announcement Title"
							required
						/>
					</div>
					<div>
						<label className="text-sm font-medium">
							Announcement Description<span className="text-red-500">*</span>
						</label>
						<Input
							value={Announcementdescription}
							onChange={(e) => setAnnouncementdescription(e.target.value)}
							placeholder="Enter Announcementdescription"
							required
						/>
					</div>
					<div className="flex space-x-19">
						<div className="grid grid-cols-1">
							<label className="text-sm font-medium">
								Announcement Date<span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<Input
									type="date"
									value={Announcementdate}
									onChange={(e) => setAnnouncementdate(e.target.value)}
									className="w-full border border-gray-300 rounded-lg"
									placeholder="Select Date"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 pl-10">
							<label className="text-sm font-medium">
								Announcement Time<span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<Input
									type="time"
									value={Announcementtime}
									onChange={(e) => setAnnouncementtime(e.target.value)}
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
