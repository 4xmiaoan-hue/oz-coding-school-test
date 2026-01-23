/**
 * [API] Get Sage Detail
 * 
 * Endpoint: GET /api/sages/[slug]
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Missing slug parameter' });
    }

    try {
        const { data, error } = await supabase
            .from('sages')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Sage not found' });
            }
            throw error;
        }

        return res.status(200).json(data);

    } catch (err: any) {
        console.error('Sage Detail API Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
