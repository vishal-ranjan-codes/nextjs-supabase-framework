# Next.js + Supabase Framework

A comprehensive Next.js and Supabase framework starter with a complete design system, shadcn/ui components, and best practices for building modern web applications.

## Features

- **Modern Stack**: Next.js 15.3.1, React 19, TypeScript, Tailwind CSS v4
- **Supabase Integration**: Pre-configured with latest connection methods
- **Design System**: Comprehensive design tokens with Facebook blue brand colors
- **40+ Components**: shadcn/ui components built with Radix UI
- **Light/Dark Themes**: Fully themed with consistent branding across modes
- **Example Pages**: Ready-to-use pages demonstrating patterns and layouts
- **Type Safe**: Full TypeScript support throughout

## Quick Start

### Prerequisites

- Node.js 20.9 or newer
- npm, yarn, or pnpm
- Supabase account (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-supabase-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your Supabase project details:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

   You can find these values in your [Supabase project settings](https://app.supabase.com/project/_/settings/api).

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-supabase-framework/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── contact/             # Contact page with form
│   ├── design-system/       # Design system documentation
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── layout/              # Layout components (Header, Footer, etc.)
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── supabase/            # Supabase client configuration
│   └── utils/               # Utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Design System

This framework includes a comprehensive design system with:

- **Color Palette**: Facebook blue brand colors with opacity variants
- **Typography Scale**: Consistent heading and text sizing (h1-h6)
- **Spacing System**: Container widths and spacing utilities
- **Component Library**: 40+ pre-built, accessible components
- **Theme Support**: Seamless light/dark mode switching

View the complete design system documentation at `/design-system`.

## Environment Variables

### Required

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

### Optional

- `SUPABASE_SERVICE_ROLE_KEY`: Server-side operations (keep secret, never expose to client)

> **Important**: Variables prefixed with `NEXT_PUBLIC_` are accessible in the browser. Never put sensitive data in these variables.

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your API keys from Project Settings → API
3. Enable Row Level Security (RLS) on your tables
4. Generate TypeScript types:
   ```bash
   npm run supabase:types
   ```

For more details, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md).

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run supabase:types` - Generate TypeScript types from Supabase

## Building Your Application

1. **Remove Example Content**: Delete or modify the example pages in `app/about`, `app/contact`
2. **Update Branding**: Replace the logo in `components/layout/Logo.tsx`
3. **Customize Colors**: Adjust design tokens in `app/globals.css` if needed
4. **Add Features**: Build new pages and components using the design system
5. **Configure Supabase**: Set up your database schema and APIs

## Design Tokens

All design tokens are defined in `app/globals.css` under the `@theme` block:

- Primary brand colors (Facebook blue variations)
- Typography colors (heading, base, light, lighter)
- Layout colors (backgrounds, foregrounds, borders)
- Spacing and sizing utilities

Use theme utilities in your components:
```tsx
<div className="theme-bg-color theme-fc-base">
  <h1 className="theme-h1">Hello World</h1>
  <Button className="theme-bg-primary-color-100">Click me</Button>
</div>
```

## Component Usage

All components are built with shadcn/ui and Radix UI primitives. Import and use them like this:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Best Practices

1. **Always use theme utilities** instead of hardcoded colors
2. **Test both themes** - verify all pages work in light and dark mode
3. **Follow TypeScript** - leverage type safety for better DX
4. **Use semantic HTML** - ensure accessibility
5. **Responsive design** - test on mobile, tablet, and desktop
6. **Container widths** - use provided container utilities

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

## Contributing

This is a framework starter template. Feel free to:

- Fork and customize for your projects
- Improve the design system
- Add new components
- Share improvements back

## License

MIT License - feel free to use this in your projects.

---

**Built with ❤️ for developers**
