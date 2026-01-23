import React from 'react';
import { Check } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  const items = [
    "요즘 선택이 계속 헷갈리는 사람",
    "관계·일·돈 중 하나라도 막힌 느낌이 드는 사람",
    "누군가 단정 짓지 않고 방향만 말해주길 바라는 사람"
  ];

  return (
    <section className="w-full py-10 flex justify-center bg-gray-50/50">
      <div className="w-full max-w-[480px] px-5">
        <h2 className="text-[18px] font-bold text-primary mb-6 text-center">
          이런 사람을 위한 리포트입니다
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((text, idx) => (
            <div 
              key={idx}
              className="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-[#92302E]/10 flex items-center justify-center shrink-0">
                <Check size={12} className="text-[#92302E]" strokeWidth={3} />
              </div>
              <span className="text-[15px] font-medium text-gray-700 break-keep">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
