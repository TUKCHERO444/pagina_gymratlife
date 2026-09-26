import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap() {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [{ url: `${site.url}${site.logo}` }],
    },
  ]
}