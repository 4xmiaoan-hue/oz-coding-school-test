
export type SceneType = 
  | 'summary_card'  // Scene 0: 핵심 요약
  | 'intro'         // Scene 1: 도사 등장
  | 'saju_scroll'   // Scene 2: 사주 구조 해석
  | 'flow'          // Scene 3: 현재 흐름
  | 'contrast'      // Scene 4: 대비 (Before/After)
  | 'advice'        // Scene 5: 조언/선택
  | 'outro';        // Scene 6: 마지막 + CTA

export interface SceneBase {
  scene_id: number;
  type: SceneType;
  background?: {
    type: 'image' | 'video' | 'color';
    src: string | undefined; // Allow undefined for optional images
    overlay?: string; // css gradient
  };
}

export interface SummaryScene extends SceneBase {
  type: 'summary_card';
  data: {
    user_name: string;
    status_one_line: string;
    caution_point: string;
    action_point: string;
    period_name: string;
  };
}

export interface DialogueScene extends SceneBase {
  type: 'intro' | 'flow' | 'advice';
  speaker: string;
  text: string;
  sub_text?: string; // 작은 지문
  character_image?: string; // 도사 이미지
}

// Detailed Saju Data Structure
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

export interface SajuScene extends SceneBase {
  type: 'saju_scroll';
  data: {
    year: SajuCell;
    month: SajuCell;
    day: SajuCell;
    hour: SajuCell;
  };
  text: string;
}

export interface ContrastScene extends SceneBase {
  type: 'contrast';
  data: {
    before: { keyword: string; desc: string };
    after: { keyword: string; desc: string };
  };
  text: string;
}

export interface OutroScene extends SceneBase {
  type: 'outro';
  text: string;
  buttons: {
    label: string;
    action: string; // 'share' | 'retry' | 'home'
    primary?: boolean;
  }[];
}

export type ReportScene = 
  | SummaryScene 
  | DialogueScene 
  | SajuScene 
  | ContrastScene 
  | OutroScene;

export interface SceneReportData {
  scenes: ReportScene[];
}
