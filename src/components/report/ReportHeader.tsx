import React from 'react';
import { ArrowLeft, Share2, Download, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/jijijikgam logo.png';

interface ReportHeaderProps {
  title: string;
  meta: {
    date: string;
    type: string;
    sage: string;
  };
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ title, meta }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F6F1E7]/95 backdrop-blur-md border-b border-[#1A1A1A]/5 shadow-sm transition-all duration-300">
      <div className="max-w-[980px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <img src={logo} alt="지지직감" className="h-6 w-auto object-contain opacity-90" />
        </div>
        <div className="flex items-center gap-2">
          {/* My Page Link or Policy placeholder */}
          <span className="text-xs font-serif text-[#1A1A1A]/60 cursor-pointer hover:text-[#1A1A1A] transition-colors">내 보관함</span>
        </div>
      </div>
    </header>
  );
};

export const ReportTitle: React.FC<ReportHeaderProps> = ({ title, meta }) => {
  return (
    <div className="text-center py-10 px-4 space-y-4">
      <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] leading-tight break-keep">
        {title}
      </h1>
      <div className="flex flex-wrap justify-center gap-3 text-[11px] sm:text-xs text-[#1A1A1A]/60 font-medium tracking-wide">
        <span className="bg-[#1A1A1A]/5 px-2 py-1 rounded">생성일: {meta.date}</span>
        <span className="bg-[#1A1A1A]/5 px-2 py-1 rounded">리포트 유형: {meta.type}</span>
        <span className="bg-[#1A1A1A]/5 px-2 py-1 rounded">도사: {meta.sage}</span>
      </div>
    </div>
  );
};
