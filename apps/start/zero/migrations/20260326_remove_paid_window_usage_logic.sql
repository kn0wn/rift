ALTER TABLE usage_policy_template
  DROP COLUMN IF EXISTS seat_window_duration_ms,
  DROP COLUMN IF EXISTS monthly_overage_ratio_bps,
  DROP COLUMN IF EXISTS average_sessions_per_seat_per_month;

ALTER TABLE org_usage_policy_override
  DROP COLUMN IF EXISTS seat_window_duration_ms,
  DROP COLUMN IF EXISTS monthly_overage_ratio_bps,
  DROP COLUMN IF EXISTS average_sessions_per_seat_per_month;

UPDATE org_seat_bucket_balance
SET bucket_type = 'seat_cycle'
WHERE bucket_type = 'seat_overage';

ALTER TABLE org_seat_bucket_balance
  DROP COLUMN IF EXISTS current_window_started_at,
  DROP COLUMN IF EXISTS current_window_ends_at;

ALTER TABLE org_user_usage_summary
  DROP COLUMN IF EXISTS window_used_percent,
  DROP COLUMN IF EXISTS window_remaining_percent,
  DROP COLUMN IF EXISTS window_reset_at;
