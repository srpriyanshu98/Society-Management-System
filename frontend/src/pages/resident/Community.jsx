import Layout from "@/components/Layout";
import ChatCard from "@/components/Resident-Components/Community/AccessForums/ChatCard";

export default function Community({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<div className="flex flex-col">
				<div>
					<ChatCard />
				</div>
			</div>
		</Layout>
	);
}
