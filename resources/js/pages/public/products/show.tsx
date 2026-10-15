import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Catalog, Locale, PublicProduct, Seo } from '@/types';

export default function ProductShow({
    locale,
    product,
    catalog,
    seo,
}: {
    locale: Locale;
    product: PublicProduct;
    catalog: Catalog;
    seo: Seo;
}) {
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <article className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
                <nav
                    aria-label="Breadcrumb"
                    className="text-sm text-muted-foreground"
                >
                    <Link
                        href={publicRoutes.products.index(locale)}
                        className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        Products
                    </Link>
                    <span aria-hidden="true"> / </span>
                    <span>{product.title}</span>
                </nav>
                <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
                    <div>
                        <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                            Product
                        </p>
                        <h1 className="mt-4 font-heading text-5xl leading-none md:text-7xl">
                            {product.title}
                        </h1>
                        <p className="mt-8 text-lg leading-8 whitespace-pre-line text-muted-foreground">
                            {product.body}
                        </p>
                        {catalog && (
                            <a
                                href={catalog.url}
                                target={catalog.newTab ? '_blank' : undefined}
                                rel={catalog.newTab ? 'noreferrer' : undefined}
                                className="mt-10 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                            >
                                {catalog.label}
                            </a>
                        )}
                    </div>
                    <aside className="overflow-hidden border border-border bg-secondary">
                        {product.image && (
                            <img
                                src={product.image.url}
                                alt={product.image.alt}
                                width={product.image.width}
                                height={product.image.height}
                                fetchPriority="high"
                                className="aspect-[4/3] w-full object-cover"
                            />
                        )}
                        <div className="p-7">
                            <h2 className="font-heading text-3xl">
                                Capabilities
                            </h2>
                            <dl className="mt-7 grid gap-6">
                                <div>
                                    <dt className="text-sm text-muted-foreground">
                                        Capacity
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {product.capacity ??
                                            'Available on request'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-muted-foreground">
                                        Products
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {product.products.join(', ')}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-muted-foreground">
                                        Machinery
                                    </dt>
                                    <dd className="mt-1 font-medium">
                                        {product.machinery ??
                                            'Available on request'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </article>
        </PublicLayout>
    );
}
