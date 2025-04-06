"use client";

import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import Image from "next/image";
import { playfair_display } from "@/fonts";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(useGSAP, Observer);

export default function Hero() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef(0);
  const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const itemValuesRef = useRef<number[]>([]);
  const sliderTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [initialScale, setInitialScale] = useState(0.2);

  useEffect(() => {
    // Set a larger initial scale on mobile devices
    const handleResize = () => {
      setInitialScale(window.innerWidth < 768 ? 0.4 : 0.2);
    };

    // Set initial value
    handleResize();

    // Update on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <section className="pt-4 pb-24 h-screen relative">
      <div className="px-4">
        <h1 className="hidden">Jazmin Wong</h1>

        <motion.div
          initial={{ scale: initialScale, top: "50%", translateY: "-50%" }}
          animate={{
            scale: [initialScale, 1, 1],
            top: ["50%", "50%", "0"],
            translateY: ["-50%", "-50%", "16px"],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.4, 0.8],
            delay: 1.5,
            bounce: 1,
          }}
          className="overflow-hidden absolute left-4 right-4 origin-center will-change-transform"
        >
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full pointer-events-none mb-4"
          >
            <Image
              src="/images/other/jazmin-wong-header.png"
              alt="Hero"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </motion.div>

        <div className="overflow-hidden absolute left-4 right-4 top-44">
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 2.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col xl:flex-row justify-between items-center relative"
          >
            <div className="overflow-hidden">
              <p className="text-2xl font-semibold leading-[1.2] text-center xl:text-left">
                Content Creation and Digital Storytelling
              </p>
            </div>

            <div className="overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <div className="w-8 h-8 relative">
                <Image src="/images/icons/star.png" alt="star" fill />
              </div>
            </div>

            <div className="overflow-hidden">
              <p
                className={`${playfair_display.className} text-2xl font-normal -mt-1 leading-[1.2] text-center xl:text-left`}
              >
                Scaling digital brands reach and impact
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="overflow-x-hidden py-12">
        <div
          ref={sliderRef}
          className="w-max whitespace-nowrap flex gap-[clamp(8px,1vw,16px)] pr-[clamp(8px,1vw,16px)] cursor-grab"
        >
          {/* <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1743055139213-456d8c3eaeb7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1743055139213-456d8c3eaeb7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742518906875-7eed5bc43ce6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742519077728-f40bd20f7d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742518334759-d250ac09efa7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742516298488-82b32c6417ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzJ8fHxlbnwwfHx8fHw%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div> */}

          {/* Duplicate slider-cards */}

          {/* <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1743055139213-456d8c3eaeb7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1743055139213-456d8c3eaeb7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742518906875-7eed5bc43ce6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742519077728-f40bd20f7d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742518334759-d250ac09efa7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
          <div className="slider-card p-3 rounded-xl bg-[#F5E1DA]">
            <div className="w-[clamp(260px,20vw,400px)] h-[clamp(300px,25vw,450px)] rounded-lg overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1742516298488-82b32c6417ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzJ8fHxlbnwwfHx8fHw%3D"
                alt="Unsplash - Jazmin Wong"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>*/}
        </div>
      </div>
    </section>
  );
}
