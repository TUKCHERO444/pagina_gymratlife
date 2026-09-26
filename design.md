# GymRatLife — Design System Documentation

## Overview

GymRatLife is a gym/fitness website for a physical location in Chiclayo, Perú. The design follows a **dark-first, high-contrast aesthetic** with a bold red primary accent, built on Next.js 15 (App Router) + React 19 + Tailwind CSS v4. The visual language communicates strength, energy, and community — fitting for a serious training facility.

---

## Color System

### Design Tokens (CSS Custom Properties in `@theme`)

```css
/* Primary Brand — Red family */
--color-primary:       #DC2626;  /* Red-600 — main CTA, highlights, borders */
--color-primary-dark:  #B91C1C;  /* Red-700 — hover states, pressed */
--color-primary-light: #FCA5A5;  /* Red-300 — subtle fills, disabled */

/* Dark Theme (default) */
--color-dark:          #0A0A0A;  /* Near-black base background */
--color-dark-card:     #141414;  /* Card/panel surfaces */
--color-dark-surface:  #1A1A1A;  /* Elevated surfaces, inputs */
--color-dark-border:   #2A2A2A;  /* Borders, dividers */
--color-dark-muted:    #737373;  /* Muted text, placeholders */

/* Light Theme (alternating sections) */
--color-light:         #FFFFFF;  /* Pure white section backgrounds */
--color-light-surface: #F5F5F5;  /* Card backgrounds in light sections */
--color-light-border:  #E5E5E5;  /* Borders in light sections */
--color-light-muted:   #737373;  /* Muted text in light sections */

/* Accent */
--color-accent:        #FFFFFF;  /* Primary text on dark */

/* External brand colors */
--color-whatsapp:      #25D366;  /* WhatsApp FAB */
--color-whatsapp-hover:#1DA851;
```

### Theme Application

| Section | Background | Text | Cards | Borders |
|---------|------------|------|-------|---------|
| Hero, Horarios, Areas, Footer | `dark` (#0A0A0A) | `accent` (white) | `dark-card` | `dark-border` |
| Planes, Tienda, Ubicacion | `light` (white) | `dark` (#0A0A0A) | `light-surface`/`white` | `light-border` |
| Gradients between sections | `dark→light` / `light→dark` radial | — | — | — |

**Pattern**: Sections alternate dark/light with smooth radial gradient dividers (`SectionGradient`), creating visual rhythm and breathing room.

---

## Typography

### Font Families

| Role | Font | Weights | Source |
|------|------|---------|--------|
| **Heading** | `Oswald` | 400, 500, 600, 700 | Google Fonts |
| **Body** | `Inter` | 400, 500, 600, 700 | Google Fonts |

Loaded via `<link rel="preconnect">` + `fonts.googleapis.com/css2` in `layout.jsx`.

### Type Scale

| Element | Size (mobile → desktop) | Weight | Font | Color |
|---------|------------------------|--------|------|-------|
| Hero H1 | `text-5xl` → `text-8xl` | 700 | Oswald | white / primary |
| Section H2 | `text-4xl` → `text-5xl` | 700 | Oswald | white / dark |
| Section label | `text-sm` | 600 | Oswald | primary |
| Card titles | `text-xl` → `text-2xl` | 700 | Oswald | context-aware |
| Body copy | `text-lg` → `text-base` | 400/500 | Inter | muted variants |
| Prices | `text-5xl` | 700 | Oswald | dark/white |
| Buttons | `text-lg` / `text-sm` | 600/700 | Inter | context-aware |
| Metadata (tags, labels) | `text-xs` / `text-sm` | 500/600 | Inter | muted |

### Stylistic Details

- **Tracking**: Headings use `tracking-tight`; labels use `tracking-widest` + `uppercase`
- **Leading**: Hero H1 uses `leading-[0.9]` for compact stacking
- **Selection**: `::selection` uses primary red background

---

## Spacing & Layout

### Container

```css
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  /* 1280px max, responsive padding */
```

### Section Padding

- `py-24` (mobile) → `py-32` (desktop) = 96px → 128px vertical rhythm
- Consistent across all major sections

### Grid Systems

| Section | Columns | Gap |
|---------|---------|-----|
| Hero | 1 col mobile → 2 col lg | `gap-12` → `gap-16` |
| Planes | 1 → 2 → 3 | `gap-6` → `gap-8` |
| Tienda | 1 → 2 → 3 | `gap-6` |
| Areas | 1 → 2 → 3 | `gap-8` |
| Horarios table | Fixed 5-col grid | `min-w-[640px]` horizontal scroll |
| Footer | 1 → 4 | `gap-12` |

### Border Radius Scale

| Size | Value | Usage |
|------|-------|-------|
| `rounded-full` | 9999px | Pills, badges, avatar, WhatsApp FAB |
| `rounded-xl` | 12px | Buttons, cards (Hero CTAs) |
| `rounded-2xl` | 16px | Section cards, modals, media containers |
| `rounded-lg` | 8px | Nav links, inputs, social icons |

---

## Component Patterns

### 1. Header (`Header.jsx`) — Client Component

**States**: Transparent → scrolled (backdrop blur + shadow + border)

```jsx
// Scrolled state
bg-dark/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-dark-border

// Transparent state
bg-transparent
```

**Logo**: Image + text lockup
- `GYM` (white) + `RAT` (primary) + `LIFE` (white)
- Font: Oswald, bold, tracking-wider

**Navigation**:
- Desktop: Horizontal, hover `bg-white/5`, rounded-lg
- CTA: `bg-primary` → `bg-primary-dark`, rounded-lg
- Mobile: Slide-down panel, same styling

### 2. Hero (`Hero.jsx`)

**Structure**: Two-column (text left, media right on lg+)

**Left Column**:
- Live badge: `bg-primary/10 border-primary/20` with pulse dot
- H1: Massive Oswald, line-broken "GYM / RAT / LIFE"
- Logo image inline with H1
- Description: `text-gray-400 text-lg`
- Dual CTAs:
  - Primary: `bg-primary hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25`
  - Secondary: `border-dark-border hover:border-gray-500`
- Stats bar: 3 items, Oswald numbers + muted labels

**Right Column**:
- `MediaCarousel` in `aspect-[4/5]` container
- Decorative accents: `bg-primary/10` and `border-primary/20` rounded-2xl behind

**Scroll Indicator**: Bouncing chevron, `text-gray-600`

### 3. Section Gradient Dividers (`SectionGradient.jsx`)

```css
.section-gradient::after {
  background: radial-gradient(
    ellipse at center,
    rgba(220, 38, 38, 0.1),
    transparent 65%
  );
}
```

Two variants: `dark-to-light` and `light-to-dark`. Height: `h-12 sm:h-16`.

### 4. Planes (`Planes.jsx`) — Pricing Cards

**Card Base**: `rounded-2xl p-8 transition-all duration-300`

**Popular Variant**:
- `bg-white border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]`
- Badge: `absolute -top-4 bg-primary text-white px-4 py-1 rounded-full`

**Regular Variant**:
- `bg-white border border-light-border hover:border-gray-300`

**Content**:
- Name (Oswald 2xl), description (muted), price (Oswald 5xl)
- Feature list: Checkmark SVG + text, primary checks on popular
- CTA: Popular = `bg-primary`; Regular = `bg-dark`

### 5. Horarios (`Horarios.jsx`) — Data Table

**Container**: `bg-dark-card rounded-2xl border border-dark-border overflow-x-auto`

**Header**: `bg-primary/10`, Oswald uppercase labels

**Rows**: `hover:bg-white/[0.02]`, alternating accent colors for opening times

**Cell Component**: Centers content, `font-heading`, accent times in primary

### 6. Tienda (`Tienda.jsx`) — Product Cards

**Card**: `group bg-white rounded-2xl border border-light-border overflow-hidden hover:border-primary/30 hover:shadow-lg`

**Image**: `aspect-[4/3]`, `group-hover:scale-105`, subtle `bg-gradient-to-br from-primary/5`

**Content**:
- Category badge (primary, uppercase, tracking-wider)
- Title (Oswald xl), description (muted)
- Price (Oswald 2xl) + "Agregar" button (dark → primary on hover)

**Special**: "Fármacos" card centered on lg via `lg:col-start-2`

### 7. Areas (`Areas.jsx`) — Interactive Media Cards

**Card**: `bg-dark-card rounded-2xl border border-dark-border overflow-hidden group cursor-pointer hover:-translate-y-1 hover:border-primary/40`

**Media**: Video loops (muted, playsInline) with `group-hover:scale-105`
- Gradient overlay: `from-dark/80 via-dark/20 to-transparent`
- Number badge: `bg-primary/90`
- Hover reveal: "Ver más" button with play icon

**Modal** (on click):
- Backdrop: `bg-black/70 backdrop-blur-sm`
- Panel: `bg-dark-card border-dark-border rounded-2xl shadow-2xl animate-modal-in`
- Header: Number badge + title + close
- Media area: 50-55vh, full media with controls
- Details grid: Icon + label + description in `bg-dark-surface` cards
- Tags: `bg-dark-surface border-dark-border rounded-full`

### 8. Ubicacion (`Ubicacion.jsx`) — Map Section

**Container**: `rounded-2xl overflow-hidden border border-light-border bg-white`
**Map**: `aspect-[16/7] min-h-[320px]`, loads `GymMap` (Leaflet/OpenStreetMap) client-side

### 9. Footer (`Footer.jsx`)

**Background**: `bg-dark-card border-t border-dark-border`

**Grid**: 4 columns (Brand, Nav, Legal, Newsletter)

**Brand**: GR monogram (`w-10 h-10 bg-primary rounded-lg`) + logotype
**Social**: `bg-white/5 hover:bg-primary rounded-lg` icons (SVG paths inline)
**Newsletter**: Dark input + primary submit
**Bottom bar**: Copyright + "Hecho con pasion por el fitness"

### 10. WhatsApp FAB (`WhatsAppButton.jsx`)

```jsx
fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1da851]
rounded-full flex items-center justify-center
shadow-lg shadow-black/30 hover:scale-110
```

---

## Animation & Interaction

### Reveal System (`Reveal.jsx`)

IntersectionObserver-based scroll animations with variants:

| Variant | Initial State | Classes |
|---------|--------------|---------|
| `up` | `translateY(20px)` | `.reveal-up` |
| `fade` | `opacity: 0` | (base) |
| `blur` | `blur(8px)` | `.reveal-blur` |
| `scale` | `scale(0.96)` | `.reveal-scale` |

**Config**: `threshold: 0.15`, `rootMargin: "0px 0px -40px 0px"`, staggered via `delay` prop
**Respects**: `prefers-reduced-motion`

### Modal Animation (`globals.css`)

```css
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in { animation: modal-in 0.25s ease-out; }
```

### Hover/Transition Patterns

| Element | Transition |
|---------|------------|
| Buttons | `duration-200` / `duration-300` |
| Cards | `duration-300` transform + border/shadow |
| Media | `duration-500` / `duration-700` scale |
| Nav links | `duration-200` color + bg |
| FAB | `duration-200` scale |

### MediaCarousel (`MediaCarousel.jsx`)

- Auto-advance: 5000ms interval
- Pause on hover/focus
- Cross-fade: `transition-opacity duration-700 ease-in-out`
- Dot indicators: active = `bg-primary w-8`, inactive = `bg-white/30`
- Keyboard accessible (tabindex, role=tab)

---

## Visual Effects & Decorative Elements

### Background Gradients

- Hero: `radial-gradient(ellipse at left, var(--color-primary) 0%, transparent 50%)` at `opacity-5`
- Section dividers: Radial primary glow at center
- Product cards: `from-primary/5 to-transparent` overlay
- Area cards: `from-dark/80 via-dark/20 to-transparent` overlay
- Modal backdrop: `bg-black/70 backdrop-blur-sm`

### Shadows

- Header scrolled: `shadow-lg shadow-black/30`
- Popular plan: `shadow-xl shadow-primary/10`
- Hero primary CTA hover: `hover:shadow-lg hover:shadow-primary/25`
- Modal: `shadow-2xl`
- FAB: `shadow-lg shadow-black/30`
- Product hover: `hover:shadow-lg`

### Borders

- Dark theme: `border-dark-border` (#2A2A2A)
- Light theme: `border-light-border` (#E5E5E5)
- Popular/active: `border-primary` (2px on plans)
- Focus/interaction: `hover:border-primary/30` or `hover:border-gray-300`

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Text sizing, padding, 2-col grids |
| `md` | 768px | 2-col grids (Planes, Areas) |
| `lg` | 1024px | 3-col grids, Hero 2-col, Header desktop nav |
| `xl` | 1280px | Hero max text sizing |

---

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- ARIA: `role="dialog"`, `aria-modal`, `aria-label`, `aria-expanded`, `role="tablist"`
- Focus: Visible focus states via Tailwind (ring not explicitly used but hover/focus transitions present)
- Reduced motion: Respected in Reveal and MediaCarousel
- Images: `alt` text on all content images
- Color contrast: Primary red on white/dark meets WCAG AA for large text

---

## Asset Conventions

### Images

- Hero carousel: `/imgs/*.mp4` (video) or `.jpeg`
- Areas: `/imgs/*.mp4` (video loops) + modal variants
- Tienda: `/imgs/*.jpeg` (product photos)
- Logo: `/imgs/gymrat-life-logo-removebg-preview.png`
- Placeholders: Inline SVG with instructional text

### Video

- Muted, loop, playsInline, preload="metadata"
- Hero: Auto-play carousel with cross-fade
- Areas: Hover scale + click → modal with controls

---

## Dark/Light Section Rhythm

```
Hero (dark)
  ↓ SectionGradient dark→light
Planes (light)
  ↓ SectionGradient light→dark
Horarios (dark)
  ↓ SectionGradient dark→light
Tienda (light)
  ↓ SectionGradient light→dark
Areas (dark)
  ↓ SectionGradient dark→light
Ubicacion (light)
  ↓
Footer (dark-card)
```

This alternating rhythm prevents visual fatigue and creates clear section boundaries.

---

## Brand Voice & Copy Patterns

- **Tone**: Direct, energetic, community-focused
- **Language**: Spanish (es-PE), informal "tú"
- **Key phrases**:
  - "Mas que un gimnasio, somos una comunidad"
  - "Supera tus limites"
  - "Elige tu nivel"
  - "Planifica tu sesion"
  - "Equipo GymRat"
- **CTAs**: "Ver Planes", "Horarios", "Empezar ahora", "Agregar", "Unirme"

---

## Technical Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Fonts | Google Fonts (Oswald + Inter) |
| Maps | Leaflet + OpenStreetMap (react-leaflet) |
| Animations | CSS + IntersectionObserver (custom) |
| Schema.org | JSON-LD (ExerciseGym + WebSite) |
| Deployment | Netlify (implied by URL) |

---

## Future Enhancement Opportunities

1. **Design Tokens Export**: Move `@theme` tokens to a shared JSON for Figma sync
2. **Component Library**: Extract Button, Card, Badge, Input primitives
3. **Dark Mode Toggle**: Currently dark-first; could add user preference
4. **Image Optimization**: Add Next.js Image component for static assets
5. **Animation Library**: Consider Framer Motion for complex sequences
6. **Testing**: Visual regression (Chromatic/Playwright) for design consistency
7. **Analytics**: Add scroll depth, CTA click tracking
8. **Map**: Replace Leaflet placeholder with Google Maps iframe when API key available

---

## File Reference Map

```
app/
  globals.css          # Design tokens, base styles, animations, utilities
  layout.jsx           # Root layout, fonts, metadata, SEO
  page.jsx             # Home composition (all sections)
components/
  Header.jsx           # Navigation, logo, mobile menu (client)
  Hero.jsx             # Hero section, stats, CTAs
  Planes.jsx           # Pricing cards
  Horarios.jsx         # Schedule table
  Tienda.jsx           # Product grid
  Areas.jsx            # Training areas with video modal (client)
  Ubicacion.jsx        # Map section
  Footer.jsx           # Footer, newsletter, social
  SectionGradient.jsx  # Section divider gradients
  Reveal.jsx           # Scroll animation wrapper (client)
  WhatsAppButton.jsx   # Floating action button (client)
  MediaCarousel.jsx    # Hero video carousel (client)
  Mapa.jsx             # Dynamic map loader (client)
  GymMap.jsx           # Leaflet map implementation (client)
  JsonLd.jsx           # Structured data
lib/
  site.js              # Site config, SEO data, business info
  fechas.js            # Date utilities (founding year, current year)
```

---

*Generated from codebase analysis — reflects actual implementation as of current commit.*