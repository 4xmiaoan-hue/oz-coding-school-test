import React, { useState } from 'react';
import { ZODIAC_CARDS } from '../../constants/zodiacData';
import { FlipCard } from '../ui/FlipCard';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GridCardSectionProps {
  className?: string;
}

export const GridCardSection: React.FC<GridCardSectionProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter for specific animals: rabbit, dragon, sheep, monkey
  const targetIds = ['rabbit', 'dragon', 'sheep', 'monkey'];
  
  // Sort them in the specific order: Rabbit -> Dragon -> Sheep -> Monkey
  // The Grid usually shows all. Now it will show 4.
  const gridCards = targetIds.map(id => ZODIAC_CARDS.find(c => c.id === id)!);

  return (
    <ScrollReveal animation="fade-in" delay={300} duration={1000} className={`w-full max-w-[1280px] mx-auto px-4 ${className}`}>
      <div className="flex flex-col items-center w-full">
        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[15px] md:gap-x-[15px] md:gap-y-[20px] justify-items-center w-full max-w-[800px]">
          {gridCards.map((card) => (
            <div 
              key={card.id} 
              className="w-full flex justify-center"
            >
              <FlipCard 
                data={card}
                className="w-full max-w-[360px] aspect-[3/4.5]"
                mode="link" // Add a mode prop to FlipCard to distinguish behavior
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};
