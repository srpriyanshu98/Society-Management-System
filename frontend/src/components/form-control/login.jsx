import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";

export default function LoginForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};
	return (
		<Card className="max-w-[630px] md:w-1/2 m-auto shadow-md p-6 rounded-2xl ">
			<CardHeader>
				<CardTitle className="text-4xl font-bold ">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email & Phone number */}
					<div>
						<Label htmlFor="email">
							Email or Phone{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Input
							type="email"
							placeholder="email"
							className="rounded-xl"
						/>
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

					{/* //TODO : SET FORGET PASSWORD AT THE END */}
					<div className="grid grid-cols-1 md:grid-cols-2 ">
						{/* remember me */}
						<div>
							<Checkbox />
							<Label htmlFor="terms" className="ml-2">
								remember me
							</Label>
						</div>
						<div>
							<Label htmlFor="password">
								<Link to="/forgot-pass">Forgot Password ?</Link>
							</Label>
						</div>
					</div>
					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full bg-gradient-to-r  from-orange-600 to-orange-400 h-[51px]"
					>
						Sign In
					</Button>
				</form>

				{/* Already have an account */}
				<div className="text-center mt-4">
					<p>
						Already have an account?{" "}
						<Link to="/signup" className="text-orange-500">
							Sign Up
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
