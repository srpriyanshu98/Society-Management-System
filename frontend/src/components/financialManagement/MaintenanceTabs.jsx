import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MaintenanceDetails } from "./MaintenanceDetails";
import OtherIncome from "./OtherIncome";

export default function MaintenanceTabs() {
	// const fetchData = async () => {
	// Placeholder function for future API call
	// const response = await fetch("API_URL");
	// const data = await response.json();
	// return data;
	// };

	return (
		<Tabs defaultValue="maintenance">
			<TabsList className="grid grid-cols-2 w-[400px]">
				<TabsTrigger value="maintenance" className="p-5 rounded-t-xl">
					Maintenance
				</TabsTrigger>
				<TabsTrigger value="otherincome" className="p-5 rounded-t-xl">
					Other Income
				</TabsTrigger>
			</TabsList>
			<TabsContent value="maintenance">
				<MaintenanceDetails />
			</TabsContent>
			<TabsContent value="otherincome">
				<OtherIncome />
			</TabsContent>
		</Tabs>
	);
}
