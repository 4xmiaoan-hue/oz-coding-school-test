import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const toggleVisibility = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const differenceSection = document.getElementById('difference-section');
        
        if (differenceSection) {
          const rect = differenceSection.getBoundingClientRect();
          // Show button if the bottom of Difference Section has passed the top of the viewport (or close to it)
          // rect.bottom < 0 means it's fully scrolled past
          // rect.bottom < window.innerHeight means it's visible or above
          
          // Requirement: "Show after Process/Difference section passes"
          // Let's use rect.bottom < 100 (a bit of buffer)
          if (rect.bottom < 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        } else {
          // Fallback if element not found (e.g., initially or error)
          if (window.scrollY > 1000) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        }
        timeoutId = null;
      }, 100); // 100ms throttle
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Initial check
    toggleVisibility();
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-5 md:bottom-10 md:right-8 z-50 flex flex-col items-center justify-center w-[50px] h-[50px] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-lg hover:border-[#92302E]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#92302E] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="페이지 상단으로 이동"
    >
      <ArrowUp className="w-5 h-5 text-[#92302E] mb-0.5" strokeWidth={2.5} />
      <span className="text-[9px] font-bold text-gray-600 leading-none group-hover:text-[#92302E]">TOP</span>
    </button>
  );
};
