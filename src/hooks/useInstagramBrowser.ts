import { useEffect, useState } from "react";

export default function YourComponent() {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Instagram")
    ) {
      setIsInstagram(true);
    }
  }, []);

  return isInstagram;
}
