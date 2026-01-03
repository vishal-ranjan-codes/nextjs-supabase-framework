# Development Guide: Next.js + Supabase Framework

## Overview

This is a comprehensive Next.js 16 framework integrated with Supabase and a custom Design System built on Tailwind CSS v4. It is designed for scalability, performance, and developer experience.

**Tech Stack:**
- **Framework:** Next.js 16.1.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4.1.4
- **Database/Auth:** Supabase
- **UI Components:** Shadcn/UI + Custom Design System
- **State Management:** React Server Components + Hooks

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v20.9.0+ (Latest LTS recommended)
- npm or pnpm
- Supabase project credentials

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Installation & Run
```bash
npm install
npm run dev
```
Access the app at `http://localhost:3000`.

---

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages and layouts
│   ├── design-system/    # Documentation page for the design system
│   ├── globals.css       # Core CSS, Design Tokens, and Custom Utilities
│   └── layout.tsx        # Root layout with ThemeProvider
├── components/           # React Components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── ui/               # Reusable UI components (Buttons, Cards, Inputs)
├── lib/                  # Utilities and helper functions
│   └── utils.ts          # cn() helper for class merging
├── design-system/        # Design system specific assets/docs
└── public/               # Static assets
```

---

## 🎨 Design System Usage

This project uses a custom design system defined in `app/globals.css`. **Do not hardcode hex values.** Always use the defined CSS variables or utility classes.

### 1. Colors (Facebook Blue Theme)

**Primary Brand Colors:**
The design system provides specific utility classes for the primary color palette. These are defined as custom CSS classes in `globals.css` that map to our variables.

| Opacity | Background Class | Text Class | Variable |
|---------|------------------|------------|----------|
| 100% | `.theme-bg-primary-color-100` | `.theme-text-primary-color-100` | `--color-primary-100` |
| 75% | `.theme-bg-primary-color-75` | `.theme-text-primary-color-75` | `--color-primary-75` |
| 50% | `.theme-bg-primary-color-50` | `.theme-text-primary-color-50` | `--color-primary-50` |
| 25% | `.theme-bg-primary-color-25` | `.theme-text-primary-color-25` | `--color-primary-25` |
| 12% | `.theme-bg-primary-color-12` | `.theme-text-primary-color-12` | `--color-primary-12` |
| 5% | `.theme-bg-primary-color-05` | `.theme-text-primary-color-05` | `--color-primary-05` |

**Usage Example:**
```tsx
// Correct
<div className="theme-bg-primary-color-100 text-white p-4 theme-rounded">
  Primary Box
</div>

// Incorrect
<div className="bg-[#1877F2] text-white p-4 rounded-lg">
  Hardcoded Box
</div>
```

### 2. Layout & Surfaces

Use semantic utility classes that automatically adapt to Dark Mode.

| Purpose | Utility Class | Description |
|---------|---------------|-------------|
| Page BG | `.theme-bg-color` | Main page background |
| Section BG | `.theme-bg-color-dark` | Slightly darker sections |
| Card BG | `.theme-fg-color` | Card/Panel background |
| Borders | `.theme-border-color` | Standard borders |

### 3. Typography

Use the typography scale classes to ensure consistency.

```tsx
<h1 className="theme-h1">Page Title</h1>
<h2 className="theme-h2">Section Title</h2>
<p className="theme-fc-base">Body text</p>
<span className="theme-fc-light">Muted text</span>
```

---

## 🛠️ Development Workflow

### Creating New Pages
1. Create a folder in `app/` (e.g., `app/dashboard/`).
2. Add `page.tsx`.
3. Use the standard layout structure:

```tsx
export default function DashboardPage() {
  return (
    <div className="theme-bg-color min-h-screen py-12">
      <div className="container">
        <h1 className="theme-h1 mb-6">Dashboard</h1>
        {/* Content */}
      </div>
    </div>
  )
}
```

### Creating Components
1. Place reusable components in `components/ui` or specific feature folders.
2. support `className` prop merging using `cn()`:

```tsx
import { cn } from "@/lib/utils"

export function CustomCard({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("theme-fg-color theme-rounded p-6 theme-border-color border", className)}>
      {children}
    </div>
  )
}
```

### Client vs Server Components
- **Server Components (Default):** Use for data fetching, layouts, and static content.
- **Client Components:** Add `'use client'` at the top. Use for interactivity (`useState`, `useEffect`, event listeners). `new Date()` implies dynamic rendering, so wrap such logic or use Client Components if dependent on browser time/hydration.

---

## 🤖 Guide for AI Agents (Cursor, AntiGravity, etc.)

**When generating code:**
1. **Never hardcode styles.** Inspect `app/globals.css` to find the correct `theme-*` utility.
2. **Respect Dark Mode.** The design system handles this automatically if you use the semantic classes (e.g., `theme-bg-color` switches from white to black automatically).
3. **Use Tailwind v4 features.** The CSS variables are defined in the `@theme` block or custom CSS classes.
4. **Primary Colors:** Remember that for primary/brand colors, you MUST use the `theme-bg-primary-color-*` classes defined at the bottom of `globals.css` rather than generated Tailwind utilities (like `bg-primary-100`) to ensure opacity variants work correctly.
5. **Component Library:** Reuse components from `components/ui` (shadcn compatible) before creating new ones.
