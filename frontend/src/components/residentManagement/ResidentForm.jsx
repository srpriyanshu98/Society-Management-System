import Layout from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ResidentDetail from "./ResidentDetail";
import MembersCounting from "./MembersCounting";
import VehicleCounting from "./VehicleCounting";
import OwnerDetail from "./OwnerDetail";

export default function ResidentForm({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Tabs defaultValue="owner">
				<TabsList className="grid grid-cols-2 w-[400px]">
					<TabsTrigger value="owner">Owner</TabsTrigger>
					<TabsTrigger value="tenant">Tenant</TabsTrigger>
				</TabsList>
				{/* Owner Form */}
				<TabsContent value="owner">
					<ResidentDetail />

					{/* Members Counting */}
					<MembersCounting />

					{/* Vehicle Counting */}
					<VehicleCounting />
				</TabsContent>

				<TabsContent value="tenant">
					<OwnerDetail />

					<ResidentDetail />

					{/* Members Counting */}
					<MembersCounting />

					{/* Vehicle Counting */}
					<VehicleCounting />
				</TabsContent>
			</Tabs>
		</Layout>
	);
}
