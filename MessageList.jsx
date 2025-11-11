import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);
  const topRef = useRef(null);

  const containerRef = useRef(null);
  const [showDown, setShowDown] = useState(false);
  const [showUp, setShowUp] = useState(false);

  // Auto-scroll when new messages appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Detect scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atTop = el.scrollTop === 0;
      const atBottom =
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 10;

      setShowUp(!atTop);       // show "scroll to top"
      setShowDown(!atBottom);  // show "scroll to bottom"
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-y-auto hide-scrollbar"
    >
      {/* Scrollable content */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <div ref={topRef}></div>

        {messages.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))}

        {loading && (
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
            <span>AI is typing…</span>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Scroll To Top button */}
      {showUp && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-20 right-6
            md:bottom-24 md:right-10
            bg-gray-700 text-white p-3 rounded-full shadow-lg
            hover:bg-gray-600 transition
          "
        >
          ↑
        </button>
      )}

      {/* Scroll To Bottom button */}
      {showDown && (
        <button
          onClick={scrollToBottom}
          className="
            fixed bottom-6 right-6
            md:bottom-10 md:right-10
            bg-blue-600 text-white p-3 rounded-full shadow-lg
            hover:bg-blue-500 transition
          "
        >
          ↓
        </button>
      )}
    </div>
  );
}