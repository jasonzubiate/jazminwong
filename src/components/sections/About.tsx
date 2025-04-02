"use client";

import { useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { funFacts } from "@/data/funFacts";
import { playfair_display } from "@/fonts";
export default function About() {
  const [currentFunFact, setCurrentFunFact] = useState(funFacts[0]);

  return (
    <section id="about" className="px-4 py-24">
      <div className="mb-24 relative">
        <sup className="text-sm font-semibold align-super absolute top-3 left-0">
          (About Jazzi)
        </sup>
        <p className="tex-3xl md:text-5xl xl:text-[54px] font-semibold mt-6 indent-40">
          I&apos;m a passionate marketing enthusiast driven by creativity and
          curiosity. While I&apos;m early in my professional journey, my love
          for marketing runs deep—from digital advertising to content creation.
          I thrive on spotting trends, embracing challenges, and bringing fresh
          perspectives to every project.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-3 w-full border-b border-stone-900">
            <h3 className="text-lg font-semibold">Fun Facts</h3>

            <div className="flex">
              <p className="text-sm mr-1">
                0{funFacts.indexOf(currentFunFact) + 1}
              </p>
              <p className="text-sm">/</p>
              <p className="text-sm ml-1">0{funFacts.length}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentFunFact((prev) => {
                  const currentIndex = funFacts.indexOf(prev);
                  return funFacts[currentIndex - 1];
                })
              }
              className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100"
            >
              <IconArrowLeft size={20} color="#1C1917" />
            </button>
            <button
              onClick={() =>
                setCurrentFunFact((prev) => {
                  const currentIndex = funFacts.indexOf(prev);
                  return funFacts[currentIndex + 1];
                })
              }
              className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100"
            >
              <IconArrowRight size={20} color="#1C1917" />
            </button>
          </div>
        </div>

        <div className="col-span-1"></div>

        <div className="col-span-5 flex flex-col justify-between p-8 rounded-xl bg-[#F5E1DA] h-[370px]">
          <p className="text-[170px] font-semibold leading-[0.8]">
            {currentFunFact.numbericalValue}
          </p>

          <p className={`${playfair_display.className} font-normal text-2xl`}>
            {currentFunFact.description}
          </p>
        </div>

        <div className="col-span-4 p-3 rounded-xl bg-[#F5E1DA] h-[370px]">
          <div className="relative h-full w-full">
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
