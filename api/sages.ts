/**
 * [API] Get All Sages
 * 
 * Endpoint: GET /api/sages
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration');
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { data, error } = await supabase
            .from('sages')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) {
            throw error;
        }

        return res.status(200).json(data);

    } catch (err: any) {
        console.error('Sages API Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
