import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatTextArray({ messages }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef([]);
  const mediaRecorderRef = useRef(null);
  const cardRef = useRef(null);

  const handleIconClick = (event, message) => {
    event.stopPropagation(); // Prevent opening the message details on icon click
    setSelectedMessage(message);
    setMenuPosition({ top: event.clientY, left: event.clientX });
    setIsCardOpen(true);
  };

  const handleCopy = () => {
    if (!selectedMessage) return;

    if (selectedMessage.type === "text") {
      navigator.clipboard.writeText(selectedMessage.content).then(() => {
        setIsCardOpen(false); // Close menu after copying
      });
    } else if (selectedMessage.type === "image") {
      fetch(selectedMessage.content)
        .then((response) => response.blob())
        .then((blob) => {
          const item = new ClipboardItem({ [blob.type]: blob });
          return navigator.clipboard.write([item]);
        })
        .then(() => {
          setIsCardOpen(false); // Close menu after copying
        })
        .catch((error) => {
          console.error("Error copying image: ", error);
        });
    } else if (["pdf", "document"].includes(selectedMessage.type)) {
      const contentToCopy = `<a href="${selectedMessage.content}" target="_blank">${selectedMessage.name}</a>`;
      navigator.clipboard.writeText(contentToCopy).then(() => {
        setIsCardOpen(false); // Close menu after copying
      });
    } else if (selectedMessage.type === "audio") {
      const contentToCopy = `<audio controls><source src="${selectedMessage.content}" type="audio/wav" /></audio>`;
      navigator.clipboard.writeText(contentToCopy).then(() => {
        setIsCardOpen(false); // Close menu after copying
      });
    }
  };

  const handleForward = () => {
    if (!selectedMessage) return;
    setIsCardOpen(false); // Close menu after forwarding
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

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordings((prevRecordings) => [...prevRecordings, audioUrl]);
      audioChunks.current = [];
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleCombinedClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="bg-gray-100 h-[585px] p-4 overflow-y-auto">
      {/* Messages */}
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="mb-4 flex flex-col items-start cursor-pointer">
            {message.type === "text" && (
              <div className="flex">

              <div className="p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md relative">
                <p className="text-sm">{message.content}</p>
              </div>
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className=" w-auto mt-1 p-1 text-gray-600"
                  >
                  <ChevronDown />
                </button>
                  </div>
            )}
            {message.type === "image" && (
               <div className="flex">
              <div className="relative">
                <img
                  src={message.content}
                  alt="Uploaded"
                  className="w-auto max-w-[400px] rounded-lg shadow-md"
                />
              </div>
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="w-auto p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </div>
            )}
            {message.type === "pdf" && (
               <div className="flex">
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md block text-center text-blue-600 relative"
              >
                {message.name} (PDF)
              </a>
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="w-auto p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </div>
            )}
            {message.type === "audio" && (
               <div className="flex">
              <div className="w-auto max-w-[500px] p-3 bg-white rounded-lg shadow-md relative">
                <audio controls>
                  <source src={message.content} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No messages</p>
      )}
      
      {/* Context Menu */}
      {isCardOpen && (
        <div
          ref={cardRef}
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 1000,
          }}
          className="w-22 p-3 bg-white font-semibold shadow-md border rounded-md"
        >
          <div className="mb-1">
            <button onClick={handleCopy}>Copy</button>
          </div>
          <div>
            <button onClick={handleForward}>Forward</button>
          </div>
        </div>
      )}
    </div>
  );
}
