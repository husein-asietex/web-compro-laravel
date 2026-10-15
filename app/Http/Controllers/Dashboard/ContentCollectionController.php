<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateContentCollectionDraftRequest;
use App\Models\ContentCollection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContentCollectionController extends Controller
{
    public function edit(ContentCollection $contentCollection): Response
    {
        return Inertia::render('dashboard/content/collection-editor', ['collection' => $contentCollection]);
    }

    public function update(UpdateContentCollectionDraftRequest $request, ContentCollection $contentCollection, ContentWorkflow $workflow): RedirectResponse
    {
        $workflow->saveDraft($contentCollection, $request->validated('data'), $request->user(), 'content-collection');

        return back()->with('success', 'Collection draft saved.');
    }
}
