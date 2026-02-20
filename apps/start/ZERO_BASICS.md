# Zero sync – basics and setup

Zero is **query-driven sync** from Postgres: zero-cache replicates your upstream Postgres into a SQLite replica and syncs to clients only the rows needed for the **queries** you define. Convex remains your second DB and is unchanged.

## Mental model

- **Queries** – Defined in code (`defineQueries`). The client runs ZQL optimistically against local storage. zero-cache calls your **ZERO_QUERY_URL** with query name + args; your server returns ZQL (and enforces permissions via `context`). zero-cache runs that ZQL on its SQLite replica and returns results to the client.
- **Mutators** – Run optimistically on the client, then zero-cache calls your **ZERO_MUTATE_URL**; your server runs the mutator against Postgres. Replication streams changes back to clients.
- **Schema** – Zero schema in code mirrors your Postgres tables (with optional `.from()` for name mapping). It can be generated from Drizzle/Prisma or written by hand.

## What’s in this app

| Piece | Location | Notes |
|-------|----------|--------|
| **Schema** | `src/integrations/zero/schema.ts` | Tables: user, organization, thread, message (mirror Convex shape). Column names map to Postgres snake_case via `.from()`. |
| **Queries** | `src/integrations/zero/queries.ts` | `threads.byUser` (uses `ctx.userID`), `messages.byThread({ threadId })`. |
| **Mutators** | `src/integrations/zero/mutators.ts` | `threads.create`, `messages.create` (client-generated ids; server checks `ctx.userID`). |
| **Provider** | `src/integrations/zero/provider.tsx` | Uses `VITE_ZERO_CACHE_URL`; placeholder `userID` until auth is wired. |
| **Query API** | `src/routes/api/zero/query/route.tsx` | POST handler for ZERO_QUERY_URL. Context from `X-Zero-User-Id` header (replace with real auth). |
| **Mutate API** | `src/routes/api/zero/mutate/route.tsx` | POST handler for ZERO_MUTATE_URL. Uses `ZERO_UPSTREAM_DB` + pg Pool; context from `X-Zero-User-Id`. |
| **Postgres migration** | `zero/migrations/001_initial_zero_tables.sql` | Run against ZERO_UPSTREAM_DB to create users, organizations, threads, messages (snake_case columns). |

## Server endpoints (zero-cache config)

zero-cache must know where to call your app:

- **ZERO_QUERY_URL** – e.g. `https://your-app.com/api/zero/query`
- **ZERO_MUTATE_URL** – e.g. `https://your-app.com/api/zero/mutate`

Set these in the **zero-cache** environment (e.g. Railway). Your app only needs to expose these two POST routes (already implemented above).

Context (e.g. `userID`) is currently read from the **X-Zero-User-Id** header in both handlers. For production:

- Use **real auth**: verify JWT/session from cookies (and set `ZERO_QUERY_FORWARD_COOKIES` / `ZERO_MUTATE_FORWARD_COOKIES` so zero-cache forwards cookies), or pass a signed token and verify it in the handler.
- Ensure the context you pass to queries/mutators (e.g. `ctx.userID`) matches the authenticated user.

## Postgres and zero-cache

1. **Run the migration** against your upstream Postgres (the one in `ZERO_UPSTREAM_DB`):
   ```bash
   psql "$ZERO_UPSTREAM_DB" -f apps/start/zero/migrations/001_initial_zero_tables.sql
   ```
2. zero-cache uses **ZERO_UPSTREAM_DB** and by default replicates all tables in the `public` schema. To restrict, set **ZERO_APP_PUBLICATIONS** to a Postgres publication that includes only `users`, `organizations`, `threads`, `messages`.

## Convex vs Zero

- **Convex** – Stays as your second DB (realtime, server functions, etc.). No change.
- **Zero** – Syncs from **Postgres** only. The tables (users, orgs, threads, messages) in Zero mirror the *shape* of your Convex schema but live in Postgres. If you want the same data in both, you need a sync strategy (e.g. dual-write, or ETL from Convex → Postgres).

## Pitfalls (from [llms.txt](https://zero.rocicorp.dev/llms.txt))

- Treat query results as **immutable** (don’t mutate objects from `useQuery`).
- Prefer **client-generated IDs** in mutators (e.g. `uuidv7`, `nanoid`); **don’t** generate IDs inside mutators (they run multiple times).
- **Optimize queries** (e.g. `npx analyze-query`); avoid heavy/unindexed queries.
- Resetting the DB locally: delete the SQLite replica and restart zero-cache.

## Using in React

```tsx
import { useQuery, useZero } from '@rocicorp/zero/react'
import { queries, mutators } from '@/integrations/zero'

// Read threads for current user (context.userID from provider)
const [threads] = useQuery(queries.threads.byUser())

// Read messages for a thread
const [messages] = useQuery(queries.messages.byThread({ threadId: '...' }))

// Create a thread (pass client-generated id)
const zero = useZero()
zero.mutate(mutators.threads.create({ id: nanoid(), threadId: nanoid(), title: '...', ... }))
```

Full reference: [zero.rocicorp.dev/llms.txt](https://zero.rocicorp.dev/llms.txt).
