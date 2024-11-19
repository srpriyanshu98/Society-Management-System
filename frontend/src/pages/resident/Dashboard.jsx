import BalanceCards from "@/components/dashboard/BalanceCards";
import BalanceGraph from "@/components/dashboard/BalanceGraph";
import ComplaintList from "@/components/dashboard/ComplaintList";
import ImportantNumbers from "@/components/dashboard/ImportantNumbers";
import PendingMaintenance from "@/components/dashboard/PendingMaintenance";
import UpcomingActivity from "@/components/dashboard/UpcomingActivity";
import Layout from "@/components/Layout";

export default function Dashboard({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col h-full overflow-auto">
				<BalanceCards />
				<div className="flex gap-4 mt-6">
					<div className="w-full">
						<BalanceGraph />
					</div>
					<div className="w-1/2">
						<ImportantNumbers />
					</div>
					<div className="w-1/2">
						<PendingMaintenance />
					</div>
				</div>
				<div className="flex gap-4 mt-6">
					<div className="w-full">
						<ComplaintList />
					</div>
					<div>
						<UpcomingActivity />
					</div>
				</div>
			</div>
		</Layout>
	);
}
