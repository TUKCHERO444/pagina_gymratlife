# Arquitectura de Landing Page — Referencia para Futuros Proyectos

Plantilla base para construir landing pages SPA con SSR usando Next.js (App Router), React 19 y Tailwind CSS v4.

---

## 1. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI | React | 19.x |
| Estilos | Tailwind CSS (v4, `@theme`) | 4.x |
| Lenguaje | JSX plano (sin TypeScript) | — |
| Rendering | Server Components por defecto | — |
| Mapas | Leaflet + react-leaflet | 5.x |

### Por qué este stack

- **Server Components por defecto**: reduce el bundle JS, mejora SEO y carga inicial. Solo se usa `"use client"` cuando hay interactividad (estado, efectos, eventos).
- **Tailwind v4 con `@theme`**: design tokens como CSS custom properties, sin `tailwind.config.js`. Más limpio, más mantenible.
- **JSX sin TypeScript**: velocidad de desarrollo para landing pages donde no hay lógica compleja de tipos.

---

## 2. Estructura de Directorios

```
project/
├── app/
│   ├── layout.jsx        # Root layout (server). Fonts, metadata, global HTML.
│   ├── page.jsx          # Home page (server). Compone todas las secciones.
│   └── globals.css       # Tailwind v4 + @theme + animaciones custom.
├── components/
│   ├── Header.jsx        # "use client" — scroll listener, mobile menu toggle
│   ├── Hero.jsx          # Server component — compone MediaCarousel
│   ├── MediaCarousel.jsx # "use client" — carrusel auto-play
│   ├── Planes.jsx        # Server — datos estáticos inline
│   ├── Horarios.jsx      # Server — tabla de datos
│   ├── Tienda.jsx        # Server — grid de productos
│   ├── Areas.jsx         # "use client" — modal + estados
│   ├── Ubicacion.jsx     # Server — wrapper de mapa
│   ├── Mapa.jsx          # "use client" — dynamic import de GymMap
│   ├── GymMap.jsx        # "use client" — Leaflet map
│   ├── Footer.jsx        # Server — links, newsletter, redes
│   └── WhatsAppButton.jsx # "use client" — flotante, enlace externo
├── public/
│   ├── imgs/             # Logo y assets estáticos
│   ├── hero/             # Slides del carrusel hero
│   ├── areas/            # Imágenes/videos de áreas del gym
│   └── favicon.svg
├── jsconfig.json         # Path alias @/* → ./*
├── next.config.mjs       # Config Next.js (vacío por defecto)
├── postcss.config.mjs    # PostCSS para Tailwind v4
└── package.json
```

---

## 3. Convenciones de Componentes

### 3.1 Server Components (por defecto)

Todo componente es server component a menos que necesite:

- `useState`, `useEffect`, `useCallback`
- Event handlers (`onClick`, `onScroll`, etc.)
- APIs del navegador (`window`, `document`)

**Ejemplo de componente server:**

```jsx
// components/Planes.jsx — NO lleva "use client"
const planes = [
  { name: "Básico", price: "$29", features: [...] },
  // datos hardcodeados, sin lógica de cliente
]

export default function Planes() {
  return (
    <section id="planes" className="py-24 bg-light">
      {/* JSX con datos estáticos */}
    </section>
  )
}
```

### 3.2 Client Components

Solo los que necesitan interactividad. Siempre al inicio del archivo:

```jsx
"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  // ...
}
```

**Regla**: si un componente server necesita renderizar un client component, lo importa directamente. No se anidan `"use client"` innecesariamente.

### 3.3 Dynamic Imports

Para client components pesados (mapas, carruseles con video), usar `next/dynamic` con `ssr: false`:

```jsx
// app/page.jsx
const Areas = dynamic(() => import("@/components/Areas"))
const Ubicacion = dynamic(() => import("@/components/Ubicacion"))

// components/Mapa.jsx
const GymMap = dynamic(() => import("./GymMap"), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
})
```

**Cuándo usar dynamic:**
- Componentes con dependencias pesadas (Leaflet, Chart.js, etc.)
- Componentes que usan APIs del navegador y no deben ejecutarse en SSR
- Para reducir el bundle de la página inicial

---

## 4. Sistema de Estilos (Tailwind v4)

### 4.1 Design Tokens

Definidos en `globals.css` con la directiva `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Colores primarios */
  --color-primary: #DC2626;
  --color-primary-dark: #B91C1C;
  --color-primary-light: #FCA5A5;

  /* Superficies oscuras */
  --color-dark: #0A0A0A;
  --color-dark-card: #141414;
  --color-dark-surface: #1A1A1A;
  --color-dark-border: #2A2A2A;
  --color-dark-muted: #737373;

  /* Superficies claras */
  --color-light: #FFFFFF;
  --color-light-surface: #F5F5F5;
  --color-light-border: #E5E5E5;
  --color-light-muted: #737373;

  /* Fuentes */
  --font-heading: "Oswald", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

**Uso en Tailwind:** `bg-primary`, `text-dark-card`, `border-dark-border`, `font-heading`, `font-body`.

### 4.2 Fuentes

Cargadas via Google Fonts `<link>` en `layout.jsx`:

```jsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</head>
```

- **Oswald**: títulos, headings, números grandes (`font-heading`)
- **Inter**: cuerpo de texto, descripciones (`font-body`)

### 4.3 Base Global

```css
@layer base {
  html { scroll-behavior: smooth; scroll-padding-top: 80px; }
  body { font-family: var(--font-body); background: var(--color-dark); color: var(--color-accent); }
  ::selection { background: var(--color-primary); color: white; }
}
```

---

## 5. Patrones de Layout

### 5.1 Root Layout (`layout.jsx`)

Server component que envuelve toda la app.Responsabilidades:

- Cargar fuentes globales
- Definir `<html lang="es">`
- Exportar `metadata` (SEO)
- Renderizar `{children}`

```jsx
export const metadata = {
  title: "GymRatLife | Tu Gimnasio, Tu Estilo de Vida",
  description: "...",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>/* fonts */</head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

### 5.2 Page Composition (`page.jsx`)

Server component que ensambla las secciones. Patrón:

```jsx
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"

const Planes = dynamic(() => import("@/components/Planes"))

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Planes />
        <Horarios />
        <Tienda />
        <Areas />
        <Ubicacion />
      </main>
      <Footer />
    </>
  )
}
```

**Orden de secciones (estándar landing page):**

1. **Header** — navegación fija con scroll effect
2. **Hero** — propuesta de valor + CTA + media
3. **Planes/Precios** —社会proof + pricing cards
4. **Horarios/Info** — datos relevantes
5. **Tienda/Productos** — grid de cards
6. **Áreas/Servicios** — galería con modal
7. **Ubicación/Mapa** — mapa + info de contacto
8. **Footer** — links, redes, newsletter
9. **Floating elements** — WhatsApp, scroll-to-top

### 5.3 Path Alias

Configurado en `jsconfig.json`:

```json
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
```

Uso: `@/components/Header` en lugar de `../components/Header`.

---

## 6. Patrones de Interactividad

### 6.1 Scroll Effect (Header)

```jsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener("scroll", onScroll, { passive: true })
  return () => window.removeEventListener("scroll", onScroll)
}, [])
```

Clases condicionales para transición:

```jsx
className={`fixed top-0 transition-all duration-300 ${
  scrolled ? "bg-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
}`}
```

### 6.2 Carrusel Auto-Play

- Intervalo con `setInterval` + cleanup en `useEffect`
- Pausa en hover/focus (`onMouseEnter`/`onMouseLeave`)
- Indicadores (dots) con `role="tablist"` para accesibilidad
- Fallback a placeholder si la imagen no carga

### 6.3 Modal con Teclado

```jsx
useEffect(() => {
  document.addEventListener("keydown", handleEscape)
  document.body.style.overflow = "hidden"
  return () => {
    document.removeEventListener("keydown", handleEscape)
    document.body.style.overflow = ""
  }
}, [])
```

### 6.4 Imágenes con Fallback

Patrón para manejar imágenes que pueden no existir:

```jsx
const [invalid, setInvalid] = useState(false)

if (invalid) return <Placeholder />

return <img src={...} onError={() => setInvalid(true)} />
```

---

## 7. Responsive Design

### 7.1 Breakpoints de Tailwind

| Prefix | Min-width | Uso típico |
|--------|-----------|------------|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |

### 7.2 Patrones Comunes

**Grid responsive:**
```jsx
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

**Texto escalable:**
```jsx
text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
```

**Container con padding:**
```jsx
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

**Mobile menu toggle:**
```jsx
<button className="lg:hidden">/* hamburger */</button>
<nav className="hidden lg:flex">/* desktop nav */</nav>
```

**Scroll horizontal en tablas anchas:**
```jsx
<div className="overflow-x-auto">
  <div className="min-w-[640px]">/* tabla */</div>
</div>
```

---

## 8. Accesibilidad

- `aria-label` en botones y enlaces iconográficos
- `aria-expanded` en toggle de menú mobile
- `aria-modal="true"` y `role="dialog"` en modales
- `role="tablist"` y `aria-selected` en indicadores de carrusel
- `aria-hidden` en slides inactivos
- Tecla Escape para cerrar modales
- `lang="es"` en `<html>`

---

## 9. Performance

| Patrón | Beneficio |
|--------|-----------|
| Server Components por defecto | Menor bundle JS, SSR nativo |
| `next/dynamic` con `ssr: false` | Code splitting de client components pesados |
| `loading` en dynamic imports | UI de carga durante hydratación |
| Imágenes con `loading="lazy"` | Carga diferida fuera de viewport |
| `passive: true` en scroll listeners | No bloquea scroll |
| CSS containment implícito | Tailwind genera CSS mínimo por uso |

---

## 10. Checklist para Nueva Landing Page

### Pre-desarrollo

- [ ] Definir secciones de la página (Hero, Features, Pricing, Contact, Footer)
- [ ] Elegir paleta de colores y fuentes
- [ ] Preparar assets (logo, imágenes, iconos)

### Setup del proyecto

```bash
npx create-next-app@latest my-landing --app --tailwind --eslint=false
cd my-landing
```

- Configurar `jsconfig.json` con path alias `@/*`
- Definir design tokens en `globals.css` con `@theme`
- Cargar fuentes en `layout.jsx`
- Definir `metadata` en `layout.jsx`

### Desarrollo

- [ ] Crear `page.jsx` componiendo secciones
- [ ] Desarrollar cada sección como componente separado
- [ ] Marcar `"use client"` solo donde sea necesario
- [ ] Usar `next/dynamic` para componentes pesados
- [ ] Implementar responsive con breakpoints de Tailwind
- [ ] Agregar accesibilidad (aria labels, roles, teclado)

### Post-desarrollo

- [ ] Probar `npm run build` — no debe haber errores
- [ ] Verificar performance en Lighthouse
- [ ] Revisar en dispositivos reales (mobile, tablet, desktop)
- [ ] Agregar SEO: metadata, Open Graph, favicon

---

## 11. Comandos

```bash
npm run dev      # Desarrollo local (localhost:3000)
npm run build    # Build de producción
npm run start    # Servir build de producción
```

---

## 12. Notas de Migración

Si el proyecto viene de Vite/React:

- Eliminar `vite.config.js`, `index.html` raíz, `dist/`
- Migrar `src/` a `app/` (App Router)
- Reemplazar `react-router` por enlaces `<a href="#seccion">`
- Configurar Tailwind v4 (sin `tailwind.config.js`)
- El `README.md` puede estar desactualizado — verificar
