"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { playfair_display } from "@/fonts";
import Slider from "@/components/layout/Slider";
import useWindowSize from "@/hooks/useWindowSize";
import useDisableScroll from "@/hooks/useDisableScroll";
import useInstagramBrowser from "@/hooks/useInstagramBrowser";

const sliderImages = [
  "/images/hero/image-1.jpg",
  "/images/hero/image-2.jpg",
  "/images/hero/image-3.jpg",
  "/images/hero/image-4.jpg",
  "/images/hero/image-5.jpg",
  "/images/hero/image-6.jpg",
  "/images/hero/image-7.jpg",
  "/images/hero/image-8.jpg",
  "/images/hero/image-9.jpg",
  "/images/hero/image-10.jpg",
];

export default function Hero() {
  useDisableScroll();
  const { width } = useWindowSize();
  const initialScale = width < 768 ? 0.4 : 0.25;

  const isInstagram = useInstagramBrowser();

  return (
    <section className="pt-4 lg:pb-24 h-screen relative">
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
          className="absolute flex flex-col items-center justify-center sm:flex-row sm:gap-8 sm:justify-between left-4 right-4 origin-center will-change-transform"
        >
          <div className="overflow-hidden -mb-3 sm:mb-0">
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
                src="/images/other/jazmin.png"
                alt="Hero"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto sm:w-auto sm:h-[10vw]"
                priority
              />
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: width < 768 ? 0.225 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full pointer-events-none mb-6"
            >
              <Image
                src="/images/other/wong.png"
                alt="Hero"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-[18.3vw] sm:h-[10vw]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        <div
          className={`overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] ${
            isInstagram ? "bottom-[17vh]" : "top-[72vh]"
          }`}
        >
          <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: width < 768 ? 2 : 1.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(20px,1.6vw,32px)] font-semibold leading-[1.2] text-center md:text-left"
              >
                Content Creation & Digital Storytelling
              </motion.p>
            </div>

            <div className="hidden md:block overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <motion.div
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[clamp(28px,2vw,48px)] h-[clamp(28px,2vw,48px)] relative group"
              >
                <Image
                  src="/images/icons/star.svg"
                  alt="star"
                  fill
                  sizes="(max-width: 768px) 28px, 48px"
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
                  delay: width < 768 ? 2.05 : 1.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${playfair_display.className} text-[clamp(20px,1.6vw,32px)] font-normal -mt-1 leading-[1.2] text-center md:text-left`}
              >
                Scaling brands reach and impact
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[19vh] xs:mt-[23vh] sm:mt-[12vh] md:mt-[14vw]">
        <Slider images={sliderImages} />
      </div>
    </section>
  );
}
