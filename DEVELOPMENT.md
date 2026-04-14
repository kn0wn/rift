# Development Guide

This guide covers how to set up and run the Rift development environment locally.

## Prerequisites

- [Bun](https://bun.sh/) (v1.2.23 or later) - Runtime and package manager
- [Docker](https://docs.docker.com/get-docker/) - For PostgreSQL

## Quick Start

For the impatient, here is the minimal setup to get the dev server running:

```bash
# 1. Install dependencies
bun install

# 2. Start PostgreSQL
docker compose -f docker-compose.postgres.yml up -d

# 3. Set up database schema
bun run web:db:reset

# 4. Copy environment template
cp apps/start/.env.example apps/start/.env.local
# Edit .env.local and add at minimum: BETTER_AUTH_SECRET

# 5. Start the dev server
bun run dev
```

The app will be available at `http://localhost:3000`.

## Detailed Setup

### 1. Install Dependencies

```bash
bun install
```

This installs all workspace dependencies across the monorepo.

### 2. Database Setup

Rift uses PostgreSQL for persistence. The easiest way is via Docker:

```bash
docker compose -f docker-compose.postgres.yml up -d
```

This starts PostgreSQL on port 5432 with:

- Database: `rift`
- Username: `rift`
- Password: `rift`

Next, initialize the database schema:

```bash
bun run db:reset
```

### 3. Environment Configuration

Create your local environment file:

```bash
cp apps/start/.env.example apps/start/.env.local
```

Edit `apps/start/.env.local` and configure the required envs.

### 4. Markdown Converter Worker Setup

Rift uses a Cloudflare Worker to convert uploaded files (PDFs, Office docs, etc.) to markdown. This is required for file attachments.

```bash
bun setup:markdown-worker
```

This interactive script will:

1. Check prerequisites
2. Authenticate with Cloudflare
3. Deploy the worker
4. Generate API credentials

Add the output to your `apps/start/.env.local`:

```bash
CF_MARKDOWN_WORKER_URL=https://your-worker.your-subdomain.workers.dev
CF_MARKDOWN_WORKER_TOKEN=your-generated-token
```

### 5. Zero Cache Binary

After installation, Zero's native SQLite binary needs to be downloaded:

```bash
cd node_modules/@rocicorp/zero-sqlite3
npm run install
```

Without this, the Zero cache will crash with "Could not locate the bindings file."

## Running the Dev Server

From the repository root:

```bash
bun run dev
```

This starts:

- The TanStack Start dev server on port 3000
- Zero cache on port 4848
- Turbo task runner with TUI

Access the app at: `http://localhost:3000`

### Available Scripts

From repository root:

```bash
bun run dev          # Start dev server with Zero cache
bun run build        # Build for production
bun run lint         # Run linter across all packages
bun run check        # Run type checks
bun run db:reset     # Reset database and run migrations
```

From `apps/start/`:

```bash
# Database
bun run db:reset     # Reset database and run migrations
bun run zero:migrate # Run Zero migrations
bun run zero:reset   # Reset Zero sync state

# Development
bun run dev          # Start dev server only
bun run zero-cache   # Start Zero cache only

# Testing
bun run test         # Run Vitest tests
bun run lint         # Run ESLint
bun run lint:fix     # Run ESLint with auto-fix

# Utilities
bun run seed:dummy-chats  # Seed with test data
```

## Troubleshooting

### "Could not locate the bindings file" (Zero)

The SQLite native binary needs to be installed:

```bash
cd node_modules/@rocicorp/zero-sqlite3
npm run install
```

### Port already in use

- Port 3000: Used by the TanStack Start dev server
- Port 4848: Used by Zero cache
- Port 5432: Used by PostgreSQL

If these are taken, you can modify ports in the respective config files.

### Database connection errors

Ensure PostgreSQL is running:

```bash
docker compose -f docker-compose.postgres.yml ps
```

If needed, restart it:

```bash
docker compose -f docker-compose.postgres.yml restart
```

See [README.md](./README.md) for more project details.
