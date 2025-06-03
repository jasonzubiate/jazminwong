"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/services";
import useWindowSize from "@/hooks/useWindowSize";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Services() {
  const { width } = useWindowSize();
  const isMobile = width < 768; // Standard md breakpoint in Tailwind

  useGSAP(() => {
    // Early return if on mobile to disable animations
    if (isMobile) return;

    const cards = gsap.utils.toArray(".card");

    ScrollTrigger.create({
      trigger: cards[0] as Element,
      start: "top 30%",
      endTrigger: cards[cards.length - 1] as Element,
      end: "top 30%",
      pin: "#services-title",
      pinSpacing: false,
      // markers: true,
    });

    gsap.to("#services-title", {
      y: `-${(cards.length - 1) * 28}vh`,
      ease: "none",
      scrollTrigger: {
        trigger: cards[0] as Element,
        start: "top 30%",
        endTrigger: "#footer",
        end: "top 65%",
        scrub: true,
        // markers: true,
      },
    });

    cards.forEach((card, index) => {
      // const isLastCard = index === cards.length - 1;
      const cardInner = (card as Element).querySelector(".card-inner");

      ScrollTrigger.create({
        trigger: card as Element,
        start: "top 30%",
        endTrigger: cards[cards.length - 1] as Element,
        end: "bottom 60%",
        pin: true,
        pinSpacing: false,
        // markers: true,
      });

      gsap.to(cardInner, {
        y: `-${(cards.length - index) * 22}vh`,
        scale: 0.8 + index * 0.05,
        rotationZ: (Math.random() - 0.5) * 5, // Random rotationZ between -2.5 and 2.5 degrees
        rotationX: (Math.random() - 0.5) * 5, // Random rotationX between -2.5 and 2.5 degrees
        ease: "none",
        scrollTrigger: {
          trigger: card as Element,
          start: "top 30%",
          endTrigger: cards[cards.length - 1] as Element,
          end: "bottom 60%",
          scrub: true,
          // markers: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]); // Add isMobile as a dependency to re-run when screen size changes

  return (
    <section className="px-4 py-8 overflow-hidden">
      <h2
        id="services-title"
        className="text-[clamp(24px,2vw,60px)] font-semibold mb-4 lg:mb-6 relative"
      >
        Services
      </h2>

      <div className="cards flex flex-col lg:gap-2 mb-16 lg:mb-56">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
  index: number;
};

function ServiceCard({
  title,
  description,
  keywords,
  imageUrl,
  index,
}: ServiceCardProps) {
  return (
    <div className="card relative pb-4" id={`card-${index}`}>
      <div className="card-inner relative will-change-transform w-full h-full p-6 lg:p-8 rounded-xl lg:rounded-2xl">
        <div className="flex flex-row justify-between mb-8 lg:mb-12">
          <h3 className="text-[clamp(48px,7vw,128px)] font-semibold tracking-tight leading-none">
            {title}
          </h3>

          <p className="text-lg lg:text-[clamp(48px,7vw,128px)] mt-2 lg:mt-0 font-semibold tracking-wider lg:tracking-normal leading-none">
            (0{index + 1})
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full">
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-6/12">
            <p className="text-[clamp(18px,2vw,28px)] font-semibold leading-tight">
              {description}
            </p>

            <ul className="flex flex-wrap gap-2 w-full lg:w-10/12">
              {keywords.map((keyword, index) => (
                <li
                  key={index}
                  className="text-[clamp(14px,1.2vw,24px)] px-4 py-1.5 rounded-full bg-stone-50/70 font-semibold"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full lg:w-5/12 h-[250px] lg:h-[350px] rounded-lg overflow-hidden mb-4 lg:mb-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-center pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
