
-- Prompt Generation History Table
CREATE TABLE IF NOT EXISTS prompt_generation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    guest_id UUID,
    sage_slug TEXT NOT NULL,
    question_id TEXT,
    seed_hash TEXT,
    selected_levers_json JSONB,
    selected_keywords_json JSONB,
    opening_sentence TEXT,
    closing_sentence TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- Indices for efficient deduplication lookups
CREATE INDEX IF NOT EXISTS idx_prompt_history_user ON prompt_generation_history (user_id, sage_slug, question_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prompt_history_guest ON prompt_generation_history (guest_id, sage_slug, question_id, created_at DESC);
