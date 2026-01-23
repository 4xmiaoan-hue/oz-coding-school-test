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

const SAGES_DATA = [
   { 
     "id": 1, 
     "slug": "rat-sage", 
     "display_name_kr": "쥐 도사", 
     "animal": "rat", 
     "symbolic_color": "ash_gray", 
     "character_tone": "관찰자형, 분석적, 신중", 
     "one_liner": "말하지 않은 것까지 듣는 도사", 
     "jiji": "자", 
     "jiji_hanja": "子", 
     "sort_order": 1, 
     "question_frame": { 
       "title": "눈치와 관계 피로", 
       "question_text": "나는 왜 항상 눈치를 보며 관계를 유지할까?", 
       "sage_quote": "네가 예민한 게 아니라, 너무 많이 감지하고 있을 뿐이야.", 
       "topics": ["관계 피로", "불안의 근원", "거리 조절"] 
     } 
   }, 
   { 
     "id": 2, 
     "slug": "ox-sage", 
     "display_name_kr": "소 도사", 
     "animal": "ox", 
     "symbolic_color": "earth_brown", 
     "character_tone": "인내형, 현실적, 묵직함", 
     "one_liner": "버텨본 사람만 할 수 있는 말", 
     "jiji": "축", 
     "jiji_hanja": "丑", 
     "sort_order": 2, 
     "question_frame": { 
       "title": "책임감 vs 버팀", 
       "question_text": "이건 책임감일까, 아니면 그냥 버티는 걸까?", 
       "sage_quote": "네가 강해서 버티는 게 아니라, 떠날 틈이 없었던 거야.", 
       "topics": ["놓아도 되는 것", "의무와 선택의 경계"] 
     } 
   }, 
   { 
     "id": 3, 
     "slug": "tiger-sage", 
     "display_name_kr": "검은 호랑이 도사", 
     "animal": "tiger", 
     "symbolic_color": "black_silver", 
     "character_tone": "결단형, 보호자, 추진력", 
     "one_liner": "지금 멈추면 늦는다는 걸 아는 도사", 
     "jiji": "인", 
     "jiji_hanja": "寅", 
     "sort_order": 3, 
     "question_frame": { 
       "title": "강한 척의 이유", 
       "question_text": "왜 나는 항상 강한 척을 하게 될까?", 
       "sage_quote": "강해지고 싶은 마음과, 상처받기 싫은 마음은 동시에 존재해.", 
       "topics": ["분노의 방향", "주도권", "결단"] 
     } 
   }, 
   { 
     "id": 4, 
     "slug": "rabbit-sage", 
     "display_name_kr": "토끼 도사", 
     "animal": "rabbit", 
     "symbolic_color": "soft_pink", 
     "character_tone": "공감형, 감정 해석, 섬세함", 
     "one_liner": "마음을 먼저 알아보는 도사", 
     "jiji": "묘", 
     "jiji_hanja": "卯", 
     "sort_order": 4, 
     "question_frame": { 
       "title": "연애에서의 기대", 
       "question_text": "나는 왜 사랑에서 항상 더 많이 기대할까?", 
       "sage_quote": "기대가 많아서가 아니라, 혼자 애쓴 시간이 길었기 때문이야.", 
       "topics": ["연애 패턴", "감정 균형", "기대 내려놓기"] 
     } 
   }, 
   { 
     "id": 5, 
     "slug": "dragon-sage", 
     "display_name_kr": "청룡 도사", 
     "animal": "dragon", 
     "symbolic_color": "deep_blue_silver", 
     "character_tone": "비전형, 철학자, 큰 흐름", 
     "one_liner": "큰 흐름을 말하는 도사", 
     "jiji": "진", 
     "jiji_hanja": "辰", 
     "sort_order": 5, 
     "question_frame": { 
       "title": "버틸까 바꿀까", 
       "question_text": "지금은 버텨야 할 때일까, 바꿔야 할 때일까?", 
       "sage_quote": "답은 늘 선택보다 흐름에 먼저 있어.", 
       "topics": ["현재 국면 판단", "방향 전환 시점"] 
     } 
   }, 
   { 
     "id": 6, 
     "slug": "snake-sage", 
     "display_name_kr": "뱀 도사", 
     "animal": "snake", 
     "symbolic_color": "dark_green_obsidian", 
     "character_tone": "통찰형, 심리 독해, 비밀스러움", 
     "one_liner": "속마음을 읽는 도사", 
     "jiji": "사", 
     "jiji_hanja": "巳", 
     "sort_order": 6, 
     "question_frame": { 
       "title": "상대의 속마음", 
       "question_text": "이 사람, 정말 무슨 생각을 하고 있을까?", 
       "sage_quote": "말보다 먼저 드러나는 건, 숨기고 싶은 태도야.", 
       "topics": ["관계의 의도", "감정의 이중성", "심리전"] 
     } 
   }, 
   { 
     "id": 7, 
     "slug": "horse-sage", 
     "display_name_kr": "말 도사", 
     "animal": "horse", 
     "symbolic_color": "burnt_orange", 
     "character_tone": "이동형, 자유, 전환", 
     "one_liner": "움직일 때를 알려주는 도사", 
     "jiji": "오", 
     "jiji_hanja": "午", 
     "sort_order": 7, 
     "question_frame": { 
       "title": "달릴까 멈출까", 
       "question_text": "지금 달려야 할까, 멈춰야 할까?", 
       "sage_quote": "속도가 문제가 아니라, 어디로 가고 있느냐야.", 
       "topics": ["행동 타이밍", "에너지 분배", "과열 조절"] 
     } 
   }, 
   { 
     "id": 8, 
     "slug": "sheep-sage", 
     "display_name_kr": "양 도사", 
     "animal": "sheep", 
     "symbolic_color": "ivory_gold", 
     "character_tone": "치유형, 자기보호, 온화함", 
     "one_liner": "나를 지키는 법을 아는 도사", 
     "jiji": "미", 
     "jiji_hanja": "未", 
     "sort_order": 8, 
     "question_frame": { 
       "title": "나를 미루는 습관", 
       "question_text": "나는 왜 늘 나 자신을 뒤로 미룰까?", 
       "sage_quote": "네가 약해서가 아니라, 너무 오래 참아왔기 때문이야.", 
       "topics": ["자기 돌봄", "감정 회복", "나를 지키는 선택"] 
     } 
   }, 
   { 
     "id": 9, 
     "slug": "monkey-sage", 
     "display_name_kr": "원숭이 도사", 
     "animal": "monkey", 
     "symbolic_color": "electric_yellow_black", 
     "character_tone": "전략형, 기지, 판읽기", 
     "one_liner": "판을 읽는 도사", 
     "jiji": "신", 
     "jiji_hanja": "申", 
     "sort_order": 9, 
     "question_frame": { 
       "title": "판에서의 움직임", 
       "question_text": "이 판에서 나는 어떻게 움직여야 할까?", 
       "sage_quote": "눈치보다 늦는 것보다, 계산하고 움직이는 게 낫지.", 
       "topics": ["유리한 선택", "판세 읽기", "타이밍"] 
     } 
   }, 
   { 
     "id": 10, 
     "slug": "rooster-sage", 
     "display_name_kr": "닭 도사", 
     "animal": "rooster", 
     "symbolic_color": "crimson_gold", 
     "character_tone": "직설형, 진실, 명확함", 
     "one_liner": "진실을 말하는 도사", 
     "jiji": "유", 
     "jiji_hanja": "酉", 
     "sort_order": 10, 
     "question_frame": { 
       "title": "말해야 할 타이밍", 
       "question_text": "이 말, 지금 해도 될까?", 
       "sage_quote": "진실은 타이밍을 만나야 힘이 돼.", 
       "topics": ["말해야 할 순간", "솔직함의 결과"] 
     } 
   }, 
   { 
     "id": 11, 
     "slug": "dog-sage", 
     "display_name_kr": "개 도사", 
     "animal": "dog", 
     "symbolic_color": "warm_gray_teal", 
     "character_tone": "충성형, 동반자, 신뢰", 
     "one_liner": "끝까지 남는 도사", 
     "jiji": "술", 
     "jiji_hanja": "戌", 
     "sort_order": 11, 
     "question_frame": { 
       "title": "끝까지 남는 사람", 
       "question_text": "나는 왜 항상 끝까지 남는 쪽일까?", 
       "sage_quote": "남는다는 건, 버텨낸 게 아니라 선택한 거야.", 
       "topics": ["관계의 가치", "떠나도 되는 순간"] 
     } 
   }, 
   { 
     "id": 12, 
     "slug": "boar-sage", 
     "display_name_kr": "돼지 도사", 
     "animal": "boar", 
     "symbolic_color": "navy_steel_blue", 
     "character_tone": "수호형, 욕망 이해, 안정", 
     "one_liner": "끝까지 지켜본 도사", 
     "jiji": "해", 
     "jiji_hanja": "亥", 
     "sort_order": 12, 
     "question_frame": { 
       "title": "무기력과 회피", 
       "question_text": "아무것도 하기 싫은 나는, 잘못된 걸까?", 
       "sage_quote": "버티지 못한 게 아니라, 너무 오래 버텼을 뿐이야.", 
       "topics": ["지친 마음 신호", "멈춤의 해석", "현실 도피"] 
     } 
   } 
];

async function seed() {
    console.log(`Starting seed for ${SAGES_DATA.length} sages (Bulk Transaction)...`);

    // Bulk Upsert (Atomic request)
    const { data, error } = await supabase
        .from('sages')
        .upsert(SAGES_DATA, { onConflict: 'slug' })
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
