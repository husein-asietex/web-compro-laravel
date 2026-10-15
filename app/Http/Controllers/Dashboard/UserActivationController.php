<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Actions\Users\DeactivateUser;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class UserActivationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user, DeactivateUser $deactivateUser, ContentWorkflow $workflow): RedirectResponse
    {
        Gate::authorize('deactivate', $user);
        $activate = request()->boolean('active');

        if ($activate) {
            DB::transaction(function () use ($user, $workflow): void {
                $user->update(['active' => true]);
                $workflow->record(request()->user(), 'user', (string) $user->getKey(), 'activated');
            });
        } else {
            DB::transaction(function () use ($deactivateUser, $user, $workflow): void {
                $deactivateUser->handle(request()->user(), $user);
                $workflow->record(request()->user(), 'user', (string) $user->getKey(), 'deactivated');
            });
        }

        return back()->with('success', $activate ? 'User activated.' : 'User deactivated.');
    }
}
