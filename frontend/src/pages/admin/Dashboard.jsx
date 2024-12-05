import BalanceCards from "@/components/dashboard/BalanceCards";
import BalanceGraph from "@/components/dashboard/BalanceGraph";
import ComplaintList from "@/components/dashboard/ComplaintList";
// import BalanceGraph from "@/components/dashboard/BalanceGraph";
import ImportantNumbers from "@/components/dashboard/ImportantNumbers";
import PendingMaintenance from "@/components/dashboard/PendingMaintenance";
import UpcomingActivity from "@/components/dashboard/UpcomingActivity";
import Layout from "@/components/Layout";

export default function Dashboard({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col h-full overflow-auto">
				<BalanceCards />
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
					<div className="lg:col-span-2 md:col-span-2">
						<BalanceGraph />
					</div>
					<div className="lg:col-span-1 md:col-span-2">
						<ImportantNumbers />
					</div>
					<div className="lg:col-span-1 md:col-span-1">
						<PendingMaintenance />
					</div>
				</div>
				<div className="grid md:grid-cols-[auto_1fr] gap-4 mt-6">
					<div className="grid-cols-1">
						<ComplaintList />
					</div>
					<div className="grid-cols-1">
						<UpcomingActivity />
					</div>
				</div>
			</div>
		</Layout>
	);
}
