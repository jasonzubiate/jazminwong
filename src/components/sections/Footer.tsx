"use client";

import LiveClock from "../ui/LiveClock";
import FooterCTAMobile from "../layout/FooterCTAMobile";
import DesktopSocials from "../layout/DesktopSocials";
import { useRef } from "react";
import PhysicsContactButtons from "../layout/PhysicsContactButtons";
import useWindowSize from "@/hooks/useWindowSize";

export default function Footer() {
  const matterContainer = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  return (
    <section id="footer" className="p-4">
      <footer className="flex flex-col justify-between gap-8 p-4 md:px-8 pt-8 pb-6 rounded-xl bg-stone-100 h-[600px] lg:h-[clamp(700px,95vh,900px)]">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-[clamp(16px,1.6vw,24px)]">
            Los Angeles, CA
          </p>

          <LiveClock />
        </div>

        <div ref={matterContainer} className="h-full relative overflow-hidden">
          <h2 className="text-[clamp(50px,6vw,72px)] font-semibold text-center tracking-tight leading-[0.85] top-12 lg:top-0 left-1/2 -translate-x-1/2 absolute w-full">
            Let&apos;s work{" "}
            <span className="text-[#FBC1D5] z-50">together!</span>
          </h2>

          {width > 768 && (
            <PhysicsContactButtons
              containerRef={matterContainer as React.RefObject<HTMLDivElement>}
            />
          )}

          <FooterCTAMobile />
        </div>

        {/* Mobile */}
        <div className="flex items-end justify-between md:hidden">
          <ul className="flex flex-col gap-1 w-full">
            <li>
              <a href="https://www.instagram.com/jazziwong_/">
                <p className="font-semibold">Instagram</p>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jazziwong_/">
                <p className="font-semibold">YouTube</p>
              </a>
            </li>
          </ul>

          <p className="font-semibold w-full text-center">©2025</p>

          <ul className="flex flex-col items-end gap-1 w-full">
            <li>
              <a href="https://www.instagram.com/jazziwong_/">
                <p className="font-semibold">Unsplash</p>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jazziwong_/">
                <p className="font-semibold">TikTok</p>
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop */}
        <DesktopSocials />
      </footer>
    </section>
  );
}
