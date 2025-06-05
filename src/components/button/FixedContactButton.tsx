"use client";

import { motion, useInView } from "motion/react";
import { IconMail, IconSend2 } from "@tabler/icons-react";
import Image from "next/image";
import { useContactModalStore } from "@/lib/zustand/stores";
import useWindowSize from "@/hooks/useWindowSize";
import { useRef, useState, useEffect } from "react";
import { useFooter } from "@/contexts/footer-context";
import { ContactFormRef } from "@/components/form/ContactForm";

interface FixedContactButtonProps {
  formRef: React.RefObject<ContactFormRef>;
}

export default function FixedContactButton({
  formRef,
}: FixedContactButtonProps) {
  const isModalOpen = useContactModalStore((state) => state.isModalOpen);
  const toggleModal = useContactModalStore((state) => state.toggleModal);

  const { width } = useWindowSize();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { footerRef } = useFooter();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const isFooterInView = useInView(footerRef, { amount: 0.2 });

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 3000);
  }, []);

  const handleClick = () => {
    if (isModalOpen && formRef.current) {
      formRef.current.submit();
    } else {
      toggleModal();
    }
  };

  return (
    <motion.button
      initial={{ y: 200, scale: 0.8 }}
      animate={
        isFooterInView && !isModalOpen
          ? { y: 200, scale: 0.8 }
          : { y: 0, scale: 1 }
      }
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: isInitialLoad ? 3 : 0,
      }}
      onClick={handleClick}
      ref={buttonRef}
      className={`${
        isModalOpen ? "bg-[#C43670]" : "bg-[#F0CCDF]"
      } flex items-center gap-2 xl:gap-3 fixed bottom-8 left-1/2 -translate-x-1/2 pl-1 py-1 pr-4 xl:pr-6 rounded-full shadow-2xl cursor-pointer group z-999 transition-colors duration-700 delay-100 ease-in-out`}
    >
      <div className="h-12 xl:h-16 w-12 xl:w-16 relative rounded-full">
        <div
          className={`${
            isModalOpen ? "opacity-0" : ""
          } w-full h-full rounded-full overflow-hidden relative group-hover:opacity-0 group-hover:scale-70 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <Image
            src="/images/about/image-4.jpg"
            alt="logo"
            fill
            className="w-full h-auto object-cover object-center"
          />
        </div>

        <span
          className={`${
            isModalOpen ? "opacity-0" : ""
          } flex items-center justify-center h-12 xl:h-16 w-12 xl:w-16 bg-stone-100 rounded-full scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <IconMail
            className="text-[#C43670]"
            stroke={2.5}
            size={width < 728 ? 20 : 30}
          />
        </span>

        <span
          className={`${
            isModalOpen ? "scale-100 opacity-100" : "scale-70 opacity-0"
          } h-12 xl:h-16 w-12 xl:w-16 bg-stone-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-end transition-all duration-200 delay-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <div className="flex transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:translate-x-1/2">
            <div className="flex items-center justify-center w-12 xl:w-16">
              <IconSend2
                className="text-[#C43670] text-2xl xl:text-5xl"
                stroke={2.5}
                size={width < 728 ? 20 : 30}
              />
            </div>
            <div className="flex items-center justify-center w-12 xl:w-16">
              <IconSend2
                className="text-[#C43670] text-2xl xl:text-5xl"
                stroke={2.5}
                size={width < 728 ? 20 : 30}
              />
            </div>
          </div>
        </span>
      </div>

      <div
        className={`${
          isModalOpen ? "text-[#F0CCDF]" : "text-[#C43670]"
        } overflow-hidden h-7 lg:h-9`}
      >
        <div className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:-translate-y-1/2">
          <span className="text-xl lg:text-3xl font-semibold">
            {isModalOpen ? "Submit" : "Contact"}
          </span>
          <span className="text-xl lg:text-3xl font-semibold">
            {isModalOpen ? "Submit" : "Contact"}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
