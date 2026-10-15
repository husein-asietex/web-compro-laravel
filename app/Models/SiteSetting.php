<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property array<int, string> $catalog_placements
 * @property array<string, mixed>|null $draft
 */
#[Fillable(['id', 'catalog_url', 'catalog_on', 'catalog_label_en', 'catalog_label_id', 'catalog_label_pt', 'catalog_placements', 'catalog_open_new_tab', 'draft'])]
class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'catalog_on' => 'boolean',
            'catalog_placements' => 'array',
            'catalog_open_new_tab' => 'boolean',
            'draft' => 'array',
        ];
    }
}
