-- Create time_branch_profiles table
CREATE TABLE IF NOT EXISTS public.time_branch_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    time_label_ko TEXT UNIQUE NOT NULL, -- 자시, 축시, 야자시...
    branch_ko TEXT NOT NULL, -- 자, 축...
    branch_hanja TEXT, -- 子...
    animal_ko TEXT, -- 쥐...
    element_primary TEXT, -- 수...
    start_time TEXT, -- 23:00
    end_time TEXT, -- 00:59
    keywords TEXT[],
    temperament_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.time_branch_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to time_branch_profiles" ON public.time_branch_profiles FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_time_branch_label ON public.time_branch_profiles(time_label_ko);
CREATE INDEX IF NOT EXISTS idx_time_branch_ko ON public.time_branch_profiles(branch_ko);
