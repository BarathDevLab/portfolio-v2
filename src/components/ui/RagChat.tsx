"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RagChatProps {
  isModal?: boolean;
  onClose?: () => void;
}

const RagChat: React.FC<RagChatProps> = ({ isModal = false, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Bharath's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || data.response || data.message || "Sorry, I couldn't process that." },
      ]);
    } catch (err) {
      setError("Failed to connect. Please try again.");
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`relative h-full w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl ${
        isModal ? "max-h-[80vh]" : ""
      }`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h4 className="font-medium text-white">Portfolio Assistant</h4>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Chat Body */}
      <div className="flex-1 py-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "assistant"
                ? "bg-white/5 rounded-lg p-4 max-w-[85%] rounded-tl-none"
                : "bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 max-w-[85%] ml-auto rounded-tr-none"
            }`}
          >
            <p
              className={`text-sm ${
                message.role === "assistant" ? "text-gray-300" : "text-blue-100"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-white/5 rounded-lg p-4 max-w-[85%] rounded-tl-none">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 max-w-[85%]">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className={`p-2 bg-blue-600 rounded-lg text-white transition-all ${
              isLoading || !input.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 hover:scale-105"
            }`}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RagChat;
