import SignUpForm from "@/components/form-control/signup";

export default function Signup() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* Left side - Image */}
			<div className="w-full md:w-1/2 bg-transparent md:bg-[#F6F8FB] h-screen flex items-center justify-center p-4 relative">
				{/* Logo */}
				<img
					src="./src/assets/Bright Web.png"
					alt="Logo"
					className="absolute top-14 left-10 md:left-40"
				/>
				
				{/* Left side - Illustration Image (hidden on lg screens) */}
				<div className="hidden md:block sm:hidden m-auto relative">
					<img
						src="./src/assets/1.png"
						alt="Illustration"
						className="z-10"
					/>
				</div>
			</div>

			{/* Right side - Form */}
			<div className="w-full md:w-1/2 h-screen flex items-start md:items-start justify-center p-4 relative">
				{/* Background Graphic */}
				<img
					src="./src/assets/bg-graphic.png"
					alt="Background Graphic"
					className="absolute top-0 right-0 h-full md:h-screen -z-10"
				/>
				
				{/* Signup Form */}
				<SignUpForm />
			</div>
		</div>
	);
}
