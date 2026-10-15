<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateProductDraftRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function edit(Product $product): Response
    {
        return Inertia::render('dashboard/content/product-editor', ['product' => $product->load('translations')]);
    }

    public function update(UpdateProductDraftRequest $request, Product $product, ContentWorkflow $workflow): RedirectResponse
    {
        $workflow->saveDraft($product, $request->validated(), $request->user(), 'product');

        return back()->with('success', 'Product draft saved.');
    }
}
