-- Create month_branch_profiles table
CREATE TABLE IF NOT EXISTS public.month_branch_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_ko TEXT UNIQUE NOT NULL, -- 자, 축...
    branch_hanja TEXT, -- 子...
    animal_ko TEXT, -- 쥐, 소...
    element_primary TEXT, -- 수, 토...
    keywords TEXT[], -- PostgreSQL array type
    temperament_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.month_branch_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to month_branch_profiles" ON public.month_branch_profiles FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_month_branch_ko ON public.month_branch_profiles(branch_ko);
