import NewPoll from "@/components/Resident-Components/Community/NewPoll";
import OwnPoll from "@/components/Resident-Components/Community/OwnPoll";
import PreviousPoll from "@/components/Resident-Components/Community/PreviousPoll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Polls() {
	return (
		<Tabs defaultValue="OwnPoll">
			<TabsList className="grid grid-cols-3 w-[600px]">
				<TabsTrigger value="OwnPoll" className="p-5 rounded-t-xl">
					Own Poll
				</TabsTrigger>
				<TabsTrigger value="NewPoll" className="p-5 rounded-t-xl">
					New Poll
				</TabsTrigger>
				<TabsTrigger value="PreviousPoll" className="p-5 rounded-t-xl">
					Previous Poll
				</TabsTrigger>
			</TabsList>
			<TabsContent value="OwnPoll">
				<OwnPoll />
			</TabsContent>
			<TabsContent value="NewPoll">
				<NewPoll />
			</TabsContent>
			<TabsContent value="PreviousPoll">
				<PreviousPoll />
			</TabsContent>
		</Tabs>
	);
}
