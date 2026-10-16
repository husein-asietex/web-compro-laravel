<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            'spinning' => 'Spinning',
            'twisting' => 'Twisting',
            'knitting' => 'Knitting',
            'weaving' => 'Weaving',
            'dyeing' => 'Dyeing',
            'yarn-dyeing' => 'Yarn Dyeing',
            'garment' => 'Garment',
            'printing' => 'Printing',
            'finishing' => 'Finishing',
        ];

        $translations = [
            'en' => ['spinning' => 'Spinning', 'twisting' => 'Twisting', 'knitting' => 'Knitting', 'weaving' => 'Weaving', 'dyeing' => 'Dyeing', 'yarn-dyeing' => 'Yarn Dyeing', 'garment' => 'Garment', 'printing' => 'Printing', 'finishing' => 'Finishing'],
            'id' => ['spinning' => 'Pemintalan', 'twisting' => 'Pemuntiran', 'knitting' => 'Perajutan', 'weaving' => 'Pertenunan', 'dyeing' => 'Pencelupan', 'yarn-dyeing' => 'Pencelupan Benang', 'garment' => 'Garmen', 'printing' => 'Pencetakan', 'finishing' => 'Penyempurnaan'],
            'pt' => ['spinning' => 'Fiacao', 'twisting' => 'Torcao', 'knitting' => 'Malharia', 'weaving' => 'Tecelagem', 'dyeing' => 'Tingimento', 'yarn-dyeing' => 'Tingimento de Fios', 'garment' => 'Vestuario', 'printing' => 'Estamparia', 'finishing' => 'Acabamento'],
        ];

        $sortOrder = 1;

        foreach ($products as $slug => $name) {
            $product = Product::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'sort_order' => $sortOrder,
                    'capacity' => 'To be provided',
                    'products' => ['Sample product'],
                    'machinery' => 'Asian and European machinery',
                    'gallery' => $this->galleryFor($slug),
                    'status' => ContentStatus::Published,
                    'draft' => null,
                ],
            );

            foreach ($translations as $locale => $titles) {
                $title = $titles[$slug];
                $body = match ($locale) {
                    'id' => "Produk {$title} untuk rantai produksi tekstil yang terintegrasi.",
                    'pt' => "Produtos de {$title} para uma producao textil integrada.",
                    default => "{$title} products for connected textile production.",
                };
                $range = match ($locale) {
                    'id' => "Ragam produk {$title}",
                    'pt' => "Gama de produtos de {$title}",
                    default => "{$title} product range",
                };
                $product->translations()->updateOrCreate(
                    ['locale' => $locale],
                    [
                        'title' => $title,
                        'body' => $body,
                        'capacity' => $slug === 'dyeing' ? '50,000 t / yr' : match ($locale) {
                            'id' => 'Akan diinformasikan', 'pt' => 'A fornecer', default => 'To be provided'
                        },
                        'products' => [$range, match ($locale) {
                            'id' => 'Produksi tekstil sesuai kebutuhan', 'pt' => 'Producao textil personalizada', default => 'Custom textile production'
                        }],
                        'machinery' => match ($locale) {
                            'id' => 'Mesin berteknologi Asia dan Eropa', 'pt' => 'Maquinaria asiatica e europeia', default => 'Asian and European machinery'
                        },
                    ],
                );
            }

            $sortOrder++;
        }
    }

    /** @return list<string> */
    private function galleryFor(string $slug): array
    {
        return match ($slug) {
            'spinning' => ['/images/products/1-spinning-4.webp', '/images/products/1-spinning-3.webp'],
            'twisting' => ['/images/products/IMG_3588.webp', '/images/products/IMG_3589.webp'],
            'knitting' => ['/images/products/3-knitting.webp', '/images/products/3-knitting-2.webp'],
            'weaving' => ['/images/products/4-weaving-1.webp', '/images/products/4-weaving-2.webp'],
            'dyeing' => ['/images/products/IMG_4017.webp', '/images/products/IMG_4022.webp'],
            'yarn-dyeing' => ['/images/products/IMG_3726-yarn.webp', '/images/products/IMG_3733.webp'],
            'garment' => ['/images/products/IMG_3025.webp', '/images/products/IMG_3028.webp'],
            'printing' => ['/images/products/IMG_3063.webp', '/images/products/IMG_3065.webp'],
            default => ['/images/products/IMG_3548.webp', '/images/products/IMG_3557.webp'],
        };
    }
}
