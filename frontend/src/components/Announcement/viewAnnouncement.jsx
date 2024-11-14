import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function ViewAnnouncement({ announcement, isOpen, onClose }) {
	if (!announcement) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Announcement Details</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="mt-4 space-y-4 ">
					<div>
						<p className="text-gray-400">Title</p>
						<p className="text-gray-800">{announcement.title}</p>
					</div>
					<div>
						<p className="text-gray-400">Description</p>
						<p className="text-gray-800">
							{announcement.description}
						</p>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-400">Date</p>
							<p className="text-gray-800">{announcement.date}</p>
						</div>
						<div>
							<p className="text-gray-400">Time</p>
							<p className="text-gray-800">{announcement.time}</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
