import Layout from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ResidentDetail from "./ResidentDetail";
import MembersCounting from "./MembersCounting";
import VehicleCounting from "./VehicleCounting";

export default function ResidentForm({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Tabs defaultValue="account">
				<TabsList className="grid grid-cols-2 w-[400px]">
					<TabsTrigger value="owner">Owner</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent value="owner">
					<ResidentDetail />
				</TabsContent>

				{/* Members Counting */}
				<TabsContent value="owner">
					<MembersCounting />
				</TabsContent>

				{/* Vehicle Counting */}
				<TabsContent value="owner">
					<VehicleCounting />
				</TabsContent>
			</Tabs>
		</Layout>
	);
}
