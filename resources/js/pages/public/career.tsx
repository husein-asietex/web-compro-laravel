import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import type { Locale, PublicPage, Seo } from '@/types';

type CareerProps = { locale: Locale; page: PublicPage; seo: Seo };

const careerCopy = {
    en: { title: 'Where our people work', maps: 'View on Maps', office: 'Head Office', factory: 'Factory', addresses: ['Jl. Cideng Timur No. 36, Petojo Utara, Gambir, Central Jakarta 10130, Indonesia', 'Modern Cikande Industrial Estate, Serang, Banten, Indonesia', 'Cikampek, Karawang, West Java, Indonesia'] },
    id: { title: 'Tempat tim kami bekerja', maps: 'Lihat di Maps', office: 'Kantor Pusat', factory: 'Pabrik', addresses: ['Jl. Cideng Timur No. 36, Petojo Utara, Gambir, Jakarta Pusat 10130, Indonesia', 'Kawasan Industri Modern Cikande, Serang, Banten, Indonesia', 'Cikampek, Karawang, Jawa Barat, Indonesia'] },
    pt: { title: 'Onde as nossas equipas trabalham', maps: 'Ver no Maps', office: 'Sede', factory: 'Fabrica', addresses: ['Jl. Cideng Timur No. 36, Petojo Utara, Gambir, Jacarta Central 10130, Indonesia', 'Parque Industrial Modern Cikande, Serang, Banten, Indonesia', 'Cikampek, Karawang, Java Ocidental, Indonesia'] },
} as const;

export default function Career({ locale, page, seo }: CareerProps) {
    const copy = careerCopy[locale];
    const imagery = [
        { url: '/images/career/IMG_4033.webp', alt: 'Textile production team briefing', width: 1200, height: 900 },
        { url: '/images/career/IMG_3869.webp', alt: 'Engineers collaborating on the production floor', width: 1200, height: 900 },
        { url: '/images/career/IMG_3001.webp', alt: 'Quality specialist inspecting woven fabric', width: 1200, height: 900 },
    ];

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <article className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                <header className="max-w-4xl">
                    <h1 className="font-heading text-5xl leading-[.94] tracking-[-.04em] md:text-8xl">
                        {page.title}
                    </h1>
                    <p className="mt-10 max-w-3xl text-lg leading-8 whitespace-pre-line text-muted-foreground">
                        {page.body}
                    </p>
                </header>
                <div className="mt-16 grid gap-4 sm:grid-cols-3">
                    {imagery.map((media) => (
                        <img key={media.url} src={media.url} alt={media.alt} width={media.width} height={media.height} loading="lazy" className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
                    ))}
                </div>

                {/* Career locations */}
                <section className="mt-24" aria-labelledby="career-locations-title">
                    <h2 id="career-locations-title" className="font-heading text-5xl tracking-[-.04em] md:text-6xl">
                        {copy.title}
                    </h2>
                    <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
                        {['Jakarta', 'Cikande', 'Cikampek'].map((city, index) => (
                            <article key={city} className="flex min-h-64 flex-col bg-card p-7">
                                <h3 className="font-heading text-3xl">{city}</h3>
                                <p className="text-text-accent mt-5 text-sm font-medium">
                                    {index === 0 ? copy.office : copy.factory}
                                </p>
                                <address className="mt-6 max-w-xs text-sm leading-6 not-italic text-muted-foreground">
                                    {copy.addresses[index]}
                                </address>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(copy.addresses[index])}`} target="_blank" rel="noreferrer" className="mt-auto pt-8 text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                    {copy.maps}
                                </a>
                            </article>
                        ))}
                    </div>
                </section>
            </article>
        </PublicLayout>
    );
}
