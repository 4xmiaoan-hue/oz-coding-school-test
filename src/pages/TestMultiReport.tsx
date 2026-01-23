import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WebtoonReportRenderer from '../components/report/WebtoonReportRenderer';
import { WebtoonReportData, SajuCell } from '../types/report-webtoon';
import KoreanLunarCalendar from 'korean-lunar-calendar';

// ----------------------------------------------------------------------
// Test Profiles
// ----------------------------------------------------------------------

type TestProfile = {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  calendar: 'solar' | 'lunar';
  timeBranch: string; // 자, 축, 인...
  gender: 'male' | 'female';
  unknownTime?: boolean;
};

const PROFILES: Record<string, TestProfile> = {
  minsu: {
    id: 'minsu',
    name: '민수',
    birthDate: '1998-02-24',
    calendar: 'solar',
    timeBranch: '인',
    gender: 'female',
  },
  hyunju: {
    id: 'hyunju',
    name: '현주',
    birthDate: '1969-06-14',
    calendar: 'lunar',
    timeBranch: '인',
    gender: 'female',
  },
  lari: {
    id: 'lari',
    name: '라리',
    birthDate: '1994-12-27',
    calendar: 'solar',
    timeBranch: '해',
    gender: 'male',
  },
  sungjae: {
    id: 'sungjae',
    name: '성재',
    birthDate: '1993-02-25',
    calendar: 'solar',
    timeBranch: '미',
    gender: 'male',
  },
  eojin: {
    id: 'eojin',
    name: '어진',
    birthDate: '1992-11-14',
    calendar: 'solar',
    timeBranch: '자', // Default
    gender: 'male',
    unknownTime: true,
  },
};

// ----------------------------------------------------------------------
// Mock Data Generators
// ----------------------------------------------------------------------

const createSajuCell = (gan: string, ji: string, unknown = false): SajuCell => {
  if (unknown) {
    return {
      chun: "-",
      chun_ship: "-",
      chun_color: "text-gray-400",
      ji: "-",
      ji_ship: "-",
      ji_color: "text-gray-400",
      woonsung: "-",
      jijang: "-",
    };
  }

  // Simple mock mapping for color/ship to make it look realistic
  const stems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const branches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  
  const stemColors = ["text-green-600", "text-green-600", "text-red-600", "text-red-600", "text-yellow-600", "text-yellow-600", "text-gray-600", "text-gray-600", "text-blue-600", "text-blue-600"];
  const branchColors = ["text-blue-600", "text-yellow-600", "text-green-600", "text-green-600", "text-yellow-600", "text-red-600", "text-red-600", "text-yellow-600", "text-gray-600", "text-gray-600", "text-yellow-600", "text-blue-600"];

  const sIdx = stems.indexOf(gan);
  const bIdx = branches.indexOf(ji);

  return {
    chun: gan,
    chun_ship: "비견", // Placeholder
    chun_color: sIdx >= 0 ? stemColors[sIdx] : "text-gray-800",
    ji: ji,
    ji_ship: "식신", // Placeholder
    ji_color: bIdx >= 0 ? branchColors[bIdx] : "text-gray-800",
    woonsung: "장생", // Placeholder
    jijang: "무 병 갑", // Placeholder
  };
};

const generateCheongryongReport = (profile: TestProfile): WebtoonReportData => {
  // 1. Calculate Saju
  const calendar = new KoreanLunarCalendar();
  
  if (profile.calendar === 'lunar') {
      const [y, m, d] = profile.birthDate.split('-').map(Number);
      calendar.setLunarDate(y, m, d, false);
  } else {
      const [y, m, d] = profile.birthDate.split('-').map(Number);
      calendar.setSolarDate(y, m, d);
  }

  const gapja = calendar.getKoreanGapja(); 
  const yearPillar = gapja.year;
  const monthPillar = gapja.month;
  const dayPillar = gapja.day;
  
  // Calculate Hour Pillar
  const GAN = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
  const ZHI = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
  
  const dayStem = dayPillar.substring(0, 1);
  const dayStemIndex = GAN.indexOf(dayStem);
  const hourBranchIndex = ZHI.indexOf(profile.timeBranch);
  
  let hourStemIndex = -1;
  if (dayStemIndex !== -1 && hourBranchIndex !== -1) {
      hourStemIndex = ((dayStemIndex % 5) * 2 + hourBranchIndex) % 10;
  }
  
  const hourStem = hourStemIndex !== -1 ? GAN[hourStemIndex] : "?";
  const hourPillar = hourStem + profile.timeBranch;

  // 2. Construct Report Data in Cheongryong Style
  return {
    hero: {
      title: `청룡 도사가 ${profile.name}에게 보내는 편지`,
      sage_name: "청룡",
      image_src: "/assets/5.dragon.png" // Using Dragon Image
    },
    summary_card: {
      user_name: profile.name,
      period_name: "청룡의 기운이 솟아나는 시기",
      status_one_line: "거대한 흐름이 당신을 새로운 곳으로 이끌고 있습니다.",
      caution_point: "강한 기세로 인한 고립과 독선을 경계하세요.",
      action_point: "넘치는 에너지를 하나의 목표로 집중시키세요."
    },
    sections: [
      {
        type: 'intro',
        text: `${profile.name} 님, 참으로 놀라운 사주를 지니셨군요.\n\n당신의 사주를 펼쳐보고 잠시 말을 잇지 못했습니다. 거대한 숲 속에서 호랑이가 포효하는 듯한 웅장한 기운이 느껴집니다.\n\n이것은 마치 거침없이 달리는 기관차와 같습니다. 당신의 내면에는 세상을 호령할 수 있는 폭발적인 에너지와 리더십이 잠재되어 있습니다. 평범한 삶에 만족하기보다는, 자신만의 왕국을 건설하고자 하는 욕망이 끊임없이 솟구칠 것입니다.`,
        speaker: "청룡",
        background: "/assets/5.1 dragon scene.png"
      },
      {
        type: 'saju',
        saju_data: {
          year: createSajuCell(yearPillar[0], yearPillar[1]),
          month: createSajuCell(monthPillar[0], monthPillar[1]),
          day: createSajuCell(dayPillar[0], dayPillar[1]),
          hour: createSajuCell(hourStem, profile.timeBranch, profile.unknownTime)
        },
        text: `당신은 '${dayPillar}' 일주로 태어났습니다.\n\n사주 네 기둥이 서로 조화를 이루며 강력한 흐름을 만들어내고 있습니다. 특히 월지 ${monthPillar}의 기운이 당신의 활동 무대를 넓혀주고 있군요.\n\n다만, 에너지가 너무 강하면 자칫 엉뚱한 곳으로 폭주할 위험이 있습니다. 지금 당장 성과를 내려고 조급해하지 마세요.`,
      },
      {
        type: 'flow',
        text: "2026년 1월, 새해의 시작부터 당신의 기세는 하늘을 찌를 듯합니다.\n\n당신을 둘러싼 기운들이 새로운 기회를 만들어내고 있습니다. 직장이나 학업, 혹은 개인적인 프로젝트에서 주도권을 잡게 될 기회가 찾아옵니다.\n\n남들이 주저할 때 과감하게 치고 나가는 결단력이 빛을 발할 것입니다.",
        sub_text: "이달의 운세 흐름",
        background: "/assets/5.2 dragon scene.png"
      },
      {
        type: 'contrast',
        before: { keyword: "충동과 혼란", desc: "제어하기 힘든 에너지의 폭주" },
        after: { keyword: "위대한 리더", desc: "세련된 카리스마와 여유로운 성취" },
        text: "지금의 혼란과 충동은 당신이 그릇을 넓혀가는 과정입니다.\n\n이 시기가 지나면, 당신은 자신의 에너지를 자유자재로 조절하며 원하는 결과를 만들어내는 '마스터'의 경지에 한 걸음 더 다가서 있을 것입니다."
      },
      {
        type: 'advice',
        text: "호랑이 등에서 내리지 말고, 고삐를 단단히 잡으세요.\n\n장기적인 비전을 수립하고 구체적인 계획을 세워야 합니다. 타인의 의견을 경청하는 인내심 또한 필수적입니다.\n\n제가 당신의 등 뒤에서 든든한 바람이 되어드리겠습니다. 거침없이 나아가세요.",
        speaker: "청룡",
        background: "/assets/5.3 dragon scene.png"
      },
      {
        type: 'ending',
        text: `${profile.name} 님, 당신은 이미 범상치 않은 운명을 타고났습니다.\n\n그 힘을 두려워하지 말고 즐기세요.`,
        buttons: [
          { label: "결과 공유하기", action: "share", primary: true },
          { label: "홈으로 돌아가기", action: "home", primary: false }
        ]
      }
    ]
  };
};

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export default function TestMultiReport() {
  const location = useLocation();
  const [data, setData] = useState<WebtoonReportData | null>(null);

  useEffect(() => {
    // Extract ID from path: /report/test/:id
    const pathParts = location.pathname.split('/');
    const id = pathParts[pathParts.length - 1]; // last part
    
    const profile = PROFILES[id];
    if (profile) {
      const reportData = generateCheongryongReport(profile);
      setData(reportData);
    }
  }, [location]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">프로필을 찾을 수 없습니다.</h1>
          <p>올바른 경로로 접근해주세요.</p>
          <div className="mt-4 flex flex-col gap-2">
             {Object.keys(PROFILES).map(key => (
                 <a key={key} href={`/report/test/${key}`} className="text-blue-500 hover:underline">
                     /report/test/{key} ({PROFILES[key].name})
                 </a>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return <WebtoonReportRenderer data={data} />;
}
