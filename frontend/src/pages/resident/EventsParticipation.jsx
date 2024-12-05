import Layout from "@/components/Layout";
import Activity from "@/components/Resident-Components/EventsParticipation/Activity";
import Events from "@/components/Resident-Components/EventsParticipation/Events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventsParticipation({ userRole }) {
	return (
		<Layout userRole={userRole}>
			<Tabs defaultValue="events">
				<TabsList className="grid grid-cols-2 w-[290px] md:w-[400px]">
					<TabsTrigger value="events" className="p-5 rounded-t-xl border-b-orange-500 text-black w-36 md:w-[200px] text-xs md:text-sm">
						Events Participate
					</TabsTrigger>
					<TabsTrigger value="activity" className="p-5 rounded-t-xl border-b-orange-500 text-black w-36 md:w-[200px] text-xs md:text-sm">
						Activity Participate
					</TabsTrigger>
				</TabsList>
				<TabsContent value="events">
					<Events />
				</TabsContent>
				<TabsContent value="activity">
					<Activity />
				</TabsContent>
			</Tabs>
		</Layout>
	);
}
