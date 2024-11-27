import { useState } from 'react';

export default function ChatTextArray({ messages }) {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

  const handleMessageSelect = (index) => {
    // Toggle the selection state for the message
    setSelectedMessageIndex(selectedMessageIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 h-[585px] p-4 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col items-start"
            onClick={() => handleMessageSelect(index)}
          >
            {message.type === "text" && (
              <div
                className={`p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md ${
                  selectedMessageIndex === index ? 'text-sky-500' : ''
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            )}
            {message.type === "image" && (
              <div
                className={`w-auto max-w-[400px] cursor-pointer ${
                  selectedMessageIndex === index ? 'border-2 border-sky-500' : ''
                }`}
                onClick={() => handleMessageSelect(index)}
              >
                <img
                  src={message.content}
                  alt="Uploaded"
                  className="rounded-lg shadow-md"
                />
              </div>
            )}
            {message.type === "pdf" && (
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md block text-center text-blue-600 ${
                  selectedMessageIndex === index ? 'text-sky-500' : ''
                }`}
              >
                {message.name} (PDF)
              </a>
            )}
            {message.type === "document" && (
              <a
                href={message.content}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-white w-auto max-w-[500px] rounded-lg shadow-md block text-center text-blue-600 ${
                  selectedMessageIndex === index ? 'text-sky-500' : ''
                }`}
              >
                {message.name} (Document)
              </a>
            )}
            {message.type === "audio" && (
              <div className="w-auto max-w-[500px] p-3 bg-white rounded-lg shadow-md">
                <audio controls>
                  <source src={message.content} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {/* Display Current Time */}
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No messages</p>
      )}
    </div>
  );
}
