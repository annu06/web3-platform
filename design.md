# Web3 Platform — Design System & UI Specification

## Design Philosophy

**"Cutting-edge without chaos."** The platform should feel like institutional DeFi — trusted, powerful,
and alive. Dark mode only. Every surface breathes. Every number animates. No element is static.

---

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `surface.DEFAULT` | `#050810` | Page background |
| `surface.card` | `#0c1018` | Card backgrounds |
| `surface.elevated` | `#111827` | Elevated panels |
| `surface.border` | `#1a2236` | Subtle borders |
| `surface.hover` | `#1c2440` | Hover states |
| `brand.500` | `#3b82f6` | Primary brand blue |
| `brand.400` | `#60a5fa` | Brand accent (text/icons) |
| `accent.purple` | `#7c3aed` | Secondary accent |
| `accent.cyan` | `#22d3ee` | Tertiary / highlight |
| `accent.green` | `#10b981` | Success / positive |
| `accent.orange` | `#f97316` | Warning / attention |

### Gradient Palette

- **Brand gradient**: `linear-gradient(135deg, #3b82f6, #7c3aed)`
- **Hero gradient**: `linear-gradient(135deg, #050810 0%, #0c1018 50%, #050810 100%)`
- **Glow blue**: `radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)`
- **Glow purple**: `radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)`

---

## Typography

| Scale | Size | Weight | Usage |
|---|---|---|---|
| Display | 72–80px | 800 | Hero headline |
| H1 | 56–64px | 700 | Page headings |
| H2 | 36–48px | 700 | Section headings |
| H3 | 20–24px | 600 | Card titles |
| Body Large | 18–20px | 400 | Hero subtext |
| Body | 14–16px | 400 | General text |
| Caption | 11–12px | 500 | Labels, badges |
| Mono | 12–14px | 400 | Addresses, numbers |

**Font family**: Inter (sans), JetBrains Mono (mono)

---

## Spacing System

8px grid. All padding/gap values are multiples of 8px (8, 16, 24, 32, 48, 64, 80, 96, 128).

Section vertical padding: `py-24` (96px) on desktop, `py-16` (64px) on mobile.

---

## Component Library

### Glass Card
```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
```

On hover:
```css
background: rgba(255,255,255,0.055);
border-color: rgba(255,255,255,0.15);
```

### Gradient Border Card (Featured)
Uses CSS pseudo-element to render a gradient border while keeping the interior dark:
```css
.gradient-border-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(59,130,246,0.5), rgba(124,58,237,0.5));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
}
```

### Mouse-Spotlight Card
On hover, a radial gradient follows the cursor inside the card boundary, simulating a light reflection:
```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);
background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.12), transparent 80%)`
```

### Primary Button
```css
background: linear-gradient(135deg, #3b82f6, #7c3aed);
box-shadow: 0 0 30px rgba(59,130,246,0.3);
border-radius: 12px;
padding: 12px 28px;
font-weight: 600;
```

On hover: `box-shadow: 0 0 50px rgba(59,130,246,0.5)`

### Secondary Button
```css
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 12px;
```

---

## Animation Principles

| Type | Duration | Easing | Notes |
|---|---|---|---|
| Fade in (entry) | 500ms | easeOut | Page load, scroll-triggered |
| Slide up (entry) | 400ms | easeOut | Used with fade for staggered lists |
| Hover response | 150–200ms | easeOut | Immediate feel |
| Background blobs | 8–12s | easeInOut | Organic, non-distracting |
| Number count-up | 2000ms | easeOutCubic | Triggered once on scroll |
| Marquee ticker | 40s | linear | Continuous scroll |
| Gradient shift | 8s | ease | Infinite background animation |

**Stagger delay pattern**: `i * 0.07s` for grid items, `i * 0.15s` for step sequences.

**Intersection margin**: `-50px` — elements animate slightly before entering the viewport.

---

## Page Sections

### 1. Navbar (fixed)
- Transparent on hero scroll position, glass on scroll
- Logo: gradient icon + wordmark
- Nav links with hover underline slide animation
- Balance chip (when connected)
- RainbowKit ConnectButton
- Mobile: slide-down menu with backdrop blur

### 2. Hero
- Dot-grid background (radial-gradient dots, 30px grid)
- 3 animated gradient blobs (blue, purple, cyan)
- Announcement pill badge with pulse dot
- H1 with cycling animated words (AnimatePresence)
- Subheading
- CTA buttons: primary (gradient glow) + secondary (ghost)
- Trust badges strip: Audited / Gas Optimized / Multi-chain
- Mock dashboard card: live recharts AreaChart + 4 stat cards

### 3. Stats Bar
- 5 live platform metrics
- Animated count-up on scroll entry
- Per-card gradient top border
- "Live" indicator dot with pulse

### 4. Features Grid (3×2)
- Mouse-spotlight radial gradient on each card
- Gradient border on hover
- Animated icon container
- Feature badge (color-coded by feature type)
- Staggered entry animation

### 5. How It Works
- 3-step horizontal flow
- Connector line that "draws" itself on scroll (scaleX 0→1)
- Step number badge with gradient ring
- Icon with subtle float animation

### 6. Security & Audits (NEW)
- "Security First" badge + heading
- 4 security metric cards (100% coverage, 0 vulnerabilities, etc.)
- Audit partner logos (CertiK / Quantstamp / OpenZeppelin style)
- Bug bounty program highlight
- Code stats: lines of Solidity, test count

### 7. CTA Section
- Full-bleed glass card with animated mesh gradient background
- Open Beta badge
- Large headline with gradient words
- Subtext
- Two CTAs + disclaimer text
- Live blockchain status indicator

### 8. Footer
- Logo + tagline
- 4-column link grid
- Newsletter subscription input
- Social icons
- Back-to-top button
- Bottom bar: copyright + stack

---

## Mobile Responsiveness

- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Hero: single column, font scales down (80px → 48px → 36px)
- Stats bar: 2-col on mobile, 5-col on desktop
- Features grid: 1-col mobile → 2-col sm → 3-col lg
- How It Works: vertical stacked on mobile, horizontal on sm+
- Footer: 2-col mobile → 4-col sm+

---

## Performance Notes

- All animations use `will-change: transform` or GPU-composited properties only (transform, opacity)
- Background blobs use `blur-3xl` filter — limit to 3–4 per section
- Recharts ResponsiveContainer prevents layout shifts
- `useInView` with `once: true` prevents re-triggering on scroll back
- Marquee uses CSS animation (no JS) for zero-overhead continuous scroll
- Framer Motion imported selectively to minimize bundle

---

## Accessibility

- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- All interactive elements have `focus-visible` rings
- Reduced motion: wrap all non-essential animations in `@media (prefers-reduced-motion: no-preference)`
- ARIA labels on icon-only buttons
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
