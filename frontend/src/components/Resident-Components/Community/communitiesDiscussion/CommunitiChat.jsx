import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { questions as staticQuestions } from "@/data/PersonalDetail/questions";

export default function CommunityChat({ newQuestions }) {
	const [loading, setLoading] = useState(true);
	const [isQuestions, setQuestions] = useState([]);

	useEffect(() => {
		const combinedQuestions = [...staticQuestions, ...newQuestions];
		const questionsWithAnswersAndDescriptionAsArray = combinedQuestions.map(
			(question) => ({
				...question,
				answers: Array.isArray(question.answers)
					? question.answers
					: [],
				description: Array.isArray(question.description)
					? question.description
					: [question.description].filter(Boolean),
			})
		);
		const timer = setTimeout(() => {
			setQuestions(questionsWithAnswersAndDescriptionAsArray);
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [newQuestions]);

	return (
		<CardContent className="p-0">
			<ScrollArea className="max-h-[725px] overflow-y-auto custom-scrollbar p-4">
				{loading ? (
					<div className="text-center py-6 text-gray-500">
						Loading...
					</div>
				) : (
					<div className="space-y-4 w-[68rem]">
						{isQuestions.map((question) => {
							const validDescriptions =
								question.description.filter(
									(desc) => typeof desc === "string"
								);
							const descriptionCount = validDescriptions.length;

							return (
								<div
									key={question.id}
									className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 rounded-xl shadow-md  bg-slate-200"
								>
									<div className="text-sm">
										<div
											className={`font-medium ${
												question.votes > 0
													? "text-green-600"
													: "text-gray-500"
											}`}
										>
											{question.votes} Votes
										</div>
										<div
											className={`font-medium ${
												question.answers.length > 0 ||
												descriptionCount > 0
													? "text-blue-600"
													: "text-gray-500"
											}`}
										>
											{question.answers.length +
												descriptionCount}{" "}
											Answers
										</div>
									</div>
									<div>
										<h2 className="text-base font-semibold text-gray-800">
											{question.title}
										</h2>
										{descriptionCount > 0 && (
											<div className="mt-2">
												{validDescriptions.map(
													(desc, index) => (
														<p
															key={index}
															className="text-sm text-gray-600"
														>
															{index === 0
																? ""
																: "• "}
															{desc}
														</p>
													)
												)}
											</div>
										)}
										{question.answers.length === 0 &&
											descriptionCount === 0 && (
												<p className="text-sm text-gray-400 mt-2">
													No answers yet. Be the first
													to answer!
												</p>
											)}
										{question.answers.length > 0 && (
											<div className="mt-2">
												{question.answers.map(
													(answer, index) => (
														<p
															key={index}
															className="text-sm text-gray-600"
														>
															• {answer}
														</p>
													)
												)}
											</div>
										)}
									</div>
									<span className="text-sm grid grid-flow-col rounded-full items-center bg-white h-10 p-2 gap-1">
										<Eye />
										{question.views}
									</span>
								</div>
							);
						})}
					</div>
				)}
			</ScrollArea>
		</CardContent>
	);
}
