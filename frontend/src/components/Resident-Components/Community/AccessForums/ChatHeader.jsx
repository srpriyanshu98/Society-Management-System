import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ selectedChat, messages }) {
	const [isCardOpen, setIsCardOpen] = useState(false);
	const [isCopying, setIsCopying] = useState(false); // Added state to track copying
	const cardRef = useRef(null);

	const toggleCard = () => {
		setIsCardOpen(!isCardOpen);
	};

	const handleCopy = () => {
		// Start copying action
		setIsCopying(true);

		const allMessages = messages
			.map((message) => {
				if (message.type === "text") {
					return message.content;
				} else if (message.type === "image") {
					return `<img src="${message.content}" alt="${message.name}" />`;
				} else if (
					message.type === "pdf" ||
					message.type === "document"
				) {
					return `<a href="${message.content}" target="_blank">${message.name}</a>`;
				} else if (message.type === "audio") {
					return `<audio controls><source src="${message.content}" type="audio/wav" /></audio>`;
				}
				return "";
			})
			.join("\n\n");

		// Copy to clipboard and then allow further actions
		navigator.clipboard.writeText(allMessages).then(() => {
			// Once copying is successful, set isCopying to false
			setIsCopying(false);
		});
	};

	const handleForward = () => {
		// You can implement forward logic here, without any restrictions
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (cardRef.current && !cardRef.current.contains(event.target)) {
				setIsCardOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="h-20 flex justify-between p-3 relative">
			<div>
				{selectedChat ? (
					<div className="flex">
						<div>
							<Avatar className="w-12 h-12">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt={selectedChat.name}
								/>
								<AvatarFallback>
									{selectedChat.name?.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="ml-4">
							<h2 className="text-xl font-medium">
								{selectedChat.name}
							</h2>
							<p className="text-sm text-gray-500">
								{selectedChat.time}
							</p>
						</div>
					</div>
				) : null}
			</div>
			<div className="flex space-x-4">
				<button className="bg-gray-100 p-1 w-14 rounded-full">
					<img src="/assets/video.svg" alt="" className="ml-3" />
				</button>
				<button className="bg-gray-100 p-1 w-14 rounded-full">
					<img src="/assets/call.svg" alt="" className="ml-3" />
				</button>
				<button
					className="bg-gray-100 p-1 w-14 rounded-full"
					onClick={toggleCard}
				>
					<img src="/assets/dots.svg" alt="" className="ml-3" />
				</button>
			</div>
			{/* Card with copy and forward options */}
			{isCardOpen && (
				<div
					ref={cardRef}
					className="absolute top-[70px] right-5 w-36 p-5 bg-white font-semibold shadow-md border rounded-md"
				>
					<div className="mb-1">
						<button
							onClick={handleCopy}
							disabled={isCopying} // Disable copy button while copying
						>
							{isCopying ? "Copying..." : "Copy"}
						</button>
					</div>
					<div>
						<button onClick={handleForward}>Forward</button>
					</div>
				</div>
			)}
		</div>
	);
}
