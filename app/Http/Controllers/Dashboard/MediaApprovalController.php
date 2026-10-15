<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class MediaApprovalController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MediaAsset $mediaAsset, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('approve', $mediaAsset);
        DB::transaction(function () use ($mediaAsset, $workflow): void {
            $mediaAsset->update(['approved' => true]);
            $workflow->record(request()->user(), 'media', (string) $mediaAsset->getKey(), 'approved');
        });

        return back()->with('success', 'Media approved.');
    }
}
