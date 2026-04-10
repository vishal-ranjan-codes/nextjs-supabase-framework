'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { submitContactAction } from '@/lib/actions/contact'

export default function ContactForm() {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const form = e.currentTarget

        startTransition(async () => {
            const result = await submitContactAction(formData)
            if (result.error) {
                toast.error(result.error)
            } else if (result.success) {
                toast.success('Message sent!')
                form.reset()
            }
        })
    }

    return (
        <div className="box p-6 md:p-8">
            <h2 className="theme-h3 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="theme-fc-heading">
                        Name *
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="theme-fg-color theme-border-color theme-fc-base"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="theme-fc-heading">
                        Email *
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="theme-fg-color theme-border-color theme-fc-base"
                    />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                    <Label htmlFor="subject" className="theme-fc-heading">
                        Subject *
                    </Label>
                    <Select name="subject" required>
                        <SelectTrigger id="subject" className="theme-fg-color theme-border-color">
                            <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="collaboration">Collaboration</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <Label htmlFor="message" className="theme-fc-heading">
                        Message *
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                        className="theme-fg-color theme-border-color theme-fc-base resize-none"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {isPending ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </div>
    )
}
