import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../constants/assets';

export const Header: React.FC = () => {
  const scrollToPolicy = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.getElementById('footer-policy');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-border h-[56px] flex items-center justify-center">
      <div className="w-full max-w-[1040px] px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={ASSETS.LOGO} 
            alt="지지직감 로고" 
            className="h-[32px] md:h-[36px] w-auto object-contain drop-shadow-sm"
          />
          <span className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight">
            지지직감
          </span>
        </Link>
        
        <button 
          onClick={scrollToPolicy}
          className="text-sm text-secondary hover:text-primary transition-colors font-medium"
        >
          정책
        </button>
      </div>
    </header>
  );
};
