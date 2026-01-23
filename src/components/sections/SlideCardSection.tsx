import React, { useRef } from 'react';
import { ZODIAC_CARDS } from '../../constants/zodiacData';
import { FlipCard } from '../ui/FlipCard';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideCardSectionProps {
  className?: string;
  direction?: 'left' | 'right';
}

export const SlideCardSection: React.FC<SlideCardSectionProps> = ({ className = '', direction = 'left' }) => {
  // Filter for specific animals: tiger, rabbit, dragon, sheep, monkey
  const targetIds = ['tiger', 'rabbit', 'dragon', 'sheep', 'monkey'];
  
  // 1. Get only target cards
  const targetCards = ZODIAC_CARDS.filter(c => targetIds.includes(c.id));
  
  // 2. Sort them in the specific order: Tiger -> Rabbit -> Dragon -> Sheep -> Monkey
  // Since ZODIAC_CARDS is already ordered by id logic or we can enforce it
  // Tiger (3rd in original list), Rabbit (4th), Dragon (5th), Sheep (8th), Monkey (9th)
  // Or we can just use the targetIds array to map
  const sortedCards = targetIds.map(id => ZODIAC_CARDS.find(c => c.id === id)!);
  
  // 3. Duplicate for slider effect (although we removed auto-play, duplication might still be desired for "infinite" feel or just enough content)
  // User asked to "leave only" these 4.
  // If we want a slider, 4 cards might be too few to scroll if screen is wide.
  // Let's duplicate them to ensure scrolling is possible/smooth.
  const sliderCards = [...sortedCards, ...sortedCards, ...sortedCards]; 

  // const [isPaused, setIsPaused] = React.useState(false); // Removed: No auto-play
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'; // Removed: No auto-play animation

  const handleCardInteraction = () => {
    // setIsPaused(true); // Removed
  };

  const handleCardBlur = () => {
    // setIsPaused(false); // Removed
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ScrollReveal animation="fade-in" delay={300} duration={1000} className={`w-full ${className} relative group`}>
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-30 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#92302E]"
        aria-label="이전 카드"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-30 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#92302E]"
        aria-label="다음 카드"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div 
        ref={scrollContainerRef}
        className="relative z-10 w-full overflow-x-auto scrollbar-hide mb-4 md:mb-8 py-2 md:py-4 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div 
          className="flex w-max px-4"
          // style={{ animationPlayState: isPaused ? 'paused' : undefined }} // Removed
        >
          {sliderCards.map((card, idx) => (
            <FlipCard 
              key={`${card.id}-${idx}`} 
              data={card}
              className="w-[240px] sm:w-[280px] md:w-[360px] aspect-[3/4.5] mx-3 sm:mx-4 md:mx-5 shrink-0 snap-center"
              onMobileFocus={handleCardInteraction}
              onMobileBlur={handleCardBlur}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};
