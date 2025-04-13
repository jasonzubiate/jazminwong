"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import ContactForm from "../form/ContactForm";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { cubicBezier } from "motion";
import { IconX } from "@tabler/icons-react";

export default function ContactModal() {
  const formRef = useRef<HTMLElement>(null);
  const isOpen = useContactModalStore((state) => state.isOpen);
  const close = useContactModalStore((state) => state.close);
  const easeInOutQuart = cubicBezier(0.76, 0, 0.24, 1);

  useOnClickOutside(isOpen, formRef as React.RefObject<HTMLElement>, close);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 inset-0 bg-stone-900/60 h-[100dvh] w-screen ${
          isOpen ? "" : "pointer-events-none"
        }`}
      ></motion.div>

      <motion.div
        initial={{ y: 800 }}
        animate={{ y: isOpen ? 0 : 800 }}
        exit={{ y: 800 }}
        transition={{ duration: 1, ease: easeInOutQuart }}
        className="fixed max-h-[95dvh] p-6 lg:p-8 bg-stone-100 rounded-2xl lg:rounded-xl w-[95vw] lg:w-auto lg:h-auto lg:bottom-4 top-[2.5vh] lg:left-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:top-auto lg:right-4 z-998 will-change-transform overflow-y-auto"
      >
        <button
          onClick={close}
          className="fixed top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-[#FBC1D5] z-999"
        >
          <IconX className="w-5 h-5 text-stene-900" stroke={3} />
        </button>
        
        <div className="h-full overflow-y-auto lg:pb-24">
          <ContactForm formRef={formRef as React.RefObject<HTMLElement>} />
        </div>
      </motion.div>
    </>
  );
}
