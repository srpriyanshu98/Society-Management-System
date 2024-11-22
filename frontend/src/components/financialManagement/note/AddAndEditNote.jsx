import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

export default function AddAndEditNote({ onSave, noteToEdit, open, setOpen }) {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(null);
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");

	// Reset fields when noteToEdit changes or dialog closes
	useEffect(() => {
		if (noteToEdit) {
			setTitle(noteToEdit.title || "");
			setDate(noteToEdit.date ? new Date(noteToEdit.date) : null);
			setDescription(noteToEdit.description || "");
			setError(""); // Reset error
		} else {
			setTitle("");
			setDate(null);
			setDescription("");
			setError(""); // Reset error
		}
	}, [noteToEdit, open]);

	const handleSave = () => {
		// Validation
		if (!title || !date || !description) {
			setError("All fields are required.");
			return;
		}

		// Prepare the note data
		const noteData = {
			_id: noteToEdit?._id || undefined, // Remove _id when creating a new note
			title,
			date: moment(date).toISOString(),
			description,
		};

		// If the noteToEdit is null, it means we are creating a new note, so _id should be excluded
		if (!noteToEdit?._id) {
			delete noteData._id; // Remove _id from the new note payload
		}

		// Call onSave with the prepared note data
		onSave(noteData);

		// Close the dialog and reset form fields
		setOpen(false);
	};

	const isSaveButtonDisabled = !title || !date || !description;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
				<DialogTitle className="text-xl font-semibold mb-4">
					{noteToEdit ? "Edit Note" : "Add Note"}
				</DialogTitle>
				<div className="space-y-6">
					{/* Title Field */}
					<div>
						<label className="text-sm font-medium block mb-1">
							Title<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Title"
							required
							className="border border-gray-300 rounded-lg p-2 w-full"
						/>
					</div>

					{/* Date Field */}
					<div>
						<label className="text-sm font-medium block mb-1">
							Date<span className="text-[#E74C3C]">*</span>
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={`w-full text-left pl-3 pr-3 py-2 rounded-lg ${
										!date && "text-gray-400"
									}`}
								>
									{date
										? moment(date).format("MM/DD/YYYY")
										: "Select Date"}
									<CalendarDays className="ml-auto h-5 w-5 text-gray-500" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									disabled={(date) => date < new Date()}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					{/* Description Field */}
					<div>
						<label className="text-sm font-medium block mb-1">
							Description<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Description"
							required
							className="border border-gray-300 rounded-lg p-2 w-full"
						/>
					</div>

					{/* Error Message */}
					{error && (
						<p className="text-red-500 text-sm mt-2">{error}</p>
					)}
				</div>

				<DialogFooter className="mt-6 flex justify-end gap-2">
					{/* Cancel Button */}
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
					>
						Cancel
					</Button>

					{/* Save/Update Button */}
					<Button
						onClick={handleSave}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg"
						disabled={isSaveButtonDisabled}
					>
						{noteToEdit ? "Update" : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
