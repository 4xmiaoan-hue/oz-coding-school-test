import React from 'react';

export const Delivery: React.FC = () => {
  return (
    <section className="w-full py-10 flex justify-center bg-gray-50/50">
      <div className="w-full max-w-[480px] px-5">
        <h2 className="text-[18px] font-bold text-primary mb-6">결제 후 제공 방식</h2>
        
        <div className="relative pl-4 border-l-2 border-gray-200 space-y-8">
          {[
            { title: "결제 완료", desc: "원하는 리포트를 선택 후 결제를 진행합니다." },
            { title: "웹사이트 이동", desc: "결제 완료 즉시 결과 페이지로 이동합니다." },
            { title: "리포트 확인", desc: "로그인 후 언제든 다시 확인할 수 있습니다." }
          ].map((step, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#92302E]/20 group-hover:border-[#92302E]/40 transition-colors">
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[#92302E]/20 to-[#92302E]/10" />
              </div>
              <h3 className="text-[15px] font-semibold text-primary mb-1">{step.title}</h3>
              <p className="text-[14px] text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-white rounded-xl border border-[#92302E]/10 shadow-sm text-[13px] text-secondary">
          <span className="text-[#92302E]/80 mr-1">💡</span> 결과는 이메일 발송이 아닌, <span className="font-bold text-[#92302E] opacity-90">웹페이지에서 즉시 제공</span>됩니다.
        </div>
      </div>
    </section>
  );
};
