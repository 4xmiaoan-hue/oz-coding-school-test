import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ZODIAC_CARDS } from '../../constants/zodiacData';
import ScrollReveal from '../ui/ScrollReveal';

export const DifferenceSection: React.FC = () => {
  // Select 4 representative masters for the list
  // Mouse (Relationship), Cow (Time/Endurance), Monkey (Decision/Strategy), Sheep (Self-care/Emotion)
  // or based on the copy provided:
  // - 관계를 먼저 읽는 도사 (Mouse or Snake) -> Let's use Mouse (Relationship fatigue)
  // - 버텨온 시간을 알아보는 도사 (Cow or Dog) -> Let's use Cow (Endurance)
  // - 망설임의 이유를 짚어주는 도사 (Tiger or Dragon or Monkey) -> Let's use Monkey (Strategy/Decision) or Dragon (Direction)
  // - 욕심과 두려움을 구분해주는 도사 (Tiger or Horse) -> Let's use Tiger (Pride/Anger)
  
  // Let's map them loosely to the copy points or just use generic icons if needed, 
  // but using the actual characters builds the connection better.
  
  const points = [
    {
      text: "관계를 먼저 읽는 도사",
      icon: "🐭",
      color: "#E3F2FD",
      textColor: "#1E88E5"
    },
    {
      text: "버텨온 시간을 알아보는 도사",
      icon: "🐮",
      color: "#EFEBE9",
      textColor: "#8D6E63"
    },
    {
      text: "망설임의 이유를 짚어주는 도사",
      icon: "🐵",
      color: "#E0F2F1",
      textColor: "#00897B"
    },
    {
      text: "욕심과 두려움을 구분해주는 도사",
      icon: "🐯",
      color: "#FFF3E0",
      textColor: "#F57C00"
    }
  ];

  return (
    <section id="difference-section" className="pt-16 pb-8 px-5 bg-white">
      <div className="max-w-[600px] mx-auto flex flex-col items-center text-center">
        <ScrollReveal animation="slide-up">
          <h2 className="text-[24px] md:text-[32px] font-bold text-gray-900 mb-10 break-keep">
            지지직감이 다른 운세와<br className="block sm:hidden" /> 가장 다른 점
          </h2>
        </ScrollReveal>

        <div className="w-full space-y-8">
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="space-y-4">
              <p className="text-[18px] md:text-[22px] font-bold text-gray-800 break-keep">
                지지직감에는<br />
                <span className="text-gray-400 decoration-gray-300 line-through decoration-2">‘답을 내려주는 AI’</span>가 없습니다.
              </p>
              <p className="text-[18px] md:text-[22px] font-bold text-[#92302E] break-keep">
                대신,<br />
                열두 명의 도사 캐릭터가 있습니다.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {points.map((point, idx) => (
              <ScrollReveal key={idx} animation="slide-up" delay={300 + idx * 100}>
                <div 
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-gray-50/50"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm bg-white"
                    style={{ color: point.textColor }}
                  >
                    {point.icon}
                  </div>
                  <span className="text-[15px] font-medium text-gray-700 text-left">
                    {point.text}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="slide-up" delay={600}>
            <div className="space-y-3 pt-4">
              <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed break-keep">
                각 도사는<br className="block sm:hidden" /> 서로 다른 관점과 말투로<br />
                당신의 질문에 다르게 접근합니다.
              </p>
              <p className="text-[16px] md:text-[18px] text-gray-800 font-medium leading-relaxed break-keep bg-gray-50 p-4 rounded-xl">
                그래서 지지직감의 리포트는<br />
                정답처럼 느껴지기보다,<br />
                <span className="text-[#92302E] font-bold">“누군가 내 얘기를 제대로 들어줬다”</span>는<br />
                감각에 가깝습니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
