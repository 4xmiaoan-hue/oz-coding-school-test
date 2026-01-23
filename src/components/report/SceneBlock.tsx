import React from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface SceneBlockProps {
  description: string;
}

export const SceneBlock: React.FC<SceneBlockProps> = ({ description }) => {
  return (
    <div className="my-10 sm:my-14 w-full">
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] bg-[#F0EBE0] border border-[#1A1A1A]/10 overflow-hidden group">
        
        {/* Inner Content Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="w-14 h-14 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <ImageIcon className="w-6 h-6 text-[#1A1A1A]/30" />
          </div>
          
          <p className="font-serif text-sm sm:text-lg text-[#1A1A1A]/60 italic break-keep leading-relaxed max-w-[80%]">
            {description.replace(/^\/\/\s*/, '')}
          </p>
          
          <div className="mt-3 px-3 py-1 bg-[#1A1A1A]/5 rounded-full">
            <span className="text-[10px] sm:text-xs font-mono text-[#1A1A1A]/40 tracking-widest uppercase">
              Scene Visualization
            </span>
          </div>
        </div>

        {/* Diagonal stripes for "Draft/Placeholder" feel */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 12px)'
          }}
        />
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1A1A1A]/20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1A1A1A]/20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1A1A1A]/20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1A1A1A]/20" />
      </div>
    </div>
  );
};
