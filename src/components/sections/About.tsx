"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import NumberFlow from "@number-flow/react";
import { funFacts } from "@/data/funFacts";
import { playfair_display } from "@/fonts";

export default function About() {
  const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);

  // Add a ref to store the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to set up the auto-rotation timeout
  const setupAutoRotation = useCallback(() => {
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      incrementFunFact();
    }, 5000);
  }, []);

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

  // Set up the initial timeout when component mounts
  useEffect(() => {
    setupAutoRotation();

    // Clean up the timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [setupAutoRotation]);

  return (
    <section id="about" className="px-4 py-24">
      <p className="text-sm font-semibold lg:hidden">
        (About Jazzi)
      </p>

      <div className="mb-24 relative">
        <sup className="text-sm font-semibold align-super absolute top-3 left-0 hidden lg:block">
          (About Jazzi)
        </sup>

        <p className="text-xl md:text-5xl xl:text-[54px] font-semibold mt-6 lg:indent-40">
          I&apos;m a passionate marketing enthusiast driven by creativity and
          curiosity. While I&apos;m early in my professional journey, my love
          for marketing runs deep—from digital advertising to content creation.
          I thrive on spotting trends, embracing challenges, and bringing fresh
          perspectives to every project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-3 w-full border-b border-stone-900">
            <h3 className="text-lg font-semibold">Fun Facts</h3>

            <div className="flex">
              <p className="text-sm mr-1 font-normal">
                0{funFacts.indexOf(currentFunFact) + 1}
              </p>
              <p className="text-sm font-normal">/</p>
              <p className="text-sm ml-1 font-normal">0{funFacts.length}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={decrementFunFact}
              className="flex w-14 xl:w-12 h-14 xl:h-12 rounded-full bg-stone-100 overflow-hidden cursor-pointer group"
            >
              <div className="flex transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:-translate-x-1/2">
                <div className="flex items-center justify-center w-14 xl:w-12">
                  <IconArrowLeft className="text-stone-900 text-2xl" />
                </div>
                <div className="flex items-center justify-center w-14 xl:w-12">
                  <IconArrowLeft className="text-stone-900 text-2xl" />
                </div>
              </div>
            </button>
            <button
              onClick={incrementFunFact}
              className="flex justify-end w-14 xl:w-12 h-14 xl:h-12 rounded-full bg-stone-100 overflow-hidden cursor-pointer group"
            >
              <div className="flex justify-end transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:translate-x-1/2">
                <div className="flex items-center justify-center w-14 xl:w-12">
                  <IconArrowRight className="text-stone-900 text-2xl" />
                </div>
                <div className="flex items-center justify-center w-14 xl:w-12">
                  <IconArrowRight className="text-stone-900 text-2xl" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Only show this empty column on lg screens and above */}
        <div className="hidden lg:block lg:col-span-1"></div>

        <div className="col-span-1 md:col-span-4 lg:col-span-5 flex flex-col justify-between p-8 rounded-xl bg-[#F5E1DA] h-[400px] lg:h-[370px] overflow-hidden mt-4 md:mt-0">
          <NumberFlow
            value={currentFunFact.numbericalValue}
            spinTiming={{ duration: 700, easing: "ease-in-out" }}
            className="text-[170px] font-semibold leading-[0.8] -my-10"
          />

          <p
            className={`${playfair_display.className} font-normal text-xl lg:text-2xl leading-[1.2] mt-4 md:mt-0`}
          >
            {currentFunFact.description}
          </p>
        </div>

        <div className="col-span-1 md:col-span-6 lg:col-span-4 p-3 rounded-xl bg-[#F5E1DA] h-[400px] lg:h-[370px] mt-4 md:mt-0">
          <div className="relative h-full w-full rounded-lg overflow-hidden">
            <Image
              src={currentFunFact.imageUrl}
              alt={currentFunFact.description}
              fill
              className="object-center object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
