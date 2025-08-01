import { type Metadata } from "next";

export default function seo(title: string, description: string): Metadata {
  return {
    title: `ArtHive | ${title}`,
    description,
    generator: "Next.js",
    applicationName: "ArtHive",
    referrer: "origin-when-cross-origin",
    keywords: [
      "traditional art",
      "fine art",
      "oil painting",
      "watercolor painting",
      "acrylic painting",
      "art gallery",
      "handcrafted art",
      "traditional sculpture",
      "original artwork",
      "art exhibition",
      "art portfolio",
      "buy traditional art",
      "art collectors",
      "portrait painting",
      "still life art",
      "realistic art",
      "impressionism",
      "baroque art",
      "renaissance art",
      "modern traditional art",
      "figurative art",
      "art community",
      "artistic network",
      "traditional art creators",
      "local art events",
      "art fairs",
      "art shows",
      "art auctions",
      "art collectors",
    ],
    authors: [
      {
        name: "Slimani Imed Eddine Abderrahmane",
        url: "https://github.com/slimanimeddine",
      },
    ],
    creator: "Slimani Imed Eddine Abderrahmane",
    publisher: "Slimani Imed Eddine Abderrahmane",
  };
}
