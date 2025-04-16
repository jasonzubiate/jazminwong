"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/services";
import { playfair_display } from "@/fonts";
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
      y: `-${(cards.length - 1) * 22}vh`,
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
      const isLastCard = index === cards.length - 1;
      const cardInner = (card as Element).querySelector(".card-inner");

      if (!isLastCard) {
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
          y: `-${(cards.length - index) * 17}vh`,
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
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]); // Add isMobile as a dependency to re-run when screen size changes

  return (
    <section className="px-4 pt-20 pb-12 lg:py-24">
      <h2
        id="services-title"
        className="text-lg xl:text-3xl font-semibold mb-8 relative"
      >
        Services
      </h2>

      <div className="cards flex flex-col lg:gap-2">
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
      <div className="card-inner relative will-change-transform w-full h-full p-4 sm:p-6 md:p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
          <div className="card-content col-span-1 md:col-span-8 flex flex-col gap-6 sm:gap-10 md:gap-16 lg:gap-24">
            <h3 className="text-[clamp(56px,6.5vw,96px)] font-semibold tracking-tight leading-none">
              {title}
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-16 max-w-full md:max-w-[90%]">
              <p
                className={`${playfair_display.className} text-xl lg:text-[clamp(14px,1.6vw,24px)] leading-[1.15] font-normal w-full sm:w-3/5`}
              >
                {description}
              </p>

              <div className="flex flex-col w-full sm:w-2/5 mt-4 sm:mt-0">
                {keywords.map((keyword, index) => (
                  <p
                    key={index}
                    className="lg:text-[clamp(11px,0.9vw,16px)] font-normal -mb-0.5"
                  >
                    {keyword}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Image for tablet/desktop (shown on right) */}
          <div className="hidden md:block md:col-span-4 h-full w-full bg-stone-900 rounded-lg overflow-hidden relative pointer-events-none">
            {/* <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-center pointer-events-none"
            /> */}
          </div>
        </div>

        {/* Image for mobile (shown at bottom) */}
        <div className="block md:hidden w-full h-[200px] sm:h-[250px] bg-stone-900 rounded-lg overflow-hidden relative mt-6 pointer-events-none">
          {/* <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center pointer-events-none"
          /> */}
        </div>
      </div>
    </div>
  );
}
