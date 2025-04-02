"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/services";
import { playfair_display } from "@/fonts";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Services() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      ScrollTrigger.create({
        trigger: cards[0] as Element,
        start: "top 35%",
        endTrigger: cards[cards.length - 1] as Element,
        end: "bottom 30%",
        pin: "#about",
        pinSpacing: false,
        markers: true,
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = (card as Element).querySelector(".card-inner");

        if (cardInner && !isLastCard) {
          ScrollTrigger.create({
            trigger: card as Element,
            start: "top 35%",
            endTrigger: "#footer",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 14}vh`,
            ease: "none",
            ScrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: "#footer",
              end: "top 65%",
              scrub: true,
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); 
      }
    },

    { scope: containerRef }
  );

  return (
    <section className="px-4 py-24" ref={containerRef}>
      <h2 className="text-3xl font-semibold mb-8">Services</h2>

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
    <div className="card relative rounded-xl" id={`card-${index}`}>
      <div className="card-inner relative will-change-transform w-full h-full grid col-span-12 p-8 ">
        <div className="card-content col-span-8 flex flex-col justify-between">
          <h3 className="text-[96px] font-semibold tracking-tight">{title}</h3>

          <div className="flex gap-16">
            <p
              className={`${playfair_display.className} text-3xl leading-[1.15] tracking-wide font-normal w-3/5`}
            >
              {description}
            </p>

            <div className="flex flex-col w-2/5">
              {keywords.map((keyword, index) => (
                <p key={index} className="text-sm font-normal">
                  {keyword}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="card-image col-span-4 rounded-lg overflow-hidden aspect-[16/9] relative">
          <Image
            src={imageUrl}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
