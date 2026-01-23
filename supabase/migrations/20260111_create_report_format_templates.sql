-- Create report_format_templates table
CREATE TABLE IF NOT EXISTS public.report_format_templates (
    id SERIAL PRIMARY KEY,
    sage_id INTEGER REFERENCES public.sages(id), -- Optional strict FK, or just rely on application logic
    sage_slug TEXT UNIQUE NOT NULL,
    version TEXT DEFAULT 'v1',
    template_json JSONB NOT NULL, -- The format rules
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.report_format_templates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to report_format_templates" ON public.report_format_templates FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_report_templates_slug ON public.report_format_templates(sage_slug);
