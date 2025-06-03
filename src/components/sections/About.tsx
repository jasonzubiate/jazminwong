"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { funFacts } from "@/data/funFacts";
import Copy from "@/components/layout/Copy";

export default function About() {
  const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);

  const incrementFunFact = () => {
    setCurrentFunFact((prev) => {
      const currentIndex = funFacts.indexOf(prev);
      return funFacts[(currentIndex + 1) % funFacts.length];
    });
    setupAutoRotation(); // Reset the timeout after manual increment
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

    startTimeRef.current = Date.now();

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
      <div className="mb-12 lg:mb-16">
        <Copy>
          <p className="text-[clamp(16px,1.2vw,28px)] font-semibold mb-2">
            (About Jazmin)
          </p>
        </Copy>

        <Copy>
          <p className="text-[clamp(24px,5vw,60px)] font-semibold tracking-tight leading-[1.1]">
            I&apos;m a passionate marketing enthusiast driven by creativity and
            curiosity. While I&apos;m early in my professional journey, my love
            for marketing runs deep—from digital advertising to content
            creation. I thrive on spotting trends and bringing fresh
            perspectives to every project.
          </p>
        </Copy>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6 h-[clamp(350px,50vw,500px)] p-3 bg-[#F0CCDF] rounded-2xl">
          <div className="w-full h-full rounded-lg overflow-hidden relative">
            <Image
              src={currentFunFact.imageUrl}
              alt="Jazmin Wong"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 h-[350px] lg:h-full flex flex-col justify-between p-8 lg:p-12 bg-[#F0CCDF] rounded-2xl overflow-hidden relative">
          <Copy>
            <p className="text-[clamp(20px,2vw,32px)] text-[#C56386] font-semibold leading-tight">
              {currentFunFact.description}
            </p>
          </Copy>
          <NumberFlow
            className="text-[clamp(150px,15vw,300px)] text-[#C56386] font-bold tracking-tight absolute -bottom-[3vw] lg:-bottom-[2vw] left-8 lg:left-12"
            value={currentFunFact.numbericalValue}
          />
        </div>
      </div>
    </section>
  );
}
