<?php

use App\Models\Page;
use App\Models\Product;
use App\Models\Translation;
use Inertia\Testing\AssertableInertia as Assert;

it('provides canonical alternate and structured data for localized public pages', function (): void {
    $page = Page::factory()->published()->create(['slug' => 'home']);
    Translation::factory()->for($page)->create(['locale' => 'en', 'title' => 'Asietex home', 'body' => 'Integrated textile manufacturing.']);

    $this->get('/en')->assertOk()->assertInertia(fn (Assert $response) => $response
        ->component('public/home')
        ->where('seo.title', 'Asietex home')
        ->where('seo.canonical', 'http://localhost:8000/en')
        ->where('seo.alternates.en', 'http://localhost:8000/en')
        ->where('seo.alternates.id', 'http://localhost:8000/id')
        ->where('seo.alternates.pt', 'http://localhost:8000/pt')
        ->where('seo.alternates.x-default', 'http://localhost:8000/en')
        ->where('seo.structuredData.@type', 'Organization')
        ->where('seo.structuredData.inLanguage', 'en'));
});

it('provides a product structured data contract from published content', function (): void {
    $product = Product::factory()->published()->create(['slug' => 'spinning']);
    Translation::factory()->forProduct($product)->create([
        'locale' => 'en',
        'title' => 'Spinning',
        'body' => 'High quality spinning services.',
    ]);

    $this->get('/en/products/spinning')->assertOk()->assertInertia(fn (Assert $response) => $response
        ->component('public/products/show')
        ->where('seo.canonical', 'http://localhost:8000/en/products/spinning')
        ->where('seo.alternates.id', 'http://localhost:8000/id/products/spinning')
        ->where('seo.structuredData.@type', 'Product')
        ->where('seo.structuredData.name', 'Spinning')
        ->where('seo.structuredData.url', 'http://localhost:8000/en/products/spinning'));
});
