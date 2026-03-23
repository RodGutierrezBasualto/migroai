# Migro Landing Page — Handover

## What this is
A pre-launch marketing landing page for **Migro** — an AI-powered intake SaaS for MARA-registered migration agents in Australia. One-page React/Vite site, live at **migro.com.au** via Netlify.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 (custom design tokens) |
| Animations | Framer Motion 11 |
| Fonts | Fraunces (display/headings) + DM Sans (body) via Google Fonts |
| Deployment | Netlify (auto-deploy from GitHub) |
| Waitlist form | HubSpot Forms API v3 (no embed, no branding) |
| Domain | migro.com.au on GoDaddy — nameservers pointed to Netlify |

---

## Design System

### Colors (tailwind.config.js)
| Token | Hex | Usage |
|---|---|---|
| `forest` | `#1A2B1A` | Primary text, dark sections bg |
| `emerald` | `#2D6A2D` | Primary accent, buttons, links |
| `emerald-hover` | `#245A24` | Button hover state |
| `emerald-tint` | `#E8F2E8` | Subtle bg tints (use sparingly) |
| `off-white` | `#F5F4F0` | Page background |
| `warm-grey` | `#EFEDE8` | Alternate section bg, borders |
| `surface` | `#FFFFFF` | Cards, white panels |

### Typography
- **Headings/display**: `font-display` → Fraunces (serif, weight 400–700)
- **Body/UI**: `font-sans` → DM Sans (weight 300–600)

### Shadows
- `shadow-warm` — `0 2px 12px rgba(26,43,26,0.08)` (cards)
- `shadow-warm-md` — `0 4px 24px rgba(26,43,26,0.10)` (elevated cards)

### Buttons
```
bg-emerald hover:bg-emerald-hover text-white rounded-[6px] font-semibold px-6 py-3 transition-colors duration-200
```
No gradients, no glow, no shadows.

---

## Page Structure (App.jsx)

```
Navbar
Hero              ← chat widget demo + CTAs
ProblemSection    ← 3 problem cards (bg-warm-grey)
FeaturesSection   ← 3 feature rows with mockup visuals (bg-off-white)
HowItWorks        ← 3 steps (bg-warm-grey)
CredibilityStrip  ← 5 trust badges (bg-surface)
WaitlistSection   ← email form → HubSpot (bg-forest, dark)
Footer            ← (bg-forest, dark, continues from waitlist)
```

> Note: `PricingSection.jsx` exists in `/src/components/` but is **not rendered** — removed from App.jsx intentionally (pre-launch, pricing not finalised).

---

## Components

### Hero.jsx
- Left: headline, subheadline, CTA buttons, stats strip
- Right: animated chat widget (typewriter effect, visa assessment results)
- ChatWidget is self-contained with its own state — simulates a real Migro intake conversation
- Badge above widget: plain text "This is what your clients see"
- Callout below widget: plain text B2B framing

### WaitlistSection.jsx
- Email input → POST to HubSpot Forms API v3
- Env vars: `VITE_HS_PORTAL_ID=43908838`, `VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb`
- Error state renders a red message below the form
- Success state shows "You're on the list!" confirmation

### FeaturesSection.jsx
- 3 features alternating layout (text left/right)
- Each has an inline mockup visual (pure JSX, no images)
- Feature 1: AI Intake Widget (step progress mockup)
- Feature 2: Automated Assessment (visa pathway bars)
- Feature 3: Secure Document Collection (file list)

### ProblemSection.jsx
- 3 cards, icons rendered directly (no box containers — plain `text-forest/30`)

### CredibilityStrip.jsx
- 5 trust badges: Privacy Act, MARA Code of Conduct, Australian Data Residency, AES-256, Audit Logging

---

## Deployment

### Netlify
- Repo: connected via GitHub (auto-deploys on push to `main`)
- Build command: `npm run build` / Publish dir: `dist`
- Config: `netlify.toml` in project root (also handles SPA redirect — no 404 on refresh)
- Env vars set in Netlify dashboard: `VITE_HS_PORTAL_ID`, `VITE_HS_FORM_ID`
- **Important**: Vite bakes env vars at build time — after changing env vars in Netlify, trigger a new deploy

### GoDaddy → Netlify DNS
- GoDaddy nameservers replaced with Netlify's 4 nameservers
- SSL auto-provisioned by Netlify (Let's Encrypt)

---

## HubSpot Form

- Form ID: `e960c419-dbb7-437d-be71-74fe56cf68cb`
- Portal ID: `43908838`
- API endpoint: `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}`
- No API key needed (public submission endpoint)
- **Domain must be whitelisted in HubSpot** — submissions from non-whitelisted domains are silently tagged as spam. Add domains at: HubSpot → Settings → Privacy & Consent → Allowlist
- To view submissions: HubSpot → Marketing → Forms → [form] → Submissions tab

---

## Local Development

```bash
cd /Users/rod/Documents/website-migro
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
```

Requires a `.env` file in the project root (already created, excluded from git):
```
VITE_HS_PORTAL_ID=43908838
VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb
```

---

## Known Omissions / Future Work

- **Pricing section**: `PricingSection.jsx` exists but is hidden — re-add to `App.jsx` when pricing is confirmed
- **Privacy Policy / Terms**: No legal pages yet — needed before broader launch
- **Analytics**: No tracking installed (no GA, no Plausible, etc.)
- **OG / social meta tags**: `index.html` has a basic title but no og:image, og:description, Twitter card
- **Mobile nav**: Navbar has no hamburger menu — currently just logo + CTA button on mobile
