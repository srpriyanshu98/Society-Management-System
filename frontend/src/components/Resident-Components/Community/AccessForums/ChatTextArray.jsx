import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatTextArray({ messages }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 }); 
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

    // Add forwarding logic here (e.g., send to another user or channel)
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

  return (
    <div className="bg-gray-100 h-[585px] p-4 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col items-start cursor-pointer"
          >
            {message.type === "text" && (
              <div className="p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md relative">
                <p className="text-sm">{message.content}</p>
                {/* Icon to open copy and forward options */}
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="absolute w-auto right-6 mt-1 p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </div>
            )}
            {message.type === "image" && (
              <div className="relative">
                <img
                  src={message.content}
                  alt="Uploaded"
                  className="w-auto max-w-[400px] rounded-lg shadow-md"
                />
                {/* Icon to open copy and forward options */}
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="absolute w-auto right-6 p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </div>
            )}
            {message.type === "pdf" && (
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md block text-center text-blue-600 relative"
              >
                {message.name} (PDF)
                {/* Icon to open copy and forward options */}
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="absolute w-auto right-6 p-1 text-gray-600"
                >
                  <ChevronDown />
                </button>
              </a>
            )}
            {message.type === "audio" && (
              <div className="w-auto max-w-[500px] p-3 bg-white rounded-lg shadow-md relative">
                <audio controls>
                  <source src={message.content} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
                {/* Icon to open copy and forward options */}
                <button
                  onClick={(e) => handleIconClick(e, message)}
                  className="absolute top-2 right-2 p-1 text-gray-600"
                >
                  <img src="./src/assets/options.svg" alt="Options" className="w-5 h-5" />
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
