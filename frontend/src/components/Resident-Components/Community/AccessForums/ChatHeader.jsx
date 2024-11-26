import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ selectedChat }) {
	return (
		<div className="h-20 flex justify-between p-3 border-2">
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
			<div>hi lorem500</div>
		</div>
	);
}
