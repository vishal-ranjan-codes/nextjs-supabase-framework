# Design System Documentation

## Overview

This design system is built on Tailwind CSS v4.1.4 with custom design tokens and utilities. It supports light and dark themes with a Facebook blue color palette that creates a cohesive, accessible, and scalable design experience.

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography Scale](#typography-scale)
3. [Utility Classes](#utility-classes)
4. [Component Guidelines](#component-guidelines)
5. [Customization Guide](#customization-guide)
6. [Migration Guide](#migration-guide)
7. [Usage Examples](#usage-examples)

## Color Palette

### Light Theme

#### Primary Colors
- **Primary 100**: `#1877F2` - Full opacity for primary buttons and CTAs
- **Primary 75**: `#1877F2bf` - 75% opacity for hover states
- **Primary 50**: `#1877F280` - 50% opacity for disabled states
- **Primary 25**: `#1877F240` - 25% opacity for subtle backgrounds
- **Primary 12**: `#1877F21f` - 12% opacity for accent backgrounds
- **Primary 08**: `#1877F214` - 8% opacity for hover backgrounds
- **Primary 08**: `#1877F214` - 8% opacity for hover backgrounds
- **Primary 05**: `#1877F20d` - 5% opacity for very subtle tints

> **Developer Note:** Use the semantic utility classes (e.g., `.theme-bg-primary-color-75`) for primary brand colors to ensure consistency across the application. These classes automatically handle light/dark mode switching via CSS variables.

### ... [Skipped sections] ...

## Customization Guide

### For New Projects

1. **Copy the design system files:**
   ```bash
   # Copy app/globals.css
   # Copy component files
   ```

2. **Update brand colors (globals.css):**
   Modify the values in the `:root` (Light Mode) and `.dark` (Dark Mode) blocks.
   
   ```css
   :root {
     /* Light Mode Colors */
     --color-primary-100: #YOUR_BRAND_COLOR;
     --color-primary-75: #YOUR_BRAND_COLOR_BF;
   }
   
   .dark {
     /* Dark Mode Colors */
     --color-primary-100: #YOUR_DARK_BRAND_COLOR;
     --color-primary-75: #YOUR_DARK_BRAND_COLOR_BF;
   }
   ```

3. **Adjust typography scale:**
   Update the `--text-*` variables in the `@theme` block if needed, or move them to `:root` if you want responsive scaling variables.

### Adding New Colors

1. **Define variables in globals.css:**
   ```css
   :root {
     --color-success-100: #10B981;
   }
   .dark {
     --color-success-100: #34D399;
   }
   ```

2. **Map in @theme (Optional):**
   If you want to use standard Tailwind utilities (like `bg-success-100`), map it in the `@theme` block:
   ```css
   @theme {
     --color-success-100: var(--color-success-100);
   }
   ```

3. **Create semantic utility (Recommended):**
   ```css
   @utility theme-bg-success {
     background-color: var(--color-success-100);
   }
   ```

## Migration Guide

### From Tailwind v3 to v4

1. **Update imports:**
   ```css
   /* Old */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   /* New */
   @import 'tailwindcss';
   ```

2. **Update configuration:**
   ```js
   // tailwind.config.mjs
   export default {
     content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
     theme: {
       extend: {
         // Your custom theme extensions
       }
     }
   }
   ```

3. **Update dark mode:**
   ```css
   /* Old */
   .dark {
     --color-primary: #new-color;
   }
   
   /* New */
   --color-primary--dark: #new-color;
   ```

## Usage Examples

### Basic Page Layout

```html
<body class="theme-bg-color">
  <header class="theme-fg-color theme-border-color border-b">
    <div class="container">
      <h1 class="theme-h1">Page Title</h1>
    </div>
  </header>
  
  <main class="container py-8">
    <div class="box p-6">
      <h2 class="theme-h2">Section Title</h2>
      <p class="theme-fc-base">Body text with optimal readability</p>
      <button class="theme-bg-primary-color-100 theme-rounded px-4 py-2 text-white">
        Primary Action
      </button>
    </div>
  </main>
</body>
```

### Card with Multiple Elements

```html
<div class="box p-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="theme-h3">Card Title</h3>
    <span class="theme-text-muted text-sm">Status</span>
  </div>
  
  <p class="theme-fc-base mb-4">
    Card description with proper contrast and readability.
  </p>
  
  <div class="flex gap-2">
    <button class="theme-bg-primary-color-100 text-white px-4 py-2 theme-rounded">
      Primary
    </button>
    <button class="theme-border-color border px-4 py-2 theme-rounded theme-fc-base">
      Secondary
    </button>
  </div>
</div>
```

### Form Elements

```html
<form class="space-y-4">
  <div>
    <label class="theme-fc-heading text-sm font-medium">Email</label>
    <input 
      type="email" 
      class="theme-border-input border theme-rounded px-3 py-2 w-full theme-fc-base"
      placeholder="Enter your email"
    />
  </div>
  
  <button 
    type="submit" 
    class="theme-bg-primary-color-100 text-white px-6 py-2 theme-rounded"
  >
    Submit
  </button>
</form>
```

## Best Practices

1. **Always use theme utilities** instead of hardcoded colors
2. **Test in both light and dark modes** to ensure proper contrast
3. **Use semantic color names** (primary, secondary, destructive) for consistency
4. **Leverage the opacity variants** for layering effects
5. **Follow the typography scale** for consistent text sizing
6. **Use container utilities** for responsive layouts
7. **Document custom utilities** when extending the system

## Support

For questions or issues with the design system:

1. Check this documentation first
2. Review the utility class definitions in `globals.css`
3. Test components in both light and dark modes
4. Ensure proper contrast ratios for accessibility

---

*This design system is designed to be scalable, maintainable, and accessible. It provides a solid foundation for building consistent user interfaces across multiple projects.*
