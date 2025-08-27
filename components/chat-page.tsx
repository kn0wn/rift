"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatInterface from "@/components/chat-interface";
import ErrorMessage from "@/components/error-message";
import { UIMessage } from "ai";
import { Id } from "@/convex/_generated/dataModel";

interface ChatPageProps {
  id: string;
}

export default function ChatPage({ id }: ChatPageProps) {
  // Load chat data
  const chat = useQuery(api.chats.getChatById, { id: id as Id<"chats"> });
  
  // Load messages
  const messages = useQuery(api.messages.getMessagesByChatId, { chatId: id as Id<"chats"> });

  // Handle loading states
  if (chat === undefined || messages === undefined) {
    return (
      <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col px-2 pt-14">
        <div className="flex items-center justify-center h-full">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Handle errors
  if (chat === null) {
    return (
      <ErrorMessage 
        chatError="Chat not found" 
        error="The requested chat could not be found." 
      />
    );
  }

  // Convert Convex messages to UI messages
  function convertToUIMessages(convexMessages: typeof messages): Array<UIMessage> {
    if (!convexMessages) return [];
    
    return convexMessages.map((message) => ({
      id: message._id,
      parts: message.parts as UIMessage["parts"],
      role: message.role as UIMessage["role"],
      content: "",
      createdAt: new Date(message._creationTime),
      annotations: message.annotations as UIMessage["annotations"],
    }));
  }

  return (
    <ChatInterface
      id={id}
      initialMessages={convertToUIMessages(messages)}
    />
  );
}
