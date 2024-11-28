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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import axiosInstance from "@/test/axiosInstance"; // Adjust the path accordingly

export default function PasswordDialog({ isOpen, onClose, onSubmit }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handlePasswordSubmit = async () => {
        try {
            const response = await axiosInstance.post(
                "/auth/validate-password",
                { password }
            );
            if (response.status === 200) {
                setError("");
                setPassword("");
                onSubmit();
                onClose();
            }
        } catch (error) {
            console.error("Password validation error:", error.response);
            setError("Incorrect password. Please try again.");
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-70">
                <DialogHeader>
                    <DialogTitle>Set Maintenance</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="flex flex-col space-y-4">
                    <Label>
                        Password<span className="text-[#E74C3C]">*</span>
                    </Label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password type
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}{" "}
                            {/* Eye icon toggle */}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-40"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handlePasswordSubmit} className="w-40">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
