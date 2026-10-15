<?php

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\ContentCollectionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property array<string, mixed> $data
 * @property array<string, mixed>|null $draft
 * @property ContentStatus $status
 */
#[Fillable(['key', 'data', 'draft', 'status'])]
class ContentCollection extends Model
{
    /** @use HasFactory<ContentCollectionFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $primaryKey = 'key';

    protected $keyType = 'string';

    /**
     * @param  Builder<ContentCollection>  $query
     * @return Builder<ContentCollection>
     */
    #[Scope]
    protected function published(Builder $query): Builder
    {
        return $query->where('status', ContentStatus::Published);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'data' => 'array',
            'draft' => 'array',
            'status' => ContentStatus::class,
        ];
    }
}
