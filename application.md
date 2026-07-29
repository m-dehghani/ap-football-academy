# 🏆 AP Football Academy — Workspace Overview

## 1. General Information

| Field | Value |
|-------|-------|
| **Project Name** | AP Football Academy (آکادمی فوتبال AP) |
| **Location** | Shiraz, Iran (شیراز، ایران) |
| **Domain** | Football (Soccer) Youth & Adult Training Academy |
| **Workspace Type** | Nx Monorepo |
| **Package Manager** | pnpm (preferred) |
| **Primary Language** | TypeScript (all apps) / Python (crawler) |
| **UI Direction** | RTL (Right-to-Left) — Persian/Farsi primary |

## 2. High-Level Architecture

```
ap-football-academy/
├── apps/
│   ├── website/          ← Next.js public-facing website (RTL, Persian)
│   ├── mobile/           ← Expo React Native mobile app
│   └── crawler/          ← Python LLM crawler for Persian football intelligence
├── packages/
│   └── db/               ← Shared Prisma database layer (Prisma Client, schema, seed)
├── prisma/               ← Prisma schema & migration files
├── docs/                 ← Workspace documentation
└── AGENTS.md             ← Agent-specific project guidelines
```

### Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Website    │────▶│   PostgreSQL │◀────│    Crawler   │
│  (Next.js)   │     │   (Prisma)   │     │  (Python)    │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │   Mobile     │
                     │   (Expo)     │
                     └──────────────┘
```

---

## 3. Project: `apps/website` (Next.js)

### 3.1 Overview

| Field | Value |
|-------|-------|
| **Package Name** | `@ap-football-academy/website` |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + custom design system |
| **Direction** | RTL (Persian/Farsi) |
| **Font Family** | Vazirmatn (Google Fonts — Persian-optimized) |
| **Database** | PostgreSQL via Prisma ORM |
| **Authentication** | NextAuth.js v5 (credentials provider) |
| **Deployment Target** | Vercel (see `vercel.json`) |

### 3.2 Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router, Server Components) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + `tailwindcss-animate` + `tailwindcss-textshadow` |
| **Icons** | Heroicons (24/outline) + custom SVG icons |
| **Fonts** | Vazirmatn (Google Fonts) + Next.js `next/font/google` |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js v5 (credentials) |
| **Validation** | Zod schemas (in `src/validations/`) |
| **Animations** | Tailwind utility classes (no external animation library) |
| **Date** | `date-fns` + `date-fns-jalali` (Jalali/Persian calendar) |
| **Number** | `safarirnd` (Persian numeral conversion) |
| **Deployment** | Vercel |

### 3.3 Project Structure

```
apps/website/
├── public/                    # Static assets (images, icons, placeholders)
│   ├── images/                # Academy photos, hero backgrounds, facility images
│   ├── icons/                 # SVG icons (location, phone, email)
│   └── ...
├── src/
│   ├── app/                   # Next.js App Router (page-based routing)
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── sign-in/       # Login page
│   │   │   ├── sign-up/       # Registration page
│   │   │   └── layout.tsx     # Auth layout
│   │   ├── admin/             # Admin dashboard (protected)
│   │   │   ├── dashboard/     # Admin home
│   │   │   ├── programs/      # Program CRUD
│   │   │   ├── students/      # Student management
│   │   │   ├── registrations/ # Registration management
│   │   │   ├── news/          # News management
│   │   │   ├── settings/      # Academy settings
│   │   │   ├── coaches/       # Coach management
│   │   │   ├── news-categories/
│   │   │   ├── success-stories/
│   │   │   ├── programs-categories/
│   │   │   ├── testimonials/
│   │   │   └── layout.tsx     # Admin layout with sidebar
│   │   ├── programs/          # Public program pages
│   │   │   ├── [slug]/        # Individual program detail page
│   │   │   └── page.tsx       # Programs listing page
│   │   ├── news/              # News section
│   │   │   ├── [slug]/        # Individual news article
│   │   │   └── page.tsx       # News listing
│   │   ├── success-stories/   # Student success stories
│   │   ├── about/             # Academy "About Us" page
│   │   ├── contact/           # Contact page with form
│   │   ├── faq/               # FAQ page
│   │   ├── register/          # Public registration page
│   │   ├── globals.css        # Global styles + Tailwind imports + custom CSS
│   │   ├── layout.tsx         # Root layout (RTL dir="rtl", Vazirmatn font, metadata)
│   │   ├── page.tsx           # Landing/hero page
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── robots.ts          # Robots.txt
│   ├── components/            # Reusable React components
│   │   ├── ui/                # Base UI components (Button, Card, Badge, Input, etc.)
│   │   ├── layout/            # Layout components (Header, Footer, Navbar, Sidebar, etc.)
│   │   ├── home/              # Landing page section components
│   │   │   ├── Hero.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── CoachSpotlight.tsx
│   │   │   ├── SuccessStories.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── News.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── ...
│   │   ├── admin/             # Admin-specific components
│   │   │   ├── DataTable.tsx
│   │   │   ├── ProgramForm.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   ├── CoachForm.tsx
│   │   │   ├── NewsForm.tsx
│   │   │   └── ...
│   │   ├── programs/          # Program-related components
│   │   ├── register/          # Registration form components
│   │   ├── news/              # News-related components
│   │   └── ...
│   ├── lib/                   # Shared utilities
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── utils.ts           # General utilities (cn, format helpers)
│   │   ├── auth.ts            # NextAuth config
│   │   └── ...
│   ├── validations/           # Zod schemas for form validation
│   │   ├── program.ts
│   │   ├── student.ts
│   │   ├── coach.ts
│   │   ├── registration.ts
│   │   └── ...
│   └── types/                 # TypeScript type definitions
│       ├── program.ts
│       ├── student.ts
│       ├── coach.ts
│       └── ...
├── prisma/                    # (symlinked from workspace root)
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── middleware.ts              # Next.js middleware (auth guards, redirects)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind + custom theme (colors, animations)
├── tsconfig.json              # TypeScript config
├── package.json
└── vercel.json                # Vercel deployment config
```

### 3.4 Database Schema (Prisma)

The database is defined in `prisma/schema.prisma` and shared via the `@ap-football-academy/db` package. Key entities:

| Entity | Purpose |
|--------|---------|
| `Program` | Training programs (name, description, price, duration, age range, level, etc.) |
| `ProgramCategory` | Categories for organizing programs |
| `Coach` | Coach information (name, bio, certifications, experience, etc.) |
| `Student` | Student profiles (personal info, birth date, medical info, etc.) |
| `Registration` | Student-to-program enrollment records |
| `News` | News articles (title, content, slug, category, images, status) |
| `NewsCategory` | News categories |
| `SuccessStory` | Student success stories/testimonials |
| `Testimonial` | General testimonials |
| `Setting` | Academy settings (key-value store for configurable values) |
| `Account` | NextAuth account |
| `Session` | NextAuth session |
| `VerificationToken` | NextAuth verification token |
| `User` | NextAuth user |

### 3.5 API Routes (`src/pages/api/`)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/programs` | GET | List active programs (with coach info) |
| `/api/programs/[id]` | GET | Get single program details |
| `/api/register` | POST | Handle public registration submissions |
| `/api/students` | GET/POST | Student CRUD operations |
| `/api/crawler-news` | GET | Fetch/process crawler news data |
| `/api/get-session` | GET | Retrieve NextAuth session |
| `/api/webhook` | POST | Webhook handler (likely for payment) |

> **Note:** API routes use the legacy Pages Router pattern. New routes should prefer the App Router `src/app/api/` directory.

### 3.6 Admin Dashboard

A full admin panel under `/admin` with the following modules:

- **Dashboard** — Overview stats (total students, programs, registrations, revenue)
- **Programs** — CRUD for training programs with categories, coaches, pricing
- **Students** — Student management (add/edit/view/search)
- **Registrations** — Manage student enrollments
- **Coaches** — Coach profiles, certifications, experience
- **News** — Article management with categories and rich content
- **Success Stories** — Student achievement stories
- **Testimonials** — General testimonials
- **Program Categories** — Program categorization
- **News Categories** — News categorization
- **Settings** — Academy configuration (key-value)

### 3.7 Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero section, programs preview, coaches, success stories, testimonials, stats, CTA |
| **Programs** | `/programs` | All programs listing with filters |
| **Program Detail** | `/programs/[slug]` | Individual program details, enrollment CTA |
| **News** | `/news` | News listing |
| **News Article** | `/news/[slug]` | Full article with related content |
| **Success Stories** | `/success-stories` | Student achievements and testimonials |
| **About** | `/about` | Academy history, mission, facilities |
| **Contact** | `/contact` | Contact form, map, info |
| **FAQ** | `/faq` | Frequently asked questions |
| **Register** | `/register` | Public registration form |
| **Sign In** | `/sign-in` | Admin login |
| **Sign Up** | `/sign-up` | Admin registration |

### 3.8 Design System

| Token | Value |
|-------|-------|
| **Primary Color** | `#059669` (emerald green) |
| **Secondary Color** | `#0891b2` (cyan/teal) |
| **Accent Color** | `#f59e0b` (amber) |
| **Font Family** | Vazirmatn (Google Fonts) |
| **Direction** | RTL (`dir="rtl"`) |
| **Style** | Glassmorphism cards, gradient backgrounds, rounded corners |
| **Custom Classes** | `card-glass`, `btn`, `gradient-text`, `persian-numbers`, `section-padding`, `container-custom` |

### 3.9 Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (images, redirects, rewrites) |
| `tailwind.config.ts` | Tailwind theme (custom colors, animations, text-shadow) |
| `middleware.ts` | Auth guards for `/admin` routes, redirects |
| `vercel.json` | Vercel deployment settings |
| `tsconfig.json` | TypeScript path aliases (`@/*` → `src/*`) |

---

## 4. Project: `apps/mobile` (Expo React Native)

| Field | Value |
|-------|-------|
| **Package Name** | `@ap-football-academy/mobile` |
| **Framework** | Expo SDK ~53 |
| **Runtime** | React Native 0.79 + React 19 |
| **Navigation** | React Navigation (Bottom Tabs + Stack) |
| **Language** | TypeScript |
| **Purpose** | Mobile companion app for the academy (student/coach portal) |
| **State** | Not yet determined (likely context or Zustand) |

### 4.1 Dependencies

| Category | Packages |
|----------|----------|
| **Navigation** | `@react-navigation/bottom-tabs`, `@react-navigation/stack` |
| **UI** | `@expo/vector-icons`, `expo-linear-gradient` |
| **Networking** | `axios` |
| **Expo** | `expo-font`, `expo-status-bar`, `expo` |
| **React Native** | `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-screens`, `react-native-web` |

### 4.2 Status

> ⚠️ **Early stage** — Basic Expo project scaffolded. Core features, navigation structure, and screen implementations are pending. This project will consume APIs from the `website` project or a future backend service.

---

## 5. Project: `apps/crawler` (Python)

| Field | Value |
|-------|-------|
| **Name** | Football Intelligence Crawler |
| **Language** | Python 3.8+ |
| **Framework** | FastAPI |
| **Purpose** | Web crawling + LLM-powered extraction of Persian football content |
| **Target Sources** | Varzesh3, Persian Football, Football Iran, ISNA |

### 5.1 Capabilities

- **Web Crawling**: Playwright-based scraping with rate limiting and anti-bot evasion
- **LLM Processing**: GPT-4 integration for content analysis, sentiment, entity extraction
- **Data Storage**: PostgreSQL + Redis caching
- **API**: FastAPI-based REST API for querying crawled data

### 5.2 Key Components

| Component | Description |
|-----------|-------------|
| `crawler/spiders/` | Web scraping spiders for Persian football sites |
| `crawler/agents/` | LLM agent for content analysis |
| `crawler/database/` | PostgreSQL connection management |
| `crawler/utils/` | Persian text processing, prompt templates, rate limiting |

### 5.3 Integration

The crawler feeds processed football news into the academy's database, enriching the `News` entity on the website with latest Persian football content.

---

## 6. Package: `packages/db` (Shared Database Layer)

| Field | Value |
|-------|-------|
| **Package Name** | `@ap-football-academy/db` |
| **Purpose** | Shared Prisma schema, client, and seed data |
| **ORM** | Prisma |
| **Database** | PostgreSQL |

### 6.1 Structure

```
packages/db/
├── prisma/
│   └── schema.prisma      # Shared Prisma schema
├── src/
│   └── index.ts           # Prisma client export
├── seed.ts                # Database seed script
└── package.json
```

---

## 7. Nx Workspace Configuration

### 7.1 Project Graph

```
@ap-football-academy/website
├── depends on → @ap-football-academy/db
└── depends on → apps/crawler (data source)

@ap-football-academy/mobile
├── depends on → @ap-football-academy/db (future API consumption)
└── depends on → apps/crawler (future data source)
```

### 7.2 Key Nx Commands

```bash
# Run tasks
pnpm nx run website:dev          # Start website dev server
pnpm nx run website:build        # Build website
pnpm nx run website:lint         # ESLint
pnpm nx run website:test         # Tests

pnpm nx run mobile:android       # Start Expo Android
pnpm nx run mobile:ios           # Start Expo iOS

pnpm nx run-many -t lint test build   # All projects
```

---

## 8. Environment Variables

### Website (`.env` / Vercel env vars)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth signing secret |
| `NEXTAUTH_URL` | NextAuth callback URL |
| `REDIS_URL` | Redis connection (for crawler) |

### Crawler (`.env`)

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | OpenAI API key for LLM processing |
| `DATABASE_URL` | PostgreSQL connection |
| `REDIS_URL` | Redis connection |
| `CRAWLER_DELAY` | Request delay between crawls |

---

## 9. Development Guidelines

### Website Development

1. **RTL First**: All components must be designed for RTL (Persian) layout. Use `space-x-reverse` and `rtl` utilities in Tailwind.
2. **Server Components**: Prefer Server Components (RSC) in the App Router. Use `'use client'` only when interactivity is needed.
3. **Data Fetching**: Fetch data in Server Components or Server Actions. Avoid client-side fetching where possible.
4. **Validation**: Use Zod schemas in `src/validations/` for all form data.
5. **Admin Auth**: Admin routes are guarded by `middleware.ts`. Only authenticated users can access `/admin`.
6. **Database**: Access via `@ap-football-academy/db` package. Use `prisma` singleton from `src/lib/db.ts`.
7. **New Pages**: Add to `src/app/` following the existing route group pattern.
8. **New Components**: Place in the appropriate `src/components/` subdirectory (or create one).
9. **New Types**: Add to `src/types/` matching the entity name.

### Database Changes

1. Edit `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev` to generate migration
3. Update types: `pnpm prisma generate`
4. Update seed if needed in `prisma/seed.ts`

### Mobile Development

1. `pnpm nx run mobile:android` — start Expo dev server for Android
2. `pnpm nx run mobile:ios` — start Expo dev server for iOS
3. `pnpm nx run mobile:clear` — clear Expo cache

### Crawler Development

1. Requires Python 3.8+, PostgreSQL, Redis
2. `pip install -r requirements.txt`
3. `playwright install`
4. `python main.py server` — start API
5. `python main.py crawl --sites varzesh3 --max-pages 50` — run crawl

---

## 10. Deployment

### Website

- **Platform**: Vercel
- **Config**: `apps/website/vercel.json`
- **Build**: `next build`
- **Environment**: Set all env vars in Vercel dashboard

### Mobile

- **Platform**: Expo (EAS Build for production)
- **Distribution**: Google Play Store + Apple App Store

### Crawler

- **Platform**: Self-hosted or cloud (Docker support included)
- **Services**: PostgreSQL + Redis required

---

## 11. Glossary (Persian → English)

| Persian | English |
|---------|---------|
| آکادمی فوتبال AP | AP Football Academy |
| برنامه‌ها | Programs |
| مربیان | Coaches |
| دانش‌آموزان | Students |
| ثبت‌نام | Registration |
| اخبار | News |
| داستان‌های موفقیت | Success Stories |
| سوالات متداول | FAQ |
| درباره ما | About Us |
| تماس با ما | Contact Us |
| ورود | Sign In |
| عضویت | Sign Up |
| پنل مدیریت | Admin Dashboard |

---

*Document created for agent reference. Last updated: 2025.*
