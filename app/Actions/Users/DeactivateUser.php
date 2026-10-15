<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class DeactivateUser
{
    public function handle(User $actor, User $target): void
    {
        Gate::forUser($actor)->authorize('deactivate', $target);

        DB::transaction(function () use ($target): void {
            $target->update(['active' => false]);
            DB::table('sessions')->where('user_id', $target->getKey())->delete();
        });
    }
}
