import ChatInterface from "@/components/chat-interface";
import { generateUUID } from "@/lib/utils";

export default function Home() {
  const id = generateUUID();

  return <ChatInterface id={id} />;
}
