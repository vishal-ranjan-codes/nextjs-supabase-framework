export interface NavLinkItem {
    href: string
    title: string
    description?: string
}

export interface NavSection {
    label: string
    items: NavLinkItem[]
}

export const navSections: NavSection[] = [
    {
        label: 'Getting Started',
        items: [
            { href: '/', title: 'Introduction', description: 'Quick overview of the framework and its features' },
            { href: '/design-system', title: 'Design System', description: 'Comprehensive design tokens and components' },
            { href: '/', title: 'Installation', description: 'Step-by-step setup instructions' },
            { href: '/', title: 'Configuration', description: 'Environment variables and project setup' },
        ],
    },
    {
        label: 'Components',
        items: [
            { href: '/design-system#components', title: 'Form Elements', description: 'Inputs, selects, checkboxes, and more' },
            { href: '/design-system#components', title: 'Navigation', description: 'Menus, breadcrumbs, and tabs' },
            { href: '/design-system#components', title: 'Feedback', description: 'Alerts, toasts, and dialogs' },
            { href: '/design-system#components', title: 'Data Display', description: 'Tables, cards, and badges' },
        ],
    },
    {
        label: 'Examples',
        items: [
            { href: '/about', title: 'About Page', description: 'Example page with hero and content sections' },
            { href: '/contact', title: 'Contact Page', description: 'Form layout and validation patterns' },
            { href: '/design-system', title: 'Design System', description: 'Complete design system documentation' },
        ],
    },
]

export const topNavLinks: NavLinkItem[] = [
    { href: '/about', title: 'About' },
    { href: '/contact', title: 'Contact' },
]
