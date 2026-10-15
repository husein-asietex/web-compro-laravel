<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Revision;
use Inertia\Inertia;
use Inertia\Response;

class RevisionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        $revisions = Revision::with('user:id,name,email')
            ->latest()
            ->limit(100)
            ->get()
            ->map(fn (Revision $revision): array => [
                'id' => $revision->id,
                'entity' => $revision->entity,
                'entity_id' => $revision->entity_id,
                'action' => $revision->action,
                'created_at' => $revision->created_at->toISOString(),
                'created_at_display' => $revision->created_at->timezone(config('app.timezone'))->format('j M Y, H:i T'),
                'user' => $revision->user->only(['name', 'email']),
            ]);

        return Inertia::render('dashboard/revisions/index', compact('revisions'));
    }
}
