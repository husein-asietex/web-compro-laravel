import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import type { Locale, Seo } from '@/types';

type Contact = {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    language?: string;
};

export default function MarketingContacts({
    locale,
    contacts,
    seo,
}: {
    locale: Locale;
    contacts: Contact[];
    seo: Seo;
}) {
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    Marketing contacts
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-none md:text-7xl">
                    Talk to the team closest to your brief.
                </h1>
                <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact, index) => (
                        <article
                            key={contact.email ?? index}
                            className="flex min-h-64 flex-col justify-between bg-card p-6"
                        >
                            <div>
                                <h2 className="font-heading text-3xl">
                                    {contact.name ?? 'Asietex team'}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {contact.role ??
                                        contact.language ??
                                        'Marketing'}
                                </p>
                            </div>
                            <div className="mt-8 grid gap-2 text-sm">
                                <a
                                    href={`tel:${contact.phone ?? ''}`}
                                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    {contact.phone ?? '+62 21 6386 3999'}
                                </a>
                                <a
                                    href={`mailto:${contact.email ?? 'contact.us@asietex.com'}`}
                                    className="break-all underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    {contact.email ?? 'contact.us@asietex.com'}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                {contacts.length === 0 && (
                    <p className="mt-10 text-muted-foreground">
                        Please contact contact.us@asietex.com for marketing
                        enquiries.
                    </p>
                )}
            </section>
        </PublicLayout>
    );
}
