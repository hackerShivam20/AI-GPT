import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { generateGeminiResponse } from "../api/gemini";

export default function ChatWindow({ session, updateMessages }) {
  const [loading, setLoading] = useState(false);

  const addMessage = (role, content, extra = {}) => {
    updateMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
        createdAt: new Date().toISOString(),
        ...extra,
      },
    ]);
  };

  const sendMessage = async (text) => {
    addMessage("user", text);
    setLoading(true);

    const res = await generateGeminiResponse(text);

    if (res.error) {
      addMessage("assistant", `Error: ${res.message}`, { error: true });
    } else {
      addMessage("assistant", res.text);
    }

    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#0F172A]">
      {/* Chat messages */}
      <div
        className="
          flex-1 
          overflow-y-auto 
          px-4              /* add left-right spacing */
          md:px-8          /* more space on bigger screens */
          py-4 
          max-w-4xl        /* widened chat area */
          w-full 
          mx-auto          /* center the content */
        "
      >
        <MessageList messages={session.messages} loading={loading} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-600 bg-[#1E293B] px-4 md:px-8 py-3">
        <MessageInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}