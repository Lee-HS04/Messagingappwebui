import { Send, Plus, Smile, MoreVertical, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { MessageContextMenu } from "./MessageContextMenu";

interface ChatAreaProps {
  chatId: string;
  channelId: string;
  chatName: string;
  isGroup: boolean;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onEditMessage: (messageId: string, newText: string) => void;
  totalMembers?: number;
}

export function ChatArea({
  chatId,
  channelId,
  chatName,
  isGroup,
  messages,
  onSendMessage,
  onDeleteMessage,
  onEditMessage,
  totalMembers = 12,
}: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    messageId: string;
    readBy: string[];
  } | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      if (editingMessageId) {
        onEditMessage(editingMessageId, messageInput);
        setEditingMessageId(null);
      } else {
        onSendMessage(messageInput);
      }
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    message: Message
  ) => {
    if (message.isCurrentUser) {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        messageId: message.id,
        readBy: message.readBy || [],
      });
    }
  };

  const handleDelete = (messageId: string) => {
    onDeleteMessage(messageId);
    setContextMenu(null);
  };

  const handleEdit = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setMessageInput(message.text);
      setEditingMessageId(messageId);
    }
    setContextMenu(null);
  };

  const getReadStatus = (readBy: string[]): string => {
    if (isGroup) {
      const readCount = readBy.length;
      if (readCount >= totalMembers - 1) {
        // -1 because we don't count the sender
        return "Read";
      }
      return `Read by ${readCount}/${totalMembers - 1}`;
    } else {
      // For direct messages
      return readBy.length > 0 ? "Read" : "Delivered";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="h-16 border-b border-zinc-200 px-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900">{chatName}</h3>
          {isGroup ? (
            <p className="text-xs text-zinc-500">
              Sarah, Mike, Emma and {totalMembers - 3} others
            </p>
          ) : (
            <p className="text-xs text-zinc-500">Active now</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isGroup && (
            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-zinc-600" />
            </button>
          )}
          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isCurrentUser ? "justify-end" : "justify-start"
            }`}
            onContextMenu={(e) => handleContextMenu(e, message)}
          >
            <div
              className={`max-w-[70%] ${
                message.isCurrentUser ? "items-end" : "items-start"
              } flex flex-col`}
            >
              {!message.isCurrentUser && isGroup && (
                <span className="text-xs font-medium text-zinc-700 mb-1 px-1">
                  {message.sender}
                </span>
              )}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.isCurrentUser
                    ? "bg-purple-600 text-white cursor-context-menu"
                    : "bg-white border border-zinc-200 text-zinc-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <span className="text-xs text-zinc-400 mt-1 px-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-zinc-200 p-4">
        {editingMessageId && (
          <div className="mb-2 px-4 py-2 bg-purple-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-purple-700">Editing message...</span>
            <button
              onClick={() => {
                setEditingMessageId(null);
                setMessageInput("");
              }}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-end gap-2">
          {!isGroup && (
            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors flex-shrink-0">
              <Plus className="w-5 h-5 text-zinc-600" />
            </button>
          )}

          <div className="flex-1 bg-zinc-50 rounded-lg border border-zinc-200 flex items-end">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 resize-none outline-none"
              rows={1}
              style={{
                minHeight: "44px",
                maxHeight: "120px",
              }}
            />
            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors flex-shrink-0 m-1">
              <Smile className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <MessageContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onDelete={() => handleDelete(contextMenu.messageId)}
          onEdit={() => handleEdit(contextMenu.messageId)}
          readStatus={getReadStatus(contextMenu.readBy)}
        />
      )}
    </div>
  );
}
