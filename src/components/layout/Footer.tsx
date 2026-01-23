import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { POLICIES } from '../../constants/policies';
import ScrollReveal from '../ui/ScrollReveal';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  const openModal = (type: 'privacy' | 'terms' | 'refund') => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal(type);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <footer id="footer-policy" className="w-full py-10 bg-[#f8f8f8] border-t border-gray-100 font-sans text-[#666666] text-[0.875rem] leading-[1.5em]">
      <ScrollReveal animation="fade-in" duration={1000}>
        <div className="w-full max-w-[1040px] mx-auto px-5">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4">
            
            {/* Info Area: Responsive Layout */}
            <div className="flex flex-col gap-3 md:gap-1.5 text-left w-full lg:w-auto text-[14px]">
              {/* Mobile View: Vertical Stack */}
              <div className="flex flex-col md:hidden gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-800">아이스루랩</span>
                  <span className="text-gray-500">대표이사: 백현주</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span>사업자등록번호: 202-05-53957</span>
                  <span>통신판매업신고: 2026-경남김해-0065</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="leading-relaxed">주소: 경상남도 김해시 내외로 55,<br/>310-1502</span>
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  <span>전화번호: 010-9492-1886</span>
                  <span className="flex items-center gap-2">
                    문의: 
                    <a 
                      href="mailto:help@jijijikgam.com" 
                      className="inline-flex items-center text-[#666666] hover:text-[#333333] transition-colors underline decoration-gray-300 underline-offset-4 py-2 -my-2"
                    >
                      help@jijijikgam.com
                    </a>
                  </span>
                </div>
              </div>

              {/* Tablet/Desktop View: Horizontal Lines */}
              <div className="hidden md:flex flex-col gap-1.5">
                {/* Line 1 */}
                <div className="flex flex-wrap justify-start gap-x-3">
                  <span>상호: 아이스루랩</span>
                  <span className="text-gray-300">|</span>
                  <span>대표이사: 백현주</span>
                  <span className="text-gray-300">|</span>
                  <span>사업자등록번호: 202-05-53957</span>
                </div>
                
                {/* Line 2 */}
                <div className="flex flex-wrap justify-start gap-x-3">
                  <span>통신판매업신고: 2026-경남김해-0065</span>
                  <span className="text-gray-300">|</span>
                  <span>문의: <a href="mailto:help@jijijikgam.com" className="hover:text-[#333333] transition-colors underline decoration-gray-300 underline-offset-2">help@jijijikgam.com</a></span>
                </div>

                {/* Line 3 */}
                <div className="flex flex-wrap justify-start gap-x-3">
                  <span>주소: 경상남도 김해시 내외로 55, 310-1502</span>
                  <span className="text-gray-300">|</span>
                  <span>전화번호: 010-9492-1886</span>
                </div>
              </div>
            </div>

            {/* Policy Area */}
            <div className="flex flex-wrap justify-start lg:justify-end gap-x-6 gap-y-4 w-full lg:w-auto font-medium whitespace-nowrap lg:pt-1">
              <button 
                onClick={openModal('privacy')}
                className="hover:text-[#333333] transition-colors py-2 -my-2"
              >
                개인정보처리방침
              </button>
              <button 
                onClick={openModal('terms')}
                className="hover:text-[#333333] transition-colors py-2 -my-2"
              >
                이용약관
              </button>
              <button 
                onClick={openModal('refund')}
                className="hover:text-[#333333] transition-colors py-2 -my-2"
              >
                환불 정책
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-left text-[0.75rem] text-[#999999]">
            © 2026 Jijijikgam. All rights reserved.
          </div>
        </div>
      </ScrollReveal>

      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={closeModal} 
        title="개인정보처리방침"
      >
        {POLICIES.PRIVACY}
      </Modal>

      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={closeModal} 
        title="이용약관"
      >
        {POLICIES.TERMS}
      </Modal>

      <Modal 
        isOpen={activeModal === 'refund'} 
        onClose={closeModal} 
        title="환불 정책"
      >
        {POLICIES.REFUND}
      </Modal>
    </footer>
  );
};
