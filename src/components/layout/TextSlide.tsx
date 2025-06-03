"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function TextSlide() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
  });

  const direction = -1;

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [150 * direction, -150 * direction]
  );

  return (
    <motion.div
      id="services-title"
      ref={container}
      style={{ left: "-40%", x: translateX }}
      className="relative flex whitespace-nowrap will-change-transform"
    >
      <Phrase />
      <Phrase />
      <Phrase />
    </motion.div>
  );
}

const Phrase = () => {
  return (
    <div className={"px-5 flex gap-5 items-center"}>
      <p className="text-[7.5vw]">My Services – </p>
    </div>
  );
};
