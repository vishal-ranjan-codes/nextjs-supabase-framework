'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import MobileNav from './MobileNav'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { signOutAndRedirect } from '@/lib/auth-utils'
import { navSections, topNavLinks } from '@/lib/navigation-data'

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, loading } = useAuth()

    return (
        <header className="sticky top-0 z-50 theme-fg-color theme-border-color border-b backdrop-blur-sm bg-opacity-90">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and Site Title */}
                    <div className="flex items-center gap-3">
                        <Logo />
                        <Link href="/" className="theme-fc-heading hover:text-primary transition-colors">
                            <span className="font-semibold text-lg hidden sm:inline">
                                Framework
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navSections.map((section) => (
                                    <NavigationMenuItem key={section.label}>
                                        <NavigationMenuTrigger>
                                            {section.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className={section.gridClassName ?? 'grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2'}>
                                                {section.items.map((item) => (
                                                    <ListItem key={item.title} href={item.href} title={item.title}>
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {topNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'nav-menu-item px-3',
                                    pathname === link.href && 'text-primary'
                                )}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        {!loading && (
                            <>
                                {user ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                            className="hidden sm:inline-flex"
                                        >
                                            <Link href="/dashboard">Dashboard</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => signOutAndRedirect(router)}
                                            className="hidden sm:inline-flex text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        asChild
                                        className="hidden sm:inline-flex"
                                    >
                                        <Link href="/sign-in">Sign In</Link>
                                    </Button>
                                )}
                            </>
                        )}
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    )
}

const ListItem = ({
    className,
    title,
    children,
    href,
    ...props
}: {
    className?: string
    title: string
    children: React.ReactNode
    href: string
}) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        'block select-none space-y-1 theme-rounded p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/8 hover:text-accent-foreground focus:bg-primary/8',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium theme-fc-heading leading-none mb-1">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug theme-fc-light">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
