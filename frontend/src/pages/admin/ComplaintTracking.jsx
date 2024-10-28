import Layout from "@/components/Layout";

export default function ComplaintTracking({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col p-6  bg-gray-50 h-screen overflow-auto">
				<h1 className="text-2xl font-bold">
					Welcome to the Complaint Tracking
				</h1>
				<p>This is the main workspace area.</p>
				{/* Other components or routes can be rendered here */}
				<div>
					<img src="./src/assets/1.png" alt="" />
				</div>
			</div>
		</Layout>
	);
}
