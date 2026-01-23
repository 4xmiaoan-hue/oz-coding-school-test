-- Guest Profiles table
CREATE TABLE IF NOT EXISTS public.guest_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT REFERENCES public.products(id),
    name TEXT NOT NULL,
    birth_date_raw TEXT NOT NULL, -- YYYYMMDD
    birth_date_iso DATE NOT NULL, -- YYYY-MM-DD
    solar_lunar TEXT NOT NULL, -- solar, lunar
    birth_time_slot TEXT, -- 00:00~01:29 조자시 등
    unknown_time BOOLEAN DEFAULT false,
    concern_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Update Orders table to link to guest_profiles
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS guest_profile_id UUID REFERENCES public.guest_profiles(id);

-- RLS Policies
ALTER TABLE public.guest_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to guest_profiles" ON public.guest_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access to guest_profiles" ON public.guest_profiles FOR SELECT USING (true);
