<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreMediaAssetRequest;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MediaAssetController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/media/index', ['media' => MediaAsset::with(['page:id,slug', 'product:id,slug'])->latest()->get(), 'pages' => Page::orderBy('slug')->get(['id', 'slug']), 'products' => Product::ordered()->get(['id', 'slug'])]);
    }

    public function store(StoreMediaAssetRequest $request, ContentWorkflow $workflow): RedirectResponse
    {
        DB::transaction(function () use ($request, $workflow): void {
            $media = MediaAsset::create([...$request->validated(), 'approved' => $request->user()->role === Role::Admin]);
            $workflow->record($request->user(), 'media', (string) $media->getKey(), $media->approved ? 'created-approved' : 'created-draft');
        });

        return back()->with('success', 'Media URL added.');
    }
}
