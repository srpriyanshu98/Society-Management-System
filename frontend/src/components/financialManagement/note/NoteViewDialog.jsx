import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import moment from "moment"; // Import moment for date formatting

export default function NoteViewDialog({ isOpen, onClose, note }) {
	if (!note) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6 rounded-xl">
				<DialogHeader>
					<DialogTitle>View Note Details</DialogTitle>
				</DialogHeader>
				<Separator />
				<div className="mt-4 space-y-4">
					{/* Title */}
					<div>
						<p className="text-gray-700 font-semibold">Title</p>
						<p className="text-gray-600">{note.title}</p>
					</div>

					{/* Description */}
					<div>
						<p className="text-gray-700 font-semibold">
							Description
						</p>
						<p className="text-gray-600">{note.description}</p>
					</div>

					{/* Date */}
					<div>
						<p className="text-gray-700 font-semibold">Date</p>
						{/* Format the date using moment */}
						<p className="text-gray-600">
							{note.date
								? moment(note.date).format("MM/DD/YYYY")
								: "No date available"}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
