"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import ContactForm from "../form/ContactForm";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { cubicBezier } from "motion";

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
        className={`fixed top-0 left-0 inset-0 bg-stone-900/60 h-screen w-screen ${
          isOpen ? "" : "pointer-events-none"
        }`}
      ></motion.div>

      <motion.div
        initial={{ y: 800 }}
        animate={{ y: isOpen ? 0 : 800 }}
        exit={{ y: 800 }}
        transition={{ duration: 1, ease: easeInOutQuart }}
        className="fixed bottom-4 left-4 right-4 z-998 will-change-transform"
      >
        <ContactForm formRef={formRef as React.RefObject<HTMLElement>} />
      </motion.div>
    </>
  );
}
