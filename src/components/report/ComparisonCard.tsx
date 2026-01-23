import React from 'react';

interface ComparisonCardProps {
  before: string[];
  after: string[];
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ before, after }) => {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4 border border-[#1A1A1A]/10 rounded-xl overflow-hidden shadow-sm">
      {/* Before */}
      <div className="bg-gray-100/80 p-5 sm:p-6 space-y-3">
        <h4 className="font-serif font-bold text-sm text-gray-500 text-center uppercase tracking-widest border-b border-gray-300 pb-2">지금의 나</h4>
        <ul className="space-y-2">
          {before.map((item, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="bg-[#1A1A1A] p-5 sm:p-6 space-y-3 text-white">
        <h4 className="font-serif font-bold text-sm text-white/60 text-center uppercase tracking-widest border-b border-white/20 pb-2">흐름 이후의 나</h4>
        <ul className="space-y-2">
          {after.map((item, i) => (
            <li key={i} className="text-sm text-white/90 flex items-center gap-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
