"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePathname, useRouter } from "next/navigation";
import { generateUUID } from "../lib/utils";
import { useModel } from "@/contexts/model-context";
import { toast } from "sonner";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatShell from "@/components/ai/ChatShell";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai/conversation";
import { Message, MessageContent } from "@/components/ai/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai/prompt-input";
import { Response } from "@/components/ai/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai/reasoning";
import { Loader } from "@/components/ai/loader";
import { MODELS } from "@/lib/ai/ai-providers";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useStickToBottomContext } from "use-stick-to-bottom";
import { GlobeIcon, PaperclipIcon } from "lucide-react";

function AutoScroller({ deps }: { deps: any[] }) {
  const { scrollToBottom } = useStickToBottomContext();
  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return null;
}

export default function ChatInterface({
  id,
  initialMessages,
  disableInput = false,
  onInitialMessage,
}: {
  id: string;
  initialMessages?: UIMessage[];
  disableInput?: boolean;
  onInitialMessage?: (message: UIMessage) => Promise<void>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedModel, setSelectedModel } = useModel();
  const [input, setInput] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<UIMessage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isThread = id !== "welcome";
  const { results: threadDocs = [] } = usePaginatedQuery(
    api.threads.getThreadMessagesPaginated,
    isThread ? { threadId: id } : "skip",
    { initialNumItems: 10 }
  );

  const initialFromConvex: UIMessage[] = useMemo(() => {
    if (!isThread || !threadDocs || threadDocs.length === 0) return [];
    const chrono = [...threadDocs].reverse();
    return chrono.map((m: any) => ({
      id: m.messageId,
      role: m.role,
      parts: [
        ...(m.reasoning ? [{ type: "reasoning", text: m.reasoning } as any] : []),
        ...(m.content ? [{ type: "text", text: m.content } as any] : []),
      ],
    }));
  }, [isThread, threadDocs]);

  // Flags to manage one-time autostart
  const autostartRef = useRef(false);
  const autostartTriggeredRef = useRef(false);

  const {
    messages,
    stop,
    status,
    setMessages,
    sendMessage,
    regenerate,
  } = useChat({
    id,
    generateId: generateUUID,
    onFinish({ message }: { message: UIMessage }) {
      if (pathname === "/") {
        router.push(`/chat/${id}`);
        router.refresh();
      }
    },
    onError(error: Error) {
      console.error("Chat error:", error);
      toast.error("An error occurred. Please try again.");
    },
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: { messages, modelId: selectedModel, threadId: id },
      }),
    }),
  });

  useEffect(() => {
    if ((initialMessages && initialMessages.length > 0) && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages, messages.length]);

  useEffect(() => {
    if (messages.length === 0 && initialFromConvex.length > 0) {
      setMessages(initialFromConvex);
    }
  }, [messages.length, initialFromConvex, setMessages]);

  // Auto-start assistant generation after redirect when only the first user message is present
  useEffect(() => {
    if (!isThread) return;
    if (autostartTriggeredRef.current) return;
    if (messages.length === 0) return;
    const hasAssistant = messages.some((m) => m.role === "assistant");
    const hasUser = messages.some((m) => m.role === "user");
    if (hasUser && !hasAssistant) {
      autostartTriggeredRef.current = true;
      autostartRef.current = true;
      try {
        regenerate?.();
      } finally {
        setTimeout(() => {
          autostartRef.current = false;
        }, 0);
      }
    }
  }, [isThread, messages, regenerate]);

  const renderedMessages: UIMessage[] = useMemo(
    () => {
      // Show optimistic messages first, then regular messages
      if (optimisticMessages.length > 0) {
        return optimisticMessages;
      }
      return messages.length > 0 ? messages : (initialMessages ?? initialFromConvex);
    },
    [optimisticMessages, messages, initialMessages, initialFromConvex]
  );

  const handleStopStream = useCallback(() => {
    stop();
    if (pathname === "/") {
      router.push(`/chat/${id}`);
      router.refresh();
    }
  }, [stop, pathname, router, id]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disableInput) return;
    setInput(e.target.value);
  }, [disableInput]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (disableInput || !input.trim()) return;

    const messageContent = input.trim();
    const messageId = generateUUID();

    setInput("");

    try {
      if (id === "welcome" && onInitialMessage) {
        // Handle initial message on welcome page
        const optimisticMessage: UIMessage = {
          id: messageId,
          role: "user",
          parts: [{ type: "text", text: messageContent }],
        };

        // Show optimistic message immediately
        setOptimisticMessages([optimisticMessage]);

        // Call the onInitialMessage callback to create thread
        await onInitialMessage(optimisticMessage);
      } else if (id !== "welcome") {
        // Use normal sendMessage for existing threads
        await sendMessage({
          id: messageId,
          role: "user",
          parts: [{ type: "text", text: messageContent }],
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
      setInput(messageContent);
      // Clear optimistic messages on error
      setOptimisticMessages([]);
    }
  }, [disableInput, input, sendMessage, id, onInitialMessage, setOptimisticMessages]);

  const handleAttachClick = useCallback(() => {
    if (disableInput) return;
    fileInputRef.current?.click();
  }, [disableInput]);

  const handleFilesSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const names = files.map((f) => `[${f.name}]`).join(" ");
    setInput((prev) => (prev ? `${prev} ${names}` : names));
    // reset to allow selecting the same file again
    e.currentTarget.value = "";
  }, []);

  const handleWebSearch = useCallback(() => {
    const q = input.trim();
    const url = q ? `https://www.google.com/search?q=${encodeURIComponent(q)}` : "https://www.google.com";
    window.open(url, "_blank", "noopener,noreferrer");
  }, [input]);

  const models = MODELS;

  const sidebar = useMemo(() => (
    <div className="h-full w-full">
      <div className="p-4">
        <h2 className="mb-2 text-sm font-semibold">Sidebar</h2>
        <p className="text-muted-foreground text-sm">Toggle me to expand/collapse. Content pushes chat and input.</p>
      </div>
    </div>
  ), []);

  return (
    <ChatShell sidebar={sidebar}>
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <AutoScroller deps={[messages.length, status]} />
          <ConversationContent>
            <div className="mx-auto w-full max-w-3xl">
              {renderedMessages.map((message) => (
                <div key={message.id}>
                  {message.role === 'assistant' && (
                    <Sources>
                      <SourcesTrigger
                        count={message.parts.filter((part: any) => (part as any).type === 'source-url').length}
                      />
                      {message.parts.filter((part: any) => (part as any).type === 'source-url').map((part: any, i: number) => (
                        <SourcesContent key={`${message.id}-${i}`}>
                          <Source
                            key={`${message.id}-${i}`}
                            href={(part as any).url}
                            title={(part as any).url}
                          />
                        </SourcesContent>
                      ))}
                    </Sources>
                  )}
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      {message.parts.map((part: any, i: number) => {
                        switch ((part as any).type) {
                          case 'text':
                            return (
                              <Response key={`${message.id}-${i}`}>
                                {(part as any).text}
                              </Response>
                            );
                          case 'reasoning':
                            return (
                              <Reasoning
                                key={`${message.id}-${i}`}
                                className="w-full"
                                isStreaming={status === 'streaming'}
                              >
                                <ReasoningTrigger />
                                <ReasoningContent>{(part as any).text}</ReasoningContent>
                              </Reasoning>
                            );
                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                </div>
              ))}
              {status === 'submitted' && <Loader />}
            </div>
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="mx-auto w-full max-w-3xl">
          <PromptInput onSubmit={handleSubmit} className="mt-4">
            <PromptInputTextarea
              onChange={handleInputChange}
              value={input}
              disabled={disableInput}
            />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton onClick={handleAttachClick} aria-label="Add attachments" disabled={disableInput}>
                  <PaperclipIcon size={16} />
                </PromptInputButton>
                <PromptInputButton onClick={handleWebSearch} aria-label="Search the web" disabled={false}>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
                <PromptInputModelSelect
                  onValueChange={(value) => setSelectedModel(value)}
                  value={selectedModel}
                  disabled={disableInput}
                >
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((m) => (
                      <PromptInputModelSelectItem key={m.id} value={m.id}>
                        {m.name}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              </PromptInputTools>
              <PromptInputSubmit disabled={!input || disableInput} status={status} />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
            </PromptInputToolbar>
          </PromptInput>

          {status === 'streaming' && (
            <div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
              <Loader />
              <button
                type="button"
                className="underline"
                onClick={handleStopStream}
              >
                Stop generating
              </button>
            </div>
          )}
        </div>
      </div>
    </ChatShell>
  );
}
