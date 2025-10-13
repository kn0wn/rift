import ChatShell from "@/components/ai/ChatShell";
import { ThreadSidebar } from "@/components/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatShell sidebar={<ThreadSidebar />}>
      {children}
    </ChatShell>
  );
}
