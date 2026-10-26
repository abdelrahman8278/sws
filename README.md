# Stellar Media — Strategic Marketing & Institutional Creative

A premium, production-grade single-page marketing website built for **Stellar Media**, a marketing agency based in Abu Dhabi, United Arab Emirates, delivering strategic communication architectures for government entities, sovereign organizations, and major corporate brands.

Developed as part of a technical hiring assessment to demonstrate frontend architectural standards, modern Angular best practices, pixel-perfect UI execution, responsive design, accessibility, and clean maintainable code.

---

## 1. Project Overview

- **Client / Entity:** Stellar Media
- **Headquarters:** Abu Dhabi Global Market / Cultural District, Abu Dhabi, UAE
- **Core Market:** United Arab Emirates (Government, Sovereign Mandates, Enterprise)
- **Design Philosophy:** Dignified corporate authority fused with avant-garde editorial aesthetics.
- **Visual Reference:** Accurate implementation of the custom Stitch design specification with full responsive adaptation for desktop, tablet, and mobile viewports.

---

## 2. Technology Stack

- **Framework:** Angular 21 (Standalone Components, Strict TypeScript, Zoneless architecture support)
- **Language:** TypeScript 5.9 (Strict mode enabled, no `any`)
- **Styling:** SCSS with Modular Design Tokens (CSS Custom Properties, Fluid `clamp()` typography, CSS Grid, Flexbox)
- **Reactivity & State:** Angular Signals (`signal`, `@HostListener`, OnPush change detection)
- **Forms:** Angular Reactive Forms with client-side validation
- **Testing:** Vitest & Angular Testbed
- **Hosting & CI/CD:** Vercel (configured via `vercel.json` with SPA routing)
- **Performance:** Optimized WebP/JPEG assets, zero external UI component libraries, 58 kB initial gzipped bundle

---

## 3. Features & Sections

1. **Global Header & Navigation:**
   - Wordmark typography: `STELLAR MEDIA ✦` with subtle gold accent.
   - Smooth anchor navigation (`#hero`, `#about`, `#services`, `#approach`, `#contact`).
   - Frosted glass sticky header that responds dynamically to user scroll (`window.scrollY > 20`).
   - Bilingual status badge (`EN / العربية`).
   - Fully accessible mobile hamburger drawer with backdrop blur, focus handling, and `Escape` key listeners.

2. **Hero Section (`#hero`):**
   - High-impact editorial headline: *"Ideas That Inspire. Experiences That Matter."*
   - Clear value proposition and primary/secondary CTAs (`Explore Our Services` and `About Stellar Media`).
   - Geographic Mandate badge: *Abu Dhabi, United Arab Emirates*.
   - Architectural photography of the **Louvre Abu Dhabi** at dusk with responsive container and floating mandate badge.
   - Optimized eager asset loading (`fetchpriority="high"`) to eliminate layout shift (CLS).

3. **About Section (`#about`):**
   - Verified core narrative: *"Stellar Media is a marketing agency based in Abu Dhabi, UAE, working with government entities and major brands."*
   - Architectural discipline visual showcase with blueprints, draft sketches, and precision instruments.
   - Dual strategic pillar cards:
     - **Pillar 01 — Institutional Governance:** Sovereign frameworks and protocol alignment.
     - **Pillar 02 — Cultural Resonance:** Authentic regional storytelling and progressive vision.

4. **Services Section (`#services`):**
   - Data-driven grid rendering 6 verified discipline cards:
     1. Brand Strategy
     2. Digital Marketing
     3. Creative Campaigns
     4. Social Media
     5. Content Production
     6. Event Marketing
   - Modern Angular `@for (service of services; track service.id)` template syntax.
   - Interactive hover cards with subtle upward translation, border glow, and directional indicators.
   - Fluid 3-column (desktop) -> 2-column (tablet) -> 1-column (mobile) CSS Grid layout.

5. **Approach / Methodology Section (`#approach`):**
   - 4-phase structured engagement workflow:
     - **01 — Discover:** Institutional listening and stakeholder alignment.
     - **02 — Strategize:** Architecture, narrative definition, and roadmap.
     - **03 — Create:** Visual identity craft and cinema-grade storytelling.
     - **04 — Refine:** Calibration, QA, deployment governance, and impact.
   - Numbered step cards with responsive horizontal-to-vertical alignment.

6. **Contact & Advisory Protocol (`#contact`):**
   - Verified Official Advisory Protocol card:
     - Clear statement on verified executive briefing requests and portal write-ins.
     - Official office location: *Abu Dhabi Global Market / Cultural District, Abu Dhabi, UAE*.
     - Disclaimer: *Available for entity mandates · Direct confidentiality assured*.
   - **Interactive Institutional Briefing Modal:**
     - Accessible modal dialog with focus management and backdrop overlay.
     - Strict reactive form validation for Entity Name, Representative Name, Official Email format, Mandate Scope selection, and Briefing Objectives.
     - Confirmation state with personalized mandate summary and reset capability.
     - Does not invent unverified personal phone numbers or direct personal inboxes.

7. **Institutional Footer:**
   - Triple-column layout with brand mission, institutional navigation links, sovereign focus statement, dynamic copyright year, and Abu Dhabi jurisdiction tag.

8. **Scroll-To-Top Utility:**
   - Smooth floating action button appearing on deep scroll (> 400px) with accessible keyboard and screen-reader controls.

---

## 4. Project Structure

```text
src/
│
├── app/
│   │
│   ├── core/
│   │   └── models/
│   │       ├── service.model.ts          # Typed AgencyService interface
│   │       ├── navigation.model.ts       # Typed NavItem interface
│   │       └── approach.model.ts         # Typed ApproachStep interface
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── header/                   # Sticky frosted header & mobile drawer
│   │       ├── footer/                   # Institutional footer & jurisdiction notice
│   │       ├── section-heading/          # Reusable typography heading block
│   │       ├── service-card/             # Interactive service article card
│   │       └── scroll-to-top/            # Floating smooth scroll-to-top action
│   │
│   ├── features/
│   │   └── home/
│   │       ├── home.component.ts         # Main page assembly
│   │       ├── home.component.html
│   │       ├── home.component.scss
│   │       │
│   │       └── sections/
│   │           ├── hero/                 # Hero headline, CTAs, Louvre visual
│   │           ├── about/                # Agency identity, pillars, craft visual
│   │           ├── services/             # 6-card responsive services grid
│   │           ├── approach/             # 4-stage engagement methodology
│   │           └── contact/              # Advisory protocol & briefing modal
│   │
│   ├── data/
│   │   ├── services.data.ts              # Data-driven service definitions
│   │   ├── navigation.data.ts            # Header & footer navigation links
│   │   └── approach.data.ts              # 4-stage workflow steps
│   │
│   ├── app.component.ts                  # Root component shell
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.config.ts                     # Application configuration
│
├── styles/
│   ├── _variables.scss                   # Design tokens, color palette, spacing
│   ├── _typography.scss                  # Font tokens (Manrope, Inter)
│   ├── _mixins.scss                      # Responsive breakpoints & flex mixins
│   ├── _animations.scss                  # Keyframes & prefers-reduced-motion
│   └── _global.scss                      # CSS reset, container, button system
│
├── public/
│   ├── assets/
│   │   └── images/                       # Verified Abu Dhabi & craft photography
│   ├── screenshots/                      # QA visual captures (Desktop, Mobile)
│   └── favicon.ico
│
├── angular.json                          # Angular build & stylePreprocessor config
├── vercel.json                           # Vercel SPA deployment configuration
├── tsconfig.json                         # Strict TypeScript configuration
└── package.json                          # Project scripts and dependencies
```

---

## 5. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/abdelrahman8278/sws.git
cd sws
npm install --legacy-peer-deps
```

*(Note: `.npmrc` is configured with `legacy-peer-deps=true` to ensure clean package resolution across all npm environments).*

---

## 6. Local Development

Run the Angular development server:

```bash
npm start
# Or: ng serve --port 4250
```

Open `http://localhost:4250/` in your browser. The application will automatically reload if you change any of the source files.

---

## 7. Production Build

To build the project for production:

```bash
npm run build
# Or: ng build --configuration production
```

The build artifacts will be stored in the `dist/stellar-media/browser` directory. The production build enforces strict bundle budgets, tree-shaking, CSS minification, and Ahead-of-Time (AOT) compilation.

### Run Unit Tests

```bash
npm test -- --watch=false
```

---

## 8. Deployment to Vercel

The application is pre-configured for instant deployment on Vercel:

1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset: **Angular**.
3. Root Directory: `./`.
4. Output Directory: `dist/stellar-media/browser`.
5. Build Command: `npm run build`.

`vercel.json` includes SPA route rewrites to ensure direct URL navigation works seamlessly.

---

## 9. AI Tools Used

In accordance with the assessment guidelines regarding AI-assisted workflows:

- **AI Code Generation:** Used for initial scaffolding of model interfaces and baseline SCSS token mapping from the design specifications.
- **Design Reference Analysis:** Used to extract exact visual hierarchy, spacing ratios, and typography weights from the provided Stitch desktop and mobile mockups.
- **Browser Automation Subagents:** Used to run headless end-to-end visual QA checks, simulating real user interactions across desktop (1440px), tablet (768px), and mobile (390px) viewports.

---

## 10. Manual Customizations & Architectural Improvements

Rather than accepting raw AI output, the following intentional engineering and architectural refinements were made:

1. **Angular 21 Standalone & Signals Architecture:**
   - Implemented reactive UI state using Angular Signals (`isMenuOpen`, `isScrolled`, `isVisible`, `isBriefingModalOpen`).
   - Enforced `ChangeDetectionStrategy.OnPush` across all components to eliminate unnecessary change detection cycles.
2. **Accessibility (WCAG AA Compliance):**
   - Added semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Added accessible dialog semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) with body scroll locking when modals are active.
   - Implemented keyboard accessibility (`Escape` key closes both the mobile navigation drawer and the briefing modal dialog).
   - Added visible focus indicators (`:focus-visible`) and high contrast text ratios exceeding 4.5:1.
   - Enforced `prefers-reduced-motion` media queries across all animations and transitions.
3. **Verified Information Integrity:**
   - Strictly avoided inventing fake client logos, fabricated awards, or unverified phone numbers.
   - Accurately adopted the verified copy from the assessment brief: *"Stellar Media is a marketing agency based in Abu Dhabi, UAE, working with government entities and major brands."*
   - Structured the contact section around an **Official Advisory Protocol** and an interactive **Institutional Briefing Request Dialog** with robust form validation.
4. **Performance Optimization:**
   - Preconnected Google Fonts (`Manrope` and `Inter`) in `index.html`.
   - Set `fetchpriority="high"` and `loading="eager"` on the hero visual to eliminate Cumulative Layout Shift (CLS).
   - Implemented CSS Grid with fluid clamp calculations, eliminating layout shifts across different screen sizes.

---

## 11. Known Limitations & Recommendations

- **Backend Integration:** The Institutional Briefing form operates with full client-side validation and feedback state. In a production environment with an active backend, this should connect to a secured government portal API (e.g. via Azure Government / AWS Middle East) or CRM webhook.
- **Bilingual Arabic Localization:** The website UI provides the visual locale badge (`EN / العربية`). Full Right-to-Left (RTL) localization can be completed using Angular's native `@angular/localize` package once the complete Arabic copy is approved by the client's editorial board.

---

## 12. Visual Verification & Screenshots

| Viewport | Screenshot Reference | Description |
| :--- | :--- | :--- |
| **Desktop (1440px)** | `public/screenshots/desktop-hero.png` | Hero section, typography, navigation, and Louvre Abu Dhabi visual |
| **Desktop Full** | `public/screenshots/desktop-full.png` | Full-length desktop landing page covering all 5 core sections |
| **Mobile (390px)** | `public/screenshots/mobile-hero.png` | Single-column mobile hero layout with stacked action buttons |
| **Mobile Navigation** | `public/screenshots/mobile-drawer.png` | Animated mobile drawer menu with backdrop blur and touch targets |
| **Briefing Dialog** | `public/screenshots/briefing-modal.png` | Interactive institutional briefing modal dialog with form validation |

---

*Authored by Senior Angular Developer for Stellar Media Technical Hiring Assessment.*
