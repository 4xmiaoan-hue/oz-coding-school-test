
// Basic Saju Data Structure (Reused)
export interface SajuCell {
    chun: string;
    chun_ship: string;
    chun_color: string;
    ji: string;
    ji_ship: string;
    ji_color: string;
    woonsung: string;
    jijang: string;
}

// --- New Webtoon Report Structure ---

export type WebtoonSectionType = 
  | 'intro'     // 도사 인사 & 질문 회상
  | 'saju'      // 사주 구조 설명
  | 'flow'      // 현재 흐름 해석
  | 'contrast'  // 대비 (Before/After)
  | 'advice'    // 조언과 선택
  | 'ending';   // 마지막 편지

export interface WebtoonSectionBase {
  type: WebtoonSectionType;
  // Background can be a specific image URL or a theme keyword
  background?: string; 
  text?: string; 
}

export interface IntroSection extends WebtoonSectionBase {
  type: 'intro';
  speaker: string;
}

export interface SajuSection extends WebtoonSectionBase {
  type: 'saju';
  saju_data: {
    year: SajuCell;
    month: SajuCell;
    day: SajuCell;
    hour: SajuCell;
  };
}

export interface ContrastSection extends WebtoonSectionBase {
  type: 'contrast';
  before: { keyword: string; desc: string };
  after: { keyword: string; desc: string };
}

export interface FlowSection extends WebtoonSectionBase {
  type: 'flow';
  sub_text?: string;
}

export interface AdviceSection extends WebtoonSectionBase {
  type: 'advice';
  speaker: string;
}

export interface EndingSection extends WebtoonSectionBase {
  type: 'ending';
  buttons: {
    label: string;
    action: string;
    primary?: boolean;
  }[];
}

export type WebtoonSection = 
  | IntroSection 
  | SajuSection 
  | ContrastSection 
  | FlowSection 
  | AdviceSection 
  | EndingSection;

export interface WebtoonReportData {
  hero: {
    title: string;
    sage_name: string;
    image_src?: string;
  };
  summary_card: {
    user_name: string;
    period_name: string;
    status_one_line: string;
    caution_point: string;
    action_point: string;
  };
  sections: WebtoonSection[];
}
