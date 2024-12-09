import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState, useRef } from "react";
const emojis = ["😊", "😂", "😍", "🥺", "😎", "😢"];

export default function ChatFooter({ onSendMessage, onSendFile, onSendAudio }) {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isRed, setIsRed] = useState(false);

	const handleInputChange = (event) => {
		const input = event.target.value;
		setMessage(input);
		setTyping(input.trim() !== "");
	};

	const toggleEmojiPicker = () => {
		setShowEmojiPicker((prevState) => !prevState);
	};

	const addEmoji = (emoji) => {
		setMessage((prevMessage) => prevMessage + emoji);
		setTyping(true);
		setShowEmojiPicker(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (message.trim()) {
			onSendMessage(message);
			setMessage("");
			setTyping(false);
		}
	};

	const handleFileUpload = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			Array.from(files).forEach((file) => {
				onSendFile(file);
			});
		}
		event.target.value = "";
	};

	// Audio Recording
	const audioChunk = useRef([]);
	const [recording, setRecording] = useState(false);
	const mediaRecorderRef = useRef(null);

	const startRec = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		const mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = (e) => {
			if (e.data.size > 0) {
				audioChunk.current.push(e.data);
			}
		};

		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(audioChunk.current, {
				type: "audio/wav",
			});
			const audioUrl = URL.createObjectURL(audioBlob);
			onSendAudio(audioBlob); // Send audio blob to parent component
			audioChunk.current = [];
		};

		mediaRecorderRef.current = mediaRecorder;
		mediaRecorder.start();
		setRecording(true);
	};

	const stopRec = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
		}
		setRecording(false);
	};
	const handleClick = () => {
		if (recording) {
			stopRec();
		} else {
			startRec();
		}
		setIsRed((prev) => !prev);
	};

	return (
		<div className="border-t border-gray-200 p-4">
			<form onSubmit={handleSubmit} className="flex items-center">
				<div className="relative flex-grow">
					<div className="absolute left-4 top-3 text-gray-400">
						<button
							type="button"
							onClick={toggleEmojiPicker}
							className="hover:text-gray-600"
						>
							<img
								src="/assets/smiley.svg"
								alt="Emoji"
								className="w-6 h-6"
							/>
						</button>
					</div>

					<Input
						type="text"
						placeholder="Type a message"
						className="w-full p-2 pl-12 h-12 shadow-md rounded-full"
						value={message}
						onChange={handleInputChange}
					/>

					<div className="absolute right-4 top-3 flex space-x-2 text-gray-400">
						<label
							htmlFor="file-upload"
							className="hover:text-gray-600 cursor-pointer"
						>
							<img
								src="/assets/clipe.svg"
								alt="Attachment"
								className="w-6 h-6"
							/>
							<Input
								id="file-upload"
								type="file"
								accept="image/*,.pdf,.doc,.docx"
								className="hidden"
								multiple
								onChange={handleFileUpload}
							/>
						</label>
						<button type="button" className="hover:text-gray-600">
							<img
								src="/assets/camera.svg"
								alt="Camera"
								className="w-6 h-6"
							/>
						</button>
					</div>
				</div>
				<span>
					{typing ? (
						<button
							type="submit"
							className="bg-blue-500 text-white rounded-full p-3 ml-3"
						>
							<SendHorizontal className="w-6 h-6" />
						</button>
					) : (
						<button
							type="button"
							className={`${
								isRed ? "bg-red-500" : "bg-blue-500"
							} text-white rounded-full p-3 ml-3`}
							onClick={handleClick}
						>
							<img
								src="/assets/microphone.svg"
								alt="Microphone"
								className="w-6 h-6"
							/>
						</button>
					)}
				</span>
			</form>

			{showEmojiPicker && (
				<div className="absolute bottom-36 bg-white shadow-lg rounded-lg p-2 grid grid-cols-3 gap-2">
					{emojis.map((emoji) => (
						<button
							key={emoji}
							type="button"
							onClick={() => addEmoji(emoji)}
							className="text-xl"
						>
							{emoji}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
