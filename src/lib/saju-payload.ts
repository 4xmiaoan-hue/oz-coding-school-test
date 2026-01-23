import { SajuResult } from './saju-calculator';

export interface EnrichedSajuPayload {
    meta: {
        version: string;
        generated_at: string;
    };
    basic: {
        year: PillarInfo;
        month: PillarInfo;
        day: PillarInfo;
        hour: PillarInfo;
    };
    analysis: {
        ten_gods_summary: string[];
        element_balance: string;
        special_stars: string[]; // sinsal
        auspicious_stars: string[];
    };
}

interface PillarInfo {
    chun_kr: string;
    chun_hanja: string;
    ji_kr: string;
    ji_hanja: string;
    ten_god_chun: string; // 십성 (천간)
    ten_god_ji: string;   // 십성 (지지)
    woonsung: string;     // 12운성
    jijangan: string[];   // 지장간
    sinsal: string[];     // 신살
}

// Helper to map Korean characters to Hanja (Simplified mapping for MVP)
const HANJA_MAP: Record<string, string> = {
    "갑": "甲", "을": "乙", "병": "丙", "정": "丁", "무": "戊", "기": "己", "경": "庚", "신": "辛", "임": "壬", "계": "癸",
    "자": "子", "축": "丑", "인": "寅", "묘": "卯", "진": "辰", "사": "巳", "오": "午", "미": "未", "신": "申", "유": "酉", "술": "戌", "해": "亥"
};

export function enrichSajuPayload(saju: SajuResult): EnrichedSajuPayload {
    // This function transforms the raw calculation result into a structured, strict payload for the LLM.
    // In a real implementation, we would call a DB or use the saju-calculator's extended features.
    // For this MVP, we will construct it from the available SajuResult.

    const getHanja = (char: string) => HANJA_MAP[char] || char;

    const buildPillar = (gan: string, zhi: string): PillarInfo => ({
        chun_kr: gan,
        chun_hanja: getHanja(gan),
        ji_kr: zhi,
        ji_hanja: getHanja(zhi),
        ten_god_chun: "비견", // Placeholder: requires complex calc
        ten_god_ji: "식신",   // Placeholder
        woonsung: "장생",     // Placeholder
        jijangan: ["무", "병", "갑"], // Placeholder
        sinsal: []
    });

    // Parse the pillar strings (e.g., "갑자")
    const parsePillar = (pillarStr: string) => {
        if (!pillarStr || pillarStr.length < 2) return buildPillar("?", "?");
        return buildPillar(pillarStr[0], pillarStr[1]);
    };

    return {
        meta: {
            version: "1.0.0",
            generated_at: new Date().toISOString()
        },
        basic: {
            year: parsePillar(saju.year),
            month: parsePillar(saju.month),
            day: parsePillar(saju.day),
            hour: parsePillar(saju.hour)
        },
        analysis: {
            ten_gods_summary: ["비견 과다", "식상 발달"], // Placeholder
            element_balance: "목(3), 화(2), 토(1), 금(1), 수(1)", // Placeholder
            special_stars: ["역마살", "도화살"],
            auspicious_stars: ["천을귀인"]
        }
    };
}
