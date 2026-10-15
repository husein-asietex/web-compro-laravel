<?php

use App\Models\Page;
use App\Models\Translation;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('renders the public foundation', function () {
    $page = Page::factory()->published()->create(['slug' => 'home']);
    Translation::factory()->for($page)->create(['locale' => 'en']);

    $response = $this->get('/en');

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('public/home'));
});

it('renders the login scaffold without a registration route', function () {
    $response = $this->get(route('login'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('auth/login'));

    expect(Route::has('register'))->toBeFalse();
});

it('renders the dashboard shell', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('dashboard/index'));
});
