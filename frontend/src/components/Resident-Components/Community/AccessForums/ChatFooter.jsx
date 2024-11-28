import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
const emojis = ["😊", "😂", "😍", "🥺", "😎", "😢"];

export default function ChatFooter({ onSendMessage, onSendFile }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [typing, setTyping] = useState(false);

  // Handle text input change
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  // Add selected emoji to message input
  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

  // Handle form submission to send text message
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        onSendFile(file);
      });
    }
    event.target.value = "";
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute left-4 top-3 text-gray-400">
            <button type="button" onClick={toggleEmojiPicker} className="hover:text-gray-600">
              <img src="./src/assets/smiley.svg" alt="Emoji" className="w-6 h-6" />
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
            <label htmlFor="file-upload" className="hover:text-gray-600 cursor-pointer">
              <img src="./src/assets/clipe.svg" alt="Attachment" className="w-6 h-6" />
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
              <img src="./src/assets/camera.svg" alt="Camera" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <span>
          {typing ? (
            <button type="submit" className="bg-blue-500 text-white rounded-full p-3 ml-3">
              <SendHorizontal className="w-6 h-6" />
            </button>
          ) : (
            <button type="button" className="bg-blue-500 text-white rounded-full p-3 ml-3">
              <img src="./src/assets/microphone.svg" alt="Microphone" className="w-6 h-6" />
            </button>
          )}
        </span>
      </form>

      {showEmojiPicker && (
        <div className="absolute bottom-36 bg-white shadow-lg rounded-lg p-2 grid grid-cols-3 gap-2">
          {emojis.map((emoji) => (
            <button key={emoji} type="button" onClick={() => addEmoji(emoji)} className="text-xl">
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
