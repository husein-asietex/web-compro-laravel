<?php

namespace App\Actions\Content;

use App\Enums\ContentStatus;
use App\Models\ContentCollection;
use App\Models\Page;
use App\Models\Product;
use App\Models\Revision;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ContentWorkflow
{
    /** @param array<string, mixed> $draft */
    public function saveDraft(Model $model, array $draft, User $user, string $entity): void
    {
        DB::transaction(function () use ($model, $draft, $user, $entity): void {
            $model->update(['draft' => $draft]);
            $this->record($user, $entity, (string) $model->getKey(), 'saved-draft');
        });
    }

    public function publishPage(Page $page, User $user): void
    {
        /** @var array<string, array{title: string, body: string}> $draft */
        $draft = $page->draft;

        DB::transaction(function () use ($page, $user, $draft): void {
            foreach ($draft as $locale => $translation) {
                $page->translations()->updateOrCreate(['locale' => $locale], $translation);
            }
            $page->update(['status' => ContentStatus::Published, 'draft' => null]);
            $this->record($user, 'page', (string) $page->getKey(), 'published');
            DB::afterCommit(fn () => Cache::flush());
        });
    }

    public function publishProduct(Product $product, User $user): void
    {
        /** @var array<string, mixed> $draft */
        $draft = $product->draft;
        /** @var array<string, array<string, mixed>> $translations */
        $translations = $draft['translations'];

        DB::transaction(function () use ($product, $user, $draft, $translations): void {
            foreach ($translations as $locale => $translation) {
                $product->translations()->updateOrCreate(['locale' => $locale], $translation);
            }

            $english = $translations['en'];
            $product->update([
                'status' => ContentStatus::Published,
                'draft' => null,
                'capacity' => $english['capacity'] ?: null,
                'products' => $english['products'],
                'machinery' => $english['machinery'] ?: null,
                'gallery' => $draft['gallery'],
                'video_en' => $draft['video_en'] ?: null,
                'video_id' => $draft['video_id'] ?: null,
                'video_pt' => $draft['video_pt'] ?: null,
            ]);
            $this->record($user, 'product', (string) $product->getKey(), 'published');
            DB::afterCommit(fn () => Cache::flush());
        });
    }

    public function publishCollection(ContentCollection $collection, User $user): void
    {
        DB::transaction(function () use ($collection, $user): void {
            $collection->update([
                'data' => $collection->draft,
                'draft' => null,
                'status' => ContentStatus::Published,
            ]);
            $this->record($user, 'content-collection', (string) $collection->getKey(), 'published');
            DB::afterCommit(fn () => Cache::flush());
        });
    }

    public function publishSetting(SiteSetting $setting, User $user): void
    {
        DB::transaction(function () use ($setting, $user): void {
            $setting->update([...$setting->draft, 'draft' => null]);
            $this->record($user, 'setting', (string) $setting->getKey(), 'published');
            DB::afterCommit(fn () => Cache::flush());
        });
    }

    public function record(User $user, string $entity, string $entityId, string $action): void
    {
        Revision::create([
            'user_id' => $user->getKey(),
            'entity' => $entity,
            'entity_id' => $entityId,
            'action' => $action,
        ]);
    }
}
