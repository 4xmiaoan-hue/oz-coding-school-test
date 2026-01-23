import React from 'react';

interface SummaryCardProps {
  data: {
    currentStatus: string;
    caution: string;
    action: string;
    sageName: string;
  };
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  return (
    <div className="bg-white/60 border border-[#1A1A1A]/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1A1A1A]/50 tracking-wider uppercase">Current Status</span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A] leading-snug">
              {data.currentStatus}
            </h3>
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-800/50 tracking-wider uppercase">Caution</span>
            <p className="font-serif text-base text-[#1A1A1A]/80 leading-relaxed">
              {data.caution}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-800/50 tracking-wider uppercase">Action</span>
            <p className="font-serif text-base text-[#1A1A1A]/80 leading-relaxed">
              {data.action}
            </p>
          </div>

          <div className="pt-4 border-t border-[#1A1A1A]/5">
            <span className="text-[10px] font-bold text-[#1A1A1A]/40 block mb-1">도사가 붙여준 이름</span>
            <p className="font-brush text-2xl sm:text-3xl text-[#1A1A1A] transform -rotate-1 origin-bottom-left">
              {data.sageName}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
