-- Lead Funnel: Erweitere contact_submissions fuer Agent-Qualifizierung
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS lead_tier text NOT NULL DEFAULT 'neu',
  ADD COLUMN IF NOT EXISTS quiz_score int,
  ADD COLUMN IF NOT EXISTS agent_conversation_id text,
  ADD COLUMN IF NOT EXISTS agent_summary text,
  ADD COLUMN IF NOT EXISTS experience text,
  ADD COLUMN IF NOT EXISTS hours_per_week text,
  ADD COLUMN IF NOT EXISTS income_goal text,
  ADD COLUMN IF NOT EXISTS start_date text,
  ADD COLUMN IF NOT EXISTS motivation text,
  ADD COLUMN IF NOT EXISTS video_watched boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS cal_booked boolean NOT NULL DEFAULT false;

-- Index fuer Lead-Tier Filterung
CREATE INDEX IF NOT EXISTS contact_submissions_lead_tier_idx
  ON contact_submissions(lead_tier);

-- Service-Role darf alles (fuer Agent-Webhook)
CREATE POLICY "Service role full access on contact_submissions"
  ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
