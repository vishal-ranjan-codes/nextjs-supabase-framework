import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Next.js + Supabase Framework',
    description: 'A comprehensive Next.js and Supabase framework starter with design system',
    keywords: ['Next.js', 'Supabase', 'Framework', 'Starter', 'Design System'],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-inter theme-bg-color theme-fc-base antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
