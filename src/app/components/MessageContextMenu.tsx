import { useEffect, useRef } from "react";
import { Trash2, Edit2, Eye } from "lucide-react";

interface MessageContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  readStatus: string; // e.g., "Read by 5/12" or "Read"
}

export function MessageContextMenu({
  x,
  y,
  onClose,
  onDelete,
  onEdit,
  readStatus,
}: MessageContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-50 min-w-[180px]"
      style={{ left: x, top: y }}
    >
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 flex items-center gap-3"
      >
        <Edit2 className="w-4 h-4" />
        Edit Message
      </button>
      <button
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
      >
        <Trash2 className="w-4 h-4" />
        Delete Message
      </button>
      <div className="border-t border-zinc-200 my-1"></div>
      <div className="px-4 py-2 text-sm text-zinc-600 flex items-center gap-3">
        <Eye className="w-4 h-4" />
        {readStatus}
      </div>
    </div>
  );
}
