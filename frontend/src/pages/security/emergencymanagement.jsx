import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { useState } from "react";

export default function EmergencyManagement({ userRole }) {
    const [alertType, setAlertType] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({}); // State for error messages

    const validateForm = () => {
        const newErrors = {};
        if (!alertType) {
            newErrors.alertType = "Alert type is required.";
        }
        if (!description.trim()) {
            newErrors.description = "Description is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Form is valid if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // If form is valid, proceed with form submission
            console.log('Alert Type:', alertType);
            console.log('Description:', description);
        }
    };

    // Determine if the Submit button should be enabled
    const isSubmitDisabled = !alertType || !description.trim();

    return (
        <Layout userRole={userRole}>
            <div className="flex justify-center items-center relative top-52">
                <div className="bg-white rounded-lg shadow-md p-10 w-2/6">
                    <h2 className="text-2xl font-semibold mb-2">Alert</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="alertType" className="block text-sm font-medium text-gray-800">
                                Alert Type<span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={alertType}
                                onValueChange={(value) => setAlertType(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Alert" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fire">Fire</SelectItem>
                                    <SelectItem value="Medical">Medical</SelectItem>
                                    <SelectItem value="Security">Security</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.alertType && (
                                <p className="text-red-500 text-sm">{errors.alertType}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-800">
                                Description<span className="text-red-500">*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-gray-100 focus:border-orange-500 sm:text-sm rounded-md"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="font-bold py-2 px-4 w-full rounded"
                            disabled={isSubmitDisabled} // Disable the button if form is invalid
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
