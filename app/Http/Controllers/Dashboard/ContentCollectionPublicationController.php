<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Models\ContentCollection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class ContentCollectionPublicationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ContentCollection $contentCollection, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('publish', $contentCollection);
        abort_unless($contentCollection->draft !== null, 422, 'A draft is required.');
        $workflow->publishCollection($contentCollection, request()->user());

        return back()->with('success', 'Collection published.');
    }
}
