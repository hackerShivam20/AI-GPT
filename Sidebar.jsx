import { useState } from "react";

export default function Sidebar({
  sessions,
  activeId,
  onAdd,
  onSwitch,
  onRename,
  onDelete,
  onDownload,
}) {
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const startEdit = (sess) => {
    setEditingId(sess.id);
    setTempTitle(sess.title);
  };

  const commitEdit = () => {
    if (editingId) onRename(editingId, tempTitle.trim() || "Untitled");
    setEditingId(null);
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <button
        className="w-full px-3 py-2 rounded-lg bg-blue-500 text-white"
        onClick={onAdd}
      >
        + New Chat
      </button>

      <div className="overflow-auto flex-1 pr-1 space-y-1">
        {sessions.map((sess) => {
          const active = sess.id === activeId;
          return (
            <div
              key={sess.id}
              className={`group rounded-lg border dark:border-slate-700 ${
                active ? "border-blue-500" : "border-transparent"
              }`}
            >
              <div
                className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg ${
                  active
                    ? "bg-blue-50 dark:bg-slate-800/50"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/40"
                }`}
                onClick={() => onSwitch(sess.id)}
              >
                {editingId === sess.id ? (
                  <input
                    className="flex-1 bg-transparent outline-none border-b border-slate-300 dark:border-slate-600"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit()}
                    autoFocus
                  />
                ) : (
                  <div className="flex-1 truncate">{sess.title}</div>
                )}

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <button
                    className="px-2 py-1 text-xs rounded-lg border"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(sess);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    className="px-2 py-1 text-xs rounded-lg border"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(sess.id);
                    }}
                  >
                    JSON
                  </button>
                  <button
                    className="px-2 py-1 text-xs rounded-lg border border-red-500 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(sess.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="px-2 pb-2 text-[10px] text-slate-500">
                {new Date(sess.updatedAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-slate-500">Sessions: {sessions.length}</div>
    </div>
  );
}
