import { useEffect, useRef, useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const taRef = useRef(null);

  const submit = () => {
    if (disabled) return;
    const text = value;
    setValue("");
    onSend?.(text);
  };

  // Auto-resize textarea (simple)
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  }, [value]);

  return (
    <div className="max-w-3xl mx-auto p-3">
      <div className="rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
        <textarea
          ref={taRef}
          className="w-full bg-transparent resize-none outline-none px-3 py-3"
          placeholder="Message AI…"
          value={value}
          disabled={disabled}
          rows={1}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value.trim()) submit();
            }
          }}
        />
        <div className="flex items-center justify-between px-3 pb-3 text-xs text-slate-500">
          <span>Shift + Enter for newline</span>
          <button
            className={`px-3 py-1 rounded-lg border ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={submit}
            disabled={disabled}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
