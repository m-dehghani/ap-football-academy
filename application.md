# AP Football Academy - Monorepo Overview

## 📋 Project Summary

**AP Football Academy** is a professional football (soccer) training academy based in Shiraz, Iran. This monorepo manages the entire digital ecosystem for the academy — from public-facing marketing website to internal management tools and mobile applications.

The academy offers professional football training programs for ages 8–30, with expert coaches, modern facilities, and comprehensive development programs.

---

## 🏗️ Monorepo Structure

```
ap-football-academy/
├── apps/
│   ├── website/          # Next.js public-facing website (marketing + client portal)
│   ├── admin/            # Admin dashboard (in development)
│   └── mobile/           # React Native mobile app (in development)
├── packages/
│   ├── database/         # Shared Prisma schema & database client
│   └── shared/           # Shared utilities, types, and components
├── .agents/              # AI agent skills and configurations
├── nx.json               # Nx workspace configuration
├── package.json
└── tsconfig.base.json    # Base TypeScript configuration
```

---

# 🌐 apps/website — Public Website (Next.js)

## 📖 Description

The `apps/website` is the public-facing marketing website for AP Football Academy. Built with **Next.js** using the **Pages Router**, it serves as the primary digital presence for the academy — showcasing training programs, coach profiles, facilities, and providing a client portal for student management.

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | **Next.js** (Pages Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Database ORM | **Prisma** (PostgreSQL) |
| UI Components | **shadcn/ui** + **Radix UI** |
| Icons | **Heroicons** |
| Forms | **React Hook Form** + **Zod** validation |
| Notifications | **react-hot-toast** |
| SEO | **next-seo** |
| Animations | **Framer Motion** |
| Charts | **Recharts** |
| Map | **Leaflet** (for facility locations) |
| State | **Zustand** |
| Build Tool | **Turbopack** (via Nx) |

### Key Dependencies

```
next, react, react-dom, tailwindcss, postcss, autoprefixer
@prisma/client, prisma
@radix-ui/* (dialog, tabs, cards, select, etc.)
shadcn/ui
@heroicons/react
framer-motion
react-hook-form, zod
zustand
react-hot-toast
next-seo
recharts
leaflet, react-leaflet
```

---

## 📁 Directory Structure

```
apps/website/
├── prisma/
│   ├── schema.prisma     # Database schema (PostgreSQL)
│   └── seed.ts           # Database seeding script
├── src/
│   ├── pages/            # Next.js Pages Router
│   │   ├── _app.tsx      # App wrapper (SEO, Toaster, global styles)
│   │   ├── _document.tsx # Custom Document (RTL support, fonts)
│   │   ├── index.tsx     # Home page (hero, programs, stats, testimonials)
│   │   ├── about.tsx     # About page (mission, history, values)
│   │   ├── programs.tsx  # Programs listing page
│   │   ├── program/[id].tsx  # Individual program detail page
│   │   ├── coaches.tsx   # Coaches listing page
│   │   ├── coach/[id].tsx    # Individual coach profile page
│   │   ├── facilities.tsx    # Facilities showcase
│   │   ├── testimonials.tsx  # Testimonials page
│   │   ├── contact.tsx       # Contact form & info
│   │   ├── register.tsx      # Registration form
│   │   ├── login.tsx         # Student login
│   │   ├── dashboard.tsx     # Student dashboard
│   │   ├── admin/            # Admin pages
│   │   │   ├── index.tsx
│   │   │   ├── programs.tsx
│   │   │   ├── students.tsx
│   │   │   └── payments.tsx
│   │   ├── api/            # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── programs/
│   │   │   │   └── route.ts
│   │   │   ├── registrations/
│   │   │   │   └── route.ts
│   │   │   ├── payments/
│   │   │   │   └── route.ts
│   │   │   └── ...
│   │   └── ...
│   ├── components/
│   │   ├── Layout.tsx          # Page layout wrapper (Header + Footer)
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ProgramCard.tsx     # Program listing card
│   │   ├── CoachCard.tsx       # Coach listing card
│   │   ├── TestimonialCard.tsx # Testimonial display
│   │   ├── RegistrationForm.tsx# Registration form
│   │   ├── LoginForm.tsx       # Login form
│   │   ├── Dashboard/          # Dashboard components
│   │   │   ├── StudentPanel.tsx
│   │   │   ├── PaymentHistory.tsx
│   │   │   └── Attendance.tsx
│   │   └── Admin/              # Admin panel components
│   │       ├── ProgramManager.tsx
│   │       ├── StudentManager.tsx
│   │       └── PaymentManager.tsx
│   ├── lib/
│   │   ├── db.ts           # Prisma client singleton
│   │   └── utils.ts        # Shared utilities
│   ├── styles/
│   │   └── globals.css     # Global styles + Tailwind imports
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand stores
│   └── next-seo.config.ts  # Default SEO configuration
├── public/                 # Static assets (images, fonts, etc.)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
└── .env                    # Environment variables
```

---

## 🗄️ Database Schema (Prisma)

The database uses **PostgreSQL** and defines the following core models:

### User Model
- `id` (cuid), `email` (unique), `password`, `firstName`, `lastName`, `phone` (nullable)
- `role`: Enum (STUDENT, ADMIN, COACH)
- Relations: registrations, payments, attendance, evaluations

### Coach Model
- `id`, `firstName`, `lastName`, `email` (unique), `phone`, `specialization`
- `experience` (years), `createdAt`, `updatedAt`
- Relations: programs, sessions, evaluations

### Program Model
- `id`, `name`, `description`, `price` (Toman), `duration` (months), `sessionCount`
- `maxStudents` (default: 15), `isActive`, `popular`
- `icon`, `ageRange`, `color`, `period`, `rating`, `studentsEnrolled`
- `features` (string array)
- `level`: string
- Relations: coach (many-to-one), schedules, registrations, sessions

### Schedule Model
- `id`, `day`, `time`
- Relation: program (one-to-many)

### Registration Model
- `id`, `status` (PENDING, APPROVED, CANCELLED, COMPLETED), `totalAmount`, `paidAmount`
- `registeredAt`, `updatedAt`
- Relations: user, program, payments

### Payment Model
- `id`, `amount`, `status` (PENDING, COMPLETED, FAILED, REFUNDED)
- `method` (ONLINE, CASH, BANK_TRANSFER), `stripeId` (nullable)
- `createdAt`, `updatedAt`
- Relations: user, registration

### Session Model
- `id`, `name`, `description`, `date`, `duration` (minutes), `location`
- `maxCapacity` (default: 15), `status` (SCHEDULED, ONGOING, COMPLETED, CANCELLED)
- `createdAt`, `updatedAt`
- Relations: program, coach, attendance

### Attendance Model
- `id`, `status` (PRESENT, ABSENT, LATE, EXCUSED), `notes`
- `createdAt`, `updatedAt`
- Relations: user, session
- Unique constraint: `[userId, sessionId]`

### Evaluation Model
- `id`, `technical` (1-10), `physical` (1-10), `mental` (1-10), `teamwork` (1-10), `overall` (1-10)
- `notes`, `createdAt`, `updatedAt`
- Relations: user, coach

---

## 📄 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Home page — hero section, featured programs, statistics, testimonials, CTA |
| `/about` | About the academy — mission, history, values |
| `/programs` | All training programs listing |
| `/program/[id]` | Individual program detail page |
| `/coaches` | Coach profiles listing |
| `/coach/[id]` | Individual coach profile |
| `/facilities` | Facility showcase with map |
| `/testimonials` | Student testimonials |
| `/contact` | Contact form and information |
| `/register` | Student registration form |
| `/login` | Student login |
| `/dashboard` | Student dashboard — attendance, payments, evaluations |
| `/admin` | Admin panel entry point |
| `/admin/programs` | Admin program management |
| `/admin/students` | Admin student management |
| `/admin/payments` | Admin payment management |

---

## 🔌 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/login` | POST | Student authentication |
| `/api/auth/register` | POST | Student registration |
| `/api/programs` | GET | Fetch all programs |
| `/api/registrations` | POST | Create registration |
| `/api/payments` | POST | Process payment |

---

## 🔧 Configuration

### Environment Variables (`.env`)
```env
SQLITE_DATABASE_URL=file:./dev.db
DATABASE_URL="postgresql://postgres:password@localhost:5432/AP"
```

### TypeScript (`tsconfig.json`)
- **Target**: ES2022
- **Module**: `preserve` (for bundler)
- **Module Resolution**: `bundler`
- **JSX**: `react-jsx`
- **Strict mode**: Enabled
- **Path aliases**: `@/*` → `./src/*`
- **Incremental**: Enabled
- **Includes**: `src/**/*.ts,tsx,js,jsx`, `prisma/**/*.ts`

### Next.js Config
- **Output**: Standalone (for Docker/container deployment)
- **Trailing slashes**: Enabled
- **Image domains**: `images.unsplash.com`, `placehold.co`, `res.cloudinary.com`
- **Analytics**: Vercel Analytics enabled
- **Dev**: Uses Turbopack

---

## 🎨 Styling

- **Tailwind CSS** with custom theme (colors, fonts, spacing)
- **shadcn/ui** components (Radix UI primitives)
- **RTL support** via custom Document (`_document.tsx`) — important for Persian/Farsi language
- **Global styles** in `globals.css` with Tailwind directives

---

## 📦 Nx Integration

The website is managed as an Nx workspace target. Key Nx tasks:

| Task | Command | Description |
|------|---------|-------------|
| Dev | `nx dev website` | Start development server |
| Build | `nx build website` | Build for production |
| Lint | `nx lint website` | ESLint checks |
| Test | `nx test website` | Run tests |
| E2E | `nx e2e website` | Run E2E tests |

---

## ⚠️ Known Issues & Notes

### 1. `'use server'` Directive Misuse in `programs.tsx`
The `apps/website/src/pages/programs.tsx` file has `'use server'` at the top. **This is incorrect.** The `'use server'` directive is for the **App Router** (React Server Components) and should NOT be used in Pages Router files.

**Correct approach for Pages Router:**
- Use `getServerSideProps()` for server-side data fetching
- Use `getStaticProps()` for static generation
- Use API routes (`/api/*`) for server-side logic
- Client components need `'use client'` if they use `useState`, `useEffect`, or browser APIs

### 2. `db.ts` Exports a Promise
The `getPrisma()` function returns a Promise, but it's exported as `export const prisma = getPrisma();`. This means `prisma` is a `Promise<PrismaClient>`, not a `PrismaClient` instance. Consumers must `await` it before use.

**Recommendation:** Use a proper singleton pattern:
```ts
let prisma: PrismaClient | undefined;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
export const prisma = global.prisma;
```

### 3. Environment Variable Mismatch
The `.env` file has both `SQLITE_DATABASE_URL` and `DATABASE_URL` (PostgreSQL). The Prisma schema targets PostgreSQL, but the SQLite URL may cause confusion. Ensure the correct `DATABASE_URL` is used in production.

### 4. No i18n Configuration
Despite RTL support in the Document, there's no Next.js i18n configuration set up for Persian/Farsi language support. Consider adding:
```js
// next.config.js
module.exports = {
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    localeDetection: true,
  },
};
```

---

## 🚀 Development Workflow

1. **Start dev server**: `nx dev website` (uses Turbopack)
2. **Database migrations**: `npx prisma migrate dev` (in `apps/website/`)
3. **Database seeding**: `npx prisma db seed` (in `apps/website/`)
4. **Build**: `nx build website`
5. **Lint**: `nx lint website`
6. **Test**: `nx test website`

---

## 📝 Future Expansion Plans

- **Admin dashboard** (`apps/admin`) — Full management interface for coaches, students, programs
- **Mobile app** (`apps/mobile`) — React Native app for students to track progress, schedule, payments
- **Shared packages** — Extract common types, utilities, and API clients to `packages/shared`
- **i18n** — Full Persian/Farsi + English bilingual support
- **Stripe integration** — Payment processing for program registration
- **Real-time features** — WebSocket for live updates (attendance, messages)
- **Admin API** — RESTful API for the admin dashboard

---

*This document should be updated as the project evolves. Focus now is on the `apps/website` project; other projects will be documented in future iterations.*
