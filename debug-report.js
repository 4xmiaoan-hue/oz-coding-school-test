
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
dotenv.config({ path: envPath })

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function check() {
  const token = '4594a95df15793cd58609aa698d81b7eec25dda4733320fce1ab86c06aeea2ab';
  console.log('Checking token:', token);

  const { data: report, error } = await supabase
    .from('reports')
    .select('id, content, order_token')
    .eq('order_token', token)
    .single();

  if (error) {
      console.error('Error fetching report:', error);
  } else if (!report) {
      console.error('Report not found');
  } else {
      console.log('Report found!');
      console.log('Content length:', report.content ? report.content.length : 0);
      console.log('First 100 chars:', report.content ? report.content.substring(0, 100) : 'NULL');
      
      // Check for section markers
      const hasMarkers = report.content && report.content.includes('<SECTION_0>');
      console.log('Has <SECTION_0> marker:', hasMarkers);
  }
}

check();
