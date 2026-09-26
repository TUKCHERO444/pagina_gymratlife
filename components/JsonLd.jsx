import { site } from "@/lib/site"

function exerciseGym() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${site.url}/#gym`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    priceRange: "S/ 8 - S/ 145",
    image: `${site.url}${site.logo}`,
    logo: `${site.url}${site.logo}`,
    foundingDate: `${site.foundingYear}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.instagram],
    makesOffer: site.plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      url: site.whatsappLink,
    })),
  }
}

function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.legalName,
    description: site.description,
    inLanguage: "es-PE",
    publisher: { "@id": `${site.url}/#gym` },
  }
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseGym()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite()) }}
      />
    </>
  )
}