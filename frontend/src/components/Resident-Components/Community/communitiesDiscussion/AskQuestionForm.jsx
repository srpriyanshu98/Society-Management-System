// src/components/Resident-Components/Community/communitiesDiscussion/AskQuestionForm.js

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AskQuestionForm = ({ onSubmit, onCancel }) => {
	const [question, setQuestion] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(question);
		setQuestion("");
	};

	return (
		<div className="space-y-5">
			<Card className="border-blue-500 bg-blue-50">
				<CardHeader>
					<CardTitle>Writing a good question</CardTitle>
					<CardDescription>
						You&apos;re ready to ask a programming-related question
						and this form will help guide you through the process.
						Looking to ask a non-programming question? See the
						topics here to find a relevant site.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<h3 className="text-lg font-semibold">Steps</h3>
					<ol className="list-disc list-inside space-y-2">
						<li>Summarize your problem in a one-line title</li>
						<li>Describe your problem in more detail.</li>
						<li>
							Describe what you tried and what you expected to
							happen.
						</li>
						<li>
							Add &quot;tags&quot; which help surface your
							question to members of the community
						</li>
						<li>Review your question and post it to the site</li>
					</ol>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Title </CardTitle>
					<CardDescription>
						Be specific and imagine you&apos;re asking a question to
						another person.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<Input
							className="w-full p-2 border rounded-md mb-4"
							placeholder="Type your question here..."
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
						/>
						<div className="flex justify-end space-x-4">
							<Button variant="outline" onClick={onCancel}>
								Cancel
							</Button>
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AskQuestionForm;
