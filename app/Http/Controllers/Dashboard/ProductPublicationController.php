<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class ProductPublicationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Product $product, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('publish', $product);
        Validator::make($product->draft ?? [], [
            'gallery' => ['present', 'array'],
            'gallery.*' => ['url:http,https'],
            'video_en' => ['nullable', 'url:http,https'],
            'video_id' => ['nullable', 'url:http,https'],
            'video_pt' => ['nullable', 'url:http,https'],
            'translations' => ['required', 'array:en,id,pt'],
            'translations.*.title' => ['required', 'string', 'max:10000'],
            'translations.*.body' => ['required', 'string', 'max:10000'],
            'translations.*.capacity' => ['nullable', 'string', 'max:500'],
            'translations.*.products' => ['present', 'array'],
            'translations.*.products.*' => ['required', 'string', 'max:500'],
            'translations.*.machinery' => ['nullable', 'string', 'max:5000'],
        ])->validate();
        $workflow->publishProduct($product, request()->user());

        return back()->with('success', 'Product published.');
    }
}
