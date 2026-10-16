import { Link } from '@inertiajs/react';
import { SeoHead } from '@/components/seo-head';
import { Button, buttonVariants } from '@/components/ui/button';
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

const copy = {
    en: {
        explore: 'Explore our products',
        glance: 'At a glance',
        scale: 'The scale to support your plans.',
        note: 'Nine specialized products work together across one connected production chain.',
        expertise: 'Integrated expertise',
        products: 'The right expertise at every stage.',
        product: 'Product',
        overview: 'A connected supply chain, managed by one partner.',
        overviewBody: 'Every stage, from yarn to fabric, runs in our own mills on a combination of Asian and European machinery. Control of the full chain gives our clients consistent quality, predictable lead times and a single point of contact.',
        overviewLink: 'See how we work',
        filmTitle: 'See how the work comes together.',
        filmBody: 'A closer look at the people, machinery and care behind every metre.',
        requestTitle: 'Let’s talk about your next fabric order.',
        requestBody: 'Share the fabric, composition and volume you have in mind. Our team will come back with samples and a quotation.',
        request: 'Ask for samples',
        fields: ['Fabric type', 'Composition', 'Monthly volume', 'Business email'],
        placeholders: ['e.g. single jersey', 'e.g. 100% cotton', 'e.g. 20,000 m', 'name@company.com'],
    },
    id: {
        explore: 'Jelajahi produk kami',
        glance: 'Sekilas Asietex',
        scale: 'Kapasitas yang siap mendukung rencana Anda.',
        note: 'Sembilan produk khusus bekerja bersama dalam satu rantai produksi yang terhubung.',
        expertise: 'Keahlian terintegrasi',
        products: 'Keahlian yang tepat di setiap tahap.',
        product: 'Produk',
        overview: 'Rantai pasok yang terhubung, dikelola oleh satu mitra.',
        overviewBody: 'Setiap tahap, dari benang hingga kain, berjalan di pabrik kami sendiri dengan kombinasi mesin Asia dan Eropa. Kendali atas seluruh rantai memberi klien kualitas yang konsisten, waktu produksi yang terukur, dan satu titik kontak.',
        overviewLink: 'Lihat cara kerja kami',
        filmTitle: 'Lihat bagaimana semuanya bekerja bersama.',
        filmBody: 'Lihat lebih dekat orang, mesin, dan ketelitian di balik setiap meter kain.',
        requestTitle: 'Mari bicarakan kebutuhan kain Anda.',
        requestBody: 'Ceritakan jenis kain, komposisi, dan volume yang Anda perlukan. Tim kami akan menyiapkan sampel dan penawaran harga.',
        request: 'Minta sampel',
        fields: ['Jenis kain', 'Komposisi', 'Volume per bulan', 'Email bisnis'],
        placeholders: ['mis. single jersey', 'mis. 100% katun', 'mis. 20.000 m', 'nama@perusahaan.com'],
    },
    pt: {
        explore: 'Explore os nossos produtos',
        glance: 'A Asietex em resumo',
        scale: 'A capacidade certa para apoiar os seus planos.',
        note: 'Nove produtos especializados coordenam uma unica cadeia de producao continua.',
        expertise: 'Conhecimento integrado',
        products: 'A experiencia certa em cada etapa.',
        product: 'Produto',
        overview: 'Uma cadeia integrada, gerida por um unico parceiro.',
        overviewBody: 'Cada etapa, do fio ao tecido, decorre nas nossas proprias fabricas, com maquinaria asiatica e europeia. O controlo de toda a cadeia garante qualidade consistente, prazos previsiveis e um unico interlocutor.',
        overviewLink: 'Ver como trabalhamos',
        filmTitle: 'Veja como o trabalho se junta.',
        filmBody: 'Um olhar mais atento às pessoas, máquinas e ao cuidado por trás de cada metro.',
        requestTitle: 'Vamos falar sobre a sua próxima encomenda de tecido.',
        requestBody: 'Indique o tecido, a composição e o volume que tem em mente. A nossa equipa prepara amostras e uma cotação.',
        request: 'Pedir amostras',
        fields: ['Tipo de tecido', 'Composição', 'Volume mensal', 'Email profissional'],
        placeholders: ['ex.: jersey simples', 'ex.: 100% algodão', 'ex.: 20.000 m', 'nome@empresa.com'],
    },
} as const;

const productImages: Record<string, string> = {
    spinning: '/images/products/1-spinning-4.webp',
    twisting: '/images/products/IMG_3588.webp',
    knitting: '/images/products/3-knitting.webp',
    weaving: '/images/products/4-weaving-1.webp',
    dyeing: '/images/products/IMG_4017.webp',
    'yarn-dyeing': '/images/products/IMG_3726-yarn.webp',
    garment: '/images/products/IMG_3025.webp',
    printing: '/images/products/IMG_3063.webp',
    finishing: '/images/products/IMG_3548.webp',
};

export default function Home({ locale, page, products, catalog, seo }: Props) {
    const labels = copy[locale];

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />

            {/* Hero */}
            <section className="relative min-h-[42rem] overflow-hidden bg-primary text-primary-foreground lg:min-h-[43rem]">
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
                <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-7xl items-end gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
                    <div className="max-w-3xl">
                        <h1 className="font-heading text-5xl leading-[0.92] tracking-[-0.04em] sm:text-7xl lg:text-[5.75rem]">
                            {page.title}
                        </h1>
                        <p className="mt-8 max-w-xl text-lg leading-8 text-primary-foreground/75">
                            {page.body}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                href={publicRoutes.products.index(locale)}
                                className={buttonVariants({
                                    variant: 'outline',
                                    size: 'lg',
                                })}
                            >
                                {labels.explore}
                            </Link>
                            {/* {catalog && (
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
                                    className="inline-flex bg-accent px-4 py-2 text-sm font-medium rounded-md text-accent-foreground transition-colors hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                                >
                                    {catalog.label}
                                </a>
                            )} */}
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <aside
                            className="border border-primary-foreground/20 bg-primary/60 p-6 backdrop-blur-sm sm:p-7"
                            aria-labelledby="glance-title"
                        >
                            <p className="text-sm font-semibold text-accent">
                                {labels.glance}
                            </p>
                            <h2
                                id="glance-title"
                                className="mt-3 font-heading text-3xl leading-tight"
                            >
                                {labels.scale}
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
                            <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-6 text-primary-foreground/75">
                                {labels.note}
                            </p>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Product expertise */}
            <section
                className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
                aria-labelledby="products-title"
            >
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    {labels.expertise}
                </p>
                <h2
                    id="products-title"
                    className="mt-3 max-w-3xl font-heading text-5xl leading-none md:text-7xl"
                >
                    {labels.products}
                </h2>
                <div className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <Link
                            key={product.slug}
                            href={publicRoutes.products.show({
                                locale,
                                product: product.slug,
                            })}
                            className="group overflow-hidden bg-card transition-colors hover:bg-secondary focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            {product.image || productImages[product.slug] ? (
                                <img
                                    src={productImages[product.slug] ?? product.image?.url}
                                    alt={product.image?.alt ?? `${product.title} textile production`}
                                    width={product.image?.width ?? 1600}
                                    height={product.image?.height ?? 1200}
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="flex aspect-[4/3] items-end bg-[linear-gradient(145deg,#e4dbc6,#9f8a61)] p-5 text-primary-foreground">
                                    <span className="font-heading text-5xl/none opacity-70">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                            <div className="p-5">
                                <p className="text-text-accent text-xs font-semibold tracking-[0.16em] uppercase">
                                    {labels.product} {index + 1}
                                </p>
                                <h3 className="mt-2 font-heading text-3xl">
                                    {product.title}
                                </h3>
                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                                    {product.body}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Company overview */}
            <section className="bg-secondary" aria-labelledby="company-overview-title">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.3fr_.7fr] md:px-10 md:py-24">
                    <h2
                        id="company-overview-title"
                        className="max-w-3xl font-heading text-5xl leading-none tracking-[-0.035em] md:text-7xl"
                    >
                        {labels.overview}
                    </h2>
                    <div className="flex flex-col items-start gap-8">
                        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                            {labels.overviewBody}
                        </p>
                        <Link
                            href={publicRoutes.about(locale)}
                            className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                            {labels.overviewLink}
                        </Link>
                    </div>
                    <img
                        src="/images/why-asietex/IMG_2875.webp"
                        alt=""
                        width={1600}
                        height={800}
                        loading="lazy"
                        className="aspect-[2/1] w-full rounded-[1.25rem] object-cover md:col-span-2"
                    />
                </div>
            </section>

            {/* Company film */}
            <section aria-labelledby="company-film-title">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[.9fr_1.1fr] md:px-10 md:py-20">
                    <div className="self-center">
                        <h2
                            id="company-film-title"
                            className="max-w-lg font-heading text-5xl leading-none tracking-[-0.035em] md:text-6xl"
                        >
                            {labels.filmTitle}
                        </h2>
                        <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                            {labels.filmBody}
                        </p>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-[1.25rem] bg-primary">
                        <iframe
                            className="size-full"
                            src="https://www.youtube-nocookie.com/embed/A1YoEqG4amQ"
                            title={labels.filmTitle}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Sample request */}
            <section
                id="request-samples"
                className="bg-background px-6 py-16 md:px-10 md:py-24"
                aria-labelledby="request-samples-title"
            >
                <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.25rem] border border-border bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,.8fr)_minmax(0,.8fr)_minmax(0,1.2fr)] xl:p-12">
                    <div className="min-w-0 self-center">
                        <h2
                            id="request-samples-title"
                            className="max-w-xl font-heading text-5xl leading-none tracking-[-0.035em] md:text-6xl"
                        >
                            {labels.requestTitle}
                        </h2>
                        <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                            {labels.requestBody}
                        </p>
                    </div>
                    <img
                        src="/images/request-samples/IMG_3723.webp"
                        alt=""
                        width={1200}
                        height={1600}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-md object-cover lg:self-stretch xl:aspect-[3/4]"
                    />
                    <form
                        className="grid min-w-0 content-start gap-5 sm:grid-cols-2 lg:col-span-2 xl:col-span-1"
                        action="mailto:contact.us@asietex.com"
                        method="post"
                        encType="text/plain"
                    >
                        {labels.fields.map((field, index) => (
                            <label
                                key={field}
                                className="grid min-w-0 gap-2 text-sm font-medium"
                                htmlFor={`sample-${index}`}
                            >
                                <span>{field}</span>
                                <input
                                    id={`sample-${index}`}
                                    name={field.toLowerCase().replaceAll(' ', '-')}
                                    type={index === 3 ? 'email' : 'text'}
                                    autoComplete={index === 3 ? 'email' : 'off'}
                                    required
                                    placeholder={labels.placeholders[index]}
                                    className="h-12 min-w-0 w-full rounded-xl border border-border bg-background px-4 text-base outline-none placeholder:text-muted-foreground/75 focus-visible:border-text-accent focus-visible:ring-3 focus-visible:ring-text-accent/20"
                                />
                            </label>
                        ))}
                        <Button
                            type="submit"
                            size="lg"
                            className="sm:col-span-2"
                        >
                            {labels.request}
                        </Button>
                    </form>
                </div>
            </section>
        </PublicLayout>
    );
}
