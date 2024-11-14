import Layout from "@/components/Layout";
import SecurityProtocols from "@/components/securitymanagement/securityprotocols";

export default function SecurityRuls({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<SecurityProtocols />
		</Layout>
	);
}
