import LoginForm from "@/components/form-control/login";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* Left side - Image */}
			<div className="w-full md:w-1/2 bg-transparent md:bg-[#F6F8FB] h-screen flex items-center justify-center p-4 relative">
				<img
					src="./src/assets/Bright Web.png"
					alt="Illustration"
					className="absolute top-14 left-10 md:left-40"
				/>
				<div className="hidden md:block m-auto relative">
					<img
						src="./src/assets/2.png"
						alt="Illustration"
						className="z-10"
					/>
				</div>
			</div>
	  
			{/* Right side - Form */}
			<div className="w-full md:w-1/2 h-screen flex items-start md:items-start justify-center p-4 relative">
				<img
					src="./src/assets/bg-graphic.png"
					alt=""
					className="absolute top-0 right-0 h-full md:h-screen -z-10"
				/>
				<LoginForm />
			</div>
		</div>
	);
}
