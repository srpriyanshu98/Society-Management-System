import { SelectItem } from "@radix-ui/react-select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Society from "./society";

export default function SignUpForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};
	return (
		<Card className="max-w-[630px] md:w-1/2 m-auto shadow-md p-6 rounded-2xl ">
			<CardHeader>
				<CardTitle className="text-4xl font-bold ">
					Registration
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* First Name & Last Name */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="firstName" className="text-sm">
								First Name{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								placeholder="first name"
								className="rounded-xl w-64 "
							/>
						</div>
						<div>
							<Label htmlFor="lastName">
								Last Name{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								placeholder="last name"
								className="rounded-xl  w-64"
							/>
						</div>
					</div>

					{/* Email & Phone number */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="email">
								Email Address{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								type="email"
								placeholder="email"
								className="rounded-xl w-64"
							/>
						</div>
						<div>
							<Label htmlFor="phone">
								Phone Number{" "}
								<span className="text-red-500">*</span>
							</Label>
							<Input
								type="tel"
								placeholder="91+"
								className="rounded-xl w-64"
							/>
						</div>
					</div>

					{/* Country & State */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="country">
								Country <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								placeholder="country"
								className="rounded-xl"
							/>
						</div>
						<div>
							<Label htmlFor="state">
								State <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								placeholder="state"
								className="rounded-xl"
							/>
						</div>
						<div>
							<Label htmlFor="state">
								City <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								placeholder="city"
								className="rounded-xl"
							/>
						</div>
					</div>

					{/* Select Society */}
					<div>
						<Label htmlFor="society">
							Select Society{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Select defaultValue="">
							<SelectTrigger>
								<SelectValue
									placeholder="select society"
									className="rounded-xl"
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>

								{/* Create Society */}
								<Dialog>
									<DialogTrigger className="w-full bg-gradient-to-r  from-orange-600 to-orange-400 h-[51px] rounded-md text-white">
										Create Society
									</DialogTrigger>
									<DialogContent>
										<Society />
									</DialogContent>
								</Dialog>
							</SelectContent>
						</Select>
					</div>

					{/* Password */}
					<div>
						<Label htmlFor="password">
							Password <span className="text-red-500">*</span>
						</Label>
						<Input
							type="password"
							placeholder="password"
							className="rounded-xl"
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<Label htmlFor="confirmPassword">
							Confirm Password{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Input
							type="password"
							placeholder="confirm password"
							className="rounded-xl"
						/>
					</div>

					{/* Terms & Conditions */}
					<div className="flex items-center">
						<Checkbox />
						<Label htmlFor="terms" className="ml-2">
							I agree to all the Terms and{" "}
							<span className="text-orange-500">
								Privacy Policies.
							</span>
						</Label>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full bg-gradient-to-r  from-orange-600 to-orange-400 h-[51px]"
					>
						Register
					</Button>
				</form>

				{/* Already have an account */}
				<div className="text-center mt-4">
					<p>
						Already have an account?{" "}
						<Link to="/login" className="text-orange-500">
							Login
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
