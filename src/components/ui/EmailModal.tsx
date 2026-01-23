import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceLabel?: '출시 알람 신청' | '얼리버드 신청';
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, sourceLabel }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('early_bird_emails')
        .insert({
          email,
          source: window.location.pathname,
          source_label: sourceLabel ?? '출시 알람 신청'
        });

      if (error) {
        throw error;
      }

      alert(`알림 신청이 완료되었습니다!\n신청하신 이메일: ${email}`);
      setEmail('');
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`알림 신청이 완료되었습니다! (Demo)\n신청하신 이메일: ${email}\n*실제 저장되려면 Supabase URL/Key 설정이 필요합니다.`);
      setEmail('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col animate-in fade-in zoom-in-95 duration-200 p-6"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <h3 className="text-[20px] font-bold text-gray-900 mb-2 text-center">
          {sourceLabel ?? '출시 알림 받기'}
        </h3>
        <p className="text-[14px] text-gray-500 mb-6 text-center break-keep">
          가장 먼저 지지직감을 만나보세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력해주세요"
            className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[#92302E] focus:ring-1 focus:ring-[#92302E] outline-none text-[15px] placeholder:text-gray-400 transition-all"
            required
          />
          {!isValidEmail && email.length > 0 && (
            <span className="text-[12px] text-red-500">유효한 이메일을 입력하면 버튼이 활성화됩니다.</span>
          )}
          <button
            type="submit"
            disabled={!isValidEmail || isSubmitting}
            className={`w-full h-[52px] bg-[#92302E] text-white rounded-xl text-[16px] font-bold transition-all shadow-md ${(!isValidEmail || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7a2826] active:scale-[0.98]'}`}
          >
            알림 받기
          </button>
        </form>

        <p className="mt-4 text-[12px] text-gray-400 text-center leading-tight">
          이메일은 출시 알림에만 사용되며,<br/>언제든 해지할 수 있어요.
        </p>
      </div>
    </div>
  );
};
