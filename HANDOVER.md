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

### Animation patterns
- **State-driven reveal**: `useState` counter increments over time; items render when `index < visibleCount`
- **Typewriter**: `setInterval` at 20ms/char revealing `text.slice(0, i)` progressively
- **Framer Motion fade-in**: `initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}` on each new element
- **Progress bars**: `initial={{ width: 0 }} animate={{ width: '${n}%' }}` — Framer interpolates CSS width
- **Screen transitions**: `setTimeout` chains drive screen changes; timers stored in array and cleared on unmount

---

## Page Structure (App.jsx)

```
Navbar
Hero              ← animated chat widget (Maria Santos conversation) + CTAs
DashboardSection  ← animated agent dashboard mockup (3-screen loop)
FeaturesSection   ← 3 feature rows with inline JSX mockup visuals
HowItWorks        ← 3 steps
CredibilityStrip  ← security/compliance section (dark forest bg)
WaitlistSection   ← email form → HubSpot
Footer
```

> `ProblemSection.jsx` and `PricingSection.jsx` exist in `/src/components/` but are **not rendered** — removed intentionally. Re-add to `App.jsx` when needed.

---

## Components

### Hero.jsx
- Left: headline, subheadline, CTA buttons, trust strip
- Right: animated chat widget — full Maria Santos intake conversation (13 messages)
- ChatWidget features: typewriter on bot messages, file upload bubbles (paperclip icon), auto-scrolling message container (`h-64 overflow-y-auto`), assessment card at end
- Scroll uses `messagesRef.current.scrollTop = scrollHeight` — scoped to container, does NOT trigger page scroll
- Assessment card shows Subclass 186 (88%) and 189 (76%) with animated bars
- Callout below widget: plain text, no pills/badges

### DashboardSection.jsx
- Animated mockup of the agent-facing Migro dashboard
- Three screens cycle in a loop: **Dashboard list → Case detail → Documents**
- Layout: `aspect-square max-w-xl mx-auto` — square at all screen sizes, no horizontal scroll
- Sidebar: `w-10` on mobile (dot indicators only) / `w-36 sm:+` (full labels, white text)
- Dashboard table hides Visa column on mobile; keeps Date / Applicant / Status
- Timing: dashboard rows appear sequentially → transition to detail → assessment bars animate → transition to docs → stat cards + doc rows appear → loop back

### FeaturesSection.jsx
- 3 features with alternating left/right layout
- Feature 1: AI Intake Widget (step checklist mockup)
- Feature 2: Automated Assessment (visa pathway progress bars)
- Feature 3: Secure Document Collection (file list with status)
- All mockups are pure JSX — no images, no screenshots
- Feature tags: plain `text-forest/40` text (no pill badges)
- Checkmarks replaced with em dashes `–`

### CredibilityStrip.jsx
- Full-width dark section (`bg-forest`) — the main trust/security section
- Heading: "Built secure. Compliant by design."
- Four security pillars (2×2 on mobile, 4-col on desktop): Data Residency, Encryption, AI Privacy, Compliance
- Static logo row: CSA STAR Level One, CSA STAR for AI Level One, Google Cloud, Vertex AI
- Logo files live in `public/logos/` (committed to git — must commit new logos or they 404 on Netlify)
- Footer note about Google Cloud's ISO 27001 / SOC 2 / PCI DSS / IRAP certifications

### WaitlistSection.jsx
- Email input → POST to HubSpot Forms API v3
- Env vars: `VITE_HS_PORTAL_ID=43908838`, `VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb`
- Error state renders red message below form; success shows confirmation
- "Early access · Limited spots" rendered as plain text with pulse dot (no pill)

---

## Assets

### public/logos/
All certification/infrastructure logos. Must be committed to git or they 404 on Netlify.

| File | Usage |
|---|---|
| `star-level-one.png` | CSA STAR Level One badge |
| `star-for-ai-level-one.png` | CSA STAR for AI Level One badge |
| `google-cloud.png` | Google Cloud logo |
| `vertex-ai.svg` | Powered by Vertex AI logo |
| `firebase.png` | Firebase logo (not currently used on page) |

> **Rule**: always use URL-safe filenames (no spaces). Files with spaces in names cause 404s in production even if they load locally.

---

## Deployment

### Netlify
- Repo: `github.com/RodGutierrezBasualto/migroai` — auto-deploys on push to `main`
- Build command: `npm run build` / Publish dir: `dist`
- Config: `netlify.toml` in project root (handles SPA redirect — prevents 404 on hard refresh)
- Env vars set in Netlify dashboard: `VITE_HS_PORTAL_ID`, `VITE_HS_FORM_ID`
- **Important**: Vite bakes env vars at build time — after changing env vars in Netlify, trigger a manual redeploy

### Deploy workflow
```bash
git add <files>
git commit -m "message"
git push origin main
# Netlify auto-deploys in ~1-2 minutes
```

### GoDaddy → Netlify DNS
- GoDaddy nameservers replaced with Netlify's 4 nameservers
- SSL auto-provisioned by Netlify (Let's Encrypt)

---

## HubSpot Form

- Form ID: `e960c419-dbb7-437d-be71-74fe56cf68cb`
- Portal ID: `43908838`
- API endpoint: `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}`
- No API key needed (public submission endpoint)
- **Domain must be whitelisted**: submissions from non-whitelisted domains are silently tagged as spam. Add at: HubSpot → Settings → Privacy & Consent → Allowlist. Currently `migro.com.au` and `migro.netlify.app` are whitelisted.
- To view submissions: HubSpot → Marketing → Forms → [form] → Submissions tab

---

## Local Development

```bash
cd /Users/rod/Documents/website-migro
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
```

Requires a `.env` file in project root (git-excluded, already created):
```
VITE_HS_PORTAL_ID=43908838
VITE_HS_FORM_ID=e960c419-dbb7-437d-be71-74fe56cf68cb
```

---

## Known Omissions / Future Work

- **Pricing section**: `PricingSection.jsx` exists but is hidden — re-add to `App.jsx` when pricing is confirmed
- **Problem section**: `ProblemSection.jsx` exists but removed — can be re-added if narrative needs it
- **Privacy Policy / Terms**: No legal pages — needed before broader launch
- **Analytics**: No tracking installed (no GA, no Plausible, etc.)
- **OG / social meta tags**: `index.html` has basic title but no og:image, og:description, Twitter card
- **Mobile nav**: Navbar has no hamburger menu — logo + CTA only on mobile
- **Additional certifications**: More logos can be added to `public/logos/` and the array in `CredibilityStrip.jsx`
