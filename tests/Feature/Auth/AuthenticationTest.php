<?php

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Testing\AssertableInertia as Assert;

it('renders login without exposing public registration', function () {
    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('auth/login'));

    expect(Route::has('register'))->toBeFalse();
});

it('redirects guests from the dashboard to login', function () {
    $this->get(route('dashboard'))->assertRedirectToRoute('login');
});

it('authenticates an active user and redirects to the dashboard', function () {
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticatedAs($user);
});

it('returns the same error for an unknown email and an incorrect password', function () {
    $user = User::factory()->create();

    $unknownEmail = $this->from(route('login'))->post(route('login.store'), [
        'email' => 'unknown@example.com',
        'password' => 'incorrect-password',
    ]);

    $wrongPassword = $this->from(route('login'))->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'incorrect-password',
    ]);

    $unknownEmail->assertRedirect(route('login'))
        ->assertSessionHasErrors(['email' => __('auth.failed')]);
    $wrongPassword->assertRedirect(route('login'))
        ->assertSessionHasErrors(['email' => __('auth.failed')]);
    $this->assertGuest();
});

it('rejects an inactive user with the generic credential error', function () {
    $user = User::factory()->inactive()->create();

    $this->from(route('login'))->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('login'))
        ->assertSessionHasErrors(['email' => __('auth.failed')]);

    $this->assertGuest();
});

it('rate limits repeated login failures', function () {
    RateLimiter::clear('missing@example.com|127.0.0.1');

    foreach (range(1, 5) as $attempt) {
        $this->post(route('login.store'), [
            'email' => 'missing@example.com',
            'password' => 'incorrect-password',
        ])->assertSessionHasErrors('email');
    }

    $this->post(route('login.store'), [
        'email' => 'missing@example.com',
        'password' => 'incorrect-password',
    ])->assertTooManyRequests();
});

it('logs out and invalidates the authenticated session', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->withSession(['temporary' => 'value'])
        ->post(route('logout'));

    $response->assertRedirect(route('home'));
    $this->assertGuest();
    expect(session()->has('temporary'))->toBeFalse();
});

it('ends an existing session when the user becomes inactive', function () {
    $user = User::factory()->create();
    $user->update(['active' => false]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirectToRoute('login')
        ->assertSessionHasErrors(['email' => __('auth.failed')]);

    $this->assertGuest();
});
