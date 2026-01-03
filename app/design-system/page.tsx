import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Design System | Next.js + Supabase Framework',
    description: 'Comprehensive design system documentation with colors, typography, and components',
}

export default function DesignSystemPage() {
    return (
        <div className="theme-bg-color py-16">
            <div className="container-max-xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="theme-h1 text-4xl md:text-5xl mb-4">Design System</h1>
                    <p className="theme-fc-light text-lg max-w-3xl mx-auto">
                        A comprehensive design system built with Tailwind CSS v4, featuring consistent colors,
                        typography, and components for both light and dark themes.
                    </p>
                </div>

                {/* Color Palette */}
                <section id="colors" className="mb-20">
                    <h2 className="theme-h2 mb-8">Color Palette</h2>

                    {/* Primary Colors */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Primary Brand Colors (Facebook Blue)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { name: '100', color: '#1877F2', dark: '#4A9FFF' },
                                { name: '75', color: '#1877F2BF', dark: '#4A9FFFBF' },
                                { name: '50', color: '#1877F280', dark: '#4A9FFF80' },
                                { name: '25', color: '#1877F240', dark: '#4A9FFF40' },
                                { name: '12', color: '#1877F21F', dark: '#4A9FFF1F' },
                                { name: '08', color: '#1877F214', dark: '#4A9FFF14' },
                                { name: '05', color: '#1877F20D', dark: '#4A9FFF0D' },
                            ].map((swatch) => (
                                <div key={swatch.name} className="box p-4">
                                    <div
                                        className={`theme-bg-primary-color-${swatch.name} theme-rounded h-20 mb-3`}
                                    />
                                    <p className="theme-fc-heading font-medium text-sm">Primary {swatch.name}</p>
                                    <code className="theme-fc-light text-[10px] mt-1 block">.theme-bg-primary-color-{swatch.name}</code>
                                    <p className="theme-fc-light text-xs mt-1">Light: {swatch.color}</p>
                                    <p className="theme-fc-light text-xs">Dark: {swatch.dark}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography Colors */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Typography Colors</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                { name: 'Heading', class: 'theme-fc-heading', light: '#262626', dark: '#FAFAFA' },
                                { name: 'Heading Light', class: 'theme-fc-heading-light', light: '#363636', dark: '#E8E8E8' },
                                { name: 'Base', class: 'theme-fc-base', light: '#4D4D4D', dark: '#CCCCCC' },
                                { name: 'Light', class: 'theme-fc-light', light: '#8C8C8C', dark: '#A0A0A0' },
                                { name: 'Lighter', class: 'theme-fc-lighter', light: '#BFBFBF', dark: '#808080' },
                            ].map((color) => (
                                <div key={color.name} className="box p-4">
                                    <div className={`${color.class} theme-rounded h-16 mb-3 flex items-center justify-center font-semibold`}>
                                        Aa
                                    </div>
                                    <p className="theme-fc-heading font-medium text-sm">{color.name}</p>
                                    <p className="theme-fc-light text-xs mt-1">{color.light}</p>
                                    <p className="theme-fc-light text-xs">{color.dark}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Layout Colors */}
                    <div>
                        <h3 className="theme-h3 mb-6">Layout Colors</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="theme-h5 mb-4">Backgrounds</h4>
                                <div className="space-y-3">
                                    <div className="box p-4 theme-bg-color">
                                        <p className="theme-fc-heading font-medium">Background</p>
                                        <p className="theme-fc-light text-sm">Page background color</p>
                                    </div>
                                    <div className="box p-4 theme-bg-color-dark">
                                        <p className="theme-fc-heading font-medium">Background Dark</p>
                                        <p className="theme-fc-light text-sm">Darker sections</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="theme-h5 mb-4">Surfaces</h4>
                                <div className="space-y-3">
                                    <div className="box p-4 theme-fg-color">
                                        <p className="theme-fc-heading font-medium">Foreground</p>
                                        <p className="theme-fc-light text-sm">Cards, modals, dropdowns</p>
                                    </div>
                                    <div className="box p-4 theme-fg-color-dark">
                                        <p className="theme-fc-heading font-medium">Foreground Dark</p>
                                        <p className="theme-fc-light text-sm">Elevated surfaces</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section id="typography" className="mb-20">
                    <h2 className="theme-h2 mb-8">Typography Scale</h2>
                    <div className="box p-8 space-y-6">
                        <div>
                            <h1 className="theme-h1">Heading 1 - 2rem (32px)</h1>
                            <p className="theme-fc-light text-sm mt-1">Page titles and main headings</p>
                        </div>
                        <div>
                            <h2 className="theme-h2">Heading 2 - 1.75rem (28px)</h2>
                            <p className="theme-fc-light text-sm mt-1">Section headings</p>
                        </div>
                        <div>
                            <h3 className="theme-h3">Heading 3 - 1.5rem (24px)</h3>
                            <p className="theme-fc-light text-sm mt-1">Subsection headings</p>
                        </div>
                        <div>
                            <h4 className="theme-h4">Heading 4 - 1.25rem (20px)</h4>
                            <p className="theme-fc-light text-sm mt-1">Card headings</p>
                        </div>
                        <div>
                            <h5 className="theme-h5">Heading 5 - 1rem (16px)</h5>
                            <p className="theme-fc-light text-sm mt-1">Small headings</p>
                        </div>
                        <div>
                            <h6 className="theme-h6">Heading 6 - 0.875rem (14px)</h6>
                            <p className="theme-fc-light text-sm mt-1">Overline text</p>
                        </div>
                        <div className="border-t theme-border-color pt-6 mt-6">
                            <p className="theme-fc-base text-base mb-2">
                                Body text - The quick brown fox jumps over the lazy dog
                            </p>
                            <p className="theme-fc-light text-sm">
                                Muted text - The quick brown fox jumps over the lazy dog
                            </p>
                        </div>
                    </div>
                </section>

                {/* Spacing */}
                <section id="spacing" className="mb-20">
                    <h2 className="theme-h2 mb-8">Spacing & Layout</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="theme-h4 mb-4">Container Widths</h3>
                            <div className="space-y-3 theme-fc-light text-sm">
                                <div className="box p-3">
                                    <code>container-max-sm</code> - 512px max width
                                </div>
                                <div className="box p-3">
                                    <code>container-max-tab</code> - 768px max width
                                </div>
                                <div className="box p-3">
                                    <code>container-max-md</code> - 896px max width
                                </div>
                                <div className="box p-3">
                                    <code>container-max-lg</code> - 1024px max width
                                </div>
                                <div className="box p-3">
                                    <code>container</code> / <code>container-max-xl</code> - 1280px max width
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="theme-h4 mb-4">Border Radius</h3>
                            <div className="space-y-3">
                                <div className="theme-bg-primary-color-12 theme-rounded p-6">
                                    <code className="theme-fc-heading">theme-rounded</code>
                                    <p className="theme-fc-light text-sm mt-1">Standard radius - 10px</p>
                                </div>
                                <div className="theme-bg-primary-color-12 theme-rounded-sm p-6">
                                    <code className="theme-fc-heading">theme-rounded-sm</code>
                                    <p className="theme-fc-light text-sm mt-1">Small radius - 6px</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Components */}
                <section id="components" className="mb-20">
                    <h2 className="theme-h2 mb-8">Components</h2>

                    {/* Buttons */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Buttons</h3>
                        <div className="box p-8">
                            <div className="flex flex-wrap gap-4">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="link">Link</Button>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>
                    </div>

                    {/* Form Elements */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Form Elements</h3>
                        <div className="box p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Text Input</Label>
                                    <Input placeholder="Enter text..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Input</Label>
                                    <Input type="email" placeholder="email@example.com" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="checkbox" />
                                    <label htmlFor="checkbox" className="theme-fc-base text-sm cursor-pointer">
                                        Checkbox option
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="switch" />
                                    <label htmlFor="switch" className="theme-fc-base text-sm cursor-pointer">
                                        Toggle switch
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Cards</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card description goes here</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="theme-fc-base">Card content with useful information.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Another Card</CardTitle>
                                    <CardDescription>With different content</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full">Action Button</Button>
                                </CardContent>
                            </Card>
                            <Card className="theme-bg-primary-color-05">
                                <CardHeader>
                                    <CardTitle>Highlighted Card</CardTitle>
                                    <CardDescription>With accent background</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="theme-fc-base">Special content highlighted.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Badges</h3>
                        <div className="box p-8">
                            <div className="flex flex-wrap gap-3">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="mb-12">
                        <h3 className="theme-h3 mb-6">Alerts</h3>
                        <div className="space-y-4">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Information</AlertTitle>
                                <AlertDescription>
                                    This is an informational alert with helpful context.
                                </AlertDescription>
                            </Alert>
                            <Alert>
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    Your changes have been saved successfully.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    There was an error processing your request.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </section>

                {/* Best Practices */}
                <section className="mb-20">
                    <h2 className="theme-h2 mb-8">Best Practices</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="box p-6">
                            <h3 className="theme-h4 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 theme-text-primary-color-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Do's
                            </h3>
                            <ul className="space-y-2 theme-fc-light text-sm">
                                <li>✓ Use theme utilities (<code>theme-fc-base</code>, <code>theme-bg-color</code>)</li>
                                <li>✓ Test in both light and dark modes</li>
                                <li>✓ Follow typography scale for consistency</li>
                                <li>✓ Use semantic color names</li>
                                <li>✓ Leverage container utilities for responsive layouts</li>
                            </ul>
                        </div>
                        <div className="box p-6">
                            <h3 className="theme-h4 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Don'ts
                            </h3>
                            <ul className="space-y-2 theme-fc-light text-sm">
                                <li>✗ Don't use hardcoded colors</li>
                                <li>✗ Don't skip contrast ratio checks</li>
                                <li>✗ Don't create custom utilities unnecessarily</li>
                                <li>✗ Don't ignore responsive breakpoints</li>
                                <li>✗ Don't mix different design patterns</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Usage Examples */}
                <section>
                    <h2 className="theme-h2 mb-8">Code Examples</h2>
                    <div className="box p-6">
                        <h3 className="theme-h4 mb-4">Basic Page Layout</h3>
                        <pre className="theme-bg-color-dark theme-rounded p-4 overflow-x-auto">
                            <code className="theme-fc-base text-sm">
                                {`<div className="theme-bg-color">
  <div className="container py-16">
    <h1 className="theme-h1 mb-6">Page Title</h1>
    <p className="theme-fc-base mb-8">
      Body content with optimal readability
    </p>
    <Button>Primary Action</Button>
  </div>
</div>`}
                            </code>
                        </pre>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center box p-12 theme-bg-primary-color-05">
                    <h2 className="theme-h2 mb-4">Start Building</h2>
                    <p className="theme-fc-light text-lg mb-8 max-w-2xl mx-auto">
                        Use these components and patterns to build consistent, accessible interfaces.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button size="lg" asChild>
                            <Link href="/">View Homepage</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
