import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatData } from "@/data/Chat/ChatData";
import { Search } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatTextArray from "./ChatTextArray";
import ChatFooter from "./ChatFooter";

export default function ChatCard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]); 

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages || []); 
  };

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewMessage = (message) => {
	setMessages((prevMessages) => [...prevMessages, { type: "text", content: message }]);
  };
    
	const handleNewFile = (file) => {
		const fileType = file.type.includes("image") ? "image" : file.type.includes("pdf") ? "pdf" : "document";
		const fileUrl = URL.createObjectURL(file); 
		setMessages((prevMessages) => [...prevMessages, { type: fileType, content: fileUrl, name: file.name }]);
	  };

    const handleNewAudio = (audioBlob) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "audio", content: audioUrl, name: "Audio Message" }
      ]);
    };
  return (
    <Card className="h-[748px] w-full flex">
      
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="mb-3">Chat</CardTitle>
          <div className="relative w-full max-w-md mx-auto flex justify-center">
            <Input
              type="text"
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-80 pl-10 pr-4 py-2 bg-slate-100 rounded-lg"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="text-black" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[588px] overflow-y-auto m-4 custom-scrollbar">
            <div className="space-y-3">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.name}
                    onClick={() => handleChatClick(chat)}
                    className={`flex items-center p-2 bg-white cursor-pointer hover:bg-blue-100 ${
                      selectedChat?.name === chat.name ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12 rounded-full">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={chat.name}
                        />
                        <AvatarFallback>
                          CN
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="absolute -top-0 -right-1 w-4 h-4 bg-gray-500 border-2 border-white rounded-full z-10"></div>
                    </div>

                    <div className="flex-1 ml-5">
                      <h3 className="text-lg font-semibold">
                        {chat.name}
                      </h3>
                      <p className="text-gray-500">
                        {chat.lastMessage}
                      </p>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">
                        {chat.time}
                      </div>
                      <div>
                        {chat.unread && (
                          <div className="bg-blue-500 text-white rounded-full h-5 w-5 text-center ml-4">
                            7
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No chats found</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card className="flex-grow">
        <ChatHeader selectedChat={selectedChat} messages={messages}/>
        <ChatTextArray messages={messages} />
        <ChatFooter onSendMessage={handleNewMessage} onSendFile={handleNewFile} onSendAudio={handleNewAudio}/>
      </Card>
    </Card>
  );
}
