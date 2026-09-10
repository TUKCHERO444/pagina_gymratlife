import "./globals.css"

export const metadata = {
  title: "GymRatLife | Tu Gimnasio, Tu Estilo de Vida",
  description:
    "Entrena con los mejores equipamientos y profesionales. Planes flexibles, horarios amplios y una comunidad que te impulsa a superarte.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
