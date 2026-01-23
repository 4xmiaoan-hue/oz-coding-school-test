import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  enable?: boolean;
  once?: boolean; // If true, animation runs only once. If false, it runs every time it enters viewport.
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'slide-up',
  duration = 800,
  delay = 0,
  threshold = 0.1,
  className,
  enable = true,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enable) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [enable, once, threshold]);

  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-in':
        return 'opacity-0';
      case 'slide-up':
        return 'opacity-0 translate-y-12';
      case 'slide-down':
        return 'opacity-0 -translate-y-12';
      case 'slide-left':
        return 'opacity-0 translate-x-12';
      case 'slide-right':
        return 'opacity-0 -translate-x-12';
      case 'scale-up':
        return 'opacity-0 scale-95';
      default:
        return 'opacity-0';
    }
  };

  const getFinalStyle = () => {
    switch (animation) {
      case 'scale-up':
        return 'opacity-100 scale-100';
      default:
        return 'opacity-100 translate-x-0 translate-y-0';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out will-change-[opacity,transform]',
        isVisible ? getFinalStyle() : getInitialStyle(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
