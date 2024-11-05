import BalanceCards from "@/components/dashboard/BalanceCards";
import ImportantNumbers from "@/components/dashboard/ImportantNumbers";
import Layout from "@/components/Layout";

export default function Dashboard({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col p-6  bg-gray-50 h-screen overflow-auto">
				<BalanceCards />
				<div className="flex gap-2 mt-6 ">
					<div className="bg-blue-100 w-full"></div>
					<div className="w-1/2">
						<ImportantNumbers />
					</div>
					<div className="bg-blue-100 w-1/2"></div>
				</div>
			</div>
		</Layout>
	);
}
