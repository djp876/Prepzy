# Prepzy — Next.js rebuild (hero starter)

A responsive Next.js 15 rebuild of the Prepzy landing page, starting with the
hero + stats section. This replaces the Figma Make export's fixed-width,
`zoom`-scaled frame with real responsive components.

## Stack

- **Next.js 15** (App Router) on **Node.js** — SSR/SSG, image + font optimization
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (utility layout) + **prepzy-kit** (brand tokens & components)
- **lucide-react** (icons)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

> First build downloads the Poppins font via `next/font/google`, so it needs
> network access once. After that it's cached and self-hosted by Next (no
> layout shift, no runtime request to Google Fonts).

## What's here

```
src/
  app/
    layout.tsx          # fonts (next/font Poppins) + global CSS
    page.tsx            # composes Navbar + Hero + Stats
    globals.css         # Tailwind import, body theme, keyframes
    components/
      Navbar.tsx        # floating glass nav, responsive + mobile menu
      Hero.tsx          # two-column hero: purple card + student photo
      Stats.tsx         # 4-up stat bar with scroll-triggered count-up
  prepzy-kit/           # design system — SOURCE OF TRUTH for brand UI
    Button.tsx Card.tsx Pill.tsx Typography.tsx
    styles/tokens.css   # --pz-* tokens (colors, radii, spacing, type)
public/
  prepzy-logo.png  hero-student.png
```

## Notes vs. the Figma Make export

- **Responsive, not zoom-scaled.** Desktop uses a real CSS grid that collapses
  to a single column on mobile; there is no 1512px fixed frame.
- **`prepzy-kit` is wired in.** Tokens drive colors/type via CSS variables, and
  `next/font` feeds `--font-poppins` into the kit's `--pz-font`.
- **Images via `next/image`** — the source PNGs are large (the student photo is
  ~1.8 MB); `next/image` serves optimized, responsive WebP automatically.
- **Accessibility:** `prefers-reduced-motion` disables the flip-word, orbit, and
  count-up animations.

## Next steps (not yet built)

The rest of the landing page (courses, pricing, testimonials, footer) still
lives only in the Figma export. Rebuild each section as components here, reusing
`prepzy-kit`, and retire the generated `Final-2-2904.tsx` frame.
