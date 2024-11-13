import CreateRequest from "@/components/complaintTracking/CreateRequest";
import Layout from "@/components/Layout";

export default function RequestTracking({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<CreateRequest />
		</Layout>
	);
}
