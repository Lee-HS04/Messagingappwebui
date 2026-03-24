import { useState } from "react";
import { ChatListSidebar } from "./components/ChatListSidebar";
import { ChannelSidebar } from "./components/ChannelSidebar";
import { ChatArea } from "./components/ChatArea";
import { Message, Chat } from "./types";

interface ChatWithPreview extends Chat {
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

// Key format: "chatId-channelId" for group chats, "chatId" for direct messages
type MessageMap = Record<string, Message[]>;

export default function App() {
  const [selectedChat, setSelectedChat] = useState<Chat>({
    id: "1",
    name: "Design Team",
    isGroup: true,
    members: ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11", "user12"],
  });
  const [selectedChannelId, setSelectedChannelId] = useState("t1");

  // Initialize with some mock data
  const [allMessages, setAllMessages] = useState<MessageMap>({
    // Design Team - general channel
    "1-t1": [
      {
        id: "1",
        text: "Hey everyone! How's the progress on the new feature?",
        sender: "Sarah Johnson",
        timestamp: "10:30 AM",
        isCurrentUser: false,
        readBy: [],
      },
      {
        id: "2",
        text: "Going well! I've finished the frontend components.",
        sender: "You",
        timestamp: "10:32 AM",
        isCurrentUser: true,
        readBy: ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11"],
      },
      {
        id: "3",
        text: "That's great! Can you share a preview?",
        sender: "Mike Davis",
        timestamp: "10:33 AM",
        isCurrentUser: false,
        readBy: [],
      },
      {
        id: "4",
        text: "Sure! I'll post some screenshots in a few minutes.",
        sender: "You",
        timestamp: "10:35 AM",
        isCurrentUser: true,
        readBy: ["user1", "user2", "user3"],
      },
    ],
    // Design Team - announcements channel
    "1-t2": [
      {
        id: "a1",
        text: "Team meeting scheduled for tomorrow at 2 PM",
        sender: "Sarah Johnson",
        timestamp: "Yesterday",
        isCurrentUser: false,
        readBy: [],
      },
    ],
    // Design Team - random channel
    "1-t3": [
      {
        id: "r1",
        text: "Anyone want to grab lunch?",
        sender: "Mike Davis",
        timestamp: "11:30 AM",
        isCurrentUser: false,
        readBy: [],
      },
    ],
    // Alex Morgan - direct message
    "2": [
      {
        id: "d1",
        text: "Hey! Did you see my email about the project?",
        sender: "Alex Morgan",
        timestamp: "9:15 AM",
        isCurrentUser: false,
        readBy: [],
      },
      {
        id: "d2",
        text: "Yes! Everything looks good to me.",
        sender: "You",
        timestamp: "9:20 AM",
        isCurrentUser: true,
        readBy: ["alex"],
      },
      {
        id: "d3",
        text: "Perfect! See you tomorrow 👍",
        sender: "Alex Morgan",
        timestamp: "9:25 AM",
        isCurrentUser: false,
        readBy: [],
      },
    ],
    // Emma Wilson - direct message
    "4": [
      {
        id: "e1",
        text: "Can you help me with the bug I found?",
        sender: "Emma Wilson",
        timestamp: "2:00 PM",
        isCurrentUser: false,
        readBy: [],
      },
      {
        id: "e2",
        text: "Sure! What's the issue?",
        sender: "You",
        timestamp: "2:05 PM",
        isCurrentUser: true,
        readBy: [],
      },
      {
        id: "e3",
        text: "Thanks for the update!",
        sender: "Emma Wilson",
        timestamp: "2:30 PM",
        isCurrentUser: false,
        readBy: [],
      },
    ],
  });

  const chats: ChatWithPreview[] = [
    {
      id: "1",
      name: "Design Team",
      lastMessage: "Sarah: The new mockups are ready",
      timestamp: "2m",
      isGroup: true,
      members: ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11", "user12"],
      unread: 3,
    },
    {
      id: "2",
      name: "Alex Morgan",
      lastMessage: "Perfect! See you tomorrow 👍",
      timestamp: "15m",
      isGroup: false,
      members: ["alex"],
    },
    {
      id: "3",
      name: "Project Alpha",
      lastMessage: "Mike: Meeting rescheduled to 3pm",
      timestamp: "1h",
      isGroup: true,
      members: ["user1", "user2", "user3", "user4", "user5"],
      unread: 1,
    },
    {
      id: "4",
      name: "Emma Wilson",
      lastMessage: "Thanks for the update!",
      timestamp: "2h",
      isGroup: false,
      members: ["emma"],
    },
    {
      id: "5",
      name: "Marketing Squad",
      lastMessage: "Lisa: Campaign results look great",
      timestamp: "3h",
      isGroup: true,
      members: ["user1", "user2", "user3", "user4", "user5", "user6", "user7"],
    },
    {
      id: "6",
      name: "James Lee",
      lastMessage: "Can you review my PR?",
      timestamp: "5h",
      isGroup: false,
      members: ["james"],
    },
    {
      id: "7",
      name: "Weekend Plans",
      lastMessage: "Tom: I'm in! 🎉",
      timestamp: "Yesterday",
      isGroup: true,
      members: ["user1", "user2", "user3", "user4"],
    },
    {
      id: "8",
      name: "Sophie Chen",
      lastMessage: "Got it, will do!",
      timestamp: "Yesterday",
      isGroup: false,
      members: ["sophie"],
    },
  ];

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    // Reset to first text channel when selecting a group chat
    if (chat.isGroup) {
      setSelectedChannelId("t1");
    }
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
  };

  const getCurrentMessages = (): Message[] => {
    const key = selectedChat.isGroup
      ? `${selectedChat.id}-${selectedChannelId}`
      : selectedChat.id;
    return allMessages[key] || [];
  };

  const handleSendMessage = (text: string) => {
    const key = selectedChat.isGroup
      ? `${selectedChat.id}-${selectedChannelId}`
      : selectedChat.id;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "You",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isCurrentUser: true,
      readBy: [],
    };

    setAllMessages((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newMessage],
    }));
  };

  const handleDeleteMessage = (messageId: string) => {
    const key = selectedChat.isGroup
      ? `${selectedChat.id}-${selectedChannelId}`
      : selectedChat.id;

    setAllMessages((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((msg) => msg.id !== messageId),
    }));
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    const key = selectedChat.isGroup
      ? `${selectedChat.id}-${selectedChannelId}`
      : selectedChat.id;

    setAllMessages((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((msg) =>
        msg.id === messageId ? { ...msg, text: newText } : msg
      ),
    }));
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <ChatListSidebar
        selectedChatId={selectedChat.id}
        onSelectChat={handleSelectChat}
        chats={chats}
      />
      {selectedChat.isGroup && (
        <ChannelSidebar
          chatName={selectedChat.name}
          selectedChannelId={selectedChannelId}
          onSelectChannel={handleSelectChannel}
        />
      )}
      <ChatArea
        chatId={selectedChat.id}
        channelId={selectedChannelId}
        chatName={selectedChat.name}
        isGroup={selectedChat.isGroup}
        messages={getCurrentMessages()}
        onSendMessage={handleSendMessage}
        onDeleteMessage={handleDeleteMessage}
        onEditMessage={handleEditMessage}
        totalMembers={selectedChat.members?.length || 2}
      />
    </div>
  );
}
