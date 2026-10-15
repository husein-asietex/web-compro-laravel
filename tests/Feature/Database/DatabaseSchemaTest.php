<?php

use App\Enums\ContentStatus;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\Translation;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

it('casts content values and filters published products in display order', function () {
    Product::factory()->create(['sort_order' => 3]);
    $publishedSecond = Product::factory()->published()->create(['sort_order' => 2]);
    $publishedFirst = Product::factory()->published()->create([
        'sort_order' => 1,
        'products' => ['Yarn'],
        'gallery' => [['url' => 'https://example.com/image.jpg']],
    ]);

    $products = Product::query()->published()->ordered()->get();

    expect($products->modelKeys())->toBe([$publishedFirst->id, $publishedSecond->id])
        ->and($publishedFirst->status)->toBe(ContentStatus::Published)
        ->and($publishedFirst->products)->toBe(['Yarn'])
        ->and($publishedFirst->gallery)->toHaveCount(1);
});

it('enforces unique product order values', function () {
    Product::factory()->create(['sort_order' => 1]);

    expect(fn () => Product::factory()->create(['sort_order' => 1]))
        ->toThrow(QueryException::class);
});

it('cascades translations and detaches media when a page is deleted', function () {
    $page = Page::factory()->create();
    $translation = Translation::factory()->for($page)->create(['locale' => 'en']);
    $media = MediaAsset::factory()->for($page)->create();

    $page->delete();

    expect(Translation::query()->find($translation->id))->toBeNull()
        ->and($media->fresh()?->page_id)->toBeNull();
});

it('rolls back an atomic database operation after an exception', function () {
    expect(
        fn () => DB::transaction(function (): void {
            Page::factory()->create(['slug' => 'rolled-back-page']);

            throw new RuntimeException('Abort transaction');
        }),
    )->toThrow(RuntimeException::class, 'Abort transaction');

    $this->assertDatabaseMissing('pages', ['slug' => 'rolled-back-page']);
});
