ALTER TABLE attachments
  ADD COLUMN IF NOT EXISTS owner_org_id TEXT,
  ADD COLUMN IF NOT EXISTS workspace_id TEXT,
  ADD COLUMN IF NOT EXISTS access_scope TEXT,
  ADD COLUMN IF NOT EXISTS access_group_ids JSONB,
  ADD COLUMN IF NOT EXISTS vector_indexed_at BIGINT,
  ADD COLUMN IF NOT EXISTS vector_error TEXT;

UPDATE attachments
SET access_scope = COALESCE(access_scope, 'user')
WHERE access_scope IS NULL;
