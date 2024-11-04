import Society from "@/components/form-control/society";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Sellect() {
	return (
		<Select defaultValue="">
			<SelectTrigger>
				<SelectValue
					placeholder="Select society"
					className="rounded-xl"
				></SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="light">Light</SelectItem>
					<SelectItem value="dark">Dark</SelectItem>
					<SelectItem value="system">System</SelectItem>
				</SelectGroup>

				{/* Create Society */}
				<Dialog>
					<DialogTrigger className="w-full bg-gradient-to-r from-orange-600 to-orange-400 h-[51px] rounded-md text-white">
						Create Society
					</DialogTrigger>
					<DialogContent>
						<Society />
					</DialogContent>
				</Dialog>
			</SelectContent>
		</Select>
	);
}
