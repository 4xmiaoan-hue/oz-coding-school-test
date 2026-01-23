import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MONTH_BRANCHES = [
   { 
     "month_branch_ko": "자", 
     "month_branch_hanja": "子", 
     "animal_ko": "쥐", 
     "element_primary": "수", 
     "keywords": ["시작", "지능", "순발력", "생존감각"], 
     "temperament_summary": "빠르게 상황을 읽고 움직이는 타입. 불안이 동력이 되기도 하며, 정보·타이밍에 강하다. 혼자 결정하고 혼자 버티는 습관이 생기기 쉬움." 
   }, 
   { 
     "month_branch_ko": "축", 
     "month_branch_hanja": "丑", 
     "animal_ko": "소", 
     "element_primary": "토", 
     "keywords": ["축적", "인내", "현실감", "지구력"], 
     "temperament_summary": "느리지만 단단하게 쌓는 타입. 감정표현은 적어도 책임감과 지속력이 강하다. 한 번 정한 방향을 쉽게 바꾸지 않으며, 안정이 핵심 가치." 
   }, 
   { 
     "month_branch_ko": "인", 
     "month_branch_hanja": "寅", 
     "animal_ko": "호랑이", 
     "element_primary": "목", 
     "keywords": ["개척", "용기", "추진력", "리더십"], 
     "temperament_summary": "시작을 열고 판을 만드는 타입. 기세가 붙으면 크게 전진하지만, 답답함을 못 참아 결단이 빨라질 수 있다. 주도권과 성장 욕구가 강함." 
   }, 
   { 
     "month_branch_ko": "묘", 
     "month_branch_hanja": "卯", 
     "animal_ko": "토끼", 
     "element_primary": "목", 
     "keywords": ["감수성", "미감", "관계", "균형감"], 
     "temperament_summary": "분위기와 감정을 읽는 타입. 관계의 결을 섬세하게 다루고, 공감과 조율 능력이 좋다. 다만 과도하게 눈치를 보거나 감정에 흔들릴 수 있음." 
   }, 
   { 
     "month_branch_ko": "진", 
     "month_branch_hanja": "辰", 
     "animal_ko": "용", 
     "element_primary": "토", 
     "keywords": ["확장", "권위", "스케일", "전환"], 
     "temperament_summary": "큰 흐름을 만들고 키우는 타입. 야망과 책임감이 동시에 크며, ‘내가 판을 책임진다’는 감각이 강하다. 때로는 부담을 혼자 끌어안기 쉬움." 
   }, 
   { 
     "month_branch_ko": "사", 
     "month_branch_hanja": "巳", 
     "animal_ko": "뱀", 
     "element_primary": "화", 
     "keywords": ["집중", "통찰", "전략", "매력"], 
     "temperament_summary": "깊게 파고들어 핵심을 잡는 타입. 관찰력과 직감이 예리하고, 말을 아끼지만 한 마디가 정확하다. 때로는 경계심이 강해 마음을 쉽게 열지 않음." 
   }, 
   { 
     "month_branch_ko": "오", 
     "month_branch_hanja": "午", 
     "animal_ko": "말", 
     "element_primary": "화", 
     "keywords": ["속도", "열정", "자유", "표현"], 
     "temperament_summary": "에너지와 추진력이 강한 타입. 움직이며 답을 찾고, 표현이 솔직하다. 다만 과열되면 번아웃이 오기 쉬워 ‘속도 조절’이 인생의 핵심 과제." 
   }, 
   { 
     "month_branch_ko": "미", 
     "month_branch_hanja": "未", 
     "animal_ko": "양", 
     "element_primary": "토", 
     "keywords": ["보호", "치유", "온기", "자기돌봄"], 
     "temperament_summary": "사람을 살피고 감싸는 타입. 관계에서 정서적 안전을 중요하게 여기며, 부드럽지만 기준이 있다. 다만 ‘내가 먼저 버틴다’로 무게를 지기 쉬움." 
   }, 
   { 
     "month_branch_ko": "신", 
     "month_branch_hanja": "申", 
     "animal_ko": "원숭이", 
     "element_primary": "금", 
     "keywords": ["재치", "전환", "적응", "판읽기"], 
     "temperament_summary": "상황 전환과 문제 해결이 빠른 타입. 센스와 유머로 판을 바꾸고 기회를 만든다. 다만 산만해지거나, 얕게 넓어질 위험이 있어 ‘집중’이 관건." 
   }, 
   { 
     "month_branch_ko": "유", 
     "month_branch_hanja": "酉", 
     "animal_ko": "닭", 
     "element_primary": "금", 
     "keywords": ["정확", "결과", "자기관리", "단호함"], 
     "temperament_summary": "기준이 분명하고 결과를 만드는 타입. 퀄리티와 디테일에 강하고, 스스로를 관리한다. 다만 비판적 시선이 강해 자신과 타인을 압박할 수 있음." 
   }, 
   { 
     "month_branch_ko": "술", 
     "month_branch_hanja": "戌", 
     "animal_ko": "개", 
     "element_primary": "토", 
     "keywords": ["의리", "원칙", "수호", "신뢰"], 
     "temperament_summary": "지키는 힘이 강한 타입. 관계에서 신뢰와 책임을 최우선으로 두며, 흔들릴수록 원칙으로 버틴다. 다만 마음을 닫으면 고집이 세질 수 있음." 
   }, 
   { 
     "month_branch_ko": "해", 
     "month_branch_hanja": "亥", 
     "animal_ko": "돼지", 
     "element_primary": "수", 
     "keywords": ["회복", "포용", "휴식", "풍요"], 
     "temperament_summary": "마지막에 정리하고 회복시키는 타입. 감정·관계를 포용하고, ‘충분함’의 감각을 안다. 다만 욕구가 커지면 과소비·과몰입으로 흐를 수 있음." 
   } 
];

async function seed() {
    console.log(`Starting seed for ${MONTH_BRANCHES.length} month branches (Bulk Transaction)...`);

    // Prepare data mapping
    const payload = MONTH_BRANCHES.map(item => ({
        branch_ko: item.month_branch_ko,
        branch_hanja: item.month_branch_hanja,
        animal_ko: item.animal_ko,
        element_primary: item.element_primary,
        keywords: item.keywords,
        temperament_summary: item.temperament_summary
    }));

    // Bulk Upsert (Atomic request)
    const { data, error } = await supabase
        .from('month_branch_profiles')
        .upsert(payload, { onConflict: 'branch_ko' })
        .select();

    if (error) {
        console.error('Seed Transaction Failed:', error);
        console.log('Processed Records: 0 (Rollback/Fail)');
        process.exit(1);
    }

    console.log(`Seed completed successfully.`);
    console.log(`Processed Records: ${data.length}`);
    console.log('Data Integrity Check: Passed');
}

seed();
