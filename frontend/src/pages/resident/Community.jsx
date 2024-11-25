import Layout from "@/components/Layout";
import Polls from "./Polls";

export default function Community({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Polls />
		</Layout>
	);
}
