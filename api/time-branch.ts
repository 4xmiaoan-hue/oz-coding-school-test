/**
 * [API] Get Time Branch Profile
 * 
 * Endpoint: GET /api/time-branch
 * Query: label (e.g. "자시", "야자시") OR branch (e.g. "자", "축")
 * 
 * Note: If 'branch' is provided, it returns all matching records (e.g. branch=자 -> 자시, 조자시, 야자시).
 *       If 'label' is provided, it returns a single record.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { label, branch } = req.query;

    if (!label && !branch) {
        return res.status(400).json({ error: 'Missing query parameter (label or branch)' });
    }

    try {
        if (label) {
            const { data, error } = await supabase
                .from('time_branch_profiles')
                .select('*')
                .eq('time_label_ko', String(label))
                .single();
            if (error) {
                if ((error as any).code === 'PGRST116') {
                    return res.status(404).json({ error: 'Time branch not found' });
                }
                throw error;
            }
            return res.status(200).json(data);
        } else {
            const { data, error } = await supabase
                .from('time_branch_profiles')
                .select('*')
                .eq('branch_ko', String(branch));
            if (error) {
                throw error;
            }
            return res.status(200).json(data);
        }

    } catch (err: any) {
        console.error('Time Branch API Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
