<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdatePageDraftRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function edit(Page $page): Response
    {
        return Inertia::render($this->editorComponent($page), ['page' => $page->load('translations')]);
    }

    public function update(UpdatePageDraftRequest $request, Page $page, ContentWorkflow $workflow): RedirectResponse
    {
        $workflow->saveDraft($page, $request->validated('translations'), $request->user(), 'page');

        return back()->with('success', 'Page draft saved.');
    }

    private function editorComponent(Page $page): string
    {
        return match ($page->slug) {
            'about' => 'dashboard/content/about-editor',
            'career' => 'dashboard/content/career-editor',
            'contact' => 'dashboard/content/contact-editor',
            default => 'dashboard/content/page-editor',
        };
    }
}
