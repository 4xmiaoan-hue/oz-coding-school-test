import React, { useState, useEffect } from 'react';

// Import videos explicitly for Vite
import rabbitVideo from '../assets/4.rabbit.mp4';
import dragonVideo from '../assets/5.dragon.mp4';
import horseVideo from '../assets/7.horse.mp4';
import sheepVideo from '../assets/8.sheep.mp4';
import monkeyVideo from '../assets/9.monkey.mp4';

// Map keywords to video files
const VIDEO_MAP: Record<string, string> = {
    '토끼': rabbitVideo,
    '묘': rabbitVideo,
    '청룡': dragonVideo,
    '용': dragonVideo,
    '진': dragonVideo,
    '백마': horseVideo,
    '말': horseVideo,
    '오': horseVideo,
    '양': sheepVideo,
    '미': sheepVideo,
    '원숭이': monkeyVideo,
    '신': monkeyVideo,
};

// Fallback background if no video matches
const FALLBACK_BG = "bg-neutral-900";

interface ModernLoadingProps {
    sageName: string; // e.g., "청룡 도사", "백마 도사"
    progress?: number; // Optional externally managed progress (0-100)
    duration?: number; // Loading duration in ms (default: 3000)
    onCancel?: () => void; // Cancellation callback
}

export default function ModernLoading({ sageName, progress: externalProgress, duration = 3000, onCancel }: ModernLoadingProps) {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [internalProgress, setInternalProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("운명의 흐름을 읽는 중");

    const displayProgress = externalProgress !== undefined ? externalProgress : internalProgress;

    useEffect(() => {
        // Find matching video
        const key = Object.keys(VIDEO_MAP).find(k => sageName.includes(k));
        if (key) {
            setVideoSrc(VIDEO_MAP[key]);
        }

        // Internal progress animation (only used if externalProgress is undefined)
        if (externalProgress === undefined) {
            const interval = 50; 
            const steps = duration / interval;
            const increment = 100 / steps;
            
            const timer = setInterval(() => {
                setInternalProgress(prev => {
                    const next = prev + increment;
                    return next > 100 ? 100 : next;
                });
            }, interval);
            return () => clearInterval(timer);
        }
    }, [sageName, duration, externalProgress]);

    useEffect(() => {
        // Text rotation based on progress or time
        const texts = [
            "운명의 흐름을 읽는 중",
            "별들의 이야기를 듣는 중",
            "당신의 미래를 그리는 중",
            "사주의 기운을 모으는 중",
            "거의 다 되었습니다"
        ];
        
        const index = Math.min(Math.floor((displayProgress / 100) * texts.length), texts.length - 1);
        setLoadingText(texts[index]);
    }, [displayProgress]);

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 md:pb-24 overflow-hidden min-h-[100dvh] ${!videoSrc ? FALLBACK_BG : ''}`}>
            {/* Video Background */}
            {videoSrc && (
                <div className="absolute inset-0 z-0">
                    <video 
                        src={videoSrc} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover opacity-0 animate-fade-in-slow"
                        style={{ animationFillMode: 'forwards' }}
                        onLoadedData={(e) => e.currentTarget.classList.remove('opacity-0')}
                    />
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-xs md:max-w-2xl px-6 flex flex-col items-center">
                {/* Sage Name */}
                <h2 className="text-white/80 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-3 md:mb-4 animate-slide-up">
                    {sageName}
                </h2>

                {/* Main Loading Text */}
                <div className="h-24 md:h-32 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-bold mb-0 text-center leading-tight tracking-tight drop-shadow-xl animate-fade-in">
                        {loadingText}
                        <span className="animate-pulse">...</span>
                    </h1>
                </div>

                {/* Minimal Progress Bar */}
                <div className="w-full h-[1px] md:h-[2px] bg-white/20 rounded-full overflow-hidden mb-3 md:mb-4">
                    <div 
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>

                {/* Percentage & Status */}
                <div className="w-full flex justify-between text-[10px] md:text-xs text-white/50 font-mono tracking-widest uppercase mb-8 md:mb-12">
                    <span>Analyzing Destiny</span>
                    <span>{Math.round(displayProgress)}%</span>
                </div>

                {/* Cancel Button */}
                {onCancel && (
                    <button 
                        onClick={onCancel}
                        className="text-white/30 hover:text-white/60 text-[10px] md:text-xs font-medium uppercase tracking-widest transition-colors py-2 px-4 border border-white/10 rounded-full hover:bg-white/5"
                    >
                        중단하기
                    </button>
                )}
            </div>

            {/* CSS for custom animations if not in Tailwind config */}
            <style>{`
                @keyframes fade-in-slow {
                    from { opacity: 0; transform: scale(1.05); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in-slow {
                    animation: fade-in-slow 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    will-change: opacity, transform;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </div>
    );
}
