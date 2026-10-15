import { Head } from '@inertiajs/react';
import type { Seo } from '@/types';

function jsonLd(value: Record<string, unknown>): string {
    return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function SeoHead({ seo }: { seo: Seo }) {
    return (
        <Head title={seo.title}>
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.canonical} />
            {Object.entries(seo.alternates).map(([locale, href]) => (
                <link
                    key={locale}
                    rel="alternate"
                    hrefLang={locale}
                    href={href}
                />
            ))}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.canonical} />
            <meta name="twitter:card" content="summary_large_image" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(seo.structuredData) }}
            />
        </Head>
    );
}
