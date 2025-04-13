"use client";
import { useContactModalStore } from "@/lib/zustand/stores";

export default function FooterCTAMobile() {
  const open = useContactModalStore((state) => state.open);

  return (
    <div className="flex flex-col items-center gap-2 w-full absolute left-1/2 -translate-x-1/2 top-[65%] -translate-y-[65%] lg:hidden">
      <a
        href="mailto:hey@jazminwong.com"
        className="flex flex-col items-start p-4 rounded-lg w-full max-w-[600px] bg-[#FBC1D5] cursor-pointer"
      >
        <p className="text-[#4B1C2C] tracking-tight">Email me</p>

        <p className="text-xl text-stone-100 leading-tight font-semibold">
          hey@jazminwong.com
        </p>
      </a>

      <button
        onClick={open}
        className="p-4 rounded-full w-full max-w-[600px] bg-[#FBC1D5] cursor-pointer"
      >
        <p className="text-2xl tracking-tight font-semibold">
          Send me a message
        </p>
      </button>
    </div>
  );
}
