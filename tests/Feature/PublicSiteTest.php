<?php

use App\Enums\ContentStatus;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\Translation;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    foreach (['home', 'about', 'career', 'contact'] as $slug) {
        $page = Page::factory()->published()->create(['slug' => $slug]);
        Translation::factory()->for($page)->create(['locale' => 'en', 'title' => "English {$slug}", 'body' => "English {$slug} body"]);
        Translation::factory()->for($page)->create(['locale' => 'id', 'title' => "Indonesian {$slug}", 'body' => "Indonesian {$slug} body"]);
    }
});

it('redirects unlocalized public URLs to English', function (): void {
    $this->get('/')->assertRedirect('/en')->assertStatus(301);
});

it('renders localized home data from published records only', function (): void {
    $published = Product::factory()->published()->create(['slug' => 'published-product', 'sort_order' => 1]);
    Translation::factory()->forProduct($published)->create(['locale' => 'en', 'title' => 'Published product']);

    $draft = Product::factory()->create(['slug' => 'draft-product', 'sort_order' => 2, 'status' => ContentStatus::Draft]);
    Translation::factory()->forProduct($draft)->create(['locale' => 'en', 'title' => 'Draft product']);

    $this->get('/en')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('public/home')
        ->where('locale', 'en')
        ->where('page.title', 'English home')
        ->has('products', 1)
        ->where('products.0.slug', 'published-product'));
});

it('falls back to English when a requested translation is unavailable', function (): void {
    $product = Product::factory()->published()->create(['slug' => 'fallback-product']);
    Translation::factory()->forProduct($product)->create(['locale' => 'en', 'title' => 'English fallback']);

    $this->get('/pt/products/fallback-product')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('public/products/show')
        ->where('product.title', 'English fallback'));
});

it('excludes unapproved media from public props', function (): void {
    $page = Page::query()->where('slug', 'about')->firstOrFail();
    MediaAsset::factory()->for($page)->approved()->create(['url' => 'https://example.test/approved.jpg']);
    MediaAsset::factory()->for($page)->create(['url' => 'https://example.test/unapproved.jpg']);

    $this->get('/en/about')->assertOk()->assertInertia(fn (Assert $response) => $response
        ->component('public/page')
        ->has('page.media', 1)
        ->where('page.media.0.url', 'https://example.test/approved.jpg'));
});

it('provides approved product photography with deterministic dimensions', function (): void {
    $product = Product::factory()->published()->create(['slug' => 'photographed-product']);
    Translation::factory()->forProduct($product)->create(['locale' => 'en', 'title' => 'Photographed product']);
    MediaAsset::factory()->for($product)->approved()->create([
        'url' => '/products/1-spinning.JPG',
        'alt_en' => 'Spinning production at Asietex',
    ]);

    $this->get('/en/products/photographed-product')->assertOk()->assertInertia(fn (Assert $response) => $response
        ->component('public/products/show')
        ->where('product.image.url', 'http://localhost:8000/products/1-spinning.JPG')
        ->where('product.image.alt', 'Spinning production at Asietex')
        ->where('product.image.width', 1600)
        ->where('product.image.height', 1200)
        ->where('seo.structuredData.image', 'http://localhost:8000/products/1-spinning.JPG'));
});

it('serves each approved public route and rejects invalid locales', function (): void {
    $product = Product::factory()->published()->create(['slug' => 'spinning']);
    Translation::factory()->forProduct($product)->create(['locale' => 'en', 'title' => 'Spinning']);

    foreach (['/en', '/en/about', '/en/products', '/en/products/spinning', '/en/marketing-contact', '/en/career', '/en/contact'] as $path) {
        $this->get($path)->assertOk();
    }

    $this->get('/fr')->assertNotFound();
    $this->get('/en/products/missing')->assertNotFound();
});
