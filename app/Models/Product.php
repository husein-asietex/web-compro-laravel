<?php

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property ContentStatus $status
 * @property array<string, mixed>|null $draft
 */
#[Fillable(['slug', 'sort_order', 'capacity', 'products', 'machinery', 'video_en', 'video_id', 'video_pt', 'gallery', 'status', 'draft'])]
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $attributes = [
        'products' => '[]',
        'gallery' => '[]',
    ];

    /** @return HasMany<Translation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(Translation::class);
    }

    /** @return HasMany<MediaAsset, $this> */
    public function mediaAssets(): HasMany
    {
        return $this->hasMany(MediaAsset::class);
    }

    /**
     * @param  Builder<Product>  $query
     * @return Builder<Product>
     */
    #[Scope]
    protected function published(Builder $query): Builder
    {
        return $query->where('status', ContentStatus::Published);
    }

    /**
     * @param  Builder<Product>  $query
     * @return Builder<Product>
     */
    #[Scope]
    protected function ordered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'products' => 'array',
            'gallery' => 'array',
            'status' => ContentStatus::class,
            'draft' => 'array',
        ];
    }
}
