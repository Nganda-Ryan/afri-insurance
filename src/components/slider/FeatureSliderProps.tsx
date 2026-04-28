'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeatureCard from './landing/FeatureCard';
import { FeatureCardType } from '@/types/FeatureCardType';
import Image from 'next/image';

interface CustomFeatureSliderProps {
  features: FeatureCardType[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
  showNavigation?: boolean;
  showDots?: boolean;
}

const CustomFeatureSlider: React.FC<CustomFeatureSliderProps> = ({
  features,
  autoPlay = true,
  autoPlayDelay = 4000,
  showNavigation = true,
  showDots = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [features.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  }, [features.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(autoPlay);
    }, 1000);
  };

  
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(goToNext, autoPlayDelay);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayDelay, goToNext, isTransitioning]);

  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
    }
    if (isRightSwipe) {
      goToPrev();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrev();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
      } else if (e.key === 'ArrowRight') {
        goToNext();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, autoPlay, isTransitioning]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main slider container */}
      <div 
        className="relative overflow-hidden min-h-[500px]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(autoPlay)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides - Absolute positioning approach */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 z-10'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full z-0'
                : 'opacity-0 translate-x-full z-0'
            }`}
          >
            <div className="md:p-12 h-full flex items-center justify-center">
              <FeatureCard {...feature} />
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        {showNavigation && (
          <>
            <button
              onClick={() => {
                goToPrev();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
              }}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group disabled:opacity-50 disabled:cursor-not-allowed z-20"
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>
            
            <button
              onClick={() => {
                goToNext();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(autoPlay), 2000);
              }}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group disabled:opacity-50 disabled:cursor-not-allowed z-20"
              aria-label="Slide suivant"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </button>
          </>
        )}

        {/* Progress bar */}
        {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
          />
        </div> */}


      </div>

      {/* Dots navigation */}
      {showDots && (
        <div className="flex justify-center space-x-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`relative overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            >
              {index === currentIndex && (
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Slide counter */}
      {/* <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm z-20">
        {currentIndex + 1} / {features.length}
      </div> */}

      {/* Preload next images */}
      <div className="hidden">
        {features.map((feature, index) => (
          index !== currentIndex && (
            <Image 
              key={`preload-${index}`}
              src={feature.image} 
              alt={`Preload ${feature.title}`}
              loading="lazy"
              height={200}
              width={300}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default CustomFeatureSlider;