<?php

use App\Actions\Users\DeactivateUser;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

it('deactivates a user and deletes all of their database sessions', function () {
    $admin = User::factory()->admin()->create();
    $target = User::factory()->create();
    insertSession('admin-session', $admin);
    insertSession('target-session', $target);

    app(DeactivateUser::class)->handle($admin, $target);

    expect($target->fresh()?->active)->toBeFalse();
    $this->assertDatabaseMissing('sessions', ['id' => 'target-session']);
    $this->assertDatabaseHas('sessions', ['id' => 'admin-session']);
});

it('does not deactivate a user when the actor lacks permission', function () {
    $staff = User::factory()->create();
    $target = User::factory()->create();
    insertSession('target-session', $target);

    expect(fn () => app(DeactivateUser::class)->handle($staff, $target))
        ->toThrow(AuthorizationException::class);

    expect($target->fresh()?->active)->toBeTrue();
    $this->assertDatabaseHas('sessions', ['id' => 'target-session']);
});

function insertSession(string $id, User $user): void
{
    DB::table('sessions')->insert([
        'id' => $id,
        'user_id' => $user->getKey(),
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Pest',
        'payload' => 'test-payload',
        'last_activity' => now()->timestamp,
    ]);
}
