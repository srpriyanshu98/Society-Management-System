import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "../ui/separator";

export default function EditIncomeDialog({ incomeItem, onSave, onClose }) {
	const [title, setTitle] = useState(incomeItem?.title || "");
	const [date, setDate] = useState(new Date(incomeItem?.date));
	const [dueDate, setDueDate] = useState(new Date(incomeItem?.dueDate));
	const [description, setDescription] = useState(
		incomeItem?.description || ""
	);
	const [amount, setAmount] = useState(incomeItem?.amount || "");

	useEffect(() => {
		if (incomeItem) {
			setTitle(incomeItem.title);
			setDate(new Date(incomeItem.date));
			setDueDate(new Date(incomeItem.dueDate));
			setDescription(incomeItem.description);
			setAmount(incomeItem.amount);
		}
	}, [incomeItem]);

	const handleSave = () => {
		if (!title || !date || !dueDate || !description || !amount) {
			alert("Please fill out all required fields.");
			return;
		}

		const updatedIncome = {
			...incomeItem,
			title,
			date: date.toLocaleDateString(),
			dueDate: dueDate.toLocaleDateString(),
			description,
			amount,
		};

		onSave(updatedIncome);
		onClose();
	};

	return (
		<Dialog open={Boolean} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-6">
				<DialogTitle className="text-2xl font-semibold">
					Edit {incomeItem?.title}
				</DialogTitle>
				<Separator />
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Title<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Title"
							className="w-full p-2 rounded-md border border-gray-300"
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Date<span className="text-[#E74C3C]">*</span>
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={
											"w-full p-2 rounded-md text-left font-normal" +
											(!date
												? " text-muted-foreground"
												: "")
										}
									>
										{date
											? format(date, "PPP")
											: "Pick a date"}
										<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
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
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Due Date
								<span className="text-[#E74C3C]">*</span>
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={
											"w-full p-2 rounded-md text-left font-normal" +
											(!dueDate
												? " text-muted-foreground"
												: "")
										}
									>
										{dueDate
											? format(dueDate, "PPP")
											: "Pick a date"}
										<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
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
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Description<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter Description"
							className="w-full p-2 rounded-md border border-gray-300"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Amount<span className="text-[#E74C3C]">*</span>
						</label>
						<Input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="₹ 0000"
							className="w-full p-2 rounded-md border border-gray-300"
							required
						/>
					</div>
				</div>
				<DialogFooter className="mt-6">
					<Button
						variant="outline"
						onClick={onClose}
						className="px-4 py-2 rounded-lg w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className="px-4 py-2 rounded-lg bg-blue-500 text-white w-full"
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
