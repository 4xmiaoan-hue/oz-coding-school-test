/**
 * [Seed Script for Day Pillars]
 * 
 * Usage:
 * npx tsx scripts/seed_day_pillars.ts
 * 
 * Instructions:
 * 1. Add the remaining 58 pillars to the DAY_PILLARS array below.
 * 2. Ensure code_ko matches the standard Saju naming (e.g. "갑자", "을축").
 * 3. Run the script to upsert data (it updates existing records by code_ko).
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local if present
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials. Ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --------------------------------------------------------
// DATA SOURCE (To be filled with full 60 pillars)
// --------------------------------------------------------
const DAY_PILLARS = [
    {
        code_ko: '갑자',
        code_hanja: '甲子',
        stem_ko: '갑',
        branch_ko: '자',
        element_primary: '목+수',
        keywords: ['시작', '리더십', '지혜', '순수'],
        temperament_summary: '새로운 시작을 두려워하지 않는 개척자 정신을 가졌습니다. 겉으로는 강해보여도 속은 여리고 순수한 면이 있으며, 지혜롭고 총명하여 어떤 문제든 해결책을 찾아냅니다.',
        aspects: [
            {
                aspect_type: 'life_overview',
                title: '푸른 쥐의 기운',
                summary: '갑자일주는 60갑자의 시작점으로, 무에서 유를 창조하는 힘이 있습니다.'
            }
        ]
    },
    {
        code_ko: '을축',
        code_hanja: '乙丑',
        stem_ko: '을',
        branch_ko: '축',
        element_primary: '목+토',
        keywords: ['인내', '성실', '적응력', '유연함'],
        temperament_summary: '추운 겨울 땅을 뚫고 나오는 새싹처럼 끈기와 생명력이 강합니다. 묵묵히 자신의 일을 해내며, 환경에 유연하게 대처하는 능력이 뛰어납니다.',
        aspects: [
            {
                aspect_type: 'life_overview',
                title: '겨울 언 땅의 화초',
                summary: '어려운 환경에서도 끝내 꽃을 피우는 대기만성형 인물입니다.'
            }
        ]
    },
    // ... ADD REMAINING 58 PILLARS HERE ...
];

async function seed() {
    console.log(`Starting seed for ${DAY_PILLARS.length} pillars...`);

    for (const pillar of DAY_PILLARS) {
        // 1. Insert Profile
        const { data: profile, error: profileError } = await supabase
            .from('day_pillar_profiles')
            .upsert({
                code_ko: pillar.code_ko,
                code_hanja: pillar.code_hanja,
                stem_ko: pillar.stem_ko,
                branch_ko: pillar.branch_ko,
                element_primary: pillar.element_primary,
                keywords: pillar.keywords,
                temperament_summary: pillar.temperament_summary
            }, { onConflict: 'code_ko' })
            .select()
            .single();

        if (profileError) {
            console.error(`Error inserting ${pillar.code_ko}:`, profileError);
            continue;
        }

        console.log(`Upserted ${pillar.code_ko} (ID: ${profile.id})`);

        // 2. Insert Aspects (if any)
        if (pillar.aspects && pillar.aspects.length > 0) {
            for (const aspect of pillar.aspects) {
                const { error: aspectError } = await supabase
                    .from('day_pillar_aspects')
                    .upsert({
                        day_pillar_id: profile.id,
                        aspect_type: aspect.aspect_type,
                        title: aspect.title,
                        summary: aspect.summary
                    }, { onConflict: 'day_pillar_id, aspect_type' }); // Requires unique index in DB

                if (aspectError) {
                    console.error(`  Error inserting aspect ${aspect.aspect_type} for ${pillar.code_ko}:`, aspectError);
                } else {
                    console.log(`  Upserted aspect ${aspect.aspect_type}`);
                }
            }
        }
    }

    console.log('Seed completed.');
}

seed();
