import Layout from "@/components/Layout";
import VisitorTracking from "@/components/SecurityComponents/visitortracking";

export default function VisitortrackingScreen({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<VisitorTracking />
		</Layout>
	);
}