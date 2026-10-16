<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            'home' => 'Home',
            'about' => 'About Asietex',
            'products' => 'Products',
            'career' => 'Careers',
            'contact' => 'Contact',
        ];

        $copy = [
            'en' => [
                'home' => ['Integrated textile manufacturer', 'From yarn to finished fabric, Asietex brings spinning, knitting, dyeing, printing, and finishing together in one connected textile operation.'],
                'products' => ['Nine products. One connected production chain.', 'Explore the products behind Asietex, from spinning and twisting to dyeing, printing, garment, and finishing.'],
            ],
            'id' => [
                'home' => ['Produsen tekstil terintegrasi', 'Dari benang hingga kain jadi, Asietex menyatukan spinning, knitting, dyeing, printing, dan finishing dalam satu operasi tekstil yang terhubung.'],
                'products' => ['Sembilan produk. Satu rantai produksi yang terhubung.', 'Jelajahi produk Asietex, mulai dari spinning dan twisting hingga dyeing, printing, garment, dan finishing.'],
            ],
            'pt' => [
                'home' => ['Fabricante têxtil integrado', 'Do fio ao tecido acabado, a Asietex reúne fiação, malharia, tingimento, impressão e acabamento numa operação têxtil integrada.'],
                'products' => ['Nove produtos. Uma cadeia de produção ligada.', 'Explore os produtos da Asietex, desde a fiação e torção até ao tingimento, impressão, confeção e acabamento.'],
            ],
        ];

        $copy['en']['career'] = [
            'Build the next thread of Asietex.',
            'Join an Asietex team shaped by curiosity, care, and disciplined work across the textile chain. Send us your profile and tell us how your craft can move us forward.',
        ];
        $copy['en']['about'] = [
            'Company profile',
            "Asietex has been a constant and reassuring presence throughout our business history. Our origins can be traced back to 1985, and we have since evolved into a recognized presence in domestic and international markets.\n\nAs an integrated textile company, Asietex manufactures products from yarn to fabric. Cotton and rayon fabrics account for 85% of our fabric topline, with polyester making up the balance.\n\nOur factories combine sophisticated machinery with Asian and European technology, supported by a well-trained workforce. This gives us a competitive advantage and helps us use resources effectively and efficiently.\n\nWe are proud to deliver a broad range of high-quality products that meet the needs of the global market.",
        ];
        $copy['id']['about'] = [
            'Profil perusahaan',
            'Asietex berkembang sejak tahun 1985 menjadi perusahaan tekstil terintegrasi, memproduksi dari benang hingga kain untuk pasar domestik dan internasional. Tim terlatih serta kombinasi mesin Asia dan Eropa mendukung produksi yang efisien dan kualitas yang konsisten.',
        ];
        $copy['pt']['about'] = [
            'Perfil da empresa',
            'A Asietex cresceu desde 1985 e tornou-se um fabricante textil integrado, produzindo desde o fio ate ao tecido para mercados nacionais e internacionais. Equipas qualificadas e maquinaria asiatica e europeia apoiam uma producao eficiente e qualidade consistente.',
        ];
        $copy['id']['career'] = [
            'Bangun benang masa depan Asietex.',
            'Bergabunglah dengan tim Asietex yang menghubungkan manusia, proses, dan peluang di sepanjang rantai tekstil. Kirimkan profil Anda dan ceritakan bagaimana keahlian Anda dapat mendorong kami maju.',
        ];
        $copy['pt']['career'] = [
            'Construa o proximo fio da Asietex.',
            'Junte-se a equipa da Asietex, que liga pessoas, processos e possibilidades em toda a cadeia textil. Envie o seu perfil e diga-nos como a sua experiencia pode fazer-nos avancar.',
        ];
        $copy['en']['contact'] = [
            "Let's talk about your next textile project.",
            'Reach our team in Jakarta for product questions, sample discussions, and commercial enquiries.',
        ];
        $copy['id']['contact'] = [
            'Mari bicarakan proyek tekstil Anda berikutnya.',
            'Hubungi tim kami di Jakarta untuk pertanyaan produk, diskusi sampel, dan kebutuhan komersial.',
        ];
        $copy['pt']['contact'] = [
            'Vamos falar sobre o seu proximo projeto textil.',
            'Contacte a nossa equipa em Jacarta para questoes sobre produtos, amostras e conversas comerciais.',
        ];

        foreach ($pages as $slug => $title) {
            $page = Page::query()->updateOrCreate(
                ['slug' => $slug],
                ['status' => ContentStatus::Published, 'draft' => null],
            );

            foreach (['en', 'id', 'pt'] as $locale) {
                [$pageTitle, $pageBody] = $copy[$locale][$slug];
                $page->translations()->updateOrCreate(
                    ['locale' => $locale],
                    ['title' => $pageTitle, 'body' => $pageBody],
                );
            }
        }
    }
}
