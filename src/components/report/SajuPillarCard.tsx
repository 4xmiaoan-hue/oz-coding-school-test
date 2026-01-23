import React from 'react';

interface SajuPillarCardProps {
  data: {
    ilju: string;
    month: string;
    hour: string;
    keywords: string[];
  };
}

export const SajuPillarCard: React.FC<SajuPillarCardProps> = ({ data }) => {
  return (
    <div className="my-6 bg-[#FDFBF7] border border-[#1A1A1A]/80 rounded-lg p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] max-w-sm mx-auto sm:max-w-full">
      <div className="border border-[#1A1A1A]/20 rounded p-4 sm:p-6 text-center space-y-4">
        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]/60 mb-2">사주 구조 요약</h4>
        
        {/* Table */}
        <div className="grid grid-cols-3 gap-0 border-y-2 border-[#1A1A1A]">
          {/* Headers */}
          <div className="py-2 border-b border-[#1A1A1A]/20 bg-[#1A1A1A]/5 text-xs font-bold">시주</div>
          <div className="py-2 border-b border-[#1A1A1A]/20 bg-[#1A1A1A]/5 text-xs font-bold border-l border-[#1A1A1A]/20">월주</div>
          <div className="py-2 border-b border-[#1A1A1A]/20 bg-[#1A1A1A]/5 text-xs font-bold border-l border-[#1A1A1A]/20">일주</div>
          
          {/* Values */}
          <div className="py-4 font-serif text-lg sm:text-xl font-bold">{data.hour}</div>
          <div className="py-4 font-serif text-lg sm:text-xl font-bold border-l border-[#1A1A1A]/20">{data.month}</div>
          <div className="py-4 font-serif text-lg sm:text-xl font-bold border-l border-[#1A1A1A]/20 bg-yellow-50/50">{data.ilju}</div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 pt-2">
          {data.keywords.map((keyword, idx) => (
            <span key={idx} className="px-2 py-1 rounded border border-[#1A1A1A]/20 text-[11px] font-medium text-[#1A1A1A]/70 bg-white">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
