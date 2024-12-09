import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreatePollDialog({ isOpen, onOpenChange, onSubmit }) {
	// const [question, setQuestion] = useState("");
	// const [options, setOptions] = useState(["", ""]);
	// const [pollType, setPollType] = useState("multichoice");

	// const handleSubmit = (e) => {
	//     e.preventDefault();
	//     const newPoll = {
	//         question,
	//         options: options.filter((option) => option.trim() !== ""),
	//         createdBy: "User",
	//     };
	//     onSubmit(newPoll);
	//     onOpenChange(false);

	//     setQuestion("");
	//     setOptions(["", ""]);
	//     setPollType("multichoice");
	// };
	//  <Dialog open={isOpen} onOpenChange={onOpenChange}>
	//         <DialogContent className="max-w-lg">
	//             <DialogHeader>
	//                 <DialogTitle>Create Polls</DialogTitle>
	//             </DialogHeader>
	//             <form onSubmit={handleSubmit}>
	//                 <div className="space-y-4">
	//                     {/* Poll Type */}
	//                     <div>
	//                         <Label className="text-sm font-medium">
	//                             Polls <span className="text-red-500">*</span>
	//                         </Label>
	//                         <RadioGroup
	//                             className="space-y-2 mt-2"
	//                             defaultValue="multichoice"
	//                             onValueChange={setPollType}
	//                         >
	//                             <div className="flex items-center space-x-2">
	//                                 <RadioGroupItem
	//                                     value="multichoice"
	//                                     id="multichoice"
	//                                 />
	//                                 <Label htmlFor="multichoice">
	//                                     Multichoice polls
	//                                 </Label>
	//                             </div>
	//                             <div className="flex items-center space-x-2">
	//                                 <RadioGroupItem
	//                                     value="ranking"
	//                                     id="ranking"
	//                                 />
	//                                 <Label htmlFor="ranking">
	//                                     Ranking polls
	//                                 </Label>
	//                             </div>
	//                             <div className="flex items-center space-x-2">
	//                                 <RadioGroupItem
	//                                     value="rating"
	//                                     id="rating"
	//                                 />
	//                                 <Label htmlFor="rating">Rating polls</Label>
	//                             </div>
	//                             <div className="flex items-center space-x-2">
	//                                 <RadioGroupItem
	//                                     value="numeric"
	//                                     id="numeric"
	//                                 />
	//                                 <Label htmlFor="numeric">
	//                                     Numeric polls
	//                                 </Label>
	//                             </div>
	//                             <div className="flex items-center space-x-2">
	//                                 <RadioGroupItem value="text" id="text" />
	//                                 <Label htmlFor="text">Text polls</Label>
	//                             </div>
	//                         </RadioGroup>
	//                     </div>

	//                     {/* Question */}
	//                     <div>
	//                         <Label
	//                             htmlFor="question"
	//                             className="text-sm font-medium"
	//                         >
	//                             Question <span className="text-red-500">*</span>
	//                         </Label>
	//                         <Input
	//                             id="question"
	//                             placeholder="Ask a question"
	//                             type="text"
	//                             value={question}
	//                             onChange={(e) => setQuestion(e.target.value)}
	//                             className="mt-2"
	//                         />
	//                     </div>

	//                     {/* Options */}
	//                     <div>
	//                         <Label className="text-sm font-medium">
	//                             Options <span className="text-red-500">*</span>
	//                         </Label>
	//                         <div className="space-y-2 mt-2">
	//                             {options.map((option, index) => (
	//                                 <div
	//                                     key={index}
	//                                     className="flex items-center space-x-2"
	//                                 >
	//                                     <Input
	//                                         placeholder={`Option ${index + 1}`}
	//                                         value={option}
	//                                         type="text"
	//                                         onChange={(e) => {
	//                                             const newOptions = [...options];
	//                                             newOptions[index] =
	//                                                 e.target.value;
	//                                             setOptions(newOptions);
	//                                         }}
	//                                     />
	//                                     <Button
	//                                         type="button"
	//                                         onClick={() => {
	//                                             const newOptions = [...options];
	//                                             newOptions.splice(index, 1);
	//                                             setOptions(newOptions);
	//                                         }}
	//                                         className="text-sm text-red-600 hover:text-red-500"
	//                                     >
	//                                         Remove
	//                                     </Button>
	//                                 </div>
	//                             ))}
	//                             <Button
	//                                 type="button"
	//                                 onClick={() => setOptions([...options, ""])}
	//                                 className="text-sm text-indigo-600 hover:text-indigo-500"
	//                             >
	//                                 Add Option
	//                             </Button>
	//                         </div>
	//                     </div>
	//                 </div>

	//                 {/* Footer */}
	//                 <DialogFooter className="mt-4">
	//                     <Button
	//                         variant="secondary"
	//                         type="button"
	//                         onClick={() => onOpenChange(false)}
	//                     >
	//                         Cancel
	//                     </Button>
	//                     <Button type="submit">Create</Button>
	//                 </DialogFooter>
	//             </form>
	//         </DialogContent>
	//     </Dialog>
	const [selectedPoll, setSelectedPoll] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
	const [isThirdDialogOpen, setIsThirdDialogOpen] = useState(false);
	const [isForthDialogOpen, setIsForthDialogOpen] = useState(false);
	const [isFiveDialogOpen, setIsFiveDialogOpen] = useState(false);
	const [isSixDialogOpen, setIsSixDialogOpen] = useState(false);

	//</Second/>
	const [questionSecond, setQuestionSecond] = React.useState("");
	const [optionsSecond, setOptionsSecond] = useState([""]);

	const handleQuestionChangeSecond = (e) => {
		console.log(e.target.value);
		setQuestionSecond(e.target.value);
	};

	const handleOptionChangeSecond = (index, value) => {
		setOptionsSecond((prevOptions) =>
			prevOptions.map((option, i) => (i === index ? value : option))
		);
	};

	const handleAddOptionSecond = () => {
		setOptionsSecond((prevOptions) => [...prevOptions, ""]);
	};

	const handleRemoveOptionSecond = (index) => {
		setOptionsSecond((prevOptions) =>
			prevOptions.filter((_, i) => i !== index)
		);
	};

	//</Third/>
	const [questionThird, setQuestionThird] = React.useState("");
	const [optionsThird, setOptionsThird] = useState([""]);

	const handleQuestionChangeThird = (e) => {
		console.log(e.target.value);
		setQuestionThird(e.target.value);
	};

	const handleOptionChangeThird = (index, value) => {
		setOptionsThird((prevOptions) =>
			prevOptions.map((option, i) => (i === index ? value : option))
		);
	};

	const handleAddOptionThird = () => {
		if (optionsThird.length < 5) {
			setOptionsThird((prevOptions) => [...prevOptions, ""]);
		} else {
			console.log("You can add a maximum of 5 options.");
		}
	};

	const handleRemoveOptionThird = (index) => {
		setOptionsThird((prevOptions) =>
			prevOptions.filter((_, i) => i !== index)
		);
	};

	//</Forth/>
	const [questionForth, setQuestionForth] = React.useState("");
	const [optionsForth, setOptionsForth] = useState([""]);

	const handleQuestionChangeForth = (e) => {
		console.log(e.target.value);
		setQuestionForth(e.target.value);
	};

	const handleOptionChangeForth = (index, value) => {
		setOptionsForth((prevOptions) =>
			prevOptions.map((option, i) => (i === index ? value : option))
		);
	};

	const handleAddOptionForth = () => {
		if (optionsForth.length < 5) {
			setOptionsForth((prevOptions) => [...prevOptions, ""]);
		} else {
			console.log("You can add a maximum of 5 options.");
		}
	};

	const handleRemoveOptionForth = (index) => {
		setOptionsForth((prevOptions) =>
			prevOptions.filter((_, i) => i !== index)
		);
	};

	// </five/>
	const [questionFive, setQuestionFive] = useState("");
	const [minValues, setMinValues] = useState("");
	const [maxValues, setMaxValues] = useState("");
	const [decimalPlaces, setDecimalPlaces] = useState("5");
	const [answerText, setAnswerText] = useState("");

	const [pollType, setPollType] = useState("multichoice");

	const handleCreate = () => {
		if (!selectedPoll) {
			alert("Please select a poll.");
			return;
		}
		console.log("Poll created:", selectedPoll);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ selectedPoll });
		onOpenChange(false);
		setSelectedPoll("");
		if (answerText.trim()) {
			console.log("Poll created with answer:", answerText);
			setIsSixDialogOpen(false);
			setAnswerText(""); // Reset the textarea
		}
	};

	const handlePollSelection = (poll) => {
		setSelectedPoll(poll);
		setDropdownOpen(false);

		if (poll === "multichoice") {
			setIsSecondDialogOpen(true);
			onOpenChange(false);
		} else if (poll === "ranking") {
			setIsThirdDialogOpen(true);
			onOpenChange(false);
		} else if (poll === "rating") {
			setIsForthDialogOpen(true);
			onOpenChange(false);
		} else if (poll === "numeric") {
			setIsFiveDialogOpen(true);
			onOpenChange(false);
		} else if (poll === "text") {
			setIsSixDialogOpen(true);
			onOpenChange(false);
		}
	};

	// </All DialogClose/>
	const handleSecondDialogClose = () => {
		setIsSecondDialogOpen(false);
	};

	const handleThirdDialogClose = () => {
		setIsThirdDialogOpen(false);
	};
	const handleForthDialogClose = () => {
		setIsForthDialogOpen(false);
	};
	const handleFiveDialogClose = () => {
		setIsFiveDialogOpen(false);
	};
	const handleSixDialogClose = () => {
		setIsSixDialogOpen(false);
	};

	return (
		<div>
			{/* First dialog - Create Poll Dialog */}
			<Dialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div>
								<Label
									htmlFor="polls"
									className="block text-sm font-medium"
								>
									Polls{" "}
									<span className="text-red-500">*</span>
								</Label>
								<button
									type="button"
									className="relative w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
									onClick={() =>
										setDropdownOpen(!dropdownOpen)
									}
								>
									<span className="flex items-center">
										<img
											src="/assets/poll.svg"
											alt="Poll icon"
											className="w-4 h-4 mr-2"
										/>
										{selectedPoll
											? `${
													selectedPoll
														.charAt(0)
														.toUpperCase() +
													selectedPoll.slice(1)
											  } polls`
											: "Select Polls"}
									</span>
									<span className="absolute right-2 top-2">
										^
									</span>
								</button>

								{dropdownOpen && (
									<ul
										id="pollDropdown"
										className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm"
									>
										<li
											className="px-4 py-2 cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handlePollSelection(
													"multichoice"
												)
											}
										>
											<div className="flex">
												<img
													src="/assets/poll1.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
												Multichoice polls
											</div>
										</li>
										<li
											className="px-4 py-2 cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handlePollSelection("ranking")
											}
										>
											<div className="flex">
												<img
													src="/assets/poll2.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
												Ranking polls
											</div>
										</li>

										<li
											className="px-4 py-2 cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handlePollSelection("rating")
											}
										>
											<div className="flex">
												<img
													src="/assets/poll3.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
												Rating polls
											</div>
										</li>
										<li
											className="px-4 py-2 cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handlePollSelection("numeric")
											}
										>
											<div className="flex">
												<img
													src="/assets/poll4.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
												Numeric polls
											</div>
										</li>
										<li
											className="px-4 py-2 cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handlePollSelection("text")
											}
										>
											<div className="flex">
												<img
													src="/assets/poll5.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
												Text polls
											</div>
										</li>
									</ul>
								)}
							</div>
						</div>

						{/* Footer */}
						<DialogFooter className="mt-4">
							<Button
								variant="outline"
								type="button"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button type="submit" onClick={handleCreate}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Second dialog - Specific to selected poll (e.g., Multichoice Polls) */}
			<Dialog
				open={isSecondDialogOpen}
				onOpenChange={setIsSecondDialogOpen}
			>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							{selectedPoll === "multichoice" && (
								<>
									{/* Poll Type */}
									<div className="relative">
										<label
											htmlFor="pollType"
											className="block text-sm font-medium"
										>
											Polls
										</label>
										<select
											id="pollType"
											value={pollType}
											disabled="disabled"
											onChange={(e) =>
												setPollType(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option value="multichoice">
												Multichoice polls
											</option>
										</select>
									</div>
									<div className="mb-4">
										<label
											htmlFor="question"
											className="block text-sm font-medium"
										>
											Question
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<input
											type="text"
											id="question"
											value={questionSecond}
											onChange={
												handleQuestionChangeSecond
											}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder="Ask a question"
										/>
									</div>

									{optionsSecond.map((option, index) => (
										<div key={index} className="mb-4">
											<label
												htmlFor={`option-${index}`}
												className="block text-sm font-medium"
											>
												Option {index + 1}
												<span className="text-[#E74C3C]">
													*
												</span>
											</label>
											<div className="flex">
												<input
													type="text"
													id={`option-${index}`}
													value={option}
													onChange={(e) =>
														handleOptionChangeSecond(
															index,
															e.target.value
														)
													}
													className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="Ask a question"
												/>
												<button
													type="button"
													className="ml-2 text-red-500 hover:text-red-700"
													onClick={() =>
														handleRemoveOptionSecond(
															index
														)
													}
												>
													<img
														src="/assets/trash.svg"
														alt="Poll icon"
														className="w-5 h-5 mr-2"
													/>
												</button>
											</div>
										</div>
									))}
									<div className="flex">
										<div className="h-9 w-9 bg-amber-500 rounded-md">
											<img
												src="/assets/plussign.svg"
												alt="Poll icon"
												className="w-5 h-5 mt-2 ml-2"
											/>
										</div>
										<button
											type="button"
											className="text-orange-500 hover:text-orange-600 ml-1 text-xl font-semibold"
											onClick={handleAddOptionSecond}
										>
											Add an option
										</button>
									</div>
								</>
							)}
						</div>

						<DialogFooter className="mt-4">
							<Button
								variant="outline"
								onClick={handleSecondDialogClose}
							>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Third dialog - Specific to selected poll (e.g., Ranking polls) */}
			<Dialog
				open={isThirdDialogOpen}
				onOpenChange={setIsThirdDialogOpen}
			>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							{selectedPoll === "ranking" && (
								<>
									{/* Poll Type */}
									<div className="relative">
										<label
											htmlFor="pollType"
											className="block text-sm font-medium text-gray-700"
										>
											Poll Type
										</label>
										<select
											id="pollType"
											value={pollType}
											disabled="disabled"
											onChange={(e) =>
												setPollType(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option value="ranking">
												Ranking polls
											</option>
										</select>
									</div>
									<div className="mb-4">
										<label
											htmlFor="question"
											className="block text-sm font-medium"
										>
											Question
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<input
											type="text"
											id="question"
											value={questionThird}
											onChange={handleQuestionChangeThird}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
											placeholder="Ask a question"
										/>
									</div>

									{optionsThird.map((optionThird, index) => (
										<div
											key={index}
											className="flex items-center mb-4"
										>
											<input
												type="number"
												value={optionThird}
												onChange={(e) =>
													handleOptionChangeThird(
														index,
														e.target.value
													)
												}
												className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
												placeholder={`Option ${
													index + 1
												}`}
											/>
											<button
												type="button"
												className="ml-2 text-red-500 hover:text-red-700"
												onClick={() =>
													handleRemoveOptionThird(
														index
													)
												}
											>
												<img
													src="/assets/trash.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
											</button>
										</div>
									))}
									<div className="flex">
										<div className="h-9 w-9 bg-amber-500 rounded-md">
											<img
												src="/assets/plussign.svg"
												alt="Poll icon"
												className="w-5 h-5 mt-2 ml-2"
											/>
										</div>
										<button
											type="button"
											className="text-orange-500 hover:text-orange-600 ml-1 text-xl font-semibold"
											onClick={handleAddOptionThird}
											disabled={optionsThird.length >= 5}
										>
											Add an option
										</button>
									</div>
								</>
							)}
						</div>

						<DialogFooter className="mt-4">
							<Button
								variant="outline"
								onClick={handleThirdDialogClose}
							>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Forth dialog - Specific to selected poll (e.g., Rating polls) */}
			<Dialog
				open={isForthDialogOpen}
				onOpenChange={setIsForthDialogOpen}
			>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							{selectedPoll === "rating" && (
								<>
									{/* Poll Type */}
									<div className="relative">
										<label
											htmlFor="pollType"
											className="block text-sm font-medium"
										>
											Polls
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<select
											id="pollType"
											value={pollType}
											disabled="disabled"
											onChange={(e) =>
												setPollType(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
										>
											<option value="rating">
												Rating polls
											</option>
										</select>
									</div>
									<div className="mb-4">
										<label
											htmlFor="question"
											className="block text-sm font-medium"
										>
											Question
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<input
											type="text"
											id="question"
											value={questionForth}
											onChange={handleQuestionChangeForth}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
											placeholder="Ask a question"
										/>
									</div>

									{optionsForth.map((option, index) => (
										<div
											key={index}
											className="flex items-center mb-4"
										>
											<input
												type="text"
												value={option}
												onChange={(e) =>
													handleOptionChangeForth(
														index,
														e.target.value
													)
												}
												className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
												placeholder={`Option ${
													index + 1
												}`}
											/>
											<button
												type="button"
												className="ml-2 text-red-500 hover:text-red-700"
												onClick={() =>
													handleRemoveOptionForth(
														index
													)
												}
											>
												<img
													src="/assets/trash.svg"
													alt="Poll icon"
													className="w-5 h-5 mr-2"
												/>
											</button>
										</div>
									))}
									<div className="flex">
										<div className="h-9 w-9 bg-amber-500 rounded-md">
											<img
												src="/assets/plussign.svg"
												alt="Poll icon"
												className="w-5 h-5 mt-2 ml-2"
											/>
										</div>
										<button
											type="button"
											className="text-orange-500 hover:text-orange-600 ml-1 text-xl font-semibold"
											onClick={handleAddOptionForth}
											disabled={optionsForth.length >= 5}
										>
											Add an option
										</button>
									</div>
								</>
							)}
						</div>

						<DialogFooter className="mt-4">
							<Button
								variant="outline"
								onClick={handleForthDialogClose}
							>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Five dialog - Specific to selected poll (e.g., Numeric polls) */}
			<Dialog open={isFiveDialogOpen} onOpenChange={setIsFiveDialogOpen}>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							{selectedPoll === "numeric" && (
								<>
									{/* Poll Type */}
									<div className="relative">
										<label
											htmlFor="pollType"
											className="block text-sm font-medium"
										>
											Polls
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<select
											id="pollType"
											value={pollType}
											disabled="disabled"
											onChange={(e) =>
												setPollType(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
										>
											<option value="numeric">
												Numeric polls
											</option>
										</select>
									</div>
									<div className="mb-4">
										<label
											htmlFor="question"
											className="block text-sm font-medium"
										>
											Question
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<input
											type="text"
											id="question"
											value={questionFive}
											onChange={(e) =>
												setQuestionFive(e.target.value)
											}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
											placeholder="Ask a question"
										/>
									</div>

									<div className="mb-4 flex space-x-4">
										<div>
											<label
												htmlFor="minValues"
												className="block text-sm font-medium"
											>
												Min Values
												<span className="text-[#E74C3C]">
													*
												</span>
											</label>
											<input
												type="text"
												id="minValues"
												value={minValues}
												onChange={(e) => {
													const value =
														e.target.value;
													if (
														/^\d{0,4}$/.test(value)
													) {
														setMinValues(value);
													}
												}}
												className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
												placeholder="Enter Min Values"
												min="3000"
												max="9999"
											/>
										</div>
										<div>
											<label
												htmlFor="maxValues"
												className="block text-sm font-medium"
											>
												Max Values
												<span className="text-[#E74C3C]">
													*
												</span>
											</label>
											<input
												type="text"
												id="maxValues"
												value={maxValues}
												onChange={(e) => {
													const value =
														e.target.value;
													if (
														/^\d{0,4}$/.test(value)
													) {
														setMaxValues(value);
													}
												}}
												className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
												placeholder="Enter Max Values"
												min="3000"
												max="9999"
											/>
										</div>
									</div>

									<div className="mb-4">
										<label
											htmlFor="decimalPlaces"
											className="block text-sm font-medium"
										>
											Decimal Places
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<select
											id="decimalPlaces"
											value={decimalPlaces}
											onChange={(e) =>
												setDecimalPlaces(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
										>
											<option value="0">0</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</div>
								</>
							)}
						</div>

						<DialogFooter className="mt-4">
							<Button
								variant="outline"
								onClick={handleFiveDialogClose}
							>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* six dialog - Specific to selected poll (e.g., Text polls) */}
			<Dialog open={isSixDialogOpen} onOpenChange={setIsSixDialogOpen}>
				<DialogContent className="w-[400px]">
					<DialogHeader>
						<DialogTitle>Create Polls</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div>
							{selectedPoll === "text" && (
								<>
									{/* Poll Type */}
									<div className="relative">
										<label
											htmlFor="pollType"
											className="block text-sm font-medium"
										>
											Polls
											<span className="text-[#E74C3C]">
												*
											</span>
										</label>
										<select
											id="pollType"
											value={pollType}
											disabled="disabled"
											onChange={(e) =>
												setPollType(e.target.value)
											}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option value="text">
												Text polls
											</option>
										</select>
									</div>
									<label
										htmlFor="pollType"
										className="block text-sm mt-4 font-medium"
									>
										Answer
										<span className="text-[#E74C3C]">
											*
										</span>
									</label>
									<textarea
										rows="4"
										className="border-2 rounded-md w-full"
										value={answerText}
										onChange={(e) =>
											setAnswerText(e.target.value)
										}
									></textarea>
								</>
							)}
						</div>

						<DialogFooter className="mt-4 ">
							<Button
								variant="outline"
								onClick={handleSixDialogClose}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={!answerText.trim()}>
								Create
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
