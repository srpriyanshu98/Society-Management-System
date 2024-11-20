import Layout from "@/components/Layout";
import Owner from "@/components/Resident-Components/PersonalDetail/Owner";
import Tenant from "@/components/Resident-Components/PersonalDetail/Tenant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PersonalDetail({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Tabs defaultValue="owner">
				<TabsList className="grid grid-cols-2 w-[400px]">
					<TabsTrigger value="owner" className="p-5 rounded-t-xl">
						Owner
					</TabsTrigger>
					<TabsTrigger value="tenant" className="p-5 rounded-t-xl">
						Tenant
					</TabsTrigger>
				</TabsList>
				<TabsContent value="owner">
					<Owner />
				</TabsContent>
				<TabsContent value="tenant">
					<Tenant />
				</TabsContent>
			</Tabs>
		</Layout>
	);
}
