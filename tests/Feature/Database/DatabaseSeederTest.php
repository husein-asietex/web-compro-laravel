<?php

use App\Enums\Role;
use App\Models\MediaAsset;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Hash;

it('creates the complete deterministic dummy dataset idempotently', function () {
    $this->seed(DatabaseSeeder::class);
    $this->seed(DatabaseSeeder::class);

    $this->assertDatabaseCount('users', 2);
    $this->assertDatabaseCount('site_settings', 1);
    $this->assertDatabaseCount('content_collections', 4);
    $this->assertDatabaseCount('pages', 5);
    $this->assertDatabaseCount('products', 9);
    $this->assertDatabaseCount('translations', 42);
    $this->assertDatabaseCount('media_assets', 13);
    $this->assertDatabaseCount('revisions', 0);

    $admin = User::query()->where('email', 'admin@example.com')->firstOrFail();
    $spinning = Product::query()->where('slug', 'spinning')->firstOrFail();
    $spinningMedia = MediaAsset::query()->whereBelongsTo($spinning)->firstOrFail();

    expect($admin->role)->toBe(Role::Admin)
        ->and($admin->active)->toBeTrue()
        ->and(Hash::check('password', $admin->password))->toBeTrue()
        ->and($spinning->gallery)->toBe(['/images/products/1-spinning.webp'])
        ->and($spinningMedia->approved)->toBeTrue()
        ->and(public_path(ltrim($spinningMedia->url, '/')))->toBeFile();
});
