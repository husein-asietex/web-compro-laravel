import { HugeiconsIcon } from '@hugeicons/react';
import { Globe02Icon } from '@hugeicons/core-free-icons';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dashboard } from '@/routes';
import publicRoutes from '@/routes/public';
import type { Locale } from '@/types';

export function PublicNavigation({ locale }: { locale: Locale }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const page = usePage();
    const { auth } = page.props;
    const { url } = page;
    const publicLinks = [
        { href: publicRoutes.home(locale), label: 'Home' },
        { href: publicRoutes.about(locale), label: 'About' },
        { href: publicRoutes.products.index(locale), label: 'Products' },
        { href: publicRoutes.contact(locale), label: 'Contact' },
        { href: publicRoutes.career(locale), label: 'Career' },
        {
            href: publicRoutes.marketingContact(locale),
            label: 'Marketing contacts',
        },
    ];
    const localizedUrl = (targetLocale: Locale) => {
        const [path, query = ''] = url.split('?');
        const segments = path.split('/');

        segments[1] = targetLocale;

        return `${segments.join('/')}${query === '' ? '' : `?${query}`}`;
    };

    return (
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
            <a
                href="#main-content"
                className="absolute top-3 left-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
            >
                Skip to content
            </a>
            <nav
                className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-6 px-5 md:px-10"
                aria-label="Primary navigation"
            >
                <Link
                    href={publicRoutes.home(locale)}
                    className="font-heading text-xl leading-none tracking-tight focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:text-2xl"
                >
                    <span className="flex items-center gap-3">
                        <img
                            src="/images/LOGOASIETEX.webp"
                            alt=""
                            width={40}
                            height={40}
                            className="size-9 object-contain"
                        />
                        <span className="hidden lg:inline">
                            PT Asietex Sinar Indopratama
                        </span>
                    </span>
                </Link>
                <div className="hidden items-center gap-6 text-sm lg:flex">
                    {publicLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:text-text-accent underline-offset-4 transition-colors hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {auth.user && (
                        <>
                            <span className="h-6 w-px bg-border" aria-hidden="true" />
                            <Link
                                href={dashboard()}
                                className="hover:text-text-accent underline-offset-4 transition-colors hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                            >
                                Dashboard
                            </Link>
                        </>
                    )}
                    <div
                        className="flex items-center gap-2 border-l border-border pl-3"
                        aria-label="Language"
                    >
                        <HugeiconsIcon
                            icon={Globe02Icon}
                            size={14}
                            strokeWidth={1.8}
                            aria-hidden="true"
                            className="text-muted-foreground"
                        />

                        {(['en', 'id', 'pt'] as const).map((targetLocale) => (
                            <Link
                                key={targetLocale}
                                href={localizedUrl(targetLocale)}
                                className={`rounded-sm px-2.5 py-1.5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${locale === targetLocale ? 'text-text-accent bg-secondary' : 'hover:bg-secondary'}`}
                                aria-current={
                                    locale === targetLocale ? 'page' : undefined
                                }
                            >
                                {targetLocale.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                    aria-label={
                        isMenuOpen ? 'Close navigation' : 'Open navigation'
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="public-navigation-menu"
                    onClick={() => setIsMenuOpen((current) => !current)}
                >
                    {isMenuOpen ? (
                        <X aria-hidden="true" />
                    ) : (
                        <Menu aria-hidden="true" />
                    )}
                </button>
            </nav>
            {isMenuOpen && (
                <div
                    id="public-navigation-menu"
                    className="border-t border-border bg-background lg:hidden"
                >
                    <div className="mx-auto grid max-w-7xl gap-1 px-5 py-5 md:px-10">
                        {publicLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="rounded-md px-3 py-3 font-heading text-2xl hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {auth.user && (
                            <Link
                                href={dashboard()}
                                className="mt-2 rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        <div
                            className="mt-2 flex gap-2 border-t border-border pt-4"
                            aria-label="Language"
                        >
                            {(['en', 'id', 'pt'] as const).map(
                                (targetLocale) => (
                                    <Link
                                        key={targetLocale}
                                        href={localizedUrl(targetLocale)}
                                        className={`rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${locale === targetLocale ? 'text-text-accent bg-secondary' : 'hover:bg-secondary'}`}
                                        aria-current={
                                            locale === targetLocale
                                                ? 'page'
                                                : undefined
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {targetLocale.toUpperCase()}
                                    </Link>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
