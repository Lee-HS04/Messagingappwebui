export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  readBy?: string[]; // Array of user IDs who have read the message
}

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  members?: string[]; // For tracking who's in the chat
}

export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
}

export interface ChannelGroup {
  id: string;
  name: string;
  channels: Channel[];
}
