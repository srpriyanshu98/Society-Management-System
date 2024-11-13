import Layout from "@/components/Layout";
import ScurityManagementlogs from "@/components/securitymanagement/scuritymanagementloge";
import SecurityProtocols from "@/components/securitymanagement/securityprotocols";


export default function SecurityManagement({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col h-full overflow-auto">
				<div>
					<ScurityManagementlogs />
				</div>
			</div>
				<div>
					<SecurityProtocols />
				</div>
		</Layout>
	);
}
