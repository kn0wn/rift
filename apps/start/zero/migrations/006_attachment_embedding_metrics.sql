ALTER TABLE attachments
  ADD COLUMN IF NOT EXISTS embedding_model TEXT,
  ADD COLUMN IF NOT EXISTS embedding_tokens BIGINT,
  ADD COLUMN IF NOT EXISTS embedding_cost_usd DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS embedding_dimensions BIGINT,
  ADD COLUMN IF NOT EXISTS embedding_chunks BIGINT,
  ADD COLUMN IF NOT EXISTS embedding_status TEXT;

