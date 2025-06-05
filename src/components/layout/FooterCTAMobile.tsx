"use client";
import { useContactModalStore } from "@/lib/zustand/stores";

export default function FooterCTAMobile() {
  const toggleModal = useContactModalStore((state) => state.toggleModal);

  return (
    <div className="flex flex-col items-center gap-2 w-full absolute left-1/2 -translate-x-1/2 top-[65%] -translate-y-[65%] lg:hidden">
      <a
        href="mailto:jazminnwong@gmail.com"
        className="flex flex-col items-start pt-6 pb-4 px-4 rounded-lg w-full max-w-[600px] bg-[#F0CCDF] cursor-pointer"
      >
        <p className="text-[#C43670] tracking-tight">Email me</p>

        <p className="text-xl text-stone-100 leading-tight font-semibold">
          jazminnwong@gmail.com
        </p>
      </a>

      <button
        onClick={toggleModal}
        className="p-4 rounded-full w-full max-w-[600px] bg-[#F0CCDF] cursor-pointer"
      >
        <p className="text-2xl tracking-tight font-semibold text-[#C43670]">
          Send me a message
        </p>
      </button>
    </div>
  );
}
