import Layout from "@/components/Layout";
import ScurityManagementlogs from "@/components/securitymanagement/scuritymanagementloge";

export default function SecurityManagement({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<ScurityManagementlogs />
		</Layout>
	);
}
