CREATE TABLE IF NOT EXISTS chat_free_allowance_window (
  user_id TEXT NOT NULL,
  policy_key TEXT NOT NULL,
  window_started_at BIGINT NOT NULL,
  hits INTEGER NOT NULL,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, policy_key, window_started_at)
);
