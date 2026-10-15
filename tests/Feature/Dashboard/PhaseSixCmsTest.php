<?php

use App\Enums\ContentStatus;
use App\Enums\Role;
use App\Models\ContentCollection;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\Revision;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

function translationsDraft(): array
{
    return collect(['en', 'id', 'pt'])->mapWithKeys(fn (string $locale): array => [$locale => ['title' => "Title {$locale}", 'body' => "Body {$locale}"]])->all();
}

test('staff can save page drafts but cannot publish them', function () {
    $staff = User::factory()->create();
    $page = Page::factory()->create();

    $this->actingAs($staff)->put(route('dashboard.pages.update', $page), ['translations' => translationsDraft()])->assertRedirect();
    expect($page->refresh()->draft)->toBe(translationsDraft());
    $this->assertDatabaseHas('revisions', ['entity' => 'page', 'action' => 'saved-draft', 'user_id' => $staff->id]);

    $this->actingAs($staff)->post(route('dashboard.pages.publish', $page))->assertForbidden();
});

test('admin publishes a complete page atomically and records a revision', function () {
    $admin = User::factory()->admin()->create();
    $page = Page::factory()->create(['draft' => translationsDraft()]);

    $this->actingAs($admin)->post(route('dashboard.pages.publish', $page))->assertRedirect();

    expect($page->refresh()->status)->toBe(ContentStatus::Published)->and($page->draft)->toBeNull();
    $this->assertDatabaseCount('translations', 3);
    $this->assertDatabaseHas('revisions', ['entity' => 'page', 'entity_id' => (string) $page->id, 'action' => 'published']);
});

test('publish rejects an incomplete page draft without changing published data', function () {
    $admin = User::factory()->admin()->create();
    $page = Page::factory()->create(['draft' => ['en' => ['title' => '', 'body' => 'Body']]]);

    $this->actingAs($admin)->post(route('dashboard.pages.publish', $page))->assertSessionHasErrors();

    expect($page->refresh()->status)->toBe(ContentStatus::Draft)
        ->and($page->draft)->not->toBeNull();
    $this->assertDatabaseMissing('revisions', ['entity' => 'page', 'action' => 'published']);
});

test('product collection and settings publish workflows enforce admin role', function () {
    $admin = User::factory()->admin()->create();
    $staff = User::factory()->create();
    $productTranslations = collect(['en', 'id', 'pt'])->mapWithKeys(fn (string $locale): array => [$locale => ['title' => "Title {$locale}", 'body' => "Body {$locale}", 'capacity' => '', 'products' => ['Fabric'], 'machinery' => '']])->all();
    $product = Product::factory()->create(['draft' => ['gallery' => [], 'video_en' => '', 'video_id' => '', 'video_pt' => '', 'translations' => $productTranslations]]);
    $collection = ContentCollection::factory()->create(['draft' => ['items' => [['title' => 'Example']]]]);
    $setting = SiteSetting::factory()->create(['id' => 'site', 'draft' => ['catalog_url' => 'https://example.com', 'catalog_on' => true, 'catalog_label_en' => 'Catalog', 'catalog_label_id' => 'Katalog', 'catalog_label_pt' => 'Catálogo', 'catalog_placements' => ['home'], 'catalog_open_new_tab' => true]]);

    $this->actingAs($staff)->post(route('dashboard.products.publish', $product))->assertForbidden();
    $this->actingAs($admin)->post(route('dashboard.products.publish', $product))->assertRedirect();
    $this->actingAs($admin)->post(route('dashboard.collections.publish', $collection))->assertRedirect();
    $this->actingAs($admin)->post(route('dashboard.settings.publish', $setting))->assertRedirect();

    expect($product->refresh()->status)->toBe(ContentStatus::Published)
        ->and($collection->refresh()->status)->toBe(ContentStatus::Published)
        ->and($setting->refresh()->catalog_url)->toBe('https://example.com');
});

test('media created by staff requires admin approval', function () {
    $staff = User::factory()->create();
    $admin = User::factory()->admin()->create();
    $payload = ['url' => 'https://example.com/image.webp', 'alt_en' => 'English alt', 'alt_id' => 'Alt Indonesia', 'alt_pt' => 'Alt português'];

    $this->actingAs($staff)->post(route('dashboard.media.store'), $payload)->assertRedirect();
    $media = MediaAsset::firstOrFail();
    expect($media->approved)->toBeFalse();
    $this->actingAs($staff)->post(route('dashboard.media.approve', $media))->assertForbidden();
    $this->actingAs($admin)->post(route('dashboard.media.approve', $media))->assertRedirect();
    expect($media->refresh()->approved)->toBeTrue();
});

test('only admins manage users and cannot mutate themselves', function () {
    $admin = User::factory()->admin()->create();
    $staff = User::factory()->create();

    $this->actingAs($staff)->get(route('dashboard.users.index'))->assertForbidden();
    $this->actingAs($admin)->post(route('dashboard.users.store'), ['name' => 'Editor', 'email' => 'editor@example.com', 'password' => 'strong-password', 'role' => Role::Staff->value])->assertRedirect();
    $created = User::where('email', 'editor@example.com')->firstOrFail();
    $this->actingAs($admin)->put(route('dashboard.users.update', $created), ['role' => Role::Admin->value])->assertRedirect();
    expect($created->refresh()->role)->toBe(Role::Admin);
    $this->actingAs($admin)->patch(route('dashboard.users.activation', $admin), ['active' => false])->assertForbidden();
});

test('account password change is validated and audited', function () {
    $user = User::factory()->create(['password' => 'old-password']);

    $this->actingAs($user)->put(route('dashboard.account.update'), ['current_password' => 'old-password', 'password' => 'new-strong-password', 'password_confirmation' => 'new-strong-password'])->assertRedirect();

    expect(Hash::check('new-strong-password', $user->refresh()->password))->toBeTrue();
    $this->assertDatabaseHas('revisions', ['entity' => 'user', 'entity_id' => (string) $user->id, 'action' => 'password-changed']);
});

test('revision page exposes recent audit entries to dashboard users', function () {
    $user = User::factory()->create();
    Revision::factory()->for($user)->create();

    $this->actingAs($user)->get(route('dashboard.revisions.index'))->assertOk()->assertInertia(fn ($page) => $page->component('dashboard/revisions/index')->has('revisions', 1));
});
