import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.edoindigenousforumfct.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/about`, priority: 0.8 },
    { url: `${siteUrl}/events`, priority: 0.8 },
    { url: `${siteUrl}/members`, priority: 0.7 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
  ];
}