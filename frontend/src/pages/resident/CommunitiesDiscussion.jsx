import Layout from "@/components/Layout";
import AskQuestionForm from "@/components/Resident-Components/Community/communitiesDiscussion/AskQuestionForm";
import CommunityChat from "@/components/Resident-Components/Community/communitiesDiscussion/CommunitiChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { chatData } from "@/data/Chat/ChatData";
import { MoreVertical, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CommunitiesDiscussion({ userRole }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);
	const [filteredChatData, setFilteredChatData] = useState([]);
	const [selectedChat, setSelectedChat] = useState(null);
	const [askQuestionMode, setAskQuestionMode] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setFilteredChatData(chatData);
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		const filtered = chatData.filter((chat) =>
			chat.name.toLowerCase().includes(query)
		);
		setFilteredChatData(filtered);
	};

	const handleChatClick = (chat) => {
		setSelectedChat(chat);
	};

	const handleAskQuestion = () => {
		setAskQuestionMode(true);
	};

	const handleSubmitQuestion = (question) => {
		const newQuestion = {
			id: questions.length + 1,
			title: question,
			description: [],
			votes: 0,
			answers: [],
			views: 0,
		};
		setQuestions([...questions, newQuestion]);
		setAskQuestionMode(false);
	};

	const handleCancelQuestion = () => {
		setAskQuestionMode(false);
	};

	// const handleAddAnswer = (questionId, answer) => {
	// 	const updatedQuestions = questions.map((question) => {
	// 		if (question.id === questionId) {
	// 			return {
	// 				...question,
	// 				answers: [...question.answers, answer],
	// 			};
	// 		}
	// 		return question;
	// 	});
	// 	setQuestions(updatedQuestions);
	// };

	return (
		<Layout userRole={userRole}>
			<div className="flex h-full">
				<Card className="w-96">
					<CardHeader>
						<CardTitle>Chat</CardTitle>
						<CardDescription className="relative">
							<Input
								type="text"
								placeholder="Search Here"
								value={searchQuery}
								onChange={handleSearch}
								className="bg-slate-100 rounded-lg pl-10 pr-4 py-2 w-11/12 ms-3 mt-3 focus:ring-1 transition-all duration-300 ease-in-out"
							/>
							<span className="absolute top-5 left-5">
								<Search />
							</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea className="max-h-[651px] overflow-y-auto custom-scrollbar">
							{loading ? (
								<div>
									<Skeleton />
								</div>
							) : (
								<div className="space-y-3 mt-3">
									{filteredChatData.length > 0 ? (
										filteredChatData.map((chat) => (
											<div
												key={chat.name}
												onClick={() =>
													handleChatClick(chat)
												}
												className={`flex items-center p-2 bg-white cursor-pointer hover:bg-blue-100 ${
													selectedChat?.name ===
													chat.name
														? "bg-slate-200"
														: ""
												}`}
											>
												<div className="relative">
													<Avatar className="w-12 h-12">
														<AvatarImage
															src="https://github.com/shadcn.png"
															alt={chat.name}
														/>
														<AvatarFallback>
															CN
														</AvatarFallback>
													</Avatar>
													{/* Indicator */}
													<div className="absolute -top-1 -right-0 w-5 h-5 bg-slate-500 border-4 border-white rounded-full z-10"></div>
												</div>

												<div className="flex-1 ml-5">
													<h3 className="text-lg font-semibold">
														{chat.name}
													</h3>
													<p className="text-slate-500">
														{chat.lastMessage}
													</p>
												</div>
												<div>
													<div className="text-slate-500 text-sm">
														{chat.time}
													</div>
													<div>
														{chat.unread && (
															<div className="bg-blue-500 text-white rounded-full h-5 w-5 text-center ml-4">
																7
															</div>
														)}
													</div>
												</div>
											</div>
										))
									) : (
										<p className="text-gray-500">
											No chats found
										</p>
									)}
								</div>
							)}
						</ScrollArea>
					</CardContent>
				</Card>
				<Card className="flex-grow">
					<CardHeader className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-5">
						<Avatar className="w-12 h-12">
							<AvatarImage
								src="https://github.com/shadcn.png"
								alt={
									selectedChat
										? selectedChat.name
										: "Select a Chat"
								}
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle>
								{selectedChat
									? selectedChat.name
									: "Select a Chat"}
							</CardTitle>
							{selectedChat && (
								<span className="text-slate-500 text-xs">
									{selectedChat.time}
								</span>
							)}
						</div>
						<Button onClick={handleAskQuestion}>
							Ask Question
						</Button>
						<span className="bg-slate-300 rounded-full p-1">
							<MoreVertical />
						</span>
					</CardHeader>
					<CardContent className="bg-gray-100">
						{askQuestionMode ? (
							<AskQuestionForm
								onSubmit={handleSubmitQuestion}
								onCancel={handleCancelQuestion}
							/>
						) : (
							<CommunityChat newQuestions={questions} />
						)}
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
}
