import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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
					<div>
						<p className="text-gray-700 font-semibold">Title</p>
						<p className="text-gray-600">{note.title}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">
							Description
						</p>
						<p className="text-gray-600">{note.description}</p>
					</div>
					<div>
						<p className="text-gray-700 font-semibold">Date</p>
						<p className="text-gray-600">{note.date}</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
