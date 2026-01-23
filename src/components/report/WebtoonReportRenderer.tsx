
import React from 'react';
import { Share2, Home, ArrowRight, Quote } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { 
    WebtoonReportData, 
    SajuSection, 
    ContrastSection, 
    EndingSection 
} from '../../types/report-webtoon';

// --- Sub-components ---

const SectionContainer = ({ children, className = "", background }: { children: React.ReactNode, className?: string, background?: string }) => {
    return (
        <div className={`relative w-full flex flex-col items-center justify-center px-6 py-16 md:py-24 ${className}`}>
            <div className="relative z-10 w-full max-w-xl mx-auto">
                {/* Inline Image Placeholder */}
                {background && (
                    <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md bg-gray-100 min-h-[200px]">
                        <img 
                            src={background} 
                            alt="Section Visual" 
                            className="w-full h-auto object-cover block"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

const TextBlock = ({ text, className = "", highlight = false }: { text?: string, className?: string, highlight?: boolean }) => {
    if (!text) return null;
    return (
        <div className={`whitespace-pre-line font-serif leading-loose text-lg md:text-xl break-keep text-gray-800 ${className}`}>
            {text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    <span className={`${highlight && line.length > 10 ? 'bg-orange-100/50 px-1 box-decoration-clone' : ''}`}>
                        {line}
                    </span>
                    <br />
                </React.Fragment>
            ))}
        </div>
    );
};

const HeroSection = ({ hero }: { hero: WebtoonReportData['hero'] }) => {
    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex flex-col items-center justify-end pb-20 bg-gray-200">
            {/* Hero Image */}
            {hero.image_src && (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={hero.image_src} 
                        alt="Hero" 
                        className="w-full h-full object-cover object-top block" 
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/30"></div>
                </div>
            )}
            
            {/* Title Overlay */}
            <div className="relative z-10 text-center px-6 animate-slide-up">
                <div className="inline-block px-4 py-1 bg-black/50 backdrop-blur-md rounded-full text-white/90 text-sm font-bold tracking-widest mb-4 border border-white/20">
                    {hero.sage_name}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 drop-shadow-sm leading-tight">
                    {hero.title}
                </h1>
            </div>
        </div>
    );
};

const SummaryCardSection = ({ data }: { data: WebtoonReportData['summary_card'] }) => {
    return (
        <div className="w-full px-6 -mt-10 relative z-20 mb-12">
            <div className="w-full max-w-md mx-auto bg-white rounded-[2rem] p-8 shadow-2xl border border-[#E5E0D6] text-center">
                 <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-[#2C2C2C] text-[#FDFBF7] text-xs font-bold rounded-full mb-3">
                        운명 요약
                    </span>
                    <h2 className="text-xl font-serif text-gray-600 mb-1">
                        {data.user_name}님의 현재
                    </h2>
                    <h1 className="text-3xl font-black text-[#92302E] mt-2 mb-4 leading-tight break-keep">
                        "{data.period_name}"
                    </h1>
                    <p className="text-gray-700 font-medium break-keep leading-relaxed">
                        {data.status_one_line}
                    </p>
                </div>

                <div className="space-y-4 text-left">
                    <div className="bg-[#F8F6F2] p-4 rounded-xl border-l-4 border-[#92302E]">
                        <div className="text-xs text-gray-500 font-bold mb-1">⚠️ 주의</div>
                        <div className="text-gray-800 font-medium text-sm">{data.caution_point}</div>
                    </div>
                    <div className="bg-[#F0F7F4] p-4 rounded-xl border-l-4 border-[#2E9258]">
                        <div className="text-xs text-gray-500 font-bold mb-1">✅ 추천</div>
                        <div className="text-gray-800 font-medium text-sm">{data.action_point}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SajuSectionRenderer = ({ section }: { section: SajuSection }) => {
    const { saju_data } = section;
    const renderCell = (content: string, sub?: string, colorClass: string = "text-gray-800") => (
        <div className="flex flex-col items-center justify-center p-2 border-r border-b border-[#D8D0C0] last:border-r-0 h-24 bg-[#FDFBF7]">
            <div className={`text-2xl font-black ${colorClass}`}>{content}</div>
            {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
        </div>
    );

    return (
        <SectionContainer background={section.background}>
             <div className="mb-8 relative">
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#92302E]/10 rounded-full blur-xl"></div>
                <h3 className="relative text-xl font-bold font-serif text-[#2C2C2C] mb-2">타고난 기운의 구조</h3>
                <div className="w-12 h-1 bg-[#92302E]"></div>
             </div>

            <div className="w-full bg-white border-4 border-[#2C2C2C] rounded-lg shadow-xl overflow-hidden mb-8">
                 <div className="grid grid-cols-4 bg-[#2C2C2C] text-[#FDFBF7] py-2 text-center text-xs font-bold">
                    <div>시주</div>
                    <div>일주</div>
                    <div>월주</div>
                    <div>년주</div>
                </div>
                 <div className="grid grid-cols-4 border-b border-[#D8D0C0]">
                    {renderCell(saju_data.hour?.chun, saju_data.hour?.chun_ship, saju_data.hour?.chun_color)}
                    {renderCell(saju_data.day?.chun, saju_data.day?.chun_ship, saju_data.day?.chun_color)}
                    {renderCell(saju_data.month?.chun, saju_data.month?.chun_ship, saju_data.month?.chun_color)}
                    {renderCell(saju_data.year?.chun, saju_data.year?.chun_ship, saju_data.year?.chun_color)}
                </div>
                <div className="grid grid-cols-4">
                     {renderCell(saju_data.hour?.ji, saju_data.hour?.ji_ship, saju_data.hour?.ji_color)}
                     {renderCell(saju_data.day?.ji, saju_data.day?.ji_ship, saju_data.day?.ji_color)}
                     {renderCell(saju_data.month?.ji, saju_data.month?.ji_ship, saju_data.month?.ji_color)}
                     {renderCell(saju_data.year?.ji, saju_data.year?.ji_ship, saju_data.year?.ji_color)}
                </div>
            </div>

            <TextBlock text={section.text} />
        </SectionContainer>
    );
};

const ContrastSectionRenderer = ({ section }: { section: ContrastSection }) => {
    return (
        <SectionContainer className="bg-gradient-to-b from-[#FDFBF7] to-[#F0F0F0]">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-70">
                    <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Before</div>
                    <div className="text-lg font-bold text-gray-600 mb-2">{section.before.keyword}</div>
                    <p className="text-sm text-gray-500 leading-relaxed">{section.before.desc}</p>
                </div>
                <div className="flex items-center justify-center text-gray-300">
                    <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
                </div>
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-[#92302E]/20 ring-1 ring-[#92302E]/10">
                    <div className="text-xs font-bold text-[#92302E] mb-2 uppercase tracking-wider">After</div>
                    <div className="text-lg font-bold text-gray-900 mb-2">{section.after.keyword}</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{section.after.desc}</p>
                </div>
            </div>
            <TextBlock text={section.text} />
        </SectionContainer>
    );
};

const EndingSectionRenderer = ({ section }: { section: EndingSection }) => {
    return (
        <SectionContainer background={section.background} className="pb-32">
            <div className="bg-[#FFFDF9] p-8 md:p-12 rounded shadow-sm border border-stone-200 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#92302E] text-white rounded-full p-3 shadow-lg">
                    <Quote className="w-6 h-6" />
                </div>
                
                <TextBlock text={section.text} className="text-center mb-10" />

                <div className="space-y-3">
                    {section.buttons.map((btn, idx) => (
                        <Button
                            key={idx}
                            variant={btn.primary ? "default" : "outline"}
                            className={`w-full h-14 text-lg font-bold rounded-xl shadow-md transition-all ${
                                btn.primary 
                                ? 'bg-[#92302E] hover:bg-[#7a2826] text-white border-transparent' 
                                : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300'
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
            </div>
        </SectionContainer>
    );
};

// --- Main Webtoon Renderer ---

export default function WebtoonReportRenderer({ data }: { data: WebtoonReportData }) {
    return (
        <div className="relative w-full min-h-screen bg-[#FDFBF7]">
            {/* Seamless Background Pattern - Global - Overridden with solid color as requested */}
            <div 
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundColor: '#F0F0F0' // Use Scene 4 (Contrast Scene) background color as requested
                }}
            />

            {/* Content Flow */}
            <div className="relative z-10 w-full">
                <HeroSection hero={data.hero} />
                <SummaryCardSection data={data.summary_card} />

                {/* Render Sections Sequentially */}
                <div className="flex flex-col w-full">
                    {data.sections.map((section, index) => {
                        switch (section.type) {
                            case 'intro':
                                return (
                                    <SectionContainer key={index} background={section.background}>
                                        <TextBlock text={section.text} />
                                    </SectionContainer>
                                );
                            case 'saju':
                                return <SajuSectionRenderer key={index} section={section as SajuSection} />;
                            case 'flow':
                                return (
                                    <SectionContainer key={index} background={section.background}>
                                        <div className="mb-6 opacity-50 flex justify-center">
                                            <div className="w-1 h-12 bg-gray-300"></div>
                                        </div>
                                        <TextBlock text={section.text} highlight={true} />
                                    </SectionContainer>
                                );
                            case 'contrast':
                                return <ContrastSectionRenderer key={index} section={section as ContrastSection} />;
                            case 'advice':
                                return (
                                    <SectionContainer key={index} background={section.background}>
                                         <div className="text-center">
                                            <h3 className="text-[#92302E] font-bold tracking-widest text-sm uppercase mb-6">도사의 조언</h3>
                                            <div className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-normal whitespace-pre-line">
                                                {section.text}
                                            </div>
                                         </div>
                                    </SectionContainer>
                                );
                            case 'ending':
                                return <EndingSectionRenderer key={index} section={section as EndingSection} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
