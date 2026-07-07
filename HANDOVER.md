# Migro Landing Page — Handover

## What this is

A pre-launch marketing website for **Migro** — an AI-powered intake and document intelligence SaaS for MARA-registered migration agents in Australia. Built in React + Vite, live at **migro.com.au** via Netlify.

The site is a multi-page SPA (not Next.js). It is a pure marketing/waitlist site — there is no backend, no database, no auth. The only external API call is the HubSpot waitlist form submission.

---

## Accounts & Access

| Service | Account email | Notes |
|---|---|---|
| GitHub | coopercine@gmail.com | Repo: `github.com/RodGutierrezBasualto/migroai` |
| Netlify | coopercine@gmail.com | Site: migro-ai or similar; auto-deploys from `main` |
| HubSpot | coopercine@gmail.com | Portal ID: `43908838` — waitlist form submissions land here |
| GoDaddy | coopercine@gmail.com | Domain `migro.com.au` — nameservers pointed to Netlify DNS |
| Google Analytics | coopercine@gmail.com | Measurement ID: `G-3GPD2RPR3D` — GA4 property |

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router DOM v7 (BrowserRouter) |
| Styling | Tailwind CSS v3 (custom design tokens) |
| Animations | Framer Motion 11 |
| Fonts | Fraunces (display/headings) + DM Sans (body) via Google Fonts |
| Deployment | Netlify (auto-deploy from GitHub `main`) |
| Waitlist form | HubSpot Forms API v3 (direct POST, no embed/branding) |
| Analytics | Google Analytics 4 (`G-3GPD2RPR3D`) — gtag.js in `index.html` |
| Domain | migro.com.au on GoDaddy — nameservers → Netlify |
| Legal entity | Integrated Platforms Pty Ltd (ABN 69 693 247 513) |

---

## Repository

- **GitHub repo**: `https://github.com/RodGutierrezBasualto/migroai`
- **Branch**: `main` (only branch; Netlify deploys from here)
- **Clone**: `git clone https://github.com/RodGutierrezBasualto/migroai.git`

---

## Setting Up on a New Machine

```bash
# 1. Clone
git clone https://github.com/RodGutierrezBasualto/migroai.git
cd migroai

# 2. Install dependencies
npm install

# 3. Create .env file (not in git)
echo "VITE_HS_PORTAL_ID=43908838" > .env
echo "VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb" >> .env

# 4. Run dev server
npm run dev        # → http://localhost:5173

# 5. Build for production
npm run build      # → dist/
```

> The `.env` file is git-excluded. You must create it manually on every new machine. Values are above — they are not secret (public HubSpot submission endpoint), but keep them out of git anyway.

---

## Deployment

### Netlify (production)
- Auto-deploys on every push to `main` (takes ~1–2 min)
- Build command: `npm run build`
- Publish dir: `dist`
- `netlify.toml` in project root handles SPA redirect (prevents 404 on hard refresh)
- Env vars `VITE_HS_PORTAL_ID` and `VITE_HS_FORM_ID` are set in Netlify dashboard → do not need to re-add for normal deploys, only if site is re-created from scratch
- **Important**: Vite bakes env vars at build time. After changing env vars in Netlify, trigger a manual redeploy from the Netlify dashboard

### Deploy workflow
```bash
git add <files>
git commit -m "message"
git push origin main
# Netlify auto-deploys in ~1-2 minutes
```

### DNS
- GoDaddy: `migro.com.au` nameservers replaced with Netlify's 4 nameservers
- SSL auto-provisioned by Netlify (Let's Encrypt)
- No DNS config needed on a new machine — it's all server-side

---

## Project Structure

```
website-migro/
├── index.html              ← entry point; GA4 script lives here
├── vite.config.js
├── tailwind.config.js      ← custom design tokens (colors, fonts, animations)
├── postcss.config.js
├── netlify.toml            ← SPA redirect rule
├── .env                    ← git-excluded; create manually (HubSpot IDs)
├── public/
│   └── logos/              ← certification/partner logos (must be committed or 404 on Netlify)
│       ├── star-level-one.png
│       ├── star-for-ai-level-one.png
│       ├── google-cloud.png
│       ├── vertex-ai.svg
│       ├── firebase.png         (unused on page)
│       └── CloudRun-512-color-rgb.png
└── src/
    ├── main.jsx            ← React entry, mounts App
    ├── App.jsx             ← Router + layout shell; defines all routes
    ├── index.css           ← global CSS (Tailwind base)
    ├── components/
    │   ├── Navbar.jsx      ← fixed top nav; transparent → white on scroll; links to /demo /pricing /about
    │   ├── Hero.jsx        ← headline + animated chat widget (Maria Santos intake conversation)
    │   ├── DashboardSection.jsx  ← animated agent dashboard mockup (3-screen loop)
    │   ├── FeaturesSection.jsx   ← 3 feature rows, alternating layout, pure JSX mockups
    │   ├── HowItWorks.jsx  ← 3-step process section
    │   ├── CredibilityStrip.jsx  ← security/compliance section (dark bg, logos)
    │   ├── WaitlistSection.jsx   ← email form → HubSpot API
    │   ├── Footer.jsx      ← dark footer, nav links, legal line
    │   ├── PricingSection.jsx    ← EXISTS but NOT rendered (hidden intentionally)
    │   └── ProblemSection.jsx    ← EXISTS but NOT rendered (hidden intentionally)
    └── pages/
        ├── PricingPage.jsx ← /pricing route: cards + top-up tables + comparison table + FAQ
        ├── AboutPage.jsx   ← /about route
        └── DemoPage.jsx    ← /demo route: interactive 3-phase product walkthrough
```

### Routes
| Path | Component | Notes |
|---|---|---|
| `/` | `HomePage` (inline in App.jsx) | Full landing page |
| `/pricing` | `PricingPage.jsx` | 3-tier pricing + comparison table + FAQ |
| `/about` | `AboutPage.jsx` | Founder + company info |
| `/demo` | `DemoPage.jsx` | Interactive product demo walkthrough |

---

## Design System

### Colors (`tailwind.config.js`)
| Token | Hex | Usage |
|---|---|---|
| `forest` | `#1A2B1A` | Primary text, dark section backgrounds |
| `emerald` | `#2D6A2D` | Primary accent, buttons, links |
| `emerald-hover` | `#245A24` | Button hover state |
| `emerald-tint` | `#E8F2E8` | Subtle background tints |
| `off-white` | `#F5F4F0` | Page background |
| `warm-grey` | `#EFEDE8` | Alternate section bg, borders |
| `surface` | `#FFFFFF` | Cards, white panels |

### Typography
- **Headings/display**: `font-display` → Fraunces (serif, weights 400–700)
- **Body/UI**: `font-sans` → DM Sans (weights 300–600)
- Fonts loaded via Google Fonts in `index.html`

### Shadows
- `shadow-warm` — `0 2px 12px rgba(26,43,26,0.08)` (cards)
- `shadow-warm-md` — `0 4px 24px rgba(26,43,26,0.10)` (elevated cards)

### Buttons
```
bg-emerald hover:bg-emerald-hover text-white rounded-[6px] font-semibold px-6 py-3 transition-colors duration-200
```
No gradients, no glow, no shadows.

### Animation patterns
- **State-driven reveal**: `useState` counter increments over time; items render when `index < visibleCount`
- **Typewriter**: `setInterval` at 20ms/char revealing `text.slice(0, i)` progressively
- **Framer Motion fade-in**: `initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}`
- **Progress bars**: `initial={{ width: 0 }} animate={{ width: '${n}%' }}` — Framer interpolates CSS width
- **Screen transitions**: `setTimeout` chains drive screen changes; timers stored in array and cleared on unmount

---

## Analytics

- **Platform**: Google Analytics 4
- **Measurement ID**: `G-3GPD2RPR3D`
- **Implementation**: Two `<script>` tags in `index.html` `<head>` (async gtag.js snippet)
- **Account**: coopercine@gmail.com on analytics.google.com
- No custom events wired up — standard pageview tracking only

---

## HubSpot Waitlist Form

- **Portal ID**: `43908838`
- **Form ID**: `e960c419-dbb7-437d-be71-74fe56cf68cb`
- **API endpoint**: `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}`
- No API key required (public submission endpoint)
- **Domain allowlist**: submissions from non-whitelisted domains are silently tagged as spam. Currently `migro.com.au` and `migro.netlify.app` are whitelisted. Add new domains at: HubSpot → Settings → Privacy & Consent → Allowlist
- To view submissions: HubSpot → Marketing → Forms → [form] → Submissions tab

---

## Assets

All logo/certification images live in `public/logos/`. They **must be committed to git** or they will 404 on Netlify (Netlify only serves files that exist in the build output).

Always use URL-safe filenames — no spaces. Files with spaces 404 in production even if they load locally.

---

## Business Context

- **Product**: Migro — AI-powered document intelligence and intake agent for MARA-registered migration agents
- **Legal entity**: Integrated Platforms Pty Ltd — ABN 69 693 247 513 — Bondi Beach, NSW 2026
- **Founder/CEO**: Rodrigo Gutierrez
- **Contact**: info@migro.com.au
- **Target market**: Australian MARA-registered migration agents; initial focus NSW sole practitioners
- **Infrastructure**: Google Cloud Sydney (australia-southeast1), Vertex AI (Gemini 2.5 Flash)
- **Security**: CSA STAR Level 1, CSA STAR for AI Level 1, ASD Cyber Security Business Partner

---

## Known Omissions / Future Work

- **Pricing section component** (`PricingSection.jsx`): exists in `/src/components/` but not rendered — re-add to `App.jsx` when needed
- **Problem section** (`ProblemSection.jsx`): exists but removed — can be re-added
- **Privacy Policy / Terms**: no legal pages — needed before broader launch
- **Mobile nav**: no hamburger menu — logo + CTA only on mobile
- **OG / social meta tags**: basic title in `index.html` but no `og:image`, `og:description`, or Twitter card
- **GA4 custom events**: only standard pageview tracking; no button click / form submit events wired yet
- **Additional certifications**: more logos can be added to `public/logos/` and the array in `CredibilityStrip.jsx`
