<?php

namespace Database\Seeders;

use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use Illuminate\Database\Seeder;

class MediaAssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $legacyUrls = [
            '/images/home/IMG_3406-hero.JPG' => '/images/home/IMG_3406-hero.webp',
            '/images/about/IMG_2836.JPG' => '/images/about/IMG_2836.webp',
            '/images/career/IMG_3000.JPG' => '/images/career/IMG_3000.webp',
            '/images/contact/IMG_3983.JPG' => '/images/contact/IMG_3983.webp',
            '/images/products/1-spinning.JPG' => '/images/products/1-spinning.webp',
            '/images/products/IMG_2893.JPG' => '/images/products/IMG_2893.webp',
            '/images/products/3-knitting.JPG' => '/images/products/3-knitting.webp',
            '/images/products/4-weaving-1.JPG' => '/images/products/4-weaving-1.webp',
            '/images/products/IMG_3444.JPG' => '/images/products/IMG_3444.webp',
            '/images/products/IMG_3726-yarn.JPG' => '/images/products/IMG_3726-yarn.webp',
            '/images/products/IMG_4017.JPG' => '/images/products/IMG_4017.webp',
            '/images/products/IMG_4025.JPG' => '/images/products/IMG_4025.webp',
            '/images/products/IMG_4037.JPG' => '/images/products/IMG_4037.webp',
        ];

        foreach ($legacyUrls as $legacyUrl => $webpUrl) {
            $media = MediaAsset::query()->where('url', $legacyUrl)->first();

            if ($media !== null && ! MediaAsset::query()->where('url', $webpUrl)->exists()) {
                $media->update(['url' => $webpUrl]);
            }
        }

        $pageMedia = [
            'home' => ['/images/home/IMG_3406-hero.webp', 'Asietex integrated textile manufacturing facility'],
            'about' => ['/images/about/IMG_2836.webp', 'Asietex factory and production environment'],
            'career' => ['/images/career/IMG_3000.webp', 'Asietex production team at work'],
            'contact' => ['/images/contact/IMG_3983.webp', 'Asietex company location'],
        ];

        foreach ($pageMedia as $slug => [$url, $alt]) {
            $page = Page::query()->where('slug', $slug)->firstOrFail();
            $this->seedMedia($url, $alt, pageId: $page->getKey());
        }

        $productMedia = [
            'spinning' => ['/images/products/1-spinning.webp', 'Spinning production at Asietex'],
            'twisting' => ['/images/products/IMG_2893.webp', 'Yarn twisting production at Asietex'],
            'knitting' => ['/images/products/3-knitting.webp', 'Knitting production at Asietex'],
            'weaving' => ['/images/products/4-weaving-1.webp', 'Weaving production at Asietex'],
            'dyeing' => ['/images/products/IMG_3444.webp', 'Textile dyeing production at Asietex'],
            'yarn-dyeing' => ['/images/products/IMG_3726-yarn.webp', 'Yarn dyeing production at Asietex'],
            'garment' => ['/images/products/IMG_4017.webp', 'Garment production at Asietex'],
            'printing' => ['/images/products/IMG_4025.webp', 'Textile printing production at Asietex'],
            'finishing' => ['/images/products/IMG_4037.webp', 'Textile finishing production at Asietex'],
        ];

        foreach ($productMedia as $slug => [$url, $alt]) {
            $product = Product::query()->where('slug', $slug)->firstOrFail();
            $this->seedMedia($url, $alt, productId: $product->getKey());
            $product->update(['gallery' => [$url]]);
        }
    }

    private function seedMedia(string $url, string $alt, ?int $pageId = null, ?int $productId = null): void
    {
        MediaAsset::query()->updateOrCreate(
            ['url' => $url],
            [
                'alt_en' => $alt,
                'alt_id' => $alt,
                'alt_pt' => $alt,
                'credit' => 'Asietex',
                'approved' => true,
                'page_id' => $pageId,
                'product_id' => $productId,
            ],
        );
    }
}
