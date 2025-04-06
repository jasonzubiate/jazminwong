import { ReactLenis } from "lenis/react";
import { metadata } from "@/metadata";
import { saans } from "@/fonts";
import ContactModal from "@/components/modal/ContactModal";
import FixedContactButton from "@/components/button/FixedContactButton";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${saans.className} font-semibold antialiased bg-[#FBC1D5] text-stone-900`}
        >
          {children}
          {/* <ContactModal /> */}
          <FixedContactButton />
        </body>
      </ReactLenis>
    </html>
  );
}
