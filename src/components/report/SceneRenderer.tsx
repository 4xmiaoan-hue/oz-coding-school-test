import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReportScene } from '../../types/report-scene';
import { Share2, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';
import scrollBg from '../../assets/scroll_bg.png';

// --- Shared Components ---

const SceneLayout = ({ children, sceneImage, className = "", imgPosition = "object-center" }: { children: React.ReactNode, sceneImage?: string, className?: string, imgPosition?: string }) => {
    return (
        <section className={`relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden snap-start ${className}`}>
            {/* Scene Specific Image Layer */}
            {sceneImage && (
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img 
                        src={sceneImage} 
                        alt="Scene Background" 
                        className={`w-full h-full object-cover opacity-90 ${imgPosition}`}
                        loading="lazy"
                    />
                    {/* Modern Gradient Overlay - Keeps Top Clear, Darkens Bottom for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent backdrop-blur-[0px]"></div>
                </div>
            )}
            
            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 max-w-md mx-auto">
                {children}
            </div>
        </section>
    );
};

const DialogueBox = ({ speaker, text, sub_text, inverted = false }: { speaker?: string, text: string, sub_text?: string, inverted?: boolean }) => {
    return (
        <div className={`w-full backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl animate-slide-up ${
            inverted ? 'bg-white/90 text-gray-900' : 'bg-black/60 text-white'
        }`}>
            {speaker && (
                <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                    inverted ? 'text-primary' : 'text-white/70'
                }`}>
                    {speaker}
                </div>
            )}
            <div className={`text-lg md:text-xl font-serif leading-relaxed whitespace-pre-line ${
                inverted ? 'text-gray-800' : 'text-white/95'
            }`}>
                {text}
            </div>
            {sub_text && (
                <div className={`mt-3 text-sm ${
                    inverted ? 'text-gray-500' : 'text-white/50'
                }`}>
                    {sub_text}
                </div>
            )}
        </div>
    );
};

// --- Scene Components ---

const SummaryScene = ({ data }: { data: any }) => {
    return (
        <SceneLayout>
            <div className="w-full bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl border border-[#E5E0D6] transform transition-all hover:scale-[1.02] duration-500">
                <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1 bg-[#2C2C2C] text-[#FDFBF7] text-xs font-bold rounded-full mb-3">
                        운명 요약
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-1">
                        {data.user_name}님의 현재 국면
                    </h2>
                    <h1 className="text-3xl md:text-4xl font-black text-[#92302E] mt-2 mb-4 leading-tight">
                        "{data.period_name}"
                    </h1>
                    <p className="text-gray-600 font-medium break-keep">
                        {data.status_one_line}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#F8F6F2] p-4 rounded-xl border-l-4 border-[#92302E]">
                        <div className="text-xs text-gray-500 font-bold mb-1">⚠️ 지금 조심할 것</div>
                        <div className="text-gray-800 font-medium">{data.caution_point}</div>
                    </div>
                    <div className="bg-[#F0F7F4] p-4 rounded-xl border-l-4 border-[#2E9258]">
                        <div className="text-xs text-gray-500 font-bold mb-1">✅ 지금 해야할 것</div>
                        <div className="text-gray-800 font-medium">{data.action_point}</div>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">지지직감(知之直感) 분석 리포트</p>
                </div>
            </div>
        </SceneLayout>
    );
};

const IntroScene = ({ speaker, text, sub_text, background }: any) => {
    // background object might contain src (scene image)
    const sceneImage = background?.src;

    return (
        <SceneLayout sceneImage={sceneImage}>
            <div className="flex flex-col items-center justify-end h-full pb-20 w-full">
                <div className="relative z-10 w-full mt-auto">
                    <DialogueBox speaker={speaker} text={text} sub_text={sub_text} />
                </div>
            </div>
        </SceneLayout>
    );
};

const SajuScene = ({ data, text, background }: any) => {
    const sceneImage = background?.src;
    
    // Helper for rendering Saju Grid
    const renderCell = (content: string, sub?: string, colorClass: string = "text-gray-800") => (
        <div className="flex flex-col items-center justify-center p-2 border border-gray-200 bg-white/50 h-20 md:h-24">
            <div className={`text-2xl md:text-3xl font-black ${colorClass}`}>{content}</div>
            {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
        </div>
    );

    return (
        <SceneLayout sceneImage={sceneImage}>
            <div className="w-full bg-[#FDFBF7]/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border-2 border-[#E5E0D6] max-w-lg">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-serif font-bold text-[#2C2C2C]">사주 구조 해석</h3>
                </div>
                
                {/* Header */}
                <div className="grid grid-cols-4 gap-1 mb-1 text-center text-xs font-bold text-gray-500">
                    <div>시주</div>
                    <div>일주</div>
                    <div>월주</div>
                    <div>년주</div>
                </div>

                {/* Table Body */}
                <div className="border-2 border-[#2C2C2C] rounded-lg overflow-hidden bg-white">
                    {/* 천간 */}
                    <div className="grid grid-cols-4 border-b border-gray-200">
                        {renderCell(data.hour?.chun || '?', data.hour?.chun_ship || '비견', data.hour?.chun_color)}
                        {renderCell(data.day?.chun || '?', data.day?.chun_ship || '비견', data.day?.chun_color)}
                        {renderCell(data.month?.chun || '?', data.month?.chun_ship || '식신', data.month?.chun_color)}
                        {renderCell(data.year?.chun || '?', data.year?.chun_ship || '편관', data.year?.chun_color)}
                    </div>
                    
                    {/* 지지 */}
                    <div className="grid grid-cols-4 border-b border-gray-200">
                         {renderCell(data.hour?.ji || '?', data.hour?.ji_ship || '식신', data.hour?.ji_color)}
                         {renderCell(data.day?.ji || '?', data.day?.ji_ship || '식신', data.day?.ji_color)}
                         {renderCell(data.month?.ji || '?', data.month?.ji_ship || '식신', data.month?.ji_color)}
                         {renderCell(data.year?.ji || '?', data.year?.ji_ship || '식신', data.year?.ji_color)}
                    </div>

                    {/* 지장간 (Optional/Simplified) */}
                    <div className="grid grid-cols-4 bg-gray-50 py-2 text-center text-xs text-gray-600 border-b border-gray-200">
                        <div>{data.hour?.jijang || '-'}</div>
                        <div>{data.day?.jijang || '-'}</div>
                        <div>{data.month?.jijang || '-'}</div>
                        <div>{data.year?.jijang || '-'}</div>
                    </div>

                     {/* 12운성/신살 */}
                     <div className="grid grid-cols-4 bg-gray-100 py-2 text-center text-xs font-medium text-gray-700">
                        <div>{data.hour?.woonsung || '양'}</div>
                        <div>{data.day?.woonsung || '장생'}</div>
                        <div>{data.month?.woonsung || '건록'}</div>
                        <div>{data.year?.woonsung || '제왕'}</div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-gray-800 font-serif leading-relaxed text-sm bg-white/60 p-3 rounded-lg border border-black/5">
                        {text}
                    </p>
                </div>
            </div>
        </SceneLayout>
    );
};

const ContrastScene = ({ data, text }: any) => {
    return (
        <SceneLayout>
            <div className="w-full space-y-4">
                <div className="flex flex-row items-stretch justify-between gap-2">
                     <div className="flex-1 bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-center items-center text-center">
                        <div className="text-[10px] text-white/50 mb-1 font-bold uppercase tracking-wider">Current</div>
                        <div className="text-xl font-bold text-white mb-2">{data.before.keyword}</div>
                        <div className="text-xs text-white/80 break-keep">{data.before.desc}</div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <ArrowRight className="text-white/50 w-6 h-6" />
                    </div>

                    <div className="flex-1 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white shadow-lg transform scale-105 flex flex-col justify-center items-center text-center">
                        <div className="text-[10px] text-[#92302E] mb-1 font-bold uppercase tracking-wider">Future</div>
                        <div className="text-xl font-bold text-gray-900 mb-2">{data.after.keyword}</div>
                        <div className="text-xs text-gray-700 font-medium break-keep">{data.after.desc}</div>
                    </div>
                </div>

                <div className="mt-6 bg-black/60 p-5 rounded-xl backdrop-blur-sm text-white/95 text-base text-center font-serif leading-relaxed border border-white/10 shadow-lg">
                    {text}
                </div>
            </div>
        </SceneLayout>
    );
};

const AdviceScene = ({ speaker, text, background }: any) => {
    const sceneImage = background?.src;
    return (
        <SceneLayout sceneImage={sceneImage}>
             <div className="flex flex-col items-center justify-end h-full pb-20 w-full">
                <div className="w-full bg-black/70 backdrop-blur-md border border-[#92302E]/50 rounded-2xl p-8 shadow-2xl animate-pulse-slow">
                     <div className="text-center">
                        <div className="text-[#92302E] text-xs font-bold tracking-[0.2em] mb-4 uppercase">Master's Advice</div>
                        <div className="text-xl md:text-2xl font-serif font-bold text-white leading-relaxed whitespace-pre-line">
                            "{text}"
                        </div>
                     </div>
                </div>
            </div>
        </SceneLayout>
    );
}

const OutroScene = ({ text, buttons, background }: any) => {
    const sceneImage = background?.src;
    return (
        <SceneLayout sceneImage={sceneImage} imgPosition="object-[center_top]">
            <div className="flex flex-col items-center justify-end h-full pb-10 w-full">
                <div className="text-center w-full max-w-sm bg-black/40 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                            운명의 흐름을<br/>응원합니다.
                        </h2>
                        <p className="text-white/90 leading-relaxed font-light whitespace-pre-line">
                            {text}
                        </p>
                    </div>

                    <div className="space-y-3 w-full">
                        {buttons.map((btn: any, idx: number) => (
                            <Button
                                key={idx}
                                variant={btn.primary ? "default" : "secondary"}
                                className={`w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-transform active:scale-95 ${
                                    btn.primary 
                                    ? 'bg-[#92302E] hover:bg-[#7a2826] text-white' 
                                    : 'bg-white/90 hover:bg-white text-gray-900'
                                }`}
                                onClick={() => {
                                    if (btn.action === 'share') {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('링크가 복사되었습니다!');
                                    } else if (btn.action === 'home') {
                                        window.location.href = '/';
                                    }
                                }}
                            >
                                {btn.action === 'share' && <Share2 className="mr-2 h-5 w-5" />}
                                {btn.action === 'home' && <Home className="mr-2 h-5 w-5" />}
                                {btn.label}
                            </Button>
                        ))}
                    </div>
                    
                    <div className="mt-8">
                        <img src="/logo-white.png" alt="" className="h-6 mx-auto opacity-50" />
                    </div>
                </div>
            </div>
        </SceneLayout>
    );
};

// --- Main Renderer ---

export default function SceneRenderer({ scenes }: { scenes: ReportScene[] }) {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Seamless Background Layer - Optimized for Tiling */}
            <div 
                className="absolute inset-0 z-0 opacity-60"
                style={{
                    backgroundImage: `url(${scrollBg})`,
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center top',
                    backgroundSize: '100% auto' // Tiles vertically, fits width
                }}
            />
            <div className="absolute inset-0 z-0 bg-black/30 backdrop-blur-[2px]"></div>

            {/* Scroll Container */}
            <div className="relative z-10 w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
                {scenes.map((scene, index) => {
                    switch (scene.type) {
                        case 'summary_card':
                            return <SummaryScene key={index} {...scene} />;
                        case 'intro':
                        case 'flow':
                            return <IntroScene key={index} {...scene} />;
                        case 'saju_scroll':
                            return <SajuScene key={index} {...scene} />;
                        case 'contrast':
                            return <ContrastScene key={index} {...scene} />;
                        case 'advice':
                            return <AdviceScene key={index} {...scene} />;
                        case 'outro':
                            return <OutroScene key={index} {...scene} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}
