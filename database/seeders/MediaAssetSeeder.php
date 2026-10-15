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
        $pageMedia = [
            'home' => ['/home/IMG_3406-hero.JPG', 'Asietex integrated textile manufacturing facility'],
            'about' => ['/about/IMG_2836.JPG', 'Asietex factory and production environment'],
            'career' => ['/career/IMG_3000.JPG', 'Asietex production team at work'],
            'contact' => ['/contact/IMG_3983.JPG', 'Asietex company location'],
        ];

        foreach ($pageMedia as $slug => [$url, $alt]) {
            $page = Page::query()->where('slug', $slug)->firstOrFail();
            $this->seedMedia($url, $alt, pageId: $page->getKey());
        }

        $productMedia = [
            'spinning' => ['/products/1-spinning.JPG', 'Spinning production at Asietex'],
            'twisting' => ['/products/IMG_2893.JPG', 'Yarn twisting production at Asietex'],
            'knitting' => ['/products/3-knitting.JPG', 'Knitting production at Asietex'],
            'weaving' => ['/products/4-weaving-1.JPG', 'Weaving production at Asietex'],
            'dyeing' => ['/products/IMG_3444.JPG', 'Textile dyeing production at Asietex'],
            'yarn-dyeing' => ['/products/IMG_3726-yarn.JPG', 'Yarn dyeing production at Asietex'],
            'garment' => ['/products/IMG_4017.JPG', 'Garment production at Asietex'],
            'printing' => ['/products/IMG_4025.JPG', 'Textile printing production at Asietex'],
            'finishing' => ['/products/IMG_4037.JPG', 'Textile finishing production at Asietex'],
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
