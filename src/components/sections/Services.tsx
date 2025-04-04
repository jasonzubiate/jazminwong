"use client";

import Image from "next/image";
// import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/services";
import { playfair_display } from "@/fonts";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Services() {
  useGSAP(() => {
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
          end: "top 30%",
          pin: true,
          pinSpacing: false,
          // markers: true,
        });

        gsap.to(cardInner, {
          y: `-${(cards.length - index) * 15}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 30%",
            endTrigger: cards[cards.length - 1] as Element,
            end: "top 30%",
            scrub: true,
            // markers: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  return (
    <section className="px-4 py-24">
      <h2 id="services-title" className="text-3xl font-semibold mb-8">
        Services
      </h2>

      <div className="cards">
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
    <div className="card relative" id={`card-${index + 1}`}>
      <div className="card-inner relative will-change-transform w-full h-full p-8 rounded-xl grid grid-cols-12">
        <div className="card-content col-span-8 flex flex-col gap-24">
          <h3 className="text-[clamp(48px,6.5vw,96px)] font-semibold tracking-tight leading-none">
            {title}
          </h3>

          <div className="flex gap-16 max-w-[90%]">
            <p
              className={`${playfair_display.className} text-[clamp(14px,1.6vw,24px)] leading-[1.15] font-normal w-3/5`}
            >
              {description}
            </p>

            <div className="flex flex-col w-2/5">
              {keywords.map((keyword, index) => (
                <p
                  key={index}
                  className="text-[clamp(11px,0.9vw,16px)] font-normal -mb-0.5"
                >
                  {keyword}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 h-full w-full rounded-lg overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
