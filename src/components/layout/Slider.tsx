"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import useWindowSize from "@/hooks/useWindowSize";

gsap.registerPlugin(useGSAP, Observer);

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef(0);
  const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const itemValuesRef = useRef<number[]>([]);
  const sliderTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { width } = useWindowSize();

  // Add the slider animation logic
  useGSAP(() => {
    if (!sliderRef.current) return;

    const content = sliderRef.current;
    const cards = content.querySelectorAll(".slider-card");
    const cardsLength = cards.length / 2;
    const half = content.clientWidth / 2;

    const wrap = gsap.utils.wrap(-half, 0);

    // Create quickTo animation function and store in ref
    xToRef.current = gsap.quickTo(content, "x", {
      duration: 0.5,
      ease: "power3",
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    });

    // Generate random values for card animations
    itemValuesRef.current = [];
    for (let i = 0; i < cardsLength; i++) {
      itemValuesRef.current.push((Math.random() - 0.5) * 20);
    }

    // Create card animation timeline
    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      rotate: (index) => itemValuesRef.current[index % cardsLength],
      xPercent: (index) => itemValuesRef.current[index % cardsLength],
      yPercent: (index) => itemValuesRef.current[index % cardsLength],
      scale: 0.95,
      duration: 0.5,
      ease: "back.inOut(3)",
    });

    sliderTimelineRef.current = tl;

    // Create observer for drag interactions
    const observer = Observer.create({
      target: content,
      type: "pointer,touch",
      onPress: () => tl.play(),
      onDrag: (self) => {
        totalRef.current += self.deltaX;
        if (xToRef.current) xToRef.current(totalRef.current);
      },
      onRelease: () => tl.reverse(),
      onStop: () => tl.reverse(),
    });

    // Set up automatic scrolling
    const tick = (time: number, deltaTime: number) => {
      totalRef.current -= deltaTime / 10;
      if (xToRef.current) xToRef.current(totalRef.current);
    };

    gsap.ticker.add(tick);

    // Clean up on component unmount
    return () => {
      observer.kill();
      gsap.ticker.remove(tick);
      if (sliderTimelineRef.current) {
        sliderTimelineRef.current.kill();
      }
    };
  }, []);

  // Create a duplicate array of images to allow for the infinite loop effect
  const allImages = [...images, ...images];

  return (
    <div className="overflow-x-hidden py-12">
      <div
        ref={sliderRef}
        className="w-max whitespace-nowrap flex gap-[clamp(8px,1vw,16px)] pr-[clamp(8px,1vw,16px)]"
      >
        {allImages.map((imageUrl, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 2.5,
              delay: width < 768 ? 2 : 2.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="slider-card p-3 rounded-xl bg-[#F5E1DA]"
          >
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(320px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src={imageUrl}
                alt={`Slider image ${index + 1}`}
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
