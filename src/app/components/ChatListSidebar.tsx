import { MessageCircle, Users } from "lucide-react";
import { Chat } from "../types";

interface ChatWithPreview extends Chat {
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

interface ChatListSidebarProps {
  selectedChatId: string;
  onSelectChat: (chat: Chat) => void;
  chats: ChatWithPreview[];
}

export function ChatListSidebar({ selectedChatId, onSelectChat, chats }: ChatListSidebarProps) {
  return (
    <div className="w-[15%] bg-zinc-100 border-r border-zinc-200 flex flex-col">
      <div className="p-4 border-b border-zinc-200">
        <h2 className="font-semibold text-zinc-900">Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-3 border-b border-zinc-200 hover:bg-zinc-200 transition-colors text-left ${
              selectedChatId === chat.id ? "bg-zinc-200" : ""
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                {chat.isGroup ? (
                  <Users className="w-5 h-5 text-zinc-600" />
                ) : (
                  <MessageCircle className="w-5 h-5 text-zinc-600" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-zinc-900 truncate">
                    {chat.name}
                  </span>
                  <span className="text-xs text-zinc-500 flex-shrink-0 ml-2">
                    {chat.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-600 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread && (
                    <span className="flex-shrink-0 ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}