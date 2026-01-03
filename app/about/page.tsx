import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'About | Next.js + Supabase Framework',
    description: 'Learn more about our Next.js and Supabase framework starter',
}

export default function AboutPage() {
    return (
        <div className="theme-bg-color">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="theme-h1 text-4xl md:text-5xl mb-6">
                            About Our Framework
                        </h1>
                        <p className="theme-fc-light text-lg md:text-xl">
                            A comprehensive starter built with modern tools and best practices for rapid application development.
                        </p>
                    </div>
                </div>

                {/* Gradient Background */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute right-0 top-0 theme-bg-primary-color-05 blur-3xl w-[600px] h-[400px] rounded-full" />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container-max-lg">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="theme-h2 mb-4">Built for Developers</h2>
                            <p className="theme-fc-base mb-4">
                                This framework was created to streamline the development process for Next.js applications
                                that use Supabase as their backend. It includes everything you need to get started quickly
                                while maintaining flexibility and scalability.
                            </p>
                            <p className="theme-fc-light">
                                Whether you're building a SaaS platform, a content management system, or a data-driven
                                application, this framework provides the foundation you need with best practices baked in.
                            </p>
                        </div>
                        <div className="box p-8 theme-bg-primary-color-05">
                            <h3 className="theme-h4 mb-4">Key Features</h3>
                            <ul className="space-y-3">
                                {keyFeatures.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 theme-text-primary-color-100 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="theme-fc-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-20">
                        <h2 className="theme-h2 text-center mb-12">Technology Stack</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {techStack.map((tech) => (
                                <div key={tech.name} className="box p-6 text-center hover:theme-bg-primary-color-05 transition-colors">
                                    <div className="theme-bg-primary-color-12 theme-rounded w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <tech.icon className="w-8 h-8 theme-text-primary-color-100" />
                                    </div>
                                    <h3 className="theme-h5 mb-2">{tech.name}</h3>
                                    <p className="theme-fc-light text-sm">{tech.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Design System Section */}
                    <div className="box p-10 theme-bg-color-dark text-center">
                        <h2 className="theme-h2 mb-4">Comprehensive Design System</h2>
                        <p className="theme-fc-light text-lg mb-8 max-w-2xl mx-auto">
                            Every component, color, and typography choice is documented and consistent.
                            Built with Tailwind CSS v4 and designed for both light and dark themes.
                        </p>
                        <Button size="lg" asChild>
                            <Link href="/design-system">Explore Design System</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 theme-bg-color-dark">
                <div className="container">
                    <h2 className="theme-h2 text-center mb-12">Our Principles</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {principles.map((principle) => (
                            <div key={principle.title} className="text-center">
                                <div className="theme-bg-primary-color-12 theme-rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <principle.icon className="w-8 h-8 theme-text-primary-color-100" />
                                </div>
                                <h3 className="theme-h4 mb-3">{principle.title}</h3>
                                <p className="theme-fc-light">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

const keyFeatures = [
    'Next.js 15 with Turbopack',
    'Supabase integration',
    '40+ shadcn/ui components',
    'Complete design system',
    'TypeScript support',
    'Light and dark themes',
    'Responsive layouts',
    'Best practices baked in',
]

const techStack = [
    {
        name: 'Next.js',
        description: 'React framework with SSR',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-0.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
            </svg>
        ),
    },
    {
        name: 'Supabase',
        description: 'Open source Firebase alternative',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
    },
    {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        description: 'Typed JavaScript superset',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
]

const principles = [
    {
        title: 'Developer Experience',
        description: 'Built with TypeScript, comprehensive documentation, and clear patterns for rapid development.',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
        ),
    },
    {
        title: 'Scalability',
        description: 'Designed to grow with your application from prototype to production-ready system.',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
    {
        title: 'Best Practices',
        description: 'Following industry standards for code quality, accessibility, and performance.',
        icon: ({ className }: { className?: string }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
]
