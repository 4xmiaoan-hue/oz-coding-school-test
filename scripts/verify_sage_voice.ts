import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verify() {
    const { data, error } = await supabase
        .from('sages')
        .select('slug, voice_profile')
        .eq('slug', 'rat-sage')
        .single();

    if (error) {
        console.error('Verification Failed:', error);
    } else {
        console.log('Verification Success for rat-sage:');
        console.log('Has voice_profile?', !!data.voice_profile);
        if (data.voice_profile) {
            console.log('Tone Keywords:', data.voice_profile.tone_keywords);
        }
    }
}

verify();
