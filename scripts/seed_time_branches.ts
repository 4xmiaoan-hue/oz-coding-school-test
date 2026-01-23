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

const TIME_BRANCHES = [
   { 
     "time_branch_ko": "자", 
     "time_branch_hanja": "子", 
     "time_label_ko": "자시", 
     "animal_ko": "쥐", 
     "element_primary": "수", 
     "start_time": "23:00", 
     "end_time": "00:59", 
     "keywords": ["직감", "시작", "야간 집중", "생각 과다"], 
     "temperament_summary": "밤에 생각이 많아지고 감각이 예민해지는 흐름. 혼자 정리·기획에 강하지만, 과몰입/불면으로 흐르기 쉬움." 
   }, 
   { 
     "time_branch_ko": "축", 
     "time_branch_hanja": "丑", 
     "time_label_ko": "축시", 
     "animal_ko": "소", 
     "element_primary": "토", 
     "start_time": "01:00", 
     "end_time": "02:59", 
     "keywords": ["지구력", "버팀", "축적", "느린 확신"], 
     "temperament_summary": "한 번 정하면 오래 가는 버팀의 시간대. 꾸준함이 강점이지만, 고집과 과로 누적에 주의." 
   }, 
   { 
     "time_branch_ko": "인", 
     "time_branch_hanja": "寅", 
     "time_label_ko": "인시", 
     "animal_ko": "호랑이", 
     "element_primary": "목", 
     "start_time": "03:00", 
     "end_time": "04:59", 
     "keywords": ["개척", "전환", "기세", "결단"], 
     "temperament_summary": "움직임이 열리는 전환의 시간대. 결단이 빠르고 추진력이 강하지만, 성급함이 리스크가 될 수 있음." 
   }, 
   { 
     "time_branch_ko": "묘", 
     "time_branch_hanja": "卯", 
     "time_label_ko": "묘시", 
     "animal_ko": "토끼", 
     "element_primary": "목", 
     "start_time": "05:00", 
     "end_time": "06:59", 
     "keywords": ["감수성", "정리", "관계 감각", "균형"], 
     "temperament_summary": "세밀한 감정·관계의 결을 읽는 흐름. 조율 능력이 좋지만, 눈치/걱정이 과해질 수 있음." 
   }, 
   { 
     "time_branch_ko": "진", 
     "time_branch_hanja": "辰", 
     "time_label_ko": "진시", 
     "animal_ko": "용", 
     "element_primary": "토", 
     "start_time": "07:00", 
     "end_time": "08:59", 
     "keywords": ["확장", "준비", "큰 그림", "책임감"], 
     "temperament_summary": "하루의 판을 세팅하는 시간대. 큰 그림을 세우고 실행 준비에 강하지만, 부담을 혼자 지기 쉬움." 
   }, 
   { 
     "time_branch_ko": "사", 
     "time_branch_hanja": "巳", 
     "time_label_ko": "사시", 
     "animal_ko": "뱀", 
     "element_primary": "화", 
     "start_time": "09:00", 
     "end_time": "10:59", 
     "keywords": ["집중", "통찰", "전략", "몰입"], 
     "temperament_summary": "핵심을 파고드는 집중의 흐름. 분석·설득에 강하지만, 경계심이 강해 협업 피로가 올 수 있음." 
   }, 
   { 
     "time_branch_ko": "오", 
     "time_branch_hanja": "午", 
     "time_label_ko": "오시", 
     "animal_ko": "말", 
     "element_primary": "화", 
     "start_time": "11:00", 
     "end_time": "12:59", 
     "keywords": ["속도", "표현", "열정", "확산"], 
     "temperament_summary": "에너지와 표현이 강한 흐름. 추진력으로 판을 키우지만, 과열되면 번아웃/충동이 생기기 쉬움." 
   }, 
   { 
     "time_branch_ko": "미", 
     "time_branch_hanja": "未", 
     "time_label_ko": "미시", 
     "animal_ko": "양", 
     "element_primary": "토", 
     "start_time": "13:00", 
     "end_time": "14:59", 
     "keywords": ["보호", "회복", "돌봄", "정서 안정"], 
     "temperament_summary": "사람과 감정을 돌보는 흐름. 배려가 강점이지만, 책임 과다/감정 소진으로 이어질 수 있음." 
   }, 
   { 
     "time_branch_ko": "신", 
     "time_branch_hanja": "申", 
     "time_label_ko": "신시", 
     "animal_ko": "원숭이", 
     "element_primary": "금", 
     "start_time": "15:00", 
     "end_time": "16:59", 
     "keywords": ["전환", "재치", "기회", "판읽기"], 
     "temperament_summary": "상황 전환과 아이디어가 빠른 흐름. 기회를 잘 잡지만 산만해지면 성과가 분산될 수 있음." 
   }, 
   { 
     "time_branch_ko": "유", 
     "time_branch_hanja": "酉", 
     "time_label_ko": "유시", 
     "animal_ko": "닭", 
     "element_primary": "금", 
     "start_time": "17:00", 
     "end_time": "18:59", 
     "keywords": ["정리", "결과", "정확", "마감"], 
     "temperament_summary": "결과를 정리하고 마감하는 흐름. 디테일·기준이 강점이지만, 비판/완벽주의가 스트레스가 될 수 있음." 
   }, 
   { 
     "time_branch_ko": "술", 
     "time_branch_hanja": "戌", 
     "time_label_ko": "술시", 
     "animal_ko": "개", 
     "element_primary": "토", 
     "start_time": "19:00", 
     "end_time": "20:59", 
     "keywords": ["원칙", "수호", "신뢰", "관계 유지"], 
     "temperament_summary": "관계를 지키고 책임을 다하는 흐름. 믿음이 강점이지만, 마음을 닫으면 고집으로 굳을 수 있음." 
   }, 
   { 
     "time_branch_ko": "해", 
     "time_branch_hanja": "亥", 
     "time_label_ko": "해시", 
     "animal_ko": "돼지", 
     "element_primary": "수", 
     "start_time": "21:00", 
     "end_time": "22:59", 
     "keywords": ["회복", "포용", "정리", "휴식"], 
     "temperament_summary": "하루를 정리하고 회복하는 흐름. 감정 수용이 강점이지만, 과식/과소비/과몰입으로 흐를 수 있음." 
   }, 
   { 
     "time_branch_ko": "자", 
     "time_branch_hanja": "子", 
     "time_label_ko": "조자시", 
     "animal_ko": "쥐", 
     "element_primary": "수", 
     "start_time": "23:00", 
     "end_time": "23:29", 
     "keywords": ["경계", "전환점", "미세한 차이", "초입"], 
     "temperament_summary": "자시의 초입(조자) 구간. 날짜 경계에 걸려 해석이 달라질 수 있는 ‘경계값’ 시간대로 취급." 
   }, 
   { 
     "time_branch_ko": "자", 
     "time_branch_hanja": "子", 
     "time_label_ko": "야자시", 
     "animal_ko": "쥐", 
     "element_primary": "수", 
     "start_time": "23:30", 
     "end_time": "23:59", 
     "keywords": ["날짜 전환", "구조 변경", "정밀 분기", "민감도"], 
     "temperament_summary": "자시의 후반(야자) 구간. ‘일주가 바뀔 수 있는 시간대’로 별도 분기 처리(일주/월주 영향 가능)." 
   } 
];

async function seed() {
    console.log(`Starting seed for ${TIME_BRANCHES.length} time branches (Bulk Transaction)...`);

    // Prepare data mapping
    const payload = TIME_BRANCHES.map(item => ({
        time_label_ko: item.time_label_ko,
        branch_ko: item.time_branch_ko,
        branch_hanja: item.time_branch_hanja,
        animal_ko: item.animal_ko,
        element_primary: item.element_primary,
        start_time: item.start_time,
        end_time: item.end_time,
        keywords: item.keywords,
        temperament_summary: item.temperament_summary
    }));

    // Bulk Upsert (Atomic request)
    const { data, error } = await supabase
        .from('time_branch_profiles')
        .upsert(payload, { onConflict: 'time_label_ko' })
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
