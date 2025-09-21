import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { withAuth } from "@workos-inc/authkit-nextjs";

export const runtime = "edge";

const jsonResponse = (data: object, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const MAX_CONTENT_LENGTH = 10000;

export async function POST(req: Request) {
  try {
    const auth = await withAuth();
    if (!auth.accessToken || !auth.user?.id)
      return jsonResponse({ error: "Unauthorized" }, 401);

    const { threadId, messageId, newContent } = await req.json();
    if (!threadId || !messageId || !newContent?.trim())
      return jsonResponse({ error: "Missing required fields" }, 400);

    // Validate input constraints
    if (
      typeof newContent !== "string" ||
      newContent.length > MAX_CONTENT_LENGTH
    )
      return jsonResponse({ error: "Invalid content" }, 400);

    // Verify thread ownership before any operations
    const threadInfo = await fetchQuery(
      api.threads.getThreadInfo,
      { threadId },
      { token: auth.accessToken },
    );
    if (!threadInfo)
      return jsonResponse({ error: "Thread not found or access denied" }, 404);

    // Edit message and delete subsequent messages
    await fetchMutation(
      api.threads.editMessage,
      { threadId, messageId, content: newContent.trim() },
      { token: auth.accessToken },
    );

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Edit API error:", error);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
}
