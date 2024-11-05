import SignUpForm from "@/components/form-control/signup";
import { useState, useEffect } from "react";

export default function Signup() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slides = [
		{
			image: "./src/assets/1.png",
			title: <p class="font-semibold text-center text-[24px] leading-[36px] text-opacity-0 gap-0">
				Your Space, Your Place: <span class="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-transparent bg-clip-text">
					Society Management
				</span> Made Simple.
			</p>,

		},
		{
			image: "./src/assets/2.png",
			title: <p class="font-semibold text-center text-[24px] leading-[36px] text-opacity-0 gap-0">
				Connect, Collaborate, and Control - <span class="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-transparent bg-clip-text">
					Society Management
				</span> Simplified.
			</p>,
		},
	];
	// Auto-rotate every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === slides.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);
		return () => clearInterval(interval); // Clean up on component unmount
	}, [currentIndex]);
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center relative">
			{/* Left side - Image */}
			<div className="w-full md:w-1/2 bg-transparent md:bg-[#F6F8FB] h-screen flex items-center justify-center p-4 relative">
				<img
					src="./src/assets/Bright Web.png"
					alt="Illustration"
					className="absolute top-14 left-10 md:left-40"
				/>
				<div className="relative max-w-xl mx-auto overflow-hidden">
					<div className="transition-transform duration-900 ease-in-out">
						<div
							className="flex"
							style={{
								transform: `translateX(-${currentIndex * 100}%)`,
								transition: "transform 0.7s ease-in-out",
							}}
						>
							{slides.map((slide, index) => (
								<div key={index} className="w-full flex-shrink-0">
									<img
										src={slide.image}
										alt={slide.title}
										className="w-full h-90 object-cover"
									/>
									<div className="text-center mt-4">
										<h1 className="text-2xl font-bold">
											{slide.title}
										</h1>
										<p className="text-gray-500">
											{slide.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>


				</div>
				{/* Pagination */}
				{/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 top-[770px] flex space-x-2">
					{slides.map((_, index) => (
						<span
							key={index}
							className={`h-2 w-6 rounded-md cursor-pointer transition-all duration-300 ease-in-out 
                ${index === currentIndex ? "bg-orange-600" : "bg-gray-300 hover:bg-orange-300"}`}
							onClick={() => setCurrentIndex(index)}
						></span>
					))}
				</div> */}


			</div>

			{/* Right side - Form */}

			{/* Background Graphic */}
			<img
				src="./src/assets/bg-graphic.png"
				alt="Background Graphic"
				className="absolute top-0 right-0 h-full md:h-screen -z-10"
			/>

			{/* Signup Form */}
			<SignUpForm />

		</div>
	);
}
