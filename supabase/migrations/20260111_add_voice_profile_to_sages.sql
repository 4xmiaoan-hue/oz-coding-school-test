-- Add voice_profile column to sages table
ALTER TABLE public.sages 
ADD COLUMN IF NOT EXISTS voice_profile JSONB;

-- Comment on column
COMMENT ON COLUMN public.sages.voice_profile IS 'Stores the persona/voice template for AI generation';
