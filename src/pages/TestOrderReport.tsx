
import { useState, useEffect } from 'react';
import ModernLoading from '../components/ModernLoading';
import WebtoonReportRenderer from '../components/report/WebtoonReportRenderer';
import { WebtoonReportData } from '../types/report-webtoon';
import { getSceneImage } from '../utils/imageMapper';

export default function TestOrderReport() {
    const [loading, setLoading] = useState(true);
    
    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    const sageName = "청룡 도사";
    const animalKeyword = "청룡"; // Key for scene images

    // --- Mock Data Construction based on Webtoon Request (8 Sections) ---
    // Sungjae (1993-02-25 15:07 Solar)
    // Result: Ilju: 정축(Jeong-Chuk), Month: 묘(Rabbit), Hour: 미(Sheep)
    // Concern: Love Luck (연애운)
    
    const mockWebtoonData: WebtoonReportData = {
        hero: {
            title: "청룡 도사가 보내는 연애 편지",
            sage_name: sageName,
            image_src: getSceneImage(animalKeyword, 1)
        },
        summary_card: {
            user_name: '성재',
            period_name: '숨겨진 불꽃이 타오르는 시간',
            status_one_line: '겉으로는 차분해 보이지만, 속으로는 뜨거운 열정이 꿈틀대는 시기입니다.',
            caution_point: '표현하지 않으면 아무도 모른다. 속마음을 감추는 습관 경계.',
            action_point: '좋아하는 상대에게 담백하게 호감을 표시하기.'
        },
        sections: [
            // [1] Time: "이 질문이 나오기까지의 시간"
            {
                type: 'intro',
                background: undefined,
                text: "성재 자네, 사랑 때문에 밤잠 설치며 고민하다가 결국 이곳까지 발걸음을 했구먼.\n\n지난 몇 년간 자네의 연애는 마치 꺼질 듯 말 듯 한 촛불 같았을 게야. 누군가 다가오면 뒷걸음질 치고, 막상 멀어지면 아쉬워하는... \n\n'내 짝은 도대체 어디에 있을까', '나는 사랑받을 자격이 있는 걸까' 하는 의구심이 자네를 괴롭혔겠지. 하지만 걱정 말게. 그 시간들은 자네가 진정한 사랑을 알아보기 위한 준비 과정이었네.",
                speaker: sageName
            },
            // [2] Saju: "사주 구조 총해설"
            {
                type: 'saju',
                background: getSceneImage(animalKeyword, 2),
                text: "자네의 사주를 보니, 겨울의 끝자락에 피어난 촛불(丁)과도 같네.\n\n일주(日柱)인 정축(丁丑)은 차가운 흙 위에서 은은하게 빛나는 불꽃을 의미하지. 이는 자네가 겉으로는 조용하고 내성적으로 보일지 몰라도, 내면에는 누구보다 뜨거운 감수성과 열정을 품고 있음을 보여주네.\n\n월지(月支)에 놓인 묘목(卯木)은 이 불꽃을 꺼뜨리지 않도록 끊임없이 땔감이 되어주는 형국이야. 즉, 자네는 사랑을 하면 헌신적이고 섬세하게 상대를 챙기는 로맨티시스트의 기질을 타고났네.",
                saju_data: {
                    year: { chun: '계', chun_ship: '편관', chun_color: 'text-gray-800', ji: '유', ji_ship: '편재', ji_color: 'text-gray-400', woonsung: '장생', jijang: '경신' },
                    month: { chun: '갑', chun_ship: '정인', chun_color: 'text-green-600', ji: '인', ji_ship: '정인', ji_color: 'text-green-600', woonsung: '사', jijang: '무병갑' },
                    day: { chun: '정', chun_ship: '비견', chun_color: 'text-red-600', ji: '축', ji_ship: '식신', ji_color: 'text-yellow-600', woonsung: '묘', jijang: '계신기' },
                    hour: { chun: '정', chun_ship: '비견', chun_color: 'text-red-600', ji: '미', ji_ship: '식신', ji_color: 'text-yellow-600', woonsung: '관대', jijang: '정을기' },
                }
            },
            // [3] Flow: "지금의 대운·세운 흐름"
            {
                type: 'flow',
                background: getSceneImage(animalKeyword, 3),
                text: "지금 자네의 연애운은 봄바람이 불어오는 형국일세.\n\n차가운 땅이 녹고 새싹이 움트듯, 얼어붙었던 자네의 마음에도 온기가 돌기 시작했네. \n\n특히 올해는 도화(桃花)의 기운이 스쳐 지나가니, 이성들의 시선이 자네에게 머무는 일이 잦아질 걸세. 우연한 만남이 인연으로 이어질 가능성이 높으니, 너무 방어적인 태도만 취하지 않는다면 좋은 소식이 있을 게야."
            },
            // [4] Pattern: "이 사주가 반복해온 인생 패턴"
            {
                type: 'flow',
                background: undefined,
                text: "하지만 자네가 반복해온 연애 패턴을 짚고 넘어가지 않을 수 없네.\n\n상대방의 사소한 말 한마디에도 깊게 상처받고, 혼자 동굴 속으로 들어가 버리는 버릇... \n\n정축 일주의 특성상 속마음을 잘 드러내지 않고 끙끙 앓는 경향이 있어. 상대방은 자네가 무슨 생각을 하는지 몰라 답답해하고, 자네는 '왜 내 마음을 몰라줄까' 서운해하다가 관계가 틀어지는 일이 잦았을 걸세. 이제는 그 껍질을 깨고 나와야 하네."
            },
            // [5] Future: "지금의 나 vs 이 흐름이 지난 뒤의 나"
            {
                type: 'contrast',
                background: undefined,
                text: "지금까지는 짝사랑만 하거나, 썸만 타다가 흐지부지 끝나는 경우가 많았지?\n\n하지만 이 흐름을 잘 타면, 자네는 더 이상 숨어서 지켜보는 사람이 아니라, 당당하게 사랑을 쟁취하는 주인공이 될 걸세.\n\n자신의 감정을 솔직하게 표현하는 법을 배우게 될 것이고, 그로 인해 자네의 매력은 배가 되어 빛날 것이야.",
                before: { keyword: "비밀스러운 짝사랑", desc: "속으로만 삭히고 표현하지 못함" },
                after: { keyword: "따뜻한 소통", desc: "마음을 나누고 깊은 관계를 맺음" }
            },
            // [6] Choice: "선택 가이드"
            {
                type: 'advice',
                background: getSceneImage(animalKeyword, 5),
                text: "지금 자네에게 필요한 건 '완벽함'이 아니라 '솔직함'일세.\n\n상대방에게 잘 보이려고 꾸며낸 모습보다는, 조금 서툴더라도 진심을 담은 한마디가 더 큰 울림을 줄 걸세.\n\n지금은 소개팅이나 모임에 적극적으로 나가도 좋네. 다만, 너무 급하게 결과를 보려 하지 말고 천천히 스며든다는 마음으로 다가가게. \n\n지나친 밀당이나 계산적인 행동은 오히려 독이 될 수 있으니 주의하게나.",
                speaker: sageName
            },
            // [7] Letter: "도사의 편지 (마무리)"
            {
                type: 'ending',
                background: getSceneImage(animalKeyword, 6),
                text: "성재 자네에게,\n\n사랑은 마치 불꽃과도 같아서, 가만히 두면 꺼져버리고 너무 세게 불면 옮겨붙어 다치기 십상이지. 하지만 자네가 가진 그 은은하고 따뜻한 불꽃은 누군가의 얼어붙은 마음을 녹이기에 충분하다네.\n\n자네 자신을 너무 낮추지 말게. 자네는 충분히 사랑받을 자격이 있는 사람이야.\n\n다가올 봄날, 자네의 곁에 따뜻한 온기가 머물기를 청룡의 이름으로 축복하네.\n\n언제든 마음이 흔들릴 때 다시 찾아오게.\n청룡 도사가.",
                buttons: [
                    { label: "친구에게 내 연애운 공유하기", action: "share", primary: true },
                    { label: "처음으로 돌아가기", action: "home", primary: false }
                ]
            }
        ]
    };

    if (loading) {
        return <ModernLoading sageName={sageName} />;
    }

    return (
        <WebtoonReportRenderer data={mockWebtoonData} />
    );
}
