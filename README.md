# Stellar Media — Strategic Marketing & Institutional Creative

Production-grade web platform for **Stellar Media**, an institutional marketing and strategic communications agency based in Abu Dhabi, United Arab Emirates, serving sovereign entities, government organizations, and enterprise leaders.

---

## 1. Project Overview

- **Organization:** Stellar Media
- **Headquarters:** Abu Dhabi, United Arab Emirates
- **Core Market:** UAE & GCC (Government Mandates, Sovereign Focus, Enterprise Brands)
- **Architecture:** Angular 21 Standalone Components, Signal-based state management, full bilingual i18n (Arabic RTL / English LTR), and integrated Supabase backend.

---

## 2. Technology Stack

- **Framework:** Angular 21 (Standalone Components, Signals, Zoneless readiness)
- **Language:** TypeScript 5.9 (Strict mode enabled)
- **Styling:** Vanilla SCSS with CSS Custom Properties, Fluid typography, Flexbox, and CSS Grid
- **Backend / Database:** Supabase (PostgreSQL, Row Level Security, Storage, Realtime)
- **Localization:** Bilingual i18n (English & Arabic with native RTL layout support)
- **Testing:** Vitest & Angular Testbed
- **Deployment:** Vercel

---

## 3. Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # Data models and DTO interfaces
│   │   ├── services/         # Supabase, Translation, and State services
│   │   └── utils/            # Scroll lock and helper utilities
│   ├── data/                 # Seed datasets (Services, Approach, Navigation)
│   ├── features/
│   │   ├── auth/             # Authentication & Login views
│   │   ├── dashboard/        # Sovereign Admin Management Dashboard
│   │   └── home/             # Landing page sections (Hero, About, Services, Approach, Contact)
│   └── shared/
│       ├── components/       # Header, Footer, Service Cards, Dialogs
│       └── pipes/            # TranslatePipe
├── assets/
│   ├── i18n/                 # Localization dictionaries (ar.json, en.json)
│   └── images/               # Media assets and logos
└── environments/             # Environment configs (Production & Development)
```

---

## 4. Features

1. **Institutional Landing Page:**
   - Sticky frosted-glass navigation with dynamic scroll response.
   - High-impact Hero section with verified Abu Dhabi geographic mandate.
   - Comprehensive discipline showcase with modal briefing integration.
   - Strategic institutional pillars and operational methodology.
   - Full WCAG AA accessibility compliance, keyboard navigation, and semantic markup.

2. **Bilingual Localization (i18n):**
   - Instant language switching between English and Arabic.
   - Dynamic document direction (`dir="rtl"` / `dir="ltr"`).
   - Cairo typography for Arabic and Inter/Manrope for English.
   - Persistent language preference in `localStorage`.

3. **Supabase Integration & Management Dashboard:**
   - Centralized management for agency services, methodology steps, and client briefing requests.
   - Secure authentication with session persistence.
   - Complete CRUD operations with bilingual field support (`discipline_ar`, `discipline_en`, `title_ar`, `title_en`).
   - Row Level Security (RLS) policies for protected tables.

---

## 5. Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm (v10+)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
```bash
git clone https://github.com/abdelrahman8278/sws.git
cd sws
npm install
```

### Environment Setup
Configure your Supabase credentials in `src/environments/environment.ts` and `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
};
```

### Development Server
```bash
npm start
# or
ng serve --port 4200
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Testing
```bash
npm test -- --watch=false
```

### Production Build
```bash
npm run build
```
The build artifacts will be stored in the `dist/stellar-media` directory.

---

## 6. Deployment

Configured for deployment on Vercel:
- **Framework Preset:** Angular
- **Build Command:** `npm run build`
- **Output Directory:** `dist/stellar-media/browser`
- Direct routing handled via `vercel.json` rewrites.
