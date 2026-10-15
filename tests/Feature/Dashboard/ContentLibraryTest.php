<?php

use App\Models\ContentCollection;
use App\Models\Page;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects guests from dashboard content library to login', function () {
    $this->get(route('dashboard.content.index'))
        ->assertRedirect(route('login'));
});

it('renders the content library page for authenticated users with data', function () {
    $user = User::factory()->create();

    Page::factory()->count(2)->create();
    Product::factory()->count(2)->create();
    ContentCollection::factory()->count(2)->create();

    $response = $this->actingAs($user)->get(route('dashboard.content.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/content/index')
            ->has('pages', 2)
            ->has('products', 2)
            ->has('collections', 2)
        );
});

it('renders the dashboard overview with correct stats counts', function () {
    $user = User::factory()->create();

    Page::factory()->count(3)->create();
    Product::factory()->count(4)->create();
    ContentCollection::factory()->count(2)->create();

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/index')
            ->has('stats.pages', fn (Assert $s) => $s
                ->where('total', 3)
                ->etc()
            )
            ->has('stats.products', fn (Assert $s) => $s
                ->where('total', 4)
                ->etc()
            )
            ->has('stats.collections', fn (Assert $s) => $s
                ->where('total', 2)
                ->etc()
            )
            ->has('stats.users', fn (Assert $s) => $s
                ->where('total', 1)
                ->etc()
            )
        );
});
