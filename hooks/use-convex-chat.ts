import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Hook for chat operations
export function useConvexChat() {
  const createChat = useMutation(api.chats.createChat);
  const deleteChat = useMutation(api.chats.deleteChat);
  const toggleChatPin = useMutation(api.chats.toggleChatPin);
  const getChatHistory = useQuery(api.chats.getChatHistory, { userId: "user-id" }); // Replace with actual userId

  return {
    createChat,
    deleteChat,
    toggleChatPin,
    getChatHistory,
  };
}

// Hook for message operations
export function useConvexMessages(chatId: Id<"chats">) {
  const saveMessages = useMutation(api.messages.saveMessages);
  const deleteTrailingMessages = useMutation(api.messages.deleteTrailingMessages);
  const getMessages = useQuery(api.messages.getMessagesByChatId, { chatId });

  return {
    saveMessages,
    deleteTrailingMessages,
    getMessages,
  };
}

// Hook for chat actions (AI-related)
export function useConvexChatActions() {
  const storePausedMessages = useMutation(api.chatActions.storePausedMessages);
  const createOrGetChat = useMutation(api.chatActions.createOrGetChat);

  return {
    storePausedMessages,
    createOrGetChat,
  };
}

// Example usage in a component:
/*
import { useConvexChat, useConvexMessages } from "@/hooks/use-convex-chat";

function ChatComponent({ chatId }: { chatId: Id<"chats"> }) {
  const { createChat, getChatHistory } = useConvexChat();
  const { saveMessages, getMessages } = useConvexMessages(chatId);

  const handleCreateChat = async () => {
    const newChatId = await createChat({
      title: "New Chat",
      userId: "user-123",
    });
    console.log("Created chat:", newChatId);
  };

  const handleSaveMessage = async () => {
    await saveMessages({
      messages: [{
        chatId,
        role: "user",
        parts: [{ type: "text", text: "Hello!" }],
        annotations: [],
      }],
    });
  };

  return (
    <div>
      <button onClick={handleCreateChat}>Create Chat</button>
      <button onClick={handleSaveMessage}>Save Message</button>
      
      {getMessages?.map((message) => (
        <div key={message._id}>
          {message.role}: {JSON.stringify(message.parts)}
        </div>
      ))}
    </div>
  );
}
*/
