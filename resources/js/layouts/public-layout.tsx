import type { PropsWithChildren } from 'react';
import { PublicFooter } from '@/components/public-footer';
import { PublicNavigation } from '@/components/public-navigation';
import type { Locale } from '@/types';

export default function PublicLayout({
    children,
    locale,
}: PropsWithChildren<{ locale: Locale }>) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PublicNavigation locale={locale} />
            <main id="main-content">{children}</main>
            <PublicFooter locale={locale} />
        </div>
    );
}
