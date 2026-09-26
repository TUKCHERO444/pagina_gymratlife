import "./globals.css"
import JsonLd from "@/components/JsonLd"
import { site } from "@/lib/site"

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Gimnasio en ${site.address.locality} - ${site.address.region}`,
    template: `%s | ${site.name} ${site.address.locality}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Gimnasio, fitness y suplementos deportivos",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: `${site.url}/`,
    siteName: site.legalName,
    title: `${site.name} | Gimnasio en ${site.address.locality}`,
    description: site.description,
    images: [
      {
        url: `${site.url}${site.logo}`,
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.legalName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gymratlife__",
    creator: "@gymratlife__",
    title: `${site.name} | Gimnasio en ${site.address.locality}`,
    description: site.description,
    images: [`${site.url}${site.logo}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "PE-LAM",
    "geo.placename": site.address.locality,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
    "dc.coverage": `${site.address.locality}, ${site.address.region}, ${site.address.country}`,
    "format-detection": "telephone=yes",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-PE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}