<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class SiteSettingPublicationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SiteSetting $siteSetting, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('publish', $siteSetting);
        abort_unless($siteSetting->draft !== null, 422, 'A draft is required.');
        $workflow->publishSetting($siteSetting, request()->user());

        return back()->with('success', 'Settings published.');
    }
}
