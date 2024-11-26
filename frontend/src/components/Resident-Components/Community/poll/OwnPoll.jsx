import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreatePollDialog from "./CreatePoll";
import { pollData } from "@/data/PersonalDetail/pollData";

export default function OwnPoll() {
	const [polls, setPolls] = useState(pollData);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [votedPolls, setVotedPolls] = useState({});

	const handleVote = (pollId, optionLabel) => {
		setPolls((prevPolls) =>
			prevPolls.map((poll) => {
				if (poll.id === pollId) {
					const previousVote = votedPolls[pollId];
					const newOptions = poll.options.map((option) => {
						if (option.label === previousVote) {
							return { ...option, votes: option.votes - 1 };
						}
						if (option.label === optionLabel) {
							return { ...option, votes: option.votes + 1 };
						}
						return option;
					});

					const totalVotesAdjustment = previousVote ? 0 : 1;

					return {
						...poll,
						options: newOptions,
						totalVotes: poll.totalVotes + totalVotesAdjustment,
					};
				}
				return poll;
			})
		);

		setVotedPolls((prevVotedPolls) => ({
			...prevVotedPolls,
			[pollId]: optionLabel,
		}));
	};

	const handleCreatePoll = (newPoll) => {
		setPolls((prevPolls) => [...prevPolls, newPoll]);
	};

	return (
		<Card>
			<CardHeader className="grid grid-cols-2 items-center">
				<CardTitle>Polls</CardTitle>
				<Button
					className="flex items-center space-x-2 justify-self-end"
					onClick={() => setIsDialogOpen(true)}
				>
					<span>Create Poll</span>
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{polls.map((poll) => (
						<Card key={poll.id} className="shadow rounded-lg p-4">
							{/* Header Section */}
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2">
									<Avatar className="w-10 h-10">
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt={poll.author}
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="text-lg font-bold">
											{poll.author}
										</h3>
										<span className="text-sm text-gray-500">
											{poll.type}
										</span>
									</div>
								</div>
								<span className="bg-blue-300 text-sm px-2 py-1 rounded-full grid grid-cols-2 gap-1 items-center space-x-1 text-white">
									<div>
										<Eye />
									</div>
									<span>20</span>
								</span>
							</div>

							<Separator />

							{/* Question Section */}
							<div className="my-4">
								<p className="text-sm font-medium mb-5">
									{poll.question}
								</p>
								<form className="space-y-4">
									{poll.options.map((option) => {
										const percentage = Math.round(
											(option.votes / poll.totalVotes) *
												100
										);
										return (
											<div
												key={option.label}
												className="space-y-2"
											>
												<div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
													<label className="space-x-2">
														<input
															type="radio"
															name={`poll-${poll.id}`}
															onChange={() =>
																handleVote(
																	poll.id,
																	option.label
																)
															}
															className="radio"
															checked={
																votedPolls[
																	poll.id
																] ===
																option.label
															}
														/>
														<span className="text-sm">
															{option.label}
														</span>
													</label>
													<div className="grid grid-cols-2 -space-x-2">
														<Avatar className="w-5 h-5 border border-white">
															<AvatarImage src="https://github.com/shadcn.png" />
															<AvatarFallback>
																CN
															</AvatarFallback>
														</Avatar>
														<Avatar className="w-5 h-5 border border-white">
															<AvatarImage src="https://github.com/shadcn.png" />
															<AvatarFallback>
																CN
															</AvatarFallback>
														</Avatar>
													</div>
													<div className="text-xs text-gray-600">
														{option.votes}
													</div>
												</div>
												<div className="">
													<Progress
														value={percentage}
														color={
															percentage >= 50
																? "green"
																: "red"
														}
														className="w-full h-2"
													/>
												</div>
											</div>
										);
									})}
								</form>
							</div>

							<Separator />

							<CardFooter className="pt-4">
								<div className="text-xs text-gray-400">
									{poll.date} {poll.time}
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</CardContent>
			<CreatePollDialog
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onSubmit={handleCreatePoll}
			/>
		</Card>
	);
}