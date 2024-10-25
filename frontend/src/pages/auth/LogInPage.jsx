import LoginForm from "@/components/form-control/login";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* Left side - Image */}
			<img
				src="./src/assets/Bright Web.png"
				alt="Illustration"
				className=" absolute top-14 left-40"
			/>
			<div className=" hidden md:block m-auto">
				<img
					src="./src/assets/2.png"
					alt="Illustration"
					className=" z-10 "
				/>
				<img
					src="./src/assets/bg-graphic.png"
					alt=""
					className="absolute top-0 right-0 h-screen -z-10 "
				/>
			</div>

			{/* Right side - Form */}
			<LoginForm />
		</div>
		// <div className="flex flex-row">
		// 	<div className="bg-slate-400 w-[100%]">dsjkgfb</div>
		// 	<div className="w-[100%]">sdf.jkhhoh</div>
		// </div>
	);
}
