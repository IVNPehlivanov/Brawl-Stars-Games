import type { MetadataRoute } from "next";
import { SITE, GAME_META } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...GAME_META.map((g) => ({
      url: `${SITE.url}/${g.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    { url: `${SITE.url}/about-us`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE.url}/privacy-policy`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE.url}/terms-of-service`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
  ];
}
