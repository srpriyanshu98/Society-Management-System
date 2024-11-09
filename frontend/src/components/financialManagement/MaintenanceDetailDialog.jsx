import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function MaintenanceDetailDialog({ isOpen, onClose }) {
	const [maintenanceAmount, setMaintenanceAmount] = useState("");
	const [penaltyAmount, setPenaltyAmount] = useState("");
	const [dueDate, setDueDate] = useState(null);
	const [penaltyAfterDays, setPenaltyAfterDays] = useState("");

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Maintenance Detail</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex space-x-4">
						<div className="w-1/2">
							<Label>Maintenance Amount</Label>
							<Input
								placeholder="₹ 0000"
								value={maintenanceAmount}
								onChange={(e) =>
									setMaintenanceAmount(e.target.value)
								}
							/>
						</div>
						<div className="w-1/2">
							<Label>Penalty Amount</Label>
							<Input
								placeholder="₹ 0000"
								value={penaltyAmount}
								onChange={(e) =>
									setPenaltyAmount(e.target.value)
								}
							/>
						</div>
					</div>
					<div>
						<Label>Maintenance Due Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start text-left"
								>
									{dueDate
										? format(dueDate, "MM/dd/yyyy")
										: "Select Due Date"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="p-0">
								<Calendar
									mode="single"
									selected={dueDate}
									onSelect={setDueDate}
									disabled={(date) => date < new Date()} // Disables past dates
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div>
						<Label>Penalty Applied After Day Selection</Label>
						<Select
							value={penaltyAfterDays}
							onValueChange={setPenaltyAfterDays}
						>
							<SelectTrigger className="w-full p-2 border border-gray-300 rounded-lg">
								<SelectValue placeholder="Select Penalty Applied After Day Selection" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">1 Day</SelectItem>
								<SelectItem value="2">2 Days</SelectItem>
								<SelectItem value="3">3 Days</SelectItem>
								<SelectItem value="4">4 Days</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="secondary"
						onClick={onClose}
						className="w-40"
					>
						Cancel
					</Button>
					<Button className="w-40">Apply</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
