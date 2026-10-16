import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Locale, PublicPage, PublicProduct, Seo } from '@/types';

const copy = {
    en: { product: 'Product' },
    id: { product: 'Produk' },
    pt: { product: 'Produto' },
} as const;

const productImages: Record<string, string> = {
    spinning: '/products/1-spinning-4.webp',
    twisting: '/products/IMG_3588.webp',
    knitting: '/products/3-knitting.webp',
    weaving: '/products/4-weaving-1.webp',
    dyeing: '/products/IMG_4017.webp',
    'yarn-dyeing': '/products/IMG_3726-yarn.webp',
    garment: '/products/IMG_3025.webp',
    printing: '/products/IMG_3063.webp',
    finishing: '/products/IMG_3548.webp',
};

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
    const labels = copy[locale];

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />

            {/* Products overview */}
            <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
                <h1 className="mt-7 max-w-4xl font-heading text-6xl leading-none tracking-[-0.035em] md:text-7xl">
                    {page.title}
                </h1>
                {page.body && (
                    <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-8 text-muted-foreground">
                        {page.body}
                    </p>
                )}
                <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <Link
                            key={product.slug}
                            href={publicRoutes.products.show({
                                locale,
                                product: product.slug,
                            })}
                            className="group overflow-hidden rounded-2xl border border-border bg-card focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                                {product.image || productImages[product.slug] ? (
                                    <img
                                        src={productImages[product.slug] ?? product.image?.url}
                                        alt={product.image?.alt ?? `${product.title} textile production`}
                                        width={product.image?.width ?? 1600}
                                        height={product.image?.height ?? 1200}
                                        loading="lazy"
                                        className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex size-full items-end bg-[linear-gradient(145deg,#e4dbc6,#9f8a61)] p-5 text-primary-foreground">
                                        <span className="font-heading text-5xl opacity-70">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <p className="text-text-accent text-xs tracking-[0.18em] uppercase">
                                    {labels.product} {index + 1}
                                </p>
                                <h2 className="mt-3 font-heading text-3xl capitalize">
                                    {product.title}
                                </h2>
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                    {product.body}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
