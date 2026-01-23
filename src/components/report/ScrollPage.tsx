import React from 'react';
import scrollBg from '../../assets/scroll_bg.png';

interface ScrollPageProps {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  className?: string;
}

export const ScrollPage: React.FC<ScrollPageProps> = ({ children, pageNumber, totalPages, className = '' }) => {
  return (
    <div className={`relative w-full max-w-[800px] mx-auto -mt-[1px] first:mt-0 ${className}`}>
      {/* Background Image Container */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          // We use the image as a container background. 
          // Assuming the image has borders, we need to ensure text is padded inside.
        }}
      >
        {/* The Scroll Background Image Layer */}
        <div className="absolute inset-0 z-0">
            <img 
              src={scrollBg} 
              alt="Scroll Background" 
              className="w-full h-full object-fill" // Use object-fill to stretch exactly to container
            />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full px-12 py-20 sm:px-24 sm:py-24 md:px-32 md:py-32 flex flex-col min-h-[100vh]">
           {/* Page Indicator (Minimal) */}
           <div className="absolute top-12 right-12 sm:top-16 sm:right-24 text-[9px] sm:text-[10px] font-mono text-[#1A1A1A]/30 tracking-[0.2em] uppercase opacity-50">
              Page {pageNumber}
           </div>

           <div className="flex-1 flex flex-col justify-center">
             {children}
           </div>
        </div>
      </div>
    </div>
  );
};
