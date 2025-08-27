import { NextResponse } from "next/server";

// Temporary route while migrating to Convex
// TODO: Convert this route to use Convex for data operations
export async function POST() {
  return NextResponse.json(
    {
      error: "Chat API is temporarily disabled during migration to Convex. Please use the chat interface directly.",
      status: 503,
    },
    { status: 503 }
  );
}
