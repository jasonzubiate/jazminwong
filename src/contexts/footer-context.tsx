"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

interface FooterContextType {
  footerRef: React.RefObject<HTMLElement>;
}

const FooterContext = createContext<FooterContextType | null>(null);

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
};

interface FooterProviderProps {
  children: ReactNode;
}

export const FooterProvider = ({ children }: FooterProviderProps) => {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <FooterContext.Provider
      value={{ footerRef: footerRef as React.RefObject<HTMLElement> }}
    >
      {children}
    </FooterContext.Provider>
  );
};
