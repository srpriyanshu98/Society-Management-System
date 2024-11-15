import { useState, useEffect } from "react";
import { format, isValid } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

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
	const [isFormValid, setIsFormValid] = useState(false);

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

	useEffect(() => {
		// Update form validity whenever input values change
		const isFormValid =
			Announcementtitle &&
			Announcementdescription &&
			Announcementdate &&
			Announcementtime;
		setIsFormValid(isFormValid);
	}, [Announcementtitle, Announcementdescription, Announcementdate, Announcementtime]);

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
						<div className="grid grid-cols-1">
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
					<Button onClick={handleSubmit} className="w-full" disabled={!isFormValid}>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
