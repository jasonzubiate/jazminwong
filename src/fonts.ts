import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const saans = localFont({
  src: [
    {
      path: "./Saans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Saans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-saans",
});
