import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import moment from "moment";

export default function EditSecurityProtocols({
	isOpen,
	onClose,
	protocol,
	onSave,
}) {
	const [date, setDate] = useState(protocol?.date || "");
	const [time, setTime] = useState(protocol?.time || "");
	const [title, setTitle] = useState(protocol?.Title || "");
	const [description, setDescription] = useState(protocol?.description || "");

	useEffect(() => {
		if (protocol) {
			setTitle(protocol.Title);
			setDescription(protocol.description);
			setDate(protocol.date);
			setTime(protocol.time);
		}
	}, [protocol]);

	const handleSave = () => {
		onSave({ ...protocol, Title: title, description, date, time });
		onClose();
	};

	const isFormValid = title && description && date && time;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-57">
				<DialogHeader>
					<DialogTitle>Edit Security Protocol</DialogTitle>
				</DialogHeader>
				<Separator className="w-45" />
				<div className="flex flex-col space-y-4">
					<Label>
						Title<span className="text-red-500">*</span>
					</Label>
					<Input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 border rounded-lg"
						placeholder="Enter Title"
					/>
					<Label>
						Description<span className="text-red-500">*</span>
					</Label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-3 border rounded-lg resize-none"
						rows="3"
						placeholder="Enter description"
					/>
				</div>
				<div className="flex space-x-20">
					<div className="grid grid-cols-1 gap-2">
						<label className="block text-gray-700 font-medium">
							Date<span className="text-red-500">*</span>
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={`w-full pl-3 text-left ${
										!date ? "text-muted-foreground" : ""
									}`}
								>
									{moment(date).format("MM/DD/YYYY")}
									<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={new Date(date)}
									onSelect={(newDate) =>
										newDate &&
										setDate(
											moment(newDate).format("MM/DD/YYYY")
										)
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid grid-cols-1 gap-2">
						<label className="block text-gray-700 font-medium">
							Time<span className="text-red-500">*</span>
						</label>
						<Input
							type="time"
							value={moment(time, "hh:mm A").format("HH:mm")}
							onChange={(e) =>
								setTime(
									moment(e.target.value, "HH:mm").format(
										"hh:mm A"
									)
								)
							}
							className="w-full p-2 border rounded-lg"
						/>
					</div>
				</div>
				<div className="space-x-5 mt-4">
					<Button
						variant="outline"
						onClick={onClose}
						className="w-40"
					>
						Cancel
					</Button>
					<Button
						className="w-40"
						disabled={!isFormValid}
						onClick={handleSave}
					>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
