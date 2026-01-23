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

const REPORT_TEMPLATES = [
 { 
 "sage_slug": "rat-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 120, 
 "style": "관찰 보고서처럼 낮고 차분하게", 
 "forbidden": ["괜찮아", "힘내", "무조건"] 
 }, 
 "current_state": { 
 "max_chars": 300, 
 "style": "패턴·신호·거리 개념으로 분석", 
 "must_include": ["지금의 반복", "감지 과부하"] 
 }, 
 "core_insight": { 
 "max_chars": 260, 
 "style": "한 문장 핵심 통찰", 
 "tone": "차분하지만 정확" 
 }, 
 "practical_guidance": { 
 "max_chars": 240, 
 "style": "거리 조절/속도 늦추기 중심", 
 "limit_actions": 1 
 }, 
 "closing_message": { 
 "max_chars": 100, 
 "style": "보고서 결론처럼 짧게" 
 }, 
 "cta": { 
 "text": "다른 신호도 더 읽어볼까?", 
 "intent": "관계/불안 관련 질문 재구매 유도" 
 } 
 } 
 }, 
 { 
 "sage_slug": "ox-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 140, 
 "style": "무게감 있는 인정부터 시작", 
 "forbidden": ["참아", "조금만 더"] 
 }, 
 "current_state": { 
 "max_chars": 320, 
 "style": "의무 vs 선택 구조로 설명" 
 }, 
 "core_insight": { 
 "max_chars": 260, 
 "style": "버팀의 의미 재정의" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "놓아도 되는 것 1가지", 
 "limit_actions": 1 
 }, 
 "closing_message": { 
 "max_chars": 120, 
 "style": "등을 받쳐주는 말투" 
 }, 
 "cta": { 
 "text": "이 책임, 계속 안아야 할까?", 
 "intent": "번아웃/관계 책임 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "tiger-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 100, 
 "style": "결단의 순간임을 선언", 
 "forbidden": ["언젠가", "아마도"] 
 }, 
 "current_state": { 
 "max_chars": 280, 
 "style": "분노·자존심을 에너지로 해석" 
 }, 
 "core_insight": { 
 "max_chars": 220, 
 "style": "지금 멈출 때의 대가 제시" 
 }, 
 "practical_guidance": { 
 "max_chars": 240, 
 "style": "A/B 선택지 제시", 
 "limit_actions": 2 
 }, 
 "closing_message": { 
 "max_chars": 90, 
 "style": "전진을 촉발하는 문장" 
 }, 
 "cta": { 
 "text": "지금 결단해야 할 다른 문제는?", 
 "intent": "결정/전환 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "rabbit-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 150, 
 "style": "감정 공감부터 시작", 
 "forbidden": ["이상해", "왜 그렇게"] 
 }, 
 "current_state": { 
 "max_chars": 320, 
 "style": "기대·서운함·외로움 언어화" 
 }, 
 "core_insight": { 
 "max_chars": 260, 
 "style": "혼자 애쓴 시간에 대한 인정" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "감정 균형 관점 제시" 
 }, 
 "closing_message": { 
 "max_chars": 140, 
 "style": "다정한 보호 메시지" 
 }, 
 "cta": { 
 "text": "이 관계, 계속 기대해도 될까?", 
 "intent": "연애/감정 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "dragon-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 160, 
 "style": "큰 흐름 선언", 
 "forbidden": ["확정", "운명이다"] 
 }, 
 "current_state": { 
 "max_chars": 340, 
 "style": "국면/전환점 중심 해석" 
 }, 
 "core_insight": { 
 "max_chars": 300, 
 "style": "선택보다 흐름 강조" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "다음 30일 관점 제시" 
 }, 
 "closing_message": { 
 "max_chars": 140, 
 "style": "철학적이되 현실적" 
 }, 
 "cta": { 
 "text": "앞으로의 큰 흐름도 볼까?", 
 "intent": "방향성/인생 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "snake-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 110, 
 "style": "의미심장한 첫 문장", 
 "forbidden": ["그 사람은 나쁘다"] 
 }, 
 "current_state": { 
 "max_chars": 300, 
 "style": "말보다 태도 분석" 
 }, 
 "core_insight": { 
 "max_chars": 240, 
 "style": "숨겨진 의도 가능성 제시" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "관계를 흔들지 않는 질문 1개" 
 }, 
 "closing_message": { 
 "max_chars": 110, 
 "style": "여운 남기는 문장" 
 }, 
 "cta": { 
 "text": "그 사람 속마음, 더 파볼까?", 
 "intent": "상대 심리 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "horse-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 110, 
 "style": "에너지 호출", 
 "forbidden": ["멈춰"] 
 }, 
 "current_state": { 
 "max_chars": 300, 
 "style": "속도 상태 진단" 
 }, 
 "core_insight": { 
 "max_chars": 240, 
 "style": "방향 vs 속도" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "10분 행동 미션" 
 }, 
 "closing_message": { 
 "max_chars": 100, 
 "style": "전환 선언" 
 }, 
 "cta": { 
 "text": "지금 움직여야 할 다른 방향은?", 
 "intent": "행동/전환 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "sheep-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 150, 
 "style": "상처 인정부터", 
 "forbidden": ["너무 예민"] 
 }, 
 "current_state": { 
 "max_chars": 320, 
 "style": "지침/자기소진 해석" 
 }, 
 "core_insight": { 
 "max_chars": 260, 
 "style": "자기 보호의 정당성" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "경계 설정 관점" 
 }, 
 "closing_message": { 
 "max_chars": 140, 
 "style": "안아주는 말투" 
 }, 
 "cta": { 
 "text": "나 자신을 더 지키는 법은?", 
 "intent": "자존감/회복 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "monkey-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 100, 
 "style": "판을 선언", 
 "forbidden": ["감정적으로"] 
 }, 
 "current_state": { 
 "max_chars": 300, 
 "style": "현재 판세 설명" 
 }, 
 "core_insight": { 
 "max_chars": 240, 
 "style": "유리한 위치 인식" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "오늘의 한 수 제안" 
 }, 
 "closing_message": { 
 "max_chars": 90, 
 "style": "경쾌한 자신감" 
 }, 
 "cta": { 
 "text": "다음 수는 언제 둘까?", 
 "intent": "전략/타이밍 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "rooster-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 90, 
 "style": "핵심 직설", 
 "forbidden": ["아마", "느낌상"] 
 }, 
 "current_state": { 
 "max_chars": 260, 
 "style": "애매함 정리" 
 }, 
 "core_insight": { 
 "max_chars": 220, 
 "style": "말해야 할 진실" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "실제 말 문장 제시" 
 }, 
 "closing_message": { 
 "max_chars": 80, 
 "style": "기준 선언" 
 }, 
 "cta": { 
 "text": "지금 말해야 할 다른 진실은?", 
 "intent": "솔직함/관계 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "dog-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 140, 
 "style": "곁에 서는 말투", 
 "forbidden": ["네가 잘못"] 
 }, 
 "current_state": { 
 "max_chars": 300, 
 "style": "관계 비용/가치 균형" 
 }, 
 "core_insight": { 
 "max_chars": 240, 
 "style": "남는 선택의 의미" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "떠남도 선택지로 허용" 
 }, 
 "closing_message": { 
 "max_chars": 140, 
 "style": "동반자 선언" 
 }, 
 "cta": { 
 "text": "이 관계, 계속 지켜야 할까?", 
 "intent": "관계 유지/종료 질문 재구매" 
 } 
 } 
 }, 
 { 
 "sage_slug": "boar-sage", 
 "report_format": { 
 "opening_message": { 
 "max_chars": 140, 
 "style": "지침 인정", 
 "forbidden": ["게을러"] 
 }, 
 "current_state": { 
 "max_chars": 320, 
 "style": "고갈/무기력 신호" 
 }, 
 "core_insight": { 
 "max_chars": 260, 
 "style": "욕망의 정당성" 
 }, 
 "practical_guidance": { 
 "max_chars": 260, 
 "style": "생활 안전 루틴 1개" 
 }, 
 "closing_message": { 
 "max_chars": 120, 
 "style": "살아내는 사람의 말" 
 }, 
 "cta": { 
 "text": "지친 마음, 더 쉬어도 될까?", 
 "intent": "번아웃/무기력 질문 재구매" 
 } 
 } 
 } 
];

async function seed() {
    console.log(`Starting seed for ${REPORT_TEMPLATES.length} report templates...`);

    // 1. Fetch all sages to map slug -> id
    const { data: sages, error: sagesError } = await supabase
        .from('sages')
        .select('id, slug');

    if (sagesError || !sages) {
        console.error('Failed to fetch sages:', sagesError);
        process.exit(1);
    }

    const sageMap = new Map(sages.map(s => [s.slug, s.id]));

    let successCount = 0;
    let failCount = 0;

    for (const item of REPORT_TEMPLATES) {
        const sageId = sageMap.get(item.sage_slug);
        
        if (!sageId) {
            console.error(`Sage ID not found for slug: ${item.sage_slug}`);
            failCount++;
            continue;
        }

        const { error } = await supabase
            .from('report_format_templates')
            .upsert({
                sage_id: sageId,
                sage_slug: item.sage_slug,
                template_json: item.report_format,
                is_active: true
            }, { onConflict: 'sage_slug' });

        if (error) {
            console.error(`Failed to upsert template for ${item.sage_slug}:`, error);
            failCount++;
        } else {
            successCount++;
        }
    }

    console.log(`Report Template Seed completed. Success: ${successCount}, Fail: ${failCount}`);
}

seed();
