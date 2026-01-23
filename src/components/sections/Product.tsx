import React from 'react';
import { Check } from 'lucide-react';

export const Product: React.FC = () => {
  return (
    <section className="w-full py-10 flex justify-center">
      <div className="w-full max-w-[480px] px-5">
        <div className="w-full bg-white border border-gray-200 rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-[20px] font-bold text-primary mb-4">
            AI 개인 리포트 <span className="text-base font-normal text-secondary ml-1">(단건 결제)</span>
          </h2>
          
          <ul className="space-y-3 mb-6">
            {[
              "생년월일·시간 기반 AI 해석",
              "약 5장 분량의 서사형 텍스트",
              "단정 없는 방향 제안 중심"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-700">
                <Check size={18} className="text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="pt-5 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-secondary font-medium">가격</span>
              <span className="text-[18px] font-bold text-primary">약 ₩10,000 ~ ₩30,000 / 1회</span>
            </div>
            <p className="mt-3 text-[13px] text-gray-400">
              * 정식 출시 후 결제 기능이 활성화됩니다.
            </p>
            <p className="mt-2 text-[12px] text-gray-500 break-keep">
              ※ 지지직감은 예언·점술 서비스가 아닌, 개인 데이터를 바탕으로 한 AI 해석 리포트입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
