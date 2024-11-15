import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


export default function AddAndEditNote({
	onSave,
	onEdit,
	noteToEdit,
	open,
	setOpen,
}) {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(null);
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (noteToEdit) {
			setTitle(noteToEdit.title);
			setDate(noteToEdit.date ? new Date(noteToEdit.date) : null);
			setDescription(noteToEdit.description);
		} else {
			setTitle("");
			setDate(null);
			setDescription("");
		}
	}, [noteToEdit]);

	const handleSave = () => {
		if (!title || !date || !description) {
			alert("Please fill out all required fields.");
			return;
		}

		const newNote = {
			id: noteToEdit ? noteToEdit.id : Date.now(),
			title,
			date: date ? date.toLocaleDateString() : "",
			description,
		};

		if (noteToEdit) {
			onEdit(newNote);
		} else {
			onSave(newNote);
		}

		setTitle("");
		setDate(null);
		setDescription("");
		setOpen(false);
	};

	// Check if all required fields are filled
	const isSaveButtonDisabled = !title || !date || !description;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{noteToEdit ? (
					<Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
						Edit Note
					</Button>
				) : (
					<Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
						Create Note
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
				<DialogTitle className="text-xl font-semibold mb-4">
					{noteToEdit ? "Edit Note" : "Add Note"}
				</DialogTitle>
				<div className="space-y-6">
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
									{date ? (
										format(date, "PPP")
									) : (
										<span>Select Date</span>
									)}
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
				</div>
				<DialogFooter className="mt-6 flex justify-end gap-2">
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
						disabled={isSaveButtonDisabled} // Disable button when any field is empty
					>
						{noteToEdit ? "Update" : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
