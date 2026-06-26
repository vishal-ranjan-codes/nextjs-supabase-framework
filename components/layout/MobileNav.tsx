'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useAuth } from '@/hooks/use-auth'
import { signOutAndRedirect } from '@/lib/auth-utils'
import { navSections, topNavLinks } from '@/lib/navigation-data'
import { useRouter } from 'next/navigation'

export default function MobileNav() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { user, loading } = useAuth()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="w-9 h-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        {navSections.map((section) => (
                            <AccordionItem key={section.label} value={section.label.toLowerCase().replace(/\s+/g, '-')}>
                                <AccordionTrigger className="theme-fc-base">
                                    {section.label}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2 pl-4">
                                        {section.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="nav-menu-item py-2"
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="border-t theme-border-color pt-4 flex flex-col gap-2">
                        {topNavLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="nav-menu-item py-2"
                                onClick={() => setOpen(false)}
                            >
                                {link.title}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                href="/dashboard"
                                className="nav-menu-item py-2"
                                onClick={() => setOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {!loading && (
                        <>
                            {user ? (
                                <Button
                                    variant="outline"
                                    className="mt-4 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => {
                                        setOpen(false)
                                        signOutAndRedirect(router)
                                    }}
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <Button variant="default" className="mt-4" asChild>
                                    <Link href="/sign-in" onClick={() => setOpen(false)}>
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
