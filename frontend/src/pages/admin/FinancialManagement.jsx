import MaintenanceTabs from "@/components/financialManagement/MaintenanceTabs";
import SetMaintenance from "@/components/financialManagement/SetMaintenance";
import Layout from "@/components/Layout";

export default function FinancialManagement({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col">
				<SetMaintenance />
			</div>
			<div className="mt-6">
				<MaintenanceTabs />
			</div>
		</Layout>
	);
}
