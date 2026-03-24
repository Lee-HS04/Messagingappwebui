import { Hash, Volume2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Channel, ChannelGroup } from "../types";

interface ChannelSidebarProps {
  chatName: string;
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
}

export function ChannelSidebar({ chatName, selectedChannelId, onSelectChannel }: ChannelSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["1", "2"]);

  const channelGroups: ChannelGroup[] = [
    {
      id: "1",
      name: "TEXT CHANNELS",
      channels: [
        { id: "t1", name: "general", type: "text" },
        { id: "t2", name: "announcements", type: "text" },
        { id: "t3", name: "random", type: "text" },
        { id: "t4", name: "help", type: "text" },
      ],
    },
    {
      id: "2",
      name: "VOICE CHANNELS",
      channels: [
        { id: "v1", name: "General Voice", type: "voice" },
        { id: "v2", name: "Team Meeting", type: "voice" },
        { id: "v3", name: "Lounge", type: "voice" },
      ],
    },
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="w-[15%] bg-zinc-50 border-r border-zinc-200 flex flex-col">
      <div className="p-4 border-b border-zinc-200">
        <h2 className="font-semibold text-zinc-900">{chatName}</h2>
        <p className="text-xs text-zinc-500 mt-0.5">12 members online</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {channelGroups.map((group) => (
          <div key={group.id} className="mb-2">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full px-3 py-2 flex items-center gap-1 hover:bg-zinc-100 transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 text-zinc-600 transition-transform ${
                  expandedGroups.includes(group.id) ? "" : "-rotate-90"
                }`}
              />
              <span className="text-xs font-semibold text-zinc-600">
                {group.name}
              </span>
            </button>

            {expandedGroups.includes(group.id) && (
              <div className="space-y-0.5">
                {group.channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onSelectChannel(channel.id)}
                    className={`w-full px-3 py-1.5 pl-6 flex items-center gap-2 hover:bg-zinc-100 transition-colors text-left ${
                      selectedChannelId === channel.id ? "bg-zinc-200" : ""
                    }`}
                  >
                    {channel.type === "text" ? (
                      <Hash className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-zinc-500" />
                    )}
                    <span className="text-sm text-zinc-700">
                      {channel.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}