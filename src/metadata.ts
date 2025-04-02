import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jazmin Wong | Creative Content Strategist",
  description:
    "Jazzi is a creative content strategist with a passion for creating engaging and effective content across digital platforms.",

  // Basic SEO
  keywords: [
    "creative content strategist",
    "digital marketing",
    "content marketing",
    "social media marketing",
    "content creation",
    "research",
    "strategic planning",
    "brand voice",
    "content strategy",
    "digital content",
    "social media strategy",
  ], // Add your keywords here
  authors: [{ name: "Jazmin Wong", url: "https://www.jazminwong.com" }],
  creator: "Jazmin Wong",
  publisher: "Jazmin Wong",

  // Open Graph
  openGraph: {
    title: "Creative Content Strategist",
    description:
      "Jazzi is a creative content strategist with a passion for creating engaging and effective content across digital platforms.",
    url: "https://www.jazminwong.com",
    siteName: "jazminwong.com",
    images: [
      {
        url: "https://www.jazminwong.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jazmin Wong - Creative Content Strategist",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Jazmin Wong | Creative Content Strategist",
    description:
      "Jazzi is a creative content strategist with a passion for creating engaging and effective content across digital platforms.",
    creator: "@jazminwong",
    images: ["https://www.jazminwong.com/images/twitter-card.jpg"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://www.jazminwong.com",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // Verification
  verification: {
    google: "google-site-verification-code-123456",
    yandex: "yandex-verification-code-123456",
    yahoo: "yahoo-verification-code-123456",
    other: {
      me: ["https://linkedin.com/in/jazminwong"],
    },
  },

  // App links
  appleWebApp: {
    title: "Jazmin Wong Portfolio",
    statusBarStyle: "default",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Other
  category: "Portfolio",
  colorScheme: "light dark",
  themeColor: "#FBC1D5",
};
