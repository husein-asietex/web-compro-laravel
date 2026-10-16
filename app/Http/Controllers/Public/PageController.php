<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ContentCollection;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\Translation;
use App\Support\PublicSeo;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(string $locale, PublicSeo $seo): Response
    {
        $page = $this->pageForLocale('home', $locale);
        $products = Product::query()
            ->published()
            ->ordered()
            ->with(['translations' => fn ($query) => $query->whereIn('locale', [$locale, 'en']), 'mediaAssets' => fn ($query) => $query->where('approved', true)])
            ->get()
            ->map(fn (Product $product): array => $this->productPayload($product, $locale))
            ->all();

        $payload = $this->pagePayload($page, $locale);
        $canonical = route('public.home', ['locale' => $locale]);

        return Inertia::render('public/home', [
            'locale' => $locale,
            'page' => $payload,
            'products' => $products,
            'catalog' => $this->catalogPayload($locale, 'home'),
            'seo' => $seo->page($locale, 'public.home', $payload['title'], $payload['body'], structuredData: $seo->organization($locale, $canonical)),
        ]);
    }

    public function about(string $locale, PublicSeo $seo): Response
    {
        return $this->renderPage($locale, 'about', $seo, 'public/about');
    }

    public function career(string $locale, PublicSeo $seo): Response
    {
        return $this->renderPage($locale, 'career', $seo, 'public/career');
    }

    public function contact(string $locale, PublicSeo $seo): Response
    {
        return $this->renderPage($locale, 'contact', $seo, 'public/contact');
    }

    private function renderPage(string $locale, string $slug, PublicSeo $seo, string $component): Response
    {
        $page = $this->pageForLocale($slug, $locale);

        $payload = $this->pagePayload($page, $locale);

        return Inertia::render($component, [
            'locale' => $locale,
            'page' => $payload,
            'catalog' => $this->catalogPayload($locale, $slug),
            'seo' => $seo->page($locale, "public.{$slug}", $payload['title'], $payload['body']),
        ]);
    }

    public function marketingContacts(string $locale, PublicSeo $seo): Response
    {
        $collection = ContentCollection::query()->published()->find('marketing-contacts');
        $data = $collection === null ? [] : $collection->data;
        $contacts = $data[$locale] ?? $data['en'] ?? $data['items'] ?? [];

        return Inertia::render('public/marketing-contacts', [
            'locale' => $locale,
            'contacts' => is_array($contacts) ? $contacts : [],
            'seo' => $seo->page(
                $locale,
                'public.marketing-contact',
                match ($locale) {
                    'id' => 'Kontak marketing',
                    'pt' => 'Contactos de marketing',
                    default => 'Marketing contacts',
                },
                match ($locale) {
                    'id' => 'Hubungi tim marketing Asietex yang tepat untuk kebutuhan Anda.',
                    'pt' => 'Fale com a equipa de marketing da Asietex adequada ao seu pedido.',
                    default => 'Speak with the Asietex marketing team closest to your brief.',
                },
            ),
        ]);
    }

    private function pageForLocale(string $slug, string $locale): Page
    {
        return Page::query()
            ->published()
            ->where('slug', $slug)
            ->with([
                'translations' => fn ($query) => $query->whereIn('locale', [$locale, 'en']),
                'mediaAssets' => fn ($query) => $query->where('approved', true),
            ])
            ->firstOrFail();
    }

    /** @return array<string, mixed> */
    private function pagePayload(Page $page, string $locale): array
    {
        $translation = $this->translationForLocale($page->translations, $locale);

        return [
            'slug' => $page->slug,
            'title' => $translation->title,
            'body' => $translation->body,
            'media' => $page->mediaAssets->map(fn (MediaAsset $media): array => [
                'url' => $this->mediaUrl($media),
                'alt' => $this->mediaAlt($media, $locale),
                'width' => 1600,
                'height' => 1200,
            ])->all(),
        ];
    }

    /** @return array<string, mixed> */
    private function productPayload(Product $product, string $locale): array
    {
        $translation = $this->translationForLocale($product->translations, $locale);
        $media = $product->mediaAssets->first();

        return [
            'slug' => $product->slug,
            'title' => $translation->title,
            'body' => $translation->body,
            'capacity' => $translation->capacity ?? $product->capacity,
            'products' => $translation->products ?? $product->products,
            'machinery' => $translation->machinery ?? $product->machinery,
            'image' => $media === null ? null : [
                'url' => $this->mediaUrl($media),
                'alt' => $this->mediaAlt($media, $locale),
                'width' => 1600,
                'height' => 1200,
            ],
        ];
    }

    /** @return array<string, mixed>|null */
    private function catalogPayload(string $locale, string $placement): ?array
    {
        $setting = SiteSetting::query()->find('site');

        if ($setting === null || ! $setting->catalog_on || ! in_array($placement, $setting->catalog_placements, true)) {
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

    /** @param Collection<int, Translation> $translations */
    private function translationForLocale(Collection $translations, string $locale): Translation
    {
        abort_if($translations->isEmpty(), 404);

        return $translations->firstWhere('locale', $locale) ?? $translations->firstWhere('locale', 'en') ?? $translations->first();
    }

    private function mediaAlt(MediaAsset $media, string $locale): string
    {
        return match ($locale) {
            'id' => $media->alt_id,
            'pt' => $media->alt_pt,
            default => $media->alt_en,
        };
    }

    private function mediaUrl(MediaAsset $media): string
    {
        return str_starts_with($media->url, '/') ? url($media->url) : $media->url;
    }
}
