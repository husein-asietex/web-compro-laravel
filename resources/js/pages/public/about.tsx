import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { SeoHead } from '@/components/seo-head';
import PublicLayout from '@/layouts/public-layout';
import publicRoutes from '@/routes/public';
import type { Locale, PublicPage, Seo } from '@/types';

type AboutProps = { locale: Locale; page: PublicPage; seo: Seo };

const aboutContent = {
    en: {
        facts: [
            {
                value: '1985',
                label: 'The year our textile journey began'
            }, {
                value: '3',
                label: 'Production sites across Java'
            }, {
                value: '85%',
                label: 'Cotton and rayon in the fabric mix'
            }
        ],
        historyLabel: 'History & milestones',
        historyTitle: 'Four decades of building an integrated textile operation.',
        historyIntro: 'From our first circular knitting machines to a broader production and export network, each milestone added capability, reach, or continuity to the business.',
        milestones: [
            {
                year: '1985',
                title: 'Karawaci knitting factory',
                description: 'Opened our first knitting factory in Karawaci, Tangerang, with 40 circular knitting machines.'
            }, {
                year: '1987',
                title: 'Bandung expansion',
                description: 'Added a second knitting factory in Bandung, West Java, with another 40 circular knitting machines.'
            }, {
                year: '2002',
                title: 'Integrated Cikampek factory',
                description: 'Consolidated the Karawaci and Bandung knitting operations into an integrated factory in Cikampek, Karawang.'
            }, {
                year: '2004',
                title: 'First European market',
                description: 'Expanded into Europe through France, followed by Italy in 2005.'
            }, {
                year: '2007',
                title: 'Spinning investment',
                description: 'Installed a complete spinning line for Rayon OE 30–40s yarn.'
            }, {
                year: '2009',
                title: 'Wider export reach',
                description: 'Started exporting fabrics to Sri Lanka, Vietnam, Cambodia, the United States, and China.'
            }, {
                year: '2011',
                title: 'Jakarta head office',
                description: 'Opened an owned head office building on Jalan Biak No. 60 in Jakarta.'
            }, {
                year: '2016',
                title: 'Cikande knitting factory',
                description: 'Established a knitting factory in Cikande, Serang.'
            }, {
                year: '2017',
                title: 'New Cikande spinning line',
                description: 'Added a new spinning line at the Cikande factory.'
            }, {
                year: '2017',
                title: 'Garment production',
                description: 'Started garment production lines in Karawaci, Banten.'
            }, {
                year: '2017',
                title: 'Portugal and Brazil',
                description: 'Expanded the market network to Portugal and Brazil.'
            }, {
                year: '2017',
                title: 'Cideng service office',
                description: 'Opened a new office tower on Cideng Timur No. 36 in Jakarta to strengthen customer service.'
            }, {
                year: '2020',
                title: 'Pemalang knitting factory',
                description: 'Established a new knitting factory in Pemalang, Central Java.'
            }
        ],
        visionLabel: 'Our vision',
        vision: 'To become the innovative partner and deliver one-stop shopping for a range of textile products.',
        missionLabel: 'Our mission',
        mission: 'To combine technology, innovation, experience, skills and responsibility to ensure customer satisfaction.',
        factoriesLabel: 'FACTORY',
        factoriesTitle: 'Factories',
        factories: [
            {
                name: 'MAIN FACTORY',
                details: [
                    ['Company', 'PT. Asietex Sinar Indopratama'],
                    ['Address', 'Jl. Akses Interchange Dawuan No. 2, Cikampek Pusaka, Cikampek, Karawang, Jawa Barat 41373 - Indonesia'],
                    ['Established', '2002'],
                    ['Size Area', '± 200.000 Sqm'],
                    ['Total Employee', 'Around 2.000'],
                    ['Capacity', '100 tons/day (Knitted Fabric), 90 tons/day (Dyed Fabric), 65.000m/day (Printed Fabric) and 100 tons/day (Finished Fabric)'],
                    ['Major Products', 'Cotton, Viscose, Polyester/Rayon, Polyester/Cotton, Nylon, Polyester Spandex, Cotton Spandex, Polar Fleece, Micro Fleece, Velour, Velvet, etc'],
                    ['Main Export Buyer', 'TARGET, W-MART, H&M, KHOL’S, Mango, Zara, Old Navy, Muji, Adidas, Uniqlo'],
                    ['Market', 'Local 65%, Asia 10%, Europe 15%, USA 10%']
                ]
            }, {
                name: 'CIKANDE FACTORY',
                details: [
                    ['Company', 'PT. Asietex Sinar Indopratama'],
                    ['Address', 'Jl. Raya Cikande - Rangkas Bitung KM 5, Desa Kareo, Kec. Jawilan, Kab. Serang, Banten 42177 - Indonesia'],
                    ['Established', '2016'],
                    ['Size Area', '± 300.000 Sqm'],
                    ['Total Employee', 'Around 1.000'],
                    ['Capacity', '60 tons/day (Spinning), 25 tons/day (Weaving) and 35 tons/day (Knitting)'],
                    ['Products - Greige', 'Velour, Polar Fleece, Micro Fleece, Single Jersey, Computer Jaquard, Pique, Rib, Interlock, etc.'],
                    ['Products - Yarn', 'Cotton, Viscose, Polyester/Rayon, Polyester/Cotton, Nylon, etc.']
                ]
            }, {
                name: 'PEMALANG FACTORY',
                details: [
                    ['Company', 'PT. Asietex Sinar Indopratama'],
                    ['Address', 'Jl. Pemalang Randu Dongkal KM.11 RT.005/RW.001 No.158, Desa Lenggerong, Kec. Bantar Bolang, Kabupaten Pemalang, Jawa Tengah 52352 - Indonesia'],
                    ['Established', '2020'],
                    ['Size Area', '± 7,500 Sqm'],
                    ['Total Employee', 'Around 100'],
                    ['Capacity', '12 ton/day'],
                    ['Major Products', 'Jersey, Zacquard, Mini Jack, Ponte, Rib'],
                    ['Market', 'Domestic 100%']
                ]
            }
        ],
        affiliatesLabel: 'AFFILIATE COMPANY',
        affiliatesTitle: 'Affiliate Company',
        affiliates: [
            {
                name: 'XiongYing Knitting And Dyeing (Changshu) CO.,LTd',
                details: [
                    ['Company', 'XiongYing Knitting And Dyeing (Changshu) CO.,LTd'],
                    ['Address', 'Guli town ChangShu JiangSu China, Zip Code : 215533'],
                    ['Established', '1994'],
                    ['Size Area', '± 200,000 Sqm'],
                    ['Total Employee', 'Around 2,000 employee'],
                    ['Revenue', '94 million USD per year'],
                    ['Capacity', 'Around 1,800 tons per month'],
                    ['Products', 'Velour, Polar Fleece, Micro Fleece, Single Jersey, Computer Jaquard, Pique, Rib, Interlock, etc']
                ]
            }, {
                name: 'PT. Annie Anna Sister Garmindo Utama',
                details: [
                    ['Company', 'PT. Annie Anna Sister Garmindo Utama'],
                    ['Address', 'Jl. Pemalang Randu Dongkal KM 11, RT.005/RW.001 No.158,\nDesa Lenggerong, Kec. Bantar Bolang, Kabupaten Pemalang\nJawa Tengah 52352 - Indonesia'],
                    ['Established', '2020'],
                    ['Size Area', '± 9,720 Sqm'],
                    ['Total Employee', 'Around 500 employee'],
                    ['Capacity', '100,000 - 150,000 pcs/month'],
                    ['Major Products', 'Garment (Mens, Ladies, Kids)'],
                    ['Market', 'Domestic and Export']
                ]
            }
        ],
        networkTitle: 'A production base in Indonesia, connected to buyers across three continents.',
        networkIntro: 'Our market development began in Europe and expanded through Asia and the Americas. These are the destinations named in Asietex’s company history and operating profile.', marketMixTitle: 'Main factory market mix', marketMixNote: 'Market shares reflect the operating profile published for the main Cikampek factory.', marketMix: [{ label: 'Domestic', value: 65 }, { label: 'Europe', value: 15 }, { label: 'Asia', value: 10 }, { label: 'United States', value: 10 }], networkLabel: 'International market network', regions: [{ name: 'Asia', markets: ['Indonesia', 'Sri Lanka', 'Vietnam', 'Cambodia', 'China', 'Japan', 'South Korea'] }, { name: 'Europe', markets: ['France', 'Italy', 'Portugal'] }, { name: 'Americas', markets: ['United States', 'Brazil'] }],
        ctaLabel: 'Start a conversation',
        ctaTitle: 'Connect your next textile program to our production network.',
        ctaBody: 'Talk with our team about products, capacity, samples, or the right starting point for your requirements.',
        contact: 'Talk to our team',
        products: 'Explore products',
    },
    id: {
        facts: [
            {
                value: '1985',
                label: 'Awal perjalanan tekstil kami'
            }, {
                value: '3',
                label: 'Lokasi produksi di Pulau Jawa'
            }, {
                value: '85%',
                label: 'Katun dan rayon dalam komposisi kain'
            }
        ],
        historyLabel: 'Sejarah & pencapaian',
        historyTitle: 'Empat dekade membangun operasi tekstil terintegrasi.',
        historyIntro: 'Dari mesin rajut sirkular pertama hingga jaringan produksi dan ekspor yang lebih luas.',
        milestones: [
            {
                year: '1985',
                title: 'Pabrik rajut Karawaci',
                description: 'Membuka pabrik rajut pertama di Karawaci, Tangerang.'
            }, {
                year: '1987',
                title: 'Ekspansi Bandung',
                description: 'Menambah pabrik rajut kedua di Bandung.'
            }, {
                year: '2002',
                title: 'Pabrik terpadu Cikampek',
                description: 'Mengkonsolidasikan operasi rajut ke Cikampek, Karawang.'
            }, {
                year: '2004',
                title: 'Pasar Eropa pertama',
                description: 'Memperluas pasar ke Eropa melalui Prancis.'
            }, {
                year: '2016',
                title: 'Pabrik Cikande',
                description: 'Mendirikan pabrik rajut di Cikande, Serang.'
            }, {
                year: '2020',
                title: 'Pabrik Pemalang',
                description: 'Mendirikan pabrik rajut di Pemalang, Jawa Tengah.'
            }
        ],
        visionLabel: 'Visi kami',
        vision: 'Menjadi mitra inovatif dan menghadirkan one-stop shopping untuk berbagai produk tekstil.',
        missionLabel: 'Misi kami',
        mission: 'Menggabungkan teknologi, inovasi, pengalaman, keahlian, dan tanggung jawab untuk kepuasan pelanggan.',
        factoriesLabel: 'PABRIK',
        factoriesTitle: 'Pabrik',
        factories: [
            {
                name: 'PABRIK UTAMA',
                details: [
                    ['Perusahaan', 'PT. Asietex Sinar Indopratama'],
                    ['Lokasi', 'Cikampek, Karawang, Jawa Barat'],
                    ['Didirikan', '2002'],
                    ['Kapasitas', 'Kain rajut, celup, cetak, dan finishing']
                ]
            }, {
                name: 'PABRIK CIKANDE',
                details: [
                    ['Lokasi', 'Serang, Banten'],
                    ['Didirikan', '2016'],
                    ['Kapasitas', 'Spinning, weaving, dan knitting']
                ]
            }, {
                name: 'PABRIK PEMALANG',
                details: [
                    ['Lokasi', 'Pemalang, Jawa Tengah'],
                    ['Didirikan', '2020'],
                    ['Kapasitas', '12 ton per hari']
                ]
            }
        ],
        affiliatesLabel: 'PERUSAHAAN AFILIASI',
        affiliatesTitle: 'Perusahaan Afiliasi',
        affiliates: [
            {
                name: 'XiongYing Knitting And Dyeing (Changshu) CO., LTd',
                details: [
                    ['Lokasi', 'Changshu, Jiangsu, China'],
                    ['Didirikan', '1994'],
                    ['Kapasitas', 'Sekitar 1.800 ton per bulan']
                ]
            },
            {
                name: 'PT. Annie Anna Sister Garmindo Utama',
                details:
                    [
                        ['Lokasi', 'Pemalang, Jawa Tengah'],
                        ['Didirikan', '2020'],
                        ['Produk', 'Garmen pria, wanita, dan anak']
                    ]
            }
        ],
        networkTitle: 'Basis produksi di Indonesia, terhubung dengan pembeli di tiga benua.',
        networkIntro: 'Pengembangan pasar kami bermula di Eropa dan berkembang ke Asia serta Amerika.',
        marketMixTitle: 'Komposisi pasar pabrik utama',
        marketMixNote: 'Persentase pasar berdasarkan profil operasional pabrik utama Cikampek.',
        marketMix: [
            {
                label: 'Domestik',
                value: 65
            }, {
                label: 'Eropa',
                value: 15

            }, {
                label: 'Asia',
                value: 10
            }, {
                label: 'Amerika Serikat',
                value: 10
            }
        ],
        networkLabel:
            'Jaringan pasar internasional',
        regions: [
            {
                name: 'Asia',
                markets: ['Indonesia', 'Sri Lanka', 'Vietnam', 'Kamboja', 'China']
            }, {
                name: 'Eropa',
                markets: ['Prancis', 'Italia', 'Portugal']
            }, {
                name: 'Amerika',
                markets: ['Amerika Serikat', 'Brasil']
            }
        ],
        ctaLabel: 'Mulai percakapan',
        ctaTitle: 'Hubungkan program tekstil Anda berikutnya dengan jaringan produksi kami.',
        ctaBody: 'Bicarakan produk, kapasitas, sampel, atau kebutuhan Anda bersama tim kami.',
        contact: 'Hubungi tim kami',
        products: 'Jelajahi produk',
    },
    pt: {
        facts: [
            {
                value: '1985', label: 'O início da nossa jornada têxtil'
            }, {
                value: '3', label: 'Unidades de produção em Java'
            }, {
                value: '85%',
                label: 'Algodão e rayon na composição dos tecidos'
            }
        ],
        historyLabel: 'História e marcos',
        historyTitle: 'Quatro décadas a construir uma operação têxtil integrada.',
        historyIntro: 'Das primeiras máquinas circulares de malha a uma rede mais ampla de produção e exportação.',
        milestones: [
            {
                year: '1985', title: 'Fábrica de malha de Karawaci',
                description: 'Abertura da primeira fábrica de malha em Karawaci, Tangerang.'
            }, {
                year: '1987',
                title: 'Expansão de Bandung',
                description: 'Adição da segunda fábrica de malha em Bandung.'
            }, {
                year: '2002',
                title: 'Fábrica integrada de Cikampek',
                description: 'Consolidação das operações de malha em Cikampek, Karawang.'
            }, {
                year: '2004',
                title: 'Primeiro mercado europeu',
                description: 'Expansão para a Europa através de França.'
            }, {
                year: '2016',
                title: 'Fábrica de Cikande',
                description: 'Estabelecimento de uma fábrica de malha em Cikande, Serang.'
            }, {
                year: '2020',
                title: 'Fábrica de Pemalang',
                description: 'Estabelecimento de uma fábrica de malha em Pemalang, Java Central.'
            }
        ],
        visionLabel: 'A nossa visão',
        vision: 'Ser o parceiro inovador e disponibilizar one-stop shopping para uma gama de produtos têxteis.',
        missionLabel: 'A nossa missão',
        mission: 'Combinar tecnologia, inovação, experiência, competências e responsabilidade para a satisfação do cliente.',
        factoriesLabel: 'FÁBRICA',
        factoriesTitle: 'Fábricas',
        factories: [
            {
                name: 'FÁBRICA PRINCIPAL',
                details: [
                    ['Empresa', 'PT. Asietex Sinar Indopratama'],
                    ['Localização', 'Cikampek, Karawang, Java Ocidental'],
                    ['Fundação', '2002'],
                    ['Capacidade', 'Malha, tingimento, impressão e acabamento']
                ]
            }, {
                name: 'FÁBRICA DE CIKANDE',
                details: [
                    ['Localização', 'Serang, Banten'],
                    ['Fundação', '2016'],
                    ['Capacidade', 'Fiação, tecelagem e malharia']
                ]
            }, {
                name: 'FÁBRICA DE PEMALANG',
                details: [
                    ['Localização', 'Pemalang, Java Central'],
                    ['Fundação', '2020'],
                    ['Capacidade', '12 toneladas por dia']
                ]
            }
        ],
        affiliatesLabel: 'EMPRESA AFILIADA',
        affiliatesTitle: 'Empresa Afiliada',
        affiliates: [
            {
                name: 'XiongYing Knitting And Dyeing (Changshu) CO., LTd',
                details: [
                    ['Localização', 'Changshu, Jiangsu, China'],
                    ['Fundação', '1994'],
                    ['Capacidade', 'Cerca de 1.800 toneladas por mês']
                ]
            }, {
                name: 'PT. Annie Anna Sister Garmindo Utama',
                details: [
                    ['Localização', 'Pemalang, Java Central'],
                    ['Fundação', '2020'],
                    ['Produtos', 'Vestuário para homem, senhora e criança']
                ]
            }
        ],
        networkTitle: 'Uma base de produção na Indonésia, ligada a compradores em três continentes.',
        networkIntro: 'O desenvolvimento do nosso mercado começou na Europa e expandiu-se pela Ásia e Américas.',
        marketMixTitle: 'Distribuição do mercado da fábrica principal',
        marketMixNote: 'As quotas de mercado refletem o perfil operacional publicado para a fábrica principal em Cikampek.',
        marketMix: [
            {
                label: 'Mercado interno',
                value: 65

            }, {
                label: 'Europa', value: 15

            }, {
                label: 'Ásia', value: 10
            }, {
                label: 'Estados Unidos', value: 10
            }
        ],
        networkLabel: 'Rede de mercados internacionais',
        regions: [
            {
                name: 'Ásia',
                markets: ['Indonésia', 'Sri Lanka', 'Vietname', 'Camboja', 'China']
            }, {
                name: 'Europa',
                markets: ['França', 'Itália', 'Portugal']
            }, {
                name: 'Américas',
                markets: ['Estados Unidos', 'Brasil']
            }
        ],
        ctaLabel: 'Iniciar uma conversa',
        ctaTitle: 'Ligue o seu próximo programa têxtil à nossa rede de produção.',
        ctaBody: 'Fale com a nossa equipa sobre produtos, capacidade, amostras ou as suas necessidades.',
        contact: 'Falar com a equipa',
        products: 'Explorar produtos',
    },
} as const;

export default function About({ locale, page, seo }: AboutProps) {
    const content = (aboutContent[locale] ?? aboutContent.en) as typeof aboutContent.en;

    return (
        <PublicLayout locale={locale}>
            <SeoHead seo={seo} />

            <article>

                {/* Company introduction */}
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <div className="relative min-h-112 overflow-hidden rounded-[1.25rem] bg-primary text-primary-foreground md:min-h-90">
                        <img
                            src="/images/about/IMG_3426.webp"
                            alt=""
                            width={1600}
                            height={1000}
                            fetchPriority="high"
                            className="absolute inset-0 size-full object-cover"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,20,17,.7),rgba(13,20,17,.05)_65%)]" />

                        <h1 className="absolute right-6 bottom-7 left-6 max-w-xl font-heading text-6xl leading-[.88] tracking-[-.04em] md:right-auto md:bottom-12 md:left-11 md:text-8xl">
                            {page.title}
                        </h1>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-end">
                        <dl className="grid overflow-hidden rounded-[1.25rem] border border-border bg-border sm:grid-cols-3">
                            {content.facts.map((fact) => (
                                <div
                                    key={fact.label}
                                    className="bg-card p-6 sm:border-r sm:last:border-r-0"
                                >
                                    <dt className="min-h-12 text-sm leading-6 text-muted-foreground">
                                        {fact.label}
                                    </dt>
                                    <dd className="text-text-accent mt-8 font-heading text-4xl">
                                        {fact.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <p className="max-w-2xl text-base leading-8 whitespace-pre-line text-muted-foreground">
                            {page.body}
                        </p>
                    </div>
                </section>

                {/* Company history */}
                <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-text-accent text-sm font-medium">
                            {content.historyLabel}
                        </p>
                        <h2 className="mt-4 max-w-lg font-heading text-4xl leading-tight md:text-5xl">
                            {content.historyTitle}
                        </h2>
                        <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                            {content.historyIntro}
                        </p>
                    </div>

                    <ol className="border-s border-border ps-7 md:ps-11">
                        {content.milestones.map((item, index) => (
                            <li
                                key={`${item.year}-${item.title}`}
                                className="relative grid gap-2 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-6"
                            >
                                <span
                                    className={`absolute -start-[2.05rem] size-3 rounded-full border-[3px] border-background bg-accent md:-start-[3.15rem] ${index === 0 ? 'top-1' : 'top-9'
                                        }`}
                                />

                                <p className="font-heading text-2xl text-text-accent">
                                    {item.year}
                                </p>

                                <div>
                                    <h3 className="text-xl font-medium">{item.title}</h3>
                                    <p className="mt-2 leading-7 text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Vision and mission */}
                <section className="bg-primary text-primary-foreground">
                    <div className="mx-auto grid max-w-7xl border-y border-primary-foreground/20 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
                        <article className="py-8 md:py-12 md:pe-12">
                            <p className="text-sm text-accent">{content.visionLabel}</p>
                            <p className="mt-5 max-w-xl font-heading text-3xl leading-snug md:text-4xl">
                                {content.vision}
                            </p>
                        </article>

                        <article className="border-t border-primary-foreground/20 py-8 md:border-s md:border-t-0 md:py-12 md:ps-12">
                            <p className="text-sm text-accent">{content.missionLabel}</p>
                            <p className="mt-5 max-w-xl font-heading text-3xl leading-snug md:text-4xl">
                                {content.mission}
                            </p>
                        </article>
                    </div>
                </section>

                <AboutDetails
                    title={content.factoriesTitle}
                    label={content.factoriesLabel}
                    entries={content.factories}
                    image="/images/about/IMG_3376.webp"
                />

                <AboutDetails
                    title={content.affiliatesTitle}
                    label={content.affiliatesLabel}
                    entries={content.affiliates}
                    secondary
                />

                {/* Global network */}
                <section className="bg-primary text-primary-foreground">
                    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
                        <h2 className="max-w-4xl font-heading text-5xl leading-none md:text-7xl">
                            {content.networkTitle}
                        </h2>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-primary-foreground/70">
                            {content.networkIntro}
                        </p>

                        <div className="mt-12">
                            <h3 className="text-sm font-medium text-accent">
                                {content.marketMixTitle}
                            </h3>

                            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                                {content.marketMix.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[1.25rem] bg-primary-foreground/10 p-6"
                                    >
                                        <p className="text-sm text-primary-foreground/65">
                                            {item.label}
                                        </p>
                                        <p className="mt-7 font-heading text-5xl">
                                            {item.value}%
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/60">
                                {content.marketMixNote}
                            </p>
                        </div>

                        <div className="mt-10 rounded-[1.25rem] bg-card p-7 text-foreground">
                            <h3 className="font-heading text-3xl">{content.networkLabel}</h3>

                            <div className="mt-7 grid gap-7 md:grid-cols-3">
                                {content.regions.map((region) => (
                                    <div key={region.name}>
                                        <h4 className="font-heading text-2xl text-text-accent">
                                            {region.name}
                                        </h4>
                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {region.markets.join(', ')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact call to action */}
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <div className="grid gap-8 rounded-[2rem] bg-card px-6 py-12 lg:grid-cols-[1fr_auto] lg:items-end md:px-12 md:py-16">
                        <div>
                            <p className="text-text-accent text-sm font-medium">
                                {content.ctaLabel}
                            </p>
                            <h2 className="mt-4 max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
                                {content.ctaTitle}
                            </h2>
                            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                                {content.ctaBody}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={publicRoutes.contact(locale)}
                                className={buttonVariants({ size: 'lg' })}
                            >
                                {content.contact}
                            </Link>
                            <Link
                                href={publicRoutes.products.index(locale)}
                                className={buttonVariants({
                                    variant: 'outline',
                                    size: 'lg',
                                })}
                            >
                                {content.products}
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        </PublicLayout>
    );
}

function AboutDetails(
    {
        title,
        label,
        entries,
        image,
        secondary = false
    }: {
        title: string;
        label: string;
        entries: ReadonlyArray<{
            name: string;
            details: ReadonlyArray<readonly [string, string]>
        }>;
        image?: string;
        secondary?: boolean
    }) {

    const content =
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <p className="text-text-accent text-sm font-medium">{label}</p>
            <h2 className="mt-4 font-heading text-5xl leading-none md:text-7xl">{title}</h2>
            {image &&
                <img src={image} alt="" width={1600} height={700} loading="lazy" className="mt-12 aspect-[16/5] min-h-72 w-full rounded-[1.25rem] object-[center_70%] object-cover" />
            }
            <div className="mt-12">
                {entries.map((entry, index) =>
                    <article key={entry.name} className="grid gap-7 border-t border-border py-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
                        <div>
                            <p className="text-sm text-muted-foreground">{String(index + 1).padStart(2, '0')}</p>
                            <h3 className="mt-3 font-heading text-3xl">{entry.name}</h3>
                        </div>
                        <dl>{entry.details.map(([key, value]) =>
                            <div key={key} className="grid gap-2 border-b border-border py-3 last:border-b-0 sm:grid-cols-[9rem_1fr]">
                                <dt className="text-text-accent text-sm font-medium">{key}</dt>
                                <dd className="leading-7 whitespace-pre-line text-muted-foreground">{value}</dd>
                            </div>
                        )}
                        </dl>
                    </article>
                )}
            </div>
        </div>;

    return (
        <>

            {/* Company details */}
            {secondary ? (
                <section className="bg-secondary">{content}</section>
            ) : (
                <section>{content}</section>
            )}
        </>
    );
}
