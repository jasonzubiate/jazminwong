type Service = {
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
};

export const services: Service[] = [
  {
    title: "UGC",
    description:
      "I leverage authentic content created by users to build trust and engagement with your audience, enhancing brand credibility and reach.",
    keywords: [
      "Authenticity",
      "Engagement",
      "Trust",
      "Community Building",
      "Brand Advocacy",
      "Organic Reach",
    ],
    imageUrl: "/images/services/image-1.jpg",
  },
  {
    title: "Photography",
    description:
      "I capture high-quality images that tell your brand's story, evoke emotions, and create a lasting impression on your audience.",
    keywords: [
      "High-Quality Images",
      "Brand Storytelling",
      "Visual Appeal",
      "Emotional Connection",
      "Professional Photography",
      "Creative Direction",
    ],
    imageUrl: "/images/services/image-2.jpg",
  },
  {
    title: "Short-Form Video",
    description:
      "I produce engaging short-form videos that capture attention quickly, convey your message effectively, and drive social media engagement.",
    keywords: [
      "Engaging Content",
      "Quick Attention",
      "Effective Messaging",
      "Social Media Engagement",
      "Video Production",
      "Creative Storytelling",
    ],
    imageUrl: "/images/services/image-3.jpg",
  },
  {
    title: "Content Strategy",
    description:
      "I create social strategies to maximize reach, engagement, and conversions through data-driven insights and creative execution.",
    keywords: [
      "Research & Insights",
      "Purpose, Mission, Vision",
      "Value Propositions",
      "Brand Voice",
      "Verbal Identity",
      "Personality Traits",
    ],
    imageUrl: "/images/services/image-4.jpg",
  },
];
