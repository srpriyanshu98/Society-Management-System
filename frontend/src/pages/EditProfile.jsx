import Layout from "@/components/Layout";

export default function EditProfile({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="relative w-full overflow-hidden">
				{/* Overlay */}
				<div className="absolute inset-0 bg-blue-200 opacity-50 z-10"></div>

				{/* Image container */}
				<div className="flex items-center justify-between w-full  left-0 z-0">
					<img
						src="./src/assets/background-design-1.svg"
						alt=""
						className="w-1/2 h-auto"
					/>
					<img
						src="./src/assets/background-design-2.svg"
						alt=""
						className="w-1/3 h-auto"
					/>
					<img
						src="./src/assets/background-design-3.svg"
						alt=""
						className="w-1/3 h-auto"
					/>
				</div>
			</div>
		</Layout>
	);
}
