<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Support\PublicSeo;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(string $locale, PublicSeo $seo): Response
    {
        return Inertia::render('public/products/index', [
            'locale' => $locale,
            'page' => $this->pagePayload($locale),
            'products' => Product::query()
                ->published()
                ->ordered()
                ->with(['translations' => fn ($query) => $query->whereIn('locale', [$locale, 'en']), 'mediaAssets' => fn ($query) => $query->where('approved', true)])
                ->get()
                ->map(fn (Product $product): array => $this->payload($product, $locale))
                ->all(),
            'seo' => $seo->page($locale, 'public.products.index', 'Products', 'Explore Asietex integrated textile products.'),
        ]);
    }

    /** @return array{title: string, body: string} */
    private function pagePayload(string $locale): array
    {
        $page = Page::query()
            ->published()
            ->where('slug', 'products')
            ->with(['translations' => fn ($query) => $query->whereIn('locale', [$locale, 'en'])])
            ->first();
        if ($page === null) {
            return match ($locale) {
                'id' => ['title' => 'Sembilan produk. Satu rantai produksi yang terhubung.', 'body' => 'Jelajahi produk Asietex, mulai dari spinning dan twisting hingga dyeing, printing, garment, dan finishing.'],
                'pt' => ['title' => 'Nove produtos. Uma cadeia de produção ligada.', 'body' => 'Explore os produtos da Asietex, desde a fiação e torção até ao tingimento, impressão, confeção e acabamento.'],
                default => ['title' => 'Nine products. One connected production chain.', 'body' => 'Explore the products behind Asietex, from spinning and twisting to dyeing, printing, garment, and finishing.'],
            };
        }
        $translation = $page->translations->firstWhere('locale', $locale)
            ?? $page->translations->firstWhere('locale', 'en')
            ?? $page->translations->first();

        return ['title' => $translation->title, 'body' => $translation->body];
    }

    public function show(string $locale, string $product, PublicSeo $seo): Response
    {
        $record = Product::query()
            ->published()
            ->where('slug', $product)
            ->with(['translations' => fn ($query) => $query->whereIn('locale', [$locale, 'en']), 'mediaAssets' => fn ($query) => $query->where('approved', true)])
            ->firstOrFail();

        $payload = $this->payload($record, $locale);
        $canonical = route('public.products.show', ['locale' => $locale, 'product' => $record->slug]);

        return Inertia::render('public/products/show', [
            'locale' => $locale,
            'product' => $payload,
            'catalog' => $this->catalogPayload($locale),
            'seo' => $seo->page(
                $locale,
                'public.products.show',
                $payload['title'],
                $payload['body'],
                ['product' => $record->slug],
                $seo->product($locale, $canonical, $payload['title'], $payload['body'], $payload['image']['url'] ?? null),
            ),
        ]);
    }

    /** @return array<string, mixed> */
    private function payload(Product $product, string $locale): array
    {
        abort_if($product->translations->isEmpty(), 404);

        $translation = $product->translations->firstWhere('locale', $locale)
            ?? $product->translations->firstWhere('locale', 'en')
            ?? $product->translations->first();
        $media = $product->mediaAssets->first();

        return [
            'slug' => $product->slug,
            'title' => $translation->title,
            'body' => $translation->body,
            'capacity' => $translation->capacity ?? $product->capacity,
            'products' => $translation->products ?? $product->products,
            'machinery' => $translation->machinery ?? $product->machinery,
            'image' => $media === null ? null : [
                'url' => $this->mediaUrl($media->url),
                'alt' => match ($locale) {
                    'id' => $media->alt_id,
                    'pt' => $media->alt_pt,
                    default => $media->alt_en,
                },
                'width' => 1600,
                'height' => 1200,
            ],
        ];
    }

    /** @return array<string, mixed>|null */
    private function catalogPayload(string $locale): ?array
    {
        $setting = SiteSetting::query()->find('site');

        if ($setting === null || ! $setting->catalog_on || ! in_array('product', $setting->catalog_placements, true)) {
            return null;
        }

        return [
            'url' => $setting->catalog_url,
            'label' => match ($locale) {
                'id' => $setting->catalog_label_id,
                'pt' => $setting->catalog_label_pt,
                default => $setting->catalog_label_en,
            },
            'newTab' => $setting->catalog_open_new_tab,
        ];
    }

    private function mediaUrl(string $url): string
    {
        return str_starts_with($url, '/') ? url($url) : $url;
    }
}
