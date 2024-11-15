import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

export default function EditAnnouncement({
	isOpen,
	onClose,
	onSave,
	announcement = null,
}) {
	const [Announcementtitle, setAnnouncementtitle] = useState("");
	const [Announcementdescription, setAnnouncementdescription] = useState("");
	const [Announcementdate, setAnnouncementdate] = useState("");
	const [Announcementtime, setAnnouncementtime] = useState("");

	useEffect(() => {
		if (announcement) {
			setAnnouncementtitle(announcement.Announcementtitle);
			setAnnouncementdescription(announcement.Announcementdescription);
			setAnnouncementdate(
				announcement.Announcementdate
					? format(parse(announcement.Announcementdate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd")
					: ""
			);
			setAnnouncementtime(announcement.Announcementtime);
		} else {
			clearForm();
		}
	}, [announcement]);

	const clearForm = () => {
		setAnnouncementtitle("");
		setAnnouncementdescription("");
		setAnnouncementdate("");
		setAnnouncementtime("");
	};

	const handleSubmit = () => {
		const newAnnouncement = {
			id: announcement?.id || new Date().getTime(),
			Announcementtitle,
			Announcementdescription,
			Announcementdate: format(parse(Announcementdate, "yyyy-MM-dd", new Date()), "dd/MM/yyyy"),
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
					<DialogTitle>Edit Announcement</DialogTitle>
				</DialogHeader>
				<Separator />
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
							placeholder="Enter Announcement Description"
							required
						/>
					</div>
					<div className="flex space-x-4">
						<div>
							<label className="text-sm font-medium">
								Announcement Date<span className="text-red-500">*</span>
							</label>
							<Input
								type="date"
								value={Announcementdate}
								onChange={(e) => setAnnouncementdate(e.target.value)}
								className="w-full border border-gray-300 rounded-lg"
								placeholder="Select Date"
							/>
						</div>
						<div>
							<label className="text-sm font-medium">
								Announcement Time<span className="text-red-500">*</span>
							</label>
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
