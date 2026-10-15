import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Locale, PublicPage, PublicProduct, Seo } from '@/types';

export default function Products({
    locale,
    page,
    products,
    seo,
}: {
    locale: Locale;
    page: Pick<PublicPage, 'title' | 'body'>;
    products: PublicProduct[];
    seo: Seo;
}) {
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    Integrated expertise
                </p>
                <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-none md:text-7xl">
                    {page.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                    {page.body}
                </p>
                <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
                                    <span className="font-heading text-5xl opacity-70">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                            <h2 className="mt-5 font-heading text-3xl">
                                {product.title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {product.body}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
