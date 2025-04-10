"use client";

import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function DocumentTitleChanger() {
  useDocumentTitle({
    defaultTitle: "Jazmin Wong | Creative Content Strategist",
    onBlurTitle: "Wait, come back 😔",
  });

  // This component doesn't render anything
  return null;
}
