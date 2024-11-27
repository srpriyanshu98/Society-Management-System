import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
const emojis = ["😊", "😂", "😍", "🥺", "😎", "😢"];

export default function ChatFooter({ onSendMessage, onSendFile, onSendAudio }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

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

  // Start the audio recording
  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = () => {
            const audioBlobData = new Blob(audioChunks.current, { type: 'audio/wav' });
            setAudioBlob(audioBlobData);
            onSendAudio(audioBlobData); // Send audio blob as message
          };
          mediaRecorderRef.current.start();
          setIsRecording(true);
        })
        .catch((err) => {
          console.error("Error accessing microphone: ", err);
        });
    } else {
      alert("Audio recording is not supported in this browser.");
    }
  };

  // Stop the audio recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Toggle recording state
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
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

        <button type="button" className="bg-blue-500 text-white rounded-full p-3 ml-3" onClick={handleMicClick}>
          <img src="./src/assets/microphone.svg" alt="Microphone" className="w-6 h-6" />
        </button>
      </form>

      {showEmojiPicker && (
        <div className="absolute w-40 bg-white border rounded-lg shadow-lg p-4 max-h-40 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {emojis.map((emoji, index) => (
              <button key={index} type="button" onClick={() => addEmoji(emoji)} className="text-xl">
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
