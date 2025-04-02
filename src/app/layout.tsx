import { ReactLenis } from "lenis/react";
import { metadata } from "@/metadata";
import { saans } from "@/fonts";
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
        </body>
      </ReactLenis>
    </html>
  );
}
