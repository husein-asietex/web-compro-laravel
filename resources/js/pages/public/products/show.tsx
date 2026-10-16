import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import { buttonVariants } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Catalog, Locale, PublicProduct, Seo } from '@/types';

const copy = {
    en: { products: 'Products', capacity: 'Capacity', machinery: 'Machinery', gallery: 'Gallery', confirm: 'To be confirmed', overview: 'Inside the chain' },
    id: { products: 'Produk', capacity: 'Kapasitas', machinery: 'Mesin', gallery: 'Galeri', confirm: 'Akan dikonfirmasi', overview: 'Di dalam rantai produksi' },
    pt: { products: 'Produtos', capacity: 'Capacidade', machinery: 'Maquinaria', gallery: 'Galeria', confirm: 'A confirmar', overview: 'Dentro da cadeia' },
} as const;

const productGalleries: Record<string, string[]> = {
    spinning: ['/images/products/1-spinning-4.webp', '/images/products/1-spinning-3.webp'],
    twisting: ['/images/products/IMG_3588.webp', '/images/products/IMG_3589.webp'],
    knitting: ['/images/products/3-knitting.webp', '/images/products/3-knitting-2.webp'],
    weaving: ['/images/products/4-weaving-1.webp', '/images/products/4-weaving-2.webp'],
    dyeing: ['/images/products/IMG_4017.webp', '/images/products/IMG_4022.webp'],
    'yarn-dyeing': ['/images/products/IMG_3726-yarn.webp', '/images/products/IMG_3733.webp'],
    garment: ['/images/products/IMG_3025.webp', '/images/products/IMG_3028.webp'],
    printing: ['/images/products/IMG_3063.webp', '/images/products/IMG_3065.webp'],
    finishing: ['/images/products/IMG_3548.webp', '/images/products/IMG_3557.webp'],
};

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
    const labels = copy[locale];
    const gallery = productGalleries[product.slug] ?? (product.image === null ? [] : [product.image.url]);
    const heroImage = gallery[0] ?? product.image?.url;
    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <article className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-9">
                <nav
                    aria-label="Breadcrumb"
                    className="text-sm text-muted-foreground"
                >
                    <Link
                        href={publicRoutes.products.index(locale)}
                        className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        {labels.products}
                    </Link>
                    <span aria-hidden="true"> / </span>
                    <span>{product.title}</span>
                </nav>
                <div className="mt-10 grid items-end gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
                    <div className="pb-4">
                        <h1 className="font-heading text-6xl leading-[0.92] tracking-[-0.04em] md:text-8xl">
                            {product.title}
                        </h1>
                        <p className="mt-7 max-w-xl text-lg leading-8 whitespace-pre-line text-muted-foreground">
                            {product.body}
                        </p>
                        {/* {catalog && (
                            <a
                                href={catalog.url}
                                target={catalog.newTab ? '_blank' : undefined}
                                rel={catalog.newTab ? 'noreferrer' : undefined}
                                className={buttonVariants({
                                    size: 'lg',
                                    className: 'mt-9',
                                })}
                            >
                                {catalog.label}
                            </a>
                        )} */}
                    </div>
                    <div className="relative overflow-hidden rounded-[1.25rem] bg-secondary">
                        {heroImage && (
                            <img
                                src={heroImage}
                                alt={product.image?.alt ?? `${product.title} textile production`}
                                width={product.image?.width ?? 1600}
                                height={product.image?.height ?? 1200}
                                fetchPriority="high"
                                className="aspect-[4/3] w-full object-cover lg:aspect-[1.46/1]"
                            />
                        )}
                        <span className="absolute right-6 bottom-5 text-sm text-white drop-shadow-md">
                            {labels.overview}
                        </span>
                    </div>
                </div>
                <dl className="mt-10 grid border-y border-border sm:grid-cols-2">
                    <div className="border-b border-border py-5 sm:border-r sm:border-b-0 sm:pr-8">
                        <dt className="text-text-accent text-xs font-semibold tracking-[0.16em] uppercase">
                            {labels.capacity}
                        </dt>
                        <dd className="mt-3 text-xl">
                            {product.capacity ?? labels.confirm}
                        </dd>
                    </div>
                    <div className="py-5 sm:pl-8">
                        <dt className="text-text-accent text-xs font-semibold tracking-[0.16em] uppercase">
                            {labels.machinery}
                        </dt>
                        <dd className="mt-3 text-xl">
                            {product.machinery ?? labels.confirm}
                        </dd>
                    </div>
                </dl>

                {/* Product range */}
                <section className="mt-14" aria-labelledby="product-range-title">
                    <h2 id="product-range-title" className="font-heading text-4xl">
                        {labels.products}
                    </h2>
                    <ul className="mt-8 grid gap-x-12 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
                        {product.products.map((item) => (
                            <li key={item} className="text-lg">
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Product gallery */}
                <section className="mt-16" aria-labelledby="product-gallery-title">
                    <h2 id="product-gallery-title" className="font-heading text-4xl">
                        {labels.gallery}
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {gallery.map((image, index) => (
                            <img
                                key={image}
                                src={image}
                                alt={`${product.title} ${labels.gallery.toLowerCase()} ${index + 1}`}
                                width={1600}
                                height={1067}
                                loading="lazy"
                                className="aspect-[3/2] w-full rounded-[1.25rem] object-cover"
                            />
                        ))}
                    </div>
                </section>
            </article>
        </PublicLayout>
    );
}
