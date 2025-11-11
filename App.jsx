import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useLocalStorage } from "./hooks/useLocalStorage";

const LS_KEY = "ai-chat-state-v1";

function createNewSession(index = 1) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: `New Chat ${index}`,
    createdAt: now,
    updatedAt: now,
    messages: [], // { id, role: "user" | "assistant" | "system", content, createdAt, error? }
  };
}

export default function App() {
  const [state, setState] = useLocalStorage(LS_KEY, {
    sessions: [createNewSession(1)],
    activeId: null,
  });

  // Ensure activeId is set
  useEffect(() => {
    if (!state.activeId && state.sessions.length > 0) {
      setState((s) => ({ ...s, activeId: s.sessions[0].id }));
    }
  }, [state.activeId, state.sessions.length, setState]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeSession = useMemo(
    () => state.sessions.find((s) => s.id === state.activeId),
    [state.sessions, state.activeId]
  );

  // Session actions
  const addSession = () => {
    const idx = state.sessions.length + 1;
    const newSession = createNewSession(idx);
    setState((s) => ({
      sessions: [newSession, ...s.sessions],
      activeId: newSession.id,
    }));
    setSidebarOpen(false);
  };

  const switchSession = (id) => {
    setState((s) => ({ ...s, activeId: id }));
    setSidebarOpen(false);
  };

  const renameSession = (id, title) => {
    setState((s) => ({
      ...s,
      sessions: s.sessions.map((sess) =>
        sess.id === id
          ? { ...sess, title, updatedAt: new Date().toISOString() }
          : sess
      ),
    }));
  };

  const deleteSession = (id) => {
    setState((s) => {
      const sessions = s.sessions.filter((sess) => sess.id !== id);
      const activeId = s.activeId === id ? sessions[0]?.id ?? null : s.activeId;
      return { sessions, activeId };
    });
  };

  const updateMessages = (id, messagesUpdater) => {
    setState((s) => ({
      ...s,
      sessions: s.sessions.map((sess) =>
        sess.id === id
          ? {
              ...sess,
              messages:
                typeof messagesUpdater === "function"
                  ? messagesUpdater(sess.messages)
                  : messagesUpdater,
              updatedAt: new Date().toISOString(),
            }
          : sess
      ),
    }));
  };

  // Temporary: download a session as JSON (we’ll refine later)
  const downloadSession = (id) => {
    const sess = state.sessions.find((s) => s.id === id);
    if (!sess) return;
    const blob = new Blob([JSON.stringify(sess, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sess.title.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-700 md:hidden">
        <button
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <div className="font-semibold">{activeSession?.title ?? "AI Chat"}</div>
        <div className="w-9" />
      </div>

      <div className="h-[calc(100%-49px)] md:h-full flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-20 top-[49px] md:top-0 left-0 h-[calc(100%-49px)] md:h-full w-72 bg-[rgb(var(--muted))] border-r border-slate-200 dark:border-slate-700 p-3 transform transition-transform
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
        >
          <Sidebar
            sessions={state.sessions}
            activeId={state.activeId}
            onAdd={addSession}
            onSwitch={switchSession}
            onRename={renameSession}
            onDelete={deleteSession}
            onDownload={downloadSession}
          />
        </aside>

        {/* Chat window */}
        <main className="flex-1 min-w-0">
          {activeSession ? (
            <ChatWindow
              session={activeSession}
              updateMessages={(updater) =>
                updateMessages(activeSession.id, updater)
              }
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />
          ) : (
            <div className="h-full grid place-items-center">
              <button
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                onClick={addSession}
              >
                Create first chat
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
