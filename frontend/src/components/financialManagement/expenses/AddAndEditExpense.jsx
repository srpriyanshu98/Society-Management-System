import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import moment from "moment";

export default function AddAndEditExpense({
    isOpen,
    onClose,
    onAddExpense,
    onEditExpense,
    mode = "add",
    expense = null,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [billFile, setBillFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (mode === "edit" && expense) {
            setTitle(expense.title);
            setDescription(expense.description);
            const parsedDate = new Date(expense.date);
            setDate(isValid(parsedDate) ? parsedDate : new Date());
            setAmount(expense.amount.toString());
            setBillFile(expense.billFile);
        } else {
            clearForm();
        }
    }, [mode, expense]);

    useEffect(() => {
        setIsButtonDisabled(
            !title || !description || !amount || !billFile || !!fileError
        );
    }, [title, description, amount, billFile, fileError]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024; // in MB
            const fileType = file.type;

            if (fileSize > 10) {
                setFileError("File size exceeds 10 MB");
                setBillFile(null);
            } else if (
                !["application/pdf", "image/jpeg", "image/png"].includes(
                    fileType
                )
            ) {
                setFileError(
                    "Invalid file type. Only PDF, JPEG, and PNG are allowed."
                );
                setBillFile(null);
            } else {
                setFileError("");
                setBillFile(file);
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!title) errors.title = "Title is required";
        if (!description) errors.description = "Description is required";
        if (!amount) errors.amount = "Amount is required";
        if (!billFile) errors.billFile = "Bill file is required";
        return errors;
    };

    const handleSubmit = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const newExpense = {
            title,
            description,
            date: moment(date).format("YYYY-MM-DD"), // Format date using moment.js without time
            amount: parseFloat(amount),
            billFile,
        };

        if (mode === "add") {
            onAddExpense(newExpense);
        } else if (mode === "edit") {
            onEditExpense(newExpense);
        }

        clearForm();
        onClose();
    };

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setDate(new Date());
        setAmount("");
        setBillFile(null);
        setFileError("");
        setFormErrors({});
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-6 rounded-xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" ? "Add New Expense" : "Edit Expense"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="text-sm font-medium">Title<span className="text-red-500">*</span></label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"
                            required
                        />
                        {formErrors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.title}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                            required
                        />
                        {formErrors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.description}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">Date<span className="text-red-500">*</span></label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={
                                            "w-full pl-3 text-left font-normal" +
                                            (!date
                                                ? " text-muted-foreground"
                                                : "")
                                        }
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
                        <div>
                            <label className="text-sm font-medium">
                                Amount<span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0000"
                                required
                            />
                            {formErrors.amount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.amount}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Upload Bill<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                accept="application/pdf,image/jpeg,image/png"
                                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                required
                            />
                            <div className="border border-gray-300 rounded-md p-4 text-center cursor-pointer">
                                {!billFile ? (
                                    <>
                                        <p className="text-gray-500">
                                            Upload a file or drag and drop
                                        </p>
                                        <p className="text-gray-500">
                                            PNG, JPG, PDF up to 10MB
                                        </p>
                                    </>
                                ) : (
                                    <span className="text-gray-500 text-sm mt-1 block">
                                        {billFile.name} (
                                        {Math.round(billFile.size / 1024)} KB)
                                    </span>
                                )}
                            </div>
                        </div>
                        {fileError && (
                            <p className="text-red-500 text-sm mt-1">
                                {fileError}
                            </p>
                        )}
                        {formErrors.billFile && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.billFile}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                        disabled={isButtonDisabled}
                    >
                        {mode === "add" ? "Save" : "Update"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
