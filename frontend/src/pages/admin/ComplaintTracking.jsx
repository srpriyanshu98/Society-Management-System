import CreateComplaint from "@/components/complaintTracking/CreateComplaint";
import Layout from "@/components/Layout";

export default function ComplaintTracking({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<CreateComplaint />
		</Layout>
	);
}
