<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class PagePublicationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Page $page, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('publish', $page);
        Validator::make(['translations' => $page->draft], [
            'translations' => ['required', 'array:en,id,pt'],
            'translations.*.title' => ['required', 'string', 'max:10000'],
            'translations.*.body' => ['required', 'string', 'max:10000'],
        ])->validate();
        $workflow->publishPage($page, request()->user());

        return back()->with('success', 'Page published.');
    }
}
