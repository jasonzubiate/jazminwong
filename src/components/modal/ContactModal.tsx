"use client";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import ContactForm from "../form/ContactForm";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export default function ContactModal() {
  const formRef = useRef<HTMLElement>(null);
  const isOpen = useContactModalStore((state) => state.isOpen);
  const close = useContactModalStore((state) => state.close);

  useOnClickOutside(isOpen, formRef as React.RefObject<HTMLElement>, close);

  return (
    <>
      <div className="bg-stone-900/50 h-screen w-screen fixed top-0 left-0 inset-0"></div>

      <ContactForm formRef={formRef as React.RefObject<HTMLElement>} />
    </>
  );
}
