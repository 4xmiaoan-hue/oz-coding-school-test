import React from 'react';
import { Share2, Download, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';

export const CTASection: React.FC = () => {
  return (
    <div className="space-y-6 pt-8 pb-4">
      <div className="grid grid-cols-1 gap-3">
        <Button 
          className="w-full h-14 bg-[#3E2723] hover:bg-[#2D1B18] text-[#F6F1E7] font-serif text-lg shadow-md"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          다른 질문도 더 읽어보기
        </Button>
        
        <Button 
          variant="outline" 
          disabled
          className="w-full h-14 border-[#1A1A1A]/20 text-[#1A1A1A]/40 bg-transparent font-serif text-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          이 리포트 PDF로 저장하기 (준비중)
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[#1A1A1A]/40 cursor-pointer hover:text-[#1A1A1A]/60 transition-colors">
        <Share2 className="w-4 h-4" />
        <span className="text-xs font-medium border-b border-transparent hover:border-[#1A1A1A]/40">한 문장 요약 캡처하기</span>
      </div>
    </div>
  );
};
