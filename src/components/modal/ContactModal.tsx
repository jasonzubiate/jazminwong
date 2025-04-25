"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import ContactForm, { ContactFormRef } from "../form/ContactForm";
import { cubicBezier } from "motion";
import { IconX } from "@tabler/icons-react";
import FixedContactButton from "../button/FixedContactButton";

export default function ContactModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<ContactFormRef>(null);
  const isModalOpen = useContactModalStore((state) => state.isModalOpen);
  const toggleModal = useContactModalStore((state) => state.toggleModal);
  const easeInOutQuart = cubicBezier(0.76, 0, 0.24, 1);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 inset-0 bg-stone-900/60 h-[100dvh] w-screen ${
          isModalOpen ? "" : "pointer-events-none"
        }`}
      ></motion.div>

      <motion.div
        initial={{ y: 800 }}
        animate={isModalOpen ? { y: 0 } : { y: 900 }}
        transition={{ duration: 1, ease: easeInOutQuart }}
        ref={modalRef as React.RefObject<HTMLDivElement>}
        className="fixed max-h-[95dvh] p-6 lg:p-8 bg-stone-100 rounded-2xl lg:rounded-xl w-[95vw] lg:w-auto lg:h-auto lg:bottom-4 top-[2.5vh] lg:left-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:top-auto lg:right-4 z-998 will-change-transform overflow-y-auto"
      >
        <button
          onClick={toggleModal}
          className="fixed top-6 right-6 w-10 lg:w-12 h-10 lg:h-12 rounded-full flex items-center justify-center bg-[#FBC1D5] z-999 cursor-pointer hover:scale-110 transition-all duration-150 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]"
        >
          <IconX className="w-5 h-5 lg:w-6 lg:h-6 text-stene-900" stroke={3} />
        </button>

        <div className="h-full overflow-y-auto pb-20 lg:pb-24">
          <ContactForm ref={formRef} />
        </div>
      </motion.div>
      <FixedContactButton
        formRef={formRef as React.RefObject<ContactFormRef>}
      />
    </>
  );
}
