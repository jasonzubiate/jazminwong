"use client";
import { Engine, RenderClones, Walls, Circle } from "react-matter-js";

export default function PhysicsContactButtons({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const width = containerRef.current?.clientWidth;
  const height = containerRef.current?.clientHeight;
  const circleCount = 10;
  const circleSize = height * 0.1;

  const renderCircles = () => {
    return [...Array(circleCount).keys()].map((num) => (
      <Circle key={num} clone x={300} y={100} radius={circleSize} />
    ));
  };

  return (
    <>
      <Engine options={{}}>
        <RenderClones
          enableMouse
          options={{
            width,
            height,
            background: "transparent",
            wireframes: false,
          }}
        >
          {renderCircles()}
          <Walls x={0} y={0} width={width} height={height} wallWidth={1} />
          {renderCircles()}
        </RenderClones>
      </Engine>
      {/* <button className="matter-buttonpx-16 py-8 rounded-full bg-[#FBC1D5] absolute bottom-0 left-0 cursor-pointer">
        <p className="text-[clamp(24px,6vw,96px)] tracking-tight ">
          Send me a message
        </p>
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText("hey@jazminwong.com");
        }}
        className="matter-button flex flex-col items-start gap-4 px-8 py-6 rounded-xl bg-[#FBC1D5] absolute right-0 top-0"
      >
        <p className="text-[clamp(16px,3vw,32px)] text-[#4B1C2C] tracking-tight">
          Email me
        </p>

        <p className="text-[clamp(24px,4vw,48px)] text-stone-100 leading-none">
          hey@jazminwong.com
        </p>
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText("6263247748");
        }}
        className="matter-buttonflex flex-col items-start gap-4 px-8 py-6 rounded-xl bg-[#FBC1D5] absolute right-0 bottom-0"
      >
        <p className="text-[clamp(16px,3vw,32px)] text-[#4B1C2C] tracking-tight">
          Call me
        </p>

        <p className="text-[clamp(24px,4vw,48px)] text-stone-100 leading-none">
          +16263247748
        </p>
      </button> */}
    </>
  );
}
