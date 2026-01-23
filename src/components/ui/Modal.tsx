import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: string; // Changed to string since we expect markdown text
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm p-4 sm:p-0"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[600px] max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 id="modal-title" className="text-lg font-bold text-primary">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto scrollbar-hide">
          <div className="text-primary leading-[1.625]">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-[28px] md:text-[30px] font-bold mt-8 mb-4 border-b pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-[22px] md:text-[24px] font-bold mt-6 mb-3 text-gray-900" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-[18px] md:text-[20px] font-bold mt-4 mb-2 text-gray-800" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-[15px] text-gray-600 break-keep" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-gray-600" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-200 pl-4 py-1 my-4 text-gray-500 italic bg-gray-50 rounded-r" {...props} />,
                hr: ({node, ...props}) => <hr className="my-6 border-gray-200" {...props} />,
                table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-200 border" {...props} /></div>,
                th: ({node, ...props}) => <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" {...props} />,
                td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border-b" {...props} />,
              }}
            >
              {children}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
