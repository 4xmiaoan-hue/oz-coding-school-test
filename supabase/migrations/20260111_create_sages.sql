-- Create sages table
CREATE TABLE IF NOT EXISTS public.sages (
    id SERIAL PRIMARY KEY, -- 1..12
    slug TEXT UNIQUE NOT NULL, -- rat-sage, ox-sage...
    display_name_kr TEXT NOT NULL,
    animal TEXT NOT NULL,
    symbolic_color TEXT,
    character_tone TEXT,
    one_liner TEXT,
    jiji TEXT NOT NULL,
    jiji_hanja TEXT,
    sort_order INTEGER NOT NULL,
    question_frame JSONB NOT NULL, -- Stores title, question_text, sage_quote, topics
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.sages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to sages" ON public.sages FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sages_slug ON public.sages(slug);
CREATE INDEX IF NOT EXISTS idx_sages_jiji ON public.sages(jiji);
