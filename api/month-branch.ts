/**
 * [API] Get Month Branch Profile
 * 
 * Endpoint: GET /api/month-branch
 * Query: branch (e.g. "자")
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { branch } = req.query;

    if (!branch || typeof branch !== 'string') {
        return res.status(400).json({ error: 'Missing branch parameter (e.g. branch=자)' });
    }

    try {
        const { data, error } = await supabase
            .from('month_branch_profiles')
            .select('*')
            .eq('branch_ko', branch)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Month branch not found' });
            }
            throw error;
        }

        return res.status(200).json(data);

    } catch (err: any) {
        console.error('Month Branch API Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
