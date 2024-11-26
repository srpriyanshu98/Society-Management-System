import Layout from "@/components/Layout";
import Complaint from "@/components/Resident-Components/ServiceAndComplaint/Complaint";
import Request from "@/components/Resident-Components/ServiceAndComplaint/Request";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServiceAndComplaint({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Tabs defaultValue="complaint">
				<TabsList className="grid grid-cols-2 w-[400px]">
					<TabsTrigger value="complaint" className="p-5 rounded-t-xl border-b-orange-500 text-black">
						Complaint Submission
					</TabsTrigger>
					<TabsTrigger value="request" className="p-5 rounded-t-xl border-b-orange-500 text-black">
						Request Submission
					</TabsTrigger>
				</TabsList>
				<TabsContent value="complaint">
					<Complaint />
				</TabsContent>
				<TabsContent value="request">
					<Request />
				</TabsContent>
			</Tabs>
		</Layout>
	);
}
