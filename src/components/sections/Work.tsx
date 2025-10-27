"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Copy from "../layout/Copy";

const work = [
  {
    title: "Caravan Outpost",
    tags: ["UGC", "Photography", "Short-Form Video", "Content Strategy"],
    href: "https://caravanoutpostojai.com/",
    instagram: "https://www.instagram.com/caravanoutpost/",
    coverImage: "/images/work/work-1.png",
    images: ["/images/work/work-1.png"], // Add more images here to enable cycling
  },
  {
    title: "Ojai Olive Oil",
    tags: ["UGC", "Photography", "Short-Form Video", "Content Strategy"],
    href: "https://ojaioliveoil.com/?srsltid=AfmBOorJI1KURYM3EkBDV5FCWJimjwDlT6cpJLNUgm4oMQqDfXzTwW3L",
    instagram: "https://www.instagram.com/ojaioliveoil/",
    coverImage: "/images/work/work-2.png",
    images: ["/images/work/work-2.png"], // Add more images here to enable cycling
  },
  {
    title: "Inc Coffee Roasters",
    tags: ["UGC", "Photography", "Short-Form Video", "Content Strategy"],
    href: "https://www.inccoffeeroasters.com/",
    instagram: "https://www.instagram.com/inccoffeeroasters/",
    coverImage: "/images/work/work-3.png",
    images: ["/images/work/work-3.png"], // Add more images here to enable cycling
  },
  {
    title: "Blueshift Nutrition",
    tags: ["UGC", "Photography", "Short-Form Video", "Content Strategy"],
    href: "https://www.blueshiftnutrition.com/",
    instagram: "https://www.instagram.com/blueshiftnutrition/",
    coverImage: "/images/work/work-4.png",
    images: ["/images/work/work-4.png"], // Add more images here to enable cycling
  },
];

interface WorkCardProps {
  project: (typeof work)[0];
  index: number;
  isInView: boolean;
}

function WorkCard({ project, index, isInView }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval);
  }, [isHovered, project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 32, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, translateY: 0, scale: 1 }
          : { opacity: 0, translateY: 32, scale: 0.95 }
      }
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: [0.64, 0.57, 0.67, 1.53],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="flex flex-col justify-between h-[500px] col-span-1 rounded-2xl overflow-hidden relative p-3 cursor-pointer"
    >
      <div className="absolute inset-0 z-0">
        {project.images.map((image, imgIndex) => (
          <Image
            key={imgIndex}
            src={image}
            alt={`${project.title} - Image ${imgIndex + 1}`}
            fill
            className={`absolute inset-0 object-cover object-center transition-opacity duration-500 ${
              imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 z-10">
        {project.tags.map((tag, tagIndex) => (
          <div
            key={tagIndex}
            className="px-2 py-1.5 bg-stone-50 rounded-md text-stone-900 text-sm"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-stone-50 p-4 z-10">
        <h3 className="text-2xl font-semibold text-stone-900">
          {project.title}
        </h3>
        <div className="flex gap-2">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-lg bg-stone-800 text-center"
          >
            Website
          </a>
          <a
            href={project.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3 rounded-lg bg-[#F0CCDF] text-stone-900 text-center"
          >
            Instagram
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, {
    once: true,
    margin: "-30% 0% -30% 0%",
  });

  return (
    <section id="work" className="px-4 pb-20 lg:py-24 flex flex-col">
      <Copy>
        <h2 className="text-[clamp(24px,4vw,60px)] font-semibold mb-4 lg:mb-6">
          Featured work{" "}
        </h2>
      </Copy>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {work.map((project, index) => (
          <WorkCard
            key={index}
            project={project}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}
