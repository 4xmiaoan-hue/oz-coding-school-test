import React from 'react';

export const Trust: React.FC = () => {
  const items = [
    "단건 결제 · 구독 없음",
    "텍스트 기반 개인 리포트",
    "웹사이트에서 즉시 확인"
  ];

  return (
    <section className="w-full py-8 flex justify-center">
      <div className="w-full max-w-[480px] px-5 flex flex-wrap justify-center gap-2">
        {items.map((item, index) => (
          <span 
            key={index} 
            className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[13px] text-secondary font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};
