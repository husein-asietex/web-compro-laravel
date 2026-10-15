import { Link } from '@inertiajs/react';
import publicRoutes from '@/routes/public';
import type { Locale } from '@/types';

export function PublicFooter({ locale }: { locale: Locale }) {
    const footerLinks = [
        { href: publicRoutes.about(locale), label: 'About' },
        { href: publicRoutes.products.index(locale), label: 'Products' },
        { href: publicRoutes.career(locale), label: 'Career' },
        { href: publicRoutes.contact(locale), label: 'Contact' },
    ];

    return (
        <footer className="border-t border-border bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
                <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
                    <div>
                        <Link
                            href={publicRoutes.home(locale)}
                            className="font-heading text-3xl focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                        >
                            Asietex<span className="text-accent">.</span>
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">
                            Integrated textile manufacturing from raw cotton to
                            finished fabric.
                        </p>
                    </div>
                    <nav aria-label="Explore Asietex">
                        <h2 className="text-sm font-semibold text-accent">
                            Explore Asietex
                        </h2>
                        <ul className="mt-4 grid gap-3 text-sm">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-primary-foreground/65 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <address className="not-italic">
                        <h2 className="text-sm font-semibold text-accent">
                            Contact
                        </h2>
                        <div className="mt-4 grid gap-3 text-sm text-primary-foreground/65">
                            <a
                                className="underline-offset-4 hover:text-primary-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                href="mailto:contact.us@asietex.com"
                            >
                                contact.us@asietex.com
                            </a>
                            <a
                                className="underline-offset-4 hover:text-primary-foreground hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                href="tel:+622163863999"
                            >
                                +62 21 6386 3999
                            </a>
                            <span>Jakarta, Indonesia</span>
                        </div>
                    </address>
                </div>
                <div className="mt-12 flex flex-col gap-3 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/65 sm:flex-row sm:justify-between">
                    <span>© 2026 PT Asietex Sinar Indopratama</span>
                    <span>All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
