import { site } from "@/lib/site"

export const dynamic = "force-static"

export default function manifest() {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#DC2626",
    icons: [
      {
        src: site.logo,
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}