import { SeoHead } from '@/components/seo-head';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';
import type { Locale, PublicPage, Seo } from '@/types';

type ContactProps = { locale: Locale; page: PublicPage; seo: Seo };

const contactCopy = {
    en: { address: 'Office address', retailerAddress: 'Retailer shop address', retailer: 'Tanah Abang Bukit F/10, Jakarta Pusat\nINDONESIA', retailerPhone: 'Retailer phone', retailerFax: 'Retailer fax', phone: 'Phone', fax: 'Fax', email: 'Email', hours: 'Office hours', time: 'Monday–Friday, 08:00–17:00 WIB', inquiry: 'Tell us what you are looking for.', intro: 'Share a few details and our team will help you find the right starting point.', noForm: 'This website does not collect form submissions.' },
    id: { address: 'Alamat kantor', retailerAddress: 'Alamat toko retailer', retailer: 'Tanah Abang Bukit F/10, Jakarta Pusat\nINDONESIA', retailerPhone: 'Telepon toko retailer', retailerFax: 'Faks toko retailer', phone: 'Telepon', fax: 'Faks', email: 'Email', hours: 'Jam kerja', time: 'Senin–Jumat, 08.00–17.00 WIB', inquiry: 'Ceritakan kebutuhan Anda.', intro: 'Bagikan beberapa detail dan tim kami akan membantu menentukan langkah awal yang tepat.', noForm: 'Situs ini tidak menerima pengiriman formulir.' },
    pt: { address: 'Morada do escritorio', retailerAddress: 'Morada da loja retalhista', retailer: 'Tanah Abang Bukit F/10, Jakarta Pusat\nINDONÉSIA', retailerPhone: 'Telefone da loja retalhista', retailerFax: 'Fax da loja retalhista', phone: 'Telefone', fax: 'Fax', email: 'Email', hours: 'Horario de funcionamento', time: 'Segunda–sexta, 08:00–17:00 WIB', inquiry: 'Conte-nos o que procura.', intro: 'Partilhe alguns detalhes e a nossa equipa ajudara a encontrar o melhor ponto de partida.', noForm: 'Este site nao recolhe envios de formulario.' },
} as const;

export default function Contact({ locale, page, seo }: ContactProps) {
    const copy = contactCopy[locale];
    const imagery = [
        ['/images/contact/IMG_3983.webp', 'Textile consultation in the buyer meeting space'],
        ['/images/about/IMG_3376.webp', 'Asietex textile manufacturing campus'],
        ['/images/why-asietex/IMG_2875.webp', 'Integrated textile production floor'],
        ['/images/career/IMG_3545.webp', 'Textile quality team inspecting fabric'],
    ] as const;

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />
            <article className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                <header className="max-w-4xl">
                    <h1 className="font-heading text-5xl leading-[.94] tracking-[-.04em] md:text-8xl">{page.title}</h1>
                    <p className="mt-7 max-w-3xl text-lg leading-8 whitespace-pre-line text-muted-foreground">{page.body}</p>
                </header>

                {/* Contact details */}
                <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_.85fr] lg:gap-20" aria-label="Contact details">
                    <div>
                        <p className="text-text-accent text-xs font-semibold tracking-[.16em] uppercase">{copy.address}</p>
                        <address className="mt-5 max-w-xl text-xl leading-9 not-italic">Jl. Cideng Timur No. 36, Petojo Utara — Gambir, Jakarta Pusat 10130, Indonesia</address>
                        <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 text-sm">
                            <div><dt className="text-muted-foreground">{copy.phone}</dt><dd className="mt-2"><a href="tel:+622163863999" className="underline underline-offset-4">+62 21 6386 3999</a></dd></div>
                            <div><dt className="text-muted-foreground">{copy.fax}</dt><dd className="mt-2">+62 21 6386 1999</dd></div>
                            <div><dt className="text-muted-foreground">{copy.email}</dt><dd className="mt-2"><a href="mailto:contact.us@asietex.com" className="underline underline-offset-4">contact.us@asietex.com</a></dd></div>
                            <div><dt className="text-muted-foreground">{copy.hours}</dt><dd className="mt-2">{copy.time}</dd></div>
                        </dl>
                        <iframe title="Asietex office location on Google Maps" src="https://www.google.com/maps?q=Jl.+Cideng+Timur+No.+36,+Jakarta+Pusat,+Indonesia&output=embed" className="mt-10 min-h-80 w-full max-w-xl rounded-[1.5rem] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                        <div className="mt-10"><p className="text-text-accent text-xs font-semibold tracking-[.16em] uppercase">{copy.retailerAddress}</p><address className="mt-4 whitespace-pre-line text-lg leading-8 not-italic">{copy.retailer}</address></div>
                        <dl className="mt-7 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 text-sm">
                            <div><dt className="text-muted-foreground">{copy.retailerPhone}</dt><dd className="mt-2">+62 21 3190 9731</dd></div>
                            <div><dt className="text-muted-foreground">{copy.retailerFax}</dt><dd className="mt-2">+62 21 391 1529</dd></div>
                        </dl>
                        <div className="mt-12 grid grid-cols-2 gap-4">{imagery.map(([src, alt]) => <img key={src} src={src} alt={alt} width={1200} height={900} loading="lazy" className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />)}</div>
                    </div>
                    <aside className="h-fit rounded-[1.5rem] bg-secondary p-6 md:p-8">
                        <h2 className="font-heading text-4xl leading-tight">{copy.inquiry}</h2>
                        <p className="mt-5 max-w-md leading-7 text-muted-foreground">{copy.intro}</p>
                        <form className="mt-8" onSubmit={(event) => event.preventDefault()}>
                            <FieldGroup>
                                <Field><FieldLabel htmlFor="contact-name">Name</FieldLabel><Input id="contact-name" name="name" autoComplete="name" /></Field>
                                <Field><FieldLabel htmlFor="contact-email">Email</FieldLabel><Input id="contact-email" name="email" type="email" autoComplete="email" /></Field>
                                <Field><FieldLabel htmlFor="contact-phone">Phone</FieldLabel><Input id="contact-phone" name="phone" type="tel" autoComplete="tel" /></Field>
                                <Field><FieldLabel htmlFor="contact-message">Message</FieldLabel><Textarea id="contact-message" name="message" rows={5} /></Field>
                                <Button type="submit" className="h-12 w-full sm:w-auto">Send message</Button>
                            </FieldGroup>
                        </form>
                        <p className="mt-6 text-sm text-muted-foreground">{copy.noForm}</p>
                    </aside>
                </section>
            </article>
        </PublicLayout>
    );
}
