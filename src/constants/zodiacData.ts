import { ASSETS } from './assets';

export interface ZodiacCard {
  id: string;
  name: string;
  subName: string; // 주제 (Topic)
  icon: string;
  image: string;
  video?: string;
  question: string; // 대표 질문
  quote: string; // 도사의 한 마디
  masterTopics: string[]; // 이 도사가 보는 것
  cta: string; // CTA 문구
  color: string; // 배경색
  badgeColor: string; // 뱃지 색상
  // Pricing & Marketing fields
  price: number;
  originalPrice: number;
  discountRate: number;
  consultationCount: string; // 누적 상담 건수 (마케팅용)
  isNew?: boolean; // NEW 뱃지 표시 여부
}

export const ZODIAC_CARDS: ZodiacCard[] = [
  {
    id: "mouse",
    name: "자(子) · 쥐 도사",
    subName: "눈치 · 관계 피로 · 불안",
    icon: "🐭",
    image: ASSETS.MOUSE,
    question: "나는 왜 항상 눈치를 보며 관계를 유지할까?",
    quote: "네가 예민한 게 아니라, 너무 많이 감지하고 있을 뿐이야.",
    masterTopics: ["관계에서 소모되는 이유", "불안의 근원", "거리 조절의 기준"],
    cta: "쥐 도사에게 질문하기",
    color: "#E3F2FD",
    badgeColor: "#1E88E5",
    price: 8900,
    originalPrice: 18000,
    discountRate: 51,
    consultationCount: "15,234"
  },
  {
    id: "cow",
    name: "축(丑) · 소 도사",
    subName: "책임 · 의무 · 번아웃",
    icon: "🐮",
    image: ASSETS.COW,
    question: "이건 책임감일까, 아니면 그냥 버티는 걸까?",
    quote: "네가 강해서 버티는 게 아니라, 떠날 틈이 없었던 거야.",
    masterTopics: ["지금 놓아도 되는 것", "끝까지 가야 할 것", "‘의무’와 ‘선택’의 경계"],
    cta: "소 도사에게 질문하기",
    color: "#EFEBE9",
    badgeColor: "#8D6E63",
    price: 9900,
    originalPrice: 20000,
    discountRate: 50,
    consultationCount: "12,891"
  },
  {
    id: "tiger",
    name: "인(寅) · 호랑이 도사",
    subName: "자존심 · 분노 · 주도권",
    icon: "🐯",
    image: ASSETS.TIGER,
    question: "왜 나는 항상 강한 척을 하게 될까?",
    quote: "강해지고 싶은 마음과, 상처받기 싫은 마음은 동시에 존재해.",
    masterTopics: ["분노의 방향", "주도권을 쥐고 싶은 이유", "지금 필요한 결단"],
    cta: "호랑이 도사에게 질문하기",
    color: "#FFF3E0",
    badgeColor: "#F57C00",
    price: 11900,
    originalPrice: 24000,
    discountRate: 50,
    consultationCount: "18,402"
  },
  {
    id: "rabbit",
    name: "묘(卯) · 토끼 도사",
    subName: "연애 · 감정 기복 · 기대 | 한정판 NEW 디자인",
    icon: "🐰",
    image: ASSETS.RABBIT,
    question: "나는 왜 사랑에서 항상 더 많이 기대할까?",
    quote: "기대가 많아서가 아니라, 혼자 애쓴 시간이 길었기 때문이야.",
    masterTopics: ["연애 패턴", "감정 균형", "기대를 내려놓는 타이밍"],
    cta: "토끼 도사에게 질문하기",
    color: "#FCE4EC",
    badgeColor: "#EC407A",
    price: 10900,
    originalPrice: 22000,
    discountRate: 50,
    consultationCount: "21,053",
    isNew: true
  },
  {
    id: "dragon",
    name: "진(辰) · 청룡 도사",
    subName: "큰 흐름 · 방향성 · 인생 판단 | 한정판 NEW 디자인",
    icon: "🐲",
    image: ASSETS.DRAGON,
    question: "지금은 버텨야 할 때일까, 바꿔야 할 때일까?",
    quote: "답은 늘 선택보다 흐름에 먼저 있어.",
    masterTopics: ["현재 인생 국면", "방향 전환 시점", "긴 호흡의 판단"],
    cta: "청룡 도사에게 질문하기",
    color: "#E8F5E9",
    badgeColor: "#43A047",
    price: 14900,
    originalPrice: 30000,
    discountRate: 50,
    consultationCount: "14,120",
    isNew: true
  },
  {
    id: "snake",
    name: "사(巳) · 뱀 도사",
    subName: "속마음 · 관계의 이면 · 심리전",
    icon: "🐍",
    image: ASSETS.SNAKE,
    question: "이 사람, 정말 무슨 생각을 하고 있을까?",
    quote: "말보다 먼저 드러나는 건, 숨기고 싶은 태도야.",
    masterTopics: ["관계의 진짜 의도", "감정의 이중성", "숨겨진 선택지"],
    cta: "뱀 도사에게 질문하기",
    color: "#F3E5F5",
    badgeColor: "#8E24AA",
    price: 11900,
    originalPrice: 24000,
    discountRate: 50,
    consultationCount: "19,876"
  },
  {
    id: "horse",
    name: "오(午) · 말 도사",
    subName: "추진력 · 방향 · 결단",
    icon: "🐴",
    image: ASSETS.HORSE,
    video: new URL("../assets/7.horse.mp4", import.meta.url).href,
    question: "지금 달려야 할까, 멈춰야 할까?",
    quote: "속도가 문제가 아니라, 어디로 가고 있느냐야.",
    masterTopics: ["행동 타이밍", "에너지 분배", "과열 vs 정체"],
    cta: "말 도사에게 질문하기",
    color: "#FFFDE7",
    badgeColor: "#FBC02D",
    price: 13900,
    originalPrice: 28000,
    discountRate: 50,
    consultationCount: "11,540"
  },
  {
    id: "sheep",
    name: "미(未) · 양 도사",
    subName: "자기 보호 · 감정 회복 · 자존감",
    icon: "🐑",
    image: ASSETS.SHEEP,
    question: "나는 왜 늘 나 자신을 뒤로 미룰까?",
    quote: "네가 약해서가 아니라, 너무 오래 참아왔기 때문이야.",
    masterTopics: ["자기 돌봄의 기준", "감정 회복 시점", "나를 지키는 선택"],
    cta: "양 도사에게 질문하기",
    color: "#FAFAFA",
    badgeColor: "#9E9E9E",
    price: 8900,
    originalPrice: 18000,
    discountRate: 51,
    consultationCount: "9,821",
    isNew: true
  },
  {
    id: "monkey",
    name: "신(申) · 원숭이 도사",
    subName: "판단 · 전략 · 기회 | 한정판 NEW 디자인",
    icon: "🐒",
    image: ASSETS.MONKEY,
    question: "이 판에서 나는 어떻게 움직여야 할까?",
    quote: "눈치보다 늦는 것보다, 계산하고 움직이는 게 낫지.",
    masterTopics: ["유리한 선택", "타이밍", "판세 읽기"],
    cta: "원숭이 도사에게 질문하기",
    color: "#E0F2F1",
    badgeColor: "#00897B",
    price: 9900,
    originalPrice: 20000,
    discountRate: 50,
    consultationCount: "13,450",
    isNew: true
  },
  {
    id: "chicken",
    name: "유(酉) · 닭 도사",
    subName: "진실 · 표현 · 솔직함",
    icon: "🐔",
    image: ASSETS.CHICKEN,
    question: "이 말, 지금 해도 될까?",
    quote: "진실은 타이밍을 만나야 힘이 돼.",
    masterTopics: ["말해야 할 순간", "숨기는 게 나은 것", "표현의 결과"],
    cta: "닭 도사에게 질문하기",
    color: "#FFEBEE",
    badgeColor: "#E53935",
    price: 13900,
    originalPrice: 28000,
    discountRate: 50,
    consultationCount: "10,230"
  },
  {
    id: "dog",
    name: "술(戌) · 개 도사",
    subName: "신뢰 · 관계 유지 · 끝까지 가는 것",
    icon: "🐶",
    image: ASSETS.DOG,
    question: "나는 왜 항상 끝까지 남는 쪽일까?",
    quote: "남는다는 건, 버텨낸 게 아니라 선택한 거야.",
    masterTopics: ["관계의 지속 가치", "떠나도 되는 순간", "신뢰의 무게"],
    cta: "개 도사에게 질문하기",
    color: "#D7CCC8",
    badgeColor: "#795548",
    price: 9900,
    originalPrice: 20000,
    discountRate: 50,
    consultationCount: "16,780"
  },
  {
    id: "pig",
    name: "해(亥) · 돼지 도사",
    subName: "회피 · 무기력 · 현실 도피",
    icon: "🐷",
    image: ASSETS.PIG,
    question: "아무것도 하기 싫은 나는, 잘못된 걸까?",
    quote: "버티지 못한 게 아니라, 너무 오래 버텼을 뿐이야.",
    masterTopics: ["지친 마음의 신호", "멈춰야 할 타이밍", "‘이제 그만해도 되는지’에 대한 해석"],
    cta: "돼지 도사에게 질문하기",
    color: "#F8BBD0",
    badgeColor: "#C2185B",
    price: 10900,
    originalPrice: 22000,
    discountRate: 50,
    consultationCount: "11,102"
  },
];
