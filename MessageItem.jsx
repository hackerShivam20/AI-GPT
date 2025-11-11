export default function MessageItem({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-wrap break-words shadow-sm
          ${
            isUser
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-[rgb(var(--muted))] text-[rgb(var(--text))] rounded-bl-sm"
          }`}
      >
        {message.content}
        <div
          className={`mt-1 text-[10px] opacity-70 ${
            isUser ? "text-white" : "text-slate-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
