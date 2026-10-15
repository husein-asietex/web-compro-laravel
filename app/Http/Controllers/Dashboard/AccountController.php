<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\Content\ContentWorkflow;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdatePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('dashboard/account/edit');
    }

    public function update(UpdatePasswordRequest $request, ContentWorkflow $workflow): RedirectResponse
    {
        DB::transaction(function () use ($request, $workflow): void {
            $request->user()->update(['password' => $request->validated('password')]);
            $workflow->record($request->user(), 'user', (string) $request->user()->getKey(), 'password-changed');
            DB::table('sessions')->where('user_id', $request->user()->getKey())->where('id', '!=', $request->session()->getId())->delete();
        });

        return back()->with('success', 'Password updated.');
    }
}
