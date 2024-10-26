import { useState, useEffect } from "react";

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slides = [
		{
			image: "./src/assets/1.png",
			title: "Slide Title 1",
			description: "This is the description for slide 1.",
		},
		{
			image: "./src/assets/2.png",
			title: "Slide Title 2",
			description: "This is the description for slide 2.",
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
		<div className="relative max-w-xl mx-auto overflow-hidden">
			<div className="transition-transform duration-700 ease-in-out">
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
								className="w-full h-64 object-cover"
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

			{/* Pagination */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{slides.map((_, index) => (
					<span
						key={index}
						className={`h-3 w-3 rounded-full cursor-pointer ${
							index === currentIndex
								? "bg-gray-900"
								: "bg-gray-300"
						}`}
						onClick={() => setCurrentIndex(index)}
					></span>
				))}
			</div>
		</div>
	);
};

export default Slider;
