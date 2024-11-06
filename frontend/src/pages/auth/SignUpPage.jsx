import SignUpForm from "@/components/form-control/signup";

export default function Signup() {
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* LOGO */}
			<img
				src="./src/assets/Bright Web.png"
				alt="Illustration"
				className=" absolute top-14 left-40"
			/>
			{/* Left side - Image */}
			<div className=" hidden md:block m-auto ">
				<img
					src="./src/assets/1.png"
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
			<SignUpForm />
		</div>
	);
}
