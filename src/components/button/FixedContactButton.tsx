"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { IconMail, IconSend2 } from "@tabler/icons-react";
import { useRef } from "react";
import Image from "next/image";
import { useContactModalStore } from "@/lib/zustand/stores";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(CustomEase);

export default function FixedContactButton() {
  const isOpen = useContactModalStore((state) => state.isOpen);
  const open = useContactModalStore((state) => state.open);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // const ease = CustomEase.create("custom", "0.64,0.57,0.67,1.53");

  useGSAP(() => {
    gsap.to(buttonRef.current, {
      y: 10,
      scale: 0.7,
      opacity: 0,
      duration: 0.5,
      // ease: "custom",
      scrollTrigger: {
        trigger: "#footer",
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={() => !isOpen && open()}
      className={`${
        isOpen ? "bg-[#FBC1D5]" : "bg-stone-100"
      } flex items-center gap-3 fixed bottom-8 left-1/2 -translate-x-1/2 pl-1 py-1 pr-6 rounded-full cursor-pointer group z-999 transition-colors duration-700 delay-100 ease-in-out`}
    >
      <div className="h-12 w-12 relative rounded-full">
        <div
          className={`${
            isOpen ? "opacity-0" : ""
          } w-full h-full rounded-full overflow-hidden relative group-hover:opacity-0 group-hover:scale-70 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <Image
            src="https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhlYWRzaG90fGVufDB8fDB8fHww"
            alt="logo"
            fill
            className="w-full h-auto object-cover object-center"
          />
        </div>

        <span
          className={`${
            isOpen ? "opacity-0" : ""
          } flex items-center justify-center h-12 w-12 bg-[#FBC1D5] rounded-full scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <IconMail className="text-stone-900" size={28} stroke={2.5} />
        </span>

        <span
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-70 opacity-0"
          } h-12 w-12 bg-stone-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-end transition-all duration-200 delay-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <div className="flex transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:translate-x-1/2">
            <div className="flex items-center justify-center w-12">
              <IconSend2 className="text-stone-900" size={28} stroke={2.5} />
            </div>
            <div className="flex items-center justify-center w-12">
              <IconSend2 className="text-stone-900" size={28} stroke={2.5} />
            </div>
          </div>
        </span>
      </div>

      <div className="overflow-hidden h-8">
        <div className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:-translate-y-1/2">
          <span className="text-2xl font-semibold">
            {isOpen ? "Submit" : "Contact"}
          </span>
          <span className="text-2xl font-semibold">
            {isOpen ? "Submit" : "Contact"}
          </span>
        </div>
      </div>
    </button>
  );
}
