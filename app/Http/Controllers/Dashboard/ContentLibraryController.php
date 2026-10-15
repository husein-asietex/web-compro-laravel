<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContentCollection;
use App\Models\Page;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ContentLibraryController extends Controller
{
    public function index(): Response
    {
        $pages = Page::query()
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (Page $page): array => [
                'id' => $page->id,
                'slug' => $page->slug,
                'status' => $page->status->value,
                'updated_at' => $page->updated_at?->toISOString(),
                'updated_at_display' => $page->updated_at?->timezone(config('app.timezone'))->format('j M Y'),
            ]);

        $products = Product::query()
            ->ordered()
            ->get()
            ->map(fn (Product $product): array => [
                'id' => $product->id,
                'slug' => $product->slug,
                'sort_order' => $product->sort_order,
                'status' => $product->status->value,
                'updated_at' => $product->updated_at?->toISOString(),
                'updated_at_display' => $product->updated_at?->timezone(config('app.timezone'))->format('j M Y'),
            ]);

        $collections = ContentCollection::query()
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(fn (ContentCollection $collection): array => [
                'key' => $collection->key,
                'status' => $collection->status->value,
                'updated_at' => $collection->updated_at?->toISOString(),
                'updated_at_display' => $collection->updated_at?->timezone(config('app.timezone'))->format('j M Y'),
            ]);

        return Inertia::render('dashboard/content/index', compact('pages', 'products', 'collections'));
    }
}
