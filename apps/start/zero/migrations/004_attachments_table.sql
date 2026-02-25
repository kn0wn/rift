CREATE TABLE IF NOT EXISTS attachments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  thread_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  file_key TEXT NOT NULL,
  attachment_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_content TEXT NOT NULL,
  status TEXT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS attachments_thread_id ON attachments (thread_id);
CREATE INDEX IF NOT EXISTS attachments_message_id ON attachments (message_id);
CREATE INDEX IF NOT EXISTS attachments_user_id ON attachments (user_id);
