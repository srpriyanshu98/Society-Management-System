import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axiosInstance from "../../test/axiosInstance";
import { useAuth } from "@/hooks/useAuth";

function PasswordInput({ placeholder, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="rounded-xl pr-10"
                value={value}
                onChange={onChange}
            />
            <div
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            >
                {showPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                ) : (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                )}
            </div>
        </div>
    );
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isChecked, setIsChecked] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "Email or phone is required.";
            valid = false;
        }
        if (!password) {
            newErrors.password = "Password is required.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axiosInstance.post("/auth/login", {
                    email,
                    password,
                });
                console.log("Login successful", response.data);
                localStorage.setItem("token", response.data.token);
                login();
                navigate("/", { replace: true });
            } catch (error) {
                console.error("Login failed", error);
                setLoginError("Invalid credentials. Please try again.");
            }
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <Card className="max-w-[90%] md:max-w-[630px] lg:w-1/2 m-auto shadow-md p-4 md:p-6 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-3xl md:text-4xl text-center md:text-left font-semibold font-poppins">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">
                            Email or Phone{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder="Enter your email or phone"
                            className="rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">
                            Password <span className="text-red-500">*</span>
                        </Label>
                        <PasswordInput
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <Label htmlFor="terms" className="ml-2">
                                Remember me
                            </Label>
                        </div>

                        <div className="text-right md:text-right">
                            <Link to="/forgot-pass" className="text-orange-500">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 md:h-[51px] mt-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300"
                        disabled={!isChecked}
                    >
                        Sign In
                    </Button>

                    {loginError && (
                        <p className="text-red-500 text-sm">{loginError}</p>
                    )}
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm md:text-base">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-orange-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
