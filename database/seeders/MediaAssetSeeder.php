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
            '/home/IMG_3406-hero.JPG' => '/home/IMG_3406-hero.webp',
            '/about/IMG_2836.JPG' => '/about/IMG_2836.webp',
            '/career/IMG_3000.JPG' => '/career/IMG_3000.webp',
            '/contact/IMG_3983.JPG' => '/contact/IMG_3983.webp',
            '/products/1-spinning.JPG' => '/products/1-spinning.webp',
            '/products/IMG_2893.JPG' => '/products/IMG_2893.webp',
            '/products/3-knitting.JPG' => '/products/3-knitting.webp',
            '/products/4-weaving-1.JPG' => '/products/4-weaving-1.webp',
            '/products/IMG_3444.JPG' => '/products/IMG_3444.webp',
            '/products/IMG_3726-yarn.JPG' => '/products/IMG_3726-yarn.webp',
            '/products/IMG_4017.JPG' => '/products/IMG_4017.webp',
            '/products/IMG_4025.JPG' => '/products/IMG_4025.webp',
            '/products/IMG_4037.JPG' => '/products/IMG_4037.webp',
        ];

        foreach ($legacyUrls as $legacyUrl => $webpUrl) {
            $media = MediaAsset::query()->where('url', $legacyUrl)->first();

            if ($media !== null && ! MediaAsset::query()->where('url', $webpUrl)->exists()) {
                $media->update(['url' => $webpUrl]);
            }
        }

        $pageMedia = [
            'home' => ['/home/IMG_3406-hero.webp', 'Asietex integrated textile manufacturing facility'],
            'about' => ['/about/IMG_2836.webp', 'Asietex factory and production environment'],
            'career' => ['/career/IMG_3000.webp', 'Asietex production team at work'],
            'contact' => ['/contact/IMG_3983.webp', 'Asietex company location'],
        ];

        foreach ($pageMedia as $slug => [$url, $alt]) {
            $page = Page::query()->where('slug', $slug)->firstOrFail();
            $this->seedMedia($url, $alt, pageId: $page->getKey());
        }

        $productMedia = [
            'spinning' => ['/products/1-spinning.webp', 'Spinning production at Asietex'],
            'twisting' => ['/products/IMG_2893.webp', 'Yarn twisting production at Asietex'],
            'knitting' => ['/products/3-knitting.webp', 'Knitting production at Asietex'],
            'weaving' => ['/products/4-weaving-1.webp', 'Weaving production at Asietex'],
            'dyeing' => ['/products/IMG_3444.webp', 'Textile dyeing production at Asietex'],
            'yarn-dyeing' => ['/products/IMG_3726-yarn.webp', 'Yarn dyeing production at Asietex'],
            'garment' => ['/products/IMG_4017.webp', 'Garment production at Asietex'],
            'printing' => ['/products/IMG_4025.webp', 'Textile printing production at Asietex'],
            'finishing' => ['/products/IMG_4037.webp', 'Textile finishing production at Asietex'],
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
