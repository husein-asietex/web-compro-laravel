import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import type { Catalog, Locale, PublicPage, Seo } from '@/types';

type Props = {
    locale: Locale;
    page: PublicPage;
    collection: {
        items?: Array<{
            title?: string;
            description?: string;
            location?: string;
        }>;
    } | null;
    catalog: Catalog;
    seo: Seo;
};

export default function Page({
    locale,
    page,
    collection,
    catalog,
    seo,
}: Props) {
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <article className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    {page.slug}
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-[0.98] md:text-7xl">
                    {page.title}
                </h1>
                <p className="mt-8 max-w-3xl text-lg leading-8 whitespace-pre-line text-muted-foreground">
                    {page.body}
                </p>
                {page.media.length > 0 && (
                    <div className="mt-12 grid gap-5 sm:grid-cols-2">
                        {page.media.map((media) => (
                            <img
                                key={media.url}
                                src={media.url}
                                alt={media.alt}
                                width={media.width}
                                height={media.height}
                                loading="lazy"
                                className="aspect-[4/3] w-full object-cover"
                            />
                        ))}
                    </div>
                )}
                {collection?.items && collection.items.length > 0 && (
                    <section
                        className="mt-14 border-t border-border pt-10"
                        aria-labelledby="collection-title"
                    >
                        <h2
                            id="collection-title"
                            className="font-heading text-4xl"
                        >
                            What to expect
                        </h2>
                        <div className="mt-7 grid gap-4 md:grid-cols-3">
                            {collection.items.map((item, index) => (
                                <article
                                    key={`${item.title ?? 'item'}-${index}`}
                                    className="border border-border bg-card p-6"
                                >
                                    <h3 className="font-heading text-2xl">
                                        {item.title ?? 'Asietex'}
                                    </h3>
                                    <p className="mt-3 leading-7 text-muted-foreground">
                                        {item.description ??
                                            item.location ??
                                            ''}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
                {catalog && (
                    <a
                        href={catalog.url}
                        target={catalog.newTab ? '_blank' : undefined}
                        rel={catalog.newTab ? 'noreferrer' : undefined}
                        className="mt-12 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                        {catalog.label}
                    </a>
                )}
            </article>
        </PublicLayout>
    );
}
