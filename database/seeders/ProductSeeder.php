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

        $localePrefixes = ['en' => '', 'id' => 'ID: ', 'pt' => 'PT: '];

        $sortOrder = 1;

        foreach ($products as $slug => $name) {
            $product = Product::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'sort_order' => $sortOrder,
                    'capacity' => 'To be provided',
                    'products' => ['Sample product'],
                    'machinery' => 'Asian and European machinery',
                    'gallery' => [],
                    'status' => ContentStatus::Published,
                    'draft' => null,
                ],
            );

            foreach ($localePrefixes as $locale => $prefix) {
                $product->translations()->updateOrCreate(
                    ['locale' => $locale],
                    [
                        'title' => $prefix.$name,
                        'body' => $prefix.$name.' products for connected textile production.',
                        'capacity' => 'To be provided',
                        'products' => ['Sample product'],
                        'machinery' => 'Asian and European machinery',
                    ],
                );
            }

            $sortOrder++;
        }
    }
}
