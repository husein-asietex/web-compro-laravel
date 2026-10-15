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
                'home' => ['Integrated textile manufacturer', 'Example CMS content. Replace with approved commercial material before publishing.'],
                'products' => ['Nine products. One connected production chain.', 'Explore the products behind Asietex, from spinning and twisting to dyeing, printing, garment, and finishing.'],
            ],
            'id' => [
                'home' => ['Produsen tekstil terintegrasi', 'Konten contoh CMS. Ganti dengan materi komersial yang telah disetujui sebelum publikasi.'],
                'products' => ['Sembilan produk. Satu rantai produksi yang terhubung.', 'Jelajahi produk Asietex, mulai dari spinning dan twisting hingga dyeing, printing, garment, dan finishing.'],
            ],
            'pt' => [
                'home' => ['Fabricante têxtil integrado', 'Conteúdo de exemplo do CMS. Substitua pelo material comercial aprovado antes da publicação.'],
                'products' => ['Nove produtos. Uma cadeia de produção ligada.', 'Explore os produtos da Asietex, desde a fiação e torção até ao tingimento, impressão, confeção e acabamento.'],
            ],
        ];

        foreach ($pages as $slug => $title) {
            $page = Page::query()->updateOrCreate(
                ['slug' => $slug],
                ['status' => ContentStatus::Published, 'draft' => null],
            );

            foreach (['en', 'id', 'pt'] as $locale) {
                [$pageTitle, $pageBody] = $copy[$locale][$slug] ?? [
                    ($locale === 'en' ? '' : strtoupper($locale).': ').$title,
                    ($locale === 'en' ? '' : strtoupper($locale).': ').'Dummy content for the '.$title.' page.',
                ];
                $page->translations()->updateOrCreate(
                    ['locale' => $locale],
                    ['title' => $pageTitle, 'body' => $pageBody],
                );
            }
        }
    }
}
