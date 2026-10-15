<?php

use App\Models\ContentCollection;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

it('allows active staff and administrators to access the dashboard', function (string $state) {
    $user = $state === 'admin'
        ? User::factory()->admin()->create()
        : User::factory()->create();

    $this->actingAs($user)->get(route('dashboard'))->assertOk();
})->with(['staff', 'admin']);

it('allows staff to edit drafts but not publish content', function (string $modelClass) {
    $staff = User::factory()->create();
    $content = $modelClass::factory()->create();

    expect(Gate::forUser($staff)->allows('update', $content))->toBeTrue()
        ->and(Gate::forUser($staff)->allows('publish', $content))->toBeFalse();
})->with([
    'page' => Page::class,
    'product' => Product::class,
    'collection' => ContentCollection::class,
    'site setting' => SiteSetting::class,
]);

it('allows administrators to publish content and approve media', function () {
    $admin = User::factory()->admin()->create();
    $page = Page::factory()->create();
    $media = MediaAsset::factory()->create();

    expect(Gate::forUser($admin)->allows('publish', $page))->toBeTrue()
        ->and(Gate::forUser($admin)->allows('approve', $media))->toBeTrue();
});

it('prevents staff from managing users', function () {
    $staff = User::factory()->create();
    $target = User::factory()->create();

    expect(Gate::forUser($staff)->allows('viewAny', User::class))->toBeFalse()
        ->and(Gate::forUser($staff)->allows('update', $target))->toBeFalse()
        ->and(Gate::forUser($staff)->allows('deactivate', $target))->toBeFalse();
});

it('prevents administrators from deactivating themselves', function () {
    $admin = User::factory()->admin()->create();

    expect(Gate::forUser($admin)->allows('deactivate', $admin))->toBeFalse();
});
