import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "1. 당신의 정보로 방향을 읽고",
      desc: "생년월일·시간 기반 AI 해석"
    },
    {
      title: "2. 도사가 말하듯 서사로 풀어주고",
      desc: "예언이나 판단은 하지 않습니다"
    },
    {
      title: "3. 지금의 선택에 집중하게 돕습니다",
      desc: "맞고 틀림이 아닌, 방향을 정리합니다"
    }
  ];

  return (
    <section className="w-full py-12 flex justify-center bg-white">
      <div className="w-full max-w-[480px] px-5">
        <h2 className="text-[20px] font-bold text-primary mb-8 text-center">
          지지직감은 이렇게 작동합니다
        </h2>
        
        <div className="relative pl-6 space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-white border-[3px] border-[#92302E]/20">
                <div className="absolute inset-0.5 rounded-full bg-[#92302E]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-gray-800 mb-1 leading-snug break-keep">
                  {step.title}
                </h3>
                <p className="text-[14px] text-gray-500 font-medium break-keep">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
