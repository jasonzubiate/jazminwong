"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { playfair_display } from "@/fonts";
import Slider from "@/components/layout/Slider";
import useWindowSize from "@/hooks/useWindowSize";

// Image URLs array - replace these with your actual image URLs
const sliderImages = [
  "https://images.unsplash.com/photo-1743055139213-456d8c3eaeb7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741856067761-1c544431e2b5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1743832371090-5d1790acedf5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742518515260-0ddb0f8d54c4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742516208153-6b5fdd80ff22?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1743832501798-4bfbe9e19335?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742519077728-f40bd20f7d52?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742518334759-d250ac09efa7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1743053380054-93eb3c11314b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1742516298488-82b32c6417ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzJ8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1742515686706-d0c286c33b18?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Hero() {
  const [initialScale, setInitialScale] = useState(0.2);
  const { width } = useWindowSize();

  useEffect(() => {
    // Set a larger initial scale on mobile devices
    const handleResize = () => {
      setInitialScale(width < 768 ? 0.5 : 0.2);
    };

    // Set initial value
    handleResize();
  }, [width]);

  return (
    <section className="pt-4 pb-24 h-screen relative">
      <div className="px-4">
        <h1 className="hidden">Jazmin Wong</h1>

        <motion.div
          initial={{
            scale: initialScale,
            top: "50%",
            y: "-50%",
          }}
          animate={{
            scale: 1,
            top: "0px",
            y: "16px",
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],

            scale: {
              duration: 1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
            top: {
              duration: 1.5,
              delay: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: 1.5,
              delay: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="overflow-hidden absolute left-4 right-4 origin-center will-change-transform"
        >
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full pointer-events-none mb-6"
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

        <div className="overflow-hidden absolute left-4 right-4 top-[12.5vw]">
          <div className="flex flex-col lg:flex-row justify-between items-center relative">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(16px,1.5vw,32px)] font-semibold leading-[1.2] text-center xl:text-left"
              >
                Content Creation and Digital Storytelling
              </motion.p>
            </div>

            <div className="overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[clamp(24px,2vw,48px)] h-[clamp(24px,2vw,48px)] relative group"
              >
                <Image
                  src="/images/icons/star.png"
                  alt="star"
                  fill
                  className="group-hover:rotate-[360deg] transition-transform duration-500 ease-in-out"
                />
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${playfair_display.className} text-[clamp(16px,1.5vw,32px)] font-normal -mt-1 leading-[1.2] text-center xl:text-left`}
              >
                Scaling digital brands reach and impact
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[13vw]">
        <Slider images={sliderImages} />
      </div>
    </section>
  );
}
