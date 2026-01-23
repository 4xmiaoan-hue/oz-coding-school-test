/**
 * [API] Get Day Pillar Profile
 * 
 * Endpoint: GET /api/day-pillar
 * Query: code (e.g. "갑자")
 * 
 * Example:
 * curl "http://localhost:3000/api/day-pillar?code=갑자"
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Missing code parameter (e.g. code=갑자)' });
    }

    try {
        // Fetch Profile + Aspects
        const { data, error } = await supabase
            .from('day_pillar_profiles')
            .select(`
                *,
                day_pillar_aspects (
                    aspect_type,
                    title,
                    summary
                )
            `)
            .eq('code_ko', code)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // Not found
                return res.status(404).json({ error: 'Day pillar not found' });
            }
            throw error;
        }

        // Reshape aspects into an object map for easier FE usage
        const aspectsMap: Record<string, any> = {};
        if (data.day_pillar_aspects && Array.isArray(data.day_pillar_aspects)) {
            data.day_pillar_aspects.forEach((a: any) => {
                aspectsMap[a.aspect_type] = {
                    title: a.title,
                    summary: a.summary
                };
            });
        }

        const response = {
            ...data,
            aspects: aspectsMap
        };
        // Remove raw array to clean up
        delete response.day_pillar_aspects;

        return res.status(200).json(response);

    } catch (err: any) {
        console.error('Day Pillar API Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
