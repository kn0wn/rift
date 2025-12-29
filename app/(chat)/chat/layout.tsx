import { ChatRouteClient } from "@/components/chat/ChatRouteClient";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatRouteClient />
      {children}
    </>
  );
}


