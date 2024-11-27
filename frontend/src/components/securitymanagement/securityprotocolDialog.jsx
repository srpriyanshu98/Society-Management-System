import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import moment from "moment";

export default function SecurityProtocolDialog({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
    const [time, setTime] = useState(moment().format("hh:mm A"));

    const isSaveEnabled = title.trim() && description.trim() && date && time;

    const handleSave = () => {
        onSave({ title: title, description, date, time: time });
        setTitle("");
        setDescription("");
        setDate(moment().format("MM/DD/YYYY"));
        setTime(moment().format("hh:mm A"));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-85">
                <DialogHeader>
                    <DialogTitle>Security Protocol</DialogTitle>
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
                        disabled={!isSaveEnabled}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
