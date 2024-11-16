import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { isValid, format } from "date-fns"; // Import isValid and format

export default function EditSecurityProtocols({ isOpen, onClose }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Check if all required fields are filled
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
                    <div className="relative">
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter Title"
                        />
                    </div>
                    <Label>
                        Description<span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
                            rows="3"
                            placeholder="Enter description"
                        />
                    </div>
                </div>
                <div className="flex space-x-20">
                    <div className="grid grid-cols-1 gap-2">
                        <label className="block text-gray-700 font-medium">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                        !date ? "text-muted-foreground" : ""
                                    }`}
                                >
                                    {isValid(date)
                                        ? format(date, "MM/dd/yyyy")
                                        : "Select Date"}
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
                                    onSelect={(newDate) => {
                                        if (newDate && isValid(newDate)) {
                                            setDate(newDate);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label className="block text-gray-700 font-medium">
                            Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative w-full max-w-xs">
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full p-2 pl-5 pr-5 border border-gray-300 rounded-lg"
                                placeholder="Select Time"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-x-5 mt-4">
                    {/* Cancel Button */}
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="w-40"
                    >
                        Cancel
                    </Button>
                    {/* Save Button */}
                    <Button
                        className="w-40"
                        disabled={!isFormValid}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
