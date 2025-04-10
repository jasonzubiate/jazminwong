import { useEffect } from "react";

type TitleOptions = {
  defaultTitle: string;
  onBlurTitle?: string;
};

export default function useDocumentTitle({
  defaultTitle,
  onBlurTitle,
}: TitleOptions) {
  useEffect(() => {
    // Set the default title
    document.title = defaultTitle;

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && onBlurTitle) {
        setTimeout(() => {
          document.title = onBlurTitle;
        }, 2000);
      } else {
        document.title = defaultTitle;
      }
    };

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [defaultTitle, onBlurTitle]);
}
