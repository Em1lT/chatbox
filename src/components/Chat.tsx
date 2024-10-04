"use client";

import InputForm from "@/components/InputForm";
import Messages, { Message } from "./Messages";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useChat from "@/hooks/useChat";
import { ChatHeader } from "./ChatHeader";

type ChatProps = {
  className: string;
};

export default function Chat({ className }: ChatProps) {
  const [messageList, setMessages] = useState<Message[]>([]);
  const { sendMessage, upcomingMessage, done, setUpcomingMessage, isLoading } =
    useChat();

  const addMessage = (message: Message) => {
    setMessages((arr) => [...arr, message]);
  };

  const handleSubmit = async (message: string) => {
    addMessage({
      role: "USER",
      content: message,
    });
    await sendMessage(message);
  };

  useEffect(() => {
    if (done) {
      addMessage({
        role: "AI",
        content: upcomingMessage,
      });
      setUpcomingMessage("");
    }
  }, [done]);

  return (
    <div
      className={cn(
        "w-full bg-gray-100 max-w-xl rounded-lg border-4 border-blue-500 flex flex-col",
        ...className.split(" "),
      )}
    >
      <ChatHeader />
      <Messages messages={messageList} />
      <div className="p-4">
        {isLoading && (
          <Message
            message={{
              role: "AI",
              content: "🤖 Thinking...",
            }}
          />
        )}
        {upcomingMessage && (
          <Message
            message={{
              role: "AI",
              content: upcomingMessage,
            }}
          />
        )}
      </div>
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
}
