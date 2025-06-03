"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { funFacts } from "@/data/funFacts";
import { playfair_display } from "@/fonts";
import Copy from "@/components/layout/Copy";

export default function About() {
  const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);
  const [progress, setProgress] = useState(0);

  const incrementFunFact = () => {
    setCurrentFunFact((prev) => {
      const currentIndex = funFacts.indexOf(prev);
      return funFacts[(currentIndex + 1) % funFacts.length];
    });
    setupAutoRotation(); // Reset the timeout after manual increment
  };

  const decrementFunFact = () => {
    setCurrentFunFact((prev) => {
      const currentIndex = funFacts.indexOf(prev);
      return funFacts[(currentIndex - 1 + funFacts.length) % funFacts.length];
    });
    setupAutoRotation(); // Reset the timeout after manual decrement
  };

  // Add a ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Function to set up the auto-rotation timeout
  const setupAutoRotation = useCallback(() => {
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Reset progress
    setProgress(0);
    startTimeRef.current = Date.now();

    // Set up animation frame for progress
    const animateProgress = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / 5000, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress);
      }
    };

    animationRef.current = requestAnimationFrame(animateProgress);

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      incrementFunFact();
    }, 5000);
  }, []);

  // Set up the initial timeout when component mounts
  useEffect(() => {
    setupAutoRotation();

    // Clean up the timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setupAutoRotation]);

  return (
    <section id="about" className="px-4 pb-20 lg:py-24">
      <p className="text-sm font-semibold lg:hidden">(About Jazzi)</p>

      <div className="mb-16">
        <Copy>
          <p className="text-[clamp(12px,1.1vw,28px)] font-semibold mb-2">
            (About Jazmin)
          </p>
        </Copy>

        <Copy>
          <p className="text-[clamp(20px,4.5vw,60px)] font-semibold tracking-tight leading-[1.1]">
            I&apos;m a passionate marketing enthusiast driven by creativity and
            curiosity. While I&apos;m early in my professional journey, my love
            for marketing runs deep—from digital advertising to content
            creation. I thrive on spotting trends and bringing fresh
            perspectives to every project.
          </p>
        </Copy>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 h-[500px] p-3 bg-[#F0CCDF] rounded-2xl">
          <div className="w-full h-full rounded-lg overflow-hidden relative">
            <Image
              src={currentFunFact.imageUrl}
              alt="Jazmin Wong"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 flex flex-col justify-between p-12 bg-[#F0CCDF] rounded-2xl overflow-hidden relative">
          <Copy>
            <p className="text-[clamp(12px,2vw,32px)] text-[#C56386] font-semibold leading-tight">
              {currentFunFact.description}
            </p>
          </Copy>
          <NumberFlow
            className="text-[clamp(120px,15vw,300px)] text-[#C56386] font-bold tracking-tight absolute -bottom-[2vw] left-12"
            value={currentFunFact.numbericalValue}
          />
        </div>
      </div>
    </section>
  );
}
