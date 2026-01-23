import React, { useState } from 'react';
import { ASSETS } from '../../constants/assets';
import { SlideCardSection } from './SlideCardSection';
import { EmailModal } from '../ui/EmailModal';
import ScrollReveal from '../ui/ScrollReveal';

export const Hero: React.FC = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState<'출시 알람 신청' | '얼리버드 신청'>('출시 알람 신청');

  return (
    <>
      <section className="relative w-full overflow-hidden pt-6 pb-12 md:pt-20 md:pb-24 flex flex-col items-center text-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${ASSETS.BACKGROUND})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
        
        <div className="relative z-10 w-full max-w-[600px] px-5 flex flex-col items-center">
          <ScrollReveal animation="fade-in" duration={800}>
            <div className="flex flex-col items-center mb-4 md:mb-6">
              <span className="text-[#92302E] font-bold tracking-wider text-xs md:text-base uppercase mb-2 md:mb-3 px-2 md:px-3 py-1 bg-[#92302E]/5 rounded-full">
                AI PERSONAL REPORT
              </span>
              <h1 className="text-[26px] md:text-[44px] font-extrabold leading-[1.3] text-primary mb-2 md:mb-4 break-keep tracking-tight">
                열두 도사가 읽어주는<br />
                <span className="text-[#92302E]">당신 안에서 맴도는 질문</span>
              </h1>
              <p className="text-secondary text-[14px] md:text-[18px] font-medium max-w-[480px] break-keep opacity-90 leading-relaxed">
                지금 열두 도사에게 고민을 털어놓고,<br />
                당신만을 위해 적은 편지를 받아보세요.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Slider Track */}
        <SlideCardSection />

        <div className="relative z-10 w-full max-w-[480px] px-5 flex flex-col items-center">
          <ScrollReveal animation="slide-up" delay={600} duration={600} className="w-full">
            <button 
              onClick={() => { setModalLabel('출시 알람 신청'); setIsEmailModalOpen(true); }}
              className="w-full h-[54px] md:h-[60px] bg-[#92302E] text-white rounded-full text-[16px] md:text-[17px] font-bold hover:bg-[#7a2826] hover:shadow-lg active:scale-[0.98] transition-all shadow-md tracking-wide"
            >
              출시 알람 신청하기
            </button>
          </ScrollReveal>
        </div>
      </section>

      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
        sourceLabel={modalLabel}
      />
    </>
  );
};
