import { HugeiconsIcon } from '@hugeicons/react';
import { Briefcase01Icon, Message01Icon } from '@hugeicons/core-free-icons';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import type { Locale, Seo } from '@/types';

type Contact = {
    name?: string;
    email?: string;
    phone?: string;
    phoneHref?: string;
    role?: string;
    language?: string;
};

const copy = {
    en: {
        title: 'Talk to the team closest to your brief.',
        phone: 'Call',
        email: 'Email',
        empty: 'Please contact contact.us@asietex.com for marketing enquiries.',
    },
    id: {
        title: 'Hubungi tim yang paling sesuai dengan kebutuhan Anda.',
        phone: 'Telepon',
        email: 'Email',
        empty: 'Silakan hubungi contact.us@asietex.com untuk pertanyaan marketing.',
    },
    pt: {
        title: 'Fale com a equipa mais próxima do seu pedido.',
        phone: 'Telefone',
        email: 'Email',
        empty: 'Contacte contact.us@asietex.com para questões de marketing.',
    },
} as const;

export default function MarketingContacts({
    locale,
    contacts,
    seo,
}: {
    locale: Locale;
    contacts: Contact[];
    seo: Seo;
}) {
    const labels = copy[locale];

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />

            {/* Marketing contacts */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-14">
                <h1 className="max-w-2xl font-heading text-5xl leading-[.94] tracking-[-.04em] md:text-7xl">
                    {labels.title}
                </h1>
                <div className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact, index) => (
                        <article
                            key={contact.email ?? index}
                            className="flex min-h-64 flex-col justify-between bg-card p-7 md:p-8"
                        >
                            <div>
                                <h2 className="font-heading text-3xl">
                                    {contact.name ?? 'Asietex team'}
                                </h2>
                                <div className="mt-2 grid gap-1 text-sm text-muted-foreground">
                                    {contact.language && (
                                        <p className="flex items-start gap-2 leading-6">
                                            <HugeiconsIcon
                                                icon={Message01Icon}
                                                size={16}
                                                strokeWidth={1.8}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0"
                                            />
                                            <span className="min-w-0">{contact.language}</span>
                                        </p>
                                    )}
                                    <p className="flex items-start gap-2 leading-6">
                                        <HugeiconsIcon
                                            icon={Briefcase01Icon}
                                            size={16}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                            className="mt-0.5 shrink-0"
                                        />
                                        <span className="min-w-0">{contact.role ?? 'Marketing'}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 grid gap-2 text-sm">
                                <a
                                    href={`tel:${contact.phoneHref ?? contact.phone ?? ''}`}
                                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <span className="sr-only">{labels.phone}: </span>
                                    {contact.phone ?? '+62 21 6386 3999'}
                                </a>
                                <a
                                    href={`mailto:${contact.email ?? 'contact.us@asietex.com'}`}
                                    className="break-all underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <span className="sr-only">{labels.email}: </span>
                                    {contact.email ?? 'contact.us@asietex.com'}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                {contacts.length === 0 && (
                    <p className="mt-10 text-muted-foreground">
                        {labels.empty}
                    </p>
                )}
            </section>
        </PublicLayout>
    );
}
