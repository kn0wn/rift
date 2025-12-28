import { ChatMessagesClient } from "@/components/chat-messages-client";

export function generateMetadata() {
  return { title: "Chat" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatMessagesClient threadId={id} />;
}
