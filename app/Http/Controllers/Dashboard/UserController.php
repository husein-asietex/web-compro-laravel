<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreUserRequest;
use App\Http\Requests\Dashboard\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewAny', User::class);

        return Inertia::render('dashboard/users/index', ['users' => User::latest()->get(['id', 'name', 'email', 'role', 'active', 'created_at'])]);
    }

    public function store(StoreUserRequest $request, ContentWorkflow $workflow): RedirectResponse
    {
        DB::transaction(function () use ($request, $workflow): void {
            $user = User::create([...$request->validated(), 'active' => true]);
            $workflow->record($request->user(), 'user', (string) $user->getKey(), strtolower($user->role->value).'-created');
        });

        return back()->with('success', 'User created.');
    }

    public function update(UpdateUserRequest $request, User $user, ContentWorkflow $workflow): RedirectResponse
    {
        DB::transaction(function () use ($request, $user, $workflow): void {
            $user->update($request->validated());
            $workflow->record($request->user(), 'user', (string) $user->getKey(), 'role-changed-to-'.strtolower($user->role->value));
        });

        return back()->with('success', 'User role updated.');
    }
}
