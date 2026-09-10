# GymRatLife - AGENTS.md

## Stack

- **Next.js 15** (App Router) + React 19 + Tailwind CSS v4
- Plain JSX (no TypeScript) — all files are `.jsx`
- SSR by default; page components are server components

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build — compiles fast, trace collection can be slow
npm run start    # serve production build
```

`npm run lint` is not configured — ESLint setup was skipped during migration.

## Path Aliases

`@/*` maps to project root (configured in `jsconfig.json`).
Use `@/components/Header` not relative `../components/Header`.

## Component Rules

- **Server components by default** — do NOT add `"use client"` unless the component needs browser APIs, event handlers, or hooks.
- `"use client"` components so far: `Header.jsx` (scroll listener, mobile toggle state).
- All other components (`Hero`, `Planes`, `Horarios`, `Tienda`, `Contacto`, `Ubicacion`, `Footer`) are server components.

## Styling

- Tailwind v4 uses `@theme` directive in `globals.css` — this is NOT the old `tailwind.config.js` approach.
- Design tokens are CSS custom properties defined inside `@theme { }` in `app/globals.css`.
- Key tokens: `--color-primary` (#DC2626), `--color-dark` (#0A0A0A), `--font-heading` (Oswald), `--font-body` (Inter).
- Fonts loaded via Google Fonts `<link>` in `layout.jsx` `<head>`, not `next/font`.

## File Structure

```
app/
  layout.jsx     # Root layout (server), loads fonts, sets metadata
  page.jsx       # Home page (server), composes all section components
  globals.css    # Tailwind v4 + @theme design tokens
components/      # All section components (Header, Hero, Planes, etc.)
```

## Gotchas

- README.md is stale — still says "React + Vite". Ignore it.
- `.gitignore` still has Vite-era entries (`dist`, `dist-ssr`). harmless but outdated.
- No `.env` files exist. If you add one, use `NEXT_PUBLIC_` prefix for client-side vars.
- The `Ubicacion` component has a map placeholder — replace with real Google Maps iframe when ready.
- `metadata` export in `layout.jsx` must be a plain object (no TypeScript `Metadata` type in .jsx files).
