import LiveClock from "../ui/LiveClock";

export default function Footer() {
  return (
    <section id="footer" className="p-4">
      <footer className="flex flex-col justify-between gap-8 p-8 rounded-xl bg-stone-100 h-[800px]">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-xl">Los Angeles, CA</p>

          <LiveClock />
        </div>

        <div className="h-full relative">
          <h2 className="text-[64px] font-semibold text-center leading-[0.85] top-6 left-1/2 -translate-x-1/2 absolute">
            Let&apos;s work{" "}
            <span className="text-[#FBC1D5] z-50">together!</span>
          </h2>

          <div className="flex flex-col gap-2 lg:hidden">
            
          </div>

          {/* <PhysicsContactButtons
            containerRef={matterContainer as React.RefObject<HTMLDivElement>}
          /> */}
        </div>

        <ul className="flex justify-between w-full">
          <li>
            <p className="font-semibold text-xl">©2025</p>
          </li>
          <li>
            <a href="https://www.instagram.com/jazziwong_/">
              <p className="font-semibold text-xl">Instagram</p>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jazziwong_/">
              <p className="font-semibold text-xl">YouTube</p>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jazziwong_/">
              <p className="font-semibold text-xl">Unsplash</p>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jazziwong_/">
              <p className="font-semibold text-xl">TikTok</p>
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}
