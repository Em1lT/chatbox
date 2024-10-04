import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import { useEffect } from "react";

export type Message = {
  role: string;
  content: string;
};

type MessageProps = {
  messages: Message[];
};

export const MessageLayout = ({
  isUser,
  children,
}: {
  isUser: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
    animate={{
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    }}
      className={cn(
        "flex flex-row gap-2 items-center mx-12",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {children}
    </motion.div>
  );
};

export const Message = ({ message }: { message: Message }) => {
  const isUser = message.role === "USER";
  return (
    <MessageLayout isUser={isUser}>
      {!isUser ? <CorrectIcon isUser={isUser} /> : null}
      <div className="text-balance bg-white p-4 rounded-lg">
        {message.content}
      </div>
      {isUser ? <CorrectIcon isUser={isUser} /> : null}
    </MessageLayout>
  );
};

export const CorrectIcon = ({ isUser }: { isUser: boolean }) => {
  return (
    <div className={cn("text-center h-full")}>
      <p
        className={cn(
          "p-4 rounded-lg",
          isUser ? "bg-blue-300" : "bg-green-300",
        )}
      >
        {isUser ? "🧝" : "🤖"}
      </p>
    </div>
  );
};

export default function Messages({ messages }: MessageProps) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <motion.div layout className="w-full flex flex-col-reverse p-0 justify-start h-full overflow-auto">
      <div className="flex flex-col justify m-2 p-0 gap-4 overflow-auto">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </motion.div>
  );
}
