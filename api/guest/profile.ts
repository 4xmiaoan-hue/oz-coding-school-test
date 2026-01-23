import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const {
      product_id,
      name,
      birth_date_raw,
      solar_lunar,
      birth_time_slot,
      unknown_time,
      concern_text
    } = req.body || {};
    if (!product_id || !name || !birth_date_raw || !solar_lunar) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl) return res.status(500).json({ error: 'Missing Supabase URL' });
    if (!supabaseServiceKey) return res.status(500).json({ error: 'Missing Supabase service key' });
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const year = String(birth_date_raw).substring(0, 4);
    const month = String(birth_date_raw).substring(4, 6);
    const day = String(birth_date_raw).substring(6, 8);
    const birth_date_iso = `${year}-${month}-${day}`;

    const { data: profile, error } = await supabase
      .from('guest_profiles')
      .insert({
        product_id,
        name,
        birth_date_raw,
        birth_date_iso,
        solar_lunar,
        birth_time_slot,
        unknown_time,
        concern_text
      })
      .select()
      .single();
    if (error) {
      return res.status(500).json({ error: 'Database error', detail: error.message });
    }
    return res.status(200).json({ guest_profile_id: profile.id });
  } catch (e: any) {
    return res.status(500).json({ error: 'Server error', detail: e?.message });
  }
}
