-- Create day_pillar_profiles table
CREATE TABLE IF NOT EXISTS public.day_pillar_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_ko TEXT UNIQUE NOT NULL, -- 갑자, 을축...
    code_hanja TEXT, -- 甲子...
    stem_ko TEXT NOT NULL, -- 갑, 을...
    branch_ko TEXT NOT NULL, -- 자, 축...
    element_primary TEXT, -- 목+수
    keywords TEXT[], -- PostgreSQL array type for string list
    temperament_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create day_pillar_aspects table (Expansion)
CREATE TABLE IF NOT EXISTS public.day_pillar_aspects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_pillar_id UUID REFERENCES public.day_pillar_profiles(id) ON DELETE CASCADE,
    aspect_type TEXT NOT NULL, -- career, love, wealth, daewoon, life_overview
    title TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(day_pillar_id, aspect_type)
);

-- Enable RLS
ALTER TABLE public.day_pillar_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.day_pillar_aspects ENABLE ROW LEVEL SECURITY;

-- Policies (Read public, Write service_role only)
CREATE POLICY "Allow public read access to day_pillar_profiles" ON public.day_pillar_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access to day_pillar_aspects" ON public.day_pillar_aspects FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_day_pillar_stem ON public.day_pillar_profiles(stem_ko);
CREATE INDEX IF NOT EXISTS idx_day_pillar_branch ON public.day_pillar_profiles(branch_ko);
