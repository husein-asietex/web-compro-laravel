import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Catalog, Locale, PublicPage, PublicProduct, Seo } from '@/types';

type Props = {
    locale: Locale;
    page: PublicPage;
    products: PublicProduct[];
    catalog: Catalog;
    seo: Seo;
};

export default function Home({ locale, page, products, catalog, seo }: Props) {
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <section className="relative overflow-hidden bg-primary text-primary-foreground">
                {page.media[0] && (
                    <img
                        src={page.media[0].url}
                        alt=""
                        width={page.media[0].width}
                        height={page.media[0].height}
                        fetchPriority="high"
                        aria-hidden="true"
                        className="absolute inset-0 size-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,21,18,.94)_0%,rgba(18,21,18,.72)_48%,rgba(18,21,18,.28)_100%)]" />
                <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-7xl items-end gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
                    <div className="max-w-3xl">
                        <p className="mb-6 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                            PT Asietex Sinar Indopratama
                        </p>
                        <h1 className="font-heading text-5xl leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">
                            {page.title}
                        </h1>
                        <p className="mt-8 max-w-xl text-lg leading-8 text-primary-foreground/75">
                            {page.body}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                href={publicRoutes.products.index(locale)}
                                className="inline-flex rounded-md border border-primary-foreground/45 px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                                Explore our products
                            </Link>
                            {catalog && (
                                <a
                                    href={catalog.url}
                                    target={
                                        catalog.newTab ? '_blank' : undefined
                                    }
                                    rel={
                                        catalog.newTab
                                            ? 'noreferrer'
                                            : undefined
                                    }
                                    className="inline-flex rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                >
                                    {catalog.label}
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <aside
                            className="border border-primary-foreground/20 bg-primary/75 p-6 backdrop-blur-sm sm:p-8"
                            aria-labelledby="glance-title"
                        >
                            <p className="text-sm font-semibold text-accent">
                                At a glance
                            </p>
                            <h2
                                id="glance-title"
                                className="mt-3 font-heading text-3xl leading-tight"
                            >
                                The scale to support your plans.
                            </h2>
                            <dl className="mt-7 grid grid-cols-2 border-t border-primary-foreground/20">
                                {[
                                    ['9', 'Integrated products'],
                                    ['3', 'Languages served'],
                                    ['2', 'Regions connected'],
                                    ['1', 'Production partner'],
                                ].map(([value, label]) => (
                                    <div
                                        key={label}
                                        className="border-r border-b border-primary-foreground/20 px-4 py-5 odd:pl-0 even:border-r-0 sm:px-5"
                                    >
                                        <dt className="text-sm text-primary-foreground/65">
                                            {label}
                                        </dt>
                                        <dd className="mt-2 font-heading text-4xl text-accent">
                                            {value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>
                </div>
            </section>
            <section
                className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24"
                aria-labelledby="products-title"
            >
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    Integrated expertise
                </p>
                <h2
                    id="products-title"
                    className="mt-3 max-w-3xl font-heading text-5xl leading-none md:text-7xl"
                >
                    The right expertise at every stage.
                </h2>
                <div className="mt-10 grid overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <Link
                            key={product.slug}
                            href={publicRoutes.products.show({
                                locale,
                                product: product.slug,
                            })}
                            className="group bg-background p-5 transition-colors hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            {product.image ? (
                                <img
                                    src={product.image.url}
                                    alt={product.image.alt}
                                    width={product.image.width}
                                    height={product.image.height}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            ) : (
                                <div className="flex aspect-[4/3] items-end bg-[linear-gradient(145deg,#e4dbc6,#9f8a61)] p-5 text-primary-foreground">
                                    <span className="font-heading text-5xl/none opacity-70">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                            <p className="text-text-accent mt-5 text-xs font-semibold tracking-[0.16em] uppercase">
                                Product
                            </p>
                            <h3 className="mt-2 font-heading text-3xl">
                                {product.title}
                            </h3>
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                {product.body}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
