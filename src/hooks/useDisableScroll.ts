import { useEffect } from "react";

export default function useDisableScroll() {
  useEffect(() => {
    // Check if we're in a browser environment (necessary for Next.js)
    if (typeof window === "undefined") {
      return;
    }

    // Save the original style values to restore them later
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    const originalPosition = document.body.style.position;

    // Apply stronger scroll lock
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // Set up timeout to re-enable scrolling
    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.width = "";

      console.log("Scrolling re-enabled"); // Debug log
    }, 3000);

    // Cleanup function in case component unmounts before timeout
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.width = "";

      console.log("Cleanup: scrolling restored"); // Debug log
    };
  }, []);
}
