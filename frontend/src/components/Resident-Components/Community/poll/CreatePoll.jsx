import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreatePollDialog({ isOpen, onOpenChange, onSubmit }) {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [pollType, setPollType] = useState("multichoice");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPoll = {
            question,
            options: options.filter((option) => option.trim() !== ""), 
            createdBy: "User", 
        };
        onSubmit(newPoll);
        onOpenChange(false);

        setQuestion("");
        setOptions(["", ""]);
        setPollType("multichoice");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Polls</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Poll Type */}
                        <div>
                            <Label className="text-sm font-medium">
                                Polls <span className="text-red-500">*</span>
                            </Label>
                            <RadioGroup
                                className="space-y-2 mt-2"
                                defaultValue="multichoice"
                                onValueChange={setPollType}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="multichoice"
                                        id="multichoice"
                                    />
                                    <Label htmlFor="multichoice">
                                        Multichoice polls
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="ranking"
                                        id="ranking"
                                    />
                                    <Label htmlFor="ranking">
                                        Ranking polls
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="rating"
                                        id="rating"
                                    />
                                    <Label htmlFor="rating">Rating polls</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="numeric"
                                        id="numeric"
                                    />
                                    <Label htmlFor="numeric">
                                        Numeric polls
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="text" id="text" />
                                    <Label htmlFor="text">Text polls</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Question */}
                        <div>
                            <Label
                                htmlFor="question"
                                className="text-sm font-medium"
                            >
                                Question <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="question"
                                placeholder="Ask a question"
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="mt-2"
                            />
                        </div>

                        {/* Options */}
                        <div>
                            <Label className="text-sm font-medium">
                                Options <span className="text-red-500">*</span>
                            </Label>
                            <div className="space-y-2 mt-2">
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                    >
                                        <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            type="text"
                                            onChange={(e) => {
                                                const newOptions = [...options];
                                                newOptions[index] =
                                                    e.target.value;
                                                setOptions(newOptions);
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const newOptions = [...options];
                                                newOptions.splice(index, 1);
                                                setOptions(newOptions);
                                            }}
                                            className="text-sm text-red-600 hover:text-red-500"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => setOptions([...options, ""])}
                                    className="text-sm text-indigo-600 hover:text-indigo-500"
                                >
                                    Add Option
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="mt-4">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
