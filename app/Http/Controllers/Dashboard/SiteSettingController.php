<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateSiteSettingDraftRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(SiteSetting $siteSetting): Response
    {
        return Inertia::render('dashboard/settings/edit', ['setting' => $siteSetting]);
    }

    public function update(UpdateSiteSettingDraftRequest $request, SiteSetting $siteSetting, ContentWorkflow $workflow): RedirectResponse
    {
        $workflow->saveDraft($siteSetting, $request->validated(), $request->user(), 'setting');

        return back()->with('success', 'Settings draft saved.');
    }
}
