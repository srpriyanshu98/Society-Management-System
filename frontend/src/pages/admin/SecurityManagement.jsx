import Layout from "@/components/Layout";
import ScurityManagementlogs from "@/components/securitymanagement/scuritymanagementloge";


export default function SecurityManagement({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col h-full overflow-auto">
				<div>
					<ScurityManagementlogs />
				</div>
			</div>
		</Layout>
	);
}
