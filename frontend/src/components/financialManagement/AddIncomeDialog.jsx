import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

export default function AddIncomeDialog({ onSave }) {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(null);
	const [dueDate, setDueDate] = useState(null);
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [open, setOpen] = useState(false);

	const handleSave = () => {
		if (!title || !date || !dueDate || !description || !amount) {
			alert("Please fill out all required fields.");
			return;
		}

		const newIncome = {
			id: Date.now(),
			title,
			date: date ? date.toLocaleDateString() : "",
			dueDate: dueDate ? dueDate.toLocaleDateString() : "",
			description,
			amount,
			members: 0,
		};
		onSave(newIncome);
		setTitle("");
		setDate(null);
		setDueDate(null);
		setDescription("");
		setAmount("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
					Create Other Income
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md p-6 rounded-lg shadow-lg bg-white">
				<DialogTitle className="text-xl font-semibold mb-4">
					Create Other Income
				</DialogTitle>
				<div className="space-y-6">
					<div>
						<label className="text-sm font-medium block mb-1">
							Title*
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Title"
							required
							className="border border-gray-300 rounded-lg p-2 w-full"
						/>
					</div>
					<div className="flex gap-4">
						<div className="w-1/2">
							<label className="text-sm font-medium block mb-1">
								Date*
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
											<span>Pick a date</span>
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
						<div className="w-1/2">
							<label className="text-sm font-medium block mb-1">
								Due Date*
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={`w-full text-left pl-3 pr-3 py-2 rounded-lg ${
											!dueDate && "text-gray-400"
										}`}
									>
										{dueDate ? (
											format(dueDate, "PPP")
										) : (
											<span>Pick a due date</span>
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
										selected={dueDate}
										onSelect={setDueDate}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div>
						<label className="text-sm font-medium block mb-1">
							Description*
						</label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Description"
							required
							className="border border-gray-300 rounded-lg p-2 w-full"
						/>
					</div>
					<div>
						<label className="text-sm font-medium block mb-1">
							Amount*
						</label>
						<Input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="₹ 0000"
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
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
