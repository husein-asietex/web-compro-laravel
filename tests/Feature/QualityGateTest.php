<?php

use App\Actions\Content\ContentWorkflow;
use App\Enums\ContentStatus;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\Translation;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

use function Pest\Laravel\mock;

function completePageDraft(): array
{
    return collect(['en', 'id', 'pt'])
        ->mapWithKeys(fn (string $locale): array => [
            $locale => [
                'title' => "Title {$locale}",
                'body' => "Body {$locale}",
            ],
        ])
        ->all();
}

function completeProductDraft(array $gallery): array
{
    return [
        'gallery' => $gallery,
        'video_en' => '',
        'video_id' => '',
        'video_pt' => '',
        'translations' => collect(['en', 'id', 'pt'])
            ->mapWithKeys(fn (string $locale): array => [
                $locale => [
                    'title' => "Product {$locale}",
                    'body' => "Description {$locale}",
                    'capacity' => '',
                    'products' => ['Fabric'],
                    'machinery' => '',
                ],
            ])
            ->all(),
    ];
}

it('rolls back every page publication change when revision creation fails', function (): void {
    $admin = User::factory()->admin()->create();
    $page = Page::factory()->create(['draft' => completePageDraft()]);
    $workflow = mock(ContentWorkflow::class)->makePartial();
    $workflow->shouldReceive('record')->once()->andThrow(new QueryException('sqlite', 'insert into revisions', [], new RuntimeException('revision failed')));

    expect(fn () => $workflow->publishPage($page, $admin))->toThrow(QueryException::class);

    expect($page->refresh()->status)->toBe(ContentStatus::Draft)
        ->and($page->draft)->toBe(completePageDraft());
    $this->assertDatabaseMissing('translations', ['page_id' => $page->id]);
    $this->assertDatabaseMissing('revisions', ['entity' => 'page', 'entity_id' => (string) $page->id]);
});

it('accepts seeded root-relative product gallery paths and rejects unsafe schemes', function (): void {
    $staff = User::factory()->create();
    $product = Product::factory()->create();

    $this->actingAs($staff)
        ->put(route('dashboard.products.update', $product), completeProductDraft(['/products/1-spinning.JPG']))
        ->assertRedirect()
        ->assertSessionHasNoErrors();

    expect($product->refresh()->draft['gallery'])->toBe(['/products/1-spinning.JPG']);

    $this->actingAs($staff)
        ->from(route('dashboard.products.edit', $product))
        ->put(route('dashboard.products.update', $product), completeProductDraft(['javascript:alert(1)']))
        ->assertRedirect(route('dashboard.products.edit', $product))
        ->assertSessionHasErrors('gallery.0');

    expect($product->refresh()->draft['gallery'])->toBe(['/products/1-spinning.JPG']);
});

it('produces a relationally complete and publicly usable seeded dataset', function (): void {
    $this->seed(DatabaseSeeder::class);

    expect(Page::query()->whereNotIn('status', array_column(ContentStatus::cases(), 'value'))->count())->toBe(0)
        ->and(Product::query()->whereNotIn('status', array_column(ContentStatus::cases(), 'value'))->count())->toBe(0)
        ->and(Translation::query()->whereNull('page_id')->whereNull('product_id')->count())->toBe(0)
        ->and(Translation::query()->whereNotNull('page_id')->whereNotNull('product_id')->count())->toBe(0)
        ->and(MediaAsset::query()->whereNotNull('page_id')->whereNotNull('product_id')->count())->toBe(0);

    Page::query()->with('translations')->each(function (Page $page): void {
        expect($page->translations->pluck('locale')->sort()->values()->all())->toBe(['en', 'id', 'pt']);
    });

    Product::query()->with('translations')->each(function (Product $product): void {
        expect($product->translations->pluck('locale')->sort()->values()->all())->toBe(['en', 'id', 'pt'])
            ->and($product->products)->toBeArray()
            ->and($product->gallery)->toBeArray();
    });

    MediaAsset::query()->each(function (MediaAsset $media): void {
        expect($media->alt_en)->not->toBeEmpty()
            ->and($media->alt_id)->not->toBeEmpty()
            ->and($media->alt_pt)->not->toBeEmpty();

        if (str_starts_with($media->url, '/')) {
            expect(public_path(ltrim($media->url, '/')))->toBeFile();
        } else {
            expect(filter_var($media->url, FILTER_VALIDATE_URL))->not->toBeFalse();
        }
    });

    $duplicatePageSlugs = DB::table('pages')->select('slug')->groupBy('slug')->havingRaw('COUNT(*) > 1')->count();
    $duplicateProductSlugs = DB::table('products')->select('slug')->groupBy('slug')->havingRaw('COUNT(*) > 1')->count();

    expect($duplicatePageSlugs)->toBe(0)
        ->and($duplicateProductSlugs)->toBe(0);
});
