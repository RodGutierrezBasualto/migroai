# CLAUDE.md — Migro Landing Page

## Project overview

Marketing website for **Migro** — AI-powered intake and document intelligence SaaS for MARA-registered migration agents in Australia. Live at **migro.com.au**.

**Not Next.js.** This is a Vite 5 + React 18 SPA with React Router. There is no SSR, no `next/script`, no `app/` or `pages/` directory in the Next.js sense.

---

## Stack

- **Vite 5** + **React 18** — `npm run dev` starts on `http://localhost:5173`
- **React Router DOM v7** — BrowserRouter; SPA redirect handled by `netlify.toml`
- **Tailwind CSS v3** — custom design tokens in `tailwind.config.js`
- **Framer Motion 11** — animations
- **Google Fonts** — Fraunces (display) + DM Sans (body), loaded in `index.html`

---

## Key files

| File | Purpose |
|---|---|
| `index.html` | Entry point; GA4 script tags live here |
| `src/App.jsx` | Router setup + all route definitions |
| `src/main.jsx` | ReactDOM.createRoot entry |
| `src/index.css` | Tailwind base styles |
| `tailwind.config.js` | Design tokens: colors, fonts, custom animations |
| `netlify.toml` | Build config + SPA `/* → /index.html` redirect |
| `.env` | HubSpot IDs — git-excluded, create manually |

---

## Routes

| Path | Component |
|---|---|
| `/` | `HomePage` (inline in App.jsx) — full landing page |
| `/pricing` | `src/pages/PricingPage.jsx` |
| `/about` | `src/pages/AboutPage.jsx` |
| `/freemonth` | `src/pages/FreemonthPage.jsx` — standalone (no Navbar/Footer) |

---

## Design tokens (Tailwind)

| Token | Value | Use |
|---|---|---|
| `forest` | `#1A2B1A` | Primary text, dark section bg |
| `emerald` | `#2D6A2D` | Buttons, links, accents |
| `emerald-hover` | `#245A24` | Button hover |
| `emerald-tint` | `#E8F2E8` | Subtle tints |
| `off-white` | `#F5F4F0` | Page background |
| `warm-grey` | `#EFEDE8` | Borders, alternate sections |
| `surface` | `#FFFFFF` | Cards |

Font classes: `font-display` (Fraunces, headings) / `font-sans` (DM Sans, body).

Button pattern: `bg-emerald hover:bg-emerald-hover text-white rounded-[6px] font-semibold px-6 py-3 transition-colors duration-200` — no gradients, no shadows.

---

## Local dev setup

```bash
npm install
# Create .env:
# VITE_HS_PORTAL_ID=43908838
# VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb
npm run dev
```

---

## Environment variables

| Var | Value | Used in |
|---|---|---|
| `VITE_HS_PORTAL_ID` | `43908838` | `WaitlistSection.jsx` |
| `VITE_HS_FORM_ID` | `e960c419-dbb7-437d-be71-74fe56cf68cb` | `WaitlistSection.jsx` |

Vite bakes env vars at build time. After changing them in Netlify dashboard, trigger a manual redeploy.

---

## Analytics

GA4 Measurement ID: `G-3GPD2RPR3D`. Implemented as two `<script>` tags in `index.html` — standard async gtag.js snippet. This is the correct approach for Vite (not `next/script`).

---

## Deployment

- **GitHub**: `github.com/RodGutierrezBasualto/migroai` (account: coopercine@gmail.com)
- **Netlify**: auto-deploys from `main` (account: coopercine@gmail.com)
- Push to `main` → Netlify builds and deploys in ~1–2 min
- **Domain**: `migro.com.au` on GoDaddy (account: coopercine@gmail.com), nameservers → Netlify

---

## Hidden components (intentionally not rendered)

- `src/components/ProblemSection.jsx` — exists, not in `App.jsx`; re-add to imports and `<HomePage>` JSX when needed
- `src/components/HowItWorks.jsx` and `src/components/WaitlistSection.jsx` — exist, currently not rendered

`PricingSection.jsx` and `pages/DemoPage.jsx` were deleted in July 2026 (PricingSection carried stale pricing; recover from git history only after updating it). Public pricing anchors at $199/mo Pro; do not introduce any other price point anywhere on the site without explicit approval.

---

## Logo/image assets

All in `public/logos/`. Must be committed to git — Netlify only serves files in the build output. Use URL-safe filenames (no spaces).

---

## Code conventions

- No TypeScript — plain JSX throughout
- No comments in components
- Framer Motion for all animations — follow existing patterns (fade-in with `whileInView`, state-driven reveals for sequential items)
- No pill/badge UI elements — use plain text with `text-forest/40` or similar opacity
- Checkmarks → em dashes (`–`) in feature lists where noted
