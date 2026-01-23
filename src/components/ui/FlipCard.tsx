import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZodiacCard } from '../../constants/zodiacData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { CornerDownLeft, Sparkles } from 'lucide-react';

// Typewriter Component
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

interface FlipCardProps {
  data: ZodiacCard;
  className?: string;
  onMobileFocus?: () => void;
  onMobileBlur?: () => void;
  mode?: 'default' | 'link'; // 'default' has flip/hover, 'link' navigates immediately
}

export const FlipCard: React.FC<FlipCardProps> = ({ data, className = '', onMobileFocus, onMobileBlur, mode = 'default' }) => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nextFlipRef = useRef<boolean>(false);
  const flipVideoSrc = new URL('../../assets/flip.mp4', import.meta.url).href;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formattedQuote = data.quote.replace(/,/g, ',\n');

  const handleFlip = () => {
    const target = !isFlipped;
    nextFlipRef.current = target;
    
    // 메시지 창 즉시 숨김
    if (target) {
      setIsHovered(false);
    }

    if (target && typeof data.video === 'string' && data.video.length > 0) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {
            setShowVideo(false);
            setIsFlipped(nextFlipRef.current);
          });
        }
      }, 0);
    } else {
      setIsFlipped(target);
      // 뒷면에서 앞면으로 돌아올 때 모바일 슬라이드 재개
      if (!target && isMobile) {
        setMobileActive(false);
        onMobileBlur?.();
      }
    }
  };

  const handleDirectNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Allowed sages logic
    const ALLOWED_IDS = ['dragon', 'monkey', 'rabbit', 'tiger'];
    
    if (ALLOWED_IDS.includes(data.id)) {
      navigate(`/master/${data.id}`);
    } else {
      alert(`${data.name}가 당신을 만날 준비를 하고 있습니다.\n미래에서 기다릴게요.`);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (mode === 'link') {
      handleDirectNavigation(e);
      return;
    }

    if (isMobile) {
      if (isFlipped) {
        // 뒷면 상태에서 탭하면 앞면으로 복귀
        handleFlip();
      } else {
        // 앞면 상태일 때
        if (!mobileActive) {
          // 1차 탭: 슬라이드 멈춤 & 메시지 표시
          setMobileActive(true);
          setIsHovered(true);
          setIsTypingDone(false);
          onMobileFocus?.();
        } else {
          // 2차 탭: 카드 뒤집기
          handleFlip();
        }
      }
    } else {
      handleFlip();
    }
  };

  const handleMouseEnter = () => {
    if (mode === 'link') return; // No hover effect in link mode
    if (!isMobile) {
      setIsHovered(true);
      setIsTypingDone(false);
    }
  };

  const handleMouseLeave = () => {
    if (mode === 'link') return; // No hover effect in link mode
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Allowed sages
    const ALLOWED_IDS = ['dragon', 'monkey', 'rabbit', 'tiger'];
    
    if (ALLOWED_IDS.includes(data.id)) {
      navigate(`/master/${data.id}`);
    } else {
      alert(`${data.name}가 당신을 만날 준비를 하고 있습니다.\n미래에서 기다릴게요.`);
    }
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Allowed sages logic reused
    const ALLOWED_IDS = ['dragon', 'monkey', 'rabbit', 'tiger'];
    
    if (ALLOWED_IDS.includes(data.id)) {
      navigate(`/master/${data.id}`);
    } else {
      alert(`${data.name}가 당신을 만날 준비를 하고 있습니다.\n미래에서 기다릴게요.`);
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer touch-manipulation pt-2 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-question={data.id}
      style={{ perspective: '1000px', WebkitTapHighlightColor: 'transparent' }}
    >
      <div 
        className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-sm hover:shadow-xl rounded-[24px] ${mode === 'default' && !showVideo && isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* NEW Badge - Eye-catching Gradient Design */}
        {data.isNew && (
          <div 
            className="absolute -top-1 -left-1 sm:-top-3 sm:-left-3 z-50 backface-hidden"
            onClick={handleBadgeClick}
            title="새로 추가된 인기 카드!"
          >
            <div className="bg-gradient-to-br from-[#92302E] via-[#D64542] to-[#92302E] text-white text-[10px] sm:text-sm font-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_4px_15px_rgba(146,48,46,0.4)] hover:shadow-[0_6px_20px_rgba(146,48,46,0.6)] transform transition-all duration-300 hover:scale-110 tracking-widest leading-none border border-white/20">
              NEW
            </div>
          </div>
        )}

        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[24px] overflow-hidden bg-gray-50 border border-black/5">
          <img 
            src={data.image} 
            alt={data.name} 
            loading="lazy"
            className="w-full h-full object-cover" 
          />
          {/* VN Style Message Box Overlay - Only show in default mode */}
          {mode === 'default' && (
            <div 
              className={`absolute inset-x-1 bottom-1 sm:inset-x-2 sm:bottom-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl p-2 sm:p-3 shadow-2xl flex items-start gap-2 sm:gap-3">
                 {/* Avatar */}
                 <div className="shrink-0 mt-0.5">
                   <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden">
                      <span className="text-base sm:text-2xl">{data.icon}</span>
                   </div>
                 </div>
                 
                 {/* Text Area */}
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <span className="text-[10px] sm:text-xs font-bold text-gray-400">{data.name}</span>
                    </div>
                    <div className="text-[11px] sm:text-sm text-white font-medium leading-tight sm:leading-relaxed min-h-[2.5em] break-keep text-left whitespace-pre-line">
                       {isHovered && (
                         <TypewriterText text={formattedQuote} onComplete={() => setIsTypingDone(true)} />
                       )}
                       {isHovered && isTypingDone && (
                         <>
                           <span className="inline-flex items-center justify-center px-1.5 py-[1px] ml-1.5 mr-0.5 text-[9px] font-mono font-semibold leading-none text-white/80 bg-slate-700/50 border border-white/10 rounded-[3px] hover:bg-slate-600/80 hover:text-white active:bg-slate-500 transition-all cursor-pointer select-none shadow-sm animate-pulse tracking-tighter">
                             click
                           </span>
                           <CornerDownLeft className="inline-block w-3 h-3 sm:w-4 sm:h-4 text-white/80 animate-pulse align-bottom" />
                         </>
                       )}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Back of Card - Only rendered in default mode for performance/logic, or just hidden by CSS not rotating */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[24px] overflow-hidden border border-black/5"
          style={{ backgroundColor: data.color }}
        >
          <Card className="w-full h-full border-0 shadow-none bg-transparent flex flex-col p-0.5 sm:p-1">
            <CardHeader className="flex flex-col items-center pb-1 pt-3 sm:pt-6 space-y-1 sm:space-y-2">
              <Avatar className="h-10 w-10 sm:h-14 sm:w-14 shadow-sm bg-white/80 ring-1 ring-white/50">
                <AvatarFallback className="text-xl sm:text-2xl bg-transparent flex items-center justify-center w-full h-full">
                  {data.icon}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center space-y-0.5 sm:space-y-1">
                <CardTitle className="text-sm sm:text-lg font-bold text-gray-900 leading-tight tracking-tight">
                  {data.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className="bg-white/50 hover:bg-white/60 text-gray-700 font-medium border-0 px-1.5 py-0.5 text-[9px] sm:text-xs tracking-wide"
                >
                  {data.subName}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col px-2 pb-2 pt-0 gap-1.5 sm:px-5 sm:pb-5 sm:gap-3 overflow-hidden justify-between">
              {/* Representative Question - User Message */}
              <div className="flex justify-center items-center flex-1">
                <div className="bg-white/90 p-3 sm:p-5 rounded-xl sm:rounded-2xl backdrop-blur-sm shadow-sm max-w-[95%] border border-gray-100 relative">
                  <div className="absolute -bottom-2 right-6 w-3 h-3 sm:w-4 sm:h-4 bg-white/90 border-r border-b border-gray-100 transform rotate-45"></div>
                  <p className="text-xs sm:text-base font-bold text-gray-800 leading-snug break-keep text-center">
                    "{data.question}"
                  </p>
                </div>
              </div>

              {/* Topics */}
              <div className="bg-white/40 p-1.5 sm:p-3 rounded-lg sm:rounded-xl text-xs space-y-1 backdrop-blur-sm">
                <span className="block text-[9px] sm:text-xs font-bold text-gray-600 ml-1">전문 분야</span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                  {data.masterTopics.map((topic, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center rounded-md bg-white/60 px-1 sm:px-2 py-0.5 text-[9px] sm:text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-2 pt-0 sm:p-5 sm:pt-0">
              <Button 
                className="w-full font-bold shadow-md h-8 sm:h-12 text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all rounded-lg sm:rounded-xl tracking-wide"
                style={{ backgroundColor: '#92302E', color: 'white' }} 
                onClick={handleCTAClick}
              >
                {data.cta}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {showVideo && (
          <div className="absolute inset-0 rounded-[24px] overflow-hidden">
            <video
              ref={videoRef}
              src={data.video ?? flipVideoSrc}
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => {
                setShowVideo(false);
                setIsFlipped(nextFlipRef.current);
              }}
              onError={() => {
                setShowVideo(false);
                setIsFlipped(nextFlipRef.current);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
