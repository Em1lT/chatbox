"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chat from "./Chat";
import { cn } from "@/lib/utils";

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout>
      <AnimatePresence>
        <motion.div
          variants={variants}
          className={cn(
            "fixed bottom-0 right-0 m-8 rounded-lg",
            !isOpen ? "w-16 h-16 bg-blue-500" : "w-[20%] h-[80%] bg-gray-200",
          )}
        >
          {!isOpen ? (
            <p
              onClick={() => setIsOpen(true)}
              className="flex justify-end p-4 text-lg text-white"
            >
              Chat
            </p>
          ) : (
            <>
              <p
                onClick={() => setIsOpen(false)}
                className="flex justify-end p-4 text-lg font-bold"
              >
                X
              </p>
              <Chat className="w-full h-full" />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
